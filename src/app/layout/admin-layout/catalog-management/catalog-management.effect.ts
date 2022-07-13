import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap, switchMapTo } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as catalogMgmtActions from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';


@Injectable()
export class CatalogManagementEffects {
  @Effect()
  getAllCatalogList$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAllCatalogList>(catalogMgmtActions.ActionTypes.getAllCatalogList),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/get-all-productInfo?pageNumber=${payload.pageNo}&pageSize=100`, method: 'get' }, true, false).pipe(
        switchMap(response => [
          new catalogMgmtActions.StoreAllCatalogList(response),
          new catalogMgmtActions.StoreCatalogDetailsById(null),
          new catalogMgmtActions.StoreBrandsListBasedOnCategory(null),
          new catalogMgmtActions.StoreAttributesBasedOnCategory(null)
        ])
      ))
  );
  @Effect()
  getElasticCatalogList$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetElasticCatalogList>(catalogMgmtActions.ActionTypes.getElasticCatalogList),
    switchMap((action) =>
    this.requestService.request({ url: `/api/api-elastic-ms/master-product/search`, method: 'post', payload: action.payload}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new catalogMgmtActions.StoreElasticCatalogList(response),
        new catalogMgmtActions.StoreCatalogDetailsById(null),
        new catalogMgmtActions.StoreBrandsListBasedOnCategory(null),
        new catalogMgmtActions.StoreAttributesBasedOnCategory(null)
      ])
    ))
  );
  @Effect()
  getElasticPrivateProducts$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetElasticPrivateProducts>(catalogMgmtActions.ActionTypes.getElasticPrivateProducts),
    switchMap((action) =>
    this.requestService.request({ url: `/api/api-elastic-ms/global/private-product-list`, method: 'post', payload: action.payload}
    , true, false, 'application/json', '', 500, false, environment.base_url, false).pipe(
      switchMap(response => [
        new catalogMgmtActions.StoreElasticPrivateProducts(response),
      ])
    ))
  );
  @Effect()
  getAllElasticCatalogList$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAllElasticCatalogList>(catalogMgmtActions.ActionTypes.getAllElasticCatalogList),
    switchMap(({ payload }) =>
    this.requestService.request({ url: `/api/store-management/v2/admin/master-product?pageNumber=0&pageSize=10000`, method: 'get' }, true).pipe(
      switchMap(response => [
        new catalogMgmtActions.StoreAllElasticCatalogList(response['obj']),
        new catalogMgmtActions.StoreCatalogDetailsById(null),
        new catalogMgmtActions.StoreBrandsListBasedOnCategory(null),
        new catalogMgmtActions.StoreAttributesBasedOnCategory(null)
      ])
    ))
  );
  @Effect({ dispatch: true})
  getCatalogDetailsById$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetCatalogDetailsById>(catalogMgmtActions.ActionTypes.getCatalogDetailsById),
    switchMap(({ payload }) =>
    this.requestService.request({ url: `/api/ndh-product/admin/get-product-id/${payload.id}`, method: 'get' }, true).pipe(
      mergeMap((response : any) => {
        const returnArr = [];
        if (response.attributeSetId) {
          returnArr.push(new catalogMgmtActions.GetAttributesBasedOnCategory({ attributeSetId: response.attributeSetId }));
          let attributeSetIds = [];
          attributeSetIds.push(response.attributeSetId);
          returnArr.push(new catalogMgmtActions.GetAttributeDataFromIds({ attributeSetsID: attributeSetIds }));
        }
        returnArr.push(new catalogMgmtActions.StoreCatalogDetailsById(response))
        return returnArr;
      })
    ))
  );
  @Effect()
  groupActionBasedOnCategorySelection$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GroupActionsBasedOnCategorySelection>(catalogMgmtActions.ActionTypes.groupActionBasedOnCategorySelection),
    switchMap(({ payload }) => {
      const { attributeSetId } = payload;
      if (attributeSetId != null) {
        return [
          new catalogMgmtActions.GetAttributeDataFromIds({ attributeSetsID: attributeSetId }),
        ];
      }
    })
  );
  @Effect()
  getAttributeDataFromIds$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAttributeDataFromIds>(catalogMgmtActions.ActionTypes.getAttributeDataFromIds),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/all`, method: 'post', payload }, true, false).pipe(
        map(res => {
          return new catalogMgmtActions.StoreAttributeDataFromIds(res['payload'])
        })
      )
    )
  );
  @Effect()
  getAttributesBasedOnCategory$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAttributesBasedOnCategory>(catalogMgmtActions.ActionTypes.getAttributesBasedOnCategory),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/attribute/admin-api/products/catalogattributes/${payload.attributeSetId}`, method: 'get' }, true).pipe(
        map(response => new catalogMgmtActions.StoreAttributesBasedOnCategory(response))
      ))
  );
  @Effect({ dispatch: false })
  getProductAttributesByCategory$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetProductAttributesByCategory>(catalogMgmtActions.ActionTypes.getProductAttributesByCategory),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/attribute/admin-api/attributes-and-values/category/${payload.categoryId}`, method: 'get' }, true).pipe(
        map(response => {
          new catalogMgmtActions.StoreProductAttributesByCategory(response);
          if(response) {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.getProductAttributesByCategory,
              status: true,
              payload: response
            });
          }
        })
      ))
  );

  @Effect({ dispatch: false })
  getAttributesSetByCategory$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAttributesSetByCategory>(catalogMgmtActions.ActionTypes.getAttributesSetByCategory),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/catagory_attribute_set/${payload.categoryId}`, method: 'get' }, true).pipe(
        map(response => {
          new catalogMgmtActions.StoreAttributesSetByCategory(response);
          if(response) {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.getAttributesSetByCategory,
              status: true,
              payload: response
            });
          }
        })
      ))
  );

  @Effect()
  getAttributeValuesById$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetAttributeValuesById>(catalogMgmtActions.ActionTypes.getAttributeValuesById),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin-api/attribute-values/${payload.attributeId}`, method: 'get' }, true).pipe(
        map(response => new catalogMgmtActions.StoreAttributeValuesById(response))
      ))
  );

  //not using
  @Effect()
  getBrandsListBasedOnCategory$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetBrandsListBasedOnCategory>(catalogMgmtActions.ActionTypes.getBrandsListBasedOnCategory),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/brand/admin-api/brands/all-brands-for-single-categoryid/${payload.categoryId}`, method: 'get' }, true, false).pipe(
          map(response => new catalogMgmtActions.StoreBrandsListBasedOnCategory(response))
        )
      )
    );
  @Effect()
  getProductVariants$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetProductVariants>(catalogMgmtActions.ActionTypes.getProductVariants),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/store-management/v2/admin/products/catalogvariants2/${payload.attributeSetId}`, method: 'get' }, true).pipe(
          map(response => new catalogMgmtActions.StoreProductVariants(response))
        )
      )
    );
  @Effect()
  getValueBasedOnVariant$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetValueBasedOnVariant>(catalogMgmtActions.ActionTypes.getValueBasedOnVariant),
      mergeMap(({ payload }) =>
        this.requestService.request({ url: `/api/store-management/v2/admin/products/catalogvariantvalues/${payload.attributeId}`, method: 'get' }, true).pipe(
          map(response => new catalogMgmtActions.StoreValueBasedOnVariant(response))
        )
      )
    );
  @Effect()
  getAttributesList$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetAttributesList>(catalogMgmtActions.ActionTypes.getAttributesList),
      switchMap(() =>
        this.requestService.request({ url: `/api/product/admin-api/products/catalogattributes`, method: 'get' }, true).pipe(
          map(response => new catalogMgmtActions.StoreAttributesList(response))
        )
      )
    );
  @Effect()
  getAttributesValueBasedOnAttribute$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetAttributesValueBasedOnAttribute>(catalogMgmtActions.ActionTypes.getAttributesValueBasedOnAttribute),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/product/admin-api/products/attributevariants/${payload.attributeId}`, method: 'get' }, true).pipe(
          map(response => new catalogMgmtActions.StoreAttributesValueBasedOnAttribute(response))
        )
      )
    );
@Effect({ dispatch: false })
createNewCatalog$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.CreateNewCatalog>(catalogMgmtActions.ActionTypes.createNewCatalog),
    switchMap(({ payload }) =>
      //`/api/store-management/v2/admin/master-product
      this.requestService.request({ url: `/api/ndh-product/admin/add-product`, method: 'post', payload }, true).pipe(
        map(res => {
          this.router.navigate(['catalog/manage-master-catalog']);
          this.dialog.closeAll()

          this.apiMessageService.changeApiStatus({
            type: catalogMgmtActions.ActionTypes.createNewCatalog,
            status: true
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  approveBrandBatchList$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.ApproveBrandBatchList>(catalogMgmtActions.ActionTypes.approveBrandBatchList),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/bulk-file/bulk-brand-update`, method: 'post', payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: catalogMgmtActions.ActionTypes.approveBrandBatchList,
            status: true
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  editCatalogDetails$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.EditCatalogDetails>(catalogMgmtActions.ActionTypes.editCatalogDetails),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/ndh-product/admin/update-product/${payload.id}`, method: 'put', payload: payload }, true).pipe(
          map(res => {
            const returnArr = [];
            if (payload.attributeSetId) {
              returnArr.push(new catalogMgmtActions.GetAttributesBasedOnCategory({ attributeSetId: payload.attributeSetId }));
              let attributeSetIds = [];
              attributeSetIds.push(payload.attributeSetId);
              returnArr.push(new catalogMgmtActions.GetAttributeDataFromIds({ attributeSetsID: attributeSetIds }));
            }
            return returnArr;
          })
        )
      )
    );
  @Effect({ dispatch: false })
  addProductImage$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.AddProductImage>(catalogMgmtActions.ActionTypes.addProductImage),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/ndh-product/admin/add-product-image`, method: 'post', payload: payload }, true).pipe(
          map((res: any) => {
            if(res)
            {
              console.log(res);
              this.apiMessageService.changeApiStatus({
                type: catalogMgmtActions.ActionTypes.addProductImage,
                status: true,
                payload: res
              });
            }
          })
        )
      )
    );
  @Effect({ dispatch: false })
  addNewVariantToConfigurableProduct$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.AddNewVariantToConfigurableProduct>(catalogMgmtActions.ActionTypes.addNewVariantToConfigurableProduct),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/product/admin-api/products/update/variant/${payload.confId}/ui`, method: 'post', payload: payload.data }, true).pipe(
          map(res => {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.addNewVariantToConfigurableProduct,
              status: true,
              payload: { nupc: res['message'].split('|')[1].trim(), variantValue: payload.data, variantIndex: payload.index }
            });
          })
        )
      )
    );
  @Effect()
  getProductBasedOnSku$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetProductDetailsFromSku>(catalogMgmtActions.ActionTypes.getProductDetailsFromSku),
      mergeMap(({ payload }) =>
        this.requestService.request({ url: `/api/store-management/v2/admin/products-nupc/${payload.nupc}`, method: 'get' }, true).pipe(
          map(res => new catalogMgmtActions.StorePorductDetialsFromSku({ nupc: payload.nupc, response: res }))
        )
      )
    );
  @Effect()
  getInactiveCatalog$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetInactiveCatalogManagement>(catalogMgmtActions.ActionTypes.getInactiveCatalogManagement),
      mergeMap(() =>
        this.requestService.request({ url: `/api/product/admin-api/products-grid?pageSize=100000`, method: 'get' }, true).pipe(
          map(res => new catalogMgmtActions.StoreGetInactiveCatalogManagement(res))
        )
      )
    );
  @Effect()
  getNoSellerCatalog$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetNoSellerCatalogManagement>(catalogMgmtActions.ActionTypes.getNoSellerCatalogManagement),
      mergeMap(() =>
        this.requestService.request({ url: `/api/product/admin-api/products-grid?pageSize=100000`, method: 'get' }, true).pipe(
          map(res => new catalogMgmtActions.StoreNoSellerCatalogManagement(res))
        )
      )
    );
  @Effect()
  getPendingCatalog$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetPendingCatalogManagement>(catalogMgmtActions.ActionTypes.getPendingCatalogManagement),
    mergeMap(() =>
      this.requestService.request({ url: `/api/product/admin-api/products-grid`, method: 'get' }, true).pipe(
        map(res => new catalogMgmtActions.StorePendingCatalogManagement(res))
      )
    )
  );
  @Effect()
  getCatalogFilesData$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetCatalogFilesAllData>(catalogMgmtActions.ActionTypes.getCatalogFilesAllData),
    switchMap(({ payload }) =>
      this.requestService.request({
        url: `/api/ndh-product/bulk-process/find-all/${payload.type}`,
        method: 'get'
      }, true).pipe(
        map(res => new catalogMgmtActions.StoreCatalogFilesAllData(res))
      )
    )
  );
  @Effect()
  getBrandBatchList$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetBrandBatchList>(catalogMgmtActions.ActionTypes.getBrandBatchList),
    switchMap(({ payload }) =>
      this.requestService.request({
        url: `/api/ndh-product/bulk-file/get-brand-list/${payload.batchId}`,
        method: 'get'
      }, true).pipe(
        map((res: any) => new catalogMgmtActions.StoreBrandBatchList(res.payload))
      )
    )
  );
  @Effect()
  getDataBasedOnFileId$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetDataBasedOfFileId>(catalogMgmtActions.ActionTypes.getDataBasedOfFileId),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/store-management/v2/admin/products-details-temp-grid/${payload.fileId}`, method: 'get' }, true).pipe(
        map(res => new catalogMgmtActions.StoreDataBasedOnFileId(res))
      )
    )
  );
  @Effect()
  getProductDataBasedOnFileId$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetProductDetailsFromFile>(catalogMgmtActions.ActionTypes.getProductDetailsFromFile),
    mergeMap(({ payload }) =>
      this.requestService.request({
        url: `/api/store-management/v2/admin/products-details-temp/${payload.productId}`, method: 'get'
      }, true).pipe(
        mergeMap(response => {
          const responseDetails = response['payload'][0];
          const configurableProductIds = JSON.parse(responseDetails.configurableProductIds);
          const configurableProductSkus = JSON.parse(responseDetails.configurableProductSkus);
          let skuApiArr = [];
          if (configurableProductSkus) {
            if (configurableProductSkus.length > 0) {
              skuApiArr = configurableProductIds.map((id, index) => new catalogMgmtActions.GetDetailsOnConfigurableIdFromFile({ productId: id, productSku: configurableProductSkus[index] }));
            }
          }
          console.log(skuApiArr);
          return [
            new catalogMgmtActions.StoreProductDetailsFromFile(response),
            ...skuApiArr
          ];
        })
      )
    )
  );
  @Effect()
  getDetailsOnConfigurableIdFromFile$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetDetailsOnConfigurableIdFromFile>(catalogMgmtActions.ActionTypes.getDetailsOnConfigurableIdFromFile),
    mergeMap(({ payload }) =>
      this.requestService.request({
        url: `/api/product/admin-api/products-details-temp/${payload.productId}`, method: 'get'
      }, true).pipe(
        map(res =>
          new catalogMgmtActions.StoreDetailsOnConfigurableIdFromFile({ id: payload.productId, data: res })
        )
      )
    )
  );
  @Effect({ dispatch: false })
  editCatalogFileDetails$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.EditCatalogFileDetails>(catalogMgmtActions.ActionTypes.editCatalogFileDetails),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/product/admin-api/products/update-temp/ui`, method: 'post', payload: payload.data }, true).pipe(
        map(res => {
          console.log('IN EDIT TYPE', payload.index);
          this.apiMessageService.changeApiStatus({
            type: catalogMgmtActions.ActionTypes.editCatalogFileDetails,
            status: true,
            payload: { data: typeof payload.index === 'undefined' ? payload.data : payload.index, editType: payload.editType }
          });
          if (payload.editType === 'editVariantDetails') {
            return EMPTY;
          } else {
            return EMPTY;
          }
        })
      )
    )
  );
  @Effect({ dispatch: false })
  addNewVariantToConfigurableProductInCatalogFile$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.AddNewVariantToConfigurableProductInCatalogFile>(catalogMgmtActions.ActionTypes.addNewVariantToConfigurableProductInCatalogFile),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/product/admin-api/products/update-temp/variant/${payload.confId}/ui`, method: 'post', payload: payload.data }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({
            type: catalogMgmtActions.ActionTypes.addNewVariantToConfigurableProductInCatalogFile,
            status: true,
            payload: { nupc: res['message'].split('|')[1].trim(), variantValue: payload.data, variantIndex: payload.index }
          });
        })
      )
    )
  );
  @Effect({ dispatch: false })
  approveRejectPendingCatalog$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.ApproveRejectPendingCatalog>(catalogMgmtActions.ActionTypes.approveRejectPendingCatalog),
    switchMap(({ payload }) => {
      let request = null;
      if (payload.type === 'APPROVED') {
        request = this.requestService.request({ url: `/api/product/admin-api/products-approve`, method: 'post', payload: payload.data }, true)
      } else {
        request = this.requestService.request({ url: `/api/product/admin-api/products-reject`, method: 'post', payload: payload.data }, true)
      }
      return (request.pipe(
        map(res => {
          const url = window.location.pathname.split('/');
          const navigateUrl = url.slice(0, -2).join('/');
          this.router.navigate([navigateUrl]);
        })
      ))
    })
  );
  @Effect()
  competitorAnalysisPost$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.PostCompetitorAnalysis>(catalogMgmtActions.ActionTypes.competitorAnalysisPost),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/operations/price/insert/list`, method: 'post', payload: payload }, true, false).pipe(
        map(res => {
          let errMessage = ''
          if (res['payload']) {
            res['payload'].forEach(err => {
              errMessage = errMessage + "," + err;
            });
            this.toaster.success('Success');
          } else {
            this.toaster.success('Success')
          }

          return new catalogMgmtActions.GetPriceDetailOfCatalog(payload.priceCompareList[0]['ndhProductId']);
        })
      )
    )
  );

  @Effect()
  deleteCompetitorAnalysis$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteCompetitorAnalysis>(catalogMgmtActions.ActionTypes.deleteCompetitorAnalysis),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/operations/price/delete`, method: 'post', payload: payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
            {
              type: catalogMgmtActions.ActionTypes.deleteCompetitorAnalysis,
              status: true,
              payload: res
            })

          return new catalogMgmtActions.GetPriceDetailOfCatalog(payload.ndhProductId);
        })
      )
    )
  );
  @Effect({ dispatch: false })
  deleteProductImage$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteProductImage>(catalogMgmtActions.ActionTypes.deleteProductImage),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/delete-product-image/${payload.id}`, method: 'delete'}, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
          {
            type: catalogMgmtActions.ActionTypes.deleteProductImage,
            status: true,
            payload: res
          })
        })
      )
    )
  );

  //start master variate
  @Effect({ dispatch: false })
  deleteProductVariate$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteProductVariate>(catalogMgmtActions.ActionTypes.deleteProductVariate),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/delete-product-variant/${payload.id}`, method: 'delete'}, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
          {
            type: catalogMgmtActions.ActionTypes.deleteProductVariate,
            status: true,
            payload: res
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  deleteProductPrice$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteProductPrice>(catalogMgmtActions.ActionTypes.deleteProductPrice),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/delete-product-inventory/${payload.id}`, method: 'delete'}, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
          {
            type: catalogMgmtActions.ActionTypes.deleteProductPrice,
            status: true,
            payload: res
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductVariante$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductVariante>(catalogMgmtActions.ActionTypes.updateProductVariante),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/update-product-variant`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductVarianteFull$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductVarianteFull>(catalogMgmtActions.ActionTypes.updateProductVarianteFull),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/update-product-full-variant`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          if(res) {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.updateProductVarianteFull,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductBarcode$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductBarcode>(catalogMgmtActions.ActionTypes.updateProductBarcode),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/update-product-inventory`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          
        })
      )
    )
  );
  @Effect({ dispatch: false })
  addProductBarcode$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.AddProductBarcode>(catalogMgmtActions.ActionTypes.addProductBarcode),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/add-product-inventory`, method: 'post', payload: payload }, true).pipe(
        map((res: any) => {
          if(res) {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.addProductBarcode,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  @Effect({ dispatch: false })
  addProductVariante$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.AddProductVariante>(catalogMgmtActions.ActionTypes.addProductVariante),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/admin/add-product-variant`, method: 'post', payload: payload }, true).pipe(
        map((res: any) => {
          if(res)
          {
            console.log(res);
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.addProductVariante,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  //end master variate


  //start store variate
  @Effect({ dispatch: false })
  deleteProductVariateStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteProductVariateStore>(catalogMgmtActions.ActionTypes.deleteProductVariateStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/store-product-variant-delete/${payload.id}`, method: 'delete'}, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
          {
            type: catalogMgmtActions.ActionTypes.deleteProductVariateStore,
            status: true,
            payload: res
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  deleteProductPriceStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.DeleteProductPriceStore>(catalogMgmtActions.ActionTypes.deleteProductPriceStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/store-product-inventory-delete/${payload.id}`, method: 'delete'}, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus(
          {
            type: catalogMgmtActions.ActionTypes.deleteProductPriceStore,
            status: true,
            payload: res
          })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductVarianteStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductVariante>(catalogMgmtActions.ActionTypes.updateProductVarianteStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/update-store-product-variant/${payload.id}`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductVarianteStoreFull$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductVarianteStoreFull>(catalogMgmtActions.ActionTypes.updateProductVarianteStoreFull),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/update-store-product-variant-inventory`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          if(res) {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.updateProductVarianteStoreFull,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  @Effect({ dispatch: false })
  updateProductBarcodeStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateProductBarcodeStore>(catalogMgmtActions.ActionTypes.updateProductBarcodeStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/update-store-product-inventory/${payload.id}`, method: 'put', payload: payload }, true).pipe(
        map(res => {
          
        })
      )
    )
  );
  @Effect({ dispatch: false })
  addProductBarcodeStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.AddProductBarcodeStore>(catalogMgmtActions.ActionTypes.addProductBarcodeStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/add-store-inventory`, method: 'post', payload: payload }, true).pipe(
        map((res: any) => {
          if(res)
          {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.addProductBarcodeStore,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  @Effect({ dispatch: false })
  addProductVarianteStore$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.AddProductVarianteStore>(catalogMgmtActions.ActionTypes.addProductVarianteStore),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/store/add-store-variant`, method: 'post', payload: payload }, true).pipe(
        map((res: any) => {
          if(res)
          {
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.addProductVarianteStore,
              status: true,
              payload: res
            });
          }
        })
      )
    )
  );
  //end store variate


  @Effect({ dispatch: false })
  getBulkUploadCatalog$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetBulkUploadCatalog>(catalogMgmtActions.ActionTypes.bulkUploadCatalog),
    mergeMap(({ payload }) =>
      this.requestService.request({
        url: `/api/store-management/v2/admin/temp-product/approve?fileId=${payload}`, method: 'get'
      }, true, true, 'application/json', '', 500, true).pipe(
        map(res => {
          this.toaster.success('Approved Request Sent')
          this.apiMessageService.changeApiStatus({
            type: 'BULKAPPROVE_CATALOG_EFFECT_RESPONSE',
            status: true,
          });
        })
      )
    )
  );
  @Effect()
  linkBrandWithCategory$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.LinkBrandWithCategory>(catalogMgmtActions.ActionTypes.linkBrandWithCategory),
    switchMap((action) =>
    this.requestService.request({ url: `/api/brand/admin-api/brands/categories/${action.brandId}`, method: 'post', payload: action.payload }, true).pipe(
      map(response => {
        this.apiMessageService.changeApiStatus({ type: catalogMgmtActions.ActionTypes.linkBrandWithCategory, status: true, payload: response })
        return new catalogMgmtActions.GetBrandsListBasedOnCategory({ categoryId: action.payload.categoryId });
      })
    ))
  );
  @Effect()
  addNewAttributefromCatalog$ = this.actions$
    .pipe(
    ofType<catalogMgmtActions.AddNewAttributefromCatalog>(catalogMgmtActions.ActionTypes.addNewAttributefromCatalog),
    switchMap((action) =>
    this.requestService.request({ url: `/api/ndh-product/attribute/admin-api/attributes/${action.attrId}/values`, method: 'post', payload: action.payload }, true).pipe(
      map(response => {
        this.apiMessageService.changeApiStatus({ type: catalogMgmtActions.ActionTypes.addNewAttributefromCatalog, status: true, payload: response })

        return new catalogMgmtActions.GetAttributesBasedOnCategory({ attributeSetId: action.attributeSetId });
      })
    ))
  );
  @Effect()
  getPriceDetailOfCatalog$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.GetPriceDetailOfCatalog>(catalogMgmtActions.ActionTypes.getPriceDetailOfCatalog),
    switchMap((action) =>
      this.requestService.request({ url: `/api/operations/price/reports/${action.id}`, method: 'get' }, true, false).pipe(
        map(response => new catalogMgmtActions.StorePriceDetailOfCatalog(response))
      )
    )
  );
  @Effect({ dispatch: false })
  uploadContentSheetFromAdmin$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UploadContentSheetFromAdmin>(catalogMgmtActions.ActionTypes.uploadContentSheetFromAdmin),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/bulk-file/process-bulk-master-to-store-product`, method: 'post', payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({ type: 'uploadContentSheetFromAdmin', status: true, payload: res })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  storeBulkUpdate$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.StoreBulkUpdate>(catalogMgmtActions.ActionTypes.storeBulkUpdate),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/bulk-file/bulk-product-inventory-update`, method: 'post', payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({ type: 'storeBulkUpdate', status: true, payload: res })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  masterToStoreProductUpload$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.MasterToStoreProductUpload>(catalogMgmtActions.ActionTypes.masterToStoreProductUpload),
    switchMap(({ payload }) =>
      this.requestService.request({ url: `/api/ndh-product/bulk-file/process-bulk-master-to-store-product`, method: 'post', payload }, true).pipe(
        map(res => {
          this.apiMessageService.changeApiStatus({ type: 'masterToStoreProductUpload', status: true, payload: res })
        })
      )
    )
  );
  @Effect({ dispatch: false })
  rejectBulkPendingCatatlog$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.RejectBulkPendingCatatlog>(catalogMgmtActions.ActionTypes.rejectBulkPendingCatatlog),
      switchMap((action) =>

        this.requestService.request({ url: `/api/store-management/v2/admin/products-file/reject`, method: 'post', payload: action.payload }, true).pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({ type: catalogMgmtActions.ActionTypes.rejectBulkPendingCatatlog, status: true, payload: response })


          })
        ))
    );

  //not using
  @Effect({ dispatch: false })
  uploadBulkUpdateFromAdmin$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.UploadBulkUpdateFromAdmin>(catalogMgmtActions.ActionTypes.uploadBulkUpdateFromAdmin),
      switchMap(({ payload }) =>
        this.requestService.request({ url: `/api/sellers/seller-api/bulk-price-update-by-admin`, method: 'post', payload }, true).pipe(
          map(res => {
            this.apiMessageService.changeApiStatus({ type: 'uploadBulkUpdateFromAdmin', status: true, payload: res })
          })
        )
      )
    );


  @Effect({ dispatch: false })
  changeAllowPOS$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.ChangeAllowPOS>(catalogMgmtActions.ActionTypes.changeAllowPOS),
      switchMap((action) =>
        this.requestService.request({ url: `/api/product/admin-api/ispos/${action.id}/${action.status}`, method: 'post', payload: {} }, true, false).pipe(
          map(res => {

            this.apiMessageService.changeApiStatus({ type: 'changeAllowPOS', status: true, payload: res })

          })
        )
      )
    );

  @Effect()
  getStoreProductPendingList$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetStoreProductPendingList>(
        catalogMgmtActions.ActionTypes.getStoreProductPendingList),
      switchMap((action) =>
        this.requestService.request({
          url: `/api/ndh-product/admin/store-pending-product-list?pageNumber=${action.pageNo}&pageSize=100`,
          method: 'post',
          payload: action.payload
        }, true, false).pipe(
          map(res => {
            return new catalogMgmtActions.StoreStoreProductPendingList(res)
          })
        )
      )
    );

  @Effect({ dispatch: false })
  updateStorePendingProducts$ = this.actions$
  .pipe(
    ofType<catalogMgmtActions.UpdateStorePendingProducts>(
      catalogMgmtActions.ActionTypes.updateStorePendingProducts),
    switchMap((action) =>
      this.requestService.request({
        url: `/api/ndh-product/admin/new-product-approve?productId=${action.payload.productId}`,
        method: 'put'
      }, true, false,
      ).pipe(
        map((response: any) => {
          this.dialog.closeAll();
          this.apiMessageService.changeApiStatus({
            type: catalogMgmtActions.ActionTypes.updateStorePendingProducts,
            status: true,
            payload: response
          });
        })
      )
    )
  )

  @Effect({ dispatch: false })
  bulkFileRetry$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.BulkFileRetry>(
        catalogMgmtActions.ActionTypes.bulkFileRetry),
      switchMap((action) =>
        this.requestService.request({
          url: `/api/store-management/v2/app/bulk-master-product-re-process`,
          method: 'post',
          payload: action.payload
        }, true, true,
          // 'application/json', '', 500, false, 'http://10.1.30.61:8048', true
        ).pipe(
          map(response => {
            // this.dialog.closeAll()
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.bulkFileRetry,
              status: true,
              payload: response
            });

          })
        )
      )
    )


  @Effect()
  getAttributesBasedOnCode$ = this.actions$
    .pipe(
      ofType<catalogMgmtActions.GetAttributesBasedOnCode>(
        catalogMgmtActions.ActionTypes.getAttributesBasedOnCode),
      switchMap((action) =>
        this.requestService.request({
          url: `/api/ndh-admin/store/get-attribute-details-by-code?code=${action.payload}`,
          method: 'get'
        }, true, false).pipe(
          map(res => {
            return new catalogMgmtActions.StoreGetAttributesBasedOnCode(res)
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private router: Router,
    private location: Location,
    private toaster: ToastrService,
    private dialog: MatDialog,
  ) { }
}
// /api/product/admin-api/products-reject