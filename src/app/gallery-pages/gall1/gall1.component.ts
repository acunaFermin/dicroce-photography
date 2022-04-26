import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { generateUUID } from 'src/app/helpers/uuid';
import { ImagesService } from 'src/app/images.service';
import { Image, ImagePreview } from 'src/app/interfaces/interfaces';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';
import { SaveChangesService } from 'src/app/save-changes/save-changes.service';
import { selectVH } from './helpers/add-image';

@Component({
	selector: 'app-gall1',
	templateUrl: './gall1.component.html',
	styleUrls: ['./gall1.component.css'],
})
export class Gall1Component implements OnInit {
	images: Image[] = [];
	title: string = '';
	galname: string = '';
	testImage: Image;
	updateData!: Subscription;
	constructor(
		private imageService: ImagesService,
		private portfolioService: PortfolioService,
		private saveChangesService: SaveChangesService,
		private route: ActivatedRoute
	) {
		this.testImage = this.imageService.testImages;
		this.updateData = this.imageService.updateData.subscribe((data) => {
			this.createGallery();
		});
	}

	ngOnInit(): void {
		//obtengo el nombre de la galeria del url
		this.galname = this.route.snapshot.paramMap.get('galname') || '';

		//obtengo titulo
		this.Title();

		//obtengo imagenes que coincidan con la galeria
		this.createGallery();
	}

	Title() {
		const secciones = this.portfolioService.items;

		for (let item of secciones) {
			if (item.link === `/gallery/${this.galname}`) {
				this.title = item.titulo;
				break;
			}
		}
	}

	createGallery(imgPreview?: ImagePreview) {
		let images = this.imageService.images.filter(
			(img) => img.gallery === this.galname
		);

		this.images = images;

		if (!imgPreview) return;

		images.forEach((image) => {
			if (image.id === imgPreview.id) {
				// image.preview = imgPreview.imagePreview;
				image.style = `background-image: url(${imgPreview.imagePreview.base});`;

				//guardo imagen editada para enviar a db
				this.imageService.saveEditedImage({ ...image });
			}
		});

		this.images = images;
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
