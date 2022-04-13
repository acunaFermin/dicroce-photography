import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/images.service';
import { Image } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-gall2',
  templateUrl: './gall2.component.html',
  styleUrls: ['./gall2.component.css'],
})
export class Gall2Component implements OnInit {
  images: Image[] = [];
  constructor(private imageService: ImagesService) {
    this.images = this.imageService.images.filter(
      (img) => img.gallery === 'fine-art'
    );
  }
  ngOnInit(): void {}
}
