import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { confirmDelete } from './helpers/delete-item';
import { ImagesService } from 'src/app/gallery-pages/images.service';
import { ImagePreview } from 'src/app/interfaces/interfaces';
import { PortfolioItem } from '../interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio.service';
import { changeTitle } from './helpers/edit-item';
import { Router } from '@angular/router';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnChanges {
	@Input() items: PortfolioItem[] = [];
	@Input() newPortfolioItem!: PortfolioItem;
	@Output() portfolioItemToDelete = new EventEmitter<PortfolioItem>();

	preventRouter: boolean = false;
	imagePreview!: ImagePreview;
	urlFileSystem: string;
	constructor(
		private portfolioService: PortfolioService,
		private imagesService: ImagesService,
		private router: Router,
	) {
		this.portfolioService.update.subscribe((data) => {
			this.createItemPortfolio();
		});

		this.urlFileSystem = this.imagesService.urlFileSystem;
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.createItemPortfolio();
	}

	ngOnInit(): void {
		this.createItemPortfolio();
	}

	// @HostListener('click', ['$event'])
	// @HostListener('touchstart', ['$event'])
	// onClick(e: any) {
	// 	let target = [e.target.id, e.path[3].id, e.path[2].id];

	// 	this.preventRouter = !target.join('').match(new RegExp('edit-btn'));
	// }

	navigate(link: string | null){
		console.log({link})
		if(link)
		this.router.navigateByUrl(link)
	}

	createItemPortfolio() {
		this.items.forEach((item) => {
			//estilo sin imagen
			let addImageStyle = `
				background-size: 30%;
				background-position: center;
				box-shadow: inset 0 0 2px black;`;

			//
			!item.imagen1.style
				? (item.imagen1.style = `
			     background-image: url("assets/${item.imagen1.gallery}/${item.imagen1.name}");
			   `)
				: null;
			!item.imagen2.style
				? (item.imagen2.style = `
			     background-image: url("assets/${item.imagen2.gallery}/${item.imagen2.name}");
			   `)
				: null;
			!item.imagen3.style
				? (item.imagen3.style = `
			     background-image: url("assets/${item.imagen3.gallery}/${item.imagen3.name}");
			   `)
				: null;

			//agrego estilos para el fondo sin imagen
			item.imagen1.name === 'add-image.svg'
				? (item.imagen1.style += addImageStyle)
				: null;
			item.imagen2.name === 'add-image.svg'
				? (item.imagen2.style += addImageStyle)
				: null;
			item.imagen3.name === 'add-image.svg'
				? (item.imagen3.style += addImageStyle)
				: null;

			//ttraigo las imagenes del file sistem del server
			item.imagen1.ext
				? (item.imagen1.style = `
			     background-image: url("${this.urlFileSystem}/${item.imagen1.id}.${item.imagen1.ext}");
			   `)
				: null;
			item.imagen2.ext
				? (item.imagen2.style = `
			     background-image: url("${this.urlFileSystem}/${item.imagen2.id}.${item.imagen2.ext}");
			   `)
				: null;
			item.imagen3.ext
				? (item.imagen3.style = `
			     background-image: url("${this.urlFileSystem}/${item.imagen3.id}.${item.imagen3.ext}");
			   `)
				: null;
		});

		this.portfolioService.items = this.items;
	}

	getImagePreview(imagePreview: ImagePreview) {
		this.imagePreview = imagePreview;
		this.portfolioService.setImage(imagePreview);
	}

	deletePortfolioItem(portfolioItem: PortfolioItem) {
		confirmDelete(portfolioItem).then((eliminar) => {
			if (eliminar) {
				//elimino el prtfolioItem y las imagenes que tenga dentro
				this.imagesService.deleteImagesofPortfolioItem(portfolioItem);
				this.portfolioItemToDelete.emit(portfolioItem);
				//almaceno en db los cambios
			}
		});
	}

	editPortfolioItem(portfolioItem: PortfolioItem) {
		changeTitle(
			portfolioItem,
			this.portfolioService.items,
			portfolioItem.titulo,
			this.imagesService.images
		) //almaceno en db los cambios
			.then((data) => {
				this.portfolioService.saveEditedItem(portfolioItem);
				//guardar cambios en las imagenes de la galleria
				for (let image of this.imagesService.images) {
					if (
						image.gallery ===
						portfolioItem.titulo.replace(/[" "]/gi, '').toLowerCase()
					) {
						this.imagesService.saveEditedImage(image);
					}
				}
			})
			.catch((err) => console.warn('El titulo ya existe!'));
	}
}
