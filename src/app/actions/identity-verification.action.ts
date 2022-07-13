import { Action } from '@ngrx/store';

export enum ActionTypes {
    getIdentityVerificationList = '[getIdentityVerificationList] Get All Identity Verification List',
    storeIdentityVerificationList = '[storeIdentityVerificationList] Store All Identity Verification List',
    approveRejectIdentityVerification = '[approveRejectIdentityVerification] Approve Or Reject Identity Verification',
    getActiveAndInactiveCustomers = '[getActiveAndInactiveCustomers] Get Active And Inactive Customers',
    storeActiveAndInactiveCustomers = '[storeActiveAndInactiveCustomers] Store Active And Inactive Customers',
    getAffiliateUsers = '[getAffiliateCustomers] Get All Affiliate Users',
    storeAffiliateUsers = '[storeAffiliateUsers] Store All Affiliate Users',
    approveRejectDeUsers = '[approveRrejectDeUsers] Approve Reject De Users',
    getDeUsers = '[getDeUsers] Get De Users',
    storeDeUsers = '[storeDeUsers] Store De Users',
    uploadPaymentReconcilationCsv = '[uploadPaymentReconcilationCsv] uploadPaymentReconcilationCsv',
    getPaymentReconcilationList = '[getPaymentReconcilationList] getPaymentReconcilationList',
    storePaymentReconcilationList = '[storePaymentReconcilationList] storePaymentReconcilationList',
    storePaymentReconcilationDataList = '[storePaymentReconcilationDataList] storePaymentReconcilationDataList',
    getPaymentReconcilationDataList = '[getPaymentReconcilationDataList] getPaymentReconcilationDataList',
    getSellerSettlementList = '[getSellerSettlementList] getSellerSettlementList',
    storeSellerSettlementList = '[storeSellerSettlementList] storeSellerSettlementList',
    createSellerSettlement = '[createSellerSettlement] createSellerSettlement',
    getSellerSettlementDetailList = '[getSellerSettlementDetailList] getSellerSettlementDetailList',
    storeSellerSettlementDetailList = '[storeSellerSettlementDetailList] storeSellerSettlementDetailList',
    uploadSellerSettlementBankFile = '[uploadSellerSettlementBankFile] uploadSellerSettlementBankFile',
    manulaSettelmentAction = '[manualSellelment] manualSettelmentForm',

}
export class GetDeUsers implements Action {
    readonly type = ActionTypes.getDeUsers;
    constructor(public payload: any) {
        console.log("GET delivery users Action:::::::::::", payload)
    }
}
export class StoreDeUsers implements Action {
    readonly type = ActionTypes.storeDeUsers;
    constructor(public payload: any) { }
}
export class ApproveRejectDeUsers implements Action {
    readonly type = ActionTypes.approveRejectDeUsers;
    constructor(public payload: any) { }
}
export class GetAllAffiliateUsersList implements Action {
    readonly type = ActionTypes.getAffiliateUsers;
    constructor(public pageNo: number, public payload: any) { }
}
export class StoreAllAffiliateUsersList implements Action {
    readonly type = ActionTypes.storeAffiliateUsers;
    constructor(public payload: any) { }
}
export class GetAllIdentityVerificationList implements Action {
    readonly type = ActionTypes.getIdentityVerificationList;
    constructor(public payload: any) { }
}

export class StoreAllIdentityVerificationList implements Action {
    readonly type = ActionTypes.storeIdentityVerificationList;
    constructor(public payload: any) { }
}

export class ApproveRejectIdentityVerification implements Action {
    readonly type = ActionTypes.approveRejectIdentityVerification;
    constructor(public payload: any) { }
}

export class GetActiveAndInactiveCustomers implements Action {
    readonly type = ActionTypes.getActiveAndInactiveCustomers;
    constructor(public pageNo: number, public payload: any) { }
}

export class StoreActiveAndInactiveCustomers implements Action {
    readonly type = ActionTypes.storeActiveAndInactiveCustomers;
    constructor(public payload: any) { }
}

export class UploadPaymentReconcilationCsv implements Action {
    readonly type = ActionTypes.uploadPaymentReconcilationCsv;
    constructor(public payload: any) { }
}
export class GetPaymentReconcilationList implements Action {
    readonly type = ActionTypes.getPaymentReconcilationList;
    constructor(public payload: any, public pageNo: number) { }
}
export class StorePaymentReconcilationList implements Action {
    readonly type = ActionTypes.storePaymentReconcilationList;
    constructor(public payload: any) { }
}
export class GetPaymentReconcilationDataList implements Action {
    readonly type = ActionTypes.getPaymentReconcilationDataList;
    constructor(public payload: any) { }
}
export class StorePaymentReconcilationDataList implements Action {
    readonly type = ActionTypes.storePaymentReconcilationDataList;
    constructor(public payload: any) { }
}


export class GetSellerSettlementList implements Action {
    readonly type = ActionTypes.getSellerSettlementList;
    constructor(public payload: any, public pageNo: number) { }
}
export class StoreSellerSettlementList implements Action {
    readonly type = ActionTypes.storeSellerSettlementList;
    constructor(public payload: any) { }
}

export class CreateSellerSettlement implements Action {
    readonly type = ActionTypes.createSellerSettlement;
    constructor(public payload: any) { }
}

export class GetSellerSettlementDetailList implements Action {
    readonly type = ActionTypes.getSellerSettlementDetailList;
    constructor(public id: number) { }
}
export class StoreSellerSettlementDetailList implements Action {
    readonly type = ActionTypes.storeSellerSettlementDetailList;
    constructor(public payload: any) { }
}

export class UploadSellerSettlementBankFile implements Action {
    readonly type = ActionTypes.uploadSellerSettlementBankFile;
    constructor(public payload: any, public id: number) { }
}

export class SubmitManualSettelment implements Action {
    readonly type = ActionTypes.manulaSettelmentAction;
    constructor(public payload: any) {}
}



export type IdentityVerificationReducerActions = StoreAllIdentityVerificationList | StoreActiveAndInactiveCustomers
    | StoreAllAffiliateUsersList | StoreDeUsers | StorePaymentReconcilationList | StorePaymentReconcilationDataList
    | StoreSellerSettlementList | CreateSellerSettlement | StoreSellerSettlementDetailList | UploadSellerSettlementBankFile
    ;
