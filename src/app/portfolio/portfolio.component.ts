import { Component, OnInit } from '@angular/core';
import { generateUUID } from '../helpers/uuid';
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
  }

  ngOnInit(): void {}

  newPortfolioItem(newPortfolioItem: PortfolioItem) {
    this.generateID(newPortfolioItem);
    this.portfolioService.items.unshift({ ...newPortfolioItem });
    this.items = [...this.portfolioService.items];
  }

  deletePortfolioItem(portfolioItem: PortfolioItem) {
    this.portfolioService.items = this.portfolioService.items.filter(
      (item) => item.id !== portfolioItem.id
    );
    this.items = [...this.portfolioService.items];
  }

  generateID(newPortfolioItem: PortfolioItem) {
    newPortfolioItem.id = generateUUID();
    newPortfolioItem.imagen1.id = generateUUID();
    newPortfolioItem.imagen2.id = generateUUID();
    newPortfolioItem.imagen3.id = generateUUID();

    //envio por valor las imagenes

    newPortfolioItem.imagen1 = { ...newPortfolioItem.imagen1 };
    newPortfolioItem.imagen2 = { ...newPortfolioItem.imagen2 };
    newPortfolioItem.imagen3 = { ...newPortfolioItem.imagen3 };
  }
}
