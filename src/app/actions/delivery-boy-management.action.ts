import { GetByIdCountry } from './storeManagement.action';
import { Action } from '@ngrx/store';
import { GetRegionByCountryId } from './merchant-management.actions';


export enum ActionTypes {
    getDeliveryBoyCancelPickupReasons = 'getDeliveryBoyCancelPickupReasons',
    storeDeliveryBoyCancelPickupReasons = 'storeDeliveryBoyCancelPickupReasons',

    getDeliveryBoyCancelPickups = 'getDeliveryBoyCancelPickups',
    storeDeliveryBoyCancelPickups = 'storeDeliveryBoyCancelPickups',

    approveRejectDeliveryBoyCancelPickups = 'approveRejectDeliveryBoyCancelPickups',

    orderListingByStatus = 'orderListingByStatus',
    storeOrderListingByStatus = 'storeOrderListingByStatus',

    orderListingBySearchTerm = 'orderListingBySearchTerm',
    storeOrderListingBySearchTerm = 'storeOrderListingBySearchTerm',

    orderStatusChanged = 'orderStatusChanged',
    getDeliveryBoyList = 'getDeliveryBoyList',
    storeDeliveryBoyList = 'storeDeliveryBoyList',

    assignDeliveryBoy = 'assignDeliveryBoy',

    getPendingDEList = 'get pending DE list',
    storePendingDEList = 'store pending DE list',

    updateDeliveryBoyStatus = 'updateDeliveryBoyStatus',
    storeChangeDeliveryBoyStatus = 'storeChangeDeliveryBoyStatus',

    deliveryBoyForceAction = 'deliveryBoyForceAction',

    deliveryBoyRegistration = 'deliveryBoyRegistration',

    getRegionsByCountryCode = 'getRegionsByCountryCode',
    storeRegionsByCountryCode = 'storeRegionsByCountryCode',

    getZoneByRegionCode = 'getZoneByRegionCode',
    storeZoneByRegionCode = 'storeZoneByRegionCode',

    getDeliveryBoyByStatus = 'getDeliveryBoyByStatus',
    storeDeliveryBoyByStatus = 'storeDeliveryBoyByStatus',

    broadcastMessageDeliveryBoys = 'broadcastMessageDeliveryBoys',
    addCommentToOrderHistory = 'addCommentToOrderHistory',

    getRegionsByCountryCodeDynamic = 'getRegionsByCountryCodeDynamic',
    storeRegionsByCountryCodeDynamic = 'RegionsByCountryCodeDynamic',

    getAllCountry = 'getAllCountry',
    storeAllCountry = 'storeAllCountry',

    // commission Settings
    listSearchDECommissionSettings = 'listSearchDECommissionSettings',
    storeListSearchDECommissionSettings = 'StoreListSearchDECommissionSettings',

    addNewCommissionSettings = 'addNewCommissionSettings',
    updateCommissionSettings = 'updateCommissionSettings',
    getByIdCommissionSettings = 'getByIdCommissionSettings',
    storeGetByIdCommissionSettings = 'storeGetByIdCommissionSettings',
    assignTrainingToDeliveryBoy = 'assignTrainingToDeliveryBoy',
    certifyDeliveryBoy = 'certifyDeliveryBoy',
    scheduleDeliveryBoy = 'scheduleDeliveryBoy',
    updateDeMerchandiseInventory = 'updateDeMerchandiseInventory',

}
export class GetAllCountry implements Action {
    readonly type = ActionTypes.getAllCountry;
}
export class StoreAllCountry implements Action {
    readonly type = ActionTypes.storeAllCountry;
    constructor(public payload: object) { }
}
export class GetRegionsByCountryCodeDynamic implements Action {
    readonly type = ActionTypes.getRegionsByCountryCodeDynamic;
    constructor(public payload: object) { }
}


export class StoreRegionsByCountryCodeDynamic implements Action {
    readonly type = ActionTypes.storeRegionsByCountryCodeDynamic;
    constructor(public payload: object) { }
}


export class GetDeliveryBoyCancelPickupReasons implements Action {
    readonly type = ActionTypes.getDeliveryBoyCancelPickupReasons;
}
export class StoreDeliveryBoyCancelPickupReasons implements Action {
    readonly type = ActionTypes.storeDeliveryBoyCancelPickupReasons;
    constructor(public payload: object) { }
}


export class GetDeliveryBoyCancelPickups implements Action {
    readonly type = ActionTypes.getDeliveryBoyCancelPickups;
    constructor(public payload?: object) { }
}
export class StoreDeliveryBoyCancelPickups implements Action {
    readonly type = ActionTypes.storeDeliveryBoyCancelPickups;
    constructor(public payload: object) { }
}

export class ApproveRejectDeliveryBoyCancelPickups implements Action {
    readonly type = ActionTypes.approveRejectDeliveryBoyCancelPickups;
    constructor(public payload: object, public id: any) { }
}

export class OrderListingByStatus implements Action {
    readonly type = ActionTypes.orderListingByStatus;
    constructor(public payload: object) { }
}
export class StoreOrderListingByStatus implements Action {
    readonly type = ActionTypes.storeOrderListingByStatus;
    constructor(public payload: object) { }
}
export class OrderListingBySearchTerm implements Action {
    readonly type = ActionTypes.orderListingBySearchTerm;
    constructor(public payload: object) { }
}
export class StoreOrderListingBySearchTerm implements Action {
    readonly type = ActionTypes.storeOrderListingBySearchTerm;
    constructor(public payload: object) { }
}

