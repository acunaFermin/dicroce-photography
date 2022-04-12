import { Component, OnInit } from '@angular/core';
import { PortfolioItem } from '../interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items: PortfolioItem[] = [];
  constructor(private portfolioService: PortfolioService) {
    this.items = this.portfolioService.items;
  }

  ngOnInit(): void {}
}
