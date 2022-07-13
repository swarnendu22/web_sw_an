import * as cartMgmtAction from './../actions/cart-management.action';

export interface CartManagementState {
    allActiveCart: object;
    allAbandonCart: object;
    allCompletedCart: object;
}

export const initialCartManagementState: CartManagementState = {
    allActiveCart: {},
    allAbandonCart: {},
    allCompletedCart: {}
}

export function cartMgmtReducer(state = initialCartManagementState,
    action: cartMgmtAction.CartManagementReducerActions): CartManagementState {

    switch (action.type) {
        case cartMgmtAction.ActionTypes.setActiveCartView: {
            return {
                ...state,
                allActiveCart: action.payload
            };
        }
        case cartMgmtAction.ActionTypes.setAbandonCartView: {
            return {
                ...state,
                allAbandonCart: action.payload
            };
        }
        case cartMgmtAction.ActionTypes.setCompletedCartView: {
            return {
                ...state,
                allCompletedCart: action.payload
            };
        }
        default: {
            return state;
        }
    }

}