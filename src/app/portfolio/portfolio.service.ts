import { Injectable } from '@angular/core';
import { PortfolioItem } from './interfaces/portfolio-item.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  items: PortfolioItem[] = [
    {
      id: '1',
      titulo: 'Retrato Beauty',
      link: '/gallery/retratobeauty',
      imagen1: {
        id: '17',
        name: '1.jpg',
        gallery: 'images',
        position: '',
      },
      imagen2: {
        id: '18',
        name: '2.jpg',
        gallery: 'images',
        position: '',
      },
      imagen3: {
        id: '19',
        name: '3.jpg',
        gallery: 'images',
        position: '',
      },
    },
    {
      id: '2',
      titulo: 'Fine Art',
      link: '/gallery/fineart',
      imagen1: {
        id: '20',
        name: '4.jpg',
        gallery: 'images',
        position: '',
      },
      imagen2: {
        id: '21',
        name: '5.jpg',
        gallery: 'images',
        position: '',
      },
      imagen3: {
        id: '22',
        name: '6.jpg',
        gallery: 'images',
        position: '',
      },
    },
    {
      id: '3',
      titulo: 'Retrato Personalizado',
      link: '/gallery/retratopersonalizado',
      imagen1: {
        id: '23',
        name: '7.jpg',
        gallery: 'images',
        position: '',
      },
      imagen2: {
        id: '24',
        name: '8.jpg',
        gallery: 'images',
        position: '',
      },
      imagen3: {
        id: '25',
        name: '9.jpg',
        gallery: 'images',
        position: '',
      },
    },
  ];

  constructor() {}
}
