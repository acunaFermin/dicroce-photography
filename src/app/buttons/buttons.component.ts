import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio/portfolio.service';

import Swal from 'sweetalert2';
import { changeTitle } from './helpers';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  @Input() portfolioItem!: PortfolioItem;
  @Input() image!: Image;
  @Input() title!: string;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {}

  async edit() {
    this.title
      ? changeTitle(this.portfolioItem)
      : this.image
      ? console.log('edit image', this.image)
      : null;
  }

  save() {
    console.log(this.portfolioItem);
    // TODO: una vez editado el item, guardarlo en la base de datos
    // this.portfolioService.items.unshift(this.portfolioItem);
  }

  delete() {
    console.log('delete', this.portfolioItem);
    //TODO: eliminar el item seleccionado de la base de datos
    // this.portfolioService.items = this.portfolioService.items.filter(
    //   (item) => item !== this.portfolioItem
    // );
  }
}
