import * as categoryActions from '../actions/storeManagement.action';

export interface categoryState {
  categories: object;
  categoriesElastic: object;
  categoriesElasticGlobal: object;
  allcategories: object;
  pendingCategories: object;
  categoryDetails: object;
  privateCategories: object;
  categoryKeywordsRequest: object;
  privateAndMasterCategories: object;
  quicklinksRequests: object;
}
export interface productAttributeState {
  productAttributes: object;
  attributeGroupName: object;
  attributeSet: object;
  getByAttributeGroupName: object;
  getByProductAttribute: object;
  getAttributeSetAttributes: object;
  getAttributeSetById: object;
  getByIdProductAttributeValue: object;
  viewProductAttributeValue: object;
  getByGroupName: object;
  getAttributePosition: object;
  getAttributesByGroupId: object;
}
export interface commissionState {
  commissions: object;
  commissionDetails: object;
}

export interface generalState {
  countries: object;
  regions: object;
  zone: object;
  zoneCount: object;
  zipcode: object;
  zipcodeById: object;
  countryById: object;
  zoneById: object;
  allZipZoneUser: object;
  zipZoneUserById: object;
  userGroup: object;
  duplicateZipCode: object;
}

export interface storeManagementState {
  fulfillmentcenter: object;
  fulfillmentcenterById: object;
  zoneByFulfillmentCenterId: object;
  deliveryCenter: object;
  deliveryCenterById: object;
  zipcodeBydeliveryCenterId: object;
  paymentMethods: object;
  paymentMethodById: object;
  regionsById: object;
  appVersions: object;
  appVersionsById: object;
  staticPageManagement: object;
  staticPageManagementById: object;
  logisticPartner: object;
  logisticPartnerById: object;
  zipByZone: object;
  usersByZoneId: any;
  sellerPastOrder: any;
  sellerCurrentOrder: any;
}
export interface StoreProductListManagementState {
  productCreateCategories: Array<any>;
  productCategoriesByStoreId: any;
  productCategories: any;
  productList: any;
  initialQuery: any;
  currentQuery: any;
  totalRecords: number;
  productDetailsById: any;
  storeUpdateActiveProductStatus: any;
}
export const initialstoreManagementState: storeManagementState = {
  fulfillmentcenter: null,
  fulfillmentcenterById: null,
  zoneByFulfillmentCenterId: null,
  deliveryCenter: null,
  deliveryCenterById: null,
  zipcodeBydeliveryCenterId: null,
  paymentMethods: null,
  paymentMethodById: null,
  regionsById: null,
  appVersions: null,
  appVersionsById: null,
  staticPageManagement: null,
  staticPageManagementById: null,
  logisticPartner: null,
  logisticPartnerById: null,
  zipByZone: null,
  usersByZoneId: null,
  sellerPastOrder: null,
  sellerCurrentOrder: null
};

export const initialGeneralState: generalState = {
  countries: null,
  regions: null,
  zone: null,
  zoneCount: null,
  zipcode: null,
  countryById: null,
  zoneById: null,
  zipcodeById: null,
  allZipZoneUser: null,
  zipZoneUserById: null,
  userGroup: null,
  duplicateZipCode: null,
};

export const initialCategoryState: categoryState = {
  categories: null,
  categoriesElastic: null,
  categoriesElasticGlobal: null,
  allcategories: null,
  pendingCategories: null,
  categoryDetails: null,
  privateCategories: null,
  categoryKeywordsRequest: null,
  privateAndMasterCategories: null,
  quicklinksRequests: null,
};
export const initialProductAttributeState: productAttributeState = {
  productAttributes: null,
  attributeGroupName: null,
  attributeSet: null,
  getByAttributeGroupName: null,
  getByProductAttribute: null,
  getAttributeSetAttributes: null,
  getAttributeSetById: null,
  getByIdProductAttributeValue: null,
  viewProductAttributeValue: null,
  getByGroupName: null,
  getAttributePosition: null,
  getAttributesByGroupId: null,
};

export const initialCommissionState: commissionState = {
  commissions: null,
  commissionDetails: null,
};

export interface parentCategoryState {
  parentCategories: object;
}

