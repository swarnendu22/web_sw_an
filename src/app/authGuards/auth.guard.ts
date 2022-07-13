import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';

import { AuthenticationService } from '../layout/auth-layout/services/_authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  ROLE;

  constructor(
    // private _route: ActivatedRouteSnapshot,
    // private _state: RouterStateSnapshot,
    private _routerNavigate: Router,
    private _authService: AuthenticationService
  ) {
    this.ROLE = this._authService.currentUserRole;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('ndh-admin-auth-token');
    const user_id = localStorage.getItem('ndh-admin-user-id');;
    if (token && user_id) {

      return true;
    }

    this._routerNavigate.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;


    // const roles = this._route.data.roles as Array<string>;
    // if (roles === this.ROLE) {
    //   console.log('IF', roles, this.ROLE);
    //   this._routerNavigate.navigate['dashboard'];
    //   return true;
    // } else {
    //   console.log('ELSE', roles, this.ROLE);
    //   return false;
    // }
  }
}
