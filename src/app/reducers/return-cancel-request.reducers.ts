import * as returnCancelRequestActions from '../actions/return-cancel-management.action';

export interface returnCancelRequestState {
  getReturnCancelRequest: object;
  getReturnCancelRequestById: object;
  cancelledOrderGet: object;
  returnedOrderGet: object;
  returnedOrderRequestGet: object;
  getRefundOrderRequest: object;
  getRefundOrders: object;
  rcmDashboard: object;
}

export const initialReturnCancelRequestState: returnCancelRequestState = {
  getReturnCancelRequest: null,
  getReturnCancelRequestById: null,
  cancelledOrderGet: {},
  returnedOrderGet: {},
  returnedOrderRequestGet: null,
  getRefundOrderRequest: null,
  getRefundOrders: null,
  rcmDashboard: null,
};

export function returnCancelRequestReducer(
  state = initialReturnCancelRequestState,
  action: returnCancelRequestActions.returnCancelRequestActions
): returnCancelRequestState {
  switch (action.type) {
    case returnCancelRequestActions.ActionTypes.storeOrderCancelRequest: {
      return {
        ...state,
        getReturnCancelRequest: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeOrderCancelRequestById: {
      return {
        ...state,
        getReturnCancelRequestById: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeAllCancelledOrder: {
      return {
        ...state,
        cancelledOrderGet: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeAllReturnedOrder: {
      return {
        ...state,
        returnedOrderGet: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeAllReturnedOrderRequest: {
      return {
        ...state,
        returnedOrderRequestGet: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.updateRCMList: {
      if (action.payload['list'] == 'returnRequest') {
        let prevReturnedOrderRequestPacks = state.returnedOrderRequestGet;
        prevReturnedOrderRequestPacks[
          'return_requests'
        ] = prevReturnedOrderRequestPacks['return_requests'].filter(req => {
          return req.id !== action.payload['requestId'];
        });

        return {
          ...state,
          returnedOrderRequestGet: prevReturnedOrderRequestPacks,
        };
      } else if (action.payload['list'] == 'cancelRequest') {
        let returnCancelRequest = state.getReturnCancelRequest;
        console.log(
          'prevReturnedOrderRequestPacks:::::::',
          returnCancelRequest
        );
        returnCancelRequest['order_cancel_requests'] = returnCancelRequest[
          'order_cancel_requests'
        ].filter(req => {
          return req.id !== action.payload['requestId'];
        });

        return {
          ...state,
          getReturnCancelRequest: returnCancelRequest,
        };
      }
    }
    case returnCancelRequestActions.ActionTypes.storeGetAllRefundOrderRequest: {
      return {
        ...state,
        getRefundOrderRequest: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeGetAllRefundOrders: {
      return {
        ...state,
        getRefundOrders: action.payload,
      };
    }
    case returnCancelRequestActions.ActionTypes.removeFromRefundOrderRequest: {
      let prevRefundOrderRequest = state.getRefundOrderRequest;
      prevRefundOrderRequest['refund_requests'] = prevRefundOrderRequest['refund_requests'].filter(req => {
        return req.id !== action.payload['refund_requests']['id'];
      });

      return {
        ...state,
        getRefundOrderRequest: prevRefundOrderRequest,
      };
    }
    case returnCancelRequestActions.ActionTypes.storeRcmDashboard: {
      return {
        ...state,
        rcmDashboard: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
