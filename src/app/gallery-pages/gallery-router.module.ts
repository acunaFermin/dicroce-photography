import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gall1Component } from './gall1/gall1.component';
import { Gall2Component } from './gall2/gall2.component';
import { Gall3Component } from './gall3/gall3.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'beauty',
        loadChildren: () =>
          import('./gall1/gall1.module').then((m) => m.Gall1Module),
      },
      {
        path: 'fine-art',
        component: Gall2Component,
      },
      {
        path: 'personalizado',
        component: Gall3Component,
      },
      {
        path: '**',
        redirectTo: 'beauty',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRouterModule {}
