import { Action } from '@ngrx/store';

export enum ActionTypes {
  groupActionBasedOnCategorySelection = '[Create New Catalog] Call Actons Based On Category Selection',
  getAttributesBasedOnCategory = '[Create New Catalog] Get Attributes Based On Category',
  storeAttributesBasedOnCategory = '[Create New Catalog] Store Attributes Based On Category',

  getProductAttributesByCategory = '[Create New Catalog] Get Product Attributes Based On Category',
  storeProductAttributesByCategory = '[Create New Catalog] Store Product Attributes Based On Category',

  getAttributesSetByCategory = 'getAttributesSetByCategory',
  storeAttributesSetByCategory = 'storeAttributesSetByCategory',

  getAttributeValuesById = '[Create New Catalog] Get Attributes Values Based On Attribute ID',
  storeAttributeValuesById = '[Create New Catalog] Store Attributes Values Based On Attribute ID',

  getBrandsListBasedOnCategory = '[Create New Catalog] Get Brands Based on Category',
  storeBrandsListBasedOnCategory = '[Create New Catalog] Store Brands Based On Category',
  getProductVariants = '[Create New Catalog] Get Product Variants',
  storeProductVariants = '[Create New Catalog] Store Product Variants',
  getValueBasedOnVariant = '[Create New Catalog] Get Values Based On Variants Selection',
  storeValueBasedOnVariant = '[Create New Catalog] Store Values Based On Variants Selection',
  getAttributesList = '[Create New Catalog] Get Attributes List',
  storeAttributesList = '[Create New Catalog] Store Attributes List',
  getAttributesValueBasedOnAttribute = '[Create New Catalog] Get Attributes Value Based On Attribute',
  storeAttributesValueBasedOnAttribute = '[Create New Catalog] Store Attributes Value Based On Attribute',
  createNewCatalog = '[Create New Catalog] Final Post Submit',

  getAllCatalogList = '[Details Catalog] Get All Catalog List',
  storeAllCatalogList = '[Details Catalog] Store All Catalog List',

  getElasticCatalogList = '[Details Catalog] Get Elastic Catalog List',
  storeElasticCatalogList = '[Details Catalog] Store Elastic Catalog List',

  getElasticPrivateProducts = '[getElasticPrivateProducts]',
  storeElasticPrivateProducts = '[storeElasticPrivateProducts]',

  getAllElasticCatalogList = '[Details Catalog] Get All Elastic Catalog List',
  storeAllElasticCatalogList = '[Details Catalog] Store All Elastic Catalog List',

  getCatalogDetailsById = '[Edit Catalog] Get All Catalog Details By Id',
  storeCatalogDetailsById = '[Edit Catalog] Store Catalog Details By Id',
  editCatalogDetails = '[Edit Catalog] Edit Catalog Details',
  replaceCatalogAfterUpdate = '[Replace Catalog] Edit Catalog After Update',
  addNewVariantToConfigurableProduct = '[Eidt Catalog] Add New Variant To Configurable Product',
  getProductDetailsFromSku = '[EDIT CATALOG] GET PRODUCT DETAILS FROM SKU',
  storeProductDetailsFromSku = '[EDIT CATALOG] STORE PRODUCT DETAILS FROM SKU',
  getNoSellerCatalogManagement = '[GET NOSELLER CATALOG] GET NOSELLER CATALOG DETAILS',
  storeNoSellerCatalogManagement = '[STORE NOSELLER CATALOG] STORE NOSELLER CATALOG DETAILS',
  getPendingCatalogManagement = '[GET PENDING CATALOG] GET PENDING CATALOG DETAILS',
  storePendingCatalogManagement = '[STORE PENDING CATALOG] STORE PENDING CATALOG DETAILS',
  getInactiveCatalogManagement = '[GET CATALOG] SHOW INACTIVE CATALOG VIEW',
  storeInactiveCatalogManagement = '[STORE GET CATALOG] REDUX SAVE',
  getCatalogFilesAllData = '[GET CATALOG FILES DATA]',
  storeCatalogFilesAllData = '[STORE CATALOG FILES DATA]',
  getDataBasedOfFileId = '[Pending Catalog Management] Get Catalog Data Based on File Id',
  storeDataBasedOnFileId = '[Pending Catalog Management] Store Catalog Data Based on File Id',
  getProductDetailsFromFile = '[Pending Catalog Management] Get Product Details Based on ProductId From File',
  storeProductDetailsFromFile = '[Pending Catalog Management] Store Product Details Based on ProductId From File',
  getDetailsOnConfigurableIdFromFile = '[Pending Catalog Management] Get Product Details Based on Configurable ProductId From File',
  storeDetailsOnConfigurableIdFromFile = '[Pending Catalog Management] STore Product Details Based on Configurable ProductId From File',
  editCatalogFileDetails = '[Pending Catalog File] Edit Catalog File Details',
  addNewVariantToConfigurableProductInCatalogFile = '[Pending Catalog] Add New Variant To Configurable Product In Catalog File',
  approveRejectPendingCatalog = '[Pending Catalog] Approve Reject Pending Catalog Request',
  competitorAnalysisPost = '[COMPETITOR ANALYSIS POST] Competitor Analysis POST Request',
  bulkUploadCatalog = '[BULK UPLOAD CATALOG GET] Bulk Upload Catalog GET Request',
  linkBrandWithCategory = 'linkBrandWithCategory',
  addNewAttributefromCatalog = 'addNewAttributefromCatalog',
  getPriceDetailOfCatalog = 'getPriceDetailOfCatalog',
  storePriceDetailOfCatalog = 'storePriceDetailOfCatalog',
  uploadContentSheetFromAdmin = 'uploadContentSheetFromAdmin',
  storeBulkUpdate = 'storeBulkUpdate',

