import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from '@angular/core';
import { Image } from '../../interfaces/interfaces';
import { ImagesService } from '../images.service';
@Component({
	selector: 'app-gmatrix',
	templateUrl: './gmatrix.component.html',
	styleUrls: ['./gmatrix.component.css'],
})
export class GmatrixComponent implements OnInit, OnChanges {
	@Input() titulo: string = '';
	@Input() galname: string = '';
	@Input() images: Image[] = [];
	@Input() imgPreview: any;
	@Output() addImage = new EventEmitter<Image>();
	@Output() deleteImage = new EventEmitter<Image>();
	@Output() imagePreview = new EventEmitter<any>();
	urlFileSystem: string;
	constructor(private imagesService: ImagesService) {
		this.urlFileSystem = this.imagesService.urlFileSystem;
	}
	ngOnChanges(): void {
		this.createGallery();
	}

	createGallery() {
		for (let img of this.images) {
			if (img.style) continue;
			console.log('Hola Mundo!');

			img.name !== 'add-image.svg'
				? (img.style = `background-image: url("assets/images/${img.name}");`)
				: null;
			img.name === 'add-image.svg'
				? (img.style = `
				    background-image: url("assets/icons/add-image.svg");
				    background-size: 20%;
				    background-repeat: no-repeat;
				    background-position: center;
				    box-shadow: inset 0 0 2px black;`)
				: null;
		}
	}
	ngOnInit(): void {
		this.createGallery();
	}

	addImg() {
		this.addImage.emit();
	}

	deleteImg(image: Image) {
		this.deleteImage.emit(image);
	}

	preview(imagePreview: any) {
		this.imagePreview.emit(imagePreview);
	}
}
