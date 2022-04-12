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
      imagen1: "background-image: url('assets/beauty/_MG_0532-Editar-min.jpg')", ////////////
      imagen2: `background-image: url("assets/beauty/Anto 2-min.jpg");
    background-position-x: 80%;`,
      imagen3: `background-image: url('assets/beauty/_MG_0724-Editar-min.jpg');`,
    },
    {
      titulo: 'Fine Art',
      link: '/gallery/fine-art',
      imagen1: `background-image: url('assets/fine-art/Luli C-min.jpg');
      background-position-x: 25%;`,
      imagen2: `background-image: url('assets/fine-art/Luli CMYK-min.jpg')`,
      imagen3: `background-image: url('assets/fine-art/Anto 3-min.jpg');
      background-position-x: 30%;`,
    },
    {
      titulo: 'Retrato Personalizado',
      link: '/gallery/personalizado',
      imagen1: "background-image: url('assets/personalizado/_MG_2329-min.jpg')", ///////////////
      imagen2: `background-image: url('assets/personalizado/IMG_3192-min.jpg');
      background-position-x: 10%;`,
      imagen3: `background-image: url("assets/personalizado/5134 CMYK-min.jpg");`,
    },
  ];

  get items() {
    return [...this._items];
  }

  constructor() {}
}
