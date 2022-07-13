import { Action } from '@ngrx/store'

export enum ActionTypes {
    getProductCount = 'getProductCount',
    storeProductCount = 'storeProductCount',
    getInStock = 'getInStock',
    storeInStock = 'storeInStock',
    getOutOfStock = 'getOutOfStock',
    storeOutOfStock = 'storeOutOfStock',
    getLowInventory = 'getLowInventory',
    storeLowInventory = 'storeLowInventory',
    getAddedProuctDetails = 'getAddedProuctDetails',
    storeAddedProuctDetails = 'storeAddedProuctDetails',
    changeProductStatus = 'changeProductStatus',
    getSearchProducts = 'getSearchProducts',
    storeSearchProducts = 'storeSearchProducts',
    getSearchBrand = 'getSearchBrand',
    storeSearchBrand = 'storeSearchBrand',
    getSearchCategory = 'getSearchCategory',
    storeSearchCategory = 'storeSearchCategory',
    getaddProductDetail = 'getaddProductDetail',
    storeAddtoProductDetail = 'storeAddtoProductDetail',
    getRelationId = 'getRelationId',
    storeRealtionId = 'storeRealtionId',
    postBrandCategoryLink = 'postBrandCategoryLink',
    getDisabledByYou = 'getDisabledByYou',
    storeDisabledByYou = 'storeDisabledByYou',
    postPriceBreakShow = 'postPriceBreakShow',
    storePriceBreakShow = 'storePriceBreakShow',
    postProductAddToCatatlog = 'postProductAddToCatatlog',
    storeNspBreakUp = 'storeNspBreakUp',
    postIsAlReadySelling = 'postIsAlReadySelling',
    updateProductAddToCatalog = 'updateProductAddToCatalog',
    storeResultsOnSearch = 'storeResultsOnSearch',
    storeLowInventoryOnSearch = 'storeLowInventoryOnSearch',
    storeOutOfStockOnSearch = 'storeOutOfStockOnSearch',
    storeDisabledByYouOnSearch = 'storeDisabledByYouOnSearch',
    getSellerDashBoard = 'getSellerDashBoard',
    storeSellerDashboard = 'storeSellerDashboard',
    getUserMenu = 'getUserMenu',
    StoreUserMenu = 'StoreUserMenu',
    uploadContentSheet = 'uploadContentSheet',
    uploadBulkPrice = 'uploadBulkPrice',
    downloadBasicFile = 'downloadBasicFile',
    downloadImageFile = 'downloadImageFile',
    dispatchDownloadBulk = '[Download Mg]Dispatch Bulk aCTIO',
    downloadAtrributeFile = 'downloadAtrributeFile',
    postSellerNewBrand = 'postSellerNewBrand',
    removeOutofStockFromInstock = 'removeOutofStockFromInstock',
    createNewSellerCatalog = 'createNewSellerCatalog',
    removeActiveInActiveFromList = 'removeActiveInActiveFromList',
    reIndexProduct = 'reIndexProduct',




    //Admin//
    getAdminProductCount = 'getAdminProductCount',
    storeAdminProductCount = 'storeAdminProductCount',
    getAdminInStock = 'getAdminInStock',
    storeAdminInStock = 'storeAdminInStock',
    storeAdminInStockOnSearch = 'storeAdminInStockOnSearch',
    getAdminOutOfStock = 'getAdminOutOfStock',
    storeAdminOutOfStock = 'storeAdminOutOfStock',
    storeAdminOutOfStockOnSearch = 'storeAdminOutOfStockOnSearch',
    getCatalogAdminCategory = 'getCatalogAdminCategory',
    storeCatalogAdminCategory = 'storeCatalogAdminCategory',
    getAdminInActive = 'getAdminInActive',
    storeAdminInActive = 'storeAdminInActive',
    storeAdminInActiveOnSearch = 'storeAdminInActiveOnSearch',
    getAdminLinkedSellers = 'getAdminLinkedSellers',
    storeAdminLinkedSellers = 'storeAdminLinkedSellers',
    getAllActiveSellersForBulkUpload = '[Admin] Bulk Upload Get All Active Sellers',
    storeAllActiveSellersForBulkUpload = '[Admin] Bulk Upload Store All Active Sellers',
    postNspDispute = 'postNspDispute',
    postProductDispute = 'postProductDispute',
    postProductRelevance = 'postProductRelevance',
    postTaxCorrection = 'postTaxCorrection',
    postTaxClassCorrection = 'postTaxClassCorrection',
    getActiveHsnList = 'getActiveHsnList',
    storeActiveHsnList = 'storeActiveHsnList',
    updateProductAddToCatalogAdmin = 'updateProductAddToCatalogAdmin',
    postPriceBreakShowAdmin = 'postPriceBreakShowAdmin',
    getMultiSellerlist = 'getMultiSellerlist',
    storeMultiSellerlist = 'storeMultiSellerlist',
    changeAdminApprovalStatus = 'changeAdminApprovalStatus',
    updateNdhAssuredPopularTranding = 'updateNdhAssuredPopularTranding',
    updateProductDimension = 'updateProductDimension',
    resetAdminApprovalStatus = 'resetAdminApprovalStatus',
    uploadBulkPriceUpdate = 'UploadBulkPriceUpdate',
    uploadDownloadBulkInventoryUpdate = 'uploadDownloadBulkInventoryUpdate',
    storeCollection = 'storeCollection',
    getCollection = 'getCollection',

