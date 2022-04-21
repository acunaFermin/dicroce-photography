import { Injectable } from '@angular/core';
import { ImagePreview } from '../interfaces/interfaces';
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

 private _testItem: PortfolioItem = {
  id: 'id',
  titulo: 'Editar titulo',
  link: null,
  imagen1: {
   id: '',
   name: 'add-image.svg',
   gallery: 'icons',
   position: '',
  },
  imagen2: {
   id: '',
   name: 'add-image.svg',
   gallery: 'icons',
   position: '',
  },
  imagen3: {
   id: '',
   name: 'add-image.svg',
   gallery: 'icons',
   position: '',
  },
 };

 get testItem() {
  return { ...this._testItem };
 }

 //elementos a enviar si se deciden guardar los cambios
 createdItems: PortfolioItem[] = [];
 eliminatedItems: PortfolioItem[] = [];
 editatedItems: PortfolioItem[] = [];

 constructor() {}

 setImage(imagePreview: ImagePreview) {
  for (let item of this.items) {
   item.imagen1.id === imagePreview.id
    ? (item.imagen1.style = `background-image: url(${imagePreview.imagePreview.base});`)
    : item.imagen2.id === imagePreview.id
    ? (item.imagen2.style = `background-image: url(${imagePreview.imagePreview.base});`)
    : item.imagen3.id === imagePreview.id
    ? (item.imagen3.style = `background-image: url(${imagePreview.imagePreview.base});`)
    : null;

   item.imagen1.id === imagePreview.id
    ? (item.imagen1.name = '')
    : item.imagen2.id === imagePreview.id
    ? (item.imagen2.name = '')
    : item.imagen3.id === imagePreview.id
    ? (item.imagen3.name = '')
    : null;
  }
  //identificar cual item cambio, y almacenar en db
  let itemDB: PortfolioItem | null = null;

  for (let item of this.items) {
   if (item.imagen1.id === imagePreview.id) {
    itemDB = item;
   }
   if (item.imagen2.id === imagePreview.id) {
    itemDB = item;
   }
   if (item.imagen3.id === imagePreview.id) {
    itemDB = item;
   }
  }

  itemDB ? this.saveEditedItem(itemDB) : null;
 }

 //imagenes que todavia no existen en la db
 saveItem(item: PortfolioItem) {
  this.createdItems.unshift(item);
 }

 //imagenes que ya existen en la db, pero fueron editadas
 saveEditedItem(item: PortfolioItem) {
  //analizo si se quiere editar una imagen que ha sido creada, y que no existe en la db
  let i = 0;
  for (let itm of this.createdItems) {
   if (itm.id === item.id) {
    //guardo los cambios en el createdItems
    this.createdItems.splice(i, 1, item);
    return;
   }
   i++;
  }

  //analizo si la imagen ya existe en el array y la reemplazo
  if (this.editatedItems.length > 0) {
   i = 0;
   for (let itm of this.editatedItems) {
    if (itm.id === item.id) {
     this.editatedItems.splice(i, 1, item);
     return;
    }
    i++;
   }
  }
  this.editatedItems.unshift(item);
 }

 //imagenes que hay que sacar de la db
 eliminateItem(item: PortfolioItem) {
  //elimino imagenes creadas
  if (this.createdItems.length > 0) {
   let eliminatedCreatedItem: PortfolioItem | null = null;

   this.createdItems = this.createdItems.filter(
    (itm) => itm.id !== item.id,
    (eliminatedCreatedItem = item)
   );

   if (eliminatedCreatedItem) return;
  }

  //elimino imagenes editadas
  if (this.editatedItems.length > 0) {
   this.editatedItems = this.editatedItems.filter((itm) => itm.id !== item.id);
  }

  this.eliminatedItems.unshift(item);
 }
}
