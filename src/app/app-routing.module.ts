import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, DemoComponent } from '../pages/index.pages';
import {SidenavComponent} from '../pages/components/sidenav/sidenav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'principal', component:SidenavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
