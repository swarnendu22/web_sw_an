import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as commissionActions from '../../../../actions/storeManagement.action';
import * as commissionGroupActions from '../../../../actions/commission-exception-management.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';

@Injectable()
export class commissionEffects {

    @Effect()
    getCommissions$ = this.actions$
        .pipe(
            ofType<commissionActions.GetCommission>(commissionActions.ActionTypes.getCommissions),
            switchMap(() =>
                this.requestService.request({ url: '/api/commission/admin-api/commissions?pageSize=100000', method: 'get' }, true).pipe(
                    map(response => new commissionActions.StoreCommission(response['payload']))
                ))
        );


    @Effect({ dispatch: false })
    postCommissions$ = this.actions$
        .pipe(
            ofType<commissionActions.StorePostCommission>(commissionActions.ActionTypes.storePostCommissions),
            switchMap((action) =>
                this.requestService.request({ url: '/api/commission/admin-api/commission-group', method: 'post', payload: action.payload }, true).pipe(
                    map(response => {
                        this.apiMessageService.changeApiStatus({ type: commissionActions.ActionTypes.storePostCommissions, status: true, payload: response })

                    })
                ))
        );


    @Effect()
    showCommissionGroupDetails$ = this.actions$
        .pipe(
            ofType<commissionGroupActions.GetViewSpecificCommissionGroupDetail>(commissionGroupActions.ActionTypes.getViewSpecificCommissionGroupDetail),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commissions/${action.payload}`, method: 'get' }, true).pipe(
                    map(response => new commissionGroupActions.StoreViewSpecificCommissionGroupDetail(response['payload']))
                ))
        );



    @Effect({ dispatch: false })
    updateCommissionGroupDetails$ = this.actions$
        .pipe(
            ofType<commissionGroupActions.UpdateCommissionGroup>(commissionGroupActions.ActionTypes.updateCommissionGroup),
            switchMap((action) =>
                this.requestService.request({ url: `/api/commission/admin-api/commission-group`, method: 'post', payload: action.payload }, true).pipe(
                    map(response => console.log('Response::::::', response))
                ))
        );


    @Effect()
    getCategoryTreeEffect$ = this.actions$.pipe(
        ofType<commissionGroupActions.GetcategoryTreeData>(
            commissionGroupActions.ActionTypes.getCategoryTreeData
        ),
        switchMap((action) =>
            // console.log('ACTIONS', action)
            // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
            this.requestService
                .request(
                    { url: `/api/category/admin-api/categories/commision/commission-group/${action.payload}?pageSize=100000000`, method: 'get' },
                    true
                )
                .pipe(
                    map(
                        response => new commissionGroupActions.StoreCategoryTreeData(response['payload'])
                    )
                )
        )
    );


    @Effect({ dispatch: false })
    updateCommissionGroupTree$ = this.actions$
        .pipe(
            ofType<commissionGroupActions.UpdateCommissionGroupTree>(commissionGroupActions.ActionTypes.updateCommissionGroupTree),
            switchMap((action) =>

                this.requestService.request({ url: `/api/commission/admin-api/commissions/`, method: action.method, payload: action.payload }, true).pipe(
                    map(response => console.log('Response::::::', response))
                ))
        );


    constructor(
        private actions$: Actions,
        private requestService: RequestService,
        private apiMessageService: ApiMessageService
    ) { }
}


