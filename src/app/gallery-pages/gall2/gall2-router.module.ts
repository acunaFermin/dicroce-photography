import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gall2Component } from './gall2.component';

const routes: Routes = [{ path: '', component: Gall2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Gall2RouterModule {}
