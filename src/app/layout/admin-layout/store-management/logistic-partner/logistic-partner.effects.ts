import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class logisticPartnerEffects {
  @Effect()
  getLogisticPartner$ = this.actions$.pipe(
    ofType<storeManagementActions.GetLogisticPartner>(
      storeManagementActions.ActionTypes.getLogisticPartner
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/logistic-company?pageSize=100000`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreLogisticPartner(
                response['payload']
              )
          )
        )
    )
  );
  @Effect({ dispatch: false })
  postNewLogisticPartner$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewLogisticPartner>(
      storeManagementActions.ActionTypes.postNewLogisticPartner
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/logistic-company',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/logistic-partner'])))
    )
  );

  @Effect({ dispatch: false })
  updateLogisticPartner$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateLogisticPartner>(
      storeManagementActions.ActionTypes.updateLogisticPartner
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/logistic-company/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Logistic Partner update successfully');
            this.router.navigate(['store/logistic-partner']);
          })
        )
    )
  );

  @Effect()
  getByIdLogisticPartner$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdLogisticPartner>(
      storeManagementActions.ActionTypes.getByIdLogisticPartner
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/logistic-company/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreLogisticPartnerById(
                response['payload']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  deleteLogisticPartner$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteLogisticPartner>(
      storeManagementActions.ActionTypes.deleteLogisticPartner
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/logistic-company/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => console.log('Logistic Partner delete successfully'))
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
