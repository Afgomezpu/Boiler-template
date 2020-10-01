import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ServicesProvider} from '../providers/services';


@Injectable({
  providedIn: 'root'
})
export class GuardService  implements CanActivate{

  constructor(private Service:ServicesProvider,private router :Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     let token=localStorage.getItem("token");
    if(token){
      return true;
    }else{
      this.router.navigate(['/login']);
       return false;
    }
    
  }
}
