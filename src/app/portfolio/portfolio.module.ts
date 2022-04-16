import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ItemComponent } from './item/item.component';
import { PortfolioService } from './portfolio.service';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '../buttons/buttons.module';
import { AddItemModule } from '../add-item/add-item.module';
import { ItemModule } from './item/item.module';

@NgModule({
  declarations: [PortfolioComponent],
  exports: [PortfolioComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonsModule,
    ItemModule,
    AddItemModule,
  ],
  providers: [PortfolioService],
})
export class PortfolioModule {}
