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
      id: '2',
      name: '2.jpg',
      gallery: 'retratobeauty',
      position: 'vertical',
      preview: null,
    },
    {
      id: '1',
      name: '1.jpg',
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
      id: '9',
      name: '9.jpg',
      gallery: 'retratopersonalizado',
      position: 'horizontal',
      preview: null,
    },
  ];

  private _testImages: Image = {
    id: '1',
    name: 'add-image.svg',
    gallery: 'beauty',
    position: 'vertical',
  };

  //elementos a enviar si se deciden guardar los cambios
  createdImages: Image[] = [];
  eliminatedImages: Image[] = [];
  editatedImages: Image[] = [];

  constructor() {}

  get testImages() {
    return { ...this._testImages };
  }

  deleteImagesofPortfolioItem(portfolioItem: PortfolioItem) {
    this.images = this.images.filter((image) => {
      if (
        image.gallery !==
        portfolioItem.titulo.replace(/[" "]/gi, '').toLowerCase()
      ) {
        return true;
      } else {
        this.eliminateImage(image);
        return false;
      }
    });
  }

  //imagenes que todavia no existen en la db
  saveImage(image: Image) {
    this.createdImages.unshift(image);
  }

  //imagenes que ya existen en la db, pero fueron editadas
  saveEditedImage(image: Image) {
    //analizo si se quiere editar una imagen que ha sido creada, y que no existe en la db
    let i = 0;
    for (let img of this.createdImages) {
      if (img.id === image.id) {
        //guardo los cambios en el createdImages
        this.createdImages.splice(i, 1, image);
        return;
      }
      i++;
    }

    //analizo si la imagen ya existe en el array y la reemplazo
    if (this.editatedImages.length > 0) {
      i = 0;
      for (let img of this.editatedImages) {
        if (img.id === image.id) {
          this.editatedImages.splice(i, 1, image);
          return;
        }
        i++;
      }
    }
    this.editatedImages.unshift(image);
  }

  //imagenes que hay que sacar de la db
  eliminateImage(image: Image) {
    //elimino imagenes creadas
    if (this.createdImages.length > 0) {
      this.createdImages = this.createdImages.filter(
        (img) => img.id !== image.id
      );
      return;
    }

    //elimino imagenes editadas
    if (this.editatedImages.length > 0) {
      this.editatedImages = this.editatedImages.filter(
        (img) => img.id !== image.id
      );
    }

    this.eliminatedImages.unshift(image);
    console.log(this.eliminatedImages);
  }
}
