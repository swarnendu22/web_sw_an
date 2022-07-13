import { Action } from '@ngrx/store';

export enum ActionTypes {
  // Attribute Actions
  getProductSearch = 'getProductSearch',
  storeProductSearch = 'storeProductSearch',
  resetProductSearch = 'resetProductSearch',

  saveProductSearch = 'saveProductSearch',

  storeSelectedProduct = 'storeSelectedProduct',
  saveSelectedProduct = 'saveSelectedProduct',

  getActiveCollections = 'getActiveCollections',
  getInActiveCollections = 'getInActiveCollections',
  getByIdCollection = 'getByIdCollection',
  postCollection = 'postCollections',
  postCollectionProductPosition = 'postCollectionProductPosition',
  deleteCollection = 'deleteCollection',
  updateCollection = 'updateCollection',
  storeCollections = 'storeCollections',
  storeGetByIdCollection = 'storeGetByIdCollection',


  // ============== Start Alakesh Sir API new March 31 2020 ===================
  getNUPCSearchProduct = 'getNUPCSearchProduct',
  storeNUPCSearchProduct = 'storeNUPCSearchProduct',

  getCollectionById = 'getCollectionById',
  storeCollectionById = 'storeCollectionById',
  updateCollectionNew = 'updateCollectionNew',
  postCollectionNew = 'postCollectionNew',

  resetNUPCSearchProduct = 'resetNUPCSearchProduct',

  getProductIdByNUPC = 'getProductIdByNUPC',
  storeProductIdByNUPC = 'storeProductIdByNUPC',
  postNewCollectionNew = 'postNewCollectionNew',
  updateNewCollectionNew = 'updateNewCollectionNew',

  getProductByProductId = 'getProductByProductId',
  storeProductByProductId = 'storeProductByProductId',

  addProductsByCollectionId = 'addProductsByCollectionId',
  storeProductsByCollectionId = 'storeProductsByCollectionId',

  deleteProductOnCollection = 'deleteProductOnCollection',

  getProductsByCollectionId = 'getProductsByCollectionId'



  // ============== End Alakesh Sir API new March 31 2020 ===================

}

// Get Product Search
// ============== Start Alakesh Sir API new March 31 2020 ===================
export class AddProductsByCollectionId implements Action {
  readonly type = ActionTypes.addProductsByCollectionId;
  constructor(public payload: any) { }
}

export class StoreProductsByCollectionId implements Action {
  readonly type = ActionTypes.storeProductsByCollectionId;
  constructor(public payload: object) { }
}

export class GetProductByProductId implements Action {
  readonly type = ActionTypes.getProductByProductId;
  constructor(public payload: any) { }
}

export class StoreProductByProductId implements Action {
  readonly type = ActionTypes.storeProductByProductId;
  constructor(public payload: object) { }
}

export class PostNewCollectionNew implements Action {
  readonly type = ActionTypes.postNewCollectionNew;
  constructor(public payload: object, ) { }
}

export class UpdateNewCollectionNew implements Action {
  readonly type = ActionTypes.updateNewCollectionNew;
  constructor(public payload: object, public id: number) { }
}


export class GetProductIdByNUPC implements Action {
  readonly type = ActionTypes.getProductIdByNUPC;
  constructor(public payload: any) { }
}

export class StoreProductIdByNUPC implements Action {
  readonly type = ActionTypes.storeProductIdByNUPC;
  constructor(public payload: object) { }
}

export class GetCollectionById implements Action {
  readonly type = ActionTypes.getCollectionById;
  constructor(public id: number) { }
}

export class StoreCollectionById implements Action {
  readonly type = ActionTypes.storeCollectionById;
  constructor(public payload: object) { }
}

export class PostCollectionNew implements Action {
  readonly type = ActionTypes.postCollectionNew;
  constructor(public payload: object, ) { }
}

export class UpdateCollectionNew implements Action {
  readonly type = ActionTypes.updateCollectionNew;
  constructor(public payload: object, public id: number) { }
}

export class GetNUPCSearchProduct implements Action {
  readonly type = ActionTypes.getNUPCSearchProduct;
  constructor(public payload: any, public refresh: boolean) { }
}

export class ResetNUPCSearchProduct implements Action {
  readonly type = ActionTypes.resetNUPCSearchProduct;
}

export class StoreNUPCSearchProduct implements Action {
  readonly type = ActionTypes.storeNUPCSearchProduct;
  constructor(public payload: any, public refresh: boolean) { }
}

export class DeleteProductOnCollection implements Action {
  readonly type = ActionTypes.deleteProductOnCollection;
  constructor(public id: number, public collectionId: number) { }
}

export class GetProductsByCollectionId implements Action {
  readonly type = ActionTypes.getProductsByCollectionId;
  constructor(public id: number) { }
}

// ============== End Alakesh Sir API new March 31 2020 ===================


export class GetProductSearch implements Action {
  readonly type = ActionTypes.getProductSearch;
  constructor(public payload: object) { }
}

export class SaveProductSearch implements Action {
  readonly type = ActionTypes.saveProductSearch;
  constructor(public payload: object) { }
}

export class SaveSelectedProduct implements Action {
  readonly type = ActionTypes.saveSelectedProduct;
  constructor(public payload: object) { }
}

export class StoreSelectedProduct implements Action {
  readonly type = ActionTypes.storeSelectedProduct;
  constructor(public payload: object) { }
}

export class StoreProductSearch implements Action {
  readonly type = ActionTypes.storeProductSearch;
  constructor(public payload: any) { }
}

export class ResetProductSearch implements Action {
  readonly type = ActionTypes.resetProductSearch;
}

// Collection Sections

export class GetActiveCollections implements Action {
  readonly type = ActionTypes.getActiveCollections;
  constructor(public status?: string) { }
}

export class GetInActiveCollections implements Action {
  readonly type = ActionTypes.getInActiveCollections;
}

export class PostCollection implements Action {
  readonly type = ActionTypes.postCollection;
  constructor(public payload: object, public position: any) { }
}

export class PostCollectionProductPosition implements Action {
  readonly type = ActionTypes.postCollectionProductPosition;
  constructor(public payload: object, public id: number) { }
}

export class UpdateCollection implements Action {
  readonly type = ActionTypes.updateCollection;
  constructor(
    public payload: object,
    public id: number,
    public position: any
  ) { }
}

export class GetByIdCollection implements Action {
  readonly type = ActionTypes.getByIdCollection;
  constructor(public id: number) { }
}

export class DeleteCollection implements Action {
  readonly type = ActionTypes.deleteCollection;
  constructor(public id: number) { }
}

export class StoreCollections implements Action {
  readonly type = ActionTypes.storeCollections;
  constructor(public payload: object) { }
}

export class StoreGetByIdCollection implements Action {
  readonly type = ActionTypes.storeGetByIdCollection;
  constructor(public payload: object) { }
}

export type collectionActions =
  | StoreProductSearch
  | StoreCollections
  | StoreGetByIdCollection
  | StoreSelectedProduct
  | ResetProductSearch
  | StoreNUPCSearchProduct
  | ResetNUPCSearchProduct
  | StoreCollectionById
  | StoreProductIdByNUPC
  | StoreProductByProductId
  | StoreProductsByCollectionId;
