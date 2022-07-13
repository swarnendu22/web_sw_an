import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class staticPageManagementEffects {
  @Effect()
  getStaticPages$ = this.actions$.pipe(
    ofType<storeManagementActions.GetStaticPageManagement>(
      storeManagementActions.ActionTypes.getStaticPageManagement
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/static-page?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreStaticPageManagement(response))
        )
    )
  );
  @Effect({ dispatch: false })
  postNewStaticPage$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewStaticPageManagement>(
      storeManagementActions.ActionTypes.postNewStaticPageManagement
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/static-page',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response =>
            this.router.navigate(['store/static-page-management'])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateStaticPage$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateStaticPageManagement>(
      storeManagementActions.ActionTypes.updateStaticPageManagement
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/static-page/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/static-page-management'])))
    )
  );

  @Effect()
  getByIdStaticPage$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdStaticPageManagement>(
      storeManagementActions.ActionTypes.getByIdStaticPageManagement
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/static-page/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreStaticPageManagementById(
                response['payload']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  deleteStaticPage$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteStaticPageManagement>(
      storeManagementActions.ActionTypes.deleteStaticPageManagement
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/static-page-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => console.log('Static Page delete successfully')))
    )
  );
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) {}
}
