import { GetStoreKeywords, StoreStoreDeliverySettings } from './../../../actions/merchant-management.actions';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as orderManagementApaActions from '../../../actions/order-management-apa.action';
import { RequestService } from '../../../utils/request/request.service';
import { ApiMessageService } from '../../../utils/api/api-message.service';


@Injectable()
export class OrderManagementApaEffects {
  constructor(
    private request: RequestService,
    private actions$: Actions,
    private apiMessageService: ApiMessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Effect()
  getOrders$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetAllOrders>(
      orderManagementApaActions.ActionTypes.getAllOrders
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/order-ms/admin/orders`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map((res: any) => new orderManagementApaActions.StoreAllOrders(res))
        );
    })
  );
  @Effect()
  getTrackOrderDetails$ = this.actions$.pipe(
    ofType<orderManagementApaActions.TrackOrders>(
      orderManagementApaActions.ActionTypes.trackOrders
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/order-ms/admin/orders/${action.payload.id}/order_histories`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res: any) => new orderManagementApaActions.StoreTrackOrders(res))
        );
    })
  );
  @Effect()
  getPaymentLinkOrders$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetPaymentLinkOrders>(
      orderManagementApaActions.ActionTypes.getPaymentLinkOrders
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/order-ms/admin/orders`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new orderManagementApaActions.StorePaymentLinkOrders(res)
          )
        );
    })
  );
  @Effect()
  getOrdersDetail$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetAllOrdersDetail>(
      orderManagementApaActions.ActionTypes.getAllOrdersDetail
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/order-ms/admin/orders/${action.id}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new orderManagementApaActions.StoreAllOrdersDetail(res)
          )
        );
    })
  );

  @Effect({ dispatch: false })
  getAllHyperLocalOrdersDetail$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetAllHyperLocalOrdersDetail>(
      orderManagementApaActions.ActionTypes.getAllHyperLocalOrdersDetail
    ),
    switchMap((action) => {
      console.log(action);
      return this.request
        .request(
          {
            url: `/api/hyperlocal-delivery-ms/hyperlocal/delivery/retrieveSingleOrderInformation?ndh_Order_Id=${action.payload.ndh_Order_Id}`,
            method: "post",
          },
          true,
          false
        )
        .pipe(
          map((response: any) => {
            this.apiMessageService.changeApiStatus({
              type: orderManagementApaActions.ActionTypes
                .getAllHyperLocalOrdersDetail,
              status: true,
              payload: response,
            });
          })
        );
    })
  );

  @Effect()
  postOrderStatusUpdate = this.actions$.pipe(
    ofType<orderManagementApaActions.PostOrderStatusUpdate>(
      orderManagementApaActions.ActionTypes.postOrderStatusUpdate
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/order-ms/admin/orders/${action.payload.id}`,
            method: "put",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res: any) => {
            // console.log('res', res);
            return new orderManagementApaActions.StoreAllOrdersDetail(res);
          })
        )
    )
  );
  @Effect()
  getEcomShipmentOrders$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetEcomShipmentOrders>(
      orderManagementApaActions.ActionTypes.getEcomShipmentOrders
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ecom-delivery-ms/ecom/delivery/list`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new orderManagementApaActions.StoreEcomShipmentOrders(res)
          )
        );
    })
  );

  @Effect()
  getHyperLocalShipmentOrders$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetHyperLocalShipmentOrders>(
      orderManagementApaActions.ActionTypes.getHyperLocalShipmentOrders
    ),
    switchMap((action) => {
      console.log(action);
      return this.request
        .request(
          {
            url: `/api/hyperlocal-delivery-ms/hyperlocal/delivery/retrieveInformation`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new orderManagementApaActions.StoreHyperLocalShipmentOrders(res)
          )
        );
    })
  ); // get hyperlocal delivery list

  @Effect({ dispatch: false })
  hyperlocalBulkCancelation$ = this.actions$.pipe(
    ofType<orderManagementApaActions.HyperlocalBulkCancelation>(
      orderManagementApaActions.ActionTypes.hyperlocalBulkCancelation
    ),
    switchMap((action) => {
      console.log(action);
      return this.request
        .request(
          {
            url: `/api/hyperlocal-delivery-ms/hyperlocal/delivery/bulkCancel?channelId=${action.payload.channelId}`,
            method: "post",
            payload: action.payload.bulkList,
          },
          true,
          false
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: orderManagementApaActions.ActionTypes
                .hyperlocalBulkCancelation,
              status: true,
              payload: res,
            });
          })
        );
    })
  ); // Bulk Cancellation List

  @Effect()
  getShipmentOrdersDetail$ = this.actions$.pipe(
    ofType<orderManagementApaActions.GetShipmentOrdersDetail>(
      orderManagementApaActions.ActionTypes.getShipmentOrdersDetail
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ecom-delivery-ms/ecom/delivery/get/order/${action.id}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new orderManagementApaActions.StoreShipmentOrdersDetail(res)
          )
        );
    })
  );
  @Effect({ dispatch: false })
  cancelOrderShipment$ = this.actions$.pipe(
    ofType<orderManagementApaActions.CancelOrderShipment>(
      orderManagementApaActions.ActionTypes.cancelOrderShipment
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/order-ms/admin/shipment/marketplace_shipment/${action.payload.id}?reason=${action.payload.reason}`,
            method: "delete",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: orderManagementApaActions.ActionTypes.cancelOrderShipment,
              status: true,
            });
          })
        )
    )
  );
}