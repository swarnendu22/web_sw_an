import { Action } from '@ngrx/store'

export enum ActionTypes {
  getActiveBrands = 'getActiveBrands',
  storeActiveBrands = 'storeActiveBrands',

  getActiveBrandsElastic = 'getActiveBrandsElastic',
  storeActiveBrandsElastic = 'storeActiveBrandsElastic',

  getGlobalBrandsElastic = 'getGlobalBrandsElastic',
  storeGlobalBrandsElastic = 'storeGlobalBrandsElastic',

  getInactiveBrand = 'getInactiveBrands',
  storeInactiveBrands = 'storeInactiveBrands',
  getPendingBrands = 'getPendingBrands',
  storePendingBrands = 'storePendingBrands',
  postNewBrandOwner = 'submitNewBrandOwnerRequest',
  getBrandOwnerList = 'getBrandOwnerList',
  storeBrandOwnerList = 'storeBrandOwnerList',
  postNewBrand = 'submitNewBrandRequest',
  postNewBrandApproved = 'postNewBrandApproved',
  getBrandDeatails = 'getBrandDetailsRequest',
  storeBrandDeatails = 'storeBrandDetails',
  rejectPendingBrandRequest = 'rejectPendingBrandRequest',
  approvePendingBrandRequest = 'approvePendingBrandRequest',
  resetBrandDetails = 'resetBrandDetails',
  changeSizeChart = 'changeSizeChart',
  getActiveStoreBrands = 'getActiveStoreBrands',
  storeActiveStoreBrands = 'storeActiveStoreBrands',
  postvalidateBrand = 'postvalidateBrand',
}
export class GetActiveBrands implements Action {
  readonly type = ActionTypes.getActiveBrands;
  constructor(public status?: string) { }
}
export class StoreActiveBrands implements Action {
  readonly type = ActionTypes.storeActiveBrands;
  constructor(public payload: object) { }
}

export class GetActiveBrandsElastic implements Action {
  readonly type = ActionTypes.getActiveBrandsElastic;
  constructor(public payload: object) { }
}
export class StoreActiveBrandsElastic implements Action {
  readonly type = ActionTypes.storeActiveBrandsElastic;
  constructor(public payload: object) { }
}

export class GetGlobalBrandsElastic implements Action {
  readonly type = ActionTypes.getGlobalBrandsElastic;
  constructor(public payload: object) { }
}
export class StoreGlobalBrandsElastic implements Action {
  readonly type = ActionTypes.storeGlobalBrandsElastic;
  constructor(public payload: any) { }
}

export class GetInactiveBrands implements Action {
  readonly type = ActionTypes.getInactiveBrand;
}
export class StoreInactiveBrands implements Action {
  readonly type = ActionTypes.storeInactiveBrands;
  constructor(public payload: object) { }
}
export class GetPendingBrands implements Action {
  readonly type = ActionTypes.getPendingBrands;
}
export class StorePendingBrands implements Action {
  readonly type = ActionTypes.storePendingBrands;
  constructor(public payload: object) { }
}
export class PostNewBrandOwner implements Action {
  readonly type = ActionTypes.postNewBrandOwner;
  constructor(public payload: any) { }
}
export class GetBrandOwnerList implements Action {
  readonly type = ActionTypes.getBrandOwnerList;
  constructor(public payload: any) { }
}
export class StoreBrandOwnerList implements Action {
  readonly type = ActionTypes.storeBrandOwnerList;
  constructor(public payload: any) { }
}
export class PostNewBrand implements Action {
  readonly type = ActionTypes.postNewBrand;
  constructor(public payload: any) { }
}
export class PostNewBrandApproved implements Action {
  readonly type = ActionTypes.postNewBrandApproved;
  constructor(public payload: any) { }
}
export class GetBrandDetails implements Action {
  readonly type = ActionTypes.getBrandDeatails;
  constructor(public payload: any) { }
}
export class StoreBrandDetails implements Action {
  readonly type = ActionTypes.storeBrandDeatails;
  constructor(public payload: any) { }
}
export class RejectPendingCategory implements Action {
  readonly type = ActionTypes.rejectPendingBrandRequest;
  constructor(public payload: any) { }
}
export class ApprovePendingCategory implements Action {
  readonly type = ActionTypes.approvePendingBrandRequest;
  constructor(public payload: any) { }
}
export class ResetBrandDetails implements Action {
  readonly type = ActionTypes.resetBrandDetails;
  constructor(public payload: any) { }
}
export class ChangeSizeChart implements Action {
  readonly type = ActionTypes.changeSizeChart;
  constructor(public payload: any, public relationId: number) { }
}
export class GetActiveStoreBrands implements Action {
  readonly type = ActionTypes.getActiveStoreBrands;
  constructor(public payload: any) { }
}
export class StoreActiveStoreBrands implements Action {
  readonly type = ActionTypes.storeActiveStoreBrands;
  constructor(public payload: any) { }
}
export class PostvalidateBrand implements Action {
  readonly type = ActionTypes.postvalidateBrand;
  constructor(public payload: any) { }
}
export type manegeBrandActions =
  StoreActiveBrands |
  StoreActiveBrandsElastic |
  StoreInactiveBrands |
  StorePendingBrands |
  StoreBrandDetails | ResetBrandDetails | StoreActiveStoreBrands | StoreBrandOwnerList | StoreGlobalBrandsElastic;
