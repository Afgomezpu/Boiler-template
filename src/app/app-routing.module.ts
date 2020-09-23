import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, DemoComponent } from '../pages/index.pages';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
