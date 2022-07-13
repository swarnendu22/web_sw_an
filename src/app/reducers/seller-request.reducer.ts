import * as sellerRequestActions from '../actions/seller-request.action';

export interface sellerRequestState {
    linkRequests: object;
    linkRequestDetail: object;


}

export const initialSellerRequestState: sellerRequestState = {
    linkRequests: null,
    linkRequestDetail: null,

}

export function sellerRequestReducer(state = initialSellerRequestState, action: sellerRequestActions.manageSupplyChainActions): sellerRequestState {
    switch (action.type) {

        case sellerRequestActions.ActionTypes.storeLinkRequets: {

            return {
                ...state,
                linkRequests: action.payload
            };
        }
        case sellerRequestActions.ActionTypes.storeRequestDetail: {

            return {
                ...state,
                linkRequestDetail: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
