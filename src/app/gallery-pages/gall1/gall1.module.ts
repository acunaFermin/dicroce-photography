import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gall1Component } from './gall1.component';
import { GmatrixModule } from '../gmatrix/gmatrix.module';

@NgModule({
	declarations: [Gall1Component],
	imports: [CommonModule, GmatrixModule],
	providers: [],
})
export class Gall1Module {}
