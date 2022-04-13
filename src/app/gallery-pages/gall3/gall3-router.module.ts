import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gall3Component } from './gall3.component';

const routes: Routes = [{ path: '', component: Gall3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Gall3RouterModule {}
