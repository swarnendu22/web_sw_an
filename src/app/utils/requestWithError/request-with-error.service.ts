import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiMessageService } from '../api/api-message.service';
import { Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestModel } from '../request/request.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestWithErrorService {

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private router: Router,
    private apiMessageService: ApiMessageService,
    private store: Store<any>,
    private ngxService: NgxUiLoaderService

  ) { }

  request(
    options: RequestModel,
    authToken: boolean = false,
    isShowMessage: boolean = true,
    accept = 'application/json',
    merchantId = '',
    timeout: number = 500,
    returnError: boolean = false
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
        merchantId: merchantId,
      });
    } else {
      header = new HttpHeaders({
        Accept: `${accept}`,
        'Content-Type': 'application/json',
        'Client-Token': environment.client_token,
      });
    }

    return this.apiCall(options, header).pipe(
      map(res => {
        console.log('Res', res);
        // this.showMessage(res);
        this.ngxService.stop();
        if (options.method != 'get') {
          if (isShowMessage) {
            this.showMessage(res);
          }
        }
        return res;
      })
    );
  }
  apiCall(options: RequestModel, header) {
    this.ngxService.start();
    this.ngxService.stopLoader('master');
    switch (options.method) {
      case 'get': {
        return this.httpClient.get(`${environment.base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      case 'post': {
        // console.log(options.payload);
        return this.httpClient.post(`${environment.base_url}${options.url}`,
          options.payload,

          { headers: header }
        );
        break;
      }
      case 'put': {
        return this.httpClient.put(
          `${environment.base_url}${options.url}`,
          options.payload,
          { headers: header }
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
  handleError(error: HttpErrorResponse, timeout, returnError): any {
    console.log('error', error);
    // if (error.error.message === 'Invalid Token' || error.error.message === 'Invalid Client Id') {
    //   this.router.navigate(['/auth/login']);
    // }
    switch (error.status) {
      case 400: {
        // this.snackBar.open(`${error.error.error}`, '', { duration: 2500 });
        this.toastr.error(`${error.error.message} `);
        return EMPTY;
      }
      case 401: {
        this.toastr.error(`${error.error.message}`);
        this.checkUserAuthentication();

        return EMPTY;
      }
      case 404: {
        console.error('404 occured');
        return EMPTY;
      }
      case 422: {
        // this.snackBar.open(`${error.error.message}`, '', { duration: 2500 })
        return error;
      }
      case 500: {
        return error;
        // const message = error.error.message
        //   ? error.error.message
        //   : 'Internal Server Error';
        // this.toastr.error(message, '', { timeOut: timeout });
        // if (returnError) {
        //   this.apiMessageService.changeApiStatus({
        //     type: '500_SERVER_ERROR',
        //     status: true,
        //     payload: error.error,
        //   });
        // } else {
        //   return EMPTY;
        // }
      }
    }
  }
  showMessage(res) {
    console.log('Toaster Called');
    const message = res.message ? res.message : 'Success';

    this.toastr.success(message);
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
