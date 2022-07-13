import { Action } from '@ngrx/store';

export enum ActionTypes {
  dispatchBulkActions = '[Merchant Management] Dispatch Bulk Actions',
  getCommissionType = '[Merchant Management] Get Commission Type',
  getMerchantGroup = '[Merchant Management] Get Merchant Group',
  getBusinessCategory = '[Merchant Management] Get Business Category',
  getRegionsList = '[Merchant Management] Get Regions List',
  getPaymentMethods = '[Merchant Management] Get Payment Methods',
  getFullfillmentMode = '[Merchant Management] Get Fullfillment Mode',
  storeCommissionType = '[Merchant Management] Store Commission Type',
  storeMerchantGroup = '[Merchant Management] Store Merchant Group',
  storeBusinessCategory = '[Merchant Management] Store Business Category',
  storeRegionsList = '[Merchant Management] Store Regions List',
  storePaymentMethods = '[Merchant Management] Store Payment Methods',
  storeFullfillmentMode = '[Merchant Management] Store Fullfillment Mode',
  postAddNewMerchant = '[Merchant Management] Post New Merchant',
  updateMerchantDetails = '[Merchant Management] Update Merchant Details',
  getAllActiveMerchants = '[Merchant Management] Get All Active Merchants',
  storeAllActiveMerchants = '[Merchant Management] Store All Active Merchants',
  getAllPendingMerchants = '[Merchant Management] Get All Pending Merchants',
  storeAllPendingMerchants = '[Merchant Management] Store All Pending Merchants',
  getAllInactiveMerchants = '[Merchant Management] Get All Inactive Merchants',
  storeAllInactiveMerchants = '[Merchant Management] Store All Inactive Merchants',
  getActiveMerchantDetails = '[Merchant Management] getActiveMerchantDetails',
  storeActiveMerchantDetails = '[Merchant Management] storeActiveMerchantDetails',
  getStoreDetailsByMerchant = '[Merchant Management] Get Store Details By Merchant Id [Edit STore Details]',
  addNewStoreDetailsByMerchant = '[Merchant Management Post New Store By a Merchant] [Edit Store Details]',
  updateStoreDetailsByMerchant = '[Merhchant Management] Update Existing Store By A Merchant [Edit Store Details]',
  addStoreAddressByStoreMerchant = '[Merchant Management] Add Store Address Details By Store Id [Edit Store Details]',
  updateStoreAddressByStoreMerchant = '[Merchant Management] Update Store Address Details By Store Id [Edit Store Details]',
  storeStoreDetailsByMerchant = '[Merchant Management]  Store Store Details By Merchant Id [Edit STore Details]',
  storeStoreAddressDetailsByStoreMerchant = '[Merchant Management]  Store Store Address Details By Store-Merchant Id [Edit STore Details]',
  approveRejectSellerRequest = '[Merchant Management] Approve or Reject Seller Request [Pending Merchant]',
  getRegionByCountryId = '[Merchant Management] getRegionByCountryId',
  storeRegionByCountryId = '[Merchant Management] storeRegionByCountryId',
  getAllInterestedMerchant = '[Merchant Management] getAllInterestedMerchant',
  storeAllInterestedMerchant = '[Merchant Management] storeAllInterestedMerchant',
  updateMerchantStatus = '[Merchant Management] update Active Merchant Status',
  UpdateInActiveMerchantStatus = '[Merchant Management] update InActive Merchant Status',
  getAllMerchants = '[Merchant Management] Get All Merchants',
  getAllMerchantsElastic = '[Merchant Management] Get All Merchants Elastic',
  getMerchantsListNew =  '[Merchant List New] Get Merchants List New',
  getSearchMerchants = '[Merchant Management] Get Search Merchants',
  storeAllMerchants = '[Merchants Management] Store All Merchants',
  storeMerchantsListNew =  '[Merchants List] Store Merchants List',
  storeAllMerchantsElastic = '[Merchants Management] Store All Merchants Elastic',
  storeSearchMerchants = '[Merchants Management] Store Search Merchants',
  getMerchantForEdit = '[Merchant Management] Get Merchant For Edit',
  storeMerchantDetail = '[Merchant Management] Get Merchant Details',
  getAllDeliveryRequestedMerchants = '[Merchant Management] Get All Delivery Requested Merchant',
  storeDeliveryRequestedMerchants = '[Merchant Management] Store All Delivery Requested Merchant',
  enableStoreDelivery = '[Merchant Management] Enable Store Delivery',
  manageMerchantDraft = '[Merchant Management] Manage Merchant Draft',
  storeMerchantDraft = '[Merchant Management] Store Merchant Draft',
  storeRequestApprove = '[Merchant Management] Store Request Approve',
  getStoreDraftRequest = '[Merchant Management] Get Store Draft Request',
  storeStoreDraftRequest = '[Merchant Management] Store Store Draft Request',
  getStoreApprovalList = '[Merchant Management] Get Store Approval List',
  storeStoreApprovalList = '[Merchant Management] Store Store Approval List',
  getStoreAssign = '[Merchant Management] Get Store Assign',
  storeStoreAssign = '[Merchant Management] Store Store Assign',
  storeBulkOperation = '[Merchant Management] Store Approve Reject Bulk Operation',
  storeApproveReject = '[Merchant Management] Store Apprive Reject',
  getStoreProfileAction = '[Merchant Management] getStoreProfileAction',
  storeStoreProfileAction = '[Merchant Management] storeStoreProfileAction',
  updateStoreBasicDetails = '[Merchant Management] updateStoreBasicDetails',
  updateStoreOperationDetails = '[Merchant Management] updateStoreOperationDetails',
  updateStoreComplianceDetails = '[Merchant Management] updateStoreComplianceDetails',
  updateStoreDeliverySettings = '[Merchant Management] updateStoreDeliverySettings',
  reflectstoreProfiledetailsAfterUpdate = '[Merchant Management] reflectstoreProfiledetailsAfterUpdate',
  getStoreProductDetails = '[Merchant Management] getStoreProductDetails',
  storeStoreProductDetails = '[Merchant Management] storeStoreProductDetails',
  getProductCategory = '[Merchant Management] getProductCategory',
  storeProductCategory = '[Merchant Management] storeProductCategory',
  getProductList = '[Merchant Management] getProductList',
  storeProductList = '[Merchant Management] storeProductList',
  getStoreComplianceDetails = '[Merchant Management] getStoreComplianceDetails',
  storeStoreComplianceDetails = '[Merchant Management] storeStoreComplianceDetails',
  getStoreProductDetailsById = '[Merchant Management] getStoreProductDetailsById',
  storeStoreProductDetailsById = '[Merchant Management] storeStoreProductDetailsById',
  updateStoreProductActiveState = '[Merchant Management] updateStoreProductActiveState',
  storeUpdateStoreProductActiveState = '[Merchant Management] storeUpdateStoreProductActiveState',
  getProductCategoriesByStoreId = '[Merchant Management] getProductCategoriesByStoreId',
  storeProductCategoriesByStoreId = '[Merchant Management] storeProductCategoriesByStoreId',
  getAllDeliveryRequest = '[Merchant Management] Get All Delivery Request',
  getStoreKeywords = '[Merchant Management] Get Store Keywords',
  storeStoreKeywords = '[Merchant Management] Store Store Keywords',
  getStoreImages = '[Merchant Management] Get Store Images',
  storeStoreImages = '[Merchant Management] Store Store Images',

