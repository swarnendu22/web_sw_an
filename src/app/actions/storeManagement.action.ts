import { Action } from '@ngrx/store';

export enum ActionTypes {
  getCategories = 'getCategories',
  storeCategories = 'storeCategories',

  getCategoriesElastic = 'getCategoriesElastic',
  storeCategoriesElastic = 'storeCategoriesElastic',

  getCategoriesElasticGlobal = 'getCategoriesElasticGlobal',
  storeCategoriesElasticGlobal = 'storeCategoriesElasticGlobal',

  getAllCategories = 'getAllCategories',
  storeAllCategories = 'storeAllCategories',

  getPendingCategories = 'getPendingCategories',
  storePendingCategories = 'storePendingCategories',
  postNewCategoryRequest = 'postNewCategories',
  getCategoryDetails = 'getCategoryDetails',
  storeCategoryDetails = 'storeCategoryDetails',
  postCategoryPosition = 'set category position',

  // Attribute Actions
  getProductAttributes = 'getProductAttributes',
  storeProductAttributes = 'storeProductAttributes',
  postProductAttributes = 'postProductAttributes',
  deleteProductAttributes = 'deleteProductAttributes',
  updateProductAttributes = 'updateProductAttributes',
  updateProductAttributesOnPosition = 'updateProductAttributesOnPosition',
  getByIdProductAttributes = 'getByIdProductAttributes',
  storeGetByIdProductAttribute = 'storeGetByIdProductAttribute',
  storeGetByIdProductAttributeValue = 'storeGetByIdProductAttributeValue',
  storeViewProductAttribute = 'storeViewProductAttribute',
  getByIdProductAttributesValue = 'getByIdProductAttributesValue',
  viewProductAttributeValue = 'viewProductAttributeValue',
  resetGetByIdProductAttributeValue = 'resetGetByIdProductAttributeValue',
  getAttributePositions = 'getAttributePositions',
  storeAttributePositions = 'storeAttributePositions',
  updateAttributePositions = 'updateAttributePositions',

  postAttributeGroup = 'postAttributeGroup',
  getAttributeGroupName = 'getAttributeGroupName',
  putAttributeGroupName = 'putAttributeGroupName',
  deleteAttributeGroupName = 'deleteAttributeGroupName',
  storeAttributeGroupName = 'storeAttributeGroupName',
  getByIdAttributeGroupName = 'getByIdAttributeGroupName',
  getAttributesByGroupId = 'getAttributesByGroupId',
  storeAttributesByGroupId = 'storeAttributesByGroupId',


  storeGetByIdAttributeGroupName = 'storeGetByIdAttributeGroupName',
  checkAttributeGroupName = 'checkAttributeGroupName',

  getByIdAttributeGroupNameNew = 'getByIdAttributeGroupNameNew',
  storeAttributeGroupNameById = 'storeAttributeGroupNameById',

  getAttributeSet = 'getAttributeSet',
  getAttributeSetPagination = 'getAttributeSetPagination',
  postAttributeSet = 'postAttributeSet',
  storeAttributeSet = 'storeAttributeSet',
  deleteAttributeSet = 'deleteAttributeSet',
  postAttributeSetRel = 'postAttributeSetRel',
  getAttributeSetAttributes = 'getAttributeSetAttributes',
  storeAttributeSetAttributes = 'storeAttributeSetAttributes',
  storeAttributeSetById = 'storeAttributeSetById',
  updateAttributeSet = 'updateAttributeSet',
  updateAttributeSetRel = 'updateAttributeSetRel',
  deleteAttributesOnAttributeSet = 'deleteAttributesOnAttributeSet',

  getByIdAttributeSet = 'getByIdAttributeSet',
  getNewAttributeSetId = 'getNewAttributeSetId',

  getParentCategories = 'getParentCategories',
  storeParentCategories = 'storeParentCategories',
  getCommissions = 'getCommissions',
  storeCommissions = 'storeCommissions',
  storePostCommissions = 'storePostCommissions',

  getCommissionGroupDetails = 'getCommissionGroupDetails',
  storeCommissionGroupDetails = 'storeCommissionGroupDetails',

  // General Module
  getCountries = 'getCountries',
  postCountries = 'postCountries',
  getByIdCountry = 'getByIdCountry',
  storeCountries = 'storeCountries',
  storeByIdCountries = 'storeByIdCountries',
  updateCountry = 'updateCountry',
  deleteCountry = 'deleteCountry',
  getRegionByCountryId = 'getRegionByCountryId',
  RESET_STATE = 'RESET_STATE',

  getFulfillmentCenter = 'getFulfillmentCenter',
  postFulfillmentCenter = 'postFulfillmentCenter',
  updateFulfillmentCenter = 'updateFulfillmentCenter',
  getByIdFulfillmentCenter = 'getByIdFulfillmentCenter',
  storeFulfillmentCenter = 'storeFulfillmentCenter',
  storeFulfillmentCenterById = 'storeFulfillmentCenterById',
  getZoneByFulfillmentCenterId = 'getZoneByFulfillmentCenterId',
  storeZoneByFulfillmentCenterId = 'storeZoneByFulfillmentCenterId',
  updateZoneFulfillmentCenterById = 'updateZoneFulfillmentCenterById',
  postZoneFulfillmentCenter = 'postZoneFulfillmentCenter',
  deleteZoneFulfillmentCenterById = 'deleteZoneFulfillmentCenterById',

