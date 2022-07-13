import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class paymentMethodEffects {
  @Effect()
  getPaymentMethod$ = this.actions$.pipe(
    ofType<storeManagementActions.GetPaymentMethod>(
      storeManagementActions.ActionTypes.getPaymentMethod
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/payment-method?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response => new storeManagementActions.StorePaymentMethod(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  postNewPaymentMethod$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewPaymentMethod>(
      storeManagementActions.ActionTypes.postNewPaymentMethod
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/payment-method',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/payment-methods'])))
    )
  );

  @Effect({ dispatch: false })
  updatePaymentMethod$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdatePaymentMethod>(
      storeManagementActions.ActionTypes.updatePaymentMethod
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/payment-method/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/payment-methods'])))
    )
  );

  @Effect()
  getByIdPaymentMethod$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdPaymentMethod>(
      storeManagementActions.ActionTypes.getByIdPaymentMethod
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/payment-method/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StorePaymentMethodById(
                response['payload']
              )
          )
        )
    )
  );
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) {}
}
