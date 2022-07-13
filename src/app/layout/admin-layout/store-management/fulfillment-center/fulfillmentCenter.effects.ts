import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class fulfillmentEffects {
  @Effect()
  getCountries$ = this.actions$.pipe(
    ofType<storeManagementActions.GetCountries>(
      storeManagementActions.ActionTypes.getCountries
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/master-api/countries?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreCountries(response))
        )
    )
  );

  @Effect({ dispatch: false })
  postNewCountry$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewCountry>(
      storeManagementActions.ActionTypes.postCountries
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/country',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: storeManagementActions.ActionTypes.postCountries,
              status: true,
            });
            this.router.navigate(['store/country']);
          })
        )
    )
  );

  @Effect()
  getByIdCountries$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdCountry>(
      storeManagementActions.ActionTypes.getByIdCountry
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/country/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response => new storeManagementActions.StoreByIdCountries(response)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateCountry$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateCountry>(
      storeManagementActions.ActionTypes.updateCountry
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/country/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/country'])))
    )
  );
  @Effect({ dispatch: false })
  deleteCountry$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteCountry>(
      storeManagementActions.ActionTypes.deleteCountry
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/country/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => console.log('Delete Succesfully Country')))
    )
  );

  @Effect()
  getFulfillmentCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.GetFulfillmentCenter>(
      storeManagementActions.ActionTypes.getFulfillmentCenter
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/fulfillment-center?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreFulfillmentCenter(
                response['payload']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  postNewFulfillmentCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewFulfillmentCenter>(
      storeManagementActions.ActionTypes.postFulfillmentCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/fulfillment-center',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(
            response =>
              this.apiMessageService.changeApiStatus({
                type: 'POST_NEW_FULFILLMENT_CENTER',
                status: true,
                payload: response,
              })
            // this.router.navigate(['store/fulfillment-center'])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateFulfillmentCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateFulfillmentCenter>(
      storeManagementActions.ActionTypes.updateFulfillmentCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/fulfillment-center/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => this.router.navigate(['store/fulfillment-center']))
        )
    )
  );

  @Effect()
  getByIdFulfillmentCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdFulfillmentCenter>(
      storeManagementActions.ActionTypes.getByIdFulfillmentCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/fulfillment-center/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          switchMap(response => [
            new storeManagementActions.StoreFulfillmentCenterById(
              response['payload']
            ),
            new storeManagementActions.GetZoneByFulfillmentCenterId(
              action['id']
            ),
          ])
        )
    )
  );
  @Effect()
  getZoneByFulfillmentCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZoneByFulfillmentCenterId>(
      storeManagementActions.ActionTypes.getZoneByFulfillmentCenterId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/fulfillment-center-all/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreZoneByFulfillmentCenterId(
                response['payload']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateZoneByFulfillmentCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZoneFulfillmentCenterById>(
      storeManagementActions.ActionTypes.updateZoneFulfillmentCenterById
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/fulfillment-center-zone/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => console.log('Zone is Update successfully')))
    )
  );

  @Effect({ dispatch: false })
  deleteZoneByFulfillmentCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteZoneByFulfillmentCenterId>(
      storeManagementActions.ActionTypes.deleteZoneFulfillmentCenterById
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/fulfillment-center-zone-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => console.log('Delete Succesfully Fulfillement zone'))
        )
    )
  );

  // ///////////////// ZONE /////////////////////

  @Effect()
  getZone$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZone>(
      storeManagementActions.ActionTypes.getZone
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zone-all?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(map(response => new storeManagementActions.StoreZone(response)))
    )
  );

  @Effect()
  getZoneCount$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZoneCount>(
      storeManagementActions.ActionTypes.getZoneCount
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zone-count-zip?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreZoneCount(response))
        )
    )
  );

  @Effect()
  getByIdZone$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdZone>(
      storeManagementActions.ActionTypes.getByIdZone
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zone/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreZoneById(response['payload']),
            new storeManagementActions.GetByIdZoneByZip(action['id'])
          )
        )
    )
  );

  @Effect()
  getByIdZoneByZip$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdZoneByZip>(
      storeManagementActions.ActionTypes.getByIdZoneByZip
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-by-zone/${action['id']}?pageSize=100000`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreZoneByZip(response['payload'])
          )
        )
    )
  );

  @Effect()
  postZoneFulfillmentCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.PostZoneFulfillmentCenter>(
      storeManagementActions.ActionTypes.postZoneFulfillmentCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/fulfillment-center-zone',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Response', response);
            return new storeManagementActions.GetZoneByFulfillmentCenterId(
              action.payload['fcId']
            );
            // return new storeManagementActions.GetByIdZipCode(response['id']);
          })
        )
    )
  );

  @Effect({ dispatch: false })
  postZone$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewZone>(
      storeManagementActions.ActionTypes.postNewZone
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zone/zip/zip-zone-user',  // /api/geomaster/admin-api/zone URL CHanged on 27 March 2020
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: 'POST_NEW_ZONE',
              status: true,
              payload: response,
            });
            console.log('Response', response);
            if (response['id'] != null) {
              // return new storeManagementActions.GetByIdZipCode(response['id']);
              this.router.navigate(['/store/zip-code-management/zone']);
            }
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateZone$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZone>(
      storeManagementActions.ActionTypes.updateZone
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zone/${action['id']}`, //`/api/geomaster/admin-api/zone/${action['id']} Changed on 27 March 2020
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => {
          this.apiMessageService.changeApiStatus({
            type: 'UPLOAD_NEW_ZONE',
            status: true,
            payload: response,
          });
          console.log('Updates Succesfully zone')
          // return this.router.navigate(['/store/zip-code-management/zone'])

        }))
    )
  );



  @Effect({ dispatch: false })
  deleteZone$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteZone>(
      storeManagementActions.ActionTypes.deleteZone
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zone-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => console.log('Delete Succesfully zone')))
    )
  );

  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) { }
}
