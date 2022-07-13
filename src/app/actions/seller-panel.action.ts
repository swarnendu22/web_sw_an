import { Action } from '@ngrx/store';

export enum ActionTypes {
  getNewSellerOrder = 'getNewSellerOrder',
  storeNewSellerOrder = 'storeNewSellerOrder',
  acceptOrderBySeller = 'acceptOrderBySeller',
  cancelOrderBySeller = 'cancelOrderBySeller',

  getOpenSellerOrder = 'getOpenSellerOrder',
  storeOpenSellerOrder = 'storeOpenSellerOrder',
  processInvoiceSellerOrder = 'processInvoiceSellerOrder',

  getInvoicedSellerOrder = 'getInvoicedSellerOrder',
  storeInvoicedSellerOrder = 'storeInvoicedSellerOrder',

  getManifestedSellerOrder = 'getManifestedSellerOrder',
  storeManifestedSellerOrder = 'storeManifestedSellerOrder',

  getInTransitSellerOrder = 'getInTransitSellerOrder',
  storeInTransitSellerOrder = 'storeInTransitSellerOrder',

  addAditionalInfo = 'addAditionalInfo',
  deleteAditionalInfo = 'deleteAditionalInfo',

  initiateShipment = "initiateShipment",

  getCompletedSellerOrder = "getCompletedSellerOrder",
  storeCompletedSellerOrder = "storeCompletedSellerOrder",

  getCanceledSellerOrder = "getCanceledSellerOrder",
  storeCanceledSellerOrder = "storeCanceledSellerOrder",

  getReturnedSellerOrder = "getReturnedSellerOrder",
  storeReturnedSellerOrder = "storeReturnedSellerOrder",

  getRtoSellerOrder = "getRtoSellerOrder",
  storeRtoSellerOrder = "storeRtoSellerOrder",

  downloadSellerOrderInvoice = "downloadSellerOrderInvoice",

  uploadSellerOrderManifestCopy = "uploadSellerOrderManifestCopy",

  disputPackSellerOrder = "disputPackSellerOrder",

  resetSellerOrder = "resetSellerOrder",

  removeOrderFromList = "removeOrderFromList",
  updateAdditionalInfo = "updateAdditionalInfo",
  disableCancelButton = "disableCancelButton",
  removeDispute = "removeDispute",
  showManifestUploaded = "showManifestUploaded",

}

export class GetNewSellerOrder implements Action {
  readonly type = ActionTypes.getNewSellerOrder;
  constructor(public payload: number) { }
}
export class StoreNewSellerOrder implements Action {
  readonly type = ActionTypes.storeNewSellerOrder;
  constructor(public payload: object) { }
}

export class GetOpenSellerOrder implements Action {
  readonly type = ActionTypes.getOpenSellerOrder;
  constructor(public payload: number) { }
}
export class StoreOpenSellerOrder implements Action {
  readonly type = ActionTypes.storeOpenSellerOrder;
  constructor(public payload: any) { }
}

export class AcceptSellerOrder implements Action {
  readonly type = ActionTypes.acceptOrderBySeller;
  constructor(public payload: object) { }
}

export class CancelSellerOrder implements Action {
  readonly type = ActionTypes.cancelOrderBySeller;
  constructor(public payload: { body: object, orderId: number }) { }
}

export class ProcessInvoiceSellerOrder implements Action {
  readonly type = ActionTypes.processInvoiceSellerOrder;
  constructor(public payload: object) { }
}

export class GetInvoicedSellerOrder implements Action {
  readonly type = ActionTypes.getInvoicedSellerOrder;
  constructor(public payload: number) { }
}
export class StoreInvoicedSellerOrder implements Action {
  readonly type = ActionTypes.storeInvoicedSellerOrder;
  constructor(public payload: any) { }
}

export class GetManifestedSellerOrder implements Action {
  readonly type = ActionTypes.getManifestedSellerOrder;
  constructor(public payload: { page: number, status: string }) { }
}
export class StoreManifestedSellerOrder implements Action {
  readonly type = ActionTypes.storeManifestedSellerOrder;
  constructor(public payload: object) { }
}

