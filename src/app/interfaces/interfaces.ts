export interface Image {
	id: string;
	name: string;
	position: string;
	gallery: string;
	style?: string;
	preview?: any;
	index: number;
}

export interface ImagePreview {
	imagePreview: Base;
	id: string;
}

export interface Base {
	base: string | ArrayBuffer;
}