  masterToStoreProductUpload = 'masterToStoreProductUpload',

  resetCatalogMangementAll = 'resetCatalogMangementAll',
  resetIndependentDropDownCatalogManagement = 'resetIndependentDropDownCatalogManagement',
  resetDynamicLoadingStateCatalogMgt = 'resetDynamicLoadingStateCatalogMgt',
  resetValueDynamicLoadingStateCatalogMgt = 'resetValueDynamicLoadingStateCatalogMgt',
  resetCatalogFilesReducer = 'resetCatalogFilesReducer',
  resetCatalogFilesConfigurableDataState = 'resetCatalogFilesConfigurableDataState',
  rejectBulkPendingCatatlog = 'rejectBulkPendingCatatlog',
  uploadBulkUpdateFromAdmin = 'uploadBulkUpdateFromAdmin',
  deleteCompetitorAnalysis = 'deleteCompetitorAnalysis',
  changeAllowPOS = 'changeAllowPOS',
  getAttributeDataFromIds = 'getAttributeDataFromIds',
  storeAttributeDataFromIds = 'storeAttributeDataFromIds',

  getStoreProductPendingList = 'getStoreProductPendingList',
  storeStoreProductPendingList = 'storeStoreProductPendingList',

  updateStorePendingProducts = 'updateStorePendingProducts',
  getAttributesBasedOnCode = 'getAttributesBasedOnCode',
  storeGetAttributesBasedOnCode = 'storeGetAttributesBasedOnCode',
  bulkFileRetry = 'bulkFileRetry',
  getBrandBatchList= '[Get Brand Batch List]',
  storeBrandBatchList = '[Store Brand Batch List]',
  approveBrandBatchList = '[Approve Brand Batch List]',
  deleteProductImage = '[Delete Product Image]',
  addProductImage = '[Add Product Image]',

  deleteProductPrice = '[Delete Product Price]',
  deleteProductVariate = '[Delete Product Variante]',
  updateProductVariante = '[update Product variante]',
  updateProductVarianteFull = '[update Product Variante Full]',
  updateProductBarcode = '[update Product barcode]',
  addProductBarcode = '[Add Product Barcode]',
  addProductVariante = '[Add Product Varient]',

  deleteProductPriceStore = '[Delete Product Price Store]',
  deleteProductVariateStore = '[Delete Product Variante Store]',
  updateProductVarianteStore = '[update Product variante Store]',
  updateProductVarianteStoreFull = '[update Product Variante Stor eFull]',
  updateProductBarcodeStore = '[update Product barcode Store]',
  addProductBarcodeStore = '[Add Product Barcode Store]',
  addProductVarianteStore = '[Add Product Varient Store]',
}

