import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ItemComponent } from './item/item.component';
import { PortfolioService } from './portfolio.service';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '../buttons/buttons.module';
import { AddItemModule } from '../add-item/add-item.module';
import { ItemModule } from './item/item.module';
import { SaveChangesModule } from '../save-changes/save-changes.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [PortfolioComponent],
	exports: [PortfolioComponent],
	imports: [
		CommonModule,
		RouterModule,
		ButtonsModule,
		ItemModule,
		AddItemModule,
		SaveChangesModule,
		HttpClientModule,
	],
	providers: [PortfolioService],
})
export class PortfolioModule {}
