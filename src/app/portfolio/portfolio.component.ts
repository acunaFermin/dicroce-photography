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
    this.portfolioService.items.unshift({ ...newPortfolioItem });
    this.items = [...this.portfolioService.items];
  }
}