export class DeleteProductVariate implements Action {
  readonly type = ActionTypes.deleteProductVariate;
  constructor(public payload: any) { }
}
export class DeleteProductPrice implements Action {
  readonly type = ActionTypes.deleteProductPrice;
  constructor(public payload: any) { }
}
export class UpdateProductVariante implements Action {
  readonly type = ActionTypes.updateProductVariante;
  constructor(public payload: any) { }
}
export class UpdateProductVarianteFull implements Action {
  readonly type = ActionTypes.updateProductVarianteFull;
  constructor(public payload: any) { }
}
export class UpdateProductBarcode implements Action {
  readonly type = ActionTypes.updateProductBarcode;
  constructor(public payload: any) { }
}
export class AddProductBarcode implements Action {
  readonly type = ActionTypes.addProductBarcode;
  constructor(public payload: any) { }
}
export class AddProductVariante implements Action {
  readonly type = ActionTypes.addProductVariante;
  constructor(public payload: any) { }
}

export class DeleteProductVariateStore implements Action {
  readonly type = ActionTypes.deleteProductVariateStore;
  constructor(public payload: any) { }
}
export class DeleteProductPriceStore implements Action {
  readonly type = ActionTypes.deleteProductPriceStore;
  constructor(public payload: any) { }
}
export class UpdateProductVarianteStore implements Action {
  readonly type = ActionTypes.updateProductVarianteStore;
  constructor(public payload: any) { }
}
export class UpdateProductVarianteStoreFull implements Action {
  readonly type = ActionTypes.updateProductVarianteStoreFull;
  constructor(public payload: any) { }
}
export class UpdateProductBarcodeStore implements Action {
  readonly type = ActionTypes.updateProductBarcodeStore;
  constructor(public payload: any) { }
}
export class AddProductBarcodeStore implements Action {
  readonly type = ActionTypes.addProductBarcodeStore;
  constructor(public payload: any) { }
}
export class AddProductVarianteStore implements Action {
  readonly type = ActionTypes.addProductVarianteStore;
  constructor(public payload: any) { }
}


export class DeleteProductImage implements Action {
  readonly type = ActionTypes.deleteProductImage;
  constructor(public payload: any) { }
}
export class GetInactiveCatalogManagement implements Action {
  readonly type = ActionTypes.getInactiveCatalogManagement;
}
export class StoreGetInactiveCatalogManagement implements Action {
  readonly type = ActionTypes.storeInactiveCatalogManagement;
  constructor(public payload: any) { };
}
export class GetPendingCatalogManagement implements Action {
  readonly type = ActionTypes.getPendingCatalogManagement;
}
export class StorePendingCatalogManagement implements Action {
  readonly type = ActionTypes.storePendingCatalogManagement;
  constructor(public payload: any) { }
}
export class GetNoSellerCatalogManagement implements Action {
  readonly type = ActionTypes.getNoSellerCatalogManagement;
}
export class StoreNoSellerCatalogManagement implements Action {
  readonly type = ActionTypes.storeNoSellerCatalogManagement;
  constructor(public payload: any) { }
}

export class GetAllCatalogList implements Action {
  readonly type = ActionTypes.getAllCatalogList;
  constructor(public payload: any) { }

}
export class StoreAllCatalogList implements Action {
  readonly type = ActionTypes.storeAllCatalogList;
  constructor(public payload: any) { }
}

export class GetElasticCatalogList implements Action {
  readonly type = ActionTypes.getElasticCatalogList;
  constructor(public payload: any) { }

}
export class StoreElasticCatalogList implements Action {
  readonly type = ActionTypes.storeElasticCatalogList;
  constructor(public payload: any) { }
}

export class GetElasticPrivateProducts implements Action {
  readonly type = ActionTypes.getElasticPrivateProducts;
  constructor(public payload: any) { }

}
export class StoreElasticPrivateProducts implements Action {
  readonly type = ActionTypes.storeElasticPrivateProducts;
  constructor(public payload: any) { }
}

export class GetAllElasticCatalogList implements Action {
  readonly type = ActionTypes.getAllElasticCatalogList;
  constructor(public payload: any) { }

}
export class StoreAllElasticCatalogList implements Action {
  readonly type = ActionTypes.storeAllElasticCatalogList;
  constructor(public payload: any) { }
}


