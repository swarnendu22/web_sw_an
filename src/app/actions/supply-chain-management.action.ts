import { Action } from '@ngrx/store';

export enum ActionTypes {
  getOpenOrdersSCM = 'getOpenOrdersSCM',
  storeOpenOrdersSCM = 'storeOpenOrdersSCM',
  getManifestedPacks = 'getManifestedPacks',
  storeManifestedPacks = 'storeManifestedPacks',
  getInTransitPacks = 'getInTransitPacks',
  storeInTransitPacks = 'storeInTransitPacks',
  getDelieveredPacks = 'getDelieveredPacks',
  storeDelieveredPacks = 'storeDelieveredPacks',
  getDisputedPacks = 'getDisputedPacks',
  storeDisputedPacks = 'storeDisputedPacks',
  cancellPack = 'cancellPack',
  packRemoveFromListAdmin = 'packRemoveFromListAdmin',
  createManifestPackAdmin = 'createManifestPackAdmin',
  raiseDisput = 'raiseDisput',
  processIntransit = 'processIntransit',
  resolveDisput = 'resolveDisput',
  processOpenAdmin = 'processOpenAdmin',
  updatePackList = 'updatePackList',
  processToPickupPackAdmin = 'processToPickupPackAdmin',
  cancellPickUpPack = 'cancellPickUpPack',
  processToIntransitPack = 'processToIntransitPack',
  resetToPickupPackAdmin = 'resetToPickupPackAdmin',
  processRtoPackAdmin = 'processRtoPackAdmin',
  processDeliverPackAdmin = 'ProcessDeliverPackAdmin',
  createRetuntRequestAdmin = 'createRetuntRequestAdmin',
  getRTOPackAdmin = 'getRTOPackAdmin',
  getRTOPackIntransitAdmin = 'getRTOPackIntransitAdmin',
  getRTOPackCompleteAdmin = 'getRTOPackCompleteAdmin',

  updateRTOPackIntransitAdmin = '[Supply Chain Management] updateRTOPackIntransitAdmin',
  updateRTOPackCompleteAdmin = '[Supply Chain Management] updateRTOPackCompleteAdmin',

  storeRTOPackAdmin = 'storeRTOPackAdmin',
  storeRTOPackInTransitAdmin = 'storeRTOPackInTransitAdmin',
  storeRTOPackCompleteAdmin = 'storeRTOPackCompleteAdmin',

  updateStoreRTOPackInTransitAdmin = 'Update StoreRTOPackInTransitAdmin',
  updateStoreRTOPackCompleteAdmin = 'update StoreRTOPackCompleteAdmin',

  createAutoShipment = 'createAutoShipment',
  getReversePickup = '[Supply Chain Management] Get Reverse Pickup Data',
  storeGetReversePickup = '[Supply Chain Management] Store Get Reverse Pickup Data',

  updateReversePickup = '[Supply Chain Management] UpdateReverse Pickup Data',
  storeUpdateReversePickup = '[Supply Chain Management] storeUpdate Pickup Data',
  getShippingAcccount = 'getShippingAcccount',
  storeShippingAcccount = 'storeShippingAcccount',
  calculateShipperPrice = 'calculateShipperPrice',
  storeShipperPrice = 'storeShipperPrice',
  getScmDashboard = 'getScmDashboard',
  storeScmDashboard = 'storeScmDashboard',
}

export class UpdateRTOPackIntransitAdmin implements Action {
  readonly type = ActionTypes.updateRTOPackIntransitAdmin;
  constructor(public payload: object) {
  }

}
export class UpdateRTOPackCompleteAdmin implements Action {
  readonly type = ActionTypes.updateRTOPackCompleteAdmin;
  constructor(public payload: object) {
  }

}

export class UpdateReversePickupSCM implements Action {
  readonly type = ActionTypes.updateReversePickup;
  constructor(public payload: object) {
  }

}

export class GetReversePickupSCM implements Action {
  readonly type = ActionTypes.getReversePickup;
  constructor(public params?: any) { }
}
export class StoreReversePickupSCM implements Action {
  readonly type = ActionTypes.storeGetReversePickup;
  constructor(public payload: object) { }
}

export class StoreUpdateReversePickupSCM implements Action {
  readonly type = ActionTypes.storeUpdateReversePickup;
  constructor(public payload: object) { }
}

export class GetOpenOrdersSCM implements Action {
  readonly type = ActionTypes.getOpenOrdersSCM;
  constructor(public payload: any) { }
}
export class StoreOpenOrdersSCM implements Action {
  readonly type = ActionTypes.storeOpenOrdersSCM;
  constructor(public payload: object) { }
}
export class GetManifestedPacks implements Action {
  readonly type = ActionTypes.getManifestedPacks;
  constructor(public payload: any) { }
}
export class StoreManifestedPacks implements Action {
  readonly type = ActionTypes.storeManifestedPacks;
  constructor(public payload: object) { }
}
export class GetInTransitPacks implements Action {
  readonly type = ActionTypes.getInTransitPacks;
  constructor(public payload: any) { }
}
export class StoreInTransitPacks implements Action {
  readonly type = ActionTypes.storeInTransitPacks;
  constructor(public payload: object) { }
}

export class GetDelieveredPacks implements Action {
  readonly type = ActionTypes.getDelieveredPacks;
  constructor(public payload: any) { }
}
export class StoreDelieveredPacks implements Action {
  readonly type = ActionTypes.storeDelieveredPacks;
  constructor(public payload: object) { }
}
export class GetDisputedPacks implements Action {
  readonly type = ActionTypes.getDisputedPacks;
  constructor(public payload: any) { }
}
export class StoreDisputedPacks implements Action {
  readonly type = ActionTypes.storeDisputedPacks;
  constructor(public payload: object) { }
}

