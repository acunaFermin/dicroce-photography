import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../interfaces/interfaces';
@Component({
  selector: 'app-gmatrix',
  templateUrl: './gmatrix.component.html',
  styleUrls: ['./gmatrix.component.css'],
})
export class GmatrixComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() galname: string = '';
  @Input() images: Image[] = [];
  @Input() imgPreview: any;
  @Output() callGall1 = new EventEmitter<Image>();
  @Output() deleteImage = new EventEmitter<Image>();
  @Output() imagePreview = new EventEmitter<any>();

  constructor() {}

  createGallery() {
    this.images.forEach((img) => {
      img.name !== 'add-image.svg'
        ? (img.style = `background-image: url("assets/${img.gallery}/${img.name}");`)
        : null;

      console.log('imagepreview!!', this.imgPreview);

      this.imgPreview
        ? (img.style = `background-image: url(${this.imgPreview});`)
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