    adminTrackListing = "adminTrackListing",
    storeAdminTrackListing = "storeAdminTrackListing",

    merchantTrackListing = "merchantTrackListing",
    storeMerchantTrackListing = "storeMerchantTrackListing",
    resetMerchantTrackListing = 'resetMerchantTrackListing',
    getCommissionModeSellerCatalog = 'getCommissionModeSellerCatalog',
    storeCommissionModeSellerCatalog = 'storeCommissionModeSellerCatalog',
    setDefaultSellerAdmin = 'setDefaultSellerAdmin',
    sellerProductStatusChangeAdmin = 'sellerProductStatusChangeAdmin',
    getProductVariants = 'getProductVariants',
    storeProductVariants = 'storeProductVariants',

}

export class UploadDownloadBulkInventoryUpdate implements Action {
    readonly type = ActionTypes.uploadDownloadBulkInventoryUpdate;
    constructor(public payload: any) { }
}
export class UploadBulkPriceUpdate implements Action {
    readonly type = ActionTypes.uploadBulkPriceUpdate;
    constructor(public payload: any) { }
}
export class GetProductCount implements Action {
    readonly type = ActionTypes.getProductCount;
}
export class StoreProductCount implements Action {
    readonly type = ActionTypes.storeProductCount;
    constructor(public payload: object) { }
}
export class GetInStock implements Action {
    readonly type = ActionTypes.getInStock;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreInStock implements Action {
    readonly type = ActionTypes.storeInStock;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreResultOnSearch implements Action {
    readonly type = ActionTypes.storeResultsOnSearch;
    constructor(public payload: object, public refresh: boolean) { }

}
export class GetOutOfStock implements Action {
    readonly type = ActionTypes.getOutOfStock;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreOutOfStock implements Action {
    readonly type = ActionTypes.storeOutOfStock;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreOutOfStockOnSearch implements Action {
    readonly type = ActionTypes.storeOutOfStockOnSearch;
    constructor(public payload: object, public refresh: boolean) { }
}
export class GetLowInventory implements Action {
    readonly type = ActionTypes.getLowInventory;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreLowInventory implements Action {
    readonly type = ActionTypes.storeLowInventory;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreLowInventoryOnSearch implements Action {
    readonly type = ActionTypes.storeLowInventoryOnSearch;
    constructor(public payload: object, public refresh: boolean) { }
}

export class GetAddedProuctDetails implements Action {
    readonly type = ActionTypes.getAddedProuctDetails;
    constructor(public id: any, public merchantId = '', public requestType: string) { }
}
export class StoreAddedProuctDetails implements Action {
    readonly type = ActionTypes.storeAddedProuctDetails;
    constructor(public payload: object) { }
}
export class ChangeProductStatus implements Action {
    readonly type = ActionTypes.changeProductStatus;
    constructor(public payload: any, public list: string) { }
}

export class GetSearchProducts implements Action {
    readonly type = ActionTypes.getSearchProducts;
    constructor(public payload: any) { }
}
export class StoreSearchProducts implements Action {
    readonly type = ActionTypes.storeSearchProducts;
    constructor(public payload: object) { }
}

export class GetSearchBrand implements Action {
    readonly type = ActionTypes.getSearchBrand;
    constructor(public payload: any) { }
}
export class StoreSearchBrand implements Action {
    readonly type = ActionTypes.storeSearchBrand;
    constructor(public payload: object) { }
}

export class GetSearchCategory implements Action {
    readonly type = ActionTypes.getSearchCategory;
    constructor(public payload: any) { }
}
export class StoreSearchCategory implements Action {
    readonly type = ActionTypes.storeSearchCategory;
    constructor(public payload: object) { }
}

export class GetaddProductDetail implements Action {
    readonly type = ActionTypes.getaddProductDetail;
    constructor(public payload: any) { }
}
export class StoreAddtoProductDetail implements Action {
    readonly type = ActionTypes.storeAddtoProductDetail;
    constructor(public payload: object) { }
}

export class GetRelationId implements Action {
    readonly type = ActionTypes.getRelationId;
    constructor(public payload: any) { }
}
export class StoreRealtionId implements Action {
    readonly type = ActionTypes.storeRealtionId;
    constructor(public payload: object) { }
}
export class PostBrandCategoryLink implements Action {
    readonly type = ActionTypes.postBrandCategoryLink;
    constructor(public payload: any) {

    }
}

export class GetDisabledByYou implements Action {
    readonly type = ActionTypes.getDisabledByYou;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreDisabledByYou implements Action {
    readonly type = ActionTypes.storeDisabledByYou;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreDisabledByYouOnSearch implements Action {
    readonly type = ActionTypes.storeDisabledByYouOnSearch;
    constructor(public payload: object, public refresh: boolean) { }
}


export class PostPriceBreakShow implements Action {
    readonly type = ActionTypes.postPriceBreakShow;
    constructor(public payload: any) { }
}
export class StorePriceBreakShow implements Action {
    readonly type = ActionTypes.storePriceBreakShow;
    constructor(public payload: object) { }
}

export class PostProductAddToCatatlog implements Action {
    readonly type = ActionTypes.postProductAddToCatatlog;
    constructor(public payload: any) { }
}

export class StoreNspBreakUp implements Action {
    readonly type = ActionTypes.storeNspBreakUp;
    constructor(public payload: any) { }
}

export class PostIsAlReadySelling implements Action {
    readonly type = ActionTypes.postIsAlReadySelling;
    constructor(public payload: any) { }
}
export class UpdateProductAddToCatalog implements Action {
    readonly type = ActionTypes.updateProductAddToCatalog;
    constructor(public payload: any, public list: string) { }
}

export class GetSellerDashBoard implements Action {
    readonly type = ActionTypes.getSellerDashBoard;

}
export class StoreSellerDashboard implements Action {
    readonly type = ActionTypes.storeSellerDashboard;
    constructor(public payload: any) { }
}

export class GetUserMenu implements Action {
    readonly type = ActionTypes.getUserMenu;

}
export class StoreUserMenu implements Action {
    readonly type = ActionTypes.StoreUserMenu;
    constructor(public payload: any) { }
}
export class ReIndexProduct implements Action {
    readonly type = ActionTypes.reIndexProduct;
    constructor(public payload: any) { }
}


//Admin///


export class GetAdminProductCount implements Action {
    readonly type = ActionTypes.getAdminProductCount;
}
export class StoreAdminProductCount implements Action {
    readonly type = ActionTypes.storeAdminProductCount;
    constructor(public payload: object) { }
}

export class GetAdminInStock implements Action {
    readonly type = ActionTypes.getAdminInStock;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreAdminInStock implements Action {
    readonly type = ActionTypes.storeAdminInStock;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreAdminInStockOnSearch implements Action {
    readonly type = ActionTypes.storeAdminInStockOnSearch;
    constructor(public payload: object, public refresh: boolean) { }

}
export class GetAdminOutOfStock implements Action {
    readonly type = ActionTypes.getAdminOutOfStock;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreAdminOutOfStock implements Action {
    readonly type = ActionTypes.storeAdminOutOfStock;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreAdminOutOfStockOnSearch implements Action {
    readonly type = ActionTypes.storeAdminOutOfStockOnSearch;
    constructor(public payload: object, public refresh: boolean) { }

}
export class GetAdminInActive implements Action {
    readonly type = ActionTypes.getAdminInActive;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreAdminInActive implements Action {
    readonly type = ActionTypes.storeAdminInActive;
    constructor(public payload: object, public refresh: boolean) { }
}
export class StoreAdminInActiveOnSearch implements Action {
    readonly type = ActionTypes.storeAdminInActiveOnSearch;
    constructor(public payload: object, public refresh: boolean) { }

}


export class GetCatalogAdminCategory implements Action {
    readonly type = ActionTypes.getCatalogAdminCategory;
}
export class StoreCatalogAdminCategory implements Action {
    readonly type = ActionTypes.storeCatalogAdminCategory;
    constructor(public payload: object) { }
}



export class GetAdminLinkedSellers implements Action {
    readonly type = ActionTypes.getAdminLinkedSellers;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreAdminLinkedSellers implements Action {
    readonly type = ActionTypes.storeAdminLinkedSellers;
    constructor(public payload: object, public refresh: boolean) { }
}

export class UploadContentSheet implements Action {
    readonly type = ActionTypes.uploadContentSheet;
    constructor(public payload: any, public payloadtype: String) { }
}
export class UploadBulkPrice implements Action {
    readonly type = ActionTypes.uploadBulkPrice;
    constructor(public payload: any, public payloadtype: String) { }
}
export class DispatchBulkActionOnDownload implements Action {
    readonly type = ActionTypes.dispatchDownloadBulk;
    constructor(public payload: any) { }
}
export class DownloadBasicFile implements Action {
    readonly type = ActionTypes.downloadBasicFile;

}
export class DownloadImageFile implements Action {
    readonly type = ActionTypes.downloadImageFile;
}
export class DownloadAtrributeFile implements Action {
    readonly type = ActionTypes.downloadAtrributeFile;
    constructor(public payload: any) { }
}
export class PostSellerNewBrand implements Action {
    readonly type = ActionTypes.postSellerNewBrand;
    constructor(public payload: any) { }
}



export class PostNspDispute implements Action {
    readonly type = ActionTypes.postNspDispute;
    constructor(public payload: any) { }
}

export class PostProductDispute implements Action {
    readonly type = ActionTypes.postProductDispute;
    constructor(public payload: any) { }
}
export class PostProductRelevance implements Action {
    readonly type = ActionTypes.postProductRelevance;
    constructor(public payload: any) { }
}
export class PostTaxCorrection implements Action {
    readonly type = ActionTypes.postTaxCorrection;
    constructor(public payload: any) { }
}
export class PostTaxClassCorrection implements Action {
    readonly type = ActionTypes.postTaxClassCorrection;
    constructor(public payload: any) { }
}


export class GetActiveHsnList implements Action {
    readonly type = ActionTypes.getActiveHsnList;
}
export class StoreActiveHsnList implements Action {
    readonly type = ActionTypes.storeActiveHsnList;
    constructor(public payload: any) { }
}

export class GetAllActiveSellersForBulkUpload implements Action {
    readonly type = ActionTypes.getAllActiveSellersForBulkUpload;
    constructor(public payload: any) { }
}
export class StoreAllActiveSellersForBulkUpload implements Action {
    readonly type = ActionTypes.storeAllActiveSellersForBulkUpload;
    constructor(public payload: any) { }
}

export class RemoveOutofStockFromInstock implements Action {
    readonly type = ActionTypes.removeOutofStockFromInstock;
    constructor(public payload: object) { }
}


export class CreateNewSellerCatalog implements Action {
    readonly type = ActionTypes.createNewSellerCatalog;
    constructor(public payload: any) { }
}


export class UpdateProductAddToCatalogAdmin implements Action {
    readonly type = ActionTypes.updateProductAddToCatalogAdmin;
    constructor(public payload: any, public list: string) { }
}


export class RemoveActiveInActiveFromList implements Action {
    readonly type = ActionTypes.removeActiveInActiveFromList;
    constructor(public payload: object) { }
}

export class PostPriceBreakShowAdmin implements Action {
    readonly type = ActionTypes.postPriceBreakShowAdmin;
    constructor(public payload: any) { }
}

export class GetMultiSellerlist implements Action {
    readonly type = ActionTypes.getMultiSellerlist;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StoreMultiSellerlist implements Action {
    readonly type = ActionTypes.storeMultiSellerlist;
    constructor(public payload: object, public refresh: boolean) { }

}

export class ChangeAdminApprovalStatus implements Action {
    readonly type = ActionTypes.changeAdminApprovalStatus;
    constructor(public payload: any) { }
}
export class ResetAdminApprovalStatus implements Action {
    readonly type = ActionTypes.resetAdminApprovalStatus;
    constructor(public payload: any) { }
}

export class UpdateNdhAssuredPopularTranding implements Action {
    readonly type = ActionTypes.updateNdhAssuredPopularTranding;
    constructor(public payload: any) { }
}


export class UpdateProductDimension implements Action {
    readonly type = ActionTypes.updateProductDimension;
    constructor(public payload: any) { }
}
export class GetCollection implements Action {
    readonly type = ActionTypes.getCollection;

}
export class StoreCollection implements Action {
    readonly type = ActionTypes.storeCollection;
    constructor(public payload: any) { }
}

export class AdminTrackListing implements Action {
    readonly type = ActionTypes.adminTrackListing;
    constructor(public payload: object) { }
}

export class StoreAdminTrackListing implements Action {
    readonly type = ActionTypes.storeAdminTrackListing;
    constructor(public payload: any) { }
}

export class MerchantTrackListing implements Action {
    readonly type = ActionTypes.merchantTrackListing;
    constructor(public payload: object) { }
}

export class StoreMerchantTrackListing implements Action {
    readonly type = ActionTypes.storeMerchantTrackListing;
    constructor(public payload: any) { }
}

export class ResetMerchantTrackListing implements Action {
    readonly type = ActionTypes.resetMerchantTrackListing;
}

export class GetCommissionModeSellerCatalog implements Action {
    readonly type = ActionTypes.getCommissionModeSellerCatalog;
}

export class StoreCommissionModeSellerCatalog implements Action {
    readonly type = ActionTypes.storeCommissionModeSellerCatalog;
    constructor(public payload: any) { }
}

export class SetDefaultSellerAdmin implements Action {
    readonly type = ActionTypes.setDefaultSellerAdmin;
    constructor(public payload: any, public productId: number) { }
}
export class SellerProductStatusChangeAdmin implements Action {
    readonly type = ActionTypes.sellerProductStatusChangeAdmin;
    constructor(public payload: any, public productId: number) { }
}
export class GetProductVariants implements Action {
    readonly type = ActionTypes.getProductVariants;
    constructor(public productId: number, public refresh: boolean) { }
}
export class StoreProductVariants implements Action {
    readonly type = ActionTypes.storeProductVariants;
    constructor(public payload: object, public refresh: boolean) { }
}



export type manageSellerCatalogActions = StoreProductCount | StoreInStock | StoreOutOfStock |
    StoreLowInventory | StoreAddedProuctDetails | ChangeProductStatus | StoreSearchProducts |
    StoreSearchBrand | StoreSearchCategory | StoreAddtoProductDetail | StoreRealtionId |
    PostBrandCategoryLink | StoreDisabledByYou | PostPriceBreakShow | StorePriceBreakShow |
    PostProductAddToCatatlog | StoreNspBreakUp | PostIsAlReadySelling | UpdateProductAddToCatalog |
    StoreResultOnSearch | StoreLowInventoryOnSearch | StoreOutOfStockOnSearch | StoreDisabledByYouOnSearch |
    StoreSellerDashboard | StoreUserMenu | UploadContentSheet | UploadBulkPrice | PostSellerNewBrand | RemoveOutofStockFromInstock |
    CreateNewSellerCatalog | RemoveActiveInActiveFromList | ChangeAdminApprovalStatus | ReIndexProduct;

export type manageSellerAdminCatalogActions = StoreAdminProductCount | StoreAdminInStock | StoreAdminInStockOnSearch |
    StoreAdminOutOfStock | StoreAdminOutOfStockOnSearch | StoreCatalogAdminCategory | StoreAdminInActive |
    StoreAllActiveSellersForBulkUpload |
    StoreAdminInActiveOnSearch | StoreAdminLinkedSellers | PostNspDispute | PostProductDispute | PostProductRelevance
    | PostProductRelevance | PostTaxCorrection | PostTaxClassCorrection | StoreActiveHsnList |
    UpdateProductAddToCatalogAdmin | PostPriceBreakShowAdmin | GetMultiSellerlist |
    StoreMultiSellerlist | UpdateNdhAssuredPopularTranding | UpdateProductDimension |
    ResetAdminApprovalStatus | StoreCollection | StoreAdminTrackListing | StoreMerchantTrackListing | ResetMerchantTrackListing |
    StoreCommissionModeSellerCatalog | SellerProductStatusChangeAdmin | SetDefaultSellerAdmin | GetProductVariants | StoreProductVariants;
