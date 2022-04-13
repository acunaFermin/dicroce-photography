import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall2Component } from './gall2.component';
import { GalleryService } from '../gallery.service';
import { GmatrixModule } from '../gmatrix/gmatrix.module';
import { Gall2RouterModule } from './gall2-router.module';

@NgModule({
  declarations: [Gall2Component],
  imports: [CommonModule, GmatrixModule, Gall2RouterModule],
  providers: [GalleryService],
})
export class Gall2Module {}
