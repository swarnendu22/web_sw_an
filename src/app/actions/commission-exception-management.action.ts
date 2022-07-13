import { Action } from '@ngrx/store'

export enum ActionTypes {
    getCommisionexceptions = 'getCommisionexceptions',
    storeCommissionExceptions = 'storeCommissionExceptions',
    getCommissionGroup = 'getCommissionGroup',
    storeCommissionGroup = 'storeCommissionGroup',
    getProductExceptions = 'getProductExceptions',
    storeProductExceptions = 'storeProductExceptions',
    postNewProductException = 'postNewProductException',
    getCommissionExceptionDetails = 'getCommissionExceptionDetails',
    storeCommissionExceptionDetails = 'storeCommissionExceptionDetails',
    resetCommissionExceptionDetails = 'resetCommissionExceptionDetails',
    updateNewProductException = 'updateNewProductException',

    getProducts = 'getProducts',
    storeProducts = 'storeProducts',
    postSaveProductException = 'postSaveProductException',
    getProductExceptionDetail = 'getproductExceptionDetail',
    storeProductExceptionDetail = 'storeProductExceptionDetail',
    updateSaveProductException = 'updateSaveProductException',

    getViewSpecificCommissionGroupDetail = 'getViewSpecificCommissionGroupDetail',
    storeViewSpecificCommissionGroupDetail = 'storeViewSpecificCommissionGroupDetail',
    updateCommissionGroup = 'updateCommissionGroup',

    getCategoryTreeData = 'getCategoryTreeData',
    storeCategoryTreeData = 'storeCategoryTreeData',
    getPendingException = 'getPendingException',
    storePendingException = 'storePendingException',

    updateCommissionGroupTree = 'updateCommissionGroupTree',
    approveRejectException = 'approveRejectException',
    approveRejectProductException = 'approveRejectProductException',

    getAgentSchemes = 'getAgentSchemes',
    storeAgentSchemes = 'storeAgentSchemes',
    addAgentSchemes = 'addAgentSchemes',
    getAgentSchemesDetail = 'getAgentSchemesDetail',
    storeAgentSchemesDetail = 'storeAgentSchemesDetail',
    updateAgentSchemes = 'updateAgentSchemes',
    getSearchProductNupcOrName = 'getSearchProductNupcOrName',
    storeSearchProductNupcOrName = 'storeSearchProductNupcOrName',
    postCommissionException = 'postCommissionException',
    updateCommissionException = 'updateCommissionException',
    checkProductNupc = 'checkProductNupc',
    storeProductNupc = 'storeProductNupc',

}
export class GetCommisionexceptions implements Action {
    readonly type = ActionTypes.getCommisionexceptions;
}
export class StoreCommissionExceptions implements Action {
    readonly type = ActionTypes.storeCommissionExceptions;
    constructor(public payload: object) { }
}
export class GetCommisioneGroup implements Action {
    readonly type = ActionTypes.getCommissionGroup;
}
export class StoreCommissionGroup implements Action {
    readonly type = ActionTypes.storeCommissionGroup;
    constructor(public payload: object) { }
}
export class GetProductExceptions implements Action {
    readonly type = ActionTypes.getProductExceptions;
}
export class StoreProductExceptions implements Action {
    readonly type = ActionTypes.storeProductExceptions;
    constructor(public payload: object) { }
}


export class PostNewProductException implements Action {
    readonly type = ActionTypes.postNewProductException;
    constructor(public payload: any) { }
}

export class GetViewSpecificCommissionGroupDetail implements Action {
    readonly type = ActionTypes.getViewSpecificCommissionGroupDetail;
    constructor(public payload: any) { }
}

export class StoreViewSpecificCommissionGroupDetail implements Action {
    readonly type = ActionTypes.storeViewSpecificCommissionGroupDetail;
    constructor(public payload: any) { }
}

export class ResetCommissionExceptionDetails implements Action {
    readonly type = ActionTypes.resetCommissionExceptionDetails;
}

export class UpdateNewProductException implements Action {
    readonly type = ActionTypes.updateNewProductException;
    constructor(public payload: any, public id: any) { }
}


export class GetProducts implements Action {
    readonly type = ActionTypes.getProducts;

}

export class StoreProducts implements Action {
    readonly type = ActionTypes.storeProducts;
    constructor(public payload: any) { }
}

export class PostSaveProductException implements Action {
    readonly type = ActionTypes.postSaveProductException;
    constructor(public payload: any) { }
}

