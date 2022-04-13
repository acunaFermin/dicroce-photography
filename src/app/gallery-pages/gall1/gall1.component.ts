import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/images.service';
import { Image } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-gall1',
  templateUrl: './gall1.component.html',
  styleUrls: ['./gall1.component.css'],
})
export class Gall1Component implements OnInit {
  images: Image[] = [];
  constructor(private imageService: ImagesService) {
    this.images = this.imageService.images.filter(
      (img) => img.gallery === 'beauty'
    );
  }

  ngOnInit(): void {}
}
