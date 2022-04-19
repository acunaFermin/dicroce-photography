import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Output() callGall1 = new EventEmitter<Image>();
  @Output() deleteImage = new EventEmitter<Image>();
  @Output() imagePreview = new EventEmitter<any>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.images);

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

  callFromAddItem(call: Image) {
    this.callGall1.emit(call);
  }

  deleteImg(image: Image) {
    this.deleteImage.emit(image);
  }

  preview(imagePreview: any) {
    console.log('gmatrix', imagePreview);
    this.imagePreview.emit(imagePreview);
  }
}