export class GetCatalogDetailsById implements Action {
  readonly type = ActionTypes.getCatalogDetailsById;
  constructor(public payload: any) { }
}
export class StoreCatalogDetailsById implements Action {
  readonly type = ActionTypes.storeCatalogDetailsById;
  constructor(public payload: any) { }
}
export class EditCatalogDetails implements Action {
  readonly type = ActionTypes.editCatalogDetails;
  constructor(public payload: any) { }
}
export class AddProductImage implements Action {
  readonly type = ActionTypes.addProductImage;
  constructor(public payload: any) { }
}
export class ReplaceCatalogAfterUpdate implements Action {
  readonly type = ActionTypes.replaceCatalogAfterUpdate;
  constructor(public payload: any) { }
}

export class AddNewVariantToConfigurableProduct implements Action {
  readonly type = ActionTypes.addNewVariantToConfigurableProduct;
  constructor(public payload: any) { }
}
export class GroupActionsBasedOnCategorySelection implements Action {
  readonly type = ActionTypes.groupActionBasedOnCategorySelection;
  constructor(public payload: any) { }
}
export class GetAttributesBasedOnCategory implements Action {
  readonly type = ActionTypes.getAttributesBasedOnCategory;
  constructor(public payload: any) { }
}
export class StoreAttributesBasedOnCategory implements Action {
  readonly type = ActionTypes.storeAttributesBasedOnCategory;
  constructor(public payload: any) { }
}
export class GetProductAttributesByCategory implements Action {
  readonly type = ActionTypes.getProductAttributesByCategory;
  constructor(public payload: any) { }
}
export class StoreProductAttributesByCategory implements Action {
  readonly type = ActionTypes.storeProductAttributesByCategory;
  constructor(public payload: any) { }
}

export class GetAttributesSetByCategory implements Action {
  readonly type = ActionTypes.getAttributesSetByCategory;
  constructor(public payload: any) { }
}
export class StoreAttributesSetByCategory implements Action {
  readonly type = ActionTypes.storeAttributesSetByCategory;
  constructor(public payload: any) { }
}


export class GetAttributeValuesById implements Action {
  readonly type = ActionTypes.getAttributeValuesById;
  constructor(public payload: any) { }
}
export class StoreAttributeValuesById implements Action {
  readonly type = ActionTypes.storeAttributeValuesById;
  constructor(public payload: any) { }
}

