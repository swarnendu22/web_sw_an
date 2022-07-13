import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as couponCodeActions from '../../../actions/coupon-code.actions';
import { RequestService } from '../../../utils/request/request.service';
import { ApiMessageService } from '../../../utils/api/api-message.service';


@Injectable()
export class CouponManagementApaEffects {
    constructor(private request: RequestService,
        private actions$: Actions,
        private apiMessageService: ApiMessageService
    ) { }

    @Effect()
    getMasterCoupons$ = this.actions$
    .pipe(
        ofType<couponCodeActions.GetMasterCoupons>(couponCodeActions.ActionTypes.getMasterCoupons),
        switchMap((action) => {
            let codeCond = '';
            let pageCond = '';
            let coupon_category = '';
            
           
            if(action.payload.pageNo != null && action.payload.perPage != null) {
              pageCond = `?page=${action.payload.pageNo}&per_page=${action.payload.perPage}`;
            }

            if(action.payload.code != null) {
              if(pageCond != '') {
                codeCond = `&code=${action.payload.code}`;
              } else {
                codeCond = `?code=${action.payload.code}`;
              }
            }

            if(action.payload.coupon_category != null) {
              if(pageCond != '') {
                coupon_category = `&coupon_category=${action.payload.coupon_category}`;
              } else {
                coupon_category = `?coupon_category=${action.payload.coupon_category}`;
              }
            }

            return this.request.request({
                url: `/api/delivery-admin-ms/coupons${pageCond}${codeCond}${coupon_category}`,
                method: 'get',
                payload: action.payload
            },
                true, false
            ).pipe(map((res: any) =>
                new couponCodeActions.StoreMasterCoupons(res))
            )
        })
    );
    @Effect()
    getStoreCoupons$ = this.actions$
    .pipe(
        ofType<couponCodeActions.GetStoreCoupons>(couponCodeActions.ActionTypes.getStoreCoupons),
        switchMap((action) => {
            let codeCond = '';
            let storeCond = '';
            if(action.payload.coupon_id != null) {
                codeCond = `&coupon_id=${action.payload.coupon_id}`;
            }
            if(action.payload.store_id != null) {
              storeCond = `&store_ids=${action.payload.store_id}`;
            }
            return this.request.request({
                url: `/api/delivery-admin-ms/store_coupons?page=${action.payload.pageNo}&per_page=${action.payload.perPage}${codeCond}${storeCond}`,
                method: 'get',
                payload: action.payload
            },
                true, false
            ).pipe(map((res: any) =>{
                return new couponCodeActions.StoreStoreCoupons(res)
              }
                )
            )
        }
        )
    );
    @Effect()
    getCouponById$ = this.actions$
    .pipe(
        ofType<couponCodeActions.GetCouponById>(couponCodeActions.ActionTypes.getCouponById),
        switchMap((action) =>
        this.request.request({ url: `/api/delivery-admin-ms/coupons/${action.payload}`, method: 'get' }, true).pipe(
            map(response => new couponCodeActions.StoreCouponById(response))
        ))
    );
    @Effect()
    getStoreCouponById$ = this.actions$
    .pipe(
        ofType<couponCodeActions.GetStoreCouponById>(couponCodeActions.ActionTypes.getStoreCouponById),
        switchMap((action) =>
        this.request.request({ url: `/api/delivery-admin-ms/store_coupons/${action.payload}`, method: 'get' }, true).pipe(
            map(response => new couponCodeActions.StoreStoreCouponById(response))
        ))
    );
    @Effect({ dispatch: false })
    createStoreCoupon$ = this.actions$
    .pipe(
        ofType<couponCodeActions.CreateStoreCoupon>(couponCodeActions.ActionTypes.createStoreCoupon),
        switchMap(({ payload }) =>
          this.request.request({ url: `/api/delivery-admin-ms/store_coupons`, method: 'post', payload }, true, false).pipe(
            map((res: any) => {
              if(res)
              {
                this.apiMessageService.changeApiStatus({
                  type: couponCodeActions.ActionTypes.createStoreCoupon,
                  status: true,
                  payload: res
                });
              }
              
            })
          )
        )
    );
    @Effect({ dispatch: false })
    createMasterCoupon$ = this.actions$
    .pipe(
        ofType<couponCodeActions.CreateMasterCoupon>(couponCodeActions.ActionTypes.createMasterCoupon),
        switchMap(({ payload }) =>
          this.request.request({ url: `/api/delivery-admin-ms/coupons`, method: 'post', payload }, true, false).pipe(
            map((res: any) => {
              if(res)
              {
                this.apiMessageService.changeApiStatus({
                  type: couponCodeActions.ActionTypes.createMasterCoupon,
                  status: true,
                  payload: res
                });
              }
            })
          )
        )
    );
    @Effect({ dispatch: false })
    editStoreCouponCode$ = this.actions$
    .pipe(
        ofType<couponCodeActions.EditStoreCouponCode>(couponCodeActions.ActionTypes.editStoreCouponCode),
        switchMap(({ payload }) =>
          this.request.request({ url: `/api/delivery-admin-ms/store_coupons/${payload.id}`, method: 'put', payload }, true, false).pipe(
            map((res: any) => {
              if(res)
              {
                this.apiMessageService.changeApiStatus({
                  type: couponCodeActions.ActionTypes.editStoreCouponCode,
                  status: true,
                  payload: res
                });
              }
              
            })
          )
        )
    );
    @Effect({ dispatch: false })
    editMasterCouponCode$ = this.actions$
    .pipe(
        ofType<couponCodeActions.EditMasterCouponCode>(couponCodeActions.ActionTypes.editMasterCouponCode),
        switchMap(({ payload }) =>
          this.request.request({ url: `/api/delivery-admin-ms/coupons/${payload.id}`, method: 'put', payload }, true, false).pipe(
            map((res: any) => {
              if(res)
              {
                this.apiMessageService.changeApiStatus({
                  type: couponCodeActions.ActionTypes.editMasterCouponCode,
                  status: true,
                  payload: res
                });
              }
              
            })
          )
        )
    );
}