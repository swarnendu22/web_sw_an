import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as categoryActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class categoryEffects {
  @Effect()
  getCategories$ = this.actions$.pipe(
    ofType<categoryActions.GetCategory>(
      categoryActions.ActionTypes.getCategories
    ),
    switchMap((action: any) => {
      return this.requestService
        .request(
          { url: `/api/ndh-product/category/V4/categories?pageNumber=${action.payload.pageNo}&pageSize=1000`, method: 'get' },
          true
        )
        .pipe(
          map(
            response => new categoryActions.StoreCategory(response)
          )
        )
      
    })
  );

  @Effect()
  getCategoriesElastic$ = this.actions$
  .pipe(
    ofType<categoryActions.GetCategoriesElastic>(categoryActions.ActionTypes.getCategoriesElastic),
    switchMap((action) =>
    this.requestService.request({ url: `/api/api-elastic-ms/master-product/categories`, method: 'post', payload: action.payload}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new categoryActions.StoreCategoriesElastic(response)
      ])
    ))
  );

  @Effect()
  getCategoriesElasticGlobal$ = this.actions$
  .pipe(
    ofType<categoryActions.GetCategoriesElasticGlobal>(categoryActions.ActionTypes.getCategoriesElasticGlobal),
    switchMap((action) =>
    this.requestService.request({ url: `/api/api-elastic-ms/global/categories`, method: 'post', payload: action.payload}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new categoryActions.StoreCategoriesElasticGlobal(response)
      ])
    ))
  );

  @Effect()
  getAllCategoriesEffect$ = this.actions$.pipe(
    ofType<categoryActions.GetAllCategory>(
      categoryActions.ActionTypes.getAllCategories
    ),
    switchMap((action) => {
        return this.requestService
          .request(
            { url: `/api/ndh-product/category/V4/categories?pageNumber=1&pageSize=1`, method: 'get' },
            true
          )
          .pipe(
            map(
              response => new categoryActions.StoreAllCategory(response['payload'])
            )
          )
      })
  );

  @Effect()
  getParentCategoriesEffect$ = this.actions$.pipe(
    ofType<categoryActions.GetParentCategory>(
      categoryActions.ActionTypes.getParentCategories
    ),
    switchMap((action) => {
      if (action.posType == true) {
        return this.requestService
          .request(
            { url: `/api/ndh-product/category/V2/categories?pageSize=1000000&pos=true`, method: 'get' },
            true
          )
          .pipe(
            map(
              response =>
                new categoryActions.StoreParentCategory(response['payload'])
            )
          )
      } else {
        return this.requestService
          .request(
            {
              url: `/api/ndh-product/category/V2/categories?pageSize=1000000`, method: 'get'
            },
            true
          )
          .pipe(
            map(
              response =>
                new categoryActions.StoreParentCategory(response['payload'])
            )
          )
      }

    }

    )
  );


  @Effect()
  getPrivateAndMasterCategories$ = this.actions$.pipe(
    ofType<categoryActions.GetPrivateAndMasterCategories>(
      categoryActions.ActionTypes.getPrivateAndMasterCategories
    ),
    switchMap((action) => {
      return this.requestService
        .request(
          { url: `/api/ndh-product/category/all-categories`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StorePrivateAndMasterCategories(response['payload'])
          )
        )
    }
    )
  );


  @Effect()
  getStoreRelatedMasterCategories$ = this.actions$.pipe(
    ofType<categoryActions.GetStoreRelatedMasterCategories>(
      categoryActions.ActionTypes.getStoreRelatedMasterCategories
    ),
    switchMap((action) => {
      return this.requestService
        .request(
          { url: `/api/ndh-product/category/store/get-categories-by-sectorId/{sectorId}`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreStoreRelatedMasterCategories(response['payload'])
          )
        )
    }
    )
  );


  @Effect()
  getPendingCategoriesEffect$ = this.actions$.pipe(
    ofType<categoryActions.GetPendingCategory>(
      categoryActions.ActionTypes.getPendingCategories
    ),
    switchMap(() =>
      this.requestService
        .request(
          { url: '/api/category/admin-api/categories/request?pageSize=1000000', method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StorePendingCategory(response)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  postNewCategoryRequest$ = this.actions$
    .pipe(
      ofType<categoryActions.PostNewCategoryRequest>(categoryActions.ActionTypes.postNewCategoryRequest),
      switchMap((action) =>
        this.requestService.request({ url: '/api/ndh-product/category/categories', method: 'post', payload: action.payload },
          true
        )
          .pipe(
            map(response => {
              this.apiMessageService.changeApiStatus({
                type: categoryActions.ActionTypes.postNewCategoryRequest,
                status: true,
              });
            })
          )
      )
    );
  @Effect()
  getCategoryDetailsEffect$ = this.actions$.pipe(
    ofType<categoryActions.GetCategoryDetailsRequest>(
      categoryActions.ActionTypes.getCategoryDetails
    ),
    switchMap((action) =>
      this.requestService
        .request(
          { url: `/api/ndh-product/category/categories/${action.payload}`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreCategoryDetailsRequest(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  postPositionCategory$ = this.actions$
    .pipe(
      ofType<categoryActions.PostCategoryPosition>(categoryActions.ActionTypes.postCategoryPosition),
      switchMap((action) =>
        this.requestService.request({ url: '/api/ndh-product/category/categories/position', method: 'put', payload: action.payload },
          true
        )
          .pipe(
            map(response => {
              console.log(response);
            })
          )
      )
    );

  //not using
  @Effect({ dispatch: false })
  deleteCategoryCommision$ = this.actions$
    .pipe(
      ofType<categoryActions.DeleteCategoryCommision>(categoryActions.ActionTypes.deleteCategoryCommision),
      switchMap((action) =>
        this.requestService.request({ url: `/api/category/v2/admin-api/categories/commission/${action.id}`, method: 'delete', payload: {} },
          true, true
        )
          .pipe(
            map(response => {
              this.apiMessageService.changeApiStatus({ type: categoryActions.ActionTypes.deleteCategoryCommision, status: true, payload: response })
            })
          )
      )
    );

  @Effect()
  getStorePrivateCategory$ = this.actions$.pipe(
    ofType<categoryActions.GetStorePrivateCategory>(
      categoryActions.ActionTypes.getStorePrivateCategory
    ),
    switchMap((action) =>
      this.requestService
        .request(
          { url: `/api/store-management/v2/store/category/draft/list`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreStorePrivateCategory(response)
          )
        )
    )
  );


  @Effect({ dispatch: false })
  approvePrivateRequestCategory$ = this.actions$
    .pipe(
      ofType<categoryActions.ApprovePrivateRequestCategory>(categoryActions.ActionTypes.approvePrivateRequestCategory),
      switchMap((action) =>
        this.requestService.request({ url: '/api/store-management/v2/store/category/request/bulk/approve', method: 'post', payload: action.payload },
          true
        )
          .pipe(
            map(response => {
              this.apiMessageService.changeApiStatus({ type: categoryActions.ActionTypes.approvePrivateRequestCategory, status: true, payload: response })
            })
          )
      )
    );


  @Effect()
  getCategoryKeywordsRequest$ = this.actions$.pipe(
    ofType<categoryActions.GetCategoryKeywordsRequest>(
      categoryActions.ActionTypes.getCategoryKeywordsRequest
    ),
    switchMap((action) =>
      this.requestService
        .request(
          { url: `/api/store-management/v2/misc/admin/category/keyword/master/${action.payload}/list`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreCategoryKeywordsRequest(response)
          )
        )
    )
  );


  @Effect({ dispatch: false })
  approveCategoryKeywordsRequest$ = this.actions$
    .pipe(
      ofType<categoryActions.ApproveCategoryKeywordsRequest>(categoryActions.ActionTypes.approveCategoryKeywordsRequest),
      switchMap((action) =>
        this.requestService.request({ url: '/api/store-management/v2/misc/admin/category/keyword/master/approve', method: 'post', payload: action.payload },
          true
        )
          .pipe(
            map(response => {
              this.apiMessageService.changeApiStatus({ type: categoryActions.ActionTypes.approveCategoryKeywordsRequest, status: true, payload: response })
            })
          )
      )
    );


  @Effect()
  getStoreQuickLinksRequests$ = this.actions$.pipe(
    ofType<categoryActions.GetStoreQuickLinksRequests>(
      categoryActions.ActionTypes.getStoreQuickLinksRequests
    ),
    switchMap((action) =>
      this.requestService
        .request(
          { url: `/api/store-management/v2/promotion/quicklink/request/list`, method: 'get' },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreStoreQuickLinksRequests(response)
          )
        )
    )
  );


  @Effect({ dispatch: false })
  approveStoreQuickLinksRequest$ = this.actions$
  .pipe(
    ofType<categoryActions.ApproveStoreQuickLinksRequest>(categoryActions.ActionTypes.approveStoreQuickLinksRequest),
    switchMap((action) =>
      this.requestService.request({ url: '/api/store-management/v2/promotion/quicklink/request/approve', method: 'post', payload: action.payload },
        true
      )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({ type: categoryActions.ActionTypes.approveStoreQuickLinksRequest, status: true, payload: response })
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateCategoryImage$ = this.actions$
  .pipe(
    ofType<categoryActions.UpdateCategoryImage>(categoryActions.ActionTypes.updateCategoryImage),
    switchMap((action) =>
      this.requestService.request({ url: `/api/ndh-product/category/update-categories-image/${action.payload.id}`, method: 'put', payload: action.payload },
        true
      )
      .pipe(
        map(response => {
          this.apiMessageService.changeApiStatus({
            type: categoryActions.ActionTypes.updateCategoryImage,
            status: true,
            payload: response
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
