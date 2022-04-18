import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagesService } from '../images.service';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
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

  private _testItem: PortfolioItem = {
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

  testImages: Image = {
    id: '1',
    name: 'add-image.svg',
    gallery: 'beauty',
    position: 'vertical',
  };

  constructor(private imagesService: ImagesService) {}

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
