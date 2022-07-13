import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as componentActions from './../../../actions/components.actions';
import { ApiMessageService } from './../../../utils/api/api-message.service';



import { Router } from '@angular/router';

@Injectable()
export class ComponentEffects {
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) { }
  @Effect()
  getProductAttribute$ = this.actions$.pipe(
    ofType<componentActions.GetProductCategoryParentSearch>(
      componentActions.ActionTypes.getProductCategoryParentSearch
    ),
    switchMap(({ payload }) =>
      this.requestService
        .request(
          {
            url: `/api/category/admin-api/V2/categories/search?name=${payload.name}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new componentActions.StoreProductCategoryParentSearch(response)
          )
        )
    )
  );
}