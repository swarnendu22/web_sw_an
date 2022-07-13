import * as identityVerificationActions from '../actions/identity-verification.action';

export interface IdentityVerificationState {
    getAllIdentityState: any;
    activeAndInactiveCustomers: any;
    affiliateUsersReducer: any;
    deUsersReducer: object;
    paymentReconcilationList: object;
    paymentReconcilationDataList: object;
    sellerSettlementList: object;
    sellerSettlementDetailList: object;

}
export const initialIdentityVerificationState: IdentityVerificationState = {
    getAllIdentityState: null,
    activeAndInactiveCustomers: null,
    affiliateUsersReducer: null,
    deUsersReducer: null,
    paymentReconcilationList: null,
    paymentReconcilationDataList: null,
    sellerSettlementList: null,
    sellerSettlementDetailList: null,

};
export function identityVerificationReducer(
    state = initialIdentityVerificationState,
    action: identityVerificationActions.IdentityVerificationReducerActions
): IdentityVerificationState {

    switch (action.type) {

        case identityVerificationActions.ActionTypes.storeIdentityVerificationList: {
            return {
                ...state,
                getAllIdentityState: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storeActiveAndInactiveCustomers: {
            return {
                ...state,
                activeAndInactiveCustomers: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storeAffiliateUsers: {
            return {
                ...state,
                affiliateUsersReducer: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storeDeUsers: {
            return {
                ...state,
                deUsersReducer: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storePaymentReconcilationList: {
            return {
                ...state,
                paymentReconcilationList: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storePaymentReconcilationDataList: {
            return {
                ...state,
                paymentReconcilationDataList: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storeSellerSettlementList: {
            return {
                ...state,
                sellerSettlementList: action.payload
            };
        }
        case identityVerificationActions.ActionTypes.storeSellerSettlementDetailList: {
            return {
                ...state,
                sellerSettlementDetailList: action.payload
            };
        }

    }
}
