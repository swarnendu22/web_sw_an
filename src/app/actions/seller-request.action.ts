import { Action } from '@ngrx/store'

export enum ActionTypes {
    getLinkRequets = 'getLinkRequets',
    storeLinkRequets = 'storeLinkRequets',
    getRequestDetail = 'getRequestDetail',
    storeRequestDetail = 'storeRequestDetail',
    postApproveRequest = 'postApproveRequest',
    postRejectRequest = 'postRejectRequest',
    putClosedRequest = 'putClosedRequest'

}
export class GetLinkRequets implements Action {
    readonly type = ActionTypes.getLinkRequets;
    constructor(public payload: any) { }

}
export class StoreLinkRequets implements Action {
    readonly type = ActionTypes.storeLinkRequets;
    constructor(public payload: object) { }
}
export class GetRequestDetail implements Action {
    readonly type = ActionTypes.getRequestDetail;
    constructor(public payload: any) { }

}
export class StoreRequestDetail implements Action {
    readonly type = ActionTypes.storeRequestDetail;
    constructor(public payload: object) { }
}
export class PostApproveRequest implements Action {
    readonly type = ActionTypes.postApproveRequest;
    constructor(public url: string) { }
}
export class PostRejectRequest implements Action {
    readonly type = ActionTypes.postRejectRequest;
    constructor(public url: string, public payload: any) { }
}
export class PutClosedRequest implements Action {
    readonly type = ActionTypes.putClosedRequest;
    constructor(public url: string, public payload: any) { }
}



export type manageSupplyChainActions = StoreLinkRequets | StoreRequestDetail | PostApproveRequest | PostRejectRequest;