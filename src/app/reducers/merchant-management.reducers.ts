import { StoreProductList } from './../actions/merchant-management.actions';
import * as merchantManagementActions from '../actions/merchant-management.actions';

export interface MerchantManagementState {
  commissionType: object;
  merchantGroup: object;
  buisnessCategory: object;
  regionsList: object;
  paymentMethods: object;
  fullfillmentMode: object;
  activeMerchants: Array<[]>;
  pendingMerchants: object;
  activeMerchantDetails: object;
  storeDetailsByMerchant: object;
  inactiveMerchantDetails: object;
  regionByCountryId: object;
  allInterestedMerchant: object;
  allMerchants: object;
  merchantsListNew: object;
  allMerchantsElastic: object;
  allSearchMerchants: object;
  merchantDetail: object;
  deliveryRequestedMerchants: object;
  manageMerchantDraft: object;
  storeStoreDraftRequest: object;
  storeStoreApprovalList: object;
  storeStoreAssign: object;
  storeProfileDetails: object;
  storeProductDetails: object;
  storeProductCategory: object;
  storeProductList: object;
  storeComplianceDetails: object;
  productDetailsById: object;
  productList: object;
  productCategoriesByStoreId: object;
  storeKeywords: object;
  storeImages: object;
  storeDeliverySettings: object;
  storeInfoDetails: object;
  storeOperationDetails: object;
  storeProperties: object;
  deliveryBoys: object;
  deliveryBoyDetails: object;
  deliveryBoyOrder: object;
  storeQuickLinks: object;
  storeBannerList: object;
  deliveryBoyShifts: object;
  storeComplianceTypeDetails: object;
  deliveryBoyLisenseTypes: object;
  drivingIssuingState: object;
  deliveryBoyCommisions: object;
  deliveryBoyOrderDetails: object;
  storeMasterQuickLinks: object;
  storeBannerDetails: object;
  storeComplianceList: object;
  storeProductsList: object;
  storeSpecificBulkList: object;
  registerMerchantBulkList: object;
  storeCategoryKeywords: object;
  transactionHistory: object;
  storeCreditRequired: object;
  storeListLayouts: object;
  storeDetailLayouts: object;
  storeCount: object;
  productCount: object;
  orderCount: object;
  storeCompleteCount: object;
  collectionBannerList: object;
  collectionBannerById: object;
  addedCategoryList: object;
  addedCategory: object;
  deletedCategoryDetails: object;
  editedCategoryDetails: object;
  merchantInfoById: object;
  storeListByMerchantId: object;
  hubListByMerchantId: object;
  hubDetailsByID: object;
  merchantHubStoreUserList: object;
  storesByMerchantId: object;
  saveStoreUrl: object;
  saveCreatedStoreUrl: object;
  storeUserDetailsByIds: object;
  saveUpdateMerchantHubUserDetails: object;
  storeVerifyGstn: object;
  updatedStoreUrl: object;
  saveStorecategorybybusinessId: object;
  storeDeliveryPartnerList: object;
  addedStoreDeliverylist: object;
  delivereyComapnyList: object;
}

export const initialMerchantMgmtState: MerchantManagementState = {
  commissionType: null,
  merchantGroup: null,
  buisnessCategory: null,
  regionsList: null,
  paymentMethods: null,
  fullfillmentMode: null,
  activeMerchants: null,
  pendingMerchants: null,
  activeMerchantDetails: null,
  storeDetailsByMerchant: null,
  inactiveMerchantDetails: null,
  regionByCountryId: null,
  allInterestedMerchant: {},
  allMerchants: null,
  allMerchantsElastic: null,
  merchantsListNew: null,
  allSearchMerchants: null,
  merchantDetail: null,
  deliveryRequestedMerchants: null,
  manageMerchantDraft: null,
  storeStoreDraftRequest: null,
  storeStoreApprovalList: null,
  storeStoreAssign: null,
  storeProfileDetails: null,
  storeProductDetails: null,
  storeProductCategory: null,
  storeProductList: null,
  storeComplianceDetails: null,
  productDetailsById: null,
  productList: null,
  productCategoriesByStoreId: null,
  storeKeywords: null,
  storeImages: null,
  storeDeliverySettings: null,
  storeInfoDetails: null,
  storeOperationDetails: null,
  storeProperties: null,
  deliveryBoys: null,
  deliveryBoyDetails: null,
  deliveryBoyOrder: null,
  deliveryBoyShifts: null,
  storeQuickLinks: null,
  storeBannerList: null,
  storeComplianceTypeDetails: null,
  deliveryBoyLisenseTypes: null,
  drivingIssuingState: null,
  deliveryBoyCommisions: null,
  deliveryBoyOrderDetails: null,
  storeMasterQuickLinks: null,
  storeBannerDetails: null,
  storeComplianceList: null,
  storeProductsList: null,
  storeSpecificBulkList: null,
  registerMerchantBulkList: null,
  storeCategoryKeywords: null,
  transactionHistory: null,
  storeCreditRequired: null,
  storeListLayouts: null,
  storeDetailLayouts: null,
  storeCount: null,
  productCount: null,
  orderCount: null,
  storeCompleteCount: null,
  collectionBannerList: null,
  collectionBannerById: null,
  addedCategoryList: null,
  addedCategory: null,
  deletedCategoryDetails: null,
  editedCategoryDetails: null,
  merchantInfoById: null,
  storeListByMerchantId: null,
  hubListByMerchantId: null,
  hubDetailsByID: null,
  merchantHubStoreUserList: null,
  storesByMerchantId: null,
  saveStoreUrl: null,
  saveCreatedStoreUrl: null,
  storeUserDetailsByIds: null,
  saveUpdateMerchantHubUserDetails: null,
  storeVerifyGstn: null,
  updatedStoreUrl: null,
  saveStorecategorybybusinessId: null,
  storeDeliveryPartnerList: null,
  addedStoreDeliverylist: null,
  delivereyComapnyList: null
};

