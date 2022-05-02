import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Image, ImagePreview } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
import { hardCodeImages, hardCode_testImages } from './hard-code-images';
@Injectable({
	providedIn: 'root',
})
export class ImagesService {
	//respuesta del futuro backend
	images: Image[] = hardCodeImages;
	private _testImages: Image = hardCode_testImages;

	//elementos a enviar si se deciden guardar los cambios
	createdImages: Image[] = [];
	eliminatedImages: Image[] = [];
	editatedImages: Image[] = [];
	imageIndex: number = 0;
	updateData: EventEmitter<void> = new EventEmitter();
	changesStatus: EventEmitter<boolean> = new EventEmitter();
	imgFile: EventEmitter<ImagePreview> = new EventEmitter();
	urlFileSystem = 'https://acuna-fermin.dev/nico-server/dist/uploads';
	urlRemoto = 'https://nico.acuna-fermin.dev';
	urlLocal = 'http://localhost:8999';

	constructor(private http: HttpClient) {
		this.getImagesDB();
	}

	get testImages() {
		return { ...this._testImages };
	}

	sendImageFile(imagePreview: ImagePreview) {
		this.imgFile.emit(imagePreview);
	}

	getImagesDB() {
		return (
			this.http
				.get<Image[]>(`${this.urlLocal}/api/portfolio/gallery-images`)
				// .get<Image[]>(`${this.urlRemoto}/api/portfolio/gallery-images`)
				.subscribe((data) => {
					console.log('images service!', data);
					this.images.unshift(...data);
					console.log(this.images);

					this.updateData.emit(); //==>gall1
				})
		);
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
		let imageValue = { ...image };

		this.createdImages.unshift(imageValue);
		this.notifyChanges();

		console.log(this.createdImages);
	}

	//imagenes que ya existen en la db, pero fueron editadas
	saveEditedImage(image: Image) {
		let imageValue = { ...image };
		//analizo si se quiere editar una imagen que ha sido creada, y que no existe en la db
		let i = 0;
		for (let img of this.createdImages) {
			if (img.id === imageValue.id) {
				//guardo los cambios en el createdImages
				this.createdImages.splice(i, 1, imageValue);
				this.notifyChanges();

				return;
			}
			i++;
		}

		//analizo si la imagen ya existe en el array y la reemplazo
		if (this.editatedImages.length > 0) {
			i = 0;
			for (let img of this.editatedImages) {
				if (img.id === imageValue.id) {
					this.editatedImages.splice(i, 1, imageValue);
					this.notifyChanges();

					return;
				}
				i++;
			}
		}
		this.editatedImages.unshift(imageValue);
		this.notifyChanges();
	}

	//imagenes que hay que sacar de la db
	eliminateImage(image: Image) {
		let imageValue = { ...image };

		//elimino imagenes creadas
		if (this.createdImages.length > 0) {
			let eliminatedCreatedImage: Image | null = null;
			this.createdImages = this.createdImages.filter(
				(img) => img.id !== imageValue.id,
				(eliminatedCreatedImage = imageValue)
			);

			if (eliminatedCreatedImage) return;
		}

		//elimino imagenes editadas
		if (this.editatedImages.length > 0) {
			this.editatedImages = this.editatedImages.filter(
				(img) => img.id !== imageValue.id
			);
		}

		this.eliminatedImages.unshift(imageValue);
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