  storeZone = 'storeZone',
  getZone = 'getZone',
  storeZoneCount = 'storeZoneCount',
  getZoneCount = 'getZoneCount',
  postNewZone = 'postNewZone',
  getByIdZone = 'getByIdZone',
  deleteZone = 'deleteZone',
  updateZone = 'updateZone',
  storeZoneById = 'storeZoneById',
  storeZoneByZip = 'storeZoneByZip',
  getByIdZoneByZip = 'getByIdZoneByZip',

  getUsersByZoneId = 'getUsersByZoneId',
  updateUsersByZoneId = 'updateUsersByZoneId',
  storeUserByZoneId = 'storeUserByZoneId',

  storeZipZoneUser = 'storeZipZoneUser',
  getZipZoneUser = 'getZipZoneUser',
  postZipZoneUser = 'postZipZoneUser',
  getByIdZipZoneUser = 'getByIdZipZoneUser',
  deleteZipZoneUser = 'deleteZipZoneUser',
  updateZipZoneUser = 'updateZipZoneUser',
  storeZipZoneUserById = 'storeZipZoneUserById',
  getUserGroup = 'getUserGroup',
  storeUserGroup = 'storeUserGroup',

  storeZipCode = 'storeZipCode',
  getZipCode = 'getZipCode',
  postNewZipCode = 'postNewZipCode',
  getByIdZipCode = 'getByIdZipCode',
  deleteZipCode = 'deleteZipCode',
  updateZipCode = 'updateZipCode',
  storeByIdZipCode = 'storeByIdZipCode',

  storeDeliveryCenter = 'storeDeliveryCenter',
  getDeliveryCenter = 'getDeliveryCenter',
  postNewDeliveryCenter = 'postNewDeliveryCenter',
  getByIdDeliveryCenter = 'getByIdDeliveryCenter',
  deleteDeliveryCenter = 'deleteDeliveryCenter',
  updateDeliveryCenter = 'updateDeliveryCenter',
  storeDeliveryCenterById = 'storeDeliveryCenterById',
  postNewZipcodeByDeliveryCenterId = 'postNewZipcodeByDeliveryCenterId',
  getZipcodeByDeliveryCenterId = 'getZipcodeByDeliveryCenterId',
  storeZipcodeByDeliveryCenterId = 'storeZipcodeByDeliveryCenterId',
  updateZipcodeByDeliveryCenterId = 'updateZipcodeByDeliveryCenterId',
  deleteZipcodeByDeliveryCenterId = 'deleteZipcodeByDeliveryCenterId',

  storePaymentMethod = 'storePaymentMethod',
  getPaymentMethod = 'getPaymentMethod',
  postNewPaymentMethod = 'postNewPaymentMethod',
  getByIdPaymentMethod = 'getByIdPaymentMethod',
  deletePaymentMethod = 'deletePaymentMethod',
  updatePaymentMethod = 'updatePaymentMethod',
  storePaymentMethodById = 'storePaymentMethodById',

  postNewRegion = 'postNewRegion',
  getByIdRegion = 'getByIdRegion',
  deleteRegion = 'deleteRegion',
  updateRegion = 'updateRegion',
  storeRegionById = 'storeRegionById',

  storeLogisticPartner = 'storeLogisticPartner',
  getLogisticPartner = 'getLogisticPartner',
  postNewLogisticPartner = 'postNewLogisticPartner',
  getByIdLogisticPartner = 'getByIdLogisticPartner',
  deleteLogisticPartner = 'deleteLogisticPartner',
  updateLogisticPartner = 'updateLogisticPartner',
  storeLogisticPartnerById = 'storeLogisticPartnerById',

  storeAppVersion = 'storeAppVersion',
  getAppVersion = 'getAppVersion',
  postNewAppVersion = 'postNewAppVersion',
  getByIdAppVersion = 'getByIdAppVersion',
  deleteAppVersion = 'deleteAppVersion',
  updateAppVersion = 'updateAppVersion',
  storeAppVersionById = 'storeAppVersionById',

  storeStaticPageManagement = 'storeStaticPageManagement',
  getStaticPageManagement = 'getStaticPageManagement',
  postNewStaticPageManagement = 'postNewStaticPageManagement',
  getByIdStaticPageManagement = 'getByIdStaticPageManagement',
  deleteStaticPageManagement = 'deleteStaticPageManagement',
  updateStaticPageManagement = 'updateStaticPageManagement',
  storeStaticPageManagementById = 'storeStaticPageManagementById',
  deleteCategoryCommision = 'deleteCategoryCommision',

  updateZipcodeByZone = 'updateZipcodeByZone',
  findDuplicateZipCode = 'findDuplicateZipCode',
  storeDuplicateZipCode = 'storeDuplicateZipCode',

  resetDuplicateZipCode = 'resetDuplicateZipCode',

  getSellerCurrentOrders = 'getSellerCurrentOrders',
  storeSellerCurrentOrders = 'storeSellerCurrentOrders',

  getSellerPastOrders = 'getSellerPastOrders',
  storeSellerPastOrders = 'storeSellerPastOrders',

