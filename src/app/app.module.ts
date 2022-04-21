import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortfolioModule } from './portfolio/portfolio.module';
import { NavbarModule } from './navbar/navbar.module';
import { GalleryModule } from './gallery-pages/gallery.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
 ],
 exports: [],
 providers: [],
 bootstrap: [AppComponent],
})
export class AppModule {}
