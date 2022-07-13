import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { RequestService } from '../../../utils/request/request.service';
import { RequestModel } from '../../../utils/request/request.model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpHeaders,
  HttpClient,
} from '../../../../../node_modules/@angular/common/http';
import { Store } from '@ngrx/store';
import { ResetAllStore } from 'src/app/actions/storeManagement.action';
import { GetUserMenu } from 'src/app/actions/seller-catalog-action';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  returnUrl: string;
  approval = '';
  returnSellerUrl: string;

  constructor(
    private _api: RequestService,
    private _router: Router,
    private activatedroute: ActivatedRoute,
    private _http: HttpClient,
    private _store: Store<any>
  ) {
    if (localStorage.getItem('ndh-admin-auth-token')) {
      this.approval = 'ADMIN';
    }
    this.currentUserSubject = new BehaviorSubject(this.approval);
    this.currentUser = this.currentUserSubject.asObservable();

    this.returnUrl =
      this.activatedroute.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.returnSellerUrl = this.activatedroute.snapshot.queryParams['returnUrl'] || '/seller';
  }

  public get currentUserRole(): string {
    return this.currentUserSubject.value;
  }

  login(request: RequestModel) {
    return this._api.request(request).subscribe(
      res => {
        console.log('Login Res', res);
        localStorage.setItem('ndh-admin-auth-token', res['accessToken']);
        localStorage.setItem('ndh-admin-user-id', res['userid']);
        localStorage.setItem('ndh-admin-role', res['role']);
        // if (res['roles'][0].toLowerCase() === 'seller') {
        //   this._store.dispatch(new GetUserMenu());
        //   this._router.navigate([this.returnSellerUrl]);
        // } else if (res['roles'][0].toLowerCase() === 'admin') {
        //   this._store.dispatch(new GetUserMenu());
        //   this._router.navigate([this.returnUrl]);
        // }
        // else {
        //   this._store.dispatch(new GetUserMenu());
        //   this._router.navigate([this.returnUrl]);
        // }

        this._store.dispatch(new GetUserMenu());
        this._router.navigate([this.returnUrl]);

        // if (localStorage.getItem('moduleFlow')) {
        //   this._router.navigate([localStorage.getItem('moduleFlow')]);
        // } else {

        //   localStorage.setItem('moduleFlow', this.returnUrl);
        //   console.log('Else.....', localStorage.getItem('moduleFlow'));
        //   this._router.navigate([this.returnUrl]);
        //   console.log('After Navigation.....', this.currentUserSubject.value);
        // }

        this.approval = 'ADMIN';
        this.currentUserSubject.next(this.approval);
      },
      err => this._api.handleError(err, 500, false)
    );
  }
  logout() {
    console.log('LOGOUT')
    this._store.dispatch(new ResetAllStore());
    localStorage.removeItem('adminNavMenu');
    // remove user from local storage to log user out
    localStorage.removeItem('ndh-admin-auth-token');
    localStorage.removeItem('ndh-admin-user-id');
    localStorage.removeItem('ndh-admin-role');
    this.currentUserSubject.next(null);
  }
}
