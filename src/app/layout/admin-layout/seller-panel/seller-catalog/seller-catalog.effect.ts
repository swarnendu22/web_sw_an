import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as manageSellerActions from '../../../../actions/seller-catalog-action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { EMPTY } from '../../../../../../node_modules/rxjs';
import { saveAs } from 'file-saver';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';


@Injectable()
export class sellerCatalogEffects {
    @Effect()
    getProductCount$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetProductCount>(manageSellerActions.ActionTypes.getProductCount),
        switchMap(() =>
        this.requestService.request({ url: '/api/sellers/store-api/store/products/count', method: 'get' }, true).pipe(
            map(response => new manageSellerActions.StoreProductCount(response))
        ))
    );

    //not using
    @Effect()
    getInStock$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetInStock>(manageSellerActions.ActionTypes.getInStock),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/store-api/store/products/${action.payload.url}?startFrom=${action.payload.startFrom}&pageSize=${action.payload.pageSize}&search=${action.payload.search}`, method: 'get' }, true).pipe(
            map(response => {
                console.log('Serach length', action.payload.search.length);
                if (action.payload.search.length === 0) {

                    return new manageSellerActions.StoreInStock(response, action.refresh)
                } else {
                    return new manageSellerActions.StoreResultOnSearch(response, action.refresh)
                }
            })
        ))
    );

    //not using
    @Effect()
    getOutOfStock$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetOutOfStock>(manageSellerActions.ActionTypes.getOutOfStock),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/store-api/store/products/${action.payload.url}?startFrom=${action.payload.startFrom}&pageSize=${action.payload.pageSize}&search=${action.payload.search}`, method: 'get' }, true).pipe(
            map(response => {
                console.log('Serach length', action.payload.search.length);
                if (action.payload.search.length === 0) {
                    return new manageSellerActions.StoreOutOfStock(response, action.refresh)
                } else {
                    return new manageSellerActions.StoreOutOfStockOnSearch(response, action.refresh)
                }
            })
        ))
    );

    //not using
    @Effect()
    getLowInventory$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetLowInventory>(manageSellerActions.ActionTypes.getLowInventory),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/store-api/store/products/${action.payload.url}?startFrom=${action.payload.startFrom}&pageSize=${action.payload.pageSize}&search=${action.payload.search}`, method: 'get' }, true).pipe(
            map(response => {
                console.log('Serach length', action.payload.search.length);
                if (action.payload.search.length === 0) {

                    return new manageSellerActions.StoreLowInventory(response, action.refresh)
                }
                else {
                    return new manageSellerActions.StoreLowInventoryOnSearch(response, action.refresh)

                }
            })
        ))
    );

    //not using
    @Effect()
    getAddedProductDetails$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetAddedProuctDetails>(manageSellerActions.ActionTypes.getAddedProuctDetails),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/product-api/product/${action.requestType}/catalogue?pid=${action.id}`, method: 'get' }, true, false, 'application/json', action.merchantId).pipe(
            map(response => new manageSellerActions.StoreAddedProuctDetails(response))
        ))
    );

    //not using
    @Effect()
    changeProductStatus$ = this.actions$
    .pipe(
        ofType<manageSellerActions.ChangeProductStatus>(manageSellerActions.ActionTypes.changeProductStatus),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-api/product/merchant/changeProductStatus', method: 'put', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.changeProductStatus, status: true, payload: response });
                console.log('dispatched');
                return new manageSellerActions.RemoveActiveInActiveFromList({ list: action.list, data: action.payload })
            })
        ))
    );

    //not using
    @Effect()
    searchProductList$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetSearchProducts>(manageSellerActions.ActionTypes.getSearchProducts),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/product-api/searchBySeller?type=text&pageNo=${action.payload.pageNo}&pageSize=${action.payload.pageSize}&value=${action.payload.value}`, method: 'get' }, true).pipe(
            map(response =>
                new manageSellerActions.StoreSearchProducts(response)
            )
        ))
    );

    //not using
    @Effect()
    searchBrandList$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetSearchBrand>(manageSellerActions.ActionTypes.getSearchBrand),
        switchMap((action) =>
            this.requestService.request({ url: `/api/brand/seller-api/brands/search?pageNumber=${action.payload.pageNumber}&pageSize=${action.payload.pageSize}&name=${action.payload.name}`, method: 'get' }, true).pipe(
                map(response =>
                    new manageSellerActions.StoreSearchBrand(response['payload'])
                )
            ))
    );

    //not using
    @Effect()
    searchCategoryList$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetSearchCategory>(manageSellerActions.ActionTypes.getSearchCategory),
        switchMap((action) =>
        this.requestService.request({ url: `/api/brand/admin-api/brands/categories/${action.payload.brandId}`, method: 'get' }, true).pipe(
            map(response =>
                new manageSellerActions.StoreSearchCategory(response['payload'])
            )
        ))
    );
    
    //not using
    @Effect()
    addToProductDetail$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetaddProductDetail>(manageSellerActions.ActionTypes.getaddProductDetail),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/product-api/product/snapView?pid=${action.payload.productId}`, method: 'get' }, true).pipe(
            map(response =>
                new manageSellerActions.StoreAddtoProductDetail(response)


            )
        ))
    );
    
    //not using
    @Effect()
    relationId$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetRelationId>(manageSellerActions.ActionTypes.getRelationId),
        switchMap((action) =>
        this.requestService.request({ url: `/api/brand/seller-api/brands/${action.payload.brandId}/category/${action.payload.categoryId}/relation`, method: 'get' }, true).pipe(
            map(response =>
                new manageSellerActions.StoreRealtionId(response['payload'])
            )
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postBrandCategoryLink$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostBrandCategoryLink>(manageSellerActions.ActionTypes.postBrandCategoryLink),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/seller-api/sellers/request/merchantBrandCatLink', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.postBrandCategoryLink, status: true, payload: response })
            })
        ))
    );

    //not using
    @Effect()
    getDosabledByYou$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetDisabledByYou>(manageSellerActions.ActionTypes.getDisabledByYou),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/store-api/store/products/${action.payload.url}?startFrom=${action.payload.startFrom}&pageSize=${action.payload.pageSize}&search=${action.payload.search}`, method: 'get' }, true).pipe(
            map(response => {
                console.log('Serach length', action.payload.search.length);
                if (action.payload.search.length === 0) {
                    return new manageSellerActions.StoreDisabledByYou(response, action.refresh)
                }
                else {
                    return new manageSellerActions.StoreDisabledByYouOnSearch(response, action.refresh)
                }
            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postShowPriceBreak$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostPriceBreakShow>(manageSellerActions.ActionTypes.postPriceBreakShow),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-admin/nspCalculationBySpByAdmin', method: 'post', payload: action.payload }, true, false, 'application/json', action.payload.merchantId).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.postPriceBreakShow, status: true, payload: response })
            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postProductAddToCatatlog$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostProductAddToCatatlog>(manageSellerActions.ActionTypes.postProductAddToCatatlog),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/store-api/store/LinkMasterProductWthStore', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.postProductAddToCatatlog, status: true, payload: response })

            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postIsAlReadySelling$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostIsAlReadySelling>(manageSellerActions.ActionTypes.postIsAlReadySelling),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/store-api/isAlreadySellingProduct', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.postIsAlReadySelling, status: true, payload: response })

            })
        ))
    );

    //not using
    @Effect()
    updateProductAddToCatalog$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UpdateProductAddToCatalog>(manageSellerActions.ActionTypes.updateProductAddToCatalog),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/price-api/updateLinkedProduct', method: 'post', payload: action.payload }, true, false, 'application/json', '', 500, true).pipe(
            switchMap(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.updateProductAddToCatalog, status: true, payload: response });
                return [
                    new manageSellerActions.ReIndexProduct({ ids: [action.payload[0]['masterPID']] }),
                    new manageSellerActions.RemoveOutofStockFromInstock({ list: action.list, data: action.payload })
                ];
            })
        ))
    );

    //not using
    @Effect()
    getSellerDashboard$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetSellerDashBoard>(manageSellerActions.ActionTypes.getSellerDashBoard),
        switchMap((action) =>
        this.requestService.request({ url: `/api/oms/api/v1/seller_panel/seller_dashboard?days=30`, method: 'get' }, true).pipe(
            map(response => {
                return new manageSellerActions.StoreSellerDashboard(response)
            })
        ))
    );
    @Effect()
    getUserMenu$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetUserMenu>(manageSellerActions.ActionTypes.getUserMenu),
        switchMap((action) =>
        this.requestService.request({ url: `/api/user/admin-api/menuControl`, method: 'get' }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({
                    type: manageSellerActions.ActionTypes.getUserMenu,
                    status: true,
                    payload: response
                  });
                return new manageSellerActions.StoreUserMenu(response)
            })
        ))
    );

    @Effect({ dispatch: false })
    uploadContentSheet$ = this.actions$
        .pipe(
            ofType<manageSellerActions.UploadContentSheet>(manageSellerActions.ActionTypes.uploadContentSheet),
            switchMap((action) =>
                this.requestService.request({ url: `/api/ndh-product/bulk-file/uploadExcel`, method: 'post', payload: action.payload }, true, true, 'application/json', '', 20000, true).pipe(
                    timeout(300000),
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: 'uploadContentSheet', status: true, payload: response })
                    })
                ))
        );
    @Effect({ dispatch: false })
    uploadBulkPrice$ = this.actions$
        .pipe(
            ofType<manageSellerActions.UploadBulkPrice>(manageSellerActions.ActionTypes.uploadBulkPrice),
            switchMap((action) =>
                this.requestService.request({ url: `/api/store-management/v2/${action.payloadtype}/bulk-price-inventory-update`, method: 'post', payload: action.payload }, true, true, 'application/json', '', 20000, true).pipe(
                    timeout(300000),
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: 'uploadBulkPrice', status: true, payload: response })

                    })
                ))
        );
    @Effect({ dispatch: false })
    bulkAction$ = this.actions$
        .pipe(
            ofType<manageSellerActions.DispatchBulkActionOnDownload>(manageSellerActions.ActionTypes.dispatchDownloadBulk),
            switchMap(({ payload }) =>
            // console.log('ACTIONS', action)
            // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
            {
                return [new manageSellerActions.DownloadBasicFile(),
                new manageSellerActions.DownloadImageFile(),
                new manageSellerActions.DownloadAtrributeFile({ attrid: payload.attrId })
                ]
            }
            )
        );
    @Effect({ dispatch: false })
    downloadBasicFile$ = this.actions$
        .pipe(
            ofType<manageSellerActions.DownloadBasicFile>(manageSellerActions.ActionTypes.downloadBasicFile),
            switchMap((action) =>
                // console.log('ACTIONS', action)
                // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
                this.requestService.downloadRequest({ url: `/api/util/admin-api/download-base-file`, method: 'get' }, true, false, 'application/vnd.ms-excel').pipe(
                    map((response: any) => {
                        var blob = new Blob(response, { type: "application/vnd.ms-excel" });
                        saveAs(blob)
                        console.log('EXCEL_DOWNLOAD', response)
                        return EMPTY;

                    }



                    )
                ))
        );
    @Effect({ dispatch: false })
    downloadImageFile$ = this.actions$
    .pipe(
        ofType<manageSellerActions.DownloadImageFile>(manageSellerActions.ActionTypes.downloadImageFile),
        switchMap((action) =>
            this.requestService.request({ url: `/api/util/admin-api/download-image-file`, method: 'get' }, true, false, 'application/vnd.ms-excel').pipe(
                map((response: any) => {
                    var blob = new Blob(response, { type: "application/vnd.ms-excel" });
                    saveAs(blob)
                    return blob;
                })
            ))
        );
    @Effect()
    downloadAttributeFile$ = this.actions$
    .pipe(
        ofType<manageSellerActions.DownloadAtrributeFile>(manageSellerActions.ActionTypes.downloadAtrributeFile),
        switchMap((action) =>
        this.requestService.request({ url: `/api/util/admin-api/download-product-attribute-file/${action.payload.attrid}`, method: 'get' }, true).pipe(
            map(response => {
                return EMPTY;

            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postNewBrand$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostSellerNewBrand>(manageSellerActions.ActionTypes.postSellerNewBrand),
        switchMap(action =>
            this.requestService.request({ url: '/api/brand/seller-api/request/brands', method: 'post', payload: action.payload }, true).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: manageSellerActions.ActionTypes.postSellerNewBrand,
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    getAllActiveSellersForBulkUpload$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetAllActiveSellersForBulkUpload>(manageSellerActions.ActionTypes.getAllActiveSellersForBulkUpload),
        switchMap(({ payload }) =>
            this.requestService.request({ url: `/api/sellers/seller-api/getAllActiveSeller`, method: 'get' }, true).pipe(
                map(res => new manageSellerActions.StoreAllActiveSellersForBulkUpload(res))
            )
        )
    )

    @Effect({ dispatch: false })
    postNspDispute$ = this.actions$
        .pipe(
            ofType<manageSellerActions.PostNspDispute>(manageSellerActions.ActionTypes.postNspDispute),
            switchMap(action =>
                this.requestService.request({ url: '/api/inbox/admin-api/request/nsp-dispute', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({
                            type: manageSellerActions.ActionTypes.postNspDispute,
                            status: true,
                        });
                    })
                )
            )
        );


    @Effect({ dispatch: false })
    postProductDispute$ = this.actions$
        .pipe(
            ofType<manageSellerActions.PostProductDispute>(manageSellerActions.ActionTypes.postProductDispute),
            switchMap(action =>
                this.requestService.request({ url: '/api/inbox/admin-api/request/product-dispute', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({
                            type: manageSellerActions.ActionTypes.postProductDispute,
                            status: true,
                        });
                    })
                )
            )
        );
    @Effect({ dispatch: false })
    postProductRelevance$ = this.actions$
        .pipe(
            ofType<manageSellerActions.PostProductRelevance>(manageSellerActions.ActionTypes.postProductRelevance),
            switchMap(action =>
                this.requestService.request({ url: '/api/inbox/admin-api/request/product-relevence', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({
                            type: manageSellerActions.ActionTypes.postProductRelevance,
                            status: true,
                        });
                    })
                )
            )
        );

    @Effect({ dispatch: false })
    postTaxCorrection$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostTaxCorrection>(manageSellerActions.ActionTypes.postTaxCorrection),
        switchMap(action =>
            this.requestService.request({ url: '/api/inbox/admin-api/request/tax-correction', method: 'post', payload: action.payload }, true).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: manageSellerActions.ActionTypes.postTaxCorrection,
                        status: true,
                    });
                })
            )
        )
    );
    @Effect({ dispatch: false })
    postTaxClassCorrection$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostTaxClassCorrection>(manageSellerActions.ActionTypes.postTaxClassCorrection),
        switchMap(action =>
            this.requestService.request({ url: '/api/inbox/admin-api/request/tax-class-correction', method: 'post', payload: action.payload }, true).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: manageSellerActions.ActionTypes.postTaxClassCorrection,
                        status: true,
                    });
                })
            )
        )
    );

    //not using
    @Effect()
    getActiveHsn$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetActiveHsnList>(manageSellerActions.ActionTypes.getActiveHsnList),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/seller-api/getAllHsnCodeList`, method: 'get' }, true).pipe(
            map(response => {
                return new manageSellerActions.StoreActiveHsnList(response)
            })
        ))
    );

    @Effect({ dispatch: false })
    createNewCatalog$ = this.actions$
    .pipe(
        ofType<manageSellerActions.CreateNewSellerCatalog>(manageSellerActions.ActionTypes.createNewSellerCatalog),
        switchMap(({ payload }) =>
            this.requestService.request({ url: `/api/product/seller-api/products/add/ui`, method: 'post', payload }, true).pipe(
                map(res => {
                    this.router.navigate(['/seller/catalog']);
                })
            )
        )
    );

    //not using
    @Effect()
    updateProductAddToCatalogAdmin$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UpdateProductAddToCatalogAdmin>(manageSellerActions.ActionTypes.updateProductAddToCatalogAdmin),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/price-api/byAdmin/updateStoreItem', method: 'post', payload: action.payload }, true, true, 'application/json', '', 500, true).pipe(
            switchMap(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.updateProductAddToCatalogAdmin, status: true, payload: response });
                return [new manageSellerActions.ReIndexProduct({ ids: [action.payload['masterPID']] }),
                ];
            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    postPriceBreakShowAdmin$ = this.actions$
    .pipe(
        ofType<manageSellerActions.PostPriceBreakShowAdmin>(manageSellerActions.ActionTypes.postPriceBreakShowAdmin),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/price-api/nspCalculationBySpByAdmin', method: 'post', payload: action.payload }, true, false, 'application/json', action.payload.merchantId).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.postPriceBreakShowAdmin, status: true, payload: response })
            })
        ))
    );

    //not using
    @Effect()
    getMultiSeller$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetMultiSellerlist>(manageSellerActions.ActionTypes.getMultiSellerlist),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/product-admin/list/${action.payload.url}?startFrom=${action.payload.startFrom}&pageSize=${action.payload.pageSize}`, method: action.payload.method, payload: action.payload.data }, true, false).pipe(
            map(response => {
                return new manageSellerActions.StoreMultiSellerlist(response, action.refresh)
            })
        ))
    );

    //not using
    @Effect()
    changeAdminApprovalStatus$ = this.actions$
    .pipe(
        ofType<manageSellerActions.ChangeAdminApprovalStatus>(manageSellerActions.ActionTypes.changeAdminApprovalStatus),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-admin/updateAdminApproval', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.changeAdminApprovalStatus, status: true, payload: response });
                return new manageSellerActions.ResetAdminApprovalStatus({ data: action.payload, type: 'updateAdminApproval' });
            })
        ))
    );

    //not using
    @Effect()
    updateNdhAssuredPopularTranding$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UpdateNdhAssuredPopularTranding>(manageSellerActions.ActionTypes.updateNdhAssuredPopularTranding),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-admin/updateNdhAssuredPopularTranding', method: 'post', payload: action.payload }, true).pipe(
            switchMap(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.updateNdhAssuredPopularTranding, status: true, payload: response })

                return [new manageSellerActions.ReIndexProduct({ ids: [action.payload['masterPID']] }),
                new manageSellerActions.ResetAdminApprovalStatus({ data: action.payload, type: 'updateNdhAssuredPopularTranding' })];
            })
        ))
    );

    //not using
    @Effect()
    updateProductDimension$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UpdateProductDimension>(manageSellerActions.ActionTypes.updateProductDimension),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-admin/updateDimentions', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.updateProductDimension, status: true, payload: response })
                return new manageSellerActions.ResetAdminApprovalStatus({ data: action.payload, type: 'updateDimentions' });
            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    uploadBulkPriceUpdate$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UploadBulkPriceUpdate>(manageSellerActions.ActionTypes.uploadBulkPriceUpdate),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/seller-api/price-file-process`, method: 'post', payload: action.payload }, true, true, 'application/json', '', 200000, true).pipe(
            timeout(300000),
            map(response => {
                this.apiMessageService.changeApiStatus({ type: 'uploadBulkPriceUpdate', status: true, payload: response })
            })
        ))
    );

    //not using
    @Effect({ dispatch: false })
    uploadDownloadBulkInventoryUpdate$ = this.actions$
    .pipe(
        ofType<manageSellerActions.UploadDownloadBulkInventoryUpdate>(manageSellerActions.ActionTypes.uploadDownloadBulkInventoryUpdate),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/seller-api/inventory-file-process`, method: 'post', payload: action.payload }, true, true, 'application/json', '', 200000, true).pipe(
            timeout(300000),
            map(response => {
                this.apiMessageService.changeApiStatus({ type: 'uploadDownloadBulkInventoryUpdate', status: true, payload: response })

            })
        ))
    );

    @Effect()
    getCollection$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetCollection>(manageSellerActions.ActionTypes.getCollection),
        switchMap((action) =>
        this.requestService.request({ url: `/api/category/admin-api/V2/collections?pageSize=1000000`, method: 'get' }, true, false).pipe(
            map(response => {
                return new manageSellerActions.StoreCollection(response)
            })
        ))
    );

    //not using
    @Effect()
    getTrackListingDetails$ = this.actions$
    .pipe(
        ofType<manageSellerActions.AdminTrackListing>(manageSellerActions.ActionTypes.adminTrackListing),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/seller-api/bulk-file-process-list-admin?type=${action.payload['type']}${action.payload['commissionMode'] ? `&commissionMode=${action.payload['commissionMode']}` : ''}&pageSize=1000000`, method: 'get' }, true, false).pipe(
            map(response => {
                return new manageSellerActions.StoreAdminTrackListing(response)
            })
        ))
    );

    @Effect({ dispatch: false })
    reIndexProduct$ = this.actions$
    .pipe(
        ofType<manageSellerActions.ReIndexProduct>(manageSellerActions.ActionTypes.reIndexProduct),
        switchMap((action) =>
        this.apiMessageService.reIndex(action.payload).pipe(
            timeout(300000),
            map(response => {
                this.apiMessageService.changeApiStatus({ type: 'reIndexProduct', status: true, payload: response })
                this.toastr.success(`ReIndex Success `);
            }),
            catchError(error => { this.toastr.error(`ReIndex Failed `);; return EMPTY; })
        ))
    );

    //not uisng
    @Effect()
    getMerchantTrackListingDetails$ = this.actions$
    .pipe(
        ofType<manageSellerActions.MerchantTrackListing>(manageSellerActions.ActionTypes.merchantTrackListing),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/seller-api/bulk-file-process-list-merchant?type=${action.payload['type']}${action.payload['commissionMode'] ? `&commissionMode=${action.payload['commissionMode']}` : ''}&pageSize=1000000`, method: 'get' }, true, false).pipe(
            map(response => {
                return new manageSellerActions.StoreMerchantTrackListing(response)
            })
        ))
    );
    @Effect()
    getCommissionModeSellerCatalog$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetCommissionModeSellerCatalog>(manageSellerActions.ActionTypes.getCommissionModeSellerCatalog),
        switchMap(() =>
        this.requestService.request({ url: `/api/util/admin-api/commission-mode`, method: 'get' }, true).pipe(
            map(response => new manageSellerActions.StoreCommissionModeSellerCatalog(response))
        ))
    );

    //not using
    @Effect()
    setDefaultSellerAdmin$ = this.actions$
    .pipe(
        ofType<manageSellerActions.SetDefaultSellerAdmin>(manageSellerActions.ActionTypes.setDefaultSellerAdmin),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/price-api/updateDefaultSellerByMasterPID', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.setDefaultSellerAdmin, status: true, payload: response })
                return new manageSellerActions.GetAdminLinkedSellers({
                    startFrom: 0,
                    pageSize: 50,
                    search: '',
                    pid: action.productId
                }, true);
            })
        ))
    );

    //not using
    @Effect()
    sellerProductStatusChangeAdmin$ = this.actions$
    .pipe(
        ofType<manageSellerActions.SellerProductStatusChangeAdmin>(manageSellerActions.ActionTypes.sellerProductStatusChangeAdmin),
        switchMap((action) =>
        this.requestService.request({ url: '/api/sellers/product-admin/updateActiveStatusStoreItem', method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageSellerActions.ActionTypes.sellerProductStatusChangeAdmin, status: true, payload: response })
                return new manageSellerActions.GetAdminLinkedSellers({
                    startFrom: 0,
                    pageSize: 50,
                    search: '',
                    pid: action.productId
                }, true);
            })
        ))
    );
    @Effect()
    getProductVariants$ = this.actions$
    .pipe(
        ofType<manageSellerActions.GetProductVariants>(manageSellerActions.ActionTypes.getProductVariants),
        switchMap((action) =>
        this.requestService.request({ url: `/api/sellers/product-admin/variantList?parentPid=${action.productId}`, method: 'get' }, true, false).pipe(
            map(response => {
                return new manageSellerActions.StoreProductVariants(response, action.refresh)
            })
        ))
    );

    constructor(
        private actions$: Actions,
        private requestService: RequestService,
        private apiMessageService: ApiMessageService,
        private router: Router,
        private toastr: ToastrService,

    ) { }
}
