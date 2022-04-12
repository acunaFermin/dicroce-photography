import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ItemComponent } from './item/item.component';
import { PortfolioService } from './portfolio.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PortfolioComponent, ItemComponent],
  exports: [PortfolioComponent],
  imports: [CommonModule, RouterModule],
  providers: [PortfolioService],
})
export class PortfolioModule {}
