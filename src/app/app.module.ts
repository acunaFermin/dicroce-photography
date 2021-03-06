import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortfolioModule } from './portfolio/portfolio.module';
import { NavbarModule } from './navbar/navbar.module';
import { GalleryModule } from './gallery-pages/gallery.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		PortfolioModule,
		NavbarModule,
		GalleryModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		HttpClientModule,
		SpinnerModule,
	],
	exports: [],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