  getStoreDeliverySettings = '[Merchant Management] Get Store Delivery Settings',
  updateNewStoreDeliverySettings = '[Merchant Management] Update new Store Delivery Settings',
  storeStoreDeliverySettings = '[Merchant Management] Store Store Delivery Settings',
  storeCategoryList = '[Merchant Management] Store category List',
  savestoreCategoryList = '[Merchant Management] Save store category List',
  storeAddCategory = '[Merchant Management] Store add category',
  storeAddCategorySuccess = '[Merchant Management] Store add category Success',
  deleteCategory = '[Merchant Management] Store delete category',
  deleteCategorySuccess = '[Merchant Management] Store delete category Success',
  editCategoryDeatils = '[Merchant Management] Edit category detials',
  editCategorySuccess = '[Merchant Management] Edit category Success',

  getStoreInfoDetails = '[getStoreInfoDetails] Get Store Info Details',
  storeStoreInfoDetails = '[storeStoreInfoDetails] Store Store Info Details',

  getStoreCategory = '[getStoreInfoDetails] GetStoreCategory',
  saveStoreCategory = '[saveStoreInfoDetails] GetStoreCategory',

  getStoreOpertaionDetails = '[getStoreOpertaionDetails] Get Store Operation Details',
  storeStoreOperationDetails = '[storeStoreOperationDetails] Store OPeration Details',
  postStoreInfoDetails = '[postStoreInfoDetails] Post Store Operation Details',
  updateStoreKeywords = '[updateStoreKeywords] Update Store Keywords',

  getManageStoreProperties = '[Merchant Management] Get Store Properties',
  updateManageStoreProperties = '[Merchant Management] Update Store Properties',
  storeManageStoreProperties = '[Merchant Management] Store Data Store Properties',

  postStoreOperationDetails = '[postStoreOperationDetails] Update Store Operations',
  getDeliveryBoys = '[getDeliveryBoys] Get Delivery Boys',
  storeDeliveryBoys = '[storeDeliveryBoys] store Delivery Boys',
  approveRrejectDeliveryBoys = '[approveRrejectDeliveryBoys] Approve Reject Delivery Boys',
  getDeliveryBoyDetails = '[getDekiveryBoyDetails] Get particular delivery boy details',
  storeDeliveryBoyDetails = '[storeDekiveryBoyDetails] Store particular delivery boy details',

  getDeliveryBoyLiceseTypes = '[Get Delivery Boy License Types] Get Delivery Boy License Types',
  storeDeliveryBoyLicenseTypes = '[storeDeliveryBoyLicenseTypes] Store delivery boy lisense types',

  approveRejectDriverDetails = '[Driver Details Approve and Reject] Update Driver Details Approve and Reject',

  getDeliveryBoysOrder = '[Delivery Boy Order] Get Delivery Boys Order',
  storeDeliveryBoysOrder = '[Delivery Boys Order] Store Delivery Boys Order',
  postStoreImages = '[postStoreImages] Post Store Images',
  postManageStoreProperties = '[postManageStoreProperties] Post Store Properties',
  getStoreQuickLinks = '[getStoreQuickLinks] Get Store Quick Links',
  storeStoreQuickLinks = '[storeStoreQuickLinks] Store Store Quick Links',
  getStoreBannerList = '[getStoreBannerList] Get Store Banner List',
  storeStoreBannerList = '[storeStoreBannerList] Store Store Banner List',

  getDeliveryBoyShifts = '[Delivery Boys Shifts] Get Delivery Boys Shifts',
  storeDeliveryBoyShifts = '[Delivery Boys Shifts] Store Delivery Boys Shifts',
  getComplianceTypeDetails = '[getComplianceTypeDetails] Get Complaince Type Details',
  storeComplianceTypeDetails = '[storeComplianceTypeDetails] Store Compliance Type Details',

  getDrivingLissuingState = '[getDrivingLissuingState] Get Driving issuing state',
  storeDrivingLissuingState = '[storeDrivingLissuingState] Store Deriving issuing state',

  getDeliveryBoyCommisions = '[Delivery Boys Commisions] Get Delivery Boys Commisions',
  storeDeliveryBoyCommisions = '[Delivery Boys Commisions] Store Delivery Boys Commisions',

  getDeliveryBoyOrderDetails = '[Delivery Boys Order Details] Get Delivery Boys Order Details',
  storeDeliveryBoyOrderDetails = '[Delivery Boys Order Details] Store Delivery Boys Order Details',
  getMasterQuickLinks = '[getMasterQuickLinks] Get Master Quick Links',
  storeMasterQuickLinks = '[storeMasterQuickLinks] Store Master Quick Links',
  tagStoreWithQuickLinks = '[tagStoreWithQuickLinks] Tag Store With Quick Link',
  postStoreBanner = '[postStoreBanner] Post Store Banner',
  getStoreBannerDetails = '[getStoreBannerDetails] Get Store Banner Details',
  storeStoreBannerDetails = '[storeStoreBannerDetails] Store Store Banner Details',
  updateStoreBanner = '[updateStoreBanner] Update Store Banner Details',
  getStoreComplianceList = '[getStoreComplianceList] Get Store Compliance List',
  storeStoreComplianceList = '[storeStoreComplianceList] Store Store Compliance List',
  getStoreProductsList = '[getStoreProductsList] Get Store Compliance List',
  storeStoreProductsList = '[storeStoreProductsList] Store Store Compliance List',
  updateDisplayLicenseNo = '[updateDisplayLicenseNo] updateDisplayLicenseNo Details',
  updateStoreProductDetails = '[updateStoreProductDetails] updateStoreProductDetails Details',
  registerMerchantFromAdmin = '[registerMerchantFromAdmin] registerMerchantFromAdmin Details',
  getStoreSpecificBulkList = '[getStoreSpecificBulkList] getStoreSpecificBulkList Details',

  storeBulkFileListImageProcess = '[getStoreSpecificBulkList] storeBulkFileListImageProcess',
  copyProductToOutlet = '[addStoreToMasterProduct] copyProductToOutlet',

  storeStoreSpecificBulkList = '[storeStoreSpecificBulkList] storeStoreSpecificBulkList Details',
  uploadStoreBulkFile = '[uploadStoreBulkFile] uploadStoreBulkFile Details',
  getRegisterMerchantBulkList = '[getRegisterMerchantBulkList] getRegisterMerchantBulkList Details',
  storeRegisterMerchantBulkList = '[storeRegisterMerchantBulkList] storeRegisterMerchantBulkList Details',
  addStoreToMasterProduct = '[addStoreToMasterProduct] addStoreToMasterProduct',
  addStoreCreditNote = '[addStoreCreditNote] addStoreCreditNote',
  getStorecategoryKeywords = '[getStorecategoryKeywords] getStorecategoryKeywords',
  storeStorecategoryKeywords = '[storeStorecategoryKeywords] storeStorecategoryKeywords',
  changeStoreProfileStatus = '[changeStoreProfileStatus] changeStoreProfileStatus',
  changeStoreLiveStatus = '[changeStoreLiveStatus] changeStoreLiveStatus',
  saveStoreRelatedKeywords = '[saveStoreRelatedKeywords] saveStoreRelatedKeywords',
  saveStoreAccountTaxes = '[saveStoreAccountTaxes] saveStoreAccountTaxes',
  getStoreCreditTransactionHistory = '[getStoreCreditTransactionHistory] getStoreCreditTransactionHistory',
  storeStoreCreditTransactionHistory = '[storeStoreCreditTransactionHistory] storeStoreCreditTransactionHistory',
  upgradeStoreSubscription = '[upgradeStoreSubscription] upgradeStoreSubscription',
  getStoreCreditRequiredForSubscription = '[getStoreCreditRequiredForSubscription] getStoreCreditRequiredForSubscription',
  storeStoreCreditRequiredForSubscription = '[storeStoreCreditRequiredForSubscription] storeStoreCreditRequiredForSubscription',
  getStoreListLayouts = '[getStoreListLayouts] getStoreListLayouts',
  storeStoreListLayouts = '[storeStoreListLayouts] storeStoreListLayouts',
  purchaseStoreLayout = '[purchaseStoreLayout] purchaseStoreLayout',
  getStoreDetailsLayouts = '[getStoreDetailsLayouts] getStoreDetailsLayouts',
  storeStoreDetailsLayouts = '[storeStoreDetailsLayouts] storeStoreDetailsLayouts',
  deleteStoreBanner = '[deleteStoreBanner] deleteStoreBanner',
  editStoreListLayout = '[editStoreListLayout] editStoreListLayout',
  switchStoreListLayoutAndPublish = '[switchStoreListLayoutAndPublish] switchStoreListLayoutAndPublish',
  switchStoreDeatilLayout = '[switchStoreDeatilLayout] switchStoreDeatilLayout',
  deleteStoreQuickLink = '[deleteStoreQuickLink] deleteStoreQuickLink',