  // Store Product Actions
  getStoreProductList = 'store/product/list/get/store/product/list',
  storeStoreProductList = 'store/product/list/store/store/product/list',
  getStoreCategoryProductList = 'store/product/list/get/store/category/product/list',
  storeStoreCategoryProductList = 'store/product/list/store/store/category/product/list',
  getStorePrivateCategory = 'getStorePrivateCategory',
  storeStorePrivateCategory = 'storeStorePrivateCategory',
  approvePrivateRequestCategory = 'approvePrivateRequestCategory',
  getCategoryKeywordsRequest = 'getCategoryKeywordsRequest',
  storeCategoryKeywordsRequest = 'storeCategoryKeywordsRequest',
  approveCategoryKeywordsRequest = 'approveCategoryKeywordsRequest',
  getPrivateAndMasterCategories = 'getPrivateAndMasterCategories',
  storePrivateAndMasterCategories = 'storePrivateAndMasterCategories',
  getStoreQuickLinksRequests = 'getStoreQuickLinksRequests',
  storeStoreQuickLinksRequests = 'StoreStoreQuickLinksRequests',
  approveStoreQuickLinksRequest = 'approveStoreQuickLinksRequest',
  getStoreRelatedMasterCategories = 'getStoreRelatedMasterCategories',
  storeStoreRelatedMasterCategories = 'storeStoreRelatedMasterCategories',

  updateCategoryImage = 'updateCategoryImage',
}

export class FindDuplicateZipCode implements Action {
  readonly type = ActionTypes.findDuplicateZipCode;
  constructor(public payload: object) { }
}
export class StoreDuplicateZipCode implements Action {
  readonly type = ActionTypes.storeDuplicateZipCode;
  constructor(public payload: object) { }
}

export class ResetDuplicateZipCode implements Action {
  readonly type = ActionTypes.resetDuplicateZipCode;
}

export class GetSellerCurrentOrders implements Action {
  readonly type = ActionTypes.getSellerCurrentOrders;
  constructor(public stateName: any) {
    console.log("The state name for pending is ", stateName);
  }
}
export class StoreSellerCurrentOrders implements Action {
  readonly type = ActionTypes.storeSellerCurrentOrders;
  constructor(public payload: any) { }
}
export class GetSellerPastOrders implements Action {
  readonly type = ActionTypes.getSellerPastOrders;
  constructor(public stateName: any, public pageNo: number) {
    console.log("The state name for history is ", stateName, "page is : ", pageNo);
  }
}
export class StoreSellerPastOrders implements Action {
  readonly type = ActionTypes.storeSellerPastOrders;
  constructor(public payload: any) { }
}


export class UpdateZipcodeByZone implements Action {
  readonly type = ActionTypes.updateZipcodeByZone;
  constructor(public payload: object, public id: number) { }
}

// Zip Zone User Management
export class StoreZipZoneUser implements Action {
  readonly type = ActionTypes.storeZipZoneUser;
  constructor(public payload: object) { }
}

export class PostZipZoneUser implements Action {
  readonly type = ActionTypes.postZipZoneUser;
  constructor(public payload: object) { }
}

export class GetByIdZipZoneUser implements Action {
  readonly type = ActionTypes.getByIdZipZoneUser;
  constructor(public id: number) { }
}

export class GetZipZoneUser implements Action {
  readonly type = ActionTypes.getZipZoneUser;
}

export class GetUserGroup implements Action {
  readonly type = ActionTypes.getUserGroup;
}

export class StoreUserGroup implements Action {
  readonly type = ActionTypes.storeUserGroup;
  constructor(public payload: object) { }
}

export class DeleteZipZoneUser implements Action {
  readonly type = ActionTypes.deleteZipZoneUser;
  constructor(public id: number) { }
}

export class UpdateZipZoneUser implements Action {
  readonly type = ActionTypes.updateZipZoneUser;
  constructor(public payload: object, public id: number) { }
}

export class StoreZipZoneUserById implements Action {
  readonly type = ActionTypes.storeZipZoneUserById;
  constructor(public payload: object) { }
}

// Static Page Management
export class StoreStaticPageManagement implements Action {
  readonly type = ActionTypes.storeStaticPageManagement;
  constructor(public payload: object) { }
}

export class PostNewStaticPageManagement implements Action {
  readonly type = ActionTypes.postNewStaticPageManagement;
  constructor(public payload: object) { }
}

export class GetByIdStaticPageManagement implements Action {
  readonly type = ActionTypes.getByIdStaticPageManagement;
  constructor(public id: number) { }
}

export class GetStaticPageManagement implements Action {
  readonly type = ActionTypes.getStaticPageManagement;
}

export class DeleteStaticPageManagement implements Action {
  readonly type = ActionTypes.deleteStaticPageManagement;
  constructor(public id: number) { }
}

export class UpdateStaticPageManagement implements Action {
  readonly type = ActionTypes.updateStaticPageManagement;
  constructor(public payload: object, public id: number) { }
}

export class StoreStaticPageManagementById implements Action {
  readonly type = ActionTypes.storeStaticPageManagementById;
  constructor(public payload: object) { }
}

// App Version Management
export class StoreAppVersion implements Action {
  readonly type = ActionTypes.storeAppVersion;
  constructor(public payload: object) { }
}

export class PostNewAppVersion implements Action {
  readonly type = ActionTypes.postNewAppVersion;
  constructor(public payload: object) { }
}

