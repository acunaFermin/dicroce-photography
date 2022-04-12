import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall3Component } from './gall3.component';
import { GalleryService } from '../gallery.service';
import { GmatrixModule } from '../gmatrix/gmatrix.module';

@NgModule({
  declarations: [Gall3Component],
  exports: [Gall3Component],
  imports: [CommonModule, GmatrixModule],
  providers: [GalleryService],
})
export class Gall3Module {}