  getStoreCountForDashboard = '[getStoreCountForDashboard] getStoreCountForDashboard',
  saveStoreCountForDashboard = '[saveStoreCountForDashboard] saveStoreCountForDashboard',
  getProductCountForDashboard = '[getProductCountForDashboard] getProductCountForDashboard',
  saveProductCountForDashboard = '[saveProductCountForDashboard] saveProductCountForDashboard',
  getOrderCountForDashboard = '[getOrderCountForDashboard] getOrderCountForDashboard',
  saveOrderCountForDashboard = '[saveOrderCountForDashboard] saveOrderCountForDashboard',
  getStoreCompletenessCount = '[getStoreCompletenessCount] getStoreCompletenessCount',
  saveStoreCompletenessCount = '[saveStoreCompletenessCount] saveStoreCompletenessCount',

  getCollectionBannerList = '[getCollectionBannerList] Get Collection Banner List',
  getCollectionBannerById = '[getCollectionBannerById] Get Collection Banner By Id',
  postCollectionBanner = '[postCollectionBanner] post collection banner',
  editCollectionBanner = '[editCollectionBanner] edit collection banner',

  storeCollectionBannerList = '[storeCollectionBannerList] store Collection Banner List',
  storeCollectionBannerById = '[storeCollectionBannerById] store Collection Banner By Id',

  deleteCollectionBanner = '[deleteCollectionBanner] delete Collection Banner',
  updateMerchantType = '[updateMerchantType]',
  elacticStoreDetailsSync = '[elacticStoreDetailsSync]',
  getMerchantInfoById = '[Merchant Management] getMerchantInfoById',
  storeMerchantInfoById = '[Merchant Management] storeMerchantInfoById',

  getStoreListByMerchantId = '[Merchant Management] getStoreListByMerchantId',
  storeStoreListByMerchantId = '[Merchant Management] storeStoreListByMerchantId',

  getHubListByMerchantId = '[Merchant Management] getHubListByMerchantId',
  storeHubListByMerchantId = '[Merchant Management] storeHubListByMerchantId',

  createStoreHub = '[Merchant Management] createStoreHub',
  getStoreHubByID = '[Merchant Management] getStoreHubByID',
  storeStoreHubByID = '[Merchant Management] storeStoreHubByID',
  updateStoreHub = '[Merchant Management] updateStoreHub',
  updateMerchantInfo = '[Merchant Management] updateMerchantInfo',

  getMerchantHubStoreUserList = '[Merchant Management] getMerchantHubStoreUserList',
  storeMerchantHubStoreUserList = '[Merchant Management] storeMerchantHubStoreUserList',

  resetStoreUserPassword = '[Merchant Management] resetStoreUserPassword',

  getUserDetailsById = '[Merchant Management] getUserDetailsById',
  storeUserDetailsById = '[Merchant Management] storeUserDetailsById',
  getUpdateMerchantHubUserDetails = '[Merchant Management] getUpdateMerchantHubUserDetails',
  saveUpdateMerchantHubUserDetails = '[Merchant Management] saveUpdateMerchantHubUserDetails',

  updateMobileEmailofStore = '[Merchant Management] updateMobileEmailofStore',

  createMerchantHubStoreUser = '[Merchant Management] createMerchantHubStoreUser',

  getStoresByMerchantId = '[Merchant Management] getStoresByMerchantId',
  storeStoresByMerchantId = '[Merchant Management] storeStoresByMerchantId',
  getStoreURl = '[Merchant Management] getStoreUrlById',
  saveStoreURl = '[Merchant Management] saveStoreUrlById',
  createStoreURl = '[Merchant Management] createStoreUrlById',
  saveCreatedStoreURl = '[Merchant Management] saveCreatedStoreUrlById',
  updateStoreUrl = '[Merchant Management] updateStoreUrlById',
  saveUpdatesStoreUrl = '[Merchant Management] saveupdatedStoreUrlById',
  getStoreDeliveryPartner = '[Merchant Management] getStoreDeliveryPartner',
  saveStoreDeliveryPartner = '[Merchant Management] saveStoreDeliveryPartner',
  createStoreDeliverPartner = '[Merchant Management] createStoreDeliverPartner',
  addedStoreDeliveryPartner = '[Merchant Management] addedStoreDeliveryPartner',
  deleteDeliveryPatner = '[Merchant Management] deleteDeliveryPatner',
  updateDeliveryPartner = '[Merchant Management] updateDeliveryPartner',
  changeMerchantSubsOtp = '[Merchant Management] changeMerchantSubsOtp',
  merchantSubsUpdateByOtp = '[Merchant Management] merchantSubsUpdateByOtp',
  getDeliverCompanyList = '[Merchant Management] getDeliverCompanyList',
  saveDeliveryCompanyList = '[Merchant Management] saveDeliveryCompanyList',
  updateMerchantToggleStatus = '[Merchant Management] updateMerchantToggleStatus',
  merchantAllowOnlinePayment = '[Merchant Management] merchantAllowOnlinePayment',

  verifyBankAccount = '[Merchant Management] verifyBankAccount',
  verifyPanNo = '[Merchant Management] verifyPanNo',
  verifyGstn = '[Merchant Management] verifyGstn',
  storeVerifyGstn = '[Merchant Management] storeVerifyGstn',
}

export class VerifyGstn implements Action {
  readonly type = ActionTypes.verifyGstn;
  constructor(public payload: any) { }
}
export class StoreVerifyGstn implements Action {
  readonly type = ActionTypes.storeVerifyGstn;
  constructor(public payload: any) {}
}

export class VerifyBankAccount implements Action {
  readonly type = ActionTypes.verifyBankAccount;
  constructor(public payload: any) { }
}

export class VerifyPanNo implements Action {
  readonly type = ActionTypes.verifyPanNo;
  constructor(public payload: any) { }
}

export class GetStoresByMerchantId implements Action {
  readonly type = ActionTypes.getStoresByMerchantId;
  constructor(public payload: any) {}
}
export class StoreStoresByMerchantId implements Action {
  readonly type = ActionTypes.storeStoresByMerchantId;
  constructor(public payload: any) { }
}

export class CreateMerchantHubStoreUser implements Action {
  readonly type = ActionTypes.createMerchantHubStoreUser;
  constructor(public payload: any) { }
}

export class GetMerchantHubStoreUserList implements Action {
  readonly type = ActionTypes.getMerchantHubStoreUserList;
  constructor(public payload: any) {}
}
export class StoreMerchantHubStoreUserList implements Action {
  readonly type = ActionTypes.storeMerchantHubStoreUserList;
  constructor(public payload: any) { }
}
export class ResetStoreUserPassword implements Action {
  readonly type = ActionTypes.resetStoreUserPassword;
  constructor(public payload: any) { }
}