export class GetInTransitSellerOrder implements Action {
  readonly type = ActionTypes.getInTransitSellerOrder;
  constructor(public payload: number) { }
}

export class StoreInTransitSellerOrder implements Action {
  readonly type = ActionTypes.storeInTransitSellerOrder;
  constructor(public payload: object) { }
}

export class AddAditionalInfoSellerOrder implements Action {
  readonly type = ActionTypes.addAditionalInfo;
  constructor(public payload: object) { }
}

export class DeleteAditionalInfoSellerOrder implements Action {
  readonly type = ActionTypes.deleteAditionalInfo;
  constructor(public payload: any) { }
}

export class InitiateShipmentSellerOrder implements Action {
  readonly type = ActionTypes.initiateShipment;
  constructor(public payload: object) { }
}

export class GetCompletedSellerOrder implements Action {
  readonly type = ActionTypes.getCompletedSellerOrder;
  constructor(public payload: number) { }
}

export class StoreCompletedSellerOrder implements Action {
  readonly type = ActionTypes.storeCompletedSellerOrder;
  constructor(public payload: object) { }
}

export class GetCanceledSellerOrder implements Action {
  readonly type = ActionTypes.getCanceledSellerOrder;
  constructor(public payload: number) { }
}

export class StoreCanceledSellerOrder implements Action {
  readonly type = ActionTypes.storeCanceledSellerOrder;
  constructor(public payload: object) { }
}

export class GetReturnedSellerOrder implements Action {
  readonly type = ActionTypes.getReturnedSellerOrder;
  constructor(public payload: number) { }
}

export class StoreReturnedSellerOrder implements Action {
  readonly type = ActionTypes.storeReturnedSellerOrder;
  constructor(public payload: object) { }
}

export class GetRtoSellerOrder implements Action {
  readonly type = ActionTypes.getRtoSellerOrder;
  constructor(public payload: number) { }
}

export class StoreRtoSellerOrder implements Action {
  readonly type = ActionTypes.storeRtoSellerOrder;
  constructor(public payload: object) { }
}

export class DownloadSellerOrderInvoice implements Action {
  readonly type = ActionTypes.downloadSellerOrderInvoice;
  constructor(public payload: any) { }
}

export class UploadSellerOrderManifestCopy implements Action {
  readonly type = ActionTypes.uploadSellerOrderManifestCopy;
  constructor(public payload: { packId: number, body: object }) { }
}

export class DisputPackSellerOrder implements Action {
  readonly type = ActionTypes.disputPackSellerOrder;
  constructor(public payload: object) { }
}

export class ResetSellerOrder implements Action {
  readonly type = ActionTypes.resetSellerOrder;
  constructor(public payload: object) { }
}

export class RemoveOrderFromList implements Action {
  readonly type = ActionTypes.removeOrderFromList;
  constructor(public payload: object) { }
}


export class UpdateAdditionalInfo implements Action {
  readonly type = ActionTypes.updateAdditionalInfo;
  constructor(public payload: object) { }
}
export class DisableCancelButton implements Action {
  readonly type = ActionTypes.disableCancelButton;
  constructor(public payload: object) { }
}
export class RemoveDispute implements Action {
  readonly type = ActionTypes.removeDispute;
  constructor(public payload: object) { }
}
export class ShowManifestUploaded implements Action {
  readonly type = ActionTypes.showManifestUploaded;
  constructor(public payload: object) { }
}



export type sellerPanel =
  StoreNewSellerOrder |
  StoreOpenSellerOrder |
  StoreInvoicedSellerOrder |
  StoreManifestedSellerOrder |
  StoreInTransitSellerOrder |
  StoreCompletedSellerOrder |
  StoreCanceledSellerOrder |
  StoreReturnedSellerOrder |
  StoreRtoSellerOrder |
  ResetSellerOrder |
  RemoveOrderFromList |
  UpdateAdditionalInfo |
  DisableCancelButton |
  RemoveDispute |
  ShowManifestUploaded;