export class GetByIdAppVersion implements Action {
  readonly type = ActionTypes.getByIdAppVersion;
  constructor(public id: number) { }
}

export class GetAppVersion implements Action {
  readonly type = ActionTypes.getAppVersion;
}

export class DeleteAppVersion implements Action {
  readonly type = ActionTypes.deleteAppVersion;
  constructor(public id: number) { }
}

export class UpdateAppVersion implements Action {
  readonly type = ActionTypes.updateAppVersion;
  constructor(public payload: object, public id: number) { }
}

export class StoreAppVersionById implements Action {
  readonly type = ActionTypes.storeAppVersionById;
  constructor(public payload: object) { }
}

// Logistic Partner
export class StoreLogisticPartner implements Action {
  readonly type = ActionTypes.storeLogisticPartner;
  constructor(public payload: object) { }
}

export class PostNewLogisticPartner implements Action {
  readonly type = ActionTypes.postNewLogisticPartner;
  constructor(public payload: object) { }
}

export class GetByIdLogisticPartner implements Action {
  readonly type = ActionTypes.getByIdLogisticPartner;
  constructor(public id: number) { }
}

export class GetLogisticPartner implements Action {
  readonly type = ActionTypes.getLogisticPartner;
}

export class DeleteLogisticPartner implements Action {
  readonly type = ActionTypes.deleteLogisticPartner;
  constructor(public id: number) { }
}

export class UpdateLogisticPartner implements Action {
  readonly type = ActionTypes.updateLogisticPartner;
  constructor(public payload: object, public id: number) { }
}

export class StoreLogisticPartnerById implements Action {
  readonly type = ActionTypes.storeLogisticPartnerById;
  constructor(public payload: object) { }
}

// Regions

export class PostNewRegion implements Action {
  readonly type = ActionTypes.postNewRegion;
  constructor(public payload: object) { }
}

export class GetByIdRegion implements Action {
  readonly type = ActionTypes.getByIdRegion;
  constructor(public id: number) { }
}

export class DeleteRegion implements Action {
  readonly type = ActionTypes.deleteRegion;
  constructor(public id: number) { }
}

export class UpdateRegion implements Action {
  readonly type = ActionTypes.updateRegion;
  constructor(public payload: object, public id: number) { }
}

export class StoreRegionById implements Action {
  readonly type = ActionTypes.storeRegionById;
  constructor(public payload: object) { }
}

// Payment Method
export class GetPaymentMethod implements Action {
  readonly type = ActionTypes.getPaymentMethod;
}

export class StorePaymentMethod implements Action {
  readonly type = ActionTypes.storePaymentMethod;
  constructor(public payload: object) { }
}

export class PostNewPaymentMethod implements Action {
  readonly type = ActionTypes.postNewPaymentMethod;
  constructor(public payload: object) { }
}

export class GetByIdPaymentMethod implements Action {
  readonly type = ActionTypes.getByIdPaymentMethod;
  constructor(public id: number) { }
}

export class DeletePaymentMethod implements Action {
  readonly type = ActionTypes.deletePaymentMethod;
  constructor(public id: number) { }
}

export class UpdatePaymentMethod implements Action {
  readonly type = ActionTypes.updatePaymentMethod;
  constructor(public payload: object, public id: number) { }
}

export class StorePaymentMethodById implements Action {
  readonly type = ActionTypes.storePaymentMethodById;
  constructor(public payload: object) { }
}

// Delivery Center
export class GetDeliveryCenter implements Action {
  readonly type = ActionTypes.getDeliveryCenter;
}

export class StoreDeliveryCenter implements Action {
  readonly type = ActionTypes.storeDeliveryCenter;
  constructor(public payload: object) { }
}

export class PostNewDeliveryCenter implements Action {
  readonly type = ActionTypes.postNewDeliveryCenter;
  constructor(public payload: object) { }
}

export class GetByIdDeliveryCenter implements Action {
  readonly type = ActionTypes.getByIdDeliveryCenter;
  constructor(public id: number) { }
}

export class DeleteDeliveryCenter implements Action {
  readonly type = ActionTypes.deleteDeliveryCenter;
  constructor(public id: number) { }
}

export class UpdateDeliveryCenter implements Action {
  readonly type = ActionTypes.updateDeliveryCenter;
  constructor(public payload: object, public id: number) { }
}

export class StoreDeliveryCenterById implements Action {
  readonly type = ActionTypes.storeDeliveryCenterById;
  constructor(public payload: object) { }
}

export class StoreZipcodeByDeliveryCenterId implements Action {
  readonly type = ActionTypes.storeZipcodeByDeliveryCenterId;
  constructor(public payload: object) { }
}

export class GetZipcodeByDeliveryCenterId implements Action {
  readonly type = ActionTypes.getZipcodeByDeliveryCenterId;
  constructor(public id: number) { }
}

export class PostNewZipcodeByDeliveryCenterId implements Action {
  readonly type = ActionTypes.postNewZipcodeByDeliveryCenterId;
  constructor(public payload: object, public id: number) {
    payload['dcId'] = id;
    console.log('PostNewZipcodeByDeliveryCenterId', payload, id)
  }
}

export class DeleteZipcodeByDeliveryCenterId implements Action {
  readonly type = ActionTypes.deleteZipcodeByDeliveryCenterId;
  constructor(public id: number) { }
}