export class GetUserDetailsById implements Action {
  readonly type = ActionTypes.getUserDetailsById;
  constructor(public payload: any) {}
}
export class StoreUserDetailsById implements Action {
  readonly type = ActionTypes.storeUserDetailsById;
  constructor(public payload: any) { }
}
export class GetUpdateMerchantHubUserDetails implements Action {
  readonly type = ActionTypes.getUpdateMerchantHubUserDetails;
  constructor(public payload: any) {}
}
export class SaveUpdateMerchantHubUserDetails implements Action {
  readonly type = ActionTypes.saveUpdateMerchantHubUserDetails;
  constructor(public payload: any) {}
}

export class UpdateMobileEmailofStore implements Action {
  readonly type = ActionTypes.updateMobileEmailofStore;
  constructor(public payload: any) {}
} // new

export class UpdateStoreHub implements Action {
  readonly type = ActionTypes.updateStoreHub;
  constructor(public payload: any) { }
}
export class GetStoreHubByID implements Action {
  readonly type = ActionTypes.getStoreHubByID;
  constructor(public payload: any) {}
}
export class StoreStoreHubByID implements Action {
  readonly type = ActionTypes.storeStoreHubByID;
  constructor(public payload: any) { }
}

export class UpdateMerchantInfo implements Action {
  readonly type = ActionTypes.updateMerchantInfo;
  constructor(public payload: any) { }
}
export class GetHubListByMerchantId implements Action {
  readonly type = ActionTypes.getHubListByMerchantId;
  constructor(public payload: any) {}
}
export class StoreHubListByMerchantId implements Action {
  readonly type = ActionTypes.storeHubListByMerchantId;
  constructor(public payload: any) { }
}

export class CreateStoreHub implements Action {
  readonly type = ActionTypes.createStoreHub;
  constructor(public payload: any) { }
}

export class GetStoreListByMerchantId implements Action {
  readonly type = ActionTypes.getStoreListByMerchantId;
  constructor(public payload: any) {}
}
export class StoreStoreListByMerchantId implements Action {
  readonly type = ActionTypes.storeStoreListByMerchantId;
  constructor(public payload: any) { }
}

export class GetMerchantInfoById implements Action {
  readonly type = ActionTypes.getMerchantInfoById;
  constructor(public payload: any) {}
}
export class StoreMerchantInfoById implements Action {
  readonly type = ActionTypes.storeMerchantInfoById;
  constructor(public payload: any) { }
}

export class GetCollectionBannerList implements Action {
  readonly type = ActionTypes.getCollectionBannerList;
}
export class GetCollectionBannerById implements Action {
  readonly type = ActionTypes.getCollectionBannerById;
  constructor(public payload: any) {}
}
export class PostCollectionBanner implements Action {
  readonly type = ActionTypes.postCollectionBanner;
  constructor(public payload: any) {}
}
export class EditCollectionBanner implements Action {
  readonly type = ActionTypes.editCollectionBanner;
  constructor(public payload: any) { }
}
export class StoreCollectionBannerList implements Action {
  readonly type = ActionTypes.storeCollectionBannerList;
  constructor(public payload: any) { }
}
export class StoreCollectionBannerById implements Action {
  readonly type = ActionTypes.storeCollectionBannerById;
  constructor(public payload: any) { }
}

export class GetDrivingLissuingState implements Action {
  readonly type = ActionTypes.getDrivingLissuingState;
}
export class StoreDrivingLissuingState implements Action {
  readonly type = ActionTypes.storeDrivingLissuingState;
  constructor(public payload: any) { }
}
export class GetDeliveryBoyLiceseTypes implements Action {
  readonly type = ActionTypes.getDeliveryBoyLiceseTypes;
}

export class StoreDeliveryBoyLicenseTypes implements Action {
  readonly type = ActionTypes.storeDeliveryBoyLicenseTypes;
  constructor(public payload: any) { }
}

export class GetDeliveryBoysOrder implements Action {
  readonly type = ActionTypes.getDeliveryBoysOrder;
  constructor(public payload: any) { }
}
export class StoreDeliveryBoysOrder implements Action {
  readonly type = ActionTypes.storeDeliveryBoysOrder;
  constructor(public payload: any) { }

}

export class ApproveRejectDriverDetails implements Action {
  readonly type = ActionTypes.approveRejectDriverDetails;
  constructor(public payload: any, public id: any) { }
}
export class UpdateManageStoreProperties implements Action {
  readonly type = ActionTypes.updateManageStoreProperties;
  constructor(public payload: any, public id: number) { }
}

export class GetManageStoreProperties implements Action {
  readonly type = ActionTypes.getManageStoreProperties;
  constructor(public id: any) { }

}
export class StoreManageStoreProperties implements Action {
  readonly type = ActionTypes.storeManageStoreProperties;
  constructor(public payload: any) { }

}
export class PostManageStoreProperties implements Action {
  readonly type = ActionTypes.postManageStoreProperties;
  constructor(public payload: any) {
    console.log(payload)
  }

}

export class UpdateMerchantStatus implements Action {
  readonly type = ActionTypes.updateMerchantStatus;
  constructor(public payload: any) { }
}
export class UpdateInActiveMerchantStatus implements Action {
  readonly type = ActionTypes.UpdateInActiveMerchantStatus;
  constructor(public payload: any) { }
}

export class GetAllInterestedMerchant implements Action {
  readonly type = ActionTypes.getAllInterestedMerchant;
}
export class StoreAllInterestedMerchant implements Action {
  readonly type = ActionTypes.storeAllInterestedMerchant;
  constructor(public payload: any) { }
}
export class DispatchBulkAction implements Action {
  readonly type = ActionTypes.dispatchBulkActions;
}
export class GetCommissionType implements Action {
  readonly type = ActionTypes.getCommissionType;
}
export class GetMerchantGroup implements Action {
  readonly type = ActionTypes.getMerchantGroup;
}
export class GetBusinessCategory implements Action {
  readonly type = ActionTypes.getBusinessCategory;
}
export class GetRegionsList implements Action {
  readonly type = ActionTypes.getRegionsList;
}
export class GetPaymentMethods implements Action {
  readonly type = ActionTypes.getPaymentMethods;
}
export class GetFullfillmentMode implements Action {
  readonly type = ActionTypes.getFullfillmentMode;
}
export class StoreCommissionType implements Action {
  readonly type = ActionTypes.storeCommissionType;
  constructor(public payload: any) { }
}
export class StoreMerchantGroup implements Action {
  readonly type = ActionTypes.storeMerchantGroup;
  constructor(public payload: any) { }
}
export class StoreBusinessCategory implements Action {
  readonly type = ActionTypes.storeBusinessCategory;
  constructor(public payload: any) { }
}

export class GetStoreUrl implements Action {
  readonly type = ActionTypes.getStoreURl;
  constructor( public payload: any ) { }
}
export class SaveStoreUrl implements Action {
  readonly type = ActionTypes.saveStoreURl;
  constructor(public payload: any) { }
}
export class CreateStoreUrl implements Action {
  readonly type = ActionTypes.createStoreURl;
  constructor( public payload: any ) { }
}
export class SaveCreatedStoreUrl implements Action {
  readonly type = ActionTypes.saveCreatedStoreURl;
  constructor(public payload: any) { }
}

export class UpdateStoreUrl implements Action {
  readonly type = ActionTypes.updateStoreUrl;
  constructor( public payload: any ) { }
}
export class SaveUpdatesStoreUrl implements Action {
  readonly type = ActionTypes.saveUpdatesStoreUrl;
  constructor(public payload: any) { }
}
export class GetStoreDeliveryPartner implements Action {
  readonly type = ActionTypes.getStoreDeliveryPartner;
  constructor( public payload: any ) { }
}
export class SaveStoreDeliveryPartner implements Action {
  readonly type = ActionTypes.saveStoreDeliveryPartner;
  constructor(public payload: any) { }
}
export class CreateStoreDeliveryPartner implements Action {
  readonly type = ActionTypes.createStoreDeliverPartner;
  constructor( public payload: any ) { }
}
export class AddedStoreDeliveryPartner implements Action {
  readonly type = ActionTypes.addedStoreDeliveryPartner;
  constructor(public payload: any) { }
}
export class DeleteDeliveryPartner implements Action {
  readonly type = ActionTypes.deleteDeliveryPatner;
  constructor( public payload: any ) { }
}
export class GetDeliverCompanyList implements Action {
  readonly type = ActionTypes.getDeliverCompanyList;
  constructor( public payload: any ) { }
}
export class SaveDeliveryCompanyList implements Action {
  readonly type = ActionTypes.saveDeliveryCompanyList;
  constructor( public payload: any ) { }
}

