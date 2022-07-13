import * as financeManagementActions from '../actions/finance-management.action';


export interface FinanceManagementState {
    pendingReconsilation: object;
}

export const initialFinanceState: FinanceManagementState = {
    pendingReconsilation: {
        list: [],
        total_pages: null,
        current_selected_page: null,
        per_page: null,
        total_items_count: null
    },
}

export function manageFinanceReducer(state = initialFinanceState, action: financeManagementActions.manageFinanceManagementActions): FinanceManagementState {
    switch (action.type) {

        // case financeManagementActions.ActionTypes.storePaymentPendingReconciliation: {

        //     state.pendingReconsilation['list'] = action.payload['payment_reconcillations'];
        //     state.pendingReconsilation['total_pages'] = action.payload['total_pages'];
        //     state.pendingReconsilation['current_selected_page'] = action.payload['current_selected_page'];
        //     state.pendingReconsilation['per_page'] = action.payload['per_page'];
        //     state.pendingReconsilation['total_items_count'] = action.payload['total_items_count'];

        //     return {
        //         ...state,
        //     };
        // }
        case financeManagementActions.ActionTypes.storePaymentPendingReconciliation: {
            let prevPendingReconsilation = state.pendingReconsilation['list'];
            let updatedPendingReconsilation = null;
            if (state.pendingReconsilation['list'].length > 0 && (action.refresh == false)) {
                prevPendingReconsilation.push(...action.payload);
                updatedPendingReconsilation = prevPendingReconsilation;
            }
            else {
                updatedPendingReconsilation = action.payload;
            }
            state.pendingReconsilation['list'] = updatedPendingReconsilation;
            return {
                ...state,
            };
        }
        case financeManagementActions.ActionTypes.removeReconcileFromList: {

            let prevPendingReconsilation = state.pendingReconsilation['list'];
            prevPendingReconsilation = prevPendingReconsilation.filter(item => {
                console.log(action.payload.payload.id, '---', item.id);
                return action.payload.payload.id != item.id
            });

            state.pendingReconsilation['list'] = prevPendingReconsilation;
            return {
                ...state,
            };

        }
    }
}