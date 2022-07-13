import { Action } from '@ngrx/store';

export enum ActionTypes {
  getElasticQuery = '[Elastic Query Management] Get Elastic Query List',
  storeElasticQuery = '[Elastic Query Management] Store Elastic Query List',

  getElasticQueryById = '[Elastic Query Management] Get Elastic Query By Id',
  storeElasticQueryById = '[Elastic Query Management] Store Elastic Query By Id',

  createElasticQuery = '[Elastic Query Management] Create Elastic Query',
  editElasticQuery = '[Elastic Query Management] Edit Elastic Query',
  deleteElasticQuery = '[Elastic Query Management] Delete Elastic Query'
}
export class GetElasticQuery implements Action {
  readonly type = ActionTypes.getElasticQuery;
  constructor(public payload?: any) { }
}
export class StoreElasticQuery implements Action {
  readonly type = ActionTypes.storeElasticQuery;
  constructor(public payload: any) { }
}
export class GetElasticQueryById implements Action {
  readonly type = ActionTypes.getElasticQueryById;
  constructor(public payload?: any) { }
}
export class StoreElasticQueryById implements Action {
  readonly type = ActionTypes.storeElasticQueryById;
  constructor(public payload: any) { }
}
export class CreateElasticQuery implements Action {
  readonly type = ActionTypes.createElasticQuery;
  constructor(public payload: any) { }
}
export class EditElasticQuery implements Action {
  readonly type = ActionTypes.editElasticQuery;
  constructor(public payload: any) { }
}
export class DeleteElasticQuery implements Action {
  readonly type = ActionTypes.deleteElasticQuery;
  constructor(public payload: any) { }
}

export type QueryManagementReducerActions =
  StoreElasticQuery | StoreElasticQueryById;