import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../images.service';
import { Base, ImagePreview } from '../interfaces/interfaces';
import { PortfolioItem } from './interfaces/portfolio-item.interfaces';

@Injectable({
	providedIn: 'root',
})
export class PortfolioService {
	items: PortfolioItem[] = [
		{
			id: '1',
			titulo: 'Retrato Beauty',
			link: '/gallery/retratobeauty',
			imagen1: {
				id: '17',
				name: '1.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen2: {
				id: '18',
				name: '2.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen3: {
				id: '19',
				name: '3.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
		},
		{
			id: '2',
			titulo: 'Fine Art',
			link: '/gallery/fineart',
			imagen1: {
				id: '20',
				name: '4.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen2: {
				id: '21',
				name: '5.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen3: {
				id: '22',
				name: '6.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
		},
		{
			id: '3',
			titulo: 'Retrato Personalizado',
			link: '/gallery/retratopersonalizado',
			imagen1: {
				id: '23',
				name: '7.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen2: {
				id: '24',
				name: '8.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
			imagen3: {
				id: '25',
				name: '9.jpg',
				gallery: 'images',
				position: '',
				index: 0,
			},
		},
	];

	private _testItem: PortfolioItem = {
		id: 'id',
		titulo: 'Editar titulo',
		link: null,
		imagen1: {
			id: '',
			name: 'add-image.svg',
			gallery: 'icons',
			position: '',
			index: 0,
		},
		imagen2: {
			id: '',
			name: 'add-image.svg',
			gallery: 'icons',
			position: '',
			index: 0,
		},
		imagen3: {
			id: '',
			name: 'add-image.svg',
			gallery: 'icons',
			position: '',
			index: 0,
		},
	};

	get testItem() {
		return { ...this._testItem };
	}

	//elementos a enviar si se deciden guardar los cambios
	createdItems: PortfolioItem[] = [];
	eliminatedItems: PortfolioItem[] = [];
	editatedItems: PortfolioItem[] = [];
	changesStatus: EventEmitter<boolean> = new EventEmitter();
	update: EventEmitter<void> = new EventEmitter();
	urlRemoto: string;
	urlLocal: string;

	imageFiles = new FormData();

	constructor(
		private http: HttpClient,
		private imagesService: ImagesService,
		private sanitizer: DomSanitizer
	) {
		this.urlRemoto = this.imagesService.urlRemoto;
		this.urlLocal = this.imagesService.urlLocal;

		this.getPortfolioItemsDB();
	}

	getPortfolioItemsDB() {
		return (
			this.http
				// .get<PortfolioItem[]>(`${this.urlLocal}/api/portfolio/portfolio-images`)
				.get<PortfolioItem[]>(`${this.urlRemoto}/api/portfolio/portfolio-images`)
				.subscribe((data) => {
					this.items.unshift(...data);
					this.update.emit();
				})
		);
	}

	saveImgFile(imagePreview: ImagePreview) {
		this.imageFiles.set(
			imagePreview.id,
			imagePreview.file,
			imagePreview.file.name
		);
	}

	setImage(imagePreview: ImagePreview) {
		this.saveImgFile(imagePreview);

		for (let item of this.items) {
			if (item.imagen1.id === imagePreview.id) {
				item.imagen1.style = `background-image: url("${imagePreview.imagePreview.base}");`;
				item.imagen1.ext = imagePreview.ext;
				break;
			}
			if (item.imagen2.id === imagePreview.id) {
				item.imagen2.style = `background-image: url("${imagePreview.imagePreview.base}");`;
				item.imagen2.ext = imagePreview.ext;
				break;
			}
			if (item.imagen3.id === imagePreview.id) {
				item.imagen3.style = `background-image: url("${imagePreview.imagePreview.base}");`;
				item.imagen3.ext = imagePreview.ext;
				break;
			}

			item.imagen1.id === imagePreview.id
				? (item.imagen1.name = '')
				: item.imagen2.id === imagePreview.id
				? (item.imagen2.name = '')
				: item.imagen3.id === imagePreview.id
				? (item.imagen3.name = '')
				: null;
		}
		//identificar cual item cambio, y almacenar en db
		let itemDB: PortfolioItem | null = null;

		for (let item of this.items) {
			if (item.imagen1.id === imagePreview.id) {
				itemDB = item;
			}
			if (item.imagen2.id === imagePreview.id) {
				itemDB = item;
			}
			if (item.imagen3.id === imagePreview.id) {
				itemDB = item;
			}
		}

		itemDB ? this.saveEditedItem(itemDB) : null;

		console.log(this.items);
	}

	//imagenes que todavia no existen en la db
	saveItem(item: PortfolioItem) {
		//mando el item por value
		let itemValue: PortfolioItem = {
			id: item.id,
			titulo: item.titulo,
			link: item.link,
			imagen1: { ...item.imagen1 },
			imagen2: { ...item.imagen2 },
			imagen3: { ...item.imagen3 },
		};

		this.createdItems.unshift(itemValue);
		this.notifyChanges();
	}

	//imagenes que ya existen en la db, pero fueron editadas
	saveEditedItem(item: PortfolioItem) {
		//mando el item por value
		let itemValue: PortfolioItem = {
			id: item.id,
			titulo: item.titulo,
			link: item.link,
			imagen1: { ...item.imagen1 },
			imagen2: { ...item.imagen2 },
			imagen3: { ...item.imagen3 },
		};
		//analizo si se quiere editar una imagen que ha sido creada, y que no existe en la db
		let i = 0;
		for (let itm of this.createdItems) {
			if (itm.id === item.id) {
				//guardo los cambios en el createdItems
				this.createdItems.splice(i, 1, { ...itemValue });
				this.notifyChanges();
				return;
			}
			i++;
		}

		//analizo si la imagen ya existe en el array y la reemplazo
		if (this.editatedItems.length > 0) {
			i = 0;
			for (let itm of this.editatedItems) {
				if (itm.id === item.id) {
					this.editatedItems.splice(i, 1, itemValue);
					this.notifyChanges();
					return;
				}
				i++;
			}
		}
		this.editatedItems.unshift(itemValue);
		this.notifyChanges();
	}

	//imagenes que hay que sacar de la db
	eliminateItem(item: PortfolioItem) {
		//mando el item por value
		let itemValue: PortfolioItem = {
			id: item.id,
			titulo: item.titulo,
			link: item.link,
			imagen1: { ...item.imagen1 },
			imagen2: { ...item.imagen2 },
			imagen3: { ...item.imagen3 },
		};
		//elimino imagenes creadas
		if (this.createdItems.length > 0) {
			let eliminatedCreatedItem: PortfolioItem | null = null;

			this.createdItems = this.createdItems.filter(
				(itm) => itm.id !== itemValue.id,
				(eliminatedCreatedItem = itemValue)
			);
			this.notifyChanges();
			if (eliminatedCreatedItem) return;
		}

		//elimino imagenes editadas
		if (this.editatedItems.length > 0) {
			this.editatedItems = this.editatedItems.filter(
				(itm) => itm.id !== itemValue.id
			);
		}

		this.eliminatedItems.unshift(itemValue);
		this.notifyChanges();
	}

	//notifico que hay cambios
	notifyChanges() {
		this.createdItems.length > 0
			? this.changesStatus.emit(true)
			: this.eliminatedItems.length > 0
			? this.changesStatus.emit(true)
			: this.editatedItems.length > 0
			? this.changesStatus.emit(true)
			: this.changesStatus.emit(false);
	}
}
