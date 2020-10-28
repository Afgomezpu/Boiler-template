import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuardService} from '../guards/guard.service';
import {LoginModule} from '../pages/login/login.module';
import{DemoModule} from '../pages/demo/demo.module';
import {SidenavModule} from '../pages/components/sidenav/sidenav.module';
import {PageNotFoundModule} from '../pages/page-not-found/page-not-found.module';
import{RestaurarContraModule} from '../pages/restaurar-contra/restaurar-contra.module'
const routes: Routes = [
  { path: 'login', 
  loadChildren:'../pages/login/login.module#LoginModule'
  },
  { path: 'demo',
   loadChildren:'../pages/demo/demo.module#DemoModule',
   canActivate:[GuardService]
   },

  { path: '', 
  loadChildren:'../pages/components/sidenav/sidenav.module#SidenavModule'
  },
  
  { path: 'pagenotfound', 
  loadChildren:'../pages/page-not-found/page-not-found.module#PageNotFoundModule'
  }, 

  { path: 'restaurarcontrasena/:idtoken', 
  loadChildren:'../pages/restaurar-contra/restaurar-contra.module#RestaurarContraModule' },
  
  {
    path: '**',
    redirectTo: 'pagenotfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