export class UpdateZipcodeByDeliveryCenterId implements Action {
  readonly type = ActionTypes.updateZipcodeByDeliveryCenterId;
  constructor(public payload: object, public id: number) { }
}

// Zone
export class GetZone implements Action {
  readonly type = ActionTypes.getZone;
}

export class StoreZone implements Action {
  readonly type = ActionTypes.storeZone;
  constructor(public payload: object) { }
}

export class GetZoneCount implements Action {
  readonly type = ActionTypes.getZoneCount;
}

export class StoreZoneCount implements Action {
  readonly type = ActionTypes.storeZoneCount;
  constructor(public payload: object) { }
}

export class PostNewZone implements Action {
  readonly type = ActionTypes.postNewZone;
  constructor(public payload: object) { }
}

export class GetByIdZone implements Action {
  readonly type = ActionTypes.getByIdZone;
  constructor(public id: number) { }
}

export class GetByIdZoneByZip implements Action {
  readonly type = ActionTypes.getByIdZoneByZip;
  constructor(public id: number) {
    console.log('Get By Id Zipcode', id)

  }
}

export class DeleteZone implements Action {
  readonly type = ActionTypes.deleteZone;
  constructor(public id: number) { }
}

export class UpdateZone implements Action {
  readonly type = ActionTypes.updateZone;
  constructor(public payload: object, public id: number) { }
}

export class StoreZoneById implements Action {
  readonly type = ActionTypes.storeZoneById;
  constructor(public payload: object) { }
}

export class StoreByIdZipCode implements Action {
  readonly type = ActionTypes.storeByIdZipCode;
  constructor(public payload: object) { }
}

export class StoreZoneByZip implements Action {
  readonly type = ActionTypes.storeZoneByZip;
  constructor(public payload: object) { }
}

export class GetUsersByZoneId implements Action {
  readonly type = ActionTypes.getUsersByZoneId;
  constructor(public zoneId: number) { }
}

export class UpdateUsersByZoneId implements Action {
  readonly type = ActionTypes.updateUsersByZoneId;
  constructor(public zoneId: number, public payload: object, ) {
    console.log('Zone', zoneId, payload)
  }
}

export class StoreUserByZoneId implements Action {
  readonly type = ActionTypes.storeUserByZoneId;
  constructor(public payload: object) {
    console.log('Stroe', payload)
  }
}

// Zone
export class GetZipCode implements Action {
  readonly type = ActionTypes.getZipCode;
}

export class StoreZipCode implements Action {
  readonly type = ActionTypes.storeZipCode;
  constructor(public payload: object) { }
}

export class PostNewZipCode implements Action {
  readonly type = ActionTypes.postNewZipCode;
  constructor(public payload: object, public id?: number) { }
}

export class GetByIdZipCode implements Action {
  readonly type = ActionTypes.getByIdZipCode;
  constructor(public id: number) {
    console.log('Get By Id Zipcode', id)
  }
}

export class DeleteZipCode implements Action {
  readonly type = ActionTypes.deleteZipCode;
  constructor(public id: number, public zoneId?: number) {
    console.log('Delete Zone Action //////////', id, zoneId)
  }
}

export class UpdateZipCode implements Action {
  readonly type = ActionTypes.updateZipCode;
  constructor(public payload: object, public id: number, public zoneId?: number) {
    console.log('Udpate Zone Action //////////', id, payload, zoneId)
  }
}

// Countries

export class GetCountries implements Action {
  readonly type = ActionTypes.getCountries;
}

export class StoreCountries implements Action {
  readonly type = ActionTypes.storeCountries;
  constructor(public payload: object) { }
}

export class PostNewCountry implements Action {
  readonly type = ActionTypes.postCountries;
  constructor(public payload: object) { }
}

export class GetByIdCountry implements Action {
  readonly type = ActionTypes.getByIdCountry;
  constructor(public id: number) { }
}

export class StoreByIdCountries implements Action {
  readonly type = ActionTypes.storeByIdCountries;
  constructor(public payload: object) { }
}

export class UpdateCountry implements Action {
  readonly type = ActionTypes.updateCountry;
  constructor(public payload: object, public id: number) { }
}

export class DeleteCountry implements Action {
  readonly type = ActionTypes.deleteCountry;
  constructor(public id: number) { }
}

// Fulfillement Center

export class GetFulfillmentCenter implements Action {
  readonly type = ActionTypes.getFulfillmentCenter;
}

export class StoreFulfillmentCenter implements Action {
  readonly type = ActionTypes.storeFulfillmentCenter;
  constructor(public payload: object) { }
}

export class PostNewFulfillmentCenter implements Action {
  readonly type = ActionTypes.postFulfillmentCenter;
  constructor(public payload: object) { }
}

export class UpdateFulfillmentCenter implements Action {
  readonly type = ActionTypes.updateFulfillmentCenter;
  constructor(public payload: object, public id: number) { }
}

export class GetByIdFulfillmentCenter implements Action {
  readonly type = ActionTypes.getByIdFulfillmentCenter;
  constructor(public id: number) { }
}

export class GetZoneByFulfillmentCenterId implements Action {
  readonly type = ActionTypes.getZoneByFulfillmentCenterId;
  constructor(public id: number) { }
}