export class UpdateDeliveryPartner implements Action {
  readonly type = ActionTypes.updateDeliveryPartner;
  constructor( public payload: any ) { }
}
export class ChangeMerchantSubsOtp implements Action {
  readonly type = ActionTypes.changeMerchantSubsOtp;
  constructor( public payload: any ) { }
}
export class MerchantSubsUpdateByOtp implements Action {
  readonly type = ActionTypes.merchantSubsUpdateByOtp;
  constructor( public payload: any ) { }
}
export class UpdateMerchantToggleStatus implements Action {
  readonly type = ActionTypes.updateMerchantToggleStatus;
  constructor( public payload: any ) { }
}
export class MerchantAllowOnlinePayment implements Action {
  readonly type = ActionTypes.merchantAllowOnlinePayment;
  constructor( public payload: any ) { }
}
// ** for store url

export class StoreRegionsList implements Action {
  readonly type = ActionTypes.storeRegionsList;
  constructor(public payload: any) { }
}
export class StorePaymentMethods implements Action {
  readonly type = ActionTypes.storePaymentMethods;
  constructor(public payload: any) { }
}
export class StoreFullfillmentMode implements Action {
  readonly type = ActionTypes.storeFullfillmentMode;
  constructor(public payload: any) { }
}
export class PostAddNewMerchant implements Action {
  readonly type = ActionTypes.postAddNewMerchant;
  constructor(public payload: any) { }
}
export class UpdateMerchantDetails implements Action {
  readonly type = ActionTypes.updateMerchantDetails;
  constructor(public payload: any) { }
}
export class UpdateMerchantType implements Action {
  readonly type = ActionTypes.updateMerchantType;
  constructor(public payload: any) { }
}
export class ElacticStoreDetailsSync implements Action {
  readonly type = ActionTypes.elacticStoreDetailsSync;
  constructor(public payload: any) { }
}

export class GetAllActiveMerchants implements Action {
  readonly type = ActionTypes.getAllActiveMerchants;
}
export class StoreAllActiveMerchants implements Action {
  readonly type = ActionTypes.storeAllActiveMerchants;
  constructor(public payload: any) { }
}
export class GetAllPendingMerchants implements Action {
  readonly type = ActionTypes.getAllPendingMerchants;
}
export class StoreAllPendingMerchants implements Action {
  readonly type = ActionTypes.storeAllPendingMerchants;
  constructor(public payload: any) { }
}
export class GetAllInactiveMerchants implements Action {
  readonly type = ActionTypes.getAllInactiveMerchants;
}
export class StoreAllInactiveMerchants implements Action {
  readonly type = ActionTypes.storeAllInactiveMerchants;
  constructor(public payload: any) { }
}
export class GetActiveMerchantDetails implements Action {
  readonly type = ActionTypes.getActiveMerchantDetails;
  constructor(public payload: any) { }
}
export class StoreActiveMerchantDetails implements Action {
  readonly type = ActionTypes.storeActiveMerchantDetails;
  constructor(public payload: any) { }
}
export class GetStoreDetailsByMerchant implements Action {
  readonly type = ActionTypes.getStoreDetailsByMerchant;
  constructor(public payload: any) { }
}
export class AddStoreDetailsByMerchant implements Action {
  readonly type = ActionTypes.addNewStoreDetailsByMerchant;
  constructor(public payload: any) { }
}
export class UpdateStoreDetailsByMerchant implements Action {
  readonly type = ActionTypes.updateStoreDetailsByMerchant;
  constructor(public payload: any) { }
}
export class AddStoreAddressByStoreMerchant implements Action {
  readonly type = ActionTypes.addStoreAddressByStoreMerchant;
  constructor(public payload: any) { }
}
export class UpdateStoreAddressByStoreMerchant implements Action {
  readonly type = ActionTypes.updateStoreAddressByStoreMerchant;
  constructor(public payload: any) { }
}
export class StoreStoreDetailsByMerchant implements Action {
  readonly type = ActionTypes.storeStoreDetailsByMerchant;
  constructor(public payload: any) { }
}
export class StoreStoreAddressByStoreMerchant implements Action {
  readonly type = ActionTypes.storeStoreAddressDetailsByStoreMerchant;
  constructor(public payload: any) { }
}
export class ApproveRejectSellerRequest implements Action {
  readonly type = ActionTypes.approveRejectSellerRequest;
  constructor(public payload: any) { }
}
export class GetRegionByCountryId implements Action {
  readonly type = ActionTypes.getRegionByCountryId;
  constructor(public payload: object) { }
}
export class StoreRegionByCountryId implements Action {
  readonly type = ActionTypes.storeRegionByCountryId;
  constructor(public payload: object) { }
}

export class GetAllMerchants implements Action {
  readonly type = ActionTypes.getAllMerchants;
  constructor(public payload: any) { }
}
export class GetAllMerchantsElastic implements Action {
  readonly type = ActionTypes.getAllMerchantsElastic;
  constructor(public payload: any) { }
}

export class GetMerchantsListNew implements Action {
  readonly type = ActionTypes.getMerchantsListNew;
  constructor(public payload: any) { }
}

export class GetSearchMerchants implements Action {
  readonly type = ActionTypes.getSearchMerchants;
  constructor(public payload: any) { }
}

export class StoreAllMerchants implements Action {
  readonly type = ActionTypes.storeAllMerchants;
  constructor(public payload: any) { }
}
export class StoreAllMerchantsElastic implements Action {
  readonly type = ActionTypes.storeAllMerchantsElastic;
  constructor(public payload: any) { }
}
export class StoreMerchantsListNew implements Action {
  readonly type = ActionTypes.storeMerchantsListNew;
  constructor(public payload: any) { }
}

export class StoreSearchMerchants implements Action {
  readonly type = ActionTypes.storeSearchMerchants;
  constructor(public payload: any) { }
}

export class GetMerchantForEdit implements Action {
  readonly type = ActionTypes.getMerchantForEdit;
  constructor(public payload: any) { }
}

export class StoreMerchantDetails implements Action {
  readonly type = ActionTypes.storeMerchantDetail;
  constructor(public payload: any) { }
}

export class GetAllDeliveryRequestedMerchants implements Action {
  readonly type = ActionTypes.getAllDeliveryRequestedMerchants;
  constructor(public payload: any) { }
}

export class StoreDeliveryRequestedMerchants implements Action {
  readonly type = ActionTypes.storeDeliveryRequestedMerchants;
  constructor(public payload: any) { }
}

export class EnableStoreDelivery implements Action {
  readonly type = ActionTypes.enableStoreDelivery;
  constructor(public payload: any) { }
}

export class ManageMerchantDraft implements Action {
  readonly type = ActionTypes.manageMerchantDraft;
  constructor(public payload: any) { }
}

export class StoreMerchantDraft implements Action {
  readonly type = ActionTypes.storeMerchantDraft;
  constructor(public payload: any) { }
}

export class StoreRequestApprove implements Action {
  readonly type = ActionTypes.storeRequestApprove;
  constructor(public payload: any) { }
}

