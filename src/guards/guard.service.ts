import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ServicesProvider} from '../providers/services';


@Injectable({
  providedIn: 'root'
})
export class GuardService  implements CanActivate{
/*
se realiza la creacion del guardian por medio de token y de esta manera identificar si esta registrado
*/
  constructor(private Service:ServicesProvider,private router :Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     let ntoken =localStorage.getItem("token");
    if(ntoken){
      return true;
    }else{
      this.router.navigate(['/login']);
       return false;
    }
    
  }
}
