import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { generateUUID } from 'src/app/helpers/uuid';
import { ImagesService } from 'src/app/gallery-pages/images.service';
import { Image, ImagePreview } from 'src/app/interfaces/interfaces';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';
import { selectVH } from './helpers/add-image';

@Component({
	selector: 'app-gall1',
	templateUrl: './gall1.component.html',
	styleUrls: ['./gall1.component.css'],
})
export class Gall1Component implements OnInit {
	images: Image[] = [];
	title!: string;
	galname: string = '';
	testImage: Image;
	updateData!: Subscription;
	urlFileSystem: string;
	constructor(
		private imageService: ImagesService,
		private portfolioService: PortfolioService,
		private route: ActivatedRoute
	) {
		this.testImage = this.imageService.testImages;
		this.updateData = this.imageService.updateData.subscribe((data) => {
			// //obtengo titulo
			this.createGallery();
		});

		this.urlFileSystem = this.imageService.urlFileSystem;
	}

	ngOnInit(): void {
		// obtengo el nombre de la galeria del url
		this.galname = this.route.snapshot.paramMap.get('galname') || '';

		// obtengo imagenes que coincidan con la galeria
		this.createGallery();
	}

	createGallery(imgPreview?: ImagePreview) {
		//filtro las imagenes que son de la propia galleria
		let images = this.imageService.images.filter(
			(img) => img.gallery === this.galname
		);

		//extraigo el titulo
		images[0] ? (this.title = images[0].title || '') : null;

		images.forEach((image) => {
			if (image.ext) {
				image.style = `background-image: url("${this.urlFileSystem}/${image.id}.${image.ext}");`;
			}
		});

		this.images = images;

		if (!imgPreview) return;

		//previsualizacion con imagenes en base64
		images.forEach((image) => {
			if (image.id === imgPreview.id) {
				image.style = `background-image: url(${imgPreview.imagePreview.base});`;
				image.ext = imgPreview.ext;
				image.name = '';
				//guardo imagen editada para enviar a db
				this.imageService.saveEditedImage(image);
			}
		});

		this.images = images;

		//envio imagenPreview al form data del saveChangesService
		this.imageService.sendImageFile(imgPreview);
	}

	addImage() {
		//preguntyar si vertical u horizontal
		let position = selectVH();

		position.then((position) => {
			this.testImage.id = generateUUID();
			this.testImage.position = position;
			this.testImage.style = `
        background-image: url("assets/icons/add-image.svg");
        background-size: 20%;
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: inset 0 0 2px black;`;
			this.testImage.gallery = this.galname;
			this.testImage.index = this.imageService.setIndexOfNewImage();

			//extraigo el titulo de la galeria y sa la pongo a la imagen
			for (let item of this.portfolioService.items) {
				if (item.link === `/gallery/${this.galname}`) {
					this.testImage.title = item.titulo;
					break;
				}
			}

			//guardo los cambios en el array local
			this.imageService.images.unshift({ ...this.testImage });
			//vuelvo a generar la galeria para mostrar la imagen
			this.createGallery();
			//guardo los cambios para enviar a la db
			this.imageService.saveImage({ ...this.testImage });
		});
	}

	imagePreview(preview: ImagePreview) {
		this.createGallery(preview);
	}

	deleteImage(image: Image) {
		this.imageService.images = this.imageService.images.filter(
			(img) => img.id !== image.id
		);

		//imagenes a eliminar de la db
		this.imageService.eliminateImage(image);

		this.createGallery();
	}
}
