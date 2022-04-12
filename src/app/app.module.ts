import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortfolioModule } from './portfolio/portfolio.module';
import { NavbarModule } from './navbar/navbar.module';
import { GalleryModule } from './gallery-pages/gallery.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortfolioModule,
    NavbarModule,
    GalleryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
