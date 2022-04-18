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
      preview: null,
    },
    {
      id: '2',
      name: '_MG_0724-Editar-min.jpg',
      gallery: 'beauty',
      position: 'vertical',
      preview: null,
    },
    {
      id: '3',
      name: 'Anto 2-min.jpg',
      gallery: 'beauty',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '4',
      name: 'Anto 3-min.jpg',
      gallery: 'fine-art',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '5',
      name: 'Luli C-min.jpg',
      gallery: 'fine-art',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '6',
      name: 'Luli CMYK-min.jpg',
      gallery: 'fine-art',
      position: 'vertical',
      preview: null,
    },
    {
      id: '7',
      name: '_MG_2329-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '8',
      name: '5134 CMYK-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '9',
      name: 'IMG_3192-min.jpg',
      gallery: 'personalizado',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '10',
      name: '_MG_0532-Editar-min.jpg',
      gallery: 'general',
      position: 'vertical',
      preview: null,
    },
    {
      id: '12',
      name: '_MG_0724-Editar-min.jpg',
      gallery: 'general',
      position: 'vertical',
      preview: null,
    },
    {
      id: '13',
      name: 'Anto 2-min.jpg',
      gallery: 'general',
      position: 'horizontal',
      preview: null,
    },
    {
      id: '14',
      name: '_MG_0532-Editar-min.jpg',
      gallery: 'tormentas',
      position: 'vertical',
      preview: null,
    },
    {
      id: '15',
      name: '_MG_0724-Editar-min.jpg',
      gallery: 'tormentas',
      position: 'vertical',
      preview: null,
    },
    {
      id: '16',
      name: 'Anto 2-min.jpg',
      gallery: 'tormentas',
      position: 'horizontal',
      preview: null,
    },
  ];

  constructor() {}
}
