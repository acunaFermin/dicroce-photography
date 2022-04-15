import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ItemComponent } from './item/item.component';
import { PortfolioService } from './portfolio.service';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [PortfolioComponent, ItemComponent],
  exports: [PortfolioComponent],
  imports: [CommonModule, RouterModule, ButtonsModule],
  providers: [PortfolioService],
})
export class PortfolioModule {}
