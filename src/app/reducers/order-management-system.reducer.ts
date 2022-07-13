import * as orderManagementSystemActions from './../actions/order-management-system.action';


export interface OrderManagementSystemState {
  newOrders: object;
  openOrders: object;
  invoicedOrders: object;
  sellers: object;
  sellerOrderDetails: object;
  underFulfillmentOrders: object;
  customerOrders: object;
  completedOrders: any;
  unsuccessfullSellerOrders: object;
  pendingOrders: object;
  intransitOrder: any;
  omsDashboard: object;
  orderReports: object;
  liveOrderReports: object;
}

export const initialOrderManagementSystemState: OrderManagementSystemState = {
  newOrders: null,
  openOrders: null,
  invoicedOrders: null,
  sellers: null,
  sellerOrderDetails: null,
  underFulfillmentOrders: null,
  customerOrders: null,
  completedOrders: null,
  unsuccessfullSellerOrders: null,
  pendingOrders: null,
  intransitOrder: null,
  omsDashboard: null,
  orderReports: null,
  liveOrderReports: null

  // omsDashboard: {
  //   orders_status_count: {
  //     pending_payment: null,
  //     return_approved: null,
  //     return_intransit: null,
  //     in_transit: null,
  //     canceled_by_admin: null,
  //     invoiced: null,
  //     canceled_by_seller: null,
  //     open: null,
  //     new: null,
  //     canceled_by_customer: null,
  //     return_completed: null,
  //     courier_return_initiated: null,
  //     completed: null
  //   },
  //   sla_bridge_order_count: {
  //     new: null,
  //     open: null,
  //     invoiced: null
  //   }
  // },

}

export function orderManagementSystemReducer(state = initialOrderManagementSystemState, action:
  orderManagementSystemActions.OrderManagementSystemReducerActions): OrderManagementSystemState {
  switch (action.type) {
    case orderManagementSystemActions.ActionTypes.storeNewOrders: {
      return {
        ...state,
        newOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeOpenOrders: {
      return {
        ...state,
        openOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeInvoicedOrders: {
      return {
        ...state,
        invoicedOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeSellerAdmin: {
      return {
        ...state,
        sellers: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.orderRemoveFromNewOrderListAdmin: {
      let prevNewSellerOrder = state.newOrders;
      prevNewSellerOrder['orders'] = prevNewSellerOrder['orders'].filter(order => {
        return order.id !== action.payload.sellerOrderId
      })
      return {
        ...state,
        newOrders: prevNewSellerOrder
      };
    }
    case orderManagementSystemActions.ActionTypes.orderRemoveFromOpenOrderListAdmin: {
      let prevOpenSellerOrder = state.openOrders;
      prevOpenSellerOrder['orders'] = prevOpenSellerOrder['orders'].filter(order => {
        return order.id !== action.payload.sellerOrderId
      })
      return {
        ...state,
        openOrders: prevOpenSellerOrder
      };
    }
    case orderManagementSystemActions.ActionTypes.storeSellerOrderDetailsAdmin: {
      console.log('Reducer');
      return {
        ...state,
        sellerOrderDetails: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeCustomerOrdersAdmin: {
      return {
        ...state,
        customerOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.orderRemoveFromInvoicedOrderListAdmin: {
      let prevInvoicedSellerOrders = state.invoicedOrders;
      prevInvoicedSellerOrders['orders'] = prevInvoicedSellerOrders['orders'].filter(order => {
        return order.id !== action.payload.sellerOrderId
      })
      return {
        ...state,
        invoicedOrders: prevInvoicedSellerOrders
      };
    }
    case orderManagementSystemActions.ActionTypes.storeUnderFulfillmentSellerOrderAdmin: {
      return {
        ...state,
        underFulfillmentOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeCompletedSellerOrderAdmin: {
      // let prevOrders = state.completedOrders ? state.completedOrders : action.payload;
      // let currentUpdatedOrder = action.payload;
      // console.log('Complete orders', state.completedOrders)
      // if (state.completedOrders) {
      //   let index = prevOrders['orders'].findIndex(order => order['id'] == action.payload['id']);
      //   console.log('COmpete', prevOrders, index)
      //   prevOrders['orders'][index]['return_request_status'] = action.payload['state'];
      // }
      // console.log('Store', prevOrders)
      return {
        ...state,
        completedOrders: action.payload
      };

    }
    case orderManagementSystemActions.ActionTypes.updateCompletedOrder: {
      console.log('Update Completed Orders', state.completedOrders, action.payload)

      let index = state.completedOrders['orders'].findIndex(order => order['id'] == action.payload['returnable_id']);
      console.log('Update Completed Orders', state.completedOrders, index)
      state.completedOrders['orders'][index]['return_request_status'] = action.payload['state'];
      return {
        ...state,
        completedOrders: state.completedOrders
      };

    }
    case orderManagementSystemActions.ActionTypes.storeUnsuccessfullSellerOrderAdmin: {
      return {
        ...state,
        unsuccessfullSellerOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storePendingOrderAdmin: {
      return {
        ...state,
        pendingOrders: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.storeIntransitPack: {
      return {
        ...state,
        intransitOrder: action.payload
      };
    }
    case orderManagementSystemActions.ActionTypes.updateOrder: {

      if (action.payload['list'] == 'new' && action.payload['acctionType'] == 'changeSeller') {
        let newOrders = state.newOrders
        newOrders['orders'].map((newOrder, index) => {
          if (newOrder['id'] == action.payload['orderId']) {
            newOrders['orders'][index] = action.payload['response']
          }
        })
        return {
          ...state,
          intransitOrder: action.payload
        };
      }
    }
    case orderManagementSystemActions.ActionTypes.storeShippingAddress: {
      let sellerOrderDetails = state.sellerOrderDetails
      sellerOrderDetails['shipping_order_address'] = action.payload
      return {
        ...state,
        sellerOrderDetails: sellerOrderDetails
      };
    }

    case orderManagementSystemActions.ActionTypes.storeOmsDashboard: {

      return {
        ...state,
        omsDashboard: action.payload
      };
    }

    case orderManagementSystemActions.ActionTypes.storeOrderReports: {
      return {
        ...state,
        orderReports: action.payload
      };
    }

    case orderManagementSystemActions.ActionTypes.storeLiveOrderReport: {
      return {
        ...state,
        liveOrderReports: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
