import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddItemComponent } from './add-item.component';
import { ItemModule } from '../portfolio/item/item.module';

@NgModule({
  declarations: [AddItemComponent],
  exports: [AddItemComponent],
  imports: [CommonModule, ItemModule],
})
export class AddItemModule {}
