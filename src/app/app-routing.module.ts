import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gall1Component } from './gallery-pages/gall1/gall1.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  {
    path: 'gallery/:galname',
    component: Gall1Component,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
