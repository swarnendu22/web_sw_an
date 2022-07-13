import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class deliveryCenterEffects {
  // @Effect({ dispatch: false })
  // postNewCountry$ = this.actions$.pipe(
  //   ofType<storeManagementActions.PostNewCountry>(
  //     storeManagementActions.ActionTypes.postCountries
  //   ),
  //   switchMap(action =>
  //     this.requestService
  //       .request(
  //         {
  //           url: '/api/geomaster/admin-api/country',
  //           method: 'post',
  //           payload: action.payload,
  //         },
  //         true
  //       )
  //       .pipe(
  //         map(response => {
  //           this.apiMessageService.changeApiStatus({
  //             type: storeManagementActions.ActionTypes.postCountries,
  //             status: true,
  //           });
  //         })
  //       )
  //   )
  // );

  @Effect()
  getDeliveryCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.GetDeliveryCenter>(
      storeManagementActions.ActionTypes.getDeliveryCenter
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/delivery-center?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response => new storeManagementActions.StoreDeliveryCenter(response)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  postNewDeliveryCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewDeliveryCenter>(
      storeManagementActions.ActionTypes.postNewDeliveryCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/delivery-center',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response =>
            this.apiMessageService.changeApiStatus({
              type: 'POST_NEW_DELIVERY_CENTER',
              status: true,
              payload: response,
            })
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateDeliveryCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateDeliveryCenter>(
      storeManagementActions.ActionTypes.updateDeliveryCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/delivery-center/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => this.router.navigate(['store/delivery-center'])))
    )
  );

  @Effect()
  getByIdDeliveryCenter$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdDeliveryCenter>(
      storeManagementActions.ActionTypes.getByIdDeliveryCenter
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/delivery-center/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreDeliveryCenterById(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  getZipcodeByDeliveryCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZipcodeByDeliveryCenterId>(
      storeManagementActions.ActionTypes.getZipcodeByDeliveryCenterId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/delivery-center/zip/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreZipcodeByDeliveryCenterId(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  postNewZipcodeByDeliveryCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewZipcodeByDeliveryCenterId>(
      storeManagementActions.ActionTypes.postNewZipcodeByDeliveryCenterId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/delivery-center-zip',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.GetZipcodeByDeliveryCenterId(
                action['id']
              )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateZipcodeByDeliveryCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZipcodeByDeliveryCenterId>(
      storeManagementActions.ActionTypes.updateZipcodeByDeliveryCenterId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/delivery-center-zip/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response =>
            console.log('Updates Succesfully Delivery Center zipcode')
          )
        )
    )
  );

  @Effect({ dispatch: false })
  deleteZipcodeByDeliveryCenterId$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteZipcodeByDeliveryCenterId>(
      storeManagementActions.ActionTypes.deleteZipcodeByDeliveryCenterId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/delivery-center-zip-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => console.log('Delete Succesfully Delivery zipcode'))
        )
    )
  );

  // ///////// ZIPCODE /////////////////

  @Effect()
  getZipCode$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZipCode>(
      storeManagementActions.ActionTypes.getZipCode
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zip-all?pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreZipCode(response))
        )
    )
  );

  @Effect()
  postNewZipCode$ = this.actions$.pipe(
    ofType<storeManagementActions.PostNewZipCode>(
      storeManagementActions.ActionTypes.postNewZipCode
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zip',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(
            response => {
              console.log('POST NEW ZIPCODE', response)
              this.apiMessageService.changeApiStatus({
                type: 'POST_NEW_ZIPCODE',
                status: response['id'] ? true : false,
                payload: response,
              })
              return new storeManagementActions.GetByIdZoneByZip(response['id'])
            }
          )
        )
    )
  );

  @Effect()
  updateZipCode$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZipCode>(
      storeManagementActions.ActionTypes.updateZipCode
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Updates Succesfully zipcode', action);
            return new storeManagementActions.GetByIdZoneByZip(action['zoneId'])
          })
        )
    )
  );

  @Effect()
  deleteZipCode$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteZipCode>(
      storeManagementActions.ActionTypes.deleteZipCode
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => {
          console.log('Delete Succesfully zipcode', action)
          return new storeManagementActions.GetByIdZoneByZip(action['zoneId'])
        }))
    )
  );

  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) { }
}
