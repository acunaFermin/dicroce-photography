import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  @Input() selection!: Image | PortfolioItem;

  constructor() {}

  ngOnInit(): void {}

  edit() {
    console.log('edit', this.selection);
  }

  save() {
    console.log('save', this.selection);
  }

  delete() {
    console.log('delete', this.selection);
  }
}
