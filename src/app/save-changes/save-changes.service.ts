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
	changesStatus: boolean = false;
	constructor(
		private ImagesService: ImagesService,
		private portfolioService: PortfolioService,
		private http: HttpClient
	) {
		this.ImagesService.changesStatus.subscribe((data) => {
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
		window.location.reload();
	}

	callSavedItems() {
		this.savePortfolioItems = {
			createdItems: [...this.portfolioService.createdItems],
			editatedItems: [...this.portfolioService.editatedItems],
			eliminatedItems: [...this.portfolioService.eliminatedItems],
		};

		this.saveGalleryImages = {
			createdImages: [...this.ImagesService.createdImages],
			editatedImages: [...this.ImagesService.editatedImages],
			eliminatedImages: [...this.ImagesService.eliminatedImages],
		};

		this.savedChanges = {
			saveGalleryImages: this.saveGalleryImages,
			savePortfolioItems: this.savePortfolioItems,
		};

		this.clearSendedItems();

		this.sendItems();
	}

	sendItems() {
		return this.http
			.post('http://localhost:8000/api/portfolio/', this.savedChanges)
			.subscribe((data) => {
				console.log('save-changes.service', data);
			});
	}
}
