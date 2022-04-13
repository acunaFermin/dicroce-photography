import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gall1Component } from './gall1.component';

const routes: Routes = [{ path: '', component: Gall1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Gall1RouterModule {}
