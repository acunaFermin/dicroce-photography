import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Base, Image, ImagePreview } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

import { callInputFile } from './editar-image';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  @Input() portfolioItem!: PortfolioItem;
  @Input() image!: Image;
  @Input() title!: string;
  @Output() deleteImage = new EventEmitter<Image>();
  @Output() editPortfolioItem = new EventEmitter<PortfolioItem>();
  @Output() deletePortfolioItem = new EventEmitter<PortfolioItem>();
  @Output() preview = new EventEmitter<ImagePreview>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  async edit() {
    if (this.title) {
      this.editPortfolioItem.emit(this.portfolioItem);
    }

    if (this.image) {
      callInputFile()
        .then((file) => this.extraerBase64(file.value))
        .then((imagePreview) => {
          let base: Base = imagePreview;
          this.preview.emit({ imagePreview: base, id: this.image.id });
        })
        .catch((err) => console.warn('cancelado'));
    }
  }

  delete() {
    // console.log('delete', this.portfolioItem);
    //TODO: eliminar el item seleccionado de la base de datos

    this.title ? this.deletePortfolioItem.emit(this.portfolioItem) : null;

    this.image ? this.deleteImage.emit(this.image) : null;
  }

  extraerBase64($event: any): Promise<Base> {
    return new Promise((resolve, reject) => {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/jpg;base64,' + $event.base64string
      );
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result || '',
        });
      };
    });
  }
}
