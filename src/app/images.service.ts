import { Injectable } from '@angular/core';
import { Image } from './interfaces/interfaces';
import { PortfolioItem } from './portfolio/interfaces/portfolio-item.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  //respuesta del futuro backend
  images: Image[] = [
    {
      id: '1',
      name: '1.jpg',
      gallery: 'retratobeauty',
      position: 'vertical',
      preview: null,
    },
    {
      id: '2',
      name: '2.jpg',
      gallery: 'retratobeauty',
      position: 'vertical',
      preview: null,
    },
    {
      id: '3',
      name: '3.jpg',
      gallery: 'retratobeauty',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '4',
      name: '4.jpg',
      gallery: 'fineart',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '5',
      name: '5.jpg',
      gallery: 'fineart',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '6',
      name: '6.jpg',
      gallery: 'fineart',
      position: 'vertical',
      preview: null,
    },
    {
      id: '7',
      name: '7.jpg',
      gallery: 'retratopersonalizado',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '8',
      name: '8.jpg',
      gallery: 'retratopersonalizado',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '9',
      name: '9.jpg',
      gallery: 'retratopersonalizado',
      position: 'horizontal',
      preview: null,
    },
  ];

  constructor() {}

  deleteImagesofPortfolioItem(portfolioItem: PortfolioItem) {
    this.images = this.images.filter(
      (image) =>
        image.gallery !==
        portfolioItem.titulo.replace(/[" "]/gi, '').toLowerCase()
    );
  }
}
