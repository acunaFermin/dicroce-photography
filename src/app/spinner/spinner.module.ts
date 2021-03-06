import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SpinnerComponent],
	exports: [SpinnerComponent],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatRadioModule,
		FormsModule,
	],
})
export class SpinnerModule {}