export class UpdateZoneFulfillmentCenterById implements Action {
  readonly type = ActionTypes.updateZoneFulfillmentCenterById;
  constructor(public payload: object, public id: number) { }
}
export class PostZoneFulfillmentCenter implements Action {
  readonly type = ActionTypes.postZoneFulfillmentCenter;
  constructor(public payload: object) { }
}

export class DeleteZoneByFulfillmentCenterId implements Action {
  readonly type = ActionTypes.deleteZoneFulfillmentCenterById;
  constructor(public id: number) { }
}

export class StoreFulfillmentCenterById implements Action {
  readonly type = ActionTypes.storeFulfillmentCenterById;
  constructor(public payload: object) { }
}

export class StoreZoneByFulfillmentCenterId implements Action {
  readonly type = ActionTypes.storeZoneByFulfillmentCenterId;
  constructor(public payload: object) { }
}

// Categories

export class GetCategory implements Action {
  readonly type = ActionTypes.getCategories;
  constructor(public payload: any = '') { }
}
export class StoreCategory implements Action {
  readonly type = ActionTypes.storeCategories;
  constructor(public payload: any) { }
}

export class GetCategoriesElastic implements Action {
  readonly type = ActionTypes.getCategoriesElastic;
  constructor(public payload: any = '') { }
}
export class StoreCategoriesElastic implements Action {
  readonly type = ActionTypes.storeCategoriesElastic;
  constructor(public payload: any) { }
}

export class GetCategoriesElasticGlobal implements Action {
  readonly type = ActionTypes.getCategoriesElasticGlobal;
  constructor(public payload: any = '') { }
}
export class StoreCategoriesElasticGlobal implements Action {
  readonly type = ActionTypes.storeCategoriesElasticGlobal;
  constructor(public payload: any) { }
}

export class GetAllCategory implements Action {
  readonly type = ActionTypes.getAllCategories;
  constructor(public listType: any = '') { }
}
export class StoreAllCategory implements Action {
  readonly type = ActionTypes.storeAllCategories;
  constructor(public payload: object) { }
}

export class GetPendingCategory implements Action {
  readonly type = ActionTypes.getPendingCategories;
}
export class StorePendingCategory implements Action {
  readonly type = ActionTypes.storePendingCategories;
  constructor(public payload: object) { }
}
export class PostNewCategoryRequest implements Action {
  readonly type = ActionTypes.postNewCategoryRequest;
  constructor(public payload: object) { }
}
export class PostCategoryPosition implements Action {
  readonly type = ActionTypes.postCategoryPosition;
  constructor(public payload: any) { }
}
export class GetCategoryDetailsRequest implements Action {
  readonly type = ActionTypes.getCategoryDetails;
  constructor(public payload: object) { }
}

export class StoreCategoryDetailsRequest implements Action {
  readonly type = ActionTypes.storeCategoryDetails;
  constructor(public payload: object) { }
}

export class GetProductAttribute implements Action {
  readonly type = ActionTypes.getProductAttributes;
}

export class StoreProductAttribute implements Action {
  readonly type = ActionTypes.storeProductAttributes;
  constructor(public payload: object) { }
}

export class GetAttributePositions implements Action {
  readonly type = ActionTypes.getAttributePositions;
  constructor(public id: number) { }
}

export class UpdateAttributePositions implements Action {
  readonly type = ActionTypes.updateAttributePositions;
  constructor(public payload: any, public id: number) { }
}

export class StoreAttributePositions implements Action {
  readonly type = ActionTypes.storeAttributePositions;
  constructor(public payload: object) { }
}

export class PostProductAttribute implements Action {
  readonly type = ActionTypes.postProductAttributes;
  constructor(public payload: any) { }
}

export class UpdateProductAttribute implements Action {
  readonly type = ActionTypes.updateProductAttributes;
  constructor(public payload: any, public id: number) { }
}

export class UpdateProductAttributeOnPosition implements Action {
  readonly type = ActionTypes.updateProductAttributesOnPosition;
  constructor(public payload: any, public id: number) { }
}

export class DeleteProductAttributes implements Action {
  readonly type = ActionTypes.deleteProductAttributes;
  constructor(public id: number) { }
}

export class GetByIdProductAttribute implements Action {
  readonly type = ActionTypes.getByIdProductAttributes;
  constructor(public id: number) { }
}
export class GetByIdProductAttributeValue implements Action {
  readonly type = ActionTypes.getByIdProductAttributesValue;
  constructor(public id: number) { }
}

export class ViewProductAttributeValue implements Action {
  readonly type = ActionTypes.viewProductAttributeValue;
  constructor(public id: number) { }
}

export class PostAttributeGroup implements Action {
  readonly type = ActionTypes.postAttributeGroup;
  constructor(public payload: object) {
    console.log('payload', this.payload);
  }
}
export class PutAttributeGroup implements Action {
  readonly type = ActionTypes.putAttributeGroupName;
  constructor(public payload: object, public id: number) { }
}

export class GetByIdAttributeGroup implements Action {
  readonly type = ActionTypes.getByIdAttributeGroupName;
  constructor(public groupId: number, public setId: number) { }
}

export class GetAttributesByGroupId implements Action {
  readonly type = ActionTypes.getAttributesByGroupId;
  constructor(public groupId: number, public setId: number) { }
}

export class StoreAttributesByGroupId implements Action {
  readonly type = ActionTypes.storeAttributesByGroupId;
  constructor(public payload: any) { }
}

