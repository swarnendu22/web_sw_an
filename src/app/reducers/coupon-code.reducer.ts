import * as couponCodeActions from '../actions/coupon-code.actions';
export interface CouponCodeActions {
  allMasterCoupons: object;
  couponDetailsById: object;
  allStoreCoupons: object;
  storeCouponDetailsById: object;
}
export const initialCouponCodeActions: CouponCodeActions = {
  allMasterCoupons: null,
  couponDetailsById: null,
  allStoreCoupons: null,
  storeCouponDetailsById: null,
}
export function couponCodeReducer(state = initialCouponCodeActions, action: couponCodeActions.CouponCodeReducerActions): CouponCodeActions {
  switch (action.type) {
    case couponCodeActions.ActionTypes.storeMasterCoupons: {
      return {
        ...state,
        allMasterCoupons: action.payload
      };
    }
    case couponCodeActions.ActionTypes.storeStoreCoupons: {
      return {
        ...state,
        allStoreCoupons: action.payload
      };
    }
    case couponCodeActions.ActionTypes.storeCouponById: {
      return {
        ...state,
        couponDetailsById: action.payload
      };
    }
    case couponCodeActions.ActionTypes.storeStoreCouponById: {
      return {
        ...state,
        storeCouponDetailsById: action.payload
      };
    }
    default: {
      return state;
    }
  }
}