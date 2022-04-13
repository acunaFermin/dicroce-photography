import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRouterModule } from './gallery-router.module';

import { GmatrixModule } from './gmatrix/gmatrix.module';
import { Gall1Module } from './gall1/gall1.module';
import { Gall2Module } from './gall2/gall2.module';
import { Gall3Module } from './gall3/gall3.module';

@NgModule({
  imports: [
    CommonModule,
    GalleryRouterModule,
    Gall1Module,
    Gall2Module,
    Gall3Module,
    GmatrixModule,
  ],
})
export class GalleryModule {}