export class GetStoreDraftRequest implements Action {
  readonly type = ActionTypes.getStoreDraftRequest;
}

export class StoreStoreDraftRequest implements Action {
  readonly type = ActionTypes.storeStoreDraftRequest;
  constructor(public payload: any) { }
}

export class GetStoreApprovalList implements Action {
  readonly type = ActionTypes.getStoreApprovalList;
  constructor(public payload: any) { }
}

export class StoreStoreApprovalList implements Action {
  readonly type = ActionTypes.storeStoreApprovalList;
  constructor(public payload: any) { }
}

export class GetStoreAssign implements Action {
  readonly type = ActionTypes.getStoreAssign;
}

export class StoreStoreAssign implements Action {
  readonly type = ActionTypes.storeStoreAssign;
  constructor(public payload: any) { }
}

export class StoreBulkOperation implements Action {
  readonly type = ActionTypes.storeBulkOperation;
  constructor(public payload: any) { }
}

export class StoreApproveReject implements Action {
  readonly type = ActionTypes.storeApproveReject;
  constructor(public payload: any, public originPage: boolean = true) { }
}
export class GetStoreProfileAction implements Action {
  readonly type = ActionTypes.getStoreProfileAction;
  constructor(public payload: any) { }
}
export class StoreStoreProfileAction implements Action {
  readonly type = ActionTypes.storeStoreProfileAction;
  constructor(public payload: any) { }
}
export class UpdateStoreBasicDetails implements Action {
  readonly type = ActionTypes.updateStoreBasicDetails;
  constructor(public payload: any) { }
}
export class UpdateStoreOperationDetails implements Action {
  readonly type = ActionTypes.updateStoreOperationDetails;
  constructor(public payload: any) { }
}
export class UpdateStoreComplianceDetails implements Action {
  readonly type = ActionTypes.updateStoreComplianceDetails;
  constructor(public payload: any) { }
}
export class UpdateStoreDeliverySettings implements Action {
  readonly type = ActionTypes.updateStoreDeliverySettings;
  constructor(public payload: any) { }
}

export class ReflectstoreProfiledetailsAfterUpdate implements Action {
  readonly type = ActionTypes.reflectstoreProfiledetailsAfterUpdate;
  constructor(public payload: any) { }
}

export class GetStoreProductDetails implements Action {
  readonly type = ActionTypes.getStoreProductDetails;
  constructor(public payload: any) { }
}

export class StoreStoreProductDetails implements Action {
  readonly type = ActionTypes.storeStoreProductDetails;
  constructor(public payload: any) { }
}

export class GetProductCategory implements Action {
  readonly type = ActionTypes.getProductCategory;
  constructor(public payload: any) { }
}

export class StoreProductCategory implements Action {
  readonly type = ActionTypes.storeProductCategory;
  constructor(public payload: any) { }
}

export class GetProductList implements Action {
  readonly type = ActionTypes.getProductList;
  constructor(public payload: any, public refresh: boolean) { }
}

export class StoreProductList implements Action {
  readonly type = ActionTypes.storeProductList;
  constructor(public payload: any, public refresh: boolean) { }
}
export class GetStoreComplianceDetails implements Action {
  readonly type = ActionTypes.getStoreComplianceDetails;
  constructor(public payload: any) { }
}

export class StoreStoreComplianceDetails implements Action {
  readonly type = ActionTypes.storeStoreComplianceDetails;
  constructor(public payload: any) { }
}

export class GetStoreProductDetailsById implements Action {
  readonly type = ActionTypes.getStoreProductDetailsById;
  constructor(public payload: any) { }
}
export class StoreStoreProductDetailsById implements Action {
  readonly type = ActionTypes.storeStoreProductDetailsById;
  constructor(public payload: any) { }
}

export class GetProductCategoriesByStoreId implements Action {
  readonly type = ActionTypes.getProductCategoriesByStoreId;
  constructor(public storeId: any) {
  }
}
export class StoreProductCategoriesByStoreId implements Action {
  readonly type = ActionTypes.storeProductCategoriesByStoreId;
  constructor(public payload: any) { }
}
export class UpdateStoreProductActiveState implements Action {
  readonly type = ActionTypes.updateStoreProductActiveState;
  constructor(public payload: any) { }
}
export class StoreUpdateStoreProductActiveState implements Action {
  readonly type = ActionTypes.storeUpdateStoreProductActiveState;
  constructor(public payload: any) { }
}

export class GetAllDeliveryRequest implements Action {
  readonly type = ActionTypes.getAllDeliveryRequest;
  constructor(public payload: any) { }
}

export class GetStoreKeywords implements Action {
  readonly type = ActionTypes.getStoreKeywords;
  constructor(public storeId: number) { }
}

// export class StoreStoreKeywords implements Action {
//   readonly type = ActionTypes.storeStoreKeywords;
//   constructor(public payload: any) { }
// }
export class GetStoreInfoDetails implements Action {
  readonly type = ActionTypes.getStoreInfoDetails;
  constructor(public storeId: number) { }
}

export class StoreStoreInfoDetails implements Action {
  readonly type = ActionTypes.storeStoreInfoDetails;
  constructor(public payload: any) { }
}

export class GetStoreCategory implements Action {
  readonly type = ActionTypes.getStoreCategory;
  constructor( public payload: any ) { }
}
export class SaveStoreCategory implements Action {
  readonly type = ActionTypes.saveStoreCategory;
  constructor(public payload: any) { }
}

export class PostStoreInfoDetails implements Action {
  readonly type = ActionTypes.postStoreInfoDetails;
  constructor(public payload: any) { }
}

export class GetStoreImages implements Action {
  readonly type = ActionTypes.getStoreImages;
  constructor(public storeId: number) { }
}

export class StoreStoreImages implements Action {
  readonly type = ActionTypes.storeStoreImages;
  constructor(public payload: any) { }
}
export class PostStoreImages implements Action {
  readonly type = ActionTypes.postStoreImages;
  constructor(public payload: any) { }
}
export class GetStoreOperationDetails implements Action {
  readonly type = ActionTypes.getStoreOpertaionDetails;
  constructor(public storeId: number) { }
}

export class StoreStoreOperationDetails implements Action {
  readonly type = ActionTypes.storeStoreOperationDetails;
  constructor(public payload: any) { }
}
export class PostStoreOperationDetails implements Action {
  readonly type = ActionTypes.postStoreOperationDetails;
  constructor(public payload: any) { }
}

export class GetStoreDeliverySettings implements Action {
  readonly type = ActionTypes.getStoreDeliverySettings;
  constructor(public storeId: number) { }
}

export class UpdateNewStoreDeliverySettings implements Action {
  readonly type = ActionTypes.updateNewStoreDeliverySettings;
  constructor(public payload: any) { }
}
export class StoreStoreDeliverySettings implements Action {
  readonly type = ActionTypes.storeStoreDeliverySettings;
  constructor(public payload: any) { }
}

export class StoreCategoryList implements Action {
  readonly type = ActionTypes.storeCategoryList;
  constructor(public storeId: number ) { }
}
export class SaveStoreCategoryList implements Action {
  readonly type = ActionTypes.savestoreCategoryList;
  constructor(public payload: any) { }
} 
export class StoreAddCategory implements Action {
  readonly type = ActionTypes.storeAddCategory;
  constructor(public payload: any) { }
}
export class StoreAddCategorySuccess implements Action {
  readonly type = ActionTypes.storeAddCategorySuccess;
  constructor(public payload: any) { }
} 
export class DeleteCategory implements Action {
  readonly type = ActionTypes.deleteCategory;
  constructor(public payload: any) { }
}
export class DeleteCategorySuccess implements Action {
  readonly type = ActionTypes.deleteCategorySuccess;
  constructor(public payload: any) { }
}
export class EditCategoryDeatils implements Action {
  readonly type = ActionTypes.editCategoryDeatils;
  constructor(public payload: any) { }
}
export class EditCategorySuccess implements Action {
  readonly type = ActionTypes.editCategorySuccess;
  constructor(public payload: any) { }
} // ***

