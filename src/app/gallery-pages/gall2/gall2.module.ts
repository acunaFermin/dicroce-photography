import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall2Component } from './gall2.component';
import { GalleryService } from '../gallery.service';
import { GmatrixComponent } from '../gmatrix/gmatrix.component';
import { GmatrixModule } from '../gmatrix/gmatrix.module';

@NgModule({
  declarations: [Gall2Component],
  exports: [Gall2Component],
  imports: [CommonModule, GmatrixModule],
  providers: [GalleryService],
})
export class Gall2Module {}
