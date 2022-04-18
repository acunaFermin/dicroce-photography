import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Sanitizer,
} from '@angular/core';
import { Image } from '../interfaces/interfaces';
import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';
import { PortfolioService } from '../portfolio/portfolio.service';

import { changeTitle } from './helpers';
import { ImagesService } from '../images.service';
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
  @Output() preview = new EventEmitter<any>();

  constructor(
    private portfolioService: PortfolioService,
    private imagesService: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  async edit() {
    if (this.title) {
      changeTitle(this.portfolioItem);
      console.log(this.portfolioItem.titulo);
    }

    if (this.image) {
      callInputFile()
        .then((file) => this.extraerBase64(file.value))
        .then((imagePreview) =>
          this.preview.emit({ imagePreview, id: this.image.id })
        );
    }
  }

  save() {
    console.log(this.portfolioItem);
    // TODO: una vez editado el item, guardarlo en la base de datos
  }

  delete() {
    // console.log('delete', this.portfolioItem);
    //TODO: eliminar el item seleccionado de la base de datos
    this.imagesService.images = this.imagesService.images.filter(
      (image) => image.id !== this.image.id
    );
    console.log('emit', this.image);

    this.deleteImage.emit(this.image);
  }

  extraerBase64($event: any) {
    return new Promise((resolve, reject) => {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/jpg;base64,' + $event.base64string
      );
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
    });
  }

  // this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
  //                + toReturnImage.base64string);
}
