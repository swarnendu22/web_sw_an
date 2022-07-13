import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanActivate,
    Router,
    ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';

import { USER_ROLE } from './mock.user';
import { AuthenticationService } from '../layout/auth-layout/services/_authentication.service';

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
    ROLE;
    returnUrl: string;
    constructor(
        private activatedroute: ActivatedRoute,
        // private _state: RouterStateSnapshot,
        private _routerNavigate: Router,
        private _authService: AuthenticationService
    ) {
        this.ROLE = this._authService.currentUserRole;
    }

    canActivate(activatedroute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('ndh-admin-auth-token');
        const user_id = localStorage.getItem('ndh-admin-user-id');
        this.returnUrl = this.activatedroute.snapshot.queryParams['returnUrl'] || '/store/manage-categories';

        if (token && user_id) {

            this._routerNavigate.navigate([this.returnUrl]);
            return false;
        }
        return true;

    }
}