export class UpdateStoreKeywords implements Action {
  readonly type = ActionTypes.updateStoreKeywords;
  constructor(public payload: any) { }
}
export class GetDeliveryBoys implements Action {
  readonly type = ActionTypes.getDeliveryBoys;
  constructor(public payload: any) {
    // console.log("GET delivery boys Action:::::::::::", payload)
  }
}
export class StoreDeliveryBoys implements Action {
  readonly type = ActionTypes.storeDeliveryBoys;
  constructor(public payload: any) { }
}
export class ApproveRrejectDeliveryBoys implements Action {
  readonly type = ActionTypes.approveRrejectDeliveryBoys;
  constructor(public payload: any) { }
}
export class GetStoreQuickLinks implements Action {
  readonly type = ActionTypes.getStoreQuickLinks;
  constructor(public storeId: number) { }

}
export class StoreStoreQuickLinks implements Action {
  readonly type = ActionTypes.storeStoreQuickLinks;
  constructor(public payload: any) { }
}
export class GetStoreBannerList implements Action {
  readonly type = ActionTypes.getStoreBannerList;
  constructor(public payload: any) { }

}
export class StoreStoreBannerList implements Action {
  readonly type = ActionTypes.storeStoreBannerList;
  constructor(public payload: any) { }
}

export class GetDeliveryBoyDetails implements Action {
  readonly type = ActionTypes.getDeliveryBoyDetails;
  constructor(public payload: any) { }
}

export class StoreDeliveryBoyDetails implements Action {
  readonly type = ActionTypes.storeDeliveryBoyDetails;
  constructor(public payload: any) { }
}

export class GetDeliveryBoyShifts implements Action {
  readonly type = ActionTypes.getDeliveryBoyShifts;
  constructor(public payload: any) { }
}

export class StoreDeliveryBoyShifts implements Action {
  readonly type = ActionTypes.storeDeliveryBoyShifts;
  constructor(public payload: any) { }
}
export class GetComplianceTypeDetails implements Action {
  readonly type = ActionTypes.getComplianceTypeDetails;
  constructor(public businessCategoryId: any, public countryCode: any) { }
}

export class StoreComplianceTypeDetails implements Action {
  readonly type = ActionTypes.storeComplianceTypeDetails;
  constructor(public payload: any) { }
}

export class StoreStoreKeywords implements Action {
  readonly type = ActionTypes.storeStoreKeywords;
  constructor(public payload: any) {
  }
}


export class GetDeliveryBoyCommisions implements Action {
  readonly type = ActionTypes.getDeliveryBoyCommisions;
  constructor(public payload: any) {
  }
}

export class StoreDeliveryBoyCommisions implements Action {
  readonly type = ActionTypes.storeDeliveryBoyCommisions;
  constructor(public payload: any) { }
}

export class GetDeliveryBoyOrderDetails implements Action {
  readonly type = ActionTypes.getDeliveryBoyOrderDetails;
  constructor(public orderId: any) { }
}

export class StoreDeliveryBoyOrderDetails implements Action {
  readonly type = ActionTypes.storeDeliveryBoyOrderDetails;
  constructor(public payload: any) { }
}
export class GetMasterQuickLinks implements Action {
  readonly type = ActionTypes.getMasterQuickLinks;
  constructor(public storeId: number) { }

}
export class StoreMasterQuickLinks implements Action {
  readonly type = ActionTypes.storeMasterQuickLinks;
  constructor(public payload: any) { }
}
export class TagStoreWithQuickLinks implements Action {
  readonly type = ActionTypes.tagStoreWithQuickLinks;
  constructor(public payload: any) { }
}
export class PostStoreBanner implements Action {
  readonly type = ActionTypes.postStoreBanner;
  constructor(public payload: any) { }
}

export class GetStoreBannerDetails implements Action {
  readonly type = ActionTypes.getStoreBannerDetails;
  constructor(public bannerId: any) { }
}

export class StoreStoreBannerDetails implements Action {
  readonly type = ActionTypes.storeStoreBannerDetails;
  constructor(public payload: any) { }
}

export class UpdateStoreBanner implements Action {
  readonly type = ActionTypes.updateStoreBanner;
  constructor(public payload: any) { }
}


export class GetStoreComplianceList implements Action {
  readonly type = ActionTypes.getStoreComplianceList;
  constructor(public storeId: any) { }
}

export class StoreStoreComplianceList implements Action {
  readonly type = ActionTypes.storeStoreComplianceList;
  constructor(public payload: any) { }
}

export class GetStoreProductsList implements Action {
  readonly type = ActionTypes.getStoreProductsList;
  constructor(public storeId: any) { }
}

export class StoreStoreProductsList implements Action {
  readonly type = ActionTypes.storeStoreProductsList;
  constructor(public payload: any) { }
}


export class UpdateDisplayLicenseNo implements Action {
  readonly type = ActionTypes.updateDisplayLicenseNo;
  constructor(public payload: any) { }
}
export class UpdateStoreProductDetails implements Action {
  readonly type = ActionTypes.updateStoreProductDetails;
  constructor(public payload: any) { }
}
export class RegisterMerchantFromAdmin implements Action {
  readonly type = ActionTypes.registerMerchantFromAdmin;
  constructor(public payload: any) { }
}


export class GetStoreSpecificBulkList implements Action {
  readonly type = ActionTypes.getStoreSpecificBulkList;
  constructor(public storeId: any) { }
}
export class StoreBulkFileListImageProcess implements Action {
  readonly type = ActionTypes.storeBulkFileListImageProcess;
  constructor(public payload: any) { }
}

export class StoreStoreSpecificBulkList implements Action {
  readonly type = ActionTypes.storeStoreSpecificBulkList;
  constructor(public payload: any) { }
}
export class GetRegisterMerchantBulkList implements Action {
  readonly type = ActionTypes.getRegisterMerchantBulkList;

}

export class StoreRegisterMerchantBulkList implements Action {
  readonly type = ActionTypes.storeRegisterMerchantBulkList;
  constructor(public payload: any) { }
}

export class UploadStoreBulkFile implements Action {
  readonly type = ActionTypes.uploadStoreBulkFile;
  constructor(public payload: any) { }
}

export class AddStoreToMasterProduct implements Action {
  readonly type = ActionTypes.addStoreToMasterProduct;
  constructor(public payload: any) { }
}
export class CopyProductToOutlet implements Action {
  readonly type = ActionTypes.copyProductToOutlet;
  constructor(public payload: any) { }
}

export class AddStoreCreditNote implements Action {
  readonly type = ActionTypes.addStoreCreditNote;
  constructor(public payload: any) { }
}

export class GetStorecategoryKeywords implements Action {
  readonly type = ActionTypes.getStorecategoryKeywords;
  constructor(public payload: any) { }
}

export class StoreStorecategoryKeywords implements Action {
  readonly type = ActionTypes.storeStorecategoryKeywords;
  constructor(public payload: any) { }
}
export class ChangeStoreProfileStatus implements Action {
  readonly type = ActionTypes.changeStoreProfileStatus;
  constructor(public payload: any) { }
}

export class ChangeStoreLiveStatus implements Action {
  readonly type = ActionTypes.changeStoreLiveStatus;
  constructor(public payload: any) { }
}
export class SaveStoreRelatedKeywords implements Action {
  readonly type = ActionTypes.saveStoreRelatedKeywords;
  constructor(public payload: any) { }
}
export class SaveStoreAccountTaxes implements Action {
  readonly type = ActionTypes.saveStoreAccountTaxes;
  constructor(public payload: any) { }
}

