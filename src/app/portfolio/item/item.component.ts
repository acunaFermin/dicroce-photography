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
import { ImagesService } from 'src/app/images.service';
import { ImagePreview } from 'src/app/interfaces/interfaces';
import { PortfolioItem } from '../interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio.service';
import { changeTitle } from './helpers/edit-item';

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
	constructor(
		private portfolioService: PortfolioService,
		private imagesService: ImagesService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.createItemPortfolio();
	}

	ngOnInit(): void {
		this.createItemPortfolio();
	}

	@HostListener('click', ['$event'])
	@HostListener('touchstart', ['$event'])
	onClick(e: any) {
		let target = [e.target.id, e.path[3].id, e.path[2].id];

		this.preventRouter = !target.join('').match(new RegExp('edit-btn'));
	}

	createItemPortfolio() {
		this.items.forEach((item) => {
			//estilo sin imagen
			let addImageStyle = `
          background-size: 30%;
          background-position: center;
          box-shadow: inset 0 0 2px black;`;

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
		});

		this.portfolioService.items = this.items;
	}

	getImagePreview(imagePreview: ImagePreview) {
		this.imagePreview = imagePreview;
		this.portfolioService.setImage(imagePreview);
		this.portfolioService.items = this.items;
	}

	deletePortfolioItem(portfolioItem: PortfolioItem) {
		confirmDelete(portfolioItem)
			.then((eliminar) => {
				if (eliminar) {
					//elimino el prtfolioItem y las imagenes que tenga dentro
					this.imagesService.deleteImagesofPortfolioItem(portfolioItem);
					this.portfolioItemToDelete.emit(portfolioItem);
					//almaceno en db los cambios
				}
			})
			.catch((err) => console.log('Hola Mundo!'));
	}

	editPortfolioItem(portfolioItem: PortfolioItem) {
		changeTitle(
			portfolioItem,
			this.portfolioService.items,
			portfolioItem.titulo,
			this.imagesService.images
		) //almaceno en db los cambios
			.then((data) => this.portfolioService.saveEditedItem(portfolioItem))
			.catch((err) => console.warn('El titulo ya existe!'));
	}
}
