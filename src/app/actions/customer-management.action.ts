import { Action } from '@ngrx/store';

export enum ActionTypes {
  getActiveCustomerManagement = '[GET CUSTOMER] SHOW ALL ACTIVE CUSTOMER',
  storeActiveCustomerManagement = '[STORE CUSTOMER] REDUX STORE  ALL ACTIVE CUSTOMER',
  getInActiveCustomerManagement = '[GET INACTIVE CUSTOMER] SHOW ALL INACTIVE CUSTOMER',
  storeInActiveCustomerManagement = '[STORE INACTIVE CUSTOMER] REDUX STORE ALL INACTIVE CUSTOMER',
  getBlockedCustomerManagement = '[GET BLOCKED CUSTOMER] SHOW ALL BLOCKED CUSTOMER',
  storeBlockedCustomerManagement = '[STORE BLOCKED CUSTOMER] REDUX STORE ALL BLOCKED CUSTOMER',
  postCustomerActiveInactive = '[GET CUSTOMER] ACTIVE INACTIVE'
}

export class PostCustomerActiveInactive implements Action {
  readonly type = ActionTypes.postCustomerActiveInactive;
  constructor(public payload: object) { };
}

export class GetActiveCustomerManagement implements Action {
  readonly type = ActionTypes.getActiveCustomerManagement;
}
export class StoreActiveCustomerManagement implements Action {
  readonly type = ActionTypes.storeActiveCustomerManagement;
  constructor(public payload: any) { };
}
export class GetInActiveCustomerManagement implements Action {
  readonly type = ActionTypes.getInActiveCustomerManagement;
}
export class StoreInActiveCustomerManagement implements Action {
  readonly type = ActionTypes.storeInActiveCustomerManagement;
  constructor(public payload: any) { };
}
export class GetBlockedCustomerManagement implements Action {
  readonly type = ActionTypes.getBlockedCustomerManagement;
}
export class StoreBlockedCustomerManagement implements Action {
  readonly type = ActionTypes.storeBlockedCustomerManagement;
  constructor(public payload: any) { };
}
export type CustomerManagementReducerActions = GetActiveCustomerManagement | StoreActiveCustomerManagement |
  GetInActiveCustomerManagement | StoreInActiveCustomerManagement | GetBlockedCustomerManagement |
  StoreBlockedCustomerManagement;
