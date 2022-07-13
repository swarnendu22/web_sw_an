import * as sellerOrderActions from '../actions/seller-panel.action';

export interface sellerOrderState {
  newSellerOrder: object;
  openSellerOrder: any;
  invoicedSellerOrder: any;
  manifastedSellerOrder: object;
  inTransitSellerOrder: object;
  completedSellerOrder: object;
  canceledSellerOrder: object;
  returnedSellerOrder: object;
  rtoSellerOrder: object;
  totalNewOrderCount: number;
  completedOrderCount: number;
  returnedOrderCount: number;
  canceledOrderCount: number;
  rtoOrderCount: number;

  new_orders_count: number;
  open_orders_count: number;
  invoiced_orders_count: number;
  manifested_orders_count: number;
  in_transit_orders_count: number;
}
export const initialSellerState: sellerOrderState = {
  newSellerOrder: null,
  openSellerOrder: null,
  invoicedSellerOrder: null,
  manifastedSellerOrder: null,
  inTransitSellerOrder: null,
  completedSellerOrder: null,
  canceledSellerOrder: null,
  returnedSellerOrder: null,
  rtoSellerOrder: null,
  totalNewOrderCount: 0,
  completedOrderCount: 0,
  returnedOrderCount: 0,
  canceledOrderCount: 0,
  rtoOrderCount: 0,
  new_orders_count: 0,
  open_orders_count: 0,
  invoiced_orders_count: 0,
  manifested_orders_count: 0,
  in_transit_orders_count: 0,
}

