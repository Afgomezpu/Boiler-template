import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurarContraComponent} from './restaurar-contra.component'
const routes: Routes = [{
path:'',
component:RestaurarContraComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurarContraRoutingModule { }
