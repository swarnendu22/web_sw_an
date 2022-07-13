
import * as deliveryBoyManagementActions from '../actions/delivery-boy-management.action';

export interface DeliveryBoyManagementState {
    cancelPickupReasons: object;
    cancelPickups: object;
    orderListingByStatus: object;
    orderListingBySearchTerm: object;
    deliveryBoyList: object;
    pendingDEList: object;
    regionsList: object;
    zoneList: object;
    deliveryBoysByStatus: object;
    regionByCountryCodeDynamic: object;
    getAllCountryDE: object;
    commissionSettingsListSearch: object;
    getByIdCommissionSettings: object;
}

export const initialDeliveryBoyMgmtState: DeliveryBoyManagementState = {
    cancelPickupReasons: null,
    cancelPickups: null,
    orderListingByStatus: null,
    orderListingBySearchTerm: null,
    deliveryBoyList: null,
    pendingDEList: null,
    regionsList: null,
    zoneList: null,
    deliveryBoysByStatus: null,
    regionByCountryCodeDynamic: null,
    getAllCountryDE: null,
    commissionSettingsListSearch: null,
    getByIdCommissionSettings: null,
};

// tslint:disable-next-line: max-line-length
export function deliveryBoyMgmtReducer(state = initialDeliveryBoyMgmtState, action: deliveryBoyManagementActions.deliveryBoyManagementActions): DeliveryBoyManagementState {
    switch (action.type) {

        case deliveryBoyManagementActions.ActionTypes.storeAllCountry: {
            return {
                ...state,
                getAllCountryDE: action.payload
            }
        }
        case deliveryBoyManagementActions.ActionTypes.storeRegionsByCountryCodeDynamic: {
            return {
                ...state,
                regionByCountryCodeDynamic: action.payload
            }
        }
        case deliveryBoyManagementActions.ActionTypes.storeDeliveryBoyCancelPickupReasons: {
            return {
                ...state,
                cancelPickupReasons: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeDeliveryBoyCancelPickups: {
            return {
                ...state,
                cancelPickups: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeOrderListingByStatus: {
            return {
                ...state,
                orderListingByStatus: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeOrderListingBySearchTerm: {
            return {
                ...state,
                orderListingBySearchTerm: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeDeliveryBoyList: {
            return {
                ...state,
                deliveryBoyList: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storePendingDEList: {
            return {
                ...state,
                pendingDEList: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeDeliveryBoyByStatus: {
            return {
                ...state,
                deliveryBoysByStatus: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeRegionsByCountryCode: {
            return {
                ...state,
                regionsList: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeZoneByRegionCode: {
            return {
                ...state,
                zoneList: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeListSearchDECommissionSettings: {
            return {
                ...state,
                commissionSettingsListSearch: action.payload
            };
        }
        case deliveryBoyManagementActions.ActionTypes.storeGetByIdCommissionSettings: {
            return {
                ...state,
                getByIdCommissionSettings: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
