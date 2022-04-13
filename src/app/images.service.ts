import { Injectable } from '@angular/core';
import { Image } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  //respuesta del futuro backend
  images: Image[] = [
    {
      id: '1',
      name: '_MG_0532-Editar-min.jpg',
      gallery: 'beauty',
      position: 'vertical',
    },
    {
      id: '2',
      name: '_MG_0724-Editar-min.jpg',
      gallery: 'beauty',
      position: 'vertical',
    },
    {
      id: '3',
      name: 'Anto 2-min.jpg',
      gallery: 'beauty',
      position: 'horizontal',
    },
    {
      id: '4',
      name: 'Anto 3-min.jpg',
      gallery: 'fine-art',
      position: 'horizontal',
    },
    {
      id: '5',
      name: 'Luli C-min.jpg',
      gallery: 'fine-art',
      position: 'horizontal',
    },
    {
      id: '6',
      name: 'Luli CMYK-min.jpg',
      gallery: 'fine-art',
      position: 'vertical',
    },
    {
      id: '7',
      name: '_MG_2329-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
    },
    {
      id: '8',
      name: '5134 CMYK-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
    },
    {
      id: '9',
      name: 'IMG_3192-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
    },
  ];

  constructor() {}
}
