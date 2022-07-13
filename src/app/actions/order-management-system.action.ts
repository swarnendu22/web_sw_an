import { Action } from '@ngrx/store'

export enum ActionTypes {
  getNewOrders = 'getNewOrders',
  storeNewOrders = 'storeNewOrders',

  getOpenOrders = 'getOpenOrders',
  storeOpenOrders = 'storeOpenOrders',

  getInvoicedOrders = 'getInvoicedOrders',
  storeInvoicedOrders = 'storeInvoicedOrders',
  processInvoiceAdmin = 'processInvoiceAdmin',
  resetSellerOrderToOpenAdmin = 'resetSellerOrderToOpenAdmin',

  acceptSellerOrderAdmin = 'acceptSellerOrderAdmin',

  cancelSellerOrderAdmin = 'cancelSellerOrderAdmin',

  searchSellerAdmin = 'searchSellerAdmin',

  storeSellerAdmin = 'storeSellerAdmin',

  changeSellerAdmin = 'changeSellerAdmin',

  resetSellerOrderToNewAdmin = 'resetSellerOrderToNewAdmin',

  orderRemoveFromNewOrderListAdmin = 'orderRemoveFromNewOrderListAdmin',
  orderRemoveFromOpenOrderListAdmin = 'orderRemoveFromOpenOrderListAdmin',
  orderRemoveFromInvoicedOrderListAdmin = 'orderRemoveFromInvoicedOrderListAdmin',

  getSellerOrderDetailsAdmin = 'getSellerOrderDetailsAdmin',
  storeSellerOrderDetailsAdmin = 'storeSellerOrderDetailsAdmin',

  getCustomerOrdersAdmin = 'getCustomerOrdersAdmin',
  storeCustomerOrdersAdmin = 'storeCustomerOrdersAdmin',

  initiateShipmentSellerOrderAdmin = 'initiateShipmentSellerOrderAdmin',

  getUnderFulfillmentSellerOrderAdmin = 'getUnderFulfillmentSellerOrderAdmin',
  storeUnderFulfillmentSellerOrderAdmin = 'storeUnderFulfillmentSellerOrderAdmin',

  getCompletedSellerOrderAdmin = 'getCompletedSellerOrderAdmin',
  storeCompletedSellerOrderAdmin = 'storeCompletedSellerOrderAdmin',

  getUnsuccessfullSellerOrderAdmin = 'getUnsuccessfullSellerOrderAdmin',
  storeUnsuccessfullSellerOrderAdmin = 'storeUnsuccessfullSellerOrderAdmin',

  getPendingOrderAdmin = 'getPendingOrderAdmin',
  storePendingOrderAdmin = 'storePendingOrderAdmin',

  downloadInvoiceAdmin = 'downloadInvoiceAdmin',
  getIntransitPack = '[Order Management System] Get Intransit Pack',
  storeIntransitPack = '[Order Management System] Store Intransit Pack',

  updateShippingAddress = "updateShippingAddress",
  storeShippingAddress = "storeShippingAddress",

  updateOrder = 'updateOrder',
  updateCompletedOrder = '[ORM] updateCompletedOrder',

  getOmsDashboard = 'getOmsDashboard',
  storeOmsDashboard = 'storeOmsDashboard',

  getOrderReports = 'getOrderReports',
  storeOrderReports = 'storeOrderReports',

  getLiveOrderReport = 'getLiveOrderReport',
  storeLiveOrderReport = 'storeLiveOrderReport'
}
export class GetNewOrders implements Action {
  readonly type = ActionTypes.getNewOrders;
  constructor(public payload: number) { }
}
export class UpdateCompletedOrder implements Action {
  readonly type = ActionTypes.updateCompletedOrder;
  constructor(public payload: any) { }
}
export class StoreNewOrders implements Action {
  readonly type = ActionTypes.storeNewOrders;
  constructor(public payload: object) { }
}
export class GetOpenOrders implements Action {
  readonly type = ActionTypes.getOpenOrders;
  constructor(public payload: number) { }
}
export class StoreOpenOrders implements Action {
  readonly type = ActionTypes.storeOpenOrders;
  constructor(public payload: object) { }
}
export class GetInvoicedOrders implements Action {
  readonly type = ActionTypes.getInvoicedOrders;
  constructor(public payload: number) { }
}
export class StoreInvoicedOrders implements Action {
  readonly type = ActionTypes.storeInvoicedOrders;
  constructor(public payload: object) { }
}

