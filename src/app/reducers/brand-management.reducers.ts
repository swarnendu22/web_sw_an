import * as manegeCategoryActions from '../actions/brand-management.actions';

export interface brandManagementState {
  activeBrands: object;
  activeBrandsElastic: object;
  globalBrandsElastic: object;
  inactiveBrands: object;
  pendingBrands: object;
  brandDetails: object;
  storeBrandsList: object;
  brandOwnerList: object;
}

export const initialCategoryState: brandManagementState = {
  activeBrands: null,
  activeBrandsElastic: null,
  globalBrandsElastic: null,
  inactiveBrands: null,
  pendingBrands: null,
  brandDetails: null,
  storeBrandsList: null,
  brandOwnerList: null,
}

export function brandReducer(state = initialCategoryState, action: manegeCategoryActions.manegeBrandActions): brandManagementState {
  switch (action.type) {
    case manegeCategoryActions.ActionTypes.storeActiveBrands: {
      return {
        ...state,
        activeBrands: action.payload
      };
    }
    case manegeCategoryActions.ActionTypes.storeActiveBrandsElastic: {
      return {
        ...state,
        activeBrandsElastic: action.payload
      };
    }
    case manegeCategoryActions.ActionTypes.storeGlobalBrandsElastic: {
      return {
        ...state,
        globalBrandsElastic: action.payload.hits
      };
    }
    case manegeCategoryActions.ActionTypes.storeInactiveBrands: {
      return {
        ...state,
        inactiveBrands: action.payload
      };
    }
    case manegeCategoryActions.ActionTypes.storePendingBrands: {
      return {
        ...state,
        pendingBrands: action.payload
      };
    }
    case manegeCategoryActions.ActionTypes.storeBrandDeatails: {
      return {
        ...state,
        brandDetails: action.payload
      };
    }
    case manegeCategoryActions.ActionTypes.resetBrandDetails: {
      return {
        ...state,
        brandDetails: initialCategoryState.brandDetails
      };
    }
    case manegeCategoryActions.ActionTypes.storeActiveStoreBrands: {
      return {
        ...state,
        storeBrandsList: action.payload ? action.payload['obj'] : null
      };
    }
    case manegeCategoryActions.ActionTypes.storeBrandOwnerList: {
      return {
        ...state,
        brandOwnerList: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
