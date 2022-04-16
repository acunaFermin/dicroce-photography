import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddItemComponent } from './add-item.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { PortfolioModule } from '../portfolio/portfolio.module';

@NgModule({
  declarations: [AddItemComponent, AddMenuComponent],
  exports: [AddItemComponent],
  imports: [CommonModule],
})
export class AddItemModule {}