export class AcceptSellerOrderAdmin implements Action {
  readonly type = ActionTypes.acceptSellerOrderAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class CancelSellerOrderAdmin implements Action {
  readonly type = ActionTypes.cancelSellerOrderAdmin;
  constructor(public payload: { sellerOrderId: number, body: object }) { }
}

export class SearchSellerAdmin implements Action {
  readonly type = ActionTypes.searchSellerAdmin;
  constructor(public payload: object) { }
}

export class StoreSellerAdmin implements Action {
  readonly type = ActionTypes.storeSellerAdmin;
  constructor(public payload: object) { }
}

export class ChangeSellerAdmin implements Action {
  readonly type = ActionTypes.changeSellerAdmin;
  constructor(public payload: { sellerOrderId: number, sellerId: number }) { }
}

export class ResetSellerOrderToNewAdmin implements Action {
  readonly type = ActionTypes.resetSellerOrderToNewAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class OrderRemoveFromNewOrderListAdmin implements Action {
  readonly type = ActionTypes.orderRemoveFromNewOrderListAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class OrderRemoveFromOpenOrderListAdmin implements Action {
  readonly type = ActionTypes.orderRemoveFromOpenOrderListAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class OrderRemoveFromInvoicedOrderListAdmin implements Action {
  readonly type = ActionTypes.orderRemoveFromInvoicedOrderListAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class GetSellerOrderDetailsAdmin implements Action {
  readonly type = ActionTypes.getSellerOrderDetailsAdmin;
  constructor(public payload: number, public url: string) { }
}
export class StoreSellerOrderDetailsAdmin implements Action {
  readonly type = ActionTypes.storeSellerOrderDetailsAdmin;
  constructor(public payload: object) { }
}

export class GetCustomerOrdersAdmin implements Action {
  readonly type = ActionTypes.getCustomerOrdersAdmin;
  constructor(public payload: number) { }
}
export class StoreCustomerOrdersAdmin implements Action {
  readonly type = ActionTypes.storeCustomerOrdersAdmin;
  constructor(public payload: object) { }
}

export class ProcessInvoiceAdmin implements Action {
  readonly type = ActionTypes.processInvoiceAdmin;
  constructor(public payload: { sellerOrderId: number, body: object }) { }
}

export class ResetSellerOrderToOpenAdmin implements Action {
  readonly type = ActionTypes.resetSellerOrderToOpenAdmin;
  constructor(public payload: { sellerOrderId: number }) { }
}

export class InitiateShipmentSellerOrderAdmin implements Action {
  readonly type = ActionTypes.initiateShipmentSellerOrderAdmin;
  constructor(public payload: { sellerOrderId: number, body: object }) { }
}

export class GetUnderFulfillmentSellerOrderAdmin implements Action {
  readonly type = ActionTypes.getUnderFulfillmentSellerOrderAdmin;
  constructor(public payload: number) { }
}
export class StoreUnderFulfillmentSellerOrderAdmin implements Action {
  readonly type = ActionTypes.storeUnderFulfillmentSellerOrderAdmin;
  constructor(public payload: object) { }
}

export class GetCompletedSellerOrderAdmin implements Action {
  readonly type = ActionTypes.getCompletedSellerOrderAdmin;
  constructor(public payload: number) { }
}
export class StoreCompletedSellerOrderAdmin implements Action {
  readonly type = ActionTypes.storeCompletedSellerOrderAdmin;
  constructor(public payload: object) { }
}

export class GetUnsuccessfullSellerOrderAdmin implements Action {
  readonly type = ActionTypes.getUnsuccessfullSellerOrderAdmin;
  constructor(public payload: number) { }
}
export class StoreUnsuccessfullSellerOrderAdmin implements Action {
  readonly type = ActionTypes.storeUnsuccessfullSellerOrderAdmin;
  constructor(public payload: object) { }
}

export class GetPendingOrderAdmin implements Action {
  readonly type = ActionTypes.getPendingOrderAdmin;
  constructor(public payload: number) { }
}
export class StorePendingOrderAdmin implements Action {
  readonly type = ActionTypes.storePendingOrderAdmin;
  constructor(public payload: object) { }
}

export class DownloadInvoiceAdmin implements Action {
  readonly type = ActionTypes.downloadInvoiceAdmin;
  constructor(public payload: object) { }
}
export class GetIntransitOrder implements Action {
  readonly type = ActionTypes.getIntransitPack;
  constructor(public payload: any) { }
}
export class StoreIntransitOrder implements Action {
  readonly type = ActionTypes.storeIntransitPack;
  constructor(public payload: any) { }
}

export class UpdateOrder implements Action {
  readonly type = ActionTypes.updateOrder;
  constructor(public payload: any) { }
}

export class UpdateShippingAddress implements Action {
  readonly type = ActionTypes.updateShippingAddress;
  constructor(public payload: any, public orderId: number) { }
}

export class StoreShippingAddress implements Action {
  readonly type = ActionTypes.storeShippingAddress;
  constructor(public payload: any) { }
}


export class GetOmsDashboard implements Action {
  readonly type = ActionTypes.getOmsDashboard;
  constructor(public payload: any) { }
}
export class StoreOmsDashboard implements Action {
  readonly type = ActionTypes.storeOmsDashboard;
  constructor(public payload: object) { }
}

/*Added by mohib on 29/11/2019*/
export class GetOrderReports implements Action {
  readonly type = ActionTypes.getOrderReports;
  constructor(public payload: { page: number, body: any }) { }
}

/*Added by mohib on 29/11/2019*/
export class StoreOrderReports implements Action {
  readonly type = ActionTypes.storeOrderReports;
  constructor(public payload: object) { }
}

export class GetLiveOrderReport implements Action {
  readonly type = ActionTypes.getLiveOrderReport;
  constructor(public payload: { page: number, body: any }) { }
}

/*Added by mohib on 29/11/2019*/
export class StoreLiveOrderReport implements Action {
  readonly type = ActionTypes.storeLiveOrderReport;
  constructor(public payload: object) { }
}

export type OrderManagementSystemReducerActions = StoreNewOrders |
  StoreOpenOrders |
  StoreInvoicedOrders |
  StoreSellerAdmin |
  OrderRemoveFromNewOrderListAdmin |
  OrderRemoveFromOpenOrderListAdmin |
  OrderRemoveFromInvoicedOrderListAdmin |
  StoreSellerOrderDetailsAdmin |
  StoreCustomerOrdersAdmin |
  StoreUnderFulfillmentSellerOrderAdmin |
  StoreCompletedSellerOrderAdmin |
  StoreUnsuccessfullSellerOrderAdmin |
  StorePendingOrderAdmin |
  StoreIntransitOrder |
  UpdateOrder |
  StoreShippingAddress |
  UpdateCompletedOrder | StoreOmsDashboard |
  StoreOrderReports | StoreLiveOrderReport;
