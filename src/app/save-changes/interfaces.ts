import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

export interface EliminatedItems {
	itemsId: string[];
	imgsId: string[];
}
export interface SavePortfolioItems {
	createdItems: PortfolioItem[];
	eliminatedItems: EliminatedItems;
	editatedItems: PortfolioItem[];
}

export interface SaveGalleryImages {
	createdImages: Image[];
	eliminatedImages: Image[];
	editatedImages: Image[];
}

export interface SavedChanges {
	savePortfolioItems: SavePortfolioItems;
	saveGalleryImages: SaveGalleryImages;
}
