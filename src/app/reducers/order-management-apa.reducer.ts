import * as orderManagementApaActions from '../actions/order-management-apa.action';

export interface OrderManagementState {
    ecomShipmentOrders: object;
    hyperlocalShipmentOrders: object;
    allOrders: object;
    paymentLinkOrders: object;
    allOrdersDetail: object;
    storeTrackOrderDetails: object;
}

export const initialOrderManagementState: OrderManagementState = {
    ecomShipmentOrders: null,
    hyperlocalShipmentOrders: null,
    allOrders: null,
    paymentLinkOrders: null,
    allOrdersDetail: null,
    storeTrackOrderDetails: null
};

export function orderManagementApaReducer(state = initialOrderManagementState, action: orderManagementApaActions.OrderManagementApaActions): OrderManagementState {
    switch (action.type) {
        case orderManagementApaActions.ActionTypes.storeEcomShipmentOrders: {
            return {
                ...state,
                ecomShipmentOrders: action.payload
            };
        }
        case orderManagementApaActions.ActionTypes.storeHyperLocalShipmentOrders: {
            return {
                ...state,
                hyperlocalShipmentOrders: action.payload
            };
        }
        case orderManagementApaActions.ActionTypes.storeAllOrders: {
            return {
                ...state,
                allOrders: action.payload
            };
        }
        case orderManagementApaActions.ActionTypes.storePaymentLinkOrders: {
            return {
                ...state,
                paymentLinkOrders: action.payload
            };
        }
        case orderManagementApaActions.ActionTypes.storeAllOrdersDetail: {
            return {
                ...state,
                allOrdersDetail: action.payload
            };
        }
        case orderManagementApaActions.ActionTypes.storeTrackOrders: {
            return {
                ...state,
                storeTrackOrderDetails: action.payload
            };
        }
        

        default: {
            return state;
        }
    }
}
