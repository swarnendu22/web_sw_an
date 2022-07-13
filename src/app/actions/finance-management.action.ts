import { Action } from '@ngrx/store';

export enum ActionTypes {
    getPaymentPendingReconciliation = 'getPaymentPendingReconciliation',
    storePaymentPendingReconciliation = 'storePaymentPendingReconciliation',
    postPaymentPendingReconciliation = 'postPaymentPendingReconciliation',
    updateReconcileStatus = 'updateReconcileStatus',
    removeReconcileFromList = 'removeReconcileFromList',
}

export class GetPaymentPendingReconciliation implements Action {
    readonly type = ActionTypes.getPaymentPendingReconciliation;
    constructor(public payload: any, public refresh: boolean) { }
}
export class StorePaymentPendingReconciliation implements Action {
    readonly type = ActionTypes.storePaymentPendingReconciliation;
    constructor(public payload: any, public refresh: boolean) { }
}
export class PostPaymentPendingReconciliation implements Action {
    readonly type = ActionTypes.postPaymentPendingReconciliation;
    constructor(public payload: any, public refresh: boolean) { }
}
export class UpdateReconcileStatus implements Action {
    readonly type = ActionTypes.updateReconcileStatus;
    constructor(public payload: any, public tabname: string) { }
}
export class RemoveReconcileFromList implements Action {
    readonly type = ActionTypes.removeReconcileFromList;
    constructor(public payload: any) { }
}

export type manageFinanceManagementActions =
    | GetPaymentPendingReconciliation
    | StorePaymentPendingReconciliation
    | PostPaymentPendingReconciliation
    | UpdateReconcileStatus
    | RemoveReconcileFromList;
