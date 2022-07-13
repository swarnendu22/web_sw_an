import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class countriesEffects {
  //   @Effect({ dispatch: false })
  //   postNewRegion$ = this.actions$.pipe(
  //     ofType<storeManagementActions.PostNewRegion>(
  //       storeManagementActions.ActionTypes.postNewRegion
  //     ),
  //     switchMap(action =>
  //       this.requestService
  //         .request(
  //           {
  //             url: '/api/geomaster/admin-api/region',
  //             method: 'post',
  //             payload: action.payload,
  //           },
  //           true
  //         )
  //         .pipe(map(response => this.router.navigate(['store/region'])))
  //     )
  //   );

  //   @Effect({ dispatch: false })
  //   updateRegion$ = this.actions$.pipe(
  //     ofType<storeManagementActions.UpdateRegion>(
  //       storeManagementActions.ActionTypes.updateRegion
  //     ),
  //     switchMap(action =>
  //       this.requestService
  //         .request(
  //           {
  //             url: `/api/geomaster/admin-api/region/${action['id']}`,
  //             method: 'put',
  //             payload: action.payload,
  //           },
  //           true
  //         )
  //         .pipe(map(response => console.log('Region update successfully')))
  //     )
  //   );

  //   @Effect()
  //   getByIdRegion$ = this.actions$.pipe(
  //     ofType<storeManagementActions.GetByIdRegion>(
  //       storeManagementActions.ActionTypes.getByIdRegion
  //     ),
  //     switchMap(action =>
  //       this.requestService
  //         .request(
  //           {
  //             url: `/api/geomaster/admin-api/region/${action['id']}`,
  //             method: 'get',
  //           },
  //           true
  //         )
  //         .pipe(
  //           map(
  //             response =>
  //               new storeManagementActions.StoreRegionById(response['payload'])
  //           )
  //         )
  //     )
  //   );
  //   constructor(
  //     private actions$: Actions,
  //     private requestService: RequestService,
  //     private apiMessageService: ApiMessageService,
  //     private router: Router
  //   ) {}
  // }
}