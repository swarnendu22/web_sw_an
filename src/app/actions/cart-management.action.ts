import { Action } from '@ngrx/store';

export enum ActionTypes {
    getActiveCartView = '[GET ACTIVE CART] SHOW ACTIVE CART VIEW',
    setActiveCartView = '[STORE ACTIVE CART] STORE ACTIVE CART',

    getAbandonCartView = '[GET ABANDON CART] SHOW ABANDON CART VIEW',
    setAbandonCartView = '[STORE ABANDON CART] STORE ABANDON CART',

    getCompletedCartView = '[GET COMPLETED CART] GET COMPLETED CART VIEW',
    setCompletedCartView = '[STORE COMPLETED CART] STORE COMPLETED CART VIEW'
}

export class GetActiveCart implements Action {
    readonly type = ActionTypes.getActiveCartView;
}
export class SetActiveCartView implements Action {
    readonly type = ActionTypes.setActiveCartView;
    constructor(public payload: any) { };
}

export class GetAbandonCartView implements Action {
    readonly type = ActionTypes.getAbandonCartView;
}
export class SetAbandonCartView implements Action {
    readonly type = ActionTypes.setAbandonCartView;
    constructor(public payload: any) { };
}

export class GetCompletedCartView implements Action {
    readonly type = ActionTypes.getCompletedCartView;
}
export class SetCompletedCartView implements Action {
    readonly type = ActionTypes.setCompletedCartView;
    constructor(public payload: any) { };
}

export type CartManagementReducerActions = SetActiveCartView | SetAbandonCartView | SetCompletedCartView;