export class GetBrandsListBasedOnCategory implements Action {
  readonly type = ActionTypes.getBrandsListBasedOnCategory;
  constructor(public payload: any) { }
}
export class StoreBrandsListBasedOnCategory implements Action {
  readonly type = ActionTypes.storeBrandsListBasedOnCategory;
  constructor(public payload: any) { }
}
export class GetProductVariants implements Action {
  readonly type = ActionTypes.getProductVariants;
  constructor(public payload: any) { }
}
export class StoreProductVariants implements Action {
  readonly type = ActionTypes.storeProductVariants;
  constructor(public payload: any) { }
}
export class GetValueBasedOnVariant implements Action {
  readonly type = ActionTypes.getValueBasedOnVariant;
  constructor(public payload: any) { }

}
export class StoreValueBasedOnVariant implements Action {
  readonly type = ActionTypes.storeValueBasedOnVariant;
  constructor(public payload: any) { }
}
export class GetAttributesList implements Action {
  readonly type = ActionTypes.getAttributesList;
}
export class StoreAttributesList implements Action {
  readonly type = ActionTypes.storeAttributesList;
  constructor(public payload: any) { }
}
export class GetAttributesValueBasedOnAttribute implements Action {
  readonly type = ActionTypes.getAttributesValueBasedOnAttribute;
  constructor(public payload: any) { }
}
export class StoreAttributesValueBasedOnAttribute implements Action {
  readonly type = ActionTypes.storeAttributesValueBasedOnAttribute;
  constructor(public payload: any) { }
}
export class CreateNewCatalog implements Action {
  readonly type = ActionTypes.createNewCatalog;
  constructor(public payload: any) { }
}
export class ApproveBrandBatchList implements Action {
  readonly type = ActionTypes.approveBrandBatchList;
  constructor(public payload: any) { }
}
export class GetProductDetailsFromSku implements Action {
  readonly type = ActionTypes.getProductDetailsFromSku;
  constructor(public payload: any) { }
}
export class StorePorductDetialsFromSku implements Action {
  readonly type = ActionTypes.storeProductDetailsFromSku;
  constructor(public payload: any) { }
}
export class GetCatalogFilesAllData implements Action {
  readonly type = ActionTypes.getCatalogFilesAllData;
  constructor(public payload: any) { }
}
export class GetBrandBatchList implements Action {
  readonly type = ActionTypes.getBrandBatchList;
  constructor(public payload: any) { }
}
export class StoreBrandBatchList implements Action {
  readonly type = ActionTypes.storeBrandBatchList;
  constructor(public payload: any) { }
}
export class StoreCatalogFilesAllData implements Action {
  readonly type = ActionTypes.storeCatalogFilesAllData;
  constructor(public payload: any) { }
}
export class GetDataBasedOfFileId implements Action {
  readonly type = ActionTypes.getDataBasedOfFileId;
  constructor(public payload: any) { }
}
export class StoreDataBasedOnFileId implements Action {
  readonly type = ActionTypes.storeDataBasedOnFileId;
  constructor(public payload: any) { }
}
export class GetProductDetailsFromFile implements Action {
  readonly type = ActionTypes.getProductDetailsFromFile;
  constructor(public payload: any) { }
}
export class StoreProductDetailsFromFile implements Action {
  readonly type = ActionTypes.storeProductDetailsFromFile;
  constructor(public payload: any) { }
}
export class GetDetailsOnConfigurableIdFromFile implements Action {
  readonly type = ActionTypes.getDetailsOnConfigurableIdFromFile;
  constructor(public payload: any) { }
}
export class StoreDetailsOnConfigurableIdFromFile implements Action {
  readonly type = ActionTypes.storeDetailsOnConfigurableIdFromFile;
  constructor(public payload: any) { }
}
export class EditCatalogFileDetails implements Action {
  readonly type = ActionTypes.editCatalogFileDetails;
  constructor(public payload: any) { }
}

export class AddNewVariantToConfigurableProductInCatalogFile implements Action {
  readonly type = ActionTypes.addNewVariantToConfigurableProductInCatalogFile;
  constructor(public payload: any) { }
}
export class ApproveRejectPendingCatalog implements Action {
  readonly type = ActionTypes.approveRejectPendingCatalog;
  constructor(public payload: any) { }
}
export class PostCompetitorAnalysis implements Action {
  readonly type = ActionTypes.competitorAnalysisPost;
  constructor(public payload: any) { }
}

export class GetBulkUploadCatalog implements Action {
  readonly type = ActionTypes.bulkUploadCatalog;
  constructor(public payload: any) { }
}

export class LinkBrandWithCategory implements Action {
  readonly type = ActionTypes.linkBrandWithCategory;
  constructor(public payload: any, public brandId: number) { }
}
export class AddNewAttributefromCatalog implements Action {
  readonly type = ActionTypes.addNewAttributefromCatalog;
  constructor(public payload: any, public attrId: number, public attributeSetId: number) { }
}

export class GetPriceDetailOfCatalog implements Action {
  readonly type = ActionTypes.getPriceDetailOfCatalog;
  constructor(public id: number) { }
}
export class StorePriceDetailOfCatalog implements Action {
  readonly type = ActionTypes.storePriceDetailOfCatalog;
  constructor(public payload: any) { }
}
export class UploadContentSheetFromAdmin implements Action {
  readonly type = ActionTypes.uploadContentSheetFromAdmin;
  constructor(public payload: object) { }
}
export class StoreBulkUpdate implements Action {
  readonly type = ActionTypes.storeBulkUpdate;
  constructor(public payload: object) { }
}
export class UploadBulkUpdateFromAdmin implements Action {
  readonly type = ActionTypes.uploadBulkUpdateFromAdmin;
  constructor(public payload: object) { }
}
export class MasterToStoreProductUpload implements Action {
  readonly type = ActionTypes.masterToStoreProductUpload;
  constructor(public payload: object) { }
}
export class DeleteCompetitorAnalysis implements Action {
  readonly type = ActionTypes.deleteCompetitorAnalysis;
  constructor(public payload: any) { }
}
export class ChangeAllowPOS implements Action {
  readonly type = ActionTypes.changeAllowPOS;
  constructor(public id: number, public status: boolean) { }
}

