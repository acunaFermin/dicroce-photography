import { Injectable } from '@angular/core';
import { ImagesService } from '../images.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { SaveGalleryImages, SavePortfolioItems } from './interfaces';

@Injectable({
 providedIn: 'root',
})
export class SaveChangesService {
 savePortfolioItems: SavePortfolioItems;
 saveGalleryImages!: SaveGalleryImages;
 constructor(
  private ImagesService: ImagesService,
  private portfolioService: PortfolioService
 ) {
  this.savePortfolioItems = {
   createdItems: this.portfolioService.createdItems,
   editatedItems: this.portfolioService.editatedItems,
   eliminatedItems: this.portfolioService.eliminatedItems,
  };

  this.saveGalleryImages = {
   createdImages: this.ImagesService.createdImages,
   editatedImages: this.ImagesService.editatedImages,
   eliminatedImages: this.ImagesService.eliminatedImages,
  };
 }
}
