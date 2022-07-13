import { Action } from '@ngrx/store';

export enum ActionTypes {
  getOrderCancelRequest = '[ReturnCancelRequest Management] getOrderCancelRequest',
  storeOrderCancelRequest = '[ReturnCancelRequest Management] storeOrderCancelRequest',
  postApprovedRejectReturnCancelRequest = '[ReturnCancelRequest Management] postApprovedRejectReturnCancelRequest',
  getOrderCancelRequestById = '[ReturnCancelRequest Management] getOrderCancelRequestById',
  storeOrderCancelRequestById = '[ReturnCancelRequest Management] storeOrderCancelRequestById',
  getAllCancelledOrder = '[Cancelled Order Management] Get All Cancelled Order Data',
  storeAllCancelledOrder = '[Cancelled Order Management] Store All Cancelled Order Data',
  getAllReturnedOrder = '[Returned Order Management] Get All Returned Order Data',
  storeAllReturnedOrder = '[Returned Order Management] Store All Returned Order Data',
  getAllReturnedOrderRequest = '[Returned Order Request Management] Get All Returned Order Request Data',
  storeAllReturnedOrderRequest = '[Returned Order Request Management] Store All Returned Order Request Data',
  rejectOrApproveCancelRequest = 'rejectOrApproveCancelRequest',
  updateRCMList = 'updateRCMList',
  rejectOrApproveReturnRequest = 'rejectOrApproveReturnRequest',
  getAllRefundOrderRequest = '[Returned Order Request Management] Get All Refund Order Request Data',
  storeGetAllRefundOrderRequest = '[Returned Order Request Management] Store Get All Refund Order Request Data',
  getAllRefundOrders = '[Returned Order Request Management] Get All Refund Orders Data',
  storeGetAllRefundOrders = '[Returned Order Request Management] Store Get All Refund Orders Data',
  markAsRefundedOrder = 'markAsRefundedOrder',
  removeFromRefundOrderRequest = 'removeFromRefundOrderRequest',
  getRcmDashboard = 'getRcmDashboard',
  storeRcmDashboard = 'storeRcmDashboard',


}

// Categories
export class GetAllRefundOrders implements Action {
  readonly type = ActionTypes.getAllRefundOrders;
  constructor(public params?: object) { }
}

export class StoreAllRefundOrders implements Action {
  readonly type = ActionTypes.storeGetAllRefundOrders;
  constructor(public payload: object) { }
}

export class GetAllRefundOrderRequest implements Action {
  readonly type = ActionTypes.getAllRefundOrderRequest;
  constructor(public params?: object) { }
}

export class StoreAllRefundOrderRequest implements Action {
  readonly type = ActionTypes.storeGetAllRefundOrderRequest;
  constructor(public payload: object) { }
}

export class GetAllReturnedOrderRequest implements Action {
  readonly type = ActionTypes.getAllReturnedOrderRequest;
  constructor(public params?: object) { }
}

export class StoreAllReturnedOrderRequest implements Action {
  readonly type = ActionTypes.storeAllReturnedOrderRequest;
  constructor(public payload: object) { }
}
export class GetAllReturnedOrder implements Action {
  readonly type = ActionTypes.getAllReturnedOrder;
  constructor(public params?: object) { }
}

export class StoreAllReturnedOrder implements Action {
  readonly type = ActionTypes.storeAllReturnedOrder;
  constructor(public payload: object) { }
}
export class GetAllCancelledOrder implements Action {
  readonly type = ActionTypes.getAllCancelledOrder;
  constructor(public params?: number) { }
}

export class StoreAllCancelledOrder implements Action {
  readonly type = ActionTypes.storeAllCancelledOrder;
  constructor(public payload: object) { }
}

export class GetOrderCancelRequest implements Action {
  readonly type = ActionTypes.getOrderCancelRequest;
  constructor(public params?: object) { }
}

export class StoreOrderCancelRequest implements Action {
  readonly type = ActionTypes.storeOrderCancelRequest;
  constructor(public payload: object) { }
}

export class StoreOrderCancelRequestById implements Action {
  readonly type = ActionTypes.storeOrderCancelRequestById;
  constructor(public payload: object) { }
}
export class PostApprovedRejectReturnCancelRequest implements Action {
  readonly type = ActionTypes.postApprovedRejectReturnCancelRequest;
  constructor(public payload: any, public id: number) { }
}

export class GetOrderCancelRequestById implements Action {
  readonly type = ActionTypes.getOrderCancelRequestById;
  constructor(public id: number) { }
}

export class RejectOrApproveCancelRequest implements Action {
  readonly type = ActionTypes.rejectOrApproveCancelRequest;
  constructor(public payload: { id: number; body: object }) { }
}

export class RejectOrApproveReturnRequest implements Action {
  readonly type = ActionTypes.rejectOrApproveReturnRequest;
  constructor(public payload: { id: number; body: object }) { }
}

export class UpdateRCMList implements Action {
  readonly type = ActionTypes.updateRCMList;
  constructor(public payload: object) { }
}
export class MarkAsRefundedOrder implements Action {
  readonly type = ActionTypes.markAsRefundedOrder;
  constructor(public id: number, public transaction_reference: string) { }
}
export class RemoveFromRefundOrderRequest implements Action {
  readonly type = ActionTypes.removeFromRefundOrderRequest;
  constructor(public payload: any) { }
}

export class GetRcmDashboard implements Action {
  readonly type = ActionTypes.getRcmDashboard;
  constructor(public payload: any) { }
}
export class StoreRcmDashboard implements Action {
  readonly type = ActionTypes.storeRcmDashboard;
  constructor(public payload: object) { }
}

export type returnCancelRequestActions =
  | StoreOrderCancelRequest
  | StoreOrderCancelRequestById
  | StoreAllCancelledOrder
  | StoreAllReturnedOrder
  | StoreAllReturnedOrderRequest
  | UpdateRCMList
  | StoreAllRefundOrderRequest
  | StoreAllRefundOrders
  | MarkAsRefundedOrder
  | RemoveFromRefundOrderRequest
  | StoreRcmDashboard;
