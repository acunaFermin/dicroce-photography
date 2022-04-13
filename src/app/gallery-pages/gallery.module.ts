import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmatrixModule } from './gmatrix/gmatrix.module';
import { Gall1Module } from './gall1/gall1.module';

@NgModule({
  imports: [CommonModule, Gall1Module, GmatrixModule],
})
export class GalleryModule {}
