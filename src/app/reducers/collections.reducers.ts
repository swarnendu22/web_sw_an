import * as collectionActions from '../actions/collections.action';

export interface collectionState {
  getCollection: object;
  getProductSearch: any;
  selectedProducts: object;
  getNUPCSearchProduct: object;
  getCollectionByIdNew: object;
  getProductIdByNUPC: object;
  getProductByProductId: object;
}

export interface getCollectionState {
  getByIdCollection: object;
}

export const initialGetCollectionState: getCollectionState = {
  getByIdCollection: null,
};

export const initialCollectionState: collectionState = {
  getCollection: null,
  getProductSearch: null,
  selectedProducts: null,
  getNUPCSearchProduct: null,
  getCollectionByIdNew: null,
  getProductIdByNUPC: {
    list: [],
  },
  getProductByProductId: null,
};

export function collectionByIdReducer(
  state = initialGetCollectionState,
  action: collectionActions.collectionActions
): getCollectionState {
  switch (action.type) {
    case collectionActions.ActionTypes.storeGetByIdCollection: {
      return {
        ...state,
        getByIdCollection: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function collectionReducer(
  state = initialCollectionState,
  action: collectionActions.collectionActions
): collectionState {
  switch (action.type) {
    case collectionActions.ActionTypes.storeCollections: {
      return {
        ...state,
        getCollection: action.payload,
      };
    }
    case collectionActions.ActionTypes.storeProductSearch: {
      let prevProductSearch = state.getProductSearch;
      let updatedProductSearch = null;
      if (state.getProductSearch) {
        console.log('Reducer If', action);
        action.payload.map(product => {
          prevProductSearch.push(product);
        });
        updatedProductSearch = prevProductSearch;
      } else {
        console.log('Reducer Else', action);
        updatedProductSearch = action.payload;
      }

      return {
        ...state,
        getProductSearch: updatedProductSearch,
      };
    }
    case collectionActions.ActionTypes.storeSelectedProduct: {
      return {
        ...state,
        selectedProducts: action.payload,
      };
    }
    case collectionActions.ActionTypes.resetProductSearch: {
      return {
        ...state,
        getProductSearch: null,
      };
    }

    case collectionActions.ActionTypes.storeNUPCSearchProduct: {
      let prevResults = state.getNUPCSearchProduct['list'];
      let updatedList = null;
      if (state.getNUPCSearchProduct['list'].length > 0 && (action.refresh == false)) {
        prevResults.push(...action.payload);

        updatedList = prevResults;

      } else {
        updatedList = action.payload;
      }
      state.getNUPCSearchProduct['list'] = updatedList

      return {
        ...state
      };
      // return {
      //   ...state,
      //   getNUPCSearchProduct: action.payload,
      // };
    }

    case collectionActions.ActionTypes.resetNUPCSearchProduct: {
      return {
        ...state,
        getNUPCSearchProduct: {
          list: [],
        },
      };
    }

    case collectionActions.ActionTypes.storeCollectionById: {
      return {
        ...state,
        getCollectionByIdNew: action.payload,
      };
    }

    case collectionActions.ActionTypes.storeProductIdByNUPC: {
      return {
        ...state,
        getProductIdByNUPC: action.payload,
      };
    }
    case collectionActions.ActionTypes.storeProductByProductId: {
      return {
        ...state,
        getProductByProductId: action.payload,
      };
    }


    default: {
      return state;
    }
  }
}
