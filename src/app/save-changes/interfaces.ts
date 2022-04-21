import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

export interface SavePortfolioItems {
 createdItems: PortfolioItem[];
 eliminatedItems: PortfolioItem[];
 editatedItems: PortfolioItem[];
}

export interface SaveGalleryImages {
 createdImages: Image[];
 eliminatedImages: Image[];
 editatedImages: Image[];
}
