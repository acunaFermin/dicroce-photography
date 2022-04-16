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
  @Output() callGall1 = new EventEmitter<Image>();

  constructor() {}

  createGallery() {
    this.images.forEach((img) => {
      img.name !== 'add-image.svg'
        ? (img.style = `background-image: url("assets/${img.gallery}/${img.name}");`)
        : null;
    });
  }

  ngOnInit(): void {
    this.createGallery();
  }

  callFromAddItem(call: Image) {
    this.callGall1.emit(call);
  }
}
