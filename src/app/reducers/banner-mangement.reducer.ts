import * as bannerManagementActions from '../actions/banner-management.actions';
export interface BannerManagementState {
  allActiveBanners: object;
  bannerDetailsById: object;
  allFlashSalesList: object;
  flashSalesDetail: object;
}
export const initialBannerManagementState: BannerManagementState = {
  allActiveBanners: null,
  bannerDetailsById: null,
  allFlashSalesList: null,
  flashSalesDetail: null,
}
export function bannerManagementReducer(state = initialBannerManagementState, action: bannerManagementActions.BannerManagementReducerActions): BannerManagementState {
  switch (action.type) {
    case bannerManagementActions.ActionTypes.storeUiTemplateComponents: {
      return {
        ...state,
        allActiveBanners: action.payload
      };
    }
    case bannerManagementActions.ActionTypes.storeUiTemplateComponentById: {
      return {
        ...state,
        bannerDetailsById: action.payload
      };
    }
    case bannerManagementActions.ActionTypes.storeFlashSalesList: {
      return {
        ...state,
        allFlashSalesList: action.payload
      };
    }
    case bannerManagementActions.ActionTypes.storeFlashSalesDetails: {
      return {
        ...state,
        flashSalesDetail: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
