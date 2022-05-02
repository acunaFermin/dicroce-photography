export interface Image {
	id: string;
	name: string;
	ext?: string;
	position: string;
	gallery: string;
	title?: string;
	style?: string;
	preview?: any;
	index: number;
}

export interface ImagePreview {
	imagePreview: Base;
	ext?: string;
	file?: any;
	id: string;
}

export interface Base {
	base: string | ArrayBuffer;
}
