import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PortfolioItem } from '../interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() items: PortfolioItem[] = [];
  preventRouter: boolean = false;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.items.forEach((item) => {
      let addImageStyle = '';

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
    });
  }

  @HostListener('click', ['$event'])
  @HostListener('touchstart', ['$event'])
  onClick(e: any) {
    let target = [e.target.id, e.path[3].id, e.path[2].id];

    this.preventRouter = !target.join('').match(new RegExp('edit-btn'));
  }
}
