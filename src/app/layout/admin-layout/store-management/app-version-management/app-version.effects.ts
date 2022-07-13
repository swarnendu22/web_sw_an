import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class appVersionEffects {
  @Effect()
  getAppVersions$ = this.actions$.pipe(
    ofType<storeManagementActions.GetAppVersion>(
      storeManagementActions.ActionTypes.getAppVersion
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/app-versions?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreAppVersion(response))
        )
    )
  );
  @Effect({ dispatch: false })
  postNewAppVersion$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewAppVersion>(
      storeManagementActions.ActionTypes.postNewAppVersion
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/app-versions',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response =>
            this.router.navigate(['store/app-version-management'])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateAppVersion$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateAppVersion>(
      storeManagementActions.ActionTypes.updateAppVersion
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/app-versions/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => console.log('App Version update successfully')))
    )
  );

  @Effect()
  getByIdAppVersions$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdAppVersion>(
      storeManagementActions.ActionTypes.getByIdAppVersion
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/app-versions/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreAppVersionById(
                response['payload']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  deleteAppVersions$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteAppVersion>(
      storeManagementActions.ActionTypes.deleteAppVersion
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/app-versions-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => console.log('App Versions delete successfully')))
    )
  );
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) {}
}
