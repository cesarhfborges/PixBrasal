import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
      private router: Router,
      private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      if (['/login'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (!['/login', '/cadastro', '/recuperarsenha'].includes(state.url)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      if (['/login'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (!['/login', '/cadastro', '/recuperarsenha'].includes(state.url)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
