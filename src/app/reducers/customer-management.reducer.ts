import * as customerManagementActions from './../actions/customer-management.action';


export interface CustomerManagementState {
  activeCustomer: object;
  inActiveCustomer: object;
  blockedCustomer: object;
}
export const initialCustomerManagementState: CustomerManagementState = {
  activeCustomer: {},
  inActiveCustomer: {},
  blockedCustomer: {}
}
export function customerManagementReducer(state = initialCustomerManagementState, action: customerManagementActions.CustomerManagementReducerActions): CustomerManagementState {
  switch (action.type) {
    case customerManagementActions.ActionTypes.storeActiveCustomerManagement: {
      return {
        ...state,
        activeCustomer: action.payload
      };
    }
    case customerManagementActions.ActionTypes.storeInActiveCustomerManagement: {
      return {
        ...state,
        inActiveCustomer: action.payload
      };
    }
    case customerManagementActions.ActionTypes.storeBlockedCustomerManagement: {
      return {
        ...state,
        blockedCustomer: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
