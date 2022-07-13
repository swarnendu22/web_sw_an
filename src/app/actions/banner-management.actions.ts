import { Action } from '@ngrx/store';

export enum ActionTypes {
  getUiTemplateComponents = '[Banner Management] Get Ui Template Components List',
  storeUiTemplateComponents = '[Banner Management] Store Ui Template Components List',

  getUiTemplateComponentById = '[Banner Management] Get Ui template Component By Id',
  storeUiTemplateComponentById = '[Banner Management] Store Ui template Component By Id',

  createNewUiTemplateComponent = '[Banner Management] Post Ui Template Component',
  editUiTemplateComponent = '[Banner Management] Edit Ui Template Component',
  deleteUiTemplateComponent = '[Banner Management] Delete Ui Template Component',
  getFlashSalesList = 'getFlashSalesList',
  storeFlashSalesList = 'storeFlashSalesList',
  createFlashSale = 'createFlashSale',
  scheduleFlashSale = 'scheduleFlashSale',
  getFlashSalesDetails = 'getFlashSalesDetails',
  storeFlashSalesDetails = 'storeFlashSalesDetails',
}
export class GetUiTemplateComponents implements Action {
  readonly type = ActionTypes.getUiTemplateComponents;
  constructor(public payload?: any) { }
}
export class StoreUiTemplateComponents implements Action {
  readonly type = ActionTypes.storeUiTemplateComponents;
  constructor(public payload?: any) { }
}

export class GetUiTemplateComponentById implements Action {
  readonly type = ActionTypes.getUiTemplateComponentById;
  constructor(public payload?: any) { }
}
export class StoreUiTemplateComponentById implements Action {
  readonly type = ActionTypes.storeUiTemplateComponentById;
  constructor(public payload?: any) { }
}
export class CreateNewUiTemplateComponent implements Action {
  readonly type = ActionTypes.createNewUiTemplateComponent;
  constructor(public payload?: any) { }
}
export class EditUiTemplateComponent implements Action {
  readonly type = ActionTypes.editUiTemplateComponent;
  constructor(public payload?: any) { }
}
export class DeleteUiTemplateComponent implements Action {
  readonly type = ActionTypes.deleteUiTemplateComponent;
  constructor(public payload?: any) { }
}

export class GetFlashSalesList implements Action {
  readonly type = ActionTypes.getFlashSalesList;

}
export class StoreFlashSalesList implements Action {
  readonly type = ActionTypes.storeFlashSalesList;
  constructor(public payload?: any) { }
}

export class CreateFlashSale implements Action {
  readonly type = ActionTypes.createFlashSale;
  constructor(public payload?: any) { }
}
export class ScheduleFlashSale implements Action {
  readonly type = ActionTypes.scheduleFlashSale;
  constructor(public payload?: any) { }
}

export class GetFlashSalesDetails implements Action {
  readonly type = ActionTypes.getFlashSalesDetails;
  constructor(public id?: number) { }
}
export class StoreFlashSalesDetails implements Action {
  readonly type = ActionTypes.storeFlashSalesDetails;
  constructor(public payload?: any) { }
}


export type BannerManagementReducerActions =
  StoreUiTemplateComponents | StoreUiTemplateComponentById | StoreFlashSalesList | StoreFlashSalesDetails;
