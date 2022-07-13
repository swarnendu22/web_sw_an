import { Action } from '@ngrx/store'

export enum ActionTypes {
    getShipmentOrdersDetail = 'getShipmentOrdersDetail',
    storeShipmentOrdersDetail = 'storeShipmentOrdersDetail',
    getEcomShipmentOrders = 'getEcomShipmentOrders',
    storeEcomShipmentOrders = 'storeEcomShipmentOrders',
    getAllOrders = 'getAllOrders',
    storeAllOrders = 'storeAllOrders',
    getAllOrdersDetail = 'getAllOrdersDetail',
    storeAllOrdersDetail = 'storeAllOrdersDetail',
    postOrderStatusUpdate = 'postOrderStatusUpdate',
    getPaymentLinkOrders = 'getPaymentLinkOrders',
    storePaymentLinkOrders = 'storePaymentLinkOrders',
    trackOrders = 'trackOrderDetails',
    storeTrackOrders = "storeTrackOrders",
    cancelOrderShipment = 'cancelOrderShipment',

    getHyperLocalShipmentOrders = 'getHyperLocalShipmentOrders',
    storeHyperLocalShipmentOrders = 'storeHyperLocalShipmentOrders',
    getAllHyperLocalOrdersDetail = 'getAllHyperLocalOrdersDetail',
    hyperlocalBulkCancelation = 'hyperlocalBulkCancelation',

}
export class CancelOrderShipment implements Action {
    readonly type = ActionTypes.cancelOrderShipment;
    constructor(public payload: any) { 
        console.log(payload)
    }
}   
export class GetEcomShipmentOrders implements Action {
    readonly type = ActionTypes.getEcomShipmentOrders;
    constructor(public payload: any) { }
}
export class StoreEcomShipmentOrders implements Action {
    readonly type = ActionTypes.storeEcomShipmentOrders;
    constructor(public payload: any) { }
}

export class GetHyperLocalShipmentOrders implements Action {
    readonly type = ActionTypes.getHyperLocalShipmentOrders;
    constructor(public payload: any) { }
}
export class StoreHyperLocalShipmentOrders implements Action {
    readonly type = ActionTypes.storeHyperLocalShipmentOrders;
    constructor(public payload: any) { }
}

export class HyperlocalBulkCancelation implements Action {
    readonly type = ActionTypes.hyperlocalBulkCancelation;
    constructor(public payload: any) { }
}

export class GetAllOrders implements Action {
    readonly type = ActionTypes.getAllOrders;
    constructor(public payload: any) { }
}

export class TrackOrders implements Action {
    readonly type = ActionTypes.trackOrders;
    constructor(public payload: any) { }
}
export class StoreTrackOrders implements Action {
    readonly type = ActionTypes.storeTrackOrders;
    constructor(public payload: any) { }
}

export class StoreAllOrders implements Action {
    readonly type = ActionTypes.storeAllOrders;
    constructor(public payload: any) { }
}
export class GetPaymentLinkOrders implements Action {
    readonly type = ActionTypes.getPaymentLinkOrders;
    constructor(public payload: any) { }
}
export class StorePaymentLinkOrders implements Action {
    readonly type = ActionTypes.storePaymentLinkOrders;
    constructor(public payload: any) { }
}
export class GetAllOrdersDetail implements Action {
    readonly type = ActionTypes.getAllOrdersDetail;
    constructor(public id: number) { }
}
export class StoreAllOrdersDetail implements Action {
    readonly type = ActionTypes.storeAllOrdersDetail;
    constructor(public payload: any) { }
}

export class GetAllHyperLocalOrdersDetail implements Action {
    readonly type = ActionTypes.getAllHyperLocalOrdersDetail;
    constructor(public payload: any ) { }
}

export class PostOrderStatusUpdate implements Action {
    readonly type = ActionTypes.postOrderStatusUpdate;
    constructor(public payload: any) { }
}
export class GetShipmentOrdersDetail implements Action {
    readonly type = ActionTypes.getShipmentOrdersDetail;
    constructor(public id: number) { }
}
export class StoreShipmentOrdersDetail implements Action {
    readonly type = ActionTypes.storeShipmentOrdersDetail;
    constructor(public payload: any) { }
}
export type OrderManagementApaActions = StoreAllOrders | StoreAllOrdersDetail | StorePaymentLinkOrders | StoreTrackOrders | StoreEcomShipmentOrders | StoreHyperLocalShipmentOrders | StoreShipmentOrdersDetail;