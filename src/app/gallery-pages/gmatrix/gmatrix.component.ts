import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../interfaces/interfaces';
@Component({
  selector: 'app-gmatrix',
  templateUrl: './gmatrix.component.html',
  styleUrls: ['./gmatrix.component.css'],
})
export class GmatrixComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() images: Image[] = [];

  constructor() {}

  ngOnInit(): void {
    this.images.forEach((img) => {
      img.style = `background-image: url("assets/${img.gallery}/${img.name}");`;
    });
  }
}
