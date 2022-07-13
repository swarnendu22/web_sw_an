import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError, timeout } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as bannerManagementActions from 'src/app/actions/banner-management.actions';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Injectable()
export class BannerManagementEffects {
  constructor(private request: RequestService, private actions$: Actions, private apiMessageService: ApiMessageService, private router: Router) { }
  @Effect({ dispatch: false })
  createNewUiTemplateComponent = this.actions$.pipe(
    ofType<bannerManagementActions.CreateNewUiTemplateComponent>(
      bannerManagementActions.ActionTypes.createNewUiTemplateComponent
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: '/api/miscellaneous/ui_template_item_components', method: 'post', payload: payload.data }, true).pipe(
        map(res => {
          this.router.navigate(['category/banner/active-banner']);

          // this.apiMessageService.changeApiStatus({
          //   type: bannerManagementActions.ActionTypes.createNewUiTemplateComponent,
          //   status: true
          // })
        })
      )
    )
  );
  @Effect()
  getUiTemplateComponents = this.actions$.pipe(
    ofType<bannerManagementActions.GetUiTemplateComponents>(
      bannerManagementActions.ActionTypes.getUiTemplateComponents
    ),
    switchMap(() =>
      this.request.request({ url: '/api/miscellaneous/ui_template_item_components', method: 'get' }, true).pipe(
        map(res => new bannerManagementActions.StoreUiTemplateComponents(res))
      )
    )
  );
  @Effect()
  getUiTemplateComponentsById = this.actions$.pipe(
    ofType<bannerManagementActions.GetUiTemplateComponentById>(
      bannerManagementActions.ActionTypes.getUiTemplateComponentById
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: `/api/miscellaneous/ui_template_item_components/${payload.id}`, method: 'get' }, true).pipe(
        map(res => new bannerManagementActions.StoreUiTemplateComponentById(res))
      )
    )
  );
  @Effect({ dispatch: false })
  editUiTemplateComponents = this.actions$.pipe(
    ofType<bannerManagementActions.EditUiTemplateComponent>(
      bannerManagementActions.ActionTypes.editUiTemplateComponent
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: `/api/miscellaneous/ui_template_item_components/${payload.id}`, method: 'put', payload: payload.data }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: bannerManagementActions.ActionTypes.editUiTemplateComponent,
            status: true,
            payload: { id: payload.id }
          });
        })
      )
    )
  );

  @Effect()
  getFlashSalesList = this.actions$.pipe(
    ofType<bannerManagementActions.GetFlashSalesList>(
      bannerManagementActions.ActionTypes.getFlashSalesList
    ),
    switchMap(() =>
      this.request.request({ url: '/api/miscellaneous/flash_sales', method: 'get' }, true).pipe(
        map(res => new bannerManagementActions.StoreFlashSalesList(res))
      )
    )
  );

  @Effect()
  createFlashSale = this.actions$.pipe(
    ofType<bannerManagementActions.CreateFlashSale>(
      bannerManagementActions.ActionTypes.createFlashSale
    ),
    switchMap(({ payload }) =>
      this.request.request({ url: `/api/miscellaneous/flash_sales`, method: 'post', payload: payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: bannerManagementActions.ActionTypes.createFlashSale,
            status: true,

          });

          return new bannerManagementActions.ScheduleFlashSale(res);

        })
      )
    )
  );


  @Effect({ dispatch: false })
  scheduleFlashSale = this.actions$.pipe(
    ofType<bannerManagementActions.ScheduleFlashSale>(
      bannerManagementActions.ActionTypes.scheduleFlashSale
    ),
    switchMap((action) =>
      this.apiMessageService.scheduleFlashSale(action.payload).pipe(
        timeout(300000),
        map(response => {
          this.apiMessageService.changeApiStatus({ type: 'scheduleFlashSale', status: true, payload: response })
        }),
        catchError(error => { return EMPTY; })
      ))

  );


  @Effect()
  getFlashSalesDetails = this.actions$.pipe(
    ofType<bannerManagementActions.GetFlashSalesDetails>(
      bannerManagementActions.ActionTypes.getFlashSalesDetails
    ),
    switchMap((payload) =>
      this.request.request({ url: `/api/miscellaneous/flash_sales/${payload.id}`, method: 'get' }, true).pipe(
        map(res => new bannerManagementActions.StoreFlashSalesDetails(res))
      )
    )
  );


}
