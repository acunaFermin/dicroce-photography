import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ImagesService } from 'src/app/images.service';
import { ImagePreview } from 'src/app/interfaces/interfaces';
import { PortfolioItem } from '../interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnChanges {
  @Input() items: PortfolioItem[] = [];
  @Input() newPortfolioItem!: PortfolioItem;
  @Output() portfolioItemToDelete = new EventEmitter<PortfolioItem>();

  preventRouter: boolean = false;
  imagePreview!: ImagePreview;
  constructor(private portfolioService: PortfolioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.createItemPortfolio();
  }

  ngOnInit(): void {
    this.createItemPortfolio();
  }

  @HostListener('click', ['$event'])
  @HostListener('touchstart', ['$event'])
  onClick(e: any) {
    let target = [e.target.id, e.path[3].id, e.path[2].id];

    this.preventRouter = !target.join('').match(new RegExp('edit-btn'));
  }

  createItemPortfolio() {
    this.items.forEach((item) => {
      //estilo sin imagen
      let addImageStyle = `
          background-size: 30%;
          background-position: center;
          box-shadow: inset 0 0 2px black;`;

      if (item.imagen1.preview) {
        item.imagen1.style = `background-image: url(${item.imagen1.preview});`;
        item.imagen1.name = item.imagen1.id;
      } else {
        item.imagen1.style = `
       background-image: url("assets/${item.imagen1.gallery}/${item.imagen1.name}");
     `;
      }
      if (item.imagen2.preview) {
        item.imagen2.style = `background-image: url(${item.imagen2.preview});`;
        item.imagen2.name = item.imagen2.id;
      } else {
        item.imagen2.style = `
       background-image: url("assets/${item.imagen2.gallery}/${item.imagen2.name}");
     `;
      }
      if (item.imagen3.preview) {
        item.imagen3.style = `background-image: url(${item.imagen3.preview});`;
        item.imagen3.name = item.imagen3.id;
      } else {
        item.imagen3.style = `
       background-image: url("assets/${item.imagen3.gallery}/${item.imagen3.name}");
     `;
      }

      //agrego estilos para el fondo sin imagen
      item.imagen1.name === 'add-image.svg'
        ? (item.imagen1.style += addImageStyle)
        : null;
      item.imagen2.name === 'add-image.svg'
        ? (item.imagen2.style += addImageStyle)
        : null;
      item.imagen3.name === 'add-image.svg'
        ? (item.imagen3.style += addImageStyle)
        : null;

      //previsualizacion de imagenes seleccionadas
      if (!this.imagePreview) {
        return;
      }

      item.imagen1.id === this.imagePreview.id
        ? (item.imagen1.preview = this.imagePreview.imagePreview.base)
        : item.imagen2.id === this.imagePreview.id
        ? (item.imagen2.preview = this.imagePreview.imagePreview.base)
        : item.imagen3.id === this.imagePreview.id
        ? (item.imagen3.preview = this.imagePreview.imagePreview.base)
        : null;

      item.imagen1.preview
        ? (item.imagen1.style = `background-image: url(${item.imagen1.preview});`)
        : null;
      item.imagen2.preview
        ? (item.imagen2.style = `background-image: url(${item.imagen2.preview});`)
        : null;
      item.imagen3.preview
        ? (item.imagen3.style = `background-image: url(${item.imagen3.preview});`)
        : null;
    });

    this.portfolioService.items = this.items;
  }

  getImagePreview(imagePreview: ImagePreview) {
    this.imagePreview = imagePreview;
    this.createItemPortfolio();
  }

  deletePortfolioItem(portfolioItem: PortfolioItem) {
    this.portfolioItemToDelete.emit(portfolioItem);
  }
}