export class GetByIdAttributeGroupNew implements Action {
  readonly type = ActionTypes.getByIdAttributeGroupNameNew;
  constructor(public id: number) { }
}

export class CheckAttributeGroupName implements Action {
  readonly type = ActionTypes.checkAttributeGroupName;
  constructor(public keyword: string) { }
}

export class StoreGetByIdProductAttribute implements Action {
  readonly type = ActionTypes.storeGetByIdProductAttribute;
  constructor(public payload: any) { }
}

export class StoreViewProductAttribute implements Action {
  readonly type = ActionTypes.storeViewProductAttribute;
  constructor(public payload: any) { }
}

export class StoreGetByIdProductAttributeValue implements Action {
  readonly type = ActionTypes.storeGetByIdProductAttributeValue;
  constructor(public payload: any) { }
}

export class GetAttributeGroupName implements Action {
  readonly type = ActionTypes.getAttributeGroupName;
}

export class StoreAttributeGroupName implements Action {
  readonly type = ActionTypes.storeAttributeGroupName;
  constructor(public payload: any) { }
}

export class StoreAttributeGroupNameById implements Action {
  readonly type = ActionTypes.storeAttributeGroupNameById;
  constructor(public payload: any) { }
}

export class StoreGetByIdAttributeGroupName implements Action {
  readonly type = ActionTypes.storeGetByIdAttributeGroupName;
  constructor(public payload: any) { }
}

export class DeleteAttributeGroupName implements Action {
  readonly type = ActionTypes.deleteAttributeGroupName;
  constructor(public id: number) { }
}

//  Attribute Set
export class StoreAttributeSet implements Action {
  readonly type = ActionTypes.storeAttributeSet;
  constructor(public payload: any) { }
}

export class GetAttributeSet implements Action {
  readonly type = ActionTypes.getAttributeSet;
}

export class GetAttributeSetPagination implements Action {
  readonly type = ActionTypes.getAttributeSetPagination;
  constructor(public payload: any) { }
}

export class GetByIdAttributeSet implements Action {
  readonly type = ActionTypes.getByIdAttributeSet;
  constructor(public id: number) { }
}

export class GetNewAttributeSetById implements Action {
  readonly type = ActionTypes.getNewAttributeSetId;
  constructor(public keyword: string) { }
}

export class GetAttributeSetAttributes implements Action {
  readonly type = ActionTypes.getAttributeSetAttributes;
  constructor(public id: number) { }
}
export class StoreAttributeSetAttributes implements Action {
  readonly type = ActionTypes.storeAttributeSetAttributes;
  constructor(public payload: any) { }
}

export class PostAttributeSet implements Action {
  readonly type = ActionTypes.postAttributeSet;
  constructor(public payload: object) { }
}

export class PostAttributeSetRel implements Action {
  readonly type = ActionTypes.postAttributeSetRel;
  constructor(public id: number, public attribute_id: number, public groupId?: number) { }
}

export class ResetGetByIdProductAttributeValue implements Action {
  readonly type = ActionTypes.resetGetByIdProductAttributeValue;
}

export class UpdateCategoryImage implements Action {
  readonly type = ActionTypes.updateCategoryImage;
  constructor(public payload: any) { }
}

export class UpdateAttributeSetRel implements Action {
  readonly type = ActionTypes.updateAttributeSetRel;
  constructor(
    public id: number,
    public payload: object,
    public setId?: number
  ) { }
}

export class DeleteAttributeSet implements Action {
  readonly type = ActionTypes.deleteAttributeSet;
  constructor(public id: number, public parentID: number) { }
}

export class DeleteAttributesOnAttributeSet implements Action {
  readonly type = ActionTypes.deleteAttributesOnAttributeSet;
  constructor(
    public id: number,
    public position: number,
    public parentId: number,
    public groupId: number
  ) { }
}

export class StoreAttributeSetById implements Action {
  readonly type = ActionTypes.storeAttributeSetById;
  constructor(public payload: object) { }
}

export class UpdateAttributeSet implements Action {
  readonly type = ActionTypes.updateAttributeSet;
  constructor(public payload: object, public id: number) { }
}

export class GetParentCategory implements Action {
  readonly type = ActionTypes.getParentCategories;
  constructor(public posType: any = '') { }
}
export class StoreParentCategory implements Action {
  readonly type = ActionTypes.storeParentCategories;
  constructor(public payload: object) { }
}
export class GetCommission implements Action {
  readonly type = ActionTypes.getCommissions;
}
export class StoreCommission implements Action {
  readonly type = ActionTypes.storeCommissions;
  constructor(public payload: object) { }
}
export class StorePostCommission implements Action {
  readonly type = ActionTypes.storePostCommissions;
  constructor(public payload: any) { }
}

export class GetCommsionGroupDetails implements Action {
  readonly type = ActionTypes.getCommissionGroupDetails;
  constructor(public payload: any) { }
}