export function merchantMgmtReducer(state = initialMerchantMgmtState, action: merchantManagementActions.MerchantMgmtReducerActions): MerchantManagementState {
  switch (action.type) {
    case merchantManagementActions.ActionTypes.storeVerifyGstn: {
      return {
        ...state,
        storeVerifyGstn: action.payload.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeStoresByMerchantId: {
      return {
        ...state,
        storesByMerchantId: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeMerchantHubStoreUserList: {
      return {
        ...state,
        merchantHubStoreUserList: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeUserDetailsById: {
      return {
        ...state,
        storeUserDetailsByIds: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.saveUpdateMerchantHubUserDetails: {
      return {
        ...state,
        saveUpdateMerchantHubUserDetails: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeStoreHubByID: {
      return {
        ...state,
        hubDetailsByID: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeHubListByMerchantId: {
      return {
        ...state,
        hubListByMerchantId: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeMerchantInfoById: {
      return {
        ...state,
        merchantInfoById: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeStoreListByMerchantId: {
      return {
        ...state,
        storeListByMerchantId: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeCommissionType: {
      return {
        ...state,
        commissionType: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeMerchantGroup: {
      return {
        ...state,
        merchantGroup: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeBusinessCategory: {
      return {
        ...state,
        buisnessCategory: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.saveStoreURl: {
      return {
        ...state,
        saveStoreUrl: action.payload
      };
    } // reducer created for add url
    case merchantManagementActions.ActionTypes.saveCreatedStoreURl: {
      return {
        ...state,
        saveCreatedStoreUrl: action.payload
      };
    } 
    case merchantManagementActions.ActionTypes.saveUpdatesStoreUrl: {
      return {
        ...state,
        updatedStoreUrl: action.payload
      };
    } 
    case merchantManagementActions.ActionTypes.saveStoreDeliveryPartner: {
      return {
        ...state,
        storeDeliveryPartnerList: action.payload
      };
    } 
    case merchantManagementActions.ActionTypes.saveDeliveryCompanyList: {
      return {
        ...state,
        delivereyComapnyList: action.payload
      };
    } 
    case merchantManagementActions.ActionTypes.addedStoreDeliveryPartner: {
      return {
        ...state,
        addedStoreDeliverylist: action.payload
      };
    } 
    
    case merchantManagementActions.ActionTypes.storeRegionsList: {
      return {
        ...state,
        regionsList: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storePaymentMethods: {
      return {
        ...state,
        paymentMethods: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeFullfillmentMode: {
      return {
        ...state,
        fullfillmentMode: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.storeAllActiveMerchants: {
      return {
        ...state,
        activeMerchants: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAllPendingMerchants: {
      return {
        ...state,
        pendingMerchants: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeActiveMerchantDetails: {
      return {
        ...state,
        activeMerchantDetails: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreDetailsByMerchant: {
      return {
        ...state,
        storeDetailsByMerchant: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAllInactiveMerchants: {
      return {
        ...state,
        inactiveMerchantDetails: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeRegionByCountryId: {
      return {
        ...state,
        regionByCountryId: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAllInterestedMerchant: {
      return {
        ...state,
        allInterestedMerchant: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAllMerchants: {
      return {
        ...state,
        allMerchants: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAllMerchantsElastic: {
      return {
        ...state,
        allMerchantsElastic: action.payload.hits.hits
      }
    }
    case merchantManagementActions.ActionTypes.storeMerchantsListNew: {
      return {
        ...state,
        merchantsListNew: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeSearchMerchants: {
      return {
        ...state,
        allSearchMerchants: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeMerchantDetail: {
      return {
        ...state,
        merchantDetail: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryRequestedMerchants: {
      return {
        ...state,
        deliveryRequestedMerchants: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeMerchantDraft: {
      console.log("**********Reducer*********", action.payload)
      return {
        ...state,
        manageMerchantDraft: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreDraftRequest: {
      return {
        ...state,
        storeStoreDraftRequest: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreApprovalList: {
      return {
        ...state,
        storeStoreApprovalList: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreAssign: {
      return {
        ...state,
        storeStoreAssign: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreProfileAction: {
      return {
        ...state,
        storeProfileDetails: action.payload ? action.payload['obj'] : null
      }
    }
    case merchantManagementActions.ActionTypes.reflectstoreProfiledetailsAfterUpdate: {
      const payload = action.payload;
      const currentData = state.storeProfileDetails
      const productDetails = state.storeProductDetails['hits'][0]._source;
      if (payload.logoUrl) {
        currentData[0]['sourceAsMap']['store_logo_url'] = payload.logoUrl
        productDetails['store_logo_url'] = payload.logoUrl
      }
      else if (payload.coverImage) {
        currentData[0]['sourceAsMap']['store_cover_image'] = payload.coverImage
        productDetails['store_cover_image'] = payload.coverImage
      }
      else if (payload.isLive != null) {
        currentData[0]['sourceAsMap']['is_live'] = payload.isLive
        productDetails['is_live'] = payload.isLive
      }
      else if (payload.storeName) {
        currentData[0]['sourceAsMap']['store_display_name'] = payload.storeName
        productDetails['store_display_name'] = payload.storeName
      }
      else if (payload.tagLine) {
        currentData[0]['sourceAsMap']['tagLine'] = payload.tagLine
      }
      else if (payload.businessCategoryId) {
        currentData[0]['sourceAsMap']['businessCategoryId'] = payload.businessCategoryId
        currentData[0]['sourceAsMap']['businessCategoryName'] = payload.businessCategoryName
        productDetails['businessCategoryId'] = payload.businessCategoryId
        productDetails['businessCategoryName'] = payload.businessCategoryName
      }
      else if (payload.latitude && payload.longitude && payload.address) {
        currentData[0]['sourceAsMap']['location']['lat'] = payload.latitude
        currentData[0]['sourceAsMap']['location']['lon'] = payload.longitude
        currentData[0]['sourceAsMap']['store_address'] = payload.address
        productDetails['store_address'] = payload.address
        productDetails['location']['lat'] = payload.latitude
        productDetails['location']['lon'] = payload.longitude
      }
      else if (payload.deliveryAttributes) {
        currentData[0]['sourceAsMap']['delivery_attributes']['store_pickup'] = payload.deliveryAttributes.store_pickup
        currentData[0]['sourceAsMap']['delivery_attributes']['order_processing_time'] = payload.deliveryAttributes.order_processing_time
        productDetails['delivery_attributes']['store_pickup'] = payload.deliveryAttributes.store_pickup
        productDetails['delivery_attributes']['order_processing_time'] = payload.deliveryAttributes.order_processing_time

        if (payload.deliveryAttributes && payload.home_delivery) {
          currentData[0]['sourceAsMap']['delivery_attributes']['home_delivery'] = payload.home_delivery
          productDetails['delivery_attributes']['home_delivery'] = payload.home_delivery
        }
      }
      state.storeProfileDetails = currentData
      state.storeProductDetails['hits'][0]._source = productDetails
      return {
        ...state,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreProductDetails: {
      return {
        ...state,
        storeProductDetails: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeProductCategory: {
      return {
        ...state,
        storeProductCategory: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeProductList: {
      let previousList: any = state.storeProductList;
      let updatedList = null;
      if (previousList && previousList.length > 0 && action.refresh == false) {
        previousList.push( ...action.payload['hits'] );
        updatedList = previousList;
      } else {
        updatedList = action.payload ? action.payload['hits'] : null;
      }
      state.storeProductList = updatedList
      return {
        ...state,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreComplianceDetails: {

      return {
        ...state,
        storeComplianceDetails: action.payload['obj'] ? action.payload['obj'] : null
      }
    }

    case merchantManagementActions.ActionTypes.storeUpdateStoreProductActiveState: {
      const { data, productIndex } = action.payload;
      const prevData = state.productList;
      const dataFromStore = prevData;
      dataFromStore[productIndex]._source.is_active = data.is_active;
      return {
        ...state,
        productList: dataFromStore
      };
    }
    case merchantManagementActions.ActionTypes.storeProductCategoriesByStoreId: {
      return {
        ...state,
        productCategoriesByStoreId: action.payload,
      };
    }
    case merchantManagementActions.ActionTypes.storeStoreProductDetailsById: {
      return {
        ...state,
        productDetailsById: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeCollectionBannerList: {
      return {
        ...state,
        collectionBannerList: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeCollectionBannerById: {
      return {
        ...state,
        collectionBannerById: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreKeywords: {
      return {
        ...state,
        storeKeywords: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreImages: {
      return {
        ...state,
        storeImages: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreDeliverySettings: {
      return {
        ...state,
        storeDeliverySettings: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }

    case merchantManagementActions.ActionTypes.savestoreCategoryList: {
      return {
        ...state,
        addedCategoryList: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.storeAddCategorySuccess: {
      return {
        ...state,
        addedCategory: action.payload
      }
    }
    case merchantManagementActions.ActionTypes.deleteCategorySuccess: {
      return {
        ...state,
        deletedCategoryDetails : action.payload
      }
    }
    case merchantManagementActions.ActionTypes.editCategorySuccess: {
      return {
        ...state,
        editedCategoryDetails : action.payload
      }
    }

    case merchantManagementActions.ActionTypes.storeManageStoreProperties: {
      return {
        ...state,
        storeProperties: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreInfoDetails: {
      return {
        ...state,
        storeInfoDetails: action.payload["payload"] ? action.payload["payload"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.saveStoreCategory: {
      return {
        ...state,
        saveStorecategorybybusinessId: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreOperationDetails: {
      return {
        ...state,
        storeOperationDetails: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoys: {
      return {
        ...state,
        deliveryBoys: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoyDetails: {
      return {
        ...state,
        deliveryBoyDetails: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoysOrder: {
      return {
        ...state,
        deliveryBoyOrder: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreQuickLinks: {
      return {
        ...state,
        storeQuickLinks: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeMasterQuickLinks: {
      return {
        ...state,
        storeMasterQuickLinks: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreBannerList: {
      return {
        ...state,
        storeBannerList: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoyShifts: {
      return {
        ...state,
        deliveryBoyShifts: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeComplianceTypeDetails: {
      return {
        ...state,
        storeComplianceTypeDetails: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoyLicenseTypes: {
      return {
        ...state,
        deliveryBoyLisenseTypes: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeDrivingLissuingState: {
      return {
        ...state,
        drivingIssuingState: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoyCommisions: {
      return {
        ...state,
        deliveryBoyCommisions: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeDeliveryBoyOrderDetails: {
      return {
        ...state,
        deliveryBoyOrderDetails: action.payload,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreBannerDetails: {
      return {
        ...state,
        storeBannerDetails: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreComplianceList: {
      return {
        ...state,
        storeComplianceList: action.payload["payload"] ? action.payload["payload"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreProductsList: {
      return {
        ...state,
        storeProductsList: action.payload ? action.payload : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreSpecificBulkList: {
      return {
        ...state,
        storeSpecificBulkList: action.payload["payload"] ? action.payload["payload"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeRegisterMerchantBulkList: {
      return {
        ...state,
        registerMerchantBulkList: action.payload["payload"] ? action.payload["payload"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStorecategoryKeywords: {
      return {
        ...state,
        storeCategoryKeywords: action.payload["payload"] ? action.payload["payload"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreCreditTransactionHistory: {
      return {
        ...state,
        transactionHistory: action.payload["obj"] ? action.payload["obj"][0] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreCreditRequiredForSubscription: {
      return {
        ...state,
        storeCreditRequired: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreListLayouts: {
      return {
        ...state,
        storeListLayouts: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }
    case merchantManagementActions.ActionTypes.storeStoreDetailsLayouts: {
      return {
        ...state,
        storeDetailLayouts: action.payload["obj"] ? action.payload["obj"] : null,
      }
    }

    case merchantManagementActions.ActionTypes.saveStoreCountForDashboard: {
      return {
        ...state,
        storeCount: action.payload['payload'] ? action.payload['payload'] : null
      };
    }
    case merchantManagementActions.ActionTypes.saveProductCountForDashboard: {
      return {
        ...state,
        productCount: action.payload['payload'] ? action.payload['payload'] : null
      };
    }
    case merchantManagementActions.ActionTypes.saveOrderCountForDashboard: {
      console.log('reducer reached', action.payload)
      return {
        ...state,
        orderCount: action.payload
      };
    }
    case merchantManagementActions.ActionTypes.saveStoreCompletenessCount: {
      return {
        ...state,
        storeCompleteCount: action.payload['payload'] ? action.payload['payload'] : null
      };
    }
    default: {
      return state;
    }
  }
}
