import * as manageCommisionExceptionActions from '../actions/commission-exception-management.action';

export interface commissionExceptionState {
  commissionExceptions: object;
  productExceptions: object;
  pendingExceptions: object;
  exceptionDetails: object;
  productList: object;
  productExceptionDetails: object,
  agentSchemes: object,
  agentSchemesDetail: object,
  productNameList: object,
  productNupcDetail: object
}

export const initialCommsssionExceptionState: commissionExceptionState = {
  commissionExceptions: null,
  productExceptions: null,
  pendingExceptions: null,
  exceptionDetails: null,
  productList: null,
  productExceptionDetails: null,
  agentSchemes: null,
  agentSchemesDetail: null,
  productNameList: null,
  // productNameList: {
  //   list: [],
  // },
  productNupcDetail: null

}

export interface commissionGroupState {
  commissionGroups: object;
  commissionGroupsDetail: object;
  categoryTree: object


}

export const initialCommsssionGroupState: commissionGroupState = {
  commissionGroups: null,
  commissionGroupsDetail: null,
  categoryTree: null
}

export function commissionExceptionReducer(state = initialCommsssionExceptionState, action: manageCommisionExceptionActions.manageCommisionExceptionActions): commissionExceptionState {
  switch (action.type) {
    case manageCommisionExceptionActions.ActionTypes.storeCommissionExceptions: {
      return {
        ...state,
        commissionExceptions: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeCommissionExceptionDetails: {
      return {
        ...state,
        exceptionDetails: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.resetCommissionExceptionDetails: {
      return {
        ...state,
        exceptionDetails: initialCommsssionExceptionState.exceptionDetails
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storePendingException: {
      return {
        ...state,
        pendingExceptions: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeAgentSchemes: {
      return {
        ...state,
        agentSchemes: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeAgentSchemesDetail: {
      return {
        ...state,
        agentSchemesDetail: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeSearchProductNupcOrName: {

      // ==================== Previous Scroll ================ 
      // let prevResults = state.productNameList['list'];
      // let updatedList = null;
      // if (state.productNameList['list'].length > 0 && (action.refresh == false)) {
      //   prevResults.push(...action.payload);

      //   updatedList = prevResults;

      // }
      // else {
      //   updatedList = action.payload;
      // }
      // state.productNameList['list'] = updatedList

      // return {
      //   ...state
      // };
      return {
        ...state,
        productNameList: action.payload
      }

    }

    case manageCommisionExceptionActions.ActionTypes.storeProductNupc: {
      return {
        ...state,
        productNupcDetail: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
export function commissionGroupReducer(state = initialCommsssionGroupState, action: manageCommisionExceptionActions.manageCommisionGroupActions): commissionGroupState {
  switch (action.type) {
    case manageCommisionExceptionActions.ActionTypes.storeCommissionGroup: {
      return {
        ...state,
        commissionGroups: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeViewSpecificCommissionGroupDetail: {
      return {
        ...state,
        commissionGroupsDetail: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeCategoryTreeData: {
      return {
        ...state,
        categoryTree: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export function productExceptionReducer(state = initialCommsssionExceptionState, action: manageCommisionExceptionActions.manageProductExceptionActions): commissionExceptionState {
  switch (action.type) {
    case manageCommisionExceptionActions.ActionTypes.storeProductExceptions: {
      return {
        ...state,
        productExceptions: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeProducts: {
      return {
        ...state,
        productList: action.payload
      };
    }
    case manageCommisionExceptionActions.ActionTypes.storeProductExceptionDetail: {
      return {
        ...state,
        productExceptionDetails: action.payload
      };
    }


    default: {
      return state;
    }
  }

}
