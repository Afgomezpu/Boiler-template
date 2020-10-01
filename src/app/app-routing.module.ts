import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, DemoComponent } from '../pages/index.pages';
import {SidenavComponent} from '../pages/components/sidenav/sidenav.component';
import {PageNotFoundComponent} from '../pages/page-not-found/page-not-found.component';
import {RestaurarContraComponent} from '../pages/restaurar-contra/restaurar-contra.component';
import {GuardService} from '../guards/guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DemoComponent,canActivate:[GuardService] },
  { path: '', component:SidenavComponent },
  { path: 'Pagenotfound', component:PageNotFoundComponent }, 
  { path: 'ResturarContrasena/:idtoken', component:RestaurarContraComponent },
  {
    path: '**',
    redirectTo: 'Pagenotfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
