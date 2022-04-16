import { Injectable } from '@angular/core';
import { PortfolioItem } from './interfaces/portfolio-item.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private _items: PortfolioItem[] = [
    {
      titulo: 'Retrato Beauty',
      link: '/gallery/beauty',
      imagen1: {
        id: '17',
        name: '_MG_0532-Editar-min.jpg',
        gallery: 'beauty',
        position: '',
      },
      imagen2: {
        id: '18',
        name: '_MG_0724-Editar-min.jpg',
        gallery: 'beauty',
        position: '',
      },
      imagen3: {
        id: '19',
        name: 'Anto 2-min.jpg',
        gallery: 'beauty',
        position: '',
      },
    },
    {
      titulo: 'Fine Art',
      link: '/gallery/fine-art',
      imagen1: {
        id: '20',
        name: 'Anto 3-min.jpg',
        gallery: 'fine-art',
        position: '',
      },
      imagen2: {
        id: '21',
        name: 'Luli C-min.jpg',
        gallery: 'fine-art',
        position: '',
      },
      imagen3: {
        id: '22',
        name: 'Luli CMYK-min.jpg',
        gallery: 'fine-art',
        position: '',
      },
    },
    {
      titulo: 'Retrato Personalizado',
      link: '/gallery/personalizado',
      imagen1: {
        id: '23',
        name: '_MG_2329-min.jpg',
        gallery: 'personalizado',
        position: '',
      },
      imagen2: {
        id: '24',
        name: '5134 CMYK-min.jpg',
        gallery: 'personalizado',
        position: '',
      },
      imagen3: {
        id: '25',
        name: 'IMG_3192-min.jpg',
        gallery: 'personalizado',
        position: '',
      },
    },
  ];

  get items() {
    return [...this._items];
  }

  constructor() {}
}