export class OrderStatusChanged implements Action {
    readonly type = ActionTypes.orderStatusChanged;
    constructor(public payload: object) { }
}

export class GetDeliveryBoyList implements Action {
    readonly type = ActionTypes.getDeliveryBoyList;
    constructor(public payload: object) { }
}
export class StoreDeliveryBoyList implements Action {
    readonly type = ActionTypes.storeDeliveryBoyList;
    constructor(public payload: object) { }
}

export class AssignDeliveryBoy implements Action {
    readonly type = ActionTypes.assignDeliveryBoy;
    constructor(public payload: object) { }
}

export class GetPendingDEList implements Action {
    readonly type = ActionTypes.getPendingDEList;
    constructor(public payload: object) { }
}
export class StorePendingDEList implements Action {
    readonly type = ActionTypes.storePendingDEList;
    constructor(public payload: object) { }
}

export class UpdateDeliveryBoyStatus implements Action {
    readonly type = ActionTypes.updateDeliveryBoyStatus;
    constructor(public payload: object) { }
}

export class StoreChangeDeliveryBoyStatus implements Action {
    readonly type = ActionTypes.storeChangeDeliveryBoyStatus;
    constructor(public payload: object) { }
}

export class DeliveryBoyForceAction implements Action {
    readonly type = ActionTypes.deliveryBoyForceAction;
    constructor(public payload: object) { }
}

export class DeliveryBoyRegistration implements Action {
    readonly type = ActionTypes.deliveryBoyRegistration;
    constructor(public payload: object) { }
}

export class GetRegionsByCountryCode implements Action {
    readonly type = ActionTypes.getRegionsByCountryCode;
}
export class StoreRegionsByCountryCode implements Action {
    readonly type = ActionTypes.storeRegionsByCountryCode;
    constructor(public payload: object) { }
}

export class GetDeliveryBoyByStatus implements Action {
    readonly type = ActionTypes.getDeliveryBoyByStatus;
    constructor(public payload: any) { }


}
export class StoreDeliveryBoyByStatus implements Action {
    readonly type = ActionTypes.storeDeliveryBoyByStatus;
    constructor(public payload: object) { }
}

export class GetZoneByRegionCode implements Action {
    readonly type = ActionTypes.getZoneByRegionCode;
    constructor(public payload: object) { }
}
export class StoreZoneByRegionCode implements Action {
    readonly type = ActionTypes.storeZoneByRegionCode;
    constructor(public payload: object) { }
}

export class BroadCastMessageDeliveryBoys implements Action {
    readonly type = ActionTypes.broadcastMessageDeliveryBoys;
    constructor(public payload: object) { }
}
export class AddCommentToOrderHistory implements Action {
    readonly type = ActionTypes.addCommentToOrderHistory;
    constructor(public payload: object) { }
}

export class ListSearchDECommissionSettings implements Action {
    readonly type = ActionTypes.listSearchDECommissionSettings;
    constructor(public payload?: object) { }
}
export class StoreListSearchDECommissionSettings implements Action {
    readonly type = ActionTypes.storeListSearchDECommissionSettings;
    constructor(public payload: object) { }
}

export class AddNewCommissionSettings implements Action {
    readonly type = ActionTypes.addNewCommissionSettings;
    constructor(public payload: object) { }
}

export class UpdateCommissionSettings implements Action {
    readonly type = ActionTypes.updateCommissionSettings;
    constructor(public payload: object) { }
}
export class GetByIdCommissionSettings implements Action {
    readonly type = ActionTypes.getByIdCommissionSettings;
    constructor(public payload: object) { }
}
export class StoreGetByIdCommissionSettings implements Action {
    readonly type = ActionTypes.storeGetByIdCommissionSettings;
    constructor(public payload: object) { }
}

export class AssignTrainingToDeliveryBoy implements Action {
    readonly type = ActionTypes.assignTrainingToDeliveryBoy;
    constructor(public payload: any) { }
}
export class CertifyDeliveryBoy implements Action {
    readonly type = ActionTypes.certifyDeliveryBoy;
    constructor(public payload: any) { }
}
export class ScheduleDeliveryBoy implements Action {
    readonly type = ActionTypes.scheduleDeliveryBoy;
    constructor(public payload: any) { }
}
export class UpdateDeMerchandiseInventory implements Action {
    readonly type = ActionTypes.updateDeMerchandiseInventory;
    constructor(public payload: any) { }
}


export type deliveryBoyManagementActions =
    | StoreDeliveryBoyCancelPickupReasons
    | StoreDeliveryBoyCancelPickups
    | StoreOrderListingByStatus
    | StoreOrderListingBySearchTerm
    | StoreDeliveryBoyList
    | StorePendingDEList
    | StoreChangeDeliveryBoyStatus
    | StoreRegionsByCountryCode
    | StoreDeliveryBoyByStatus
    | StoreZoneByRegionCode
    | StoreRegionsByCountryCodeDynamic
    | StoreAllCountry
    | StoreListSearchDECommissionSettings
    | StoreGetByIdCommissionSettings
    | AssignTrainingToDeliveryBoy
    | CertifyDeliveryBoy
    | ScheduleDeliveryBoy
    | UpdateDeMerchandiseInventory
    ;
