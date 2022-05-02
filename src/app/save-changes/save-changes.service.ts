import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagesService } from '../gallery-pages/images.service';
import { ImagePreview } from '../interfaces/interfaces';
import { PortfolioService } from '../portfolio/portfolio.service';
import {
	SavedChanges,
	SaveGalleryImages,
	SavePortfolioItems,
} from './interfaces';

@Injectable({
	providedIn: 'root',
})
export class SaveChangesService {
	savePortfolioItems!: SavePortfolioItems;
	saveGalleryImages!: SaveGalleryImages;
	savedChanges!: SavedChanges;
	imgFiles = new FormData();
	changesStatus: boolean = false;
	urlRemoto: string;
	urlLocal: string;
	constructor(
		private ImagesService: ImagesService,
		private portfolioService: PortfolioService,
		private http: HttpClient
	) {
		this.urlRemoto = this.ImagesService.urlRemoto;
		this.urlLocal = this.ImagesService.urlLocal;

		this.ImagesService.changesStatus.subscribe((data) => {
			this.changesStatus = data;
		});
		this.portfolioService.changesStatus.subscribe((data) => {
			this.changesStatus = data;
		});

		this.portfolioService.imgFiles.subscribe((imgPreview) => {
			this.saveImgFile(imgPreview);
		});

		this.ImagesService.imgFile.subscribe((imgPreview) => {
			this.saveImgFile(imgPreview);
		});
	}

	clearSendedItems() {
		this.portfolioService.createdItems = [];
		this.portfolioService.editatedItems = [];
		this.portfolioService.eliminatedItems = [];
		this.ImagesService.createdImages = [];
		this.ImagesService.editatedImages = [];
		this.ImagesService.eliminatedImages = [];
		this.changesStatus = false;

		//mirarr:
		//https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
		for (let key of this.imgFiles.keys()) {
			this.imgFiles.delete(key);
		}
	}

	eliminatedItemsId() {
		let itemsId: string[] = [];
		let imgsId: string[] = [];
		for (let item of this.portfolioService.eliminatedItems) {
			itemsId.push(item.id);
			imgsId.push(item.imagen1.id);
			imgsId.push(item.imagen2.id);
			imgsId.push(item.imagen3.id);
		}

		return { itemsId, imgsId };
	}

	clearBase64() {
		this.savePortfolioItems.createdItems.map((item) => {
			item.imagen1.style = '';
			item.imagen2.style = '';
			item.imagen3.style = '';
		});

		this.savePortfolioItems.editatedItems.map((item) => {
			item.imagen1.style = '';
			item.imagen2.style = '';
			item.imagen3.style = '';
		});

		this.saveGalleryImages.createdImages.map((item) => {
			item.style = '';
		});

		this.saveGalleryImages.editatedImages.map((item) => {
			item.style = '';
		});
	}

	callSavedItems() {
		this.savePortfolioItems = {
			createdItems: [...this.portfolioService.createdItems],
			editatedItems: [...this.portfolioService.editatedItems],
			eliminatedItems: this.eliminatedItemsId(),
		};

		this.saveGalleryImages = {
			createdImages: [...this.ImagesService.createdImages],
			editatedImages: [...this.ImagesService.editatedImages],
			eliminatedImages: [...this.ImagesService.eliminatedImages],
		};

		this.clearBase64();

		this.savedChanges = {
			saveGalleryImages: this.saveGalleryImages,
			savePortfolioItems: this.savePortfolioItems,
		};

		this.sendItems();
		this.sendImgFiles();
		this.clearSendedItems();
	}

	//guardar file en formData
	saveImgFile(imagePreview: ImagePreview) {
		this.imgFiles.set(imagePreview.id, imagePreview.file, imagePreview.file.name);

		console.log(this.imgFiles.forEach(console.log));
	}

	sendItems() {
		return (
			this.http
				.post(`${this.urlLocal}/api/portfolio/`, this.savedChanges)
				// .post(`${this.urlRemoto}/api/portfolio/`, this.savedChanges)
				.subscribe((data) => console.log('respuesta items enviados', data))
		);
	}

	sendImgFiles() {
		return (
			this.http
				// .post(`${this.urlLocal}/api/upload-image/`, this.imgFiles)
				.post(`${this.urlRemoto}/api/upload-image/`, this.imgFiles)
				.subscribe((data) => console.log('sendFiles', data))
		);
	}
}
