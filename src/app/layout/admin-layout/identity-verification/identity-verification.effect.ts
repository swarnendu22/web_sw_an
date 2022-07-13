import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as identityVerificationReducerActions from 'src/app/actions/identity-verification.action';
import { RequestService } from 'src/app/utils/request/request.service';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Store, select } from '../../../../../node_modules/@ngrx/store';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MatDialog } from '../../../../../node_modules/@angular/material/dialog';
import { GetSellerSettlementDetailList } from '../../../actions/identity-verification.action';

@Injectable()
export class IndentityVerificationEffects {
    constructor(
        private request: RequestService,
        private actions$: Actions,
        private apiMessageService: ApiMessageService,
        private router: Router,
        private dialog: MatDialog,
        private store: Store<any>,
    ) { }

    // Manage Identity Verification Properties Section ///////////////////////////
    @Effect()
    getManageIdentityVerificationProperties$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetAllIdentityVerificationList>(
                identityVerificationReducerActions.ActionTypes.getIdentityVerificationList),
            switchMap((action) =>
                this.request.request({ url: `/api/user/admin-api/identity-verification-list?pageSize=10`, method: 'get' }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        return new identityVerificationReducerActions.StoreAllIdentityVerificationList(response);
                    })
                ))
        );
    @Effect({ dispatch: false })
    approveRejectIdentityVerificationProperties$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.ApproveRejectIdentityVerification>(
                identityVerificationReducerActions.ActionTypes.approveRejectIdentityVerification),
            switchMap((action) =>
                this.request.request({ url: `/api/user/admin-api/verify-identity`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        this.apiMessageService.changeApiStatus({
                            type: identityVerificationReducerActions.ActionTypes.approveRejectIdentityVerification,
                            status: true,
                            payload: {}
                        });
                    })
                ))
        );
    @Effect()
    getActiveAndInactiveCustomers$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetActiveAndInactiveCustomers>(
                identityVerificationReducerActions.ActionTypes.getActiveAndInactiveCustomers),
            switchMap((action) =>
                // tslint:disable-next-line: max-line-length
                this.request.request({ url: `/api/user/admin-users/getAllUserByTypeAndStatus?pageNumber=${action.pageNo}&pageSize=100`, method: 'post', payload: action.payload }, true, false).pipe(
                    map(response => {
                        console.log('Active Customers', response);
                        return new identityVerificationReducerActions.StoreActiveAndInactiveCustomers(response);
                    })
                )
            )
        );
    @Effect()
    getAffiliateUser$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetAllAffiliateUsersList>(
                identityVerificationReducerActions.ActionTypes.getAffiliateUsers),
            switchMap((action) =>
                // tslint:disable-next-line: max-line-length
                this.request.request({ url: `/api/user/admin-users/getAllUserByTypeAndStatus?pageNumber=${action.pageNo}&pageSize=100`, method: 'post', payload: action.payload }, true, false).pipe(
                    map(response => {
                        console.log('Affiliate Users', response);
                        return new identityVerificationReducerActions.StoreAllAffiliateUsersList(response);
                    })
                )
            )
        );

    @Effect()
    getDeliveryBoys$ = this.actions$.pipe(
        ofType<identityVerificationReducerActions.GetDeUsers>(
            identityVerificationReducerActions.ActionTypes.getDeUsers
        ),
        switchMap((action) => {
            console.log("Req Body::::::::::::", action.payload);
            return this.request.request({
                url: `/api/delivery-admin-ms/delivery_boys?page=${action.payload.pageNo}`,
                payload: {
                    status: action.payload.requestBody['search'],
                    state_name: action.payload.requestBody['state_name'],
                    vehicle_type: action.payload.requestBody['vehicle_type']
                },
                method: 'post'
            },
                true, false
            ).pipe(map(res =>
                new identityVerificationReducerActions.StoreDeUsers(res))
            )
        }
        )
    );



    @Effect({ dispatch: false })
    uploadPaymentReconcilationCsv$ = this.actions$.pipe(
        ofType<identityVerificationReducerActions.UploadPaymentReconcilationCsv>(
            identityVerificationReducerActions.ActionTypes.uploadPaymentReconcilationCsv
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/accounts/payment_recon_master`,
                payload: action.payload,
                method: 'post'
            },
                true, false
            ).pipe(map(res => {

                this.dialog.closeAll()
                this.apiMessageService.changeApiStatus({
                    type: identityVerificationReducerActions.ActionTypes.uploadPaymentReconcilationCsv,
                    status: true,
                    payload: {}
                });


            }))
        }
        )
    );


    @Effect()
    getPaymentReconcilationList$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetPaymentReconcilationList>(
                identityVerificationReducerActions.ActionTypes.getPaymentReconcilationList),
            switchMap((action) =>
                this.request.request({ url: `/api/delivery-admin-ms/accounts/payment_recon_master?start_date=${action.payload.start_date}&end_date=${action.payload.end_date}&per_page=100&page=${action.pageNo}`, method: 'get' }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        return new identityVerificationReducerActions.StorePaymentReconcilationList(response);
                    })
                ))
        );
    @Effect()
    getPaymentReconcilationDataList$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetPaymentReconcilationDataList>(
                identityVerificationReducerActions.ActionTypes.getPaymentReconcilationDataList),
            switchMap((action) =>
                this.request.request({ url: `/api/delivery-admin-ms/accounts/payment_recon_master/${action.payload.id}/payment_recon_data?per_page=${action.payload.per_page}&page=${action.payload.page}`, method: 'get' }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        return new identityVerificationReducerActions.StorePaymentReconcilationDataList(response);
                    })
                ))
        );


    @Effect()
    getSellerSettlementList$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetSellerSettlementList>(
                identityVerificationReducerActions.ActionTypes.getSellerSettlementList),
            switchMap((action) =>
                this.request.request({ url: `/api/delivery-admin-ms/accounts/seller_payment_master?start_date=${action.payload.start_date}&end_date=${action.payload.end_date}&per_page=100&page=${action.pageNo}`, method: 'get' }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        return new identityVerificationReducerActions.StoreSellerSettlementList(response);
                    })
                ))
        );


    @Effect()
    getSellerSettlementDetailList$ = this.actions$
        .pipe(
            ofType<identityVerificationReducerActions.GetSellerSettlementDetailList>(
                identityVerificationReducerActions.ActionTypes.getSellerSettlementDetailList),
            switchMap((action) =>
                this.request.request({ url: `/api/delivery-admin-ms/accounts/seller_payment_master/${action.id}/seller_payment_data`, method: 'get' }, true).pipe(
                    map(response => {
                        console.log('Effects Res:::::ss', response);
                        return new identityVerificationReducerActions.StoreSellerSettlementDetailList(response);
                    })
                ))
        );


    @Effect({ dispatch: false })
    createSellerSettlement$ = this.actions$.pipe(
        ofType<identityVerificationReducerActions.CreateSellerSettlement>(
            identityVerificationReducerActions.ActionTypes.createSellerSettlement
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/accounts/seller_payment_master`,
                payload: action.payload,
                method: 'post'
            },
                true, false
            ).pipe(map(res => {

                this.dialog.closeAll()
                this.apiMessageService.changeApiStatus({
                    type: identityVerificationReducerActions.ActionTypes.createSellerSettlement,
                    status: true,
                    payload: {}
                });


            }))
        }
        )
    );


    @Effect({ dispatch: false })
    uploadSellerSettlementBankFile$ = this.actions$.pipe(
        ofType<identityVerificationReducerActions.UploadSellerSettlementBankFile>(
            identityVerificationReducerActions.ActionTypes.uploadSellerSettlementBankFile
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/accounts/seller_payment_master/${action.id}/bank_settlement_file`,
                payload: action.payload,
                method: 'post'
            },
                true, false
            ).pipe(map(res => {

                this.dialog.closeAll()
                this.apiMessageService.changeApiStatus({
                    type: identityVerificationReducerActions.ActionTypes.uploadSellerSettlementBankFile,
                    status: true,
                    payload: {}
                });


            }))
        }
        )
    );

    @Effect({ dispatch: false })
    manulaSettelmentAction$ = this.actions$.pipe(
        ofType<identityVerificationReducerActions.SubmitManualSettelment>(
            identityVerificationReducerActions.ActionTypes.manulaSettelmentAction
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/accounts/seller_payment_master/${action.payload.settlement_id}/seller_payment_data/${action.payload.id}`,
                payload: action.payload.body,
                method: 'put'
            },
                true, false
            ).pipe(map(res => {
                this.store.dispatch(new GetSellerSettlementDetailList(action.payload.settlement_id))
                this.dialog.closeAll()
                this.apiMessageService.changeApiStatus({
                    type: identityVerificationReducerActions.ActionTypes.uploadSellerSettlementBankFile,
                    status: true,
                    payload: {}
                });


            }))
        }
        )
    );




}
