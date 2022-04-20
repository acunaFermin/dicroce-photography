import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagesService } from '../images.service';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio/portfolio.service';
import { selectVH } from './helpers';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  @Input() item: string = 'item';
  @Input() galname: string = 'galname';
  @Output() callGmatrix = new EventEmitter<Image>();
  @Output() newPortfolioItem = new EventEmitter<PortfolioItem>();

  testItem!: PortfolioItem;
  testImages!: Image;
  constructor(
    private imagesService: ImagesService,
    private portfolioService: PortfolioService
  ) {
    this.testItem = this.portfolioService.testItem;
    this.testImages = this.imagesService.testImages;
  }

  ngOnInit(): void {}

  addItem() {
    if (this.item === 'portfolio') {
      this.newPortfolioItem.emit({ ...this.testItem });
      return;
    }

    if (this.item === 'gallery') {
      //preguntyar si vertical u horizontal
      let position = selectVH();

      position.then((position) => {
        this.testImages.id = new Date().toString();
        this.testImages.position = position;
        this.testImages.style = `
          background-image: url("assets/icons/add-image.svg");
          background-size: 20%;
          background-repeat: no-repeat;
          background-position: center;
          box-shadow: inset 0 0 2px black;`;
        this.testImages.gallery = this.galname;

        this.callGmatrix.emit({ ...this.testImages });
      });
    }
  }
}