export function sellerOrderReducer(state = initialSellerState, action: sellerOrderActions.sellerPanel): sellerOrderState {
  switch (action.type) {
    case sellerOrderActions.ActionTypes.storeNewSellerOrder: {
      let prevNewSellerOrder = state.newSellerOrder;
      let updatedNewSellerOrder = null;
      if (state.newSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(order => {
          let uniqCheck = null;
          if (prevNewSellerOrder && prevNewSellerOrder['orders']) {
            uniqCheck = prevNewSellerOrder['orders'].find(orderItem => orderItem['id'] === order['id']);
            if (!uniqCheck) {
              prevNewSellerOrder['orders'].push(order)
            }
          }
        })
        updatedNewSellerOrder = prevNewSellerOrder
      } else {
        updatedNewSellerOrder = action.payload['response']
      }
      return {
        ...state,
        newSellerOrder: updatedNewSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),
        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],
        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeOpenSellerOrder: {
      let prevOpenSellerOrder = state.openSellerOrder;
      let updatedOpenSellerOrder = null;
      if (state.openSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(order => {
          let uniqCheck = null;
          if (prevOpenSellerOrder && prevOpenSellerOrder['orders']) {
            uniqCheck = prevOpenSellerOrder['orders'].find(orderItem => orderItem['id'] === order['id']);
            if (!uniqCheck) {
              prevOpenSellerOrder['orders'].push(order)
            }
          }
        })
        updatedOpenSellerOrder = prevOpenSellerOrder
      } else {
        updatedOpenSellerOrder = action.payload['response']
      }
      return {
        ...state,
        openSellerOrder: updatedOpenSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],

        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeInvoicedSellerOrder: {
      let prevInvoiceSellerOrder = state.invoicedSellerOrder;
      let updatedInvoiceSellerOrder = null;
      if (state.invoicedSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(order => {
          let uniqCheck = null;
          if (prevInvoiceSellerOrder && prevInvoiceSellerOrder['orders']) {
            uniqCheck = prevInvoiceSellerOrder['orders'].find(orderItem => orderItem['id'] === order['id']);
            if (!uniqCheck) {
              prevInvoiceSellerOrder['orders'].push(order)
            }
          }
        })
        updatedInvoiceSellerOrder = prevInvoiceSellerOrder
      } else {
        updatedInvoiceSellerOrder = action.payload['response']
      }
      return {
        ...state,
        invoicedSellerOrder: updatedInvoiceSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],

        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeManifestedSellerOrder: {
      let prevManifastedSellerOrder = state.manifastedSellerOrder;
      let updatedManifastedSellerOrder = null;
      if (prevManifastedSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['packs'].map(pack => {
          let uniqCheck = null;
          if (prevManifastedSellerOrder && prevManifastedSellerOrder['packs']) {
            uniqCheck = prevManifastedSellerOrder['packs'].find(orderItem => orderItem['id'] === pack['id']);
            if (!uniqCheck) {
              prevManifastedSellerOrder['packs'].push(pack)
            }
          }
        })
        updatedManifastedSellerOrder = prevManifastedSellerOrder
      } else {
        updatedManifastedSellerOrder = action.payload['response']
      }
      return {
        ...state,
        manifastedSellerOrder: updatedManifastedSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeInTransitSellerOrder: {
      let prevInTransitSellerOrder = state.inTransitSellerOrder;
      let updatedInTransitSellerOrder = null;
      if (state.inTransitSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(pack => {
          prevInTransitSellerOrder['orders'].push(pack)
        })
        updatedInTransitSellerOrder = prevInTransitSellerOrder
      } else {
        updatedInTransitSellerOrder = action.payload['response']
      }
      return {
        ...state,
        inTransitSellerOrder: updatedInTransitSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeCompletedSellerOrder: {
      let prevCompletedSellerOrder = state.completedSellerOrder;
      let updatedCompletedSellerOrder = null;
      if (state.completedSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(pack => {
          prevCompletedSellerOrder['orders'].push(pack)
        })
        updatedCompletedSellerOrder = prevCompletedSellerOrder
      } else {
        updatedCompletedSellerOrder = action.payload['response']
      }
      return {
        ...state,
        completedSellerOrder: updatedCompletedSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeCanceledSellerOrder: {

      let prevCancelledSellerOrder = state.canceledSellerOrder;
      let updatedCancelledSellerOrder = null;
      if (state.canceledSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(pack => {
          prevCancelledSellerOrder['orders'].push(pack)
        })
        updatedCancelledSellerOrder = prevCancelledSellerOrder
      } else {
        updatedCancelledSellerOrder = action.payload['response']
      }

      return {
        ...state,
        canceledSellerOrder: updatedCancelledSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeReturnedSellerOrder: {



      let prevReturnedSellerOrder = state.returnedSellerOrder;
      let updatedReturnedSellerOrder = null;
      if (state.returnedSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(pack => {
          prevReturnedSellerOrder['orders'].push(pack)
        })
        updatedReturnedSellerOrder = prevReturnedSellerOrder
      } else {

        updatedReturnedSellerOrder = action.payload['response']
      }

      return {
        ...state,
        returnedSellerOrder: updatedReturnedSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.storeRtoSellerOrder: {


      let prevRtoSellerOrder = state.rtoSellerOrder;
      let updatedRtoSellerOrder = null;
      if (state.rtoSellerOrder && action.payload['currentPage'] !== 1) {
        action.payload['response']['orders'].map(pack => {
          prevRtoSellerOrder['orders'].push(pack)
        })
        updatedRtoSellerOrder = prevRtoSellerOrder
      } else {
        updatedRtoSellerOrder = action.payload['response']
      }

      return {
        ...state,
        rtoSellerOrder: updatedRtoSellerOrder,
        totalNewOrderCount: (
          action.payload['response']['total_new_orders_count'] +
          action.payload['response']['total_open_orders_count'] +
          action.payload['response']['invoiced_orders_count'] +
          action.payload['response']['ready_for_shipment_orders_count'] +
          action.payload['response']['total_in_transit_orders_count']
        ),

        new_orders_count: action.payload['response']['total_new_orders_count'],
        open_orders_count: action.payload['response']['total_open_orders_count'],
        invoiced_orders_count: action.payload['response']['invoiced_orders_count'],
        manifested_orders_count: action.payload['response']['ready_for_shipment_orders_count'],
        in_transit_orders_count: action.payload['response']['total_in_transit_orders_count'],


        completedOrderCount: action.payload['response']['total_completed_orders_count'],
        returnedOrderCount: action.payload['response']['total_return_orders_count'],
        canceledOrderCount: action.payload['response']['total_canceled_orders_count'],
        rtoOrderCount: action.payload['response']['total_rto_orders_count']
      };
    }
    case sellerOrderActions.ActionTypes.resetSellerOrder: {
      return {
        ...state,
        manifastedSellerOrder: null,
      };
    }
    case sellerOrderActions.ActionTypes.removeOrderFromList: {
      if (action.payload['list'] == 'new') {
        let prevNewSellerOrder = state.newSellerOrder
        prevNewSellerOrder['orders'] = prevNewSellerOrder['orders'].filter(order => {
          return order.id !== action.payload['orderId']
        })
        return {
          ...state,
          newSellerOrder: prevNewSellerOrder,
          new_orders_count: state.new_orders_count - 1,
          open_orders_count: state.open_orders_count + 1
        };
      } else if (action.payload['list'] == 'open') {
        let prevOpenSellerOrder = state.openSellerOrder
        prevOpenSellerOrder['orders'] = prevOpenSellerOrder['orders'].filter(order => {
          return order.id !== action.payload['orderId']
        })
        return {
          ...state,
          openSellerOrder: prevOpenSellerOrder,
          open_orders_count: state.open_orders_count - 1,
          invoiced_orders_count: state.invoiced_orders_count + 1
        };
      } else if (action.payload['list'] == 'invoice') {
        let prevInvoicedSellerOrder = state.invoicedSellerOrder
        prevInvoicedSellerOrder['orders'] = prevInvoicedSellerOrder['orders'].filter(order => {
          return order.id !== action.payload['orderId']
        })
        return {
          ...state,
          invoicedSellerOrder: prevInvoicedSellerOrder,
          invoiced_orders_count: state.invoiced_orders_count - 1,
          manifested_orders_count: state.manifested_orders_count + 1
        };
      }
      else if (action.payload['list'] == 'manifested') {

        let prevManifastedSellerOrder = state.manifastedSellerOrder;
        prevManifastedSellerOrder['packs'] = prevManifastedSellerOrder['packs'].filter(pack => {
          return pack.pack_id !== action.payload['orderId']
        })

        return {
          ...state,
          manifastedSellerOrder: prevManifastedSellerOrder,
        };

      }

    }
    case sellerOrderActions.ActionTypes.updateAdditionalInfo: {
      let openSellerOrder = state.openSellerOrder;
      let invoicedSellerOrder = state.invoicedSellerOrder;

      openSellerOrder && openSellerOrder['orders'].map(openOrder => {
        if (openOrder['id'] == action.payload['order_id']) {
          openOrder['order_items'].map(orderItem => {
            orderItem['additional_infos'] = action.payload['response']
          })
        }
      })

      invoicedSellerOrder && invoicedSellerOrder['orders'].map(invoiceOrder => {
        if (invoiceOrder['id'] == action.payload['order_id']) {
          invoiceOrder['order_items'].map(orderItem => {
            orderItem['additional_infos'] = action.payload['response']
          })
        }
      })

      // if (action.payload['list'] == 'invoice') {
      //   let invoicedSellerOrder = state.invoicedSellerOrder;
      //   invoicedSellerOrder['orders'] = invoicedSellerOrder['orders'].map(order => {
      //     order['order_items'].map(order_item => {
      //       if (order_item.id != action.payload['order_item_id']) {
      //         order['order_item']['additional_infos'].push(action.payload['response']);
      //       }
      //     });
      //   })

      return {
        ...state,
        openSellerOrder: openSellerOrder,
        invoicedSellerOrder: invoicedSellerOrder
      };
      // }

    }

    case sellerOrderActions.ActionTypes.disableCancelButton: {
      console.log('reducer');
      if (action.payload['list'] == 'new') {
        let prevNewSellerOrder = state.newSellerOrder
        prevNewSellerOrder['orders'].map((order, i) => {
          console.log(order.id, 'Response', action.payload['response']['cancelable_id']);
          if (action.payload['response']['cancelable_type'] == 'SellerOrder') {
            if (order.id == action.payload['response']['cancelable_id']) {
              prevNewSellerOrder['orders'][i]['is_cancel_request_raised'] = true;
            }
          }

        })
        return {
          ...state,
          newSellerOrder: prevNewSellerOrder,
        };
      }
    }
    case sellerOrderActions.ActionTypes.showManifestUploaded: {

      if (action.payload['list'] == 'manifested') {
        let prevManifastedSellerOrder = state.manifastedSellerOrder
        prevManifastedSellerOrder['packs'].map((pack, i) => {
          console.log('reducer', pack.pack_id, 'response', action.payload['packId']);
          if (pack.pack_id == action.payload['packId']) {
            prevManifastedSellerOrder['packs'][i]['pickup_reference'] = action.payload['response']['manifest_order']['pickup_reference'];
          }


        })
        return {
          ...state,
          newSellerOrder: prevManifastedSellerOrder,
        };
      }
    }



    default: {
      return state;
    }
  }
}
