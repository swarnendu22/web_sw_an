import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as queryManagementActions from 'src/app/actions/query-management.actions';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Injectable()
export class QueryManagmentEffects {
  constructor(private request: RequestService, private actions$: Actions, private apiMessageService: ApiMessageService) { }
  @Effect()
  getElasticQuery = this.actions$.pipe(
    ofType<queryManagementActions.GetElasticQuery>(
      queryManagementActions.ActionTypes.getElasticQuery
    ),
    switchMap(() =>
      this.request.request({ url: '/api/miscellaneous/elastic_queries', method: 'get' }, true).pipe(
        map(res => new queryManagementActions.StoreElasticQuery(res))
      )
    )
  );
  @Effect()
  getElasticQueryById = this.actions$.pipe(
    ofType<queryManagementActions.GetElasticQueryById>(
      queryManagementActions.ActionTypes.getElasticQueryById
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: `/api/miscellaneous/elastic_queries/${payload.id}`, method: 'get' }, true).pipe(
        map(res => new queryManagementActions.StoreElasticQueryById(res))
      )
    )
  );
  @Effect({ dispatch: false })
  createElasticQuery = this.actions$.pipe(
    ofType<queryManagementActions.CreateElasticQuery>(
      queryManagementActions.ActionTypes.createElasticQuery
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: '/api/miscellaneous/elastic_queries', method: 'post', payload: payload.data }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: queryManagementActions.ActionTypes.createElasticQuery,
            status: true,
            payload: res
          })
          return new queryManagementActions.GetElasticQuery()
        })
      )
    )
  );
  @Effect({ dispatch: false })
  editElasticQuery = this.actions$.pipe(
    ofType<queryManagementActions.EditElasticQuery>(
      queryManagementActions.ActionTypes.editElasticQuery
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: `/api/miscellaneous/elastic_queries/${payload.id}`, method: 'put', payload: payload.data }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: queryManagementActions.ActionTypes.createElasticQuery,
            status: true,
            payload: res
          })
        })
      )
    )
  );
}