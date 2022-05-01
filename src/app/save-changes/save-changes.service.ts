import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ImagesService } from '../images.service';
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
	imgFiles: any;
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
	}

	clearSendedItems() {
		this.portfolioService.createdItems = [];
		this.portfolioService.editatedItems = [];
		this.portfolioService.eliminatedItems = [];
		this.ImagesService.createdImages = [];
		this.ImagesService.editatedImages = [];
		this.ImagesService.eliminatedImages = [];

		this.changesStatus = false;
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

		console.log('Hola Mundo!', this.savePortfolioItems);

		this.savedChanges = {
			saveGalleryImages: this.saveGalleryImages,
			savePortfolioItems: this.savePortfolioItems,
		};

		this.imgFiles = this.portfolioService.imageFiles;

		this.clearSendedItems();

		this.sendItems();
		this.sendImgFiles();
	}

	sendItems() {
		return (
			this.http
				// .post(`${this.urlLocal}/api/portfolio/`, this.savedChanges)
				.post(`${this.urlRemoto}/api/portfolio/`, this.savedChanges)
				.subscribe((data) => {
					console.log('save-changes.service', data);
				})
		);
	}

	sendImgFiles() {
		return (
			this.http
				// .post(`${this.urlLocal}/api/upload-image/`, this.imgFiles)
				.post(`${this.urlRemoto}/api/upload-image/`, this.imgFiles)
				.subscribe(console.log)
		);
	}
}
