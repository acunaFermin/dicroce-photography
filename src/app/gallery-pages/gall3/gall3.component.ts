import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/images.service';
import { Image } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-gall3',
  templateUrl: './gall3.component.html',
  styleUrls: ['./gall3.component.css'],
})
export class Gall3Component implements OnInit {
  images: Image[] = [];
  constructor(private imageService: ImagesService) {
    this.images = this.imageService.images.filter(
      (img) => img.gallery === 'personalizado'
    );
  }

  ngOnInit(): void {}
}
