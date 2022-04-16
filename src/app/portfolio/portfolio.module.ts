import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ItemComponent } from './item/item.component';
import { PortfolioService } from './portfolio.service';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '../buttons/buttons.module';
import { AddItemModule } from '../add-item/add-item.module';

@NgModule({
  declarations: [PortfolioComponent, ItemComponent],
  exports: [PortfolioComponent, ItemComponent],
  imports: [CommonModule, RouterModule, ButtonsModule, AddItemModule],
  providers: [PortfolioService],
})
export class PortfolioModule {}
