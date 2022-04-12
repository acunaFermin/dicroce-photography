import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall1Component } from './gall1.component';
import { GalleryService } from '../gallery.service';
import { GmatrixModule } from '../gmatrix/gmatrix.module';

@NgModule({
  declarations: [Gall1Component],
  exports: [Gall1Component],
  imports: [CommonModule, GmatrixModule],
  providers: [GalleryService],
})
export class Gall1Module {}