export class StoreCommissionGroupDetails implements Action {
  readonly type = ActionTypes.storeCommissionGroupDetails;
  constructor(public payload: any) { }
}
export class DeleteCategoryCommision implements Action {
  readonly type = ActionTypes.deleteCategoryCommision;
  constructor(public id: number) { }
}
export class GetStoreProductList implements Action {
  readonly type = ActionTypes.getStoreProductList;
  constructor(public payload: any) {
    payload.type = payload.type || 'initial';
    payload.via = payload.via || 'list';
  }
}
export class StoreStoreProductList implements Action {
  readonly type = ActionTypes.storeStoreProductList;
  constructor(public payload: any) {
  }
}
export class GetStoreCategoryProductList implements Action {
  readonly type = ActionTypes.getStoreCategoryProductList;
  constructor(public payload: any) { }
}
export class StoreStoreCategoryProductList implements Action {
  readonly type = ActionTypes.storeStoreCategoryProductList;
  constructor(public payload: any) { }
}

export class GetStorePrivateCategory implements Action {
  readonly type = ActionTypes.getStorePrivateCategory;
  constructor(public payload: any, public pageNo: number) { }
}
export class StoreStorePrivateCategory implements Action {
  readonly type = ActionTypes.storeStorePrivateCategory;
  constructor(public payload: any) { }
}
export class ApprovePrivateRequestCategory implements Action {
  readonly type = ActionTypes.approvePrivateRequestCategory;
  constructor(public payload: any) { }
}

export class GetCategoryKeywordsRequest implements Action {
  readonly type = ActionTypes.getCategoryKeywordsRequest;
  constructor(public payload: String, public pageNo: number) { }
}
export class StoreCategoryKeywordsRequest implements Action {
  readonly type = ActionTypes.storeCategoryKeywordsRequest;
  constructor(public payload: any) { }
}
export class ApproveCategoryKeywordsRequest implements Action {
  readonly type = ActionTypes.approveCategoryKeywordsRequest;
  constructor(public payload: any) { }
}
export class GetPrivateAndMasterCategories implements Action {
  readonly type = ActionTypes.getPrivateAndMasterCategories;
}
export class StorePrivateAndMasterCategories implements Action {
  readonly type = ActionTypes.storePrivateAndMasterCategories;
  constructor(public payload: any) { }
}
export class GetStoreQuickLinksRequests implements Action {
  readonly type = ActionTypes.getStoreQuickLinksRequests;
  constructor(public payload: String, public pageNo: number) { }
}
export class StoreStoreQuickLinksRequests implements Action {
  readonly type = ActionTypes.storeStoreQuickLinksRequests;
  constructor(public payload: any) { }
}
export class ApproveStoreQuickLinksRequest implements Action {
  readonly type = ActionTypes.approveStoreQuickLinksRequest;
  constructor(public payload: any) { }
}

// Reset All Store

export class ResetAllStore implements Action {
  readonly type = ActionTypes.RESET_STATE;
}

export class GetStoreRelatedMasterCategories implements Action {
  readonly type = ActionTypes.getStoreRelatedMasterCategories;
}
export class StoreStoreRelatedMasterCategories implements Action {
  readonly type = ActionTypes.storeStoreRelatedMasterCategories;
  constructor(public payload: any) { }
}


export type categoryActions =
  | StoreCategory
  | StoreCategoriesElastic
  | StoreCategoriesElasticGlobal
  | StoreAllCategory
  | StorePendingCategory
  | StoreCategoryDetailsRequest
  | StoreStorePrivateCategory
  | ApprovePrivateRequestCategory
  | StoreCategoryKeywordsRequest
  | ApproveCategoryKeywordsRequest
  | StorePrivateAndMasterCategories
  | StoreStoreQuickLinksRequests
  | ApproveStoreQuickLinksRequest
  | StoreStoreRelatedMasterCategories
  ;

export type productAttributeActions =
  | StoreProductAttribute
  | StoreAttributeGroupName
  | StoreAttributeGroupNameById
  | StoreAttributeSet
  | StoreGetByIdAttributeGroupName
  | StoreGetByIdProductAttribute
  | StoreAttributeSetAttributes
  | StoreAttributeSetById
  | StoreAttributesByGroupId
  | StoreGetByIdProductAttributeValue
  | StoreViewProductAttribute
  | StoreAttributePositions
  | DeleteCategoryCommision
  | ResetGetByIdProductAttributeValue;
export type parentCategoryActions = StoreParentCategory;
export type commissionActions = StoreCommission | StoreCommissionGroupDetails;
export type postCommissionActions = StorePostCommission;
export type storeManagementActions =
  | StoreCountries
  | StoreByIdCountries
  | StoreFulfillmentCenter
  | StoreZone
  | StoreZoneCount
  | StoreZipCode
  | StoreFulfillmentCenterById
  | StoreZoneByFulfillmentCenterId
  | StoreDeliveryCenter
  | StoreDeliveryCenterById
  | StoreZipcodeByDeliveryCenterId
  | StorePaymentMethod
  | StorePaymentMethodById
  | StoreRegionById
  | StoreLogisticPartner
  | StoreLogisticPartnerById
  | StoreAppVersion
  | StoreAppVersionById
  | StoreStaticPageManagement
  | StoreStaticPageManagementById
  | StoreZoneById
  | StoreByIdZipCode
  | StoreZoneByZip
  | StoreZipZoneUser
  | StoreZipZoneUserById
  | StoreUserGroup
  | StoreUserByZoneId
  | StoreDuplicateZipCode
  | ResetDuplicateZipCode
  | StoreSellerCurrentOrders
  | StoreSellerPastOrders

  ;


export type StoreProductListManagementActions =
  | StoreStoreProductList
  | StoreStoreCategoryProductList

  ;