export class CancellPack implements Action {
  readonly type = ActionTypes.cancellPack;
  constructor(public payload: object) { }
}

export class PackRemoveFromListAdmin implements Action {
  readonly type = ActionTypes.packRemoveFromListAdmin;
  constructor(public payload: object) { }
}

export class CreateManifestPackAdmin implements Action {
  readonly type = ActionTypes.createManifestPackAdmin;
  constructor(public payload: object) { }
}

export class RaiseDisput implements Action {
  readonly type = ActionTypes.raiseDisput;
  constructor(public payload: object) { }
}

export class ProcessIntransit implements Action {
  readonly type = ActionTypes.processIntransit;
  constructor(public payload: object) { }
}

export class ResolveDisput implements Action {
  readonly type = ActionTypes.resolveDisput;
  constructor(public payload: object) { }
}

export class ProcessOpenAdmin implements Action {
  readonly type = ActionTypes.processOpenAdmin;
  constructor(public payload: object) { }
}

export class UpdatePackList implements Action {
  readonly type = ActionTypes.updatePackList;
  constructor(public payload: object) { }
}

export class ProcessToPickupPackAdmin implements Action {
  readonly type = ActionTypes.processToPickupPackAdmin;
  constructor(public payload: object) { }
}

export class CancellPickUpPack implements Action {
  readonly type = ActionTypes.cancellPickUpPack;
  constructor(public payload: number) { }
}

export class ProcessToIntransitPack implements Action {
  readonly type = ActionTypes.processToIntransitPack;
  constructor(public payload: object) { }
}

export class ResetToPickupPackAdmin implements Action {
  readonly type = ActionTypes.resetToPickupPackAdmin;
  constructor(public payload: number) { }
}

export class ProcessRtoPackAdmin implements Action {
  readonly type = ActionTypes.processRtoPackAdmin;
  constructor(public payload: object) { }
}

export class ProcessDeliverPackAdmin implements Action {
  readonly type = ActionTypes.processDeliverPackAdmin;
  constructor(public payload: object) { }
}

export class CreateRetuntRequestAdmin implements Action {
  readonly type = ActionTypes.createRetuntRequestAdmin;
  constructor(public payload: object) { }
}

export class GetRTOPackAdmin implements Action {
  readonly type = ActionTypes.getRTOPackAdmin;
  constructor(public payload?: any) { }
}

export class GetRTOPackIntransitAdmin implements Action {
  readonly type = ActionTypes.getRTOPackIntransitAdmin;
  constructor(public payload?: any) { }
}

export class GetRTOPackCompleteAdmin implements Action {
  readonly type = ActionTypes.getRTOPackCompleteAdmin;
  constructor(public payload?: any) { }
}

export class StoreRTOPackAdmin implements Action {
  readonly type = ActionTypes.storeRTOPackAdmin;
  constructor(public payload: object) { }
}

export class StoreRTOPackInTransitAdmin implements Action {
  readonly type = ActionTypes.storeRTOPackInTransitAdmin;
  constructor(public payload: any) { }
}

export class StoreRTOPackCompleteAdmin implements Action {
  readonly type = ActionTypes.storeRTOPackCompleteAdmin;
  constructor(public payload: any) { }
}

export class UpdateStoreRTOPackInTransitAdmin implements Action {
  readonly type = ActionTypes.updateStoreRTOPackInTransitAdmin;
  constructor(public payload: any) { }
}

export class UpdateStoreRTOPackCompleteAdmin implements Action {
  readonly type = ActionTypes.updateStoreRTOPackCompleteAdmin;
  constructor(public payload: any) { }
}

export class CreateAutoShipment implements Action {
  readonly type = ActionTypes.createAutoShipment;
  constructor(public payload: object) { }
}
export class GetShippingAcccount implements Action {
  readonly type = ActionTypes.getShippingAcccount;

}
export class StoreShippingAcccount implements Action {
  readonly type = ActionTypes.storeShippingAcccount;
  constructor(public payload: object) { }
}
export class CalculateShipperPrice implements Action {
  readonly type = ActionTypes.calculateShipperPrice;
  constructor(public payload: any) { }
}
export class StoreShipperPrice implements Action {
  readonly type = ActionTypes.storeShipperPrice;
  constructor(public payload: any) { }
}

export class GetScmDashboard implements Action {
  readonly type = ActionTypes.getScmDashboard;
  constructor(public payload: any) { }

}
export class StoreScmDashboard implements Action {
  readonly type = ActionTypes.storeScmDashboard;
  constructor(public payload: object) { }
}



export type manageSupplyChainActions =
  | StoreOpenOrdersSCM
  | StoreManifestedPacks
  | StoreInTransitPacks
  | StoreDelieveredPacks
  | StoreDisputedPacks
  | PackRemoveFromListAdmin
  | UpdatePackList
  | ProcessToPickupPackAdmin
  | CancellPickUpPack
  | ProcessToIntransitPack
  | ResetToPickupPackAdmin
  | ProcessRtoPackAdmin
  | ProcessDeliverPackAdmin
  | CreateRetuntRequestAdmin
  | StoreRTOPackAdmin
  | StoreReversePickupSCM
  | StoreShippingAcccount
  | GetShippingAcccount
  | CalculateShipperPrice
  | StoreShipperPrice
  | StoreUpdateReversePickupSCM
  | StoreRTOPackInTransitAdmin
  | StoreRTOPackCompleteAdmin
  | UpdateStoreRTOPackInTransitAdmin
  | UpdateStoreRTOPackCompleteAdmin
  | StoreScmDashboard;
