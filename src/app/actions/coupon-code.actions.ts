import { Action } from '@ngrx/store';

export enum ActionTypes {
  getMasterCoupons = '[Coupon Code] Get Coupon Code All',
  storeMasterCoupons = '[Coupon Code] Store Coupon Code All',

  getStoreCoupons = '[Coupon Code] Get Coupon Code Store',
  storeStoreCoupons = '[Coupon Code] Store Coupon Code Store',

  getCouponById = '[Coupon Code] Get Coupon By Id',
  storeCouponById = '[Coupon Code] Store Coupon By Id',

  getStoreCouponById = '[Coupon Code] Get Store Coupon By Id',
  storeStoreCouponById = '[Coupon Code] Store Store Coupon By Id',

  createMasterCoupon = '[Coupon Code] Create New Coupon',
  editMasterCouponCode = '[Coupon Code] Edit Coupon Code',

  createStoreCoupon = '[Coupon Code] Create Store Coupon',
  editStoreCouponCode = '[Coupon Code] Edit Store Code',
}
export class GetMasterCoupons implements Action {
  readonly type = ActionTypes.getMasterCoupons;
  constructor(public payload?: any) { }
}
export class StoreMasterCoupons implements Action {
  readonly type = ActionTypes.storeMasterCoupons;
  constructor(public payload?: any) { }
}
export class GetStoreCoupons implements Action {
  readonly type = ActionTypes.getStoreCoupons;
  constructor(public payload?: any) { }
}
export class StoreStoreCoupons implements Action {
  readonly type = ActionTypes.storeStoreCoupons;
  constructor(public payload?: any) { }
}

export class GetCouponById implements Action {
  readonly type = ActionTypes.getCouponById;
  constructor(public payload?: any) { }
}
export class StoreCouponById implements Action {
  readonly type = ActionTypes.storeCouponById;
  constructor(public payload?: any) { }
}

export class GetStoreCouponById implements Action {
  readonly type = ActionTypes.getStoreCouponById;
  constructor(public payload?: any) { }
}
export class StoreStoreCouponById implements Action {
  readonly type = ActionTypes.storeStoreCouponById;
  constructor(public payload?: any) { }
}

export class CreateMasterCoupon implements Action {
  readonly type = ActionTypes.createMasterCoupon;
  constructor(public payload?: any) { }
}
export class EditMasterCouponCode implements Action {
  readonly type = ActionTypes.editMasterCouponCode;
  constructor(public payload?: any) { }
}
export class CreateStoreCoupon implements Action {
  readonly type = ActionTypes.createStoreCoupon;
  constructor(public payload?: any) { }
}
export class EditStoreCouponCode implements Action {
  readonly type = ActionTypes.editStoreCouponCode;
  constructor(public payload?: any) { }
}

export type CouponCodeReducerActions = StoreMasterCoupons | StoreCouponById | StoreStoreCoupons | StoreStoreCouponById;