// RESET REDUCER ACTION

export class ResetCatalogMangementAll implements Action {
  readonly type = ActionTypes.resetCatalogMangementAll;
}
export class ResetIndependentDropDownCatalogManagement implements Action {
  readonly type = ActionTypes.resetIndependentDropDownCatalogManagement;
}

export class ResetDynamicLoadingStateCatalogMgt implements Action {
  readonly type = ActionTypes.resetDynamicLoadingStateCatalogMgt;
}

export class ResetValueDynamicLoadingStateCatalogMgt implements Action {
  readonly type = ActionTypes.resetValueDynamicLoadingStateCatalogMgt;
}

export class ResetCatalogFilesReducer implements Action {
  readonly type = ActionTypes.resetCatalogFilesReducer;
}
export class ResetCatalogFilesConfigurableDataState implements Action {
  readonly type = ActionTypes.resetCatalogFilesConfigurableDataState;
}

export class RejectBulkPendingCatatlog implements Action {
  readonly type = ActionTypes.rejectBulkPendingCatatlog;
  constructor(public payload: any) { }

}

export class GetAttributeDataFromIds implements Action {
  readonly type = ActionTypes.getAttributeDataFromIds;
  constructor(public payload: any) { }
}
export class StoreAttributeDataFromIds implements Action {
  readonly type = ActionTypes.storeAttributeDataFromIds;
  constructor(public payload: any) { }
}

export class GetStoreProductPendingList implements Action {
  readonly type = ActionTypes.getStoreProductPendingList;
  constructor(public payload: any, public pageNo: number) { }
}

export class StoreStoreProductPendingList implements Action {
  readonly type = ActionTypes.storeStoreProductPendingList;
  constructor(public payload: any) { }
}

export class UpdateStorePendingProducts implements Action {
  readonly type = ActionTypes.updateStorePendingProducts;
  constructor(public payload: any, public url: String) { }
}

export class GetAttributesBasedOnCode implements Action {
  readonly type = ActionTypes.getAttributesBasedOnCode;
  constructor(public payload: string) { }

}
export class StoreGetAttributesBasedOnCode implements Action {
  readonly type = ActionTypes.storeGetAttributesBasedOnCode;
  constructor(public payload: any) { }
}

export class BulkFileRetry implements Action {
  readonly type = ActionTypes.bulkFileRetry;
  constructor(public payload: any) { }
}

export type CatalogManagementReducerActions = StoreAttributesBasedOnCategory | StoreBrandsListBasedOnCategory |
  StoreProductVariants | StoreValueBasedOnVariant | StoreAttributesList | StoreAttributesValueBasedOnAttribute |
  StoreAllCatalogList | StoreElasticCatalogList | StoreElasticPrivateProducts | StoreCatalogDetailsById | StorePorductDetialsFromSku | StoreGetInactiveCatalogManagement |
  StoreNoSellerCatalogManagement |
  StorePendingCatalogManagement |
  StoreCatalogFilesAllData | StoreDataBasedOnFileId |
  StoreProductDetailsFromFile | StoreDetailsOnConfigurableIdFromFile |
  LinkBrandWithCategory | StorePriceDetailOfCatalog | ResetCatalogMangementAll |
  ResetIndependentDropDownCatalogManagement | ResetDynamicLoadingStateCatalogMgt | ResetValueDynamicLoadingStateCatalogMgt |
  ResetCatalogFilesReducer | ResetCatalogFilesConfigurableDataState | RejectBulkPendingCatatlog | UploadBulkUpdateFromAdmin |
  DeleteCompetitorAnalysis | ChangeAllowPOS | StoreAllElasticCatalogList | StoreAttributeDataFromIds | ReplaceCatalogAfterUpdate
  | StoreStoreProductPendingList | UpdateStorePendingProducts | StoreGetAttributesBasedOnCode | BulkFileRetry | StoreProductAttributesByCategory | StoreAttributeValuesById | StoreBrandBatchList | StoreAttributesSetByCategory;
