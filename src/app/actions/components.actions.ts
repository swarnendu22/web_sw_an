import { Action } from '@ngrx/store';

export enum ActionTypes {
  // Attribute Actions
  getProductCategoryParentSearch = '[Components Actions] Get Product Category Search',
  storeProductCategoryParentSearch = '[Components Actions] Store Product Search '
}
export class GetProductCategoryParentSearch implements Action {
  readonly type = ActionTypes.getProductCategoryParentSearch;
  constructor(public payload: any) { }
}
export class StoreProductCategoryParentSearch implements Action {
  readonly type = ActionTypes.storeProductCategoryParentSearch;
  constructor(public payload: any) { }
}
export type ComponentReducerActions = StoreProductCategoryParentSearch;
