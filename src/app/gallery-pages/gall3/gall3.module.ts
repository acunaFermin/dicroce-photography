import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall3Component } from './gall3.component';
import { GalleryService } from '../gallery.service';
import { GmatrixModule } from '../gmatrix/gmatrix.module';
import { Gall3RouterModule } from './gall3-router.module';

@NgModule({
  declarations: [Gall3Component],
  imports: [CommonModule, GmatrixModule, Gall3RouterModule],
  providers: [GalleryService],
})
export class Gall3Module {}
