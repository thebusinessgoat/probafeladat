import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> |  Promise<boolean>  {
      //console.log('Authguard > ' + localStorage.getItem('accessToken') + '<');
      if(localStorage.getItem('accessToken')) {
        return true;
      } else {
        this.router.navigate(['sign-in'], {queryParams: {returnUrl: state.url}});
      }
      
  }
}
