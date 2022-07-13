import { Action } from '@ngrx/store'

export enum ActionTypes {
    getSellers = 'getSellers',
    storeSellers = 'storeSellers',

}
export class GetSellers implements Action {
    readonly type = ActionTypes.getSellers;
}
export class StoreSellers implements Action {
    readonly type = ActionTypes.storeSellers;
    constructor(public payload: object) { }
}


export type manageSellerActions = StoreSellers;
