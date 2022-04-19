import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/app/images.service';
import { Image } from 'src/app/interfaces/interfaces';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';

@Component({
  selector: 'app-gall1',
  templateUrl: './gall1.component.html',
  styleUrls: ['./gall1.component.css'],
})
export class Gall1Component implements OnInit {
  images: Image[] = [];
  title: string = '';
  galname: string = '';

  constructor(
    private imageService: ImagesService,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //obtengo el nombre de la galeria del url
    this.galname = this.route.snapshot.paramMap.get('galname') || '';

    //obtengo titulo
    this.Title();

    //obtengo imagenes que coincidan con la galeria
    this.createGallery();
  }

  Title() {
    const secciones = this.portfolioService.items;
    console.log(this.galname);
    console.log(this.portfolioService.items);

    for (let item of secciones) {
      console.log(item.link, `/gallery/${this.galname}`);
      if (item.link === `/gallery/${this.galname}`) {
        console.log(item.titulo);

        this.title = item.titulo;
        break;
      }
    }
  }

  createGallery(addImage?: Image, imgPreview?: any) {
    addImage ? this.imageService.images.unshift(addImage) : null;

    let images = this.imageService.images.filter(
      (img) => img.gallery === this.galname
    );

    this.images = images;

    if (!imgPreview) {
      return;
    }

    images.forEach((image) => {
      console.log('gall1 compara', image.id, imgPreview.id);

      image.id === imgPreview.id
        ? (image.preview = imgPreview.imagePreview)
        : 'null';
    });

    this.images = images;

    console.log(this.images);
  }

  callFromGmatrix(addImage?: Image) {
    console.log('call from gmatrix', addImage);
    this.createGallery(addImage);
  }

  imagePreview(preview: any) {
    console.log('gall1, img preview', preview);
    this.createGallery(undefined, preview);
  }
}
