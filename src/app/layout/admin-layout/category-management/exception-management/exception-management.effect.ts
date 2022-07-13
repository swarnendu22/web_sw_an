import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as manageCommisionExceptionActions from '../../../../actions/commission-exception-management.action';
import * as sellerActions from '../../../../actions/seller-management.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';

@Injectable()
export class commissionExceptionEffects {

    @Effect()
    getCommissionExceptions$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetCommisionexceptions>(manageCommisionExceptionActions.ActionTypes.getCommisionexceptions),
            switchMap(() =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions/exception?pageSize=1000000', method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreCommissionExceptions(response['payload']))
                ))
        );
    @Effect()
    getSeller$ = this.actions$
        .pipe(
            ofType<sellerActions.GetSellers>(sellerActions.ActionTypes.getSellers),
            switchMap(() =>
                this.requestService.request({ url: '/api/sellers/admin-api/sellers?pageSize=1000000', method: 'get' }, true).pipe(
                    map(response => new sellerActions.StoreSellers(response['payload']))
                ))
        );


    @Effect()
    getCommissionGroup$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetCommisioneGroup>(manageCommisionExceptionActions.ActionTypes.getCommissionGroup),
            switchMap(() =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions?pageSize=1000000', method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreCommissionGroup(response['payload']))
                ))
        );

    @Effect()
    getProductExceptions$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetProductExceptions>(manageCommisionExceptionActions.ActionTypes.getProductExceptions),
            switchMap(() =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions/product-exception?pageSize=1000000', method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreProductExceptions(response['payload']))
                ))
        );

    @Effect({ dispatch: false })
    postNewProductException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.PostNewProductException>(manageCommisionExceptionActions.ActionTypes.postNewProductException),
            switchMap((action) =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions/exception/request', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.postNewProductException, status: true, payload: response })
                    })
                ))
        );


    @Effect({ dispatch: false })
    postCommissionException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.PostCommissionException>(manageCommisionExceptionActions.ActionTypes.postCommissionException),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/request/${action.commissiontype}`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.postCommissionException, status: true, payload: response })
                    })
                ))
        );


    @Effect()
    showProductExceptions$ = this.actions$
    .pipe(
        ofType<manageCommisionExceptionActions.GetCommsionExceptionDetails>(manageCommisionExceptionActions.ActionTypes.getCommissionExceptionDetails),
        switchMap((action) =>
        this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/${action.payload}`, method: 'get' }, true).pipe(
            map(response => new manageCommisionExceptionActions.StoreStoreExceptionDetails(response['payload']))
        ))
    );

    @Effect({ dispatch: false })
    updateException$ = this.actions$
    .pipe(
        ofType<manageCommisionExceptionActions.UpdateNewProductException>(manageCommisionExceptionActions.ActionTypes.updateNewProductException),
        switchMap((action) =>
        this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/request`, method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.updateNewProductException, status: true, payload: response })
            })
        ))
    );

    @Effect()
    getProductList$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetProducts>(manageCommisionExceptionActions.ActionTypes.getProducts),
            switchMap(() =>
            this.requestService.request({ url: '/api/product/admin-api/products?pageSize=1000', method: 'get' }, true).pipe(
                map(response => new manageCommisionExceptionActions.StoreProducts(response['payload']))
            ))
        );

    @Effect({ dispatch: false })
    postSaveProductException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.PostSaveProductException>(manageCommisionExceptionActions.ActionTypes.postSaveProductException),
            switchMap((action) =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions/product-exception/request', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.postSaveProductException, status: true, payload: response })
                    })
                ))
        );

    @Effect()
    showProductExceptionDetails$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetProductExceptionDetail>(manageCommisionExceptionActions.ActionTypes.getProductExceptionDetail),
            switchMap((action) =>
            this.requestService.request({ url: `/api/commission/admin-api/commissions/product-exception/${action.payload}`, method: 'get' }, true).pipe(
                map(response => new manageCommisionExceptionActions.StoreProductExceptionDetail(response['payload']))
            ))
        );

    @Effect({ dispatch: false })
    updateProductException$ = this.actions$
    .pipe(
        ofType<manageCommisionExceptionActions.UpdateSaveProductException>(manageCommisionExceptionActions.ActionTypes.updateSaveProductException),
        switchMap((action) =>
        this.requestService.request({ url: `/api/commission/admin-api/commissions/product-exception/request`, method: 'post', payload: action.payload }, true).pipe(
            map(response => {
                this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.updateSaveProductException, status: true, payload: response })
            })
        ))
    );

    @Effect({ dispatch: false })
    updateCommissionException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.UpdateCommissionException>(manageCommisionExceptionActions.ActionTypes.updateCommissionException),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/request/${action.commissiontype}`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.updateCommissionException, status: true, payload: response })
                    })
                ))
        );

    @Effect()
    pendingException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetPendingException>(manageCommisionExceptionActions.ActionTypes.getPendingException),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/request`, method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StorePendingException(response['payload']))
                ))
        );

    @Effect({ dispatch: false })
    approveRejectException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.ApproveRejectException>(manageCommisionExceptionActions.ActionTypes.approveRejectException),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/exception/approval-request/${action.requestId}`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.approveRejectException, status: true, payload: response })
                    })
                ))
        );
    @Effect({ dispatch: false })
    approveRejectProductException$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.ApproveRejectProductException>(manageCommisionExceptionActions.ActionTypes.approveRejectProductException),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/product-exception/approval-request/${action.requestId}`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.approveRejectProductException, status: true, payload: response })
                    })
                ))
        );


    @Effect()
    getAgentSchemes$ = this.actions$
    .pipe(
        ofType<manageCommisionExceptionActions.GetAgentSchemes>(manageCommisionExceptionActions.ActionTypes.getAgentSchemes),
        switchMap(() =>
        this.requestService.request({ url: '/api/miscellaneous/agent_schemes', method: 'get' }, true).pipe(
            map(response => new manageCommisionExceptionActions.StoreAgentSchemes(response))
        ))
    );

    @Effect({ dispatch: false })
    addAgentSchemes$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.AddAgentSchemes>(manageCommisionExceptionActions.ActionTypes.addAgentSchemes),
            switchMap((action) =>
                this.requestService.request({ url: `/api/miscellaneous/agent_schemes`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.addAgentSchemes, status: true, payload: response })
                    })
                ))
        );


    @Effect()
    getAgentSchemesDetail$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetAgentSchemesDetail>(manageCommisionExceptionActions.ActionTypes.getAgentSchemesDetail),
            switchMap((action) =>
                this.requestService.request({ url: `/api/miscellaneous/agent_schemes/${action.id}`, method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreAgentSchemesDetail(response))
                ))
        );


    @Effect({ dispatch: false })
    updateAgentSchemes$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.UpdateAgentSchemes>(manageCommisionExceptionActions.ActionTypes.updateAgentSchemes),
            switchMap((action) =>
                this.requestService.request({ url: `/api/miscellaneous/agent_schemes/${action.id}`, method: 'put', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: manageCommisionExceptionActions.ActionTypes.updateAgentSchemes, status: true, payload: response })
                    })
                ))
        );

    @Effect()
    getSearchProductNupcOrName$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.GetSearchProductNupcOrName>(manageCommisionExceptionActions.ActionTypes.getSearchProductNupcOrName),
            switchMap((action) =>
                // console.log('ACTIONS', action)
                // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
                this.requestService.request({ url: `/api/product/admin-api/products-nupc-name/${action.payload.searchTerm}?pageNumber=${action.payload.pageNumber}&pageSize=${action.payload.pageSize}`, method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreSearchProductNupcOrName(response, action.refresh))
                ))

        );
    @Effect()
    checkProductNupc$ = this.actions$
        .pipe(
            ofType<manageCommisionExceptionActions.CheckProductNupc>(manageCommisionExceptionActions.ActionTypes.checkProductNupc),
            switchMap((action) =>
                // console.log('ACTIONS', action)
                // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
                // this.requestService.request({ url: `/api/product/admin-api/products-nupc-name/${action.payload.searchTerm}?pageNumber=${action.payload.pageNumber}&pageSize=${action.payload.pageSize}`, method: 'get' }, true).pipe(
                //     map(response => new manageCommisionExceptionActions.StoreSearchProductNupcOrName(response['payload'], action.refresh))
                // ))
                this.requestService.request({ url: `/api/product/admin-api/products-nupc/${action.payload}`, method: 'get' }, true).pipe(
                    map(response => new manageCommisionExceptionActions.StoreProductNupc(response['payload']))
                ))
        );

    constructor(
        private actions$: Actions,
        private requestService: RequestService,
        private apiMessageService: ApiMessageService
    ) { }
}