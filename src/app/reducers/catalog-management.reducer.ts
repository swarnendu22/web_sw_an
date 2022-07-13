import * as catalogMgmtActions from './../actions/catalog-management.action';


export interface CatalogManagementState {
  allCatalogDetails: object;//component onload
  elasticCatalogDetails: object;
  elasticPrivateProducts: object;
  catalogDetailsById: object;//component onload
  productDetailsOnSku: object;//component onload
  inactiveCatalog: object;
  noSellerCatalog: object;
  pendingCatalog: object;
  compAnalysyis: object;
  allElasticCatalogDetails: object;
  attributeSetsData: object;
  storePendingProucts: object;
  attributeBasedonCode: object;
}

export const initialCatalogMgmtState: CatalogManagementState = {
  allCatalogDetails: null,
  elasticCatalogDetails: null,
  elasticPrivateProducts: null,
  catalogDetailsById: null,
  productDetailsOnSku: {},
  inactiveCatalog: {},
  noSellerCatalog: {},
  pendingCatalog: {},
  compAnalysyis: null,
  allElasticCatalogDetails: null,
  attributeSetsData: null,
  storePendingProucts: null,
  attributeBasedonCode: null,
}

export function catalogMgmtReducer(state = initialCatalogMgmtState, action:
  catalogMgmtActions.CatalogManagementReducerActions): CatalogManagementState {
  switch (action.type) {
    case catalogMgmtActions.ActionTypes.storeAllCatalogList: {
      return {
        ...state,
        allCatalogDetails: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeElasticCatalogList: {
      return {
        ...state,
        elasticCatalogDetails: action.payload.hits
      };
    }
    case catalogMgmtActions.ActionTypes.storeElasticPrivateProducts: {
      return {
        ...state,
        elasticPrivateProducts: action.payload.hits
      };
    }
    case catalogMgmtActions.ActionTypes.replaceCatalogAfterUpdate: {
      let prevList = state.allCatalogDetails['obj'];
      console.log(action.payload)
      prevList.map((item, i) => {
        if (action.payload['product_id'] == item.productId) {
          prevList[i]['productName'] = action.payload['productName'] ? action.payload['productName'] : prevList[i]['productName'];
          prevList[i]['mrp'] = action.payload['mrp'] ? action.payload['mrp'] : prevList[i]['mrp'];
          prevList[i]['sellingPrice'] = action.payload['sellingPrice'] ? action.payload['sellingPrice'] : prevList[i]['sellingPrice'];
        }

      });
      state.allCatalogDetails = prevList;
      return {
        ...state,
      };
    }

    case catalogMgmtActions.ActionTypes.storeAllElasticCatalogList: {
      return {
        ...state,
        allElasticCatalogDetails: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeCatalogDetailsById: {
      return {
        ...state,
        catalogDetailsById: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeProductDetailsFromSku: {
      state.productDetailsOnSku[action.payload.nupc] = action.payload.response;
      return {
        ...state,
      };
    }
    case catalogMgmtActions.ActionTypes.storeInactiveCatalogManagement: {
      return {
        ...state,
        inactiveCatalog: action['payload']
      }
    }
    case catalogMgmtActions.ActionTypes.storeNoSellerCatalogManagement: {
      return {
        ...state,
        noSellerCatalog: action['payload']
      };
    }
    case catalogMgmtActions.ActionTypes.storePendingCatalogManagement: {
      return {
        ...state,
        pendingCatalog: action['payload']
      };
    }
    case catalogMgmtActions.ActionTypes.storePriceDetailOfCatalog: {
      return {
        ...state,
        compAnalysyis: action['payload']
      };
    }
    case catalogMgmtActions.ActionTypes.storeAttributeDataFromIds: {
      return {
        ...state,
        attributeSetsData: action['payload']
      };
    }
    case catalogMgmtActions.ActionTypes.storeStoreProductPendingList: {
      return {
        ...state,
        storePendingProucts: action.payload
      }
    }
    case catalogMgmtActions.ActionTypes.storeGetAttributesBasedOnCode: {
      return {
        ...state,
        attributeBasedonCode: action.payload['payload']
      }
    }

    // RESET ALL STORE
    case catalogMgmtActions.ActionTypes.resetCatalogMangementAll: {
      return {
        ...state,
        allCatalogDetails: null,
        elasticCatalogDetails: null,
        catalogDetailsById: null,
        productDetailsOnSku: {},
        inactiveCatalog: {},
        noSellerCatalog: {},
        pendingCatalog: {},
        compAnalysyis: null
      };
    }

    default: {
      return state;
    }
  }
}
export interface IndependentDropDownValuesState {
  productVariant: object;//component onload.
  attributesList: object;//component onload
}
export const initialIndependentDropDownValues: IndependentDropDownValuesState = {
  productVariant: null,
  attributesList: null
}
export function independentDropdownReducer(state = initialIndependentDropDownValues, action:
  catalogMgmtActions.CatalogManagementReducerActions): IndependentDropDownValuesState {
  switch (action.type) {

    case catalogMgmtActions.ActionTypes.storeProductVariants: {
      return {
        ...state,
        productVariant: action.payload
      };
    }

    case catalogMgmtActions.ActionTypes.storeAttributesList: {
      return {
        ...state,
        attributesList: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.resetIndependentDropDownCatalogManagement: {
      return {
        ...state,
        attributesList: null,
        productVariant: null
      };
    }
    default: {
      return state;
    }
  }
}
export interface DynamicLoadingState {
  attributesBasedOnCategory: object; //dynamic loading
  productAttributesByCategory: object;//dynamic loading
  productAttributesSetByCategory: object;
  brandsBasedOnCategory: object;//dynamic loading
  attributeValuesById: object;
}
export const initialDynamicLoadingState: DynamicLoadingState = {
  attributesBasedOnCategory: null,
  productAttributesByCategory: null,
  productAttributesSetByCategory: null,
  brandsBasedOnCategory: null,
  attributeValuesById: null
}
export function dynamicLoadingReducer(state = initialDynamicLoadingState, action:
  catalogMgmtActions.CatalogManagementReducerActions): DynamicLoadingState {
  switch (action.type) {
    case catalogMgmtActions.ActionTypes.storeAttributesBasedOnCategory: {
      return {
        ...state,
        attributesBasedOnCategory: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeProductAttributesByCategory: {
      return {
        ...state,
        productAttributesByCategory: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeAttributesSetByCategory: {
      return {
        ...state,
        productAttributesSetByCategory: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeAttributeValuesById: {
      return {
        ...state,
        attributeValuesById: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeBrandsListBasedOnCategory: {
      //console.log('action.payload', action.payload);
      return {
        ...state,
        brandsBasedOnCategory: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.resetDynamicLoadingStateCatalogMgt: {
      return {
        ...state,
        brandsBasedOnCategory: null,
        attributesBasedOnCategory: null
      };
    }
    default: {
      return state;
    }
  }
}
export interface ValueOnDynamicLoadingState {
  valueBasedOnVariant: object;//valueOnDyamicLoading
  attributeValueBasedOnAttribute: object;//valueOnDyanmicLoading
}
export const initialValueOnDynamicLoadingState: ValueOnDynamicLoadingState = {
  valueBasedOnVariant: null,
  attributeValueBasedOnAttribute: null,
}
export function valueOnDynamicLoadingReducer(state = initialValueOnDynamicLoadingState, action:
  catalogMgmtActions.CatalogManagementReducerActions): ValueOnDynamicLoadingState {
  switch (action.type) {
    case catalogMgmtActions.ActionTypes.storeValueBasedOnVariant: {
      return {
        ...state,
        valueBasedOnVariant: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeAttributesValueBasedOnAttribute: {
      return {
        ...state,
        attributeValueBasedOnAttribute: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.resetValueDynamicLoadingStateCatalogMgt: {
      return {
        ...state,
        attributeValueBasedOnAttribute: null,
        valueBasedOnVariant: null
      };
    }
    default: {
      return state;
    }
  }
}
export interface CatalogFilesState {
  allCatalogFiles: object;//component onload
  dataBasedOnFileId: object;
  dataBasedOnProductIdFromFile: object;
  datDetailsOnConfigurableIdFromFile: object;
  allBrandBatchList: object;
}

export const initialCatalogFilesState: CatalogFilesState = {
  allCatalogFiles: null,
  dataBasedOnFileId: null,
  dataBasedOnProductIdFromFile: null,
  datDetailsOnConfigurableIdFromFile: {},
  allBrandBatchList: null
}
export function catalogFilesReducer(state = initialCatalogFilesState, action:
  catalogMgmtActions.CatalogManagementReducerActions): CatalogFilesState {
  switch (action.type) {
    case catalogMgmtActions.ActionTypes.storeCatalogFilesAllData: {
      return {
        ...state,
        allCatalogFiles: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeBrandBatchList: {
      return {
        ...state,
        allBrandBatchList: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeDataBasedOnFileId: {
      return {
        ...state,
        dataBasedOnFileId: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.storeProductDetailsFromFile: {
      return {
        ...state,
        dataBasedOnProductIdFromFile: action.payload
      };
    }
    case catalogMgmtActions.ActionTypes.resetCatalogFilesReducer: {
      return {
        ...state,
        allCatalogFiles: null,
        dataBasedOnFileId: null,
        dataBasedOnProductIdFromFile: null,
      };
    }

    // case catalogMgmtActions.ActionTypes.storeDetailsOnConfigurableIdFromFile: {
    //   state.datDetailsOnConfigurableIdFromFile[action.payload.id] = action.payload.data;
    //   return {
    //     ...state
    //   };
    // }
    default: {
      return state;
    }
  }
}
export interface CatalogFilesConfigurableDataState {
  datDetailsOnConfigurableIdFromFile: object;
}

export const initalCatalogFilesConfigurableDataState: CatalogFilesConfigurableDataState = {
  datDetailsOnConfigurableIdFromFile: {}
}
export function catalogFilesConfigurableReducer(state = initalCatalogFilesConfigurableDataState, action:
  catalogMgmtActions.CatalogManagementReducerActions): CatalogFilesConfigurableDataState {
  switch (action.type) {
    // case catalogMgmtActions.ActionTypes.storeCatalogFilesAllData: {
    //   return {
    //     ...state,
    //     allCatalogFiles: action.payload
    //   };
    // }
    // case catalogMgmtActions.ActionTypes.storeDataBasedOnFileId: {
    //   return {
    //     ...state,
    //     dataBasedOnFileId: action.payload
    //   };
    // }
    // case catalogMgmtActions.ActionTypes.storeProductDetailsFromFile: {
    //   return {
    //     ...state,
    //     dataBasedOnProductIdFromFile: action.payload
    //   };
    // }
    case catalogMgmtActions.ActionTypes.storeDetailsOnConfigurableIdFromFile: {
      state.datDetailsOnConfigurableIdFromFile[action.payload.id] = action.payload.data;
      return {
        ...state
      };
    }
    case catalogMgmtActions.ActionTypes.resetCatalogFilesConfigurableDataState: {
      return {
        ...state,
        datDetailsOnConfigurableIdFromFile: {}

      };
    }
    default: {
      return state;
    }
  }
}