export class GetStoreCreditTransactionHistory implements Action {
  readonly type = ActionTypes.getStoreCreditTransactionHistory;
  constructor(public storeId: number) { }
}

export class StoreStoreCreditTransactionHistory implements Action {
  readonly type = ActionTypes.storeStoreCreditTransactionHistory;
  constructor(public payload: any) { }
}

export class UpgradeStoreSubscription implements Action {
  readonly type = ActionTypes.upgradeStoreSubscription;
  constructor(public payload: any) { }
}

export class GetStoreCreditRequiredForSubscription implements Action {
  readonly type = ActionTypes.getStoreCreditRequiredForSubscription;
  constructor(public payload: any) { }
}

export class StoreStoreCreditRequiredForSubscription implements Action {
  readonly type = ActionTypes.storeStoreCreditRequiredForSubscription;
  constructor(public payload: any) { }
}

export class GetStoreListLayouts implements Action {
  readonly type = ActionTypes.getStoreListLayouts;
  constructor(public storeId: number) { }
}

export class StoreStoreListLayouts implements Action {
  readonly type = ActionTypes.storeStoreListLayouts;
  constructor(public payload: any) { }
}

export class PurchaseStoreLayout implements Action {
  readonly type = ActionTypes.purchaseStoreLayout;
  constructor(public payload: any) { }
}

export class GetStoreDetailsLayouts implements Action {
  readonly type = ActionTypes.getStoreDetailsLayouts;
  constructor(public storeId: number) { }
}

export class StoreStoreDetailsLayouts implements Action {
  readonly type = ActionTypes.storeStoreDetailsLayouts;
  constructor(public payload: any) { }
}

export class DeleteStoreBanner implements Action {
  readonly type = ActionTypes.deleteStoreBanner;
  constructor(public id: number) { }
}
export class DeleteCollectionBanner implements Action {
  readonly type = ActionTypes.deleteCollectionBanner;
  constructor(public id: number) { }
}
export class EditStoreListLayout implements Action {
  readonly type = ActionTypes.editStoreListLayout;
  constructor(public payload: any, public publishLayout: boolean = false) { }
}
export class SwitchStoreListLayoutAndPublish implements Action {
  readonly type = ActionTypes.switchStoreListLayoutAndPublish;
  constructor(public payload: any) { }
}
export class SwitchStoreDeatilLayout implements Action {
  readonly type = ActionTypes.switchStoreDeatilLayout;
  constructor(public payload: any) { }
}
export class DeleteStoreQuickLink implements Action {
  readonly type = ActionTypes.deleteStoreQuickLink;
  constructor(public payload: any) { }
}

export class GetStoreCountForDashboard implements Action {
  readonly type = ActionTypes.getStoreCountForDashboard;
}
export class SaveStoreCountForDashboard implements Action {
  readonly type = ActionTypes.saveStoreCountForDashboard;
  constructor(public payload: any) { }
}
export class GetProductCountForDashboard implements Action {
  readonly type = ActionTypes.getProductCountForDashboard;
}
export class SaveProductCountForDashboard implements Action {
  readonly type = ActionTypes.saveProductCountForDashboard;
  constructor(public payload: any) { }
}

export class GetOrderCountForDashboard implements Action {
  readonly type = ActionTypes.getOrderCountForDashboard;
}
export class SaveOrderCountForDashboard implements Action {
  readonly type = ActionTypes.saveOrderCountForDashboard;
  constructor(public payload: any) { }
}

export class GetStoreCompletenessCount implements Action {
  readonly type = ActionTypes.getStoreCompletenessCount;
}
export class SaveStoreCompletenessCount implements Action {
  readonly type = ActionTypes.saveStoreCompletenessCount;
  constructor(public payload: any) { }
}


export type MerchantMgmtReducerActions =
  StoreBusinessCategory | StoreCommissionType | StoreRegionsList | StoreMerchantGroup | StorePaymentMethods |
  StoreFullfillmentMode | StoreAllActiveMerchants | StoreActiveMerchantDetails | StoreStoreDetailsByMerchant |
  StoreStoreAddressByStoreMerchant | StoreAllPendingMerchants | StoreAllInactiveMerchants | StoreRegionByCountryId
  | StoreAllInterestedMerchant | StoreAllMerchants | StoreMerchantsListNew | StoreAllMerchantsElastic | StoreSearchMerchants | StoreMerchantDetails | StoreDeliveryRequestedMerchants | StoreMerchantDraft
  | StoreStoreDraftRequest | StoreStoreApprovalList | StoreStoreAssign | StoreStoreProfileAction | ReflectstoreProfiledetailsAfterUpdate
  | StoreStoreProductDetails | StoreProductCategory | StoreProductList | StoreStoreComplianceDetails | StoreStoreProductDetailsById
  | StoreUpdateStoreProductActiveState | StoreProductCategoriesByStoreId | StoreStoreKeywords | StoreStoreImages
  | StoreStoreInfoDetails | StoreStoreOperationDetails | StoreStoreDeliverySettings | StoreCategoryList | SaveStoreCategoryList 
  | StoreAddCategory | StoreAddCategorySuccess | DeleteCategory | DeleteCategorySuccess | EditCategoryDeatils | EditCategorySuccess
  | StoreManageStoreProperties | StoreDeliveryBoys
  | StoreDeliveryBoyDetails | StoreDeliveryBoysOrder | StoreStoreQuickLinks | StoreStoreBannerList
  | StoreDeliveryBoyShifts | StoreComplianceTypeDetails | StoreDeliveryBoyDetails | StoreDeliveryBoysOrder
  | StoreDeliveryBoyLicenseTypes | StoreDrivingLissuingState | StoreDeliveryBoyCommisions |
  StoreDeliveryBoyOrderDetails | StoreMasterQuickLinks | TagStoreWithQuickLinks | PostStoreBanner
  | StoreStoreBannerDetails | UpdateStoreBanner | StoreStoreComplianceList |
  StoreStoreProductsList | UpdateDisplayLicenseNo | UpdateStoreProductDetails
  | RegisterMerchantFromAdmin | StoreStoreSpecificBulkList | UploadStoreBulkFile |
  StoreRegisterMerchantBulkList | AddStoreToMasterProduct | AddStoreCreditNote | StoreStorecategoryKeywords
  | ChangeStoreProfileStatus | ChangeStoreLiveStatus | SaveStoreRelatedKeywords | SaveStoreAccountTaxes
  | StoreStoreCreditTransactionHistory | UpgradeStoreSubscription | StoreStoreCreditRequiredForSubscription |
  StoreStoreListLayouts | PurchaseStoreLayout | StoreStoreDetailsLayouts | DeleteStoreBanner | DeleteCollectionBanner |
  EditStoreListLayout | SwitchStoreListLayoutAndPublish | SwitchStoreDeatilLayout | DeleteStoreQuickLink
  | SaveStoreCountForDashboard | SaveProductCountForDashboard | SaveOrderCountForDashboard | SaveStoreCompletenessCount | StoreCollectionBannerList | StoreCollectionBannerById | StoreMerchantInfoById | StoreStoreListByMerchantId | StoreHubListByMerchantId | StoreStoreHubByID | StoreMerchantHubStoreUserList | StoreStoresByMerchantId | SaveStoreUrl | SaveCreatedStoreUrl | StoreUserDetailsById | SaveUpdateMerchantHubUserDetails | StoreVerifyGstn | UpdateStoreUrl |  SaveUpdatesStoreUrl | GetStoreCategory | SaveStoreCategory | SaveStoreDeliveryPartner | AddedStoreDeliveryPartner | ChangeMerchantSubsOtp | MerchantSubsUpdateByOtp | SaveDeliveryCompanyList | UpdateMerchantToggleStatus | MerchantAllowOnlinePayment;
