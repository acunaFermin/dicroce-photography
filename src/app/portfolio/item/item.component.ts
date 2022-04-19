import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  preventRouter: boolean = false;
  imagePreview!: ImagePreview;

  constructor(private portfolioService: PortfolioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
      let addImageStyle = '';

      //estilo sin imagen
      if (!item.link) {
        addImageStyle = `
          background-size: 50%;
          background-position: center;
          box-shadow: inset 0 0 2px black;`;
      }

      item.imagen1.style = `
        background-image: url("assets/${item.imagen1.gallery}/${item.imagen1.name}");
        ${addImageStyle}        
      `;
      item.imagen2.style = `
        background-image: url("assets/${item.imagen2.gallery}/${item.imagen2.name}");
        ${addImageStyle}
        `;
      item.imagen3.style = `
        background-image: url("assets/${item.imagen3.gallery}/${item.imagen3.name}");
        ${addImageStyle}
        `;

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
    });
  }

  getImagePreview(imagePreview: ImagePreview) {
    this.imagePreview = imagePreview;
    this.createItemPortfolio();
  }
}
