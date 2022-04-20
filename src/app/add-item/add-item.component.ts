import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio/portfolio.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  @Input() item: string = 'item';
  @Input() galname: string = 'galname';
  @Output() addImage = new EventEmitter<void>();
  @Output() newPortfolioItem = new EventEmitter<PortfolioItem>();

  testItem!: PortfolioItem;
  constructor(private portfolioService: PortfolioService) {
    this.testItem = this.portfolioService.testItem;
  }

  ngOnInit(): void {}

  addItem() {
    this.item === 'portfolio'
      ? this.newPortfolioItem.emit({ ...this.testItem })
      : null;

    this.item === 'gallery' ? this.addImage.emit() : null;
  }
}
