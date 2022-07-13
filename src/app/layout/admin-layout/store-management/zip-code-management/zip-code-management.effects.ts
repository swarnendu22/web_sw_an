import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as storeManagementActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';

@Injectable()
export class ZipCodeManagementEffects {
  // @Effect()
  // getZip$ = this.actions$.pipe(
  //   ofType<storeManagementActions.GetZipCode>(
  //     storeManagementActions.ActionTypes.getZipCode
  //   ),
  //   switchMap(() =>
  //     this.requestService
  //       .request({ url: '/api/geomaster/admin-api/zip', method: 'get' }, true)
  //       .pipe(
  //         map(response => new storeManagementActions.StoreZipCode(response))
  //       )
  //   )
  // );

  @Effect()
  getByIdZip$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdZipCode>(
      storeManagementActions.ActionTypes.getByIdZipCode
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreByIdZipCode(response['payload'])
          )
        )
    )
  );

  // @Effect()
  // postNewZip$ = this.actions$.pipe(
  //   ofType<storeManagementActions.PostNewZipCode>(
  //     storeManagementActions.ActionTypes.postNewZipCode
  //   ),
  //   switchMap(action =>
  //     this.requestService
  //       .request(
  //         {
  //           url: '/api/geomaster/admin-api/zip',
  //           method: 'post',
  //           payload: action.payload,
  //         },
  //         true
  //       )
  //       .pipe(
  //         map(response => {
  //           this.apiMessageService.changeApiStatus({
  //             type: 'POST_NEW_ZIPCODE',
  //             status: true,
  //             payload: response,
  //           });
  //           console.log('Response', response);
  //           return new storeManagementActions.GetByIdZipCode(response['id']);
  //         })
  //       )
  //   )
  // );
  // @Effect({ dispatch: false })
  // updateZip$ = this.actions$.pipe(
  //   ofType<storeManagementActions.UpdateZipCode>(
  //     storeManagementActions.ActionTypes.updateZipCode
  //   ),
  //   switchMap(action =>
  //     this.requestService
  //       .request(
  //         {
  //           url: `/api/geomaster/admin-api/zip/${action['id']}`,
  //           method: 'put',
  //           payload: action.payload,
  //         },
  //         true
  //       )
  //       .pipe(map(response => console.log('Updates Succesfully zone')))
  //   )
  // );

  // @Effect({ dispatch: false })
  // deleteZip$ = this.actions$.pipe(
  //   ofType<storeManagementActions.DeleteZipCode>(
  //     storeManagementActions.ActionTypes.deleteZipCode
  //   ),
  //   switchMap(action =>
  //     this.requestService
  //       .request(
  //         {
  //           url: `/api/geomaster/admin-api/zip-delete/${action['id']}`,
  //           method: 'delete',
  //         },
  //         true
  //       )
  //       .pipe(map(response => console.log('Delete Succesfully zone')))
  //   )
  // );

  // Zip Zone User Effects
  @Effect()
  getUserGroup$ = this.actions$.pipe(
    ofType<storeManagementActions.GetUserGroup>(
      storeManagementActions.ActionTypes.getUserGroup
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/operations/admin-api/users-group`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreUserGroup(response))
        )
    )
  );

  @Effect()
  getZipZoneUser$ = this.actions$.pipe(
    ofType<storeManagementActions.GetZipZoneUser>(
      storeManagementActions.ActionTypes.getZipZoneUser
    ),
    switchMap(() =>
      this.requestService
        .request(
          { url: '/api/geomaster/admin-api/zip-zone-user-all?pageSize=100000', method: 'get' },
          true
        )
        .pipe(
          map(response => new storeManagementActions.StoreZipZoneUser(response))
        )
    )
  );

  @Effect()
  getZipZoneUserById$ = this.actions$.pipe(
    ofType<storeManagementActions.GetByIdZipZoneUser>(
      storeManagementActions.ActionTypes.getByIdZipZoneUser
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-zone-user/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreZipZoneUserById(response)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  postZipZoneUser$ = this.actions$.pipe(
    ofType<storeManagementActions.PostZipZoneUser>(
      storeManagementActions.ActionTypes.postZipZoneUser
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: '/api/geomaster/admin-api/zip-zone-user',
            method: 'post',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: 'POST_NEW_ZIPZONEUSER',
              status: true,
              payload: response,
            });
            this.router.navigate(['store/zip-code-management/zip-zone-user']);
          })
        )
    )
  );
  @Effect({ dispatch: false })
  updateZipZoneUser$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZipZoneUser>(
      storeManagementActions.ActionTypes.updateZipZoneUser
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-zone-user/${action['id']}`,
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Updates Succesfully zone');
            this.router.navigate(['store/zip-code-management/zip-zone-user']);
          })
        )
    )
  );

  @Effect({ dispatch: false })
  deleteZipZoneUser$ = this.actions$.pipe(
    ofType<storeManagementActions.DeleteZipZoneUser>(
      storeManagementActions.ActionTypes.deleteZipZoneUser
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-zone-user/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(map(response => console.log('Delete Succesfully zone')))
    )
  );

  @Effect()
  getUserByZoneId$ = this.actions$.pipe(
    ofType<storeManagementActions.GetUsersByZoneId>(
      storeManagementActions.ActionTypes.getUsersByZoneId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-zone-user/zone/${action['zoneId']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new storeManagementActions.StoreUserByZoneId(response)
          )
        )
    )
  );

  @Effect()
  updateUserByZoneId$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateUsersByZoneId>(
      storeManagementActions.ActionTypes.updateUsersByZoneId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip-zone-user/${action.zoneId}`,
            method: 'put',
            payload: action.payload,
          },
          true,
        )
        .pipe(
          map(response => {
            console.log('Updates Succesfully zone');
            this.apiMessageService.changeApiStatus({
              type: 'UPDATE_USER_BY_ZONEID',
              status: true,
              payload: response
            });
            action.payload['id'] = response['id']
            return new storeManagementActions.StoreUserByZoneId([action.payload]);
          })
        )
    )
  );

  @Effect()
  updateZoneZipcode$ = this.actions$.pipe(
    ofType<storeManagementActions.UpdateZipcodeByZone>(
      storeManagementActions.ActionTypes.updateZipcodeByZone
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zone/zip/zip-zone-user/${action['id']}`, //`/api/geomaster/admin-api/zone/${action['id']} Changed on 27 March 2020
            method: 'put',
            payload: action.payload,
          },
          true
        )
        .pipe(map(response => {
          // this.apiMessageService.changeApiStatus({
          //   type: 'UPDATE_NEW_ZONE_ZIPCODE',
          //   status: true,
          //   payload: response,
          // });
          console.log('Updates Succesfully zone')
          return new storeManagementActions.GetByIdZoneByZip(action['id']);
          // return this.router.navigate(['/store/zip-code-management/zone'])

        }))
    )
  );

  @Effect()
  findDuplicateZipCode$ = this.actions$.pipe(
    ofType<storeManagementActions.FindDuplicateZipCode>(
      storeManagementActions.ActionTypes.findDuplicateZipCode
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/geomaster/admin-api/zip/find-duplicate`,
            method: 'post',
            payload: action.payload,
          },
          true,
        )
        .pipe(
          map(response => {
            console.log('Duplicate Zipcode');
            this.apiMessageService.changeApiStatus({
              type: 'DUPLICATE_ZIPCODE',
              status: true,
              payload: response
            });
            return new storeManagementActions.StoreDuplicateZipCode(response);
          })
        )
    )
  );

  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) { }
}
