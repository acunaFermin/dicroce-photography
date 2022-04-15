import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmatrixComponent } from './gmatrix.component';
import { ButtonsModule } from 'src/app/buttons/buttons.module';

@NgModule({
  declarations: [GmatrixComponent],
  exports: [GmatrixComponent],
  imports: [CommonModule, ButtonsModule],
})
export class GmatrixModule {}