export class GetProductExceptionDetail implements Action {
    readonly type = ActionTypes.getProductExceptionDetail;
    constructor(public payload: any) { }
}

export class StoreProductExceptionDetail implements Action {
    readonly type = ActionTypes.storeProductExceptionDetail;
    constructor(public payload: any) { }
}

export class UpdateSaveProductException implements Action {
    readonly type = ActionTypes.updateSaveProductException;
    constructor(public payload: any, public id: any) { }
}
export class UpdateCommissionException implements Action {
    readonly type = ActionTypes.updateCommissionException;
    constructor(public payload: any, public id: number, public commissiontype: string) { }
}



export class GetCommsionExceptionDetails implements Action {
    readonly type = ActionTypes.getCommissionExceptionDetails;
    constructor(public payload: any) { }
}

export class StoreStoreExceptionDetails implements Action {
    readonly type = ActionTypes.storeCommissionExceptionDetails;
    constructor(public payload: any) { }
}

export class UpdateCommissionGroup implements Action {
    readonly type = ActionTypes.updateCommissionGroup;
    constructor(public payload: any) { }
}




export class GetcategoryTreeData implements Action {
    readonly type = ActionTypes.getCategoryTreeData;
    constructor(public payload: any) { }
}

export class StoreCategoryTreeData implements Action {
    readonly type = ActionTypes.storeCategoryTreeData;
    constructor(public payload: any) { }
}



export class UpdateCommissionGroupTree implements Action {
    readonly type = ActionTypes.updateCommissionGroupTree;
    constructor(public payload: any, public method: any) { }
}


export class GetPendingException implements Action {
    readonly type = ActionTypes.getPendingException;

}

export class StorePendingException implements Action {
    readonly type = ActionTypes.storePendingException;
    constructor(public payload: any) { }
}
export class ApproveRejectException implements Action {
    readonly type = ActionTypes.approveRejectException;
    constructor(public payload: any, public requestId: any) { }
}
export class ApproveRejectProductException implements Action {
    readonly type = ActionTypes.approveRejectProductException;
    constructor(public payload: any, public requestId: any) { }
}


export class GetAgentSchemes implements Action {
    readonly type = ActionTypes.getAgentSchemes;
}

export class StoreAgentSchemes implements Action {
    readonly type = ActionTypes.storeAgentSchemes;
    constructor(public payload: any) { }
}
export class AddAgentSchemes implements Action {
    readonly type = ActionTypes.addAgentSchemes;
    constructor(public payload: any) { }
}

export class GetAgentSchemesDetail implements Action {
    readonly type = ActionTypes.getAgentSchemesDetail;
    constructor(public id: number) { }
}

export class StoreAgentSchemesDetail implements Action {
    readonly type = ActionTypes.storeAgentSchemesDetail;
    constructor(public payload: any) { }
}

export class UpdateAgentSchemes implements Action {
    readonly type = ActionTypes.updateAgentSchemes;
    constructor(public payload: any, public id: number) { }
}

export class GetSearchProductNupcOrName implements Action {
    readonly type = ActionTypes.getSearchProductNupcOrName;
    constructor(public payload: any, public refresh: boolean) { }

}

export class StoreSearchProductNupcOrName implements Action {
    readonly type = ActionTypes.storeSearchProductNupcOrName;
    constructor(public payload: any, public refresh: boolean) { }
}

export class CheckProductNupc implements Action {
    readonly type = ActionTypes.checkProductNupc;
    constructor(public payload: string) { }

}

export class StoreProductNupc implements Action {
    readonly type = ActionTypes.storeProductNupc;
    constructor(public payload: any) { }
}

export class PostCommissionException implements Action {
    readonly type = ActionTypes.postCommissionException;
    constructor(public payload: any, public commissiontype: string) { }
}

export type manageCommisionExceptionActions = StoreCommissionExceptions | StoreStoreExceptionDetails |
    ResetCommissionExceptionDetails | UpdateNewProductException | StorePendingException | ApproveRejectException
    | StoreAgentSchemes | AddAgentSchemes | StoreAgentSchemesDetail | UpdateAgentSchemes |
    StoreSearchProductNupcOrName | StoreProductNupc;

export type manageCommisionGroupActions = StoreCommissionGroup | StoreViewSpecificCommissionGroupDetail |
    UpdateCommissionGroup | StoreCategoryTreeData | UpdateCommissionGroupTree;

export type manageProductExceptionActions = StoreProductExceptions | StoreProducts | PostSaveProductException
    | StoreProductExceptionDetail | UpdateSaveProductException | ApproveRejectProductException;
