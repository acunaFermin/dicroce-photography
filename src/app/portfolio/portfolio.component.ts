import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PortfolioItem } from './interfaces/portfolio-item.interfaces';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  items: PortfolioItem[] = [];
  constructor(private portfolioService: PortfolioService) {
    this.items = [...this.portfolioService.items];
    console.log(this.items);
  }

  ngOnInit(): void {}

  newPortfolioItem(newPortfolioItem: PortfolioItem) {
    console.log(newPortfolioItem);
    this.generateID(newPortfolioItem);

    this.portfolioService.items.unshift({ ...newPortfolioItem });
    this.items = this.portfolioService.items.slice(0);
  }

  generateID(newPortfolioItem: PortfolioItem) {
    newPortfolioItem.imagen1.id = this.generateUUID();
    newPortfolioItem.imagen2.id = this.generateUUID();
    newPortfolioItem.imagen3.id = this.generateUUID();

    newPortfolioItem.imagen1 = { ...newPortfolioItem.imagen1 };
    newPortfolioItem.imagen2 = { ...newPortfolioItem.imagen2 };
    newPortfolioItem.imagen3 = { ...newPortfolioItem.imagen3 };
  }

  generateUUID() {
    let ahora = new Date().getTime();

    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let aleatorio = (ahora + Math.random() * 16) % 16 | 0;
      ahora = Math.floor(ahora / 16);

      return (c == 'x' ? aleatorio : (aleatorio & 0x3) | 0x8).toString(16);
    });

    return uuid;
  }
}
