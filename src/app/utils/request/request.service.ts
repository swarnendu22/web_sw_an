import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { RequestModel } from './request.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiMessageService } from '../api/api-message.service';
import { affiliateGroupState } from '../../reducers/affiliate-group-reducer';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private router: Router,
    private apiMessageService: ApiMessageService,
    private store: Store<affiliateGroupState>,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog
  ) { }

  request(
    options: RequestModel,
    authToken: boolean = false,
    isShowMessage: boolean = true,
    accept = 'application/json',
    merchantId = '',
    timeout: number = 500,
    returnError: boolean = false,
    base_url: string = environment.base_url,
    isLoader: boolean = true
  ) {

    // console.log('Request', isShowMessage, 'authtoken', authToken)
    let header: HttpHeaders;
    if (authToken) {
      const token = localStorage.getItem('ndh-admin-auth-token');
      header = new HttpHeaders({
        Accept: `${accept}`,
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': '*',
        merchant_id: merchantId,
      });
    } else {
      header = new HttpHeaders({
        Accept: `${accept}`,
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
        'Access-Control-Allow-Origin': '*'
      });
    }





    return this.apiCall(options, header, base_url, isLoader).pipe(
      map(res => {
        // this.showMessage(res);
        this.ngxService.stop();
        if (options.method != 'get') {
          if (isShowMessage) {
            this.showMessage(res);
          }
        }
        return res;
      }),
      catchError(error => this.handleError(error, timeout, returnError))
    );
  }
  apiCall(options: RequestModel, header, base_url, isLoader) {
    if (isLoader)
      this.ngxService.start();
    // this.ngxService.stopLoader('master');
    switch (options.method) {
      case 'get': {
        return this.httpClient.get(`${base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      case 'post': {
        // console.log(options.payload);
        return this.httpClient.post(
          `${base_url}${options.url}`,
          options.payload,

          { headers: header }
        );
        break;
      }
      case 'put': {
        return this.httpClient.put(
          `${base_url}${options.url}`,
          options.payload,
          { headers: header }
        );
        break;
      }
      case 'delete': {
        return this.httpClient.delete(`${base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      default: {
        return null;
      }
    }
  }
  handleError(error: HttpErrorResponse, timeout, returnError) {
    this.ngxService.stop();
    this.toastr.error(error.error.error);
    console.log('error', error);
    // if (error.error.message === 'Invalid Token' || error.error.message === 'Invalid Client Id') {
    //   this.router.navigate(['/auth/login']);
    // }
    switch (error.status) {
      case 400: {

        if (error && (error.error.message || error.error.responseMsg)) {
          const message = error.error.message ? error.error.message : error.error.responseMsg ? error.error.responseMsg : "Error";
          this.toastr.error(message);
        } else {
          this.toastr.error('Error occured');
        }
        if (returnError) {
          this.apiMessageService.changeApiStatus({
            type: '400_BAD_REQUEST',
            status: true,
            payload: error.error,
          });
        } else {
          return EMPTY;
        }
        // return EMPTY;
      }
      case 401: {
        this.toastr.error(`${error.error.message}`);
        this.checkUserAuthentication();

        return EMPTY;
      }
      case 403: {
        console.error('403 occured');
        this.toastr.error(`${error.error.message}`);
        this.dialog.closeAll();
        this.redirectTologinScreen();
        return EMPTY;
      }
      case 404: {
        console.error('404 occured');
        return EMPTY;
      }
      case 422: {
        // this.snackBar.open(`${error.error.message}`, '', { duration: 2500 })
        this.toastr.error(`${error.error.message} `, '', { timeOut: 5000 });
        return EMPTY;
      }
      case 419: {
        this.toastr.error(`${error.error.message} `, '', { timeOut: 5000 });
        return EMPTY;
      }
      case 500: {
        const message = error.error.message
          ? error.error.message
          : 'Internal Server Error';
        this.toastr.error(message, '', { timeOut: timeout });
        if (returnError) {
          this.apiMessageService.changeApiStatus({
            type: '500_SERVER_ERROR',
            status: true,
            payload: error.error,
          });
        } else {
          return EMPTY;
        }
      }
    }
  }
  showMessage(res) {
    console.log('Toaster Called', res);
    if (res && (res.message || res.responseMsg)) {
      const message = res.message ? res.message : res.responseMsg ? res.responseMsg : "Success";
      this.toastr.success(message);
    } else {
      this.toastr.success('Success');
    }
  }

  downloadRequest(
    options: RequestModel,
    authToken: boolean = false,
    isShowMessage: boolean = true,
    accept = 'application/json',
    returnError: boolean = false
  ) {
    let header: HttpHeaders;
    if (authToken) {
      const token = localStorage.getItem('ndh-admin-auth-token');
      header = new HttpHeaders({
        Accept: `${accept}`,
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
        'X-Auth-Token': token,
      });
    } else {
      header = new HttpHeaders({
        Accept: `${accept}`,
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
      });
    }
    return this.downloadRequestApiCall(options, header).pipe(
      map(res => {
        if (options.method != 'get') {
          if (isShowMessage) {
            this.showMessage(res);
          }
        }

        return res;
      }),
      catchError(error => this.handleError(error, 500, returnError))
    );
  }

  downloadRequestApiCall(options: RequestModel, header) {
    switch (options.method) {
      case 'get': {
        return this.httpClient.get(`${environment.base_url}${options.url}`, {
          headers: header,
          responseType: 'blob' as 'json',
        });
        break;
      }
      case 'post': {
        // console.log(options.payload);
        return this.httpClient.post(
          `${environment.base_url}${options.url}`,
          options.payload,
          {
            headers: header,
            responseType: 'blob' as 'json',
          }
        );
        break;
      }
      case 'put': {
        return this.httpClient.put(
          `${environment.base_url}${options.url}`,
          options.payload,
          {
            headers: header,
            responseType: 'blob' as 'json',
          }
        );
        break;
      }
      case 'delete': {
        return this.httpClient.delete(`${environment.base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      default: {
        return null;
      }
    }
  }

  redirectTologinScreen() {
    localStorage.removeItem('ndh-admin-auth-token');
    localStorage.removeItem('ndh-admin-user-id');
    this.router.navigate(['/auth/login']);
  }

  checkUserAuthentication() {
    this.checkAuthenticationService().subscribe(
      (res: any) => { },
      err => {
        if (err.status == 401) {
          localStorage.removeItem('ndh-admin-auth-token');
          localStorage.removeItem('ndh-admin-user-id');
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  checkAuthenticationService() {
    return this.httpClient.get(`${environment.base_url}/api/valid/token`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
        'X-Auth-Token': localStorage.getItem('ndh-admin-auth-token'),
      }),
    });
  }
}
