import * as manageSellerActions from '../actions/seller-management.action';

export interface sellerState {
    sellers: object;

}
export const initialSellerState: sellerState = {
    sellers: null,
}

export function sellerReducer(state = initialSellerState, action: manageSellerActions.manageSellerActions): sellerState {
    switch (action.type) {
        case manageSellerActions.ActionTypes.storeSellers: {
            return {
                ...state,
                sellers: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