export const initialParentCategoryState: parentCategoryState = {
  parentCategories: null,
};
export const initialStoreProductListState: StoreProductListManagementState = {
  productCreateCategories: [],
  productCategoriesByStoreId: null,
  productCategories: null,
  productList: null,
  initialQuery: null,
  currentQuery: null,
  totalRecords: 0,
  productDetailsById: null,
  storeUpdateActiveProductStatus: null,
};
export function categoryReducer(
  state = initialCategoryState,
  action: categoryActions.categoryActions
): categoryState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeCategories: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeCategoriesElastic: {
      return {
        ...state,
        categoriesElastic: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeCategoriesElasticGlobal: {
      return {
        ...state,
        categoriesElasticGlobal: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAllCategories: {
      return {
        ...state,
        allcategories: action.payload,
      };
    }
    case categoryActions.ActionTypes.storePendingCategories: {
      return {
        ...state,
        pendingCategories: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeCategoryDetails: {
      return {
        ...state,
        categoryDetails: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeStorePrivateCategory: {
      return {
        ...state,
        privateCategories: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeCategoryKeywordsRequest: {
      return {
        ...state,
        categoryKeywordsRequest: action.payload,
      };
    }
    case categoryActions.ActionTypes.storePrivateAndMasterCategories: {
      return {
        ...state,
        privateAndMasterCategories: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeStoreQuickLinksRequests: {
      return {
        ...state,
        quicklinksRequests: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function productAttributeReducer(
  state = initialProductAttributeState,
  action: categoryActions.productAttributeActions
): productAttributeState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeProductAttributes: {
      return {
        ...state,
        productAttributes: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributeGroupName: {
      return {
        ...state,
        attributeGroupName: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributeSet: {
      return {
        ...state,
        attributeSet: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeGetByIdAttributeGroupName: {
      return {
        ...state,
        getByAttributeGroupName: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeGetByIdProductAttribute: {
      return {
        ...state,
        getByProductAttribute: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributeSetAttributes: {
      return {
        ...state,
        getAttributeSetAttributes: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributeSetById: {
      return {
        ...state,
        getAttributeSetById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeGetByIdProductAttributeValue: {
      return {
        ...state,
        getByIdProductAttributeValue: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributeGroupNameById: {
      return {
        ...state,
        getByGroupName: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeViewProductAttribute: {
      let prevViewProductAttributeValue = state.viewProductAttributeValue;
      let updatedViewProductAttributeValue = null;
      if (state.viewProductAttributeValue) {
        prevViewProductAttributeValue = null;
        console.log('Reducer If', action);
        updatedViewProductAttributeValue = action.payload;
      } else {
        console.log('Reducer Else', action);
        updatedViewProductAttributeValue = action.payload;
      }
      return {
        ...state,
        viewProductAttributeValue: updatedViewProductAttributeValue,
      };
    }
    case categoryActions.ActionTypes.resetGetByIdProductAttributeValue: {
      return {
        ...state,
        viewProductAttributeValue: null,
      };
    }
    case categoryActions.ActionTypes.storeAttributePositions: {
      return {
        ...state,
        getAttributePosition: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAttributesByGroupId: {
      return {
        ...state,
        getAttributesByGroupId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function parentCategoryReducer(
  state = initialParentCategoryState,
  action: categoryActions.parentCategoryActions
): parentCategoryState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeParentCategories: {
      return {
        ...state,
        parentCategories: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function commissionManagementReducer(
  state = initialCommissionState,
  action: categoryActions.commissionActions
): commissionState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeCommissions: {
      return {
        ...state,
        commissions: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeCommissionGroupDetails: {
      return {
        ...state,
        commissionDetails: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function generalReducer(
  state = initialGeneralState,
  action: categoryActions.storeManagementActions
): generalState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeCountries: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeByIdCountries: {
      return {
        ...state,
        countryById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZone: {
      return {
        ...state,
        zone: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZoneCount: {
      return {
        ...state,
        zoneCount: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZipCode: {
      return {
        ...state,
        zipcode: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZoneById: {
      return {
        ...state,
        zoneById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeByIdZipCode: {
      return {
        ...state,
        zipcodeById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZipZoneUser: {
      return {
        ...state,
        allZipZoneUser: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZipZoneUserById: {
      return {
        ...state,
        zipZoneUserById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeUserGroup: {
      return {
        ...state,
        userGroup: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeDuplicateZipCode: {
      return {
        ...state,
        duplicateZipCode: action.payload,
      };
    }

    case categoryActions.ActionTypes.resetDuplicateZipCode: {
      return {
        ...state,
        duplicateZipCode: null,
      };
    }

    default: {
      return state;
    }
  }
}

export function storeManagementReducer(
  state = initialstoreManagementState,
  action: categoryActions.storeManagementActions
): storeManagementState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeFulfillmentCenter: {
      return {
        ...state,
        fulfillmentcenter: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZoneByFulfillmentCenterId: {
      return {
        ...state,
        zoneByFulfillmentCenterId: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeFulfillmentCenterById: {
      return {
        ...state,
        fulfillmentcenterById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeDeliveryCenter: {
      return {
        ...state,
        deliveryCenter: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeDeliveryCenterById: {
      return {
        ...state,
        deliveryCenterById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZipcodeByDeliveryCenterId: {
      return {
        ...state,
        zipcodeBydeliveryCenterId: action.payload,
      };
    }
    case categoryActions.ActionTypes.storePaymentMethod: {
      return {
        ...state,
        paymentMethods: action.payload,
      };
    }
    case categoryActions.ActionTypes.storePaymentMethodById: {
      return {
        ...state,
        paymentMethodById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeRegionById: {
      return {
        ...state,
        regionsById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAppVersionById: {
      return {
        ...state,
        appVersionsById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeAppVersion: {
      return {
        ...state,
        appVersions: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeStaticPageManagementById: {
      return {
        ...state,
        staticPageManagementById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeStaticPageManagement: {
      return {
        ...state,
        staticPageManagement: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeLogisticPartner: {
      return {
        ...state,
        logisticPartner: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeLogisticPartnerById: {
      return {
        ...state,
        logisticPartnerById: action.payload,
      };
    }
    case categoryActions.ActionTypes.storeZoneByZip: {
      return {
        ...state,
        zipByZone: action.payload,
      };
    }

    case categoryActions.ActionTypes.storeUserByZoneId: {

      let prevState = state.usersByZoneId;
      console.log('Zone reducer', action.payload)
      if (Array.isArray(action.payload)) {
        if (action.payload.length > 1) {
          prevState = action.payload
        } else {
          const index = state.usersByZoneId['payload'].findIndex(item => item.id == action.payload[0].id);
          state.usersByZoneId['payload'][index] = action.payload[0];
          state.usersByZoneId['payload'].splice(index, 1, action.payload[0]);
          console.log('Reducer', state.usersByZoneId);
          prevState = state.usersByZoneId;
        }
      } else {
        prevState = action.payload
      }
      console.log('Reducer', state.usersByZoneId, Array.isArray(action.payload))

      return {
        ...state,
        usersByZoneId: prevState,
      };
    }

    case categoryActions.ActionTypes.storeSellerPastOrders: {
      return {
        ...state,
        sellerPastOrder: action.payload,
      };
    }

    case categoryActions.ActionTypes.storeSellerCurrentOrders: {
      return {
        ...state,
        sellerCurrentOrder: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}
export function storeProductListReducer(
  state = initialStoreProductListState,
  action: categoryActions.StoreProductListManagementActions
): StoreProductListManagementState {
  switch (action.type) {
    case categoryActions.ActionTypes.storeStoreProductList: {
      const { fromAction, data } = action.payload;
      const { type, query } = fromAction;
      let dataToStore = data.hits;
      console.log('dataToStore', dataToStore, fromAction, data);
      let newState = null;
      if (type === 'initial') {
        newState = { productList: dataToStore, totalRecords: data.total.value, initialQuery: query, currentQuery: query };
      } else if (type === 'pagination') {
        const prevData = state.productList;
        dataToStore = prevData ? prevData.concat(dataToStore) : dataToStore;
        newState = { productList: dataToStore, currentQuery: query };
      }
      return {
        ...state,
        ...newState
      };
    }
    case categoryActions.ActionTypes.storeStoreCategoryProductList: {
      return {
        ...state,
        productCategories: action.payload.data.obj,
      };
    }


    // case categoryActions.ActionTypes.storeUpdateActiveProductStatus: {
    //   return {
    //     ...state,
    //     storeUpdateActiveProductStatus: action.payload,
    //   };
    // }
    default: {
      return state;
    }
  }
}
