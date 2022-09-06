import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let url: string = state.url;
    
    return this.checkLogin(url);
  }
  
  checkLogin(url: string | UrlTree) {
    console.log('URL: ', url);
    let val: string = localStorage.getItem('isUserLoggedIn');
    console.log('value', val);

    if(val != null && val == 'true') {
      if(url == '/login') {
        return this.router.parseUrl('/expenses');
      }
      else {
        return true;
      }
    }
    else {
      return this.router.parseUrl('/login');
    }
  }
}
