import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PortfolioItem } from 'src/app/portfolio/interfaces/portfolio-item.interfaces';
import { Image } from '../../interfaces/interfaces';
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

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.createGallery();
  }

  createGallery() {
    this.images.forEach((img) => {
      img.name !== 'add-image.svg'
        ? (img.style = `background-image: url("assets/images/${img.name}");`)
        : null;

      img.preview
        ? (img.style = `background-image: url(${img.preview.base});`)
        : null;
    });
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

  deleteImagesOfPortfolioItem(portfolioItem: PortfolioItem) {
    console.log('gmatrix!', portfolioItem);
  }
}
