import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall1Component } from './gall1.component';
import { GalleryService } from '../gallery.service';
import { GmatrixModule } from '../gmatrix/gmatrix.module';
import { Gall1RouterModule } from './gall1-router.module';

@NgModule({
  declarations: [Gall1Component],
  imports: [CommonModule, GmatrixModule, Gall1RouterModule],
  providers: [GalleryService],
})
export class Gall1Module {}
