import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmatrixModule } from './gmatrix/gmatrix.module';
import { Gall1Module } from './gall1/gall1.module';
import { ImagesService } from './images.service';

@NgModule({
	imports: [CommonModule, Gall1Module, GmatrixModule],
	providers: [ImagesService],
})
export class GalleryModule {}
