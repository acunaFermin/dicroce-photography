import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ButtonsModule } from 'src/app/buttons/buttons.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ItemComponent],
  exports: [ItemComponent],
  imports: [CommonModule, ButtonsModule, RouterModule],
})
export class ItemModule {}
