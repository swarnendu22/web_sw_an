import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as manegeBrandActions from '../../../../actions/brand-management.actions';
import * as catalogMgmtActions from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class BrandManagementEffects {
  @Effect()
  getActiveBrandEffect$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetActiveBrands>(manegeBrandActions.ActionTypes.getActiveBrands),
    switchMap(({ status }) =>
      this.requestService.request({ url: `/api/ndh-product/brand-api/brands?status=${status}&pageNumber=1&pageSize=100000`, method: 'get' }, true).pipe(
        map(response => new manegeBrandActions.StoreActiveBrands(response['payload']))
      ))
  );
  @Effect()
  getInactiveBrandEffect$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetInactiveBrands>(manegeBrandActions.ActionTypes.getInactiveBrand),
    switchMap(() =>
      this.requestService.request({ url: '/api/ndh-product/brand-api/brands?status=0&pageNumber=1&pageSize=100000', method: 'get' }, true).pipe(
        map(response => new manegeBrandActions.StoreInactiveBrands(response['payload']))
      ))
  );

  @Effect()
  getActiveBrandsElastic$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetActiveBrandsElastic>(manegeBrandActions.ActionTypes.getActiveBrandsElastic),
    switchMap((action) =>
    this.requestService.request({ url: `/api/api-elastic-ms/master-product/brands`, method: 'post', payload: action.payload}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new manegeBrandActions.StoreActiveBrandsElastic(response)
      ])
    ))
  );

  @Effect()
  getGlobalBrandsElastic$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetGlobalBrandsElastic>(manegeBrandActions.ActionTypes.getGlobalBrandsElastic),
    switchMap((action: any) =>
    this.requestService.request({ url: `/api/api-elastic-ms/global/brands?from=${action.payload.from}&size=${action.payload.size}&brandName=${action.payload.brandName}`, method: 'get'}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new manegeBrandActions.StoreGlobalBrandsElastic(response)
      ])
    ))
  );

  //not using
  @Effect()
  getPendingBrandEffect$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetPendingBrands>(manegeBrandActions.ActionTypes.getPendingBrands),
    switchMap(() =>
      this.requestService.request({ url: '/api/brand/admin-api/request/brands?pageSize=100000', method: 'get' }, true).pipe(
        map(response => new manegeBrandActions.StorePendingBrands(response['payload']))
      ))
  );
  @Effect()
  postNewBrandOwner$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.PostNewBrandOwner>(manegeBrandActions.ActionTypes.postNewBrandOwner),
    switchMap(action =>
      this.requestService.request({ url: '/api/ndh-product/brand-api/save-brand-owner', method: 'post', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.postNewBrandOwner,
            status: true,
          });
          return new manegeBrandActions.StoreBrandOwnerList(response['payload']);
        })
      )
    )
  );
  @Effect()
  getBrandOwnerList$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetBrandOwnerList>(manegeBrandActions.ActionTypes.getBrandOwnerList),
    switchMap(() =>
      this.requestService.request({ url: '/api/ndh-product/brand-api/get-all-brand-owner', method: 'get' }, true).pipe(
        map(response => new manegeBrandActions.StoreBrandOwnerList(response['payload']))
      ))
  );
  @Effect({dispatch:false})
  postNewBrand$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.PostNewBrand>(manegeBrandActions.ActionTypes.postNewBrand),
    switchMap(action =>
      this.requestService.request({ url: '/api/ndh-product/brand-api/save-brand', method: 'post', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.postNewBrand,
            status: true,
            payload: response['payload']
          });
        })
      )
    )
  );

   //not using
  @Effect({dispatch:false})
  postNewBrandApproved$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.PostNewBrandApproved>(manegeBrandActions.ActionTypes.postNewBrandApproved),
    switchMap(action =>
      this.requestService.request({ url: '/api/brand/admin-api/create-brands-without-pending', method: 'post', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.postNewBrandApproved,
            status: true,
          });
        })
      )
    )
  );
  @Effect()
  showBrand$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetBrandDetails>(manegeBrandActions.ActionTypes.getBrandDeatails),
    switchMap((action) =>
      this.requestService.request({ url: `/api/ndh-product/brand-api/brands/${action.payload}`, method: 'get' }, true).pipe(
        map(response => new manegeBrandActions.StoreBrandDetails(response['payload']))
      ))
  );

  //not using
  @Effect({ dispatch: false })
  rejectPengingRequest$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.RejectPendingCategory>(manegeBrandActions.ActionTypes.rejectPendingBrandRequest),
    switchMap(action =>
      this.requestService.request({ url: `/api/brand/admin-api/request/brands-new/${action.payload.requestId}`, method: 'put', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.rejectPendingBrandRequest,
            status: true,
          });
        })
      )
    )
  );
  @Effect({ dispatch: false })
  approvedPengingRequest$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.ApprovePendingCategory>(manegeBrandActions.ActionTypes.approvePendingBrandRequest),
    switchMap(action =>
      this.requestService.request({ url: `/api/brand/admin-api/request/brands-new/${action.payload.requestId}`, method: 'put', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.approvePendingBrandRequest,
            status: true,
          });
        })
      )
    )
  );

  //not using
  @Effect({ dispatch: false })
  changeSizeChart$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.ChangeSizeChart>(manegeBrandActions.ActionTypes.changeSizeChart),
    switchMap(action =>
      this.requestService.request({ url: `/api/brand/admin-api/brands/categories/${action.relationId}/size-chart`, method: 'put', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.approvePendingBrandRequest,
            status: true,
          });
        })
      )
    )
  );

   //not using
  @Effect()
  getActiveStoreBrands$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.GetActiveStoreBrands>(manegeBrandActions.ActionTypes.getActiveStoreBrands),
    switchMap((action) =>
    this.requestService.request({ url: `/api/brand/admin-api/brand-by-store-id/${action.payload.storeId}`, method: 'get' }, true).pipe(
      map(response => new manegeBrandActions.StoreActiveStoreBrands(response))
    ))
  );
  @Effect({dispatch:false})
  postvalidateBrand$ = this.actions$
  .pipe(
    ofType<manegeBrandActions.PostvalidateBrand>(manegeBrandActions.ActionTypes.postvalidateBrand),
    switchMap(action =>
      this.requestService.request({ url: '/api/ndh-product/bulk-file/validate-data', method: 'post', payload: action.payload }, true).pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: manegeBrandActions.ActionTypes.postvalidateBrand,
            status: true,
          });
        })
      )
    )
  );
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService
  ) { }
}