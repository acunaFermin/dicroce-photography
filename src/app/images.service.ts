import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Image } from './interfaces/interfaces';
import { PortfolioItem } from './portfolio/interfaces/portfolio-item.interfaces';

@Injectable({
	providedIn: 'root',
})
export class ImagesService {
	//respuesta del futuro backend
	images: Image[] = [
		{
			id: '2',
			name: '2.jpg',
			gallery: 'retratobeauty',
			position: 'vertical',
			preview: null,
			index: 1,
		},
		{
			id: '1',
			name: '1.jpg',
			gallery: 'retratobeauty',
			position: 'vertical',
			preview: null,
			index: 2,
		},

		{
			id: '3',
			name: '3.jpg',
			gallery: 'retratobeauty',
			position: 'horizontal',
			preview: null,
			index: 3,
		},
		{
			id: '4',
			name: '4.jpg',
			gallery: 'fineart',
			position: 'horizontal',
			preview: null,
			index: 4,
		},
		{
			id: '5',
			name: '5.jpg',
			gallery: 'fineart',
			position: 'horizontal',
			preview: null,
			index: 5,
		},

		{
			id: '6',
			name: '6.jpg',
			gallery: 'fineart',
			position: 'vertical',
			preview: null,
			index: 6,
		},
		{
			id: '7',
			name: '7.jpg',
			gallery: 'retratopersonalizado',
			position: 'horizontal',
			preview: null,
			index: 7,
		},

		{
			id: '9',
			name: '9.jpg',
			gallery: 'retratopersonalizado',
			position: 'horizontal',
			preview: null,
			index: 8,
		},
	];

	private _testImages: Image = {
		id: '1',
		name: 'add-image.svg',
		gallery: 'beauty',
		position: 'vertical',
		index: 0,
	};

	//elementos a enviar si se deciden guardar los cambios
	createdImages: Image[] = [];
	eliminatedImages: Image[] = [];
	editatedImages: Image[] = [];
	imageIndex: number = 0;
	updateData: EventEmitter<void> = new EventEmitter();
	changesStatus: EventEmitter<boolean> = new EventEmitter();

	constructor(private http: HttpClient) {}

	get testImages() {
		return { ...this._testImages };
	}

	getImagesDB() {
		return this.http
			.get<Image[]>('http://localhost:8000/api/portfolio/')
			.subscribe((data) => {
				console.log('images service!', data);
				this.images.unshift(...data);
				this.updateData.emit();
			});
	}

	deleteImagesofPortfolioItem(portfolioItem: PortfolioItem) {
		this.images = this.images.filter((image) => {
			if (
				image.gallery !== portfolioItem.titulo.replace(/[" "]/gi, '').toLowerCase()
			) {
				return true;
			} else {
				this.eliminateImage(image);
				return false;
			}
		});
	}

	setIndexOfNewImage() {
		//primero obtener el indice maximo
		let maxIndex = 0;
		for (let image of this.images) {
			if (image.index > maxIndex) {
				maxIndex = image.index;
			}
		}

		return maxIndex + 1;
	}

	//imagenes que todavia no existen en la db
	saveImage(image: Image) {
		this.createdImages.unshift(image);
		this.notifyChanges();

		console.log(this.createdImages);
	}

	//imagenes que ya existen en la db, pero fueron editadas
	saveEditedImage(image: Image) {
		//analizo si se quiere editar una imagen que ha sido creada, y que no existe en la db
		let i = 0;
		for (let img of this.createdImages) {
			if (img.id === image.id) {
				//guardo los cambios en el createdImages
				this.createdImages.splice(i, 1, image);
				this.notifyChanges();

				return;
			}
			i++;
		}

		//analizo si la imagen ya existe en el array y la reemplazo
		if (this.editatedImages.length > 0) {
			i = 0;
			for (let img of this.editatedImages) {
				if (img.id === image.id) {
					this.editatedImages.splice(i, 1, image);
					this.notifyChanges();

					return;
				}
				i++;
			}
		}
		this.editatedImages.unshift(image);
		this.notifyChanges();
	}

	//imagenes que hay que sacar de la db
	eliminateImage(image: Image) {
		//elimino imagenes creadas
		if (this.createdImages.length > 0) {
			let eliminatedCreatedImage: Image | null = null;
			this.createdImages = this.createdImages.filter(
				(img) => img.id !== image.id,
				(eliminatedCreatedImage = image)
			);

			if (eliminatedCreatedImage) return;
		}

		//elimino imagenes editadas
		if (this.editatedImages.length > 0) {
			this.editatedImages = this.editatedImages.filter(
				(img) => img.id !== image.id
			);
		}

		this.eliminatedImages.unshift(image);
		this.notifyChanges();
	}
	//notifico que hay cambios
	notifyChanges() {
		this.createdImages.length > 0
			? this.changesStatus.emit(true)
			: this.eliminatedImages.length > 0
			? this.changesStatus.emit(true)
			: this.editatedImages.length > 0
			? this.changesStatus.emit(true)
			: this.changesStatus.emit(false);
	}
}
