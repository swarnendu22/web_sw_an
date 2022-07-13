import { GetStoreKeywords, StoreStoreDeliverySettings } from './../../../actions/merchant-management.actions';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as deliveryBoyManagementActions from 'src/app/actions/delivery-boy-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DeliveryBoyManagementEffects {
    constructor(private request: RequestService, private actions$: Actions, private apiMessageService: ApiMessageService, private dialog: MatDialog) { }

    @Effect()
    getDeliveryBoyCancelPickupReasons$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetDeliveryBoyCancelPickupReasons>(
            deliveryBoyManagementActions.ActionTypes.getDeliveryBoyCancelPickupReasons
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/delivery_boy_cancel_pickup_reasons`,
                method: 'get',
            },
                true, false
            ).pipe(map((res: any) =>
                new deliveryBoyManagementActions.StoreDeliveryBoyCancelPickupReasons(res))
            )
        }
        )
    );
    @Effect()
    getDeliveryBoyCancelPickups$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetDeliveryBoyCancelPickups>(
            deliveryBoyManagementActions.ActionTypes.getDeliveryBoyCancelPickups
        ),
        switchMap(({ payload }) => {
            let status = payload['status'] ? `?status=${payload['status']}` : ''
            return this.request.request({
                url: `/api/delivery-admin-ms/delivery_boy_cancel_pickups${status}`,
                method: 'get',
            },
                true, false
            ).pipe(map((res: any) =>
                new deliveryBoyManagementActions.StoreDeliveryBoyCancelPickups(res))
            )
        }
        )
    );

    @Effect({ dispatch: false })
    approveRrejectDriverDetails = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.ApproveRejectDeliveryBoyCancelPickups>(
            deliveryBoyManagementActions.ActionTypes.approveRejectDeliveryBoyCancelPickups),
        switchMap(({ payload, id }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_boy_cancel_pickups/${id}`,
                method: 'put',
                payload: payload,
            }, true, true
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'APPROVE_REJECT_DELIVERY_BOY_CANCEL_PICKUPS',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    orderListingByStatus = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.OrderListingByStatus>(
            deliveryBoyManagementActions.ActionTypes.orderListingByStatus),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/orders`,
                method: 'post',
                payload,
            }, true, false
            ).pipe(map((res: any) =>
                new deliveryBoyManagementActions.StoreOrderListingByStatus(res))
            )
        )
    );
    @Effect()
    orderListingBySearchTerm = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.OrderListingBySearchTerm>(
            deliveryBoyManagementActions.ActionTypes.orderListingBySearchTerm),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/orders?search=${payload['status']}`,
                method: 'post',
                payload: {},
            }, true, false
            ).pipe(map((res: any) =>
                new deliveryBoyManagementActions.StoreOrderListingBySearchTerm(res))
            )
        )
    );

    @Effect({ dispatch: false })
    orderStatusChanged = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.OrderStatusChanged>(
            deliveryBoyManagementActions.ActionTypes.orderStatusChanged),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/order_change_status`,
                method: 'post',
                payload,
            }, true, true
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'ORDER_STATUS_CHANGED',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    deliveryBoyList$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetDeliveryBoyList>(
            deliveryBoyManagementActions.ActionTypes.getDeliveryBoyList),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/search_delivery_agent_geo`,
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreDeliveryBoyList(response))
            )
        )
    );

    @Effect({ dispatch: false })
    assignDeliveryBoy$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.AssignDeliveryBoy>(
            deliveryBoyManagementActions.ActionTypes.assignDeliveryBoy),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/assign_delivery_agent`,
                method: 'post',
                payload,
            }, true, true
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'ASSIGN_DELIVERY_BOY',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    getDeliveryBoyByStatus$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetDeliveryBoyByStatus>(
            deliveryBoyManagementActions.ActionTypes.getDeliveryBoyByStatus
        ),
        switchMap((action) => {
            return this.request.request({
                url: `/api/delivery-admin-ms/delivery_boys?page=${action.payload.pageNo}`,
                payload: {
                    status: action.payload['status'],
                    state_name: action.payload.requestBody['state_name'],
                    search: action.payload.requestBody['search'],
                    vehicle_type: action.payload.requestBody['vehicle_type'],
                    area: action.payload.requestBody['area'],
                    active_inactive: action.payload.requestBody['active_inactive'],
                    availability_status: action.payload.requestBody['availability_status'],
                },
                method: 'post'
            },
                true, false
            ).pipe(map((res: any) =>
                new deliveryBoyManagementActions.StoreDeliveryBoyByStatus(res))
            )
        }
        )
    );

    @Effect()
    getPendingDEList$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetPendingDEList>(
            deliveryBoyManagementActions.ActionTypes.getPendingDEList),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_boys?page=1`,
                method: 'post',
                payload,
            }, true, true
            ).pipe(
                map(response => new deliveryBoyManagementActions.StorePendingDEList(response))
            )
        )
    );

    @Effect({ dispatch: false })
    updateDeliveryBoyStatus$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.UpdateDeliveryBoyStatus>(
            deliveryBoyManagementActions.ActionTypes.updateDeliveryBoyStatus),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/change_delivery_boy_statuses`,
                method: 'put',
                payload,
            }, true, true
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'UPDATE_DELIVERY_BOY_STATUS',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect({ dispatch: false })
    deliveryBoyForceAction$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.DeliveryBoyForceAction>(
            deliveryBoyManagementActions.ActionTypes.deliveryBoyForceAction),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/availabilities`,
                method: 'put',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_FORCE_ACTION',
                        status: true,
                    });
                })
            )
        )
    );
    @Effect({ dispatch: false })
    deliveryBoyRegistration$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.DeliveryBoyRegistration>(
            deliveryBoyManagementActions.ActionTypes.deliveryBoyRegistration),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_boy_registrations`,
                method: 'post',
                payload,
            }, true, true
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_REGISTRATION',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    getRegionsByCountryCode$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetRegionsByCountryCode>(
            deliveryBoyManagementActions.ActionTypes.getRegionsByCountryCode),
        switchMap(() =>
            this.request.request({
                url: `/api/geomaster/master-api/regions/country/IN`,
                method: 'get',
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreRegionsByCountryCode(response['payload']))
            )
        )
    );
    @Effect()
    getRegionsByCountryCodeDynamic$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetRegionsByCountryCodeDynamic>(
            deliveryBoyManagementActions.ActionTypes.getRegionsByCountryCodeDynamic),
        switchMap(({ payload }) => {
            return this.request.request({
                url: `/api/geomaster/master-api/regions/country/${payload['countryCode']}`,
                method: 'get',
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreRegionsByCountryCodeDynamic(response['payload']))
            )
        }
        )
    );

    @Effect()
    getZoneByRegionCode$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetZoneByRegionCode>(
            deliveryBoyManagementActions.ActionTypes.getZoneByRegionCode),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/geomaster/master-api/zones/region/${payload['regionCode']}`,
                method: 'get',
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreZoneByRegionCode(response['payload']))
            )
        )
    );

    @Effect({ dispatch: false })
    broadCastMessageDeliveryBoys$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.BroadCastMessageDeliveryBoys>(
            deliveryBoyManagementActions.ActionTypes.broadcastMessageDeliveryBoys),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/broadcast_messages`,
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_BROADCAST_MESSAGE_SEND',
                        status: true,
                    });
                })
            )
        )
    );


    @Effect()
    getCountryAll$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetAllCountry>(
            deliveryBoyManagementActions.ActionTypes.getAllCountry),
        switchMap(() => {
            return this.request.request({
                url: `/api/geomaster/master-api/countries-all`,
                method: 'get',
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreAllCountry(response['payload']))
            )
        }
        )
    )
    @Effect({ dispatch: false })
    addCommentToOrderHistory$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.AddCommentToOrderHistory>(
            deliveryBoyManagementActions.ActionTypes.addCommentToOrderHistory),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/order_histories/${payload['sellerOrderId']}`, //:seller_order_id
                method: 'put',
                payload: { comment: payload['comment'] },
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_ADD_COMMENT_ORDER_HISTORY',
                        status: true,
                    });
                })
            )
        )
    );

    // Delivery Boy commission Settings
    @Effect()
    listSearchDECommissionSettings$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.ListSearchDECommissionSettings>(
            deliveryBoyManagementActions.ActionTypes.listSearchDECommissionSettings),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/commission_settings_search`, //:seller_order_id
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreListSearchDECommissionSettings(response['seller_orders']))
            )
        )
    );
    @Effect({ dispatch: false })
    addNewCommissionSettings$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.AddNewCommissionSettings>(
            deliveryBoyManagementActions.ActionTypes.addNewCommissionSettings),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/commission_settings`, //:seller_order_id
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_ADD_NEW_COMMISSION_SETTINGS',
                        status: true,
                    });
                })
            )
        )
    );
    @Effect({ dispatch: false })
    updateCommissionSettings$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.UpdateCommissionSettings>(
            deliveryBoyManagementActions.ActionTypes.updateCommissionSettings),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/commission_settings/${payload['id']}`, //:seller_order_id
                method: 'put',
                payload: payload['requestBody'],
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: 'DELIVERY_BOY_UPDATE_COMMISSION_SETTINGS',
                        status: true,
                    });
                })
            )
        )
    );

    @Effect()
    getByIdCommissionSettings$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.GetByIdCommissionSettings>(
            deliveryBoyManagementActions.ActionTypes.getByIdCommissionSettings),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/commission_settings/${payload['id']}/edit`, //:seller_order_id
                method: 'get',
                payload,
            }, true, false
            ).pipe(
                map(response => new deliveryBoyManagementActions.StoreGetByIdCommissionSettings(response))
            )
        )
    );

    @Effect({ dispatch: false })
    assignTrainingToDeliveryBoy$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.AssignTrainingToDeliveryBoy>(
            deliveryBoyManagementActions.ActionTypes.assignTrainingToDeliveryBoy),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_agent_assign_trainings`, //:seller_order_id
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.dialog.closeAll()
                    this.apiMessageService.changeApiStatus({
                        type: deliveryBoyManagementActions.ActionTypes.assignTrainingToDeliveryBoy,
                        status: true,
                    });
                })
            )
        )
    );
    @Effect({ dispatch: false })
    certifyDeliveryBoy$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.CertifyDeliveryBoy>(
            deliveryBoyManagementActions.ActionTypes.certifyDeliveryBoy),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_agent_change_statuses`, //:seller_order_id
                method: 'put',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.apiMessageService.changeApiStatus({
                        type: deliveryBoyManagementActions.ActionTypes.certifyDeliveryBoy,
                        status: true,
                    });
                })
            )
        )
    );


    @Effect({ dispatch: false })
    scheduleDeliveryBoy$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.ScheduleDeliveryBoy>(
            deliveryBoyManagementActions.ActionTypes.scheduleDeliveryBoy),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_agent_assign_trainings`, //:seller_order_id
                method: 'put',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.dialog.closeAll()
                    this.apiMessageService.changeApiStatus({
                        type: deliveryBoyManagementActions.ActionTypes.scheduleDeliveryBoy,
                        status: true,
                    });
                })
            )
        )
    );


    @Effect({ dispatch: false })
    updateDeMerchandiseInventory$ = this.actions$.pipe(
        ofType<deliveryBoyManagementActions.UpdateDeMerchandiseInventory>(
            deliveryBoyManagementActions.ActionTypes.updateDeMerchandiseInventory),
        switchMap(({ payload }) =>
            this.request.request({
                url: `/api/delivery-admin-ms/delivery_boy_merchandishes`, //:seller_order_id
                method: 'post',
                payload,
            }, true, false
            ).pipe(
                map(response => {
                    this.dialog.closeAll()
                    this.apiMessageService.changeApiStatus({
                        type: deliveryBoyManagementActions.ActionTypes.updateDeMerchandiseInventory,
                        status: true,
                    });
                })
            )
        )
    );

}