import { GetStoreKeywords, StoreStoreDeliverySettings } from './../../../actions/merchant-management.actions';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { act, Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import * as merchantManagementActions from 'src/app/actions/merchant-management.actions';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as catalogMgmtActions from 'src/app/actions/catalog-management.action';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Injectable()
export class MerchantManagementEffects {
  constructor(
    private request: RequestService,
    private actions$: Actions,
    private apiMessageService: ApiMessageService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  //not using
  @Effect()
  updateManageStoreProperties$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateManageStoreProperties>(
      merchantManagementActions.ActionTypes.updateManageStoreProperties
    ),
    switchMap(({ payload, id }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/store/updateStoreproperties`,
            method: "put",
            payload,
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.GetManageStoreProperties(id);
          })
        )
    )
  );

  @Effect()
  dispatchBulkActions = this.actions$.pipe(
    ofType<merchantManagementActions.DispatchBulkAction>(
      merchantManagementActions.ActionTypes.dispatchBulkActions
    ),
    mergeMap((action) => {
      return [
        new merchantManagementActions.GetBusinessCategory(),
        // new merchantManagementActions.GetCommissionType(),
        // new merchantManagementActions.GetMerchantGroup(),
        // new merchantManagementActions.GetPaymentMethods(),
        new merchantManagementActions.GetRegionsList(),
      ];
    })
  );
  @Effect()
  getCommission = this.actions$.pipe(
    ofType<merchantManagementActions.GetCommissionType>(
      merchantManagementActions.ActionTypes.getCommissionType
    ),
    switchMap(() =>
      this.request
        .request(
          { url: "/api/commission/admin-api/commissions", method: "get" },
          true
        )
        .pipe(
          map((res) => new merchantManagementActions.StoreCommissionType(res))
        )
    )
  );

  //not using
  @Effect()
  getMerchant = this.actions$.pipe(
    ofType<merchantManagementActions.GetMerchantGroup>(
      merchantManagementActions.ActionTypes.getMerchantGroup
    ),
    switchMap(() =>
      this.request
        .request(
          {
            url: "/api/sellers/admin-api/admin/seller/getAllMerchantGroup",
            method: "get",
          },
          true
        )
        .pipe(
          map((res) => new merchantManagementActions.StoreMerchantGroup(res))
        )
    )
  );
  @Effect()
  getBuisness = this.actions$.pipe(
    ofType<merchantManagementActions.GetBusinessCategory>(
      merchantManagementActions.ActionTypes.getBusinessCategory
    ),
    switchMap(() =>
      this.request
        .request(
          {
            url: "/api/ndh-product/category/store-business-categories",
            method: "get",
          },
          true
        )
        .pipe(
          map((res) => new merchantManagementActions.StoreBusinessCategory(res))
        )
    )
  );

  @Effect()
  getStoreUrl$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreUrl>(
      merchantManagementActions.ActionTypes.getStoreURl
    ),
    switchMap((action) => {
      // console.log(action);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-url/url-details-by-merchant/${action.payload.id}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res: any) => new merchantManagementActions.SaveStoreUrl(res))
        );
    })
  ); // get store url effect done

  @Effect()
  createSToreUrl$ = this.actions$.pipe(
    ofType<merchantManagementActions.CreateStoreUrl>(
      merchantManagementActions.ActionTypes.createStoreURl
    ),
    switchMap(({ payload }) => {
      console.log(payload);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-url/create`,
            method: "post",
            payload: payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.createStoreURl,
              status: true,
            });
            return new merchantManagementActions.SaveCreatedStoreUrl(response);
          })
        );
    })
  );

  @Effect()
  saveUpdatesStoreUrl$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreUrl>(
      merchantManagementActions.ActionTypes.updateStoreUrl
    ),
    switchMap(({ payload }) => {
      // console.log(payload);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-url/update`,
            method: "put",
            payload: payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateStoreUrl,
              status: true,
            });
            return new merchantManagementActions.SaveUpdatesStoreUrl(response);
          })
        );
    })
  );

  @Effect()
  getStoreDeliveryPartner$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreDeliveryPartner>(
      merchantManagementActions.ActionTypes.getStoreDeliveryPartner
    ),
    switchMap((action) => {
      // console.log(action);
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery/stores/${action.payload.storeId}/stores_delivery_partners`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.SaveStoreDeliveryPartner(res)
          )
        );
    })
  ); // get store delivery partner

  @Effect()
  createSToreDeliveryPartner$ = this.actions$.pipe(
    ofType<merchantManagementActions.CreateStoreDeliveryPartner>(
      merchantManagementActions.ActionTypes.createStoreDeliverPartner
    ),
    switchMap(({ payload }) => {
      // console.log(payload);
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery/stores_delivery_partners`,
            method: "post",
            payload: payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .createStoreDeliverPartner,
              status: true,
              payload: response,
            });
            return new merchantManagementActions.AddedStoreDeliveryPartner(
              response
            );
          })
        );
    })
  ); // create store delivery partner

  @Effect({ dispatch: false })
  deleteDeliveryPartner$ = this.actions$.pipe(
    ofType<merchantManagementActions.DeleteDeliveryPartner>(
      merchantManagementActions.ActionTypes.deleteDeliveryPatner
    ),
    switchMap((action) => {
      // console.log(action);
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery/stores_delivery_partners/${action.payload.id}`,
            method: "delete",
          },
          true
        )
        .pipe(
          map((response: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.deleteDeliveryPatner,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // delete store delivery partner

  @Effect()
  getDeliverCompanyList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliverCompanyList>(
      merchantManagementActions.ActionTypes.getDeliverCompanyList
    ),
    switchMap((action) => {
      console.log(action);
      return this.request
        .request(
          {
            url: `/api/hyperlocal-delivery-ms/hyperlocal/delivery/delivery-partners`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.SaveDeliveryCompanyList(res)
          )
        );
    })
  ); // get Delivery Company List

  @Effect({ dispatch: false })
  updateDeliveryPartner$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateDeliveryPartner>(
      merchantManagementActions.ActionTypes.updateDeliveryPartner
    ),
    switchMap((action) => {
      // console.log( action );
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery/stores_delivery_partners/${action.payload.id}`,
            method: "put",
            payload: action.payload.payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateDeliveryPartner,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // updating store delivery partner

  @Effect({ dispatch: false })
  changeMerchantSubsOtp$ = this.actions$.pipe(
    ofType<merchantManagementActions.ChangeMerchantSubsOtp>(
      merchantManagementActions.ActionTypes.changeMerchantSubsOtp
    ),
    switchMap((action) => {
      console.log(action.payload);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/subscription/otp-request?storeName=${action.payload.storeName}`,
            method: "post",
            // payload: payload
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.changeMerchantSubsOtp,
              status: true,
              payload: response,
            });
            // return new merchantManagementActions.AddedStoreDeliveryPartner( response );
          })
        );
    })
  ); // change Merchant subs get OTP

  @Effect({ dispatch: false })
  merchantSubsUpdateByOtp$ = this.actions$.pipe(
    ofType<merchantManagementActions.MerchantSubsUpdateByOtp>(
      merchantManagementActions.ActionTypes.merchantSubsUpdateByOtp
    ),
    switchMap((action) => {
      // console.log( action.payload );
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/update/subscription/${action.payload.otp}`,
            method: "post",
            payload: action.payload.subsInfo,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .merchantSubsUpdateByOtp,
              status: true,
              payload: response,
            });
            // return new merchantManagementActions.AddedStoreDeliveryPartner( response );
          })
        );
    })
  ); // Merchant Subs Update by Otp

  @Effect({ dispatch: false })
  updateMerchantToggleStatus$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMerchantToggleStatus>(
      merchantManagementActions.ActionTypes.updateMerchantToggleStatus
    ),
    switchMap((action) => {
      // console.log(action.payload);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/active/toggle/${action.payload.payload.merchantId}?toggle=${action.payload.payload.status}`,
            method: "put",
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateMerchantToggleStatus,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // update merchant toogle status

  @Effect({ dispatch: false })
  merchantAllowOnlinePayment$ = this.actions$.pipe(
    ofType<merchantManagementActions.MerchantAllowOnlinePayment>(
      merchantManagementActions.ActionTypes.merchantAllowOnlinePayment
    ),
    switchMap((action) => {
      console.log(action.payload);
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/payment-allow/toggle/${action.payload.payload.merchantId}?toggle=${action.payload.payload.allowOnlinePayment}`,
            method: "put",
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .merchantAllowOnlinePayment,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // update merchant online payment toogle status

  @Effect({ dispatch: false })
  copyProductToOutlet$ = this.actions$.pipe(
    ofType<merchantManagementActions.CopyProductToOutlet>(
      merchantManagementActions.ActionTypes.copyProductToOutlet
    ),
    switchMap(({ payload }) => {
      console.log(payload);
      return this.request
        .request(
          {
            url: `/api/ndh-product/store/copy/product/${ payload.storeId }`,
            method: "post",
            payload: payload.storeCollection,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.copyProductToOutlet,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // copy product to outlet
  

  @Effect()
  getRegion = this.actions$.pipe(
    ofType<merchantManagementActions.GetRegionsList>(
      merchantManagementActions.ActionTypes.getRegionsList
    ),
    switchMap(() =>
      this.request
        .request(
          {
            url: "/api/geomaster/master-api/regions?pageNumber=1&pageSize=1000000",
            method: "get",
          },
          true
        )
        .pipe(map((res) => new merchantManagementActions.StoreRegionsList(res)))
    )
  );
  @Effect()
  getRegionByCountryId = this.actions$.pipe(
    ofType<merchantManagementActions.GetRegionByCountryId>(
      merchantManagementActions.ActionTypes.getRegionByCountryId
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/geomaster/admin-api/regions/country/${payload["countryId"]}/active`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreRegionByCountryId(response)
          )
        )
    )
  );
  @Effect()
  getPayment = this.actions$.pipe(
    ofType<merchantManagementActions.GetPaymentMethods>(
      merchantManagementActions.ActionTypes.getPaymentMethods
    ),
    switchMap(() =>
      this.request
        .request(
          { url: "/api/geomaster/admin-api/payment-method", method: "get" },
          true
        )
        .pipe(
          map((res) => new merchantManagementActions.StorePaymentMethods(res))
        )
    )
  );
  @Effect()
  getFullfillmentMode = this.actions$.pipe(
    ofType<merchantManagementActions.GetFullfillmentMode>(
      merchantManagementActions.ActionTypes.getFullfillmentMode
    ),
    switchMap(() =>
      this.request
        .request(
          {
            url: "/api/geomaster/admin-api/fulfillment-center-all",
            method: "get",
          },
          true
        )
        .pipe(
          map((res) => new merchantManagementActions.StoreFullfillmentMode(res))
        )
    )
  );
  @Effect({ dispatch: false })
  postAddNewMerchant = this.actions$.pipe(
    ofType<merchantManagementActions.PostAddNewMerchant>(
      merchantManagementActions.ActionTypes.postAddNewMerchant
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/app/store",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) =>
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.postAddNewMerchant,
              status: true,
            })
          )
        )
    )
  );

  //not using
  @Effect()
  getAllActiveMerchants = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllActiveMerchants>(
      merchantManagementActions.ActionTypes.getAllActiveMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/sellers/admin-api/activeSellers?pageSize=100000&status=1",
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreAllActiveMerchants(res.payload)
          )
        )
    )
  );
  @Effect()
  getAllPendingMerchants = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllPendingMerchants>(
      merchantManagementActions.ActionTypes.getAllPendingMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/admin/sellers/pendingRequest?type=SELLER&requestType=ADD&requestedBy=${localStorage.getItem(
              "ndh-admin-role"
            )}&currentStatus=DRAFT&pageSize=100000`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreAllPendingMerchants(res)
          )
        )
    )
  );

  //not using
  @Effect()
  getAllInactiveMerchants = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllInactiveMerchants>(
      merchantManagementActions.ActionTypes.getAllInactiveMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/sellers/admin-api/activeSellers?pageSize=100000&status=0",
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreAllInactiveMerchants(res)
          )
        )
    )
  );

  @Effect()
  showMechantDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetActiveMerchantDetails>(
      merchantManagementActions.ActionTypes.getActiveMerchantDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/sellers/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreActiveMerchantDetails(
                response["payload"]
              )
          )
        )
    )
  );
  @Effect()
  getStoreDetailsByMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreDetailsByMerchant>(
      merchantManagementActions.ActionTypes.getStoreDetailsByMerchant
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/storesByStoreId/${payload.id}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoreDetailsByMerchant(
                response
              )
          )
        )
    )
  );
  @Effect({ dispatch: false })
  addNewStoreDetailsByMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.AddStoreDetailsByMerchant>(
      merchantManagementActions.ActionTypes.addNewStoreDetailsByMerchant
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/store/addStore/${payload.id}`,
            method: "post",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .addNewStoreDetailsByMerchant,
              status: true,
            });
            return new merchantManagementActions.GetActiveMerchantDetails(
              payload.id
            );
          })
        )
    )
  );
  @Effect()
  updateStoreDetailsByMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreDetailsByMerchant>(
      merchantManagementActions.ActionTypes.updateStoreDetailsByMerchant
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/store/updateStore/${payload.id}`,
            method: "put",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.GetStoreDetailsByMerchant({
              id: payload.id,
            });
          })
        )
    )
  );

  //not using
  @Effect()
  addStoreAddressByMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.AddStoreAddressByStoreMerchant>(
      merchantManagementActions.ActionTypes.addStoreAddressByStoreMerchant
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/store/addStoreAddress/${payload.id}`,
            method: "post",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.GetStoreDetailsByMerchant({
              id: payload.storeId,
            });
          })
        )
    )
  );

  //not using
  @Effect()
  updateStoreAddressByMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreAddressByStoreMerchant>(
      merchantManagementActions.ActionTypes.updateStoreAddressByStoreMerchant
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/admin/store/updateStoreAddress/${payload.id}`,
            method: "put",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.GetStoreDetailsByMerchant({
              id: payload.storeId,
            });
          })
        )
    )
  );
  @Effect({ dispatch: false })
  updateMerchantDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMerchantDetails>(
      merchantManagementActions.ActionTypes.updateMerchantDetails
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/admin/sellers/${payload.url}/${payload.id}`,
            method: "post",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateMerchantDetails,
              status: true,
              payload: { formName: payload.formName },
            });
            return EMPTY;
          })
        )
    )
  );
  @Effect({ dispatch: false })
  approveRjectSellerRequest$ = this.actions$.pipe(
    ofType<merchantManagementActions.ApproveRejectSellerRequest>(
      merchantManagementActions.ActionTypes.approveRejectSellerRequest
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/admin/sellers/requestApproveOrReject `,
            method: "put",
            payload: payload.data,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: "EDIT TYPE SELLER REQUEST APPROVALREJCT",
              status: true,
            });
            return EMPTY;
          })
        )
    )
  );

  //not using
  @Effect()
  getAllInterestedMerchants$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllInterestedMerchant>(
      merchantManagementActions.ActionTypes.getAllInterestedMerchant
    ),
    mergeMap(() =>
      this.request
        .request(
          {
            url: `/api/sellers/admin-api/website/getSellerRegRequest?startFrom=0&pageSize=1000000`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res) =>
              new merchantManagementActions.StoreAllInterestedMerchant(res)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  updateActiveMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMerchantStatus>(
      merchantManagementActions.ActionTypes.updateMerchantStatus
    ),
    mergeMap((action) =>
      this.request
        .request(
          {
            url: "/api/sellers/admin-api/setMerchantActiveDeactiveState",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(map((res) => this.router.navigate(["/merchant/active-merchant"])))
    )
  );

  //not using
  @Effect({ dispatch: false })
  updateInActiveMerchant$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateInActiveMerchantStatus>(
      merchantManagementActions.ActionTypes.UpdateInActiveMerchantStatus
    ),
    mergeMap((action) =>
      this.request
        .request(
          {
            url: "/api/sellers/admin-api/setMerchantActiveDeactiveState",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) => this.router.navigate(["/merchant/in-active-merchant"]))
        )
    )
  );

  @Effect()
  getAllMerchants = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllMerchants>(
      merchantManagementActions.ActionTypes.getAllMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/search/sellers?pageNumber=${action.payload.pageNo}&pageSize=${action.payload.pageSize}`,
            method: "post",
            payload: action.payload.requestBody,
          },
          true,
          false
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: "",
              status: false,
              payload: null,
            });
            return new merchantManagementActions.StoreAllMerchants(res);
          })
        )
    )
  );

  @Effect()
  getMerchantsListNew = this.actions$.pipe(
    ofType<merchantManagementActions.GetMerchantsListNew>(
      merchantManagementActions.ActionTypes.getMerchantsListNew
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/find-merchant-list?pageNumber=${action.payload.pageNo}&pageSize=${action.payload.pageSize}`,
            method: "post",
            payload: action.payload.payload,
          },
          true,
          false
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: "",
              status: false,
              payload: null,
            });

            return new merchantManagementActions.StoreMerchantsListNew(res);
          })
        );
    })
  );

  @Effect()
  getAllMerchantsElastic = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllMerchantsElastic>(
      merchantManagementActions.ActionTypes.getAllMerchantsElastic
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/api-elastic-ms/global/store-list`,
            method: "post",
            payload: action.payload,
          },
          true,
          false,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((res: any) => {
            return new merchantManagementActions.StoreAllMerchantsElastic(res);
          })
        )
    )
  );

  @Effect()
  getSearchMerchants = this.actions$.pipe(
    ofType<merchantManagementActions.GetSearchMerchants>(
      merchantManagementActions.ActionTypes.getSearchMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/search/search-all-store-by-name`,
            method: "post",
            payload: action.payload,
          },
          true,
          false,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: "",
              status: false,
              payload: null,
            });
            return new merchantManagementActions.StoreSearchMerchants(res);
          })
        )
    )
  );

  @Effect()
  storeForEdit$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetMerchantForEdit>(
      merchantManagementActions.ActionTypes.getMerchantForEdit
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/search/v2/store/store-details`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreMerchantDetails(res["obj"])
          )
        )
    )
  );

  @Effect()
  getAllDeliveryRequestedMerchants$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllDeliveryRequestedMerchants>(
      merchantManagementActions.ActionTypes.getAllDeliveryRequestedMerchants
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/app/store/enable-delivery-request/list?pageNumber=${action.payload.pageNo}&pageSize=9999`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryRequestedMerchants(res)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  enableStoreDelivery$ = this.actions$.pipe(
    ofType<merchantManagementActions.EnableStoreDelivery>(
      merchantManagementActions.ActionTypes.enableStoreDelivery
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store${payload.url}`,
            method: "post",
            payload: payload.data,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.enableStoreDelivery,
              status: true,
              payload: { formName: payload.formName },
            });
            this.router.navigate(["/merchant/delivery-request/"]);
            return EMPTY;
          })
        )
    )
  );

  @Effect()
  manageStoreDraft$ = this.actions$.pipe(
    ofType<merchantManagementActions.ManageMerchantDraft>(
      merchantManagementActions.ActionTypes.manageMerchantDraft
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/search/getallstorerequest?pageNumber=${action.payload.pageNo}&pageSize=9999`,
            method: "post",
          },
          true,
          false
        )
        .pipe(
          map((res: any) => {
            return new merchantManagementActions.StoreMerchantDraft(res);
          })
        )
    )
  );

  @Effect({ dispatch: false })
  storeRequestApprove$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreRequestApprove>(
      merchantManagementActions.ActionTypes.storeRequestApprove
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/app/store/basic-profile-request/approve",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.storeRequestApprove,
              status: true,
              payload: response,
            });
          })
        )
    )
  );

  @Effect()
  getStoreDraftRequest$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreDraftRequest>(
      merchantManagementActions.ActionTypes.getStoreDraftRequest
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/app/store/request/assign`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreStoreDraftRequest(res)
          )
        )
    )
  );

  @Effect()
  getStoreApprovalList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreApprovalList>(
      merchantManagementActions.ActionTypes.getStoreApprovalList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/app/store/request/DRAFT?pageNumber=${action.payload.pageNo}&pageSize=10`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreStoreApprovalList(res)
          )
        )
    )
  );

  @Effect()
  getStoreAssign$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreAssign>(
      merchantManagementActions.ActionTypes.getStoreAssign
    ),
    switchMap((action) =>
      this.request
        .request(
          { url: `/api/store-management/app/store-assign`, method: "get" },
          true
        )
        .pipe(
          map((res: any) => new merchantManagementActions.StoreStoreAssign(res))
        )
    )
  );

  @Effect()
  storeBulkOperation$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreBulkOperation>(
      merchantManagementActions.ActionTypes.storeBulkOperation
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/app/bulk/store-approve",
            method: "post",
            payload: action.payload.requestBody,
          },
          true,
          true
        )
        .pipe(
          switchMap((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.storeBulkOperation,
              status: true,
              payload: response,
            });
            if (action.payload.pageNo && action.payload.searchPayLoad) {
              return [
                new merchantManagementActions.GetStoreListByMerchantId({
                  pageNo: action.payload.pageNo,
                  pageSize: action.payload.pageSize,
                  requestBody: action.payload.searchPayLoad,
                }),
              ];
            } else {
              return [
                new merchantManagementActions.GetStoreInfoDetails(
                  action.payload.requestBody.storeId
                ),
              ];
            }
          })
        )
    )
  );

  @Effect()
  storeApproveReject$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreApproveReject>(
      merchantManagementActions.ActionTypes.storeApproveReject
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/app/store-approve",
            method: "post",
            payload: action.payload.requestBody,
          },
          true,
          true
        )
        .pipe(
          switchMap((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.storeApproveReject,
              status: true,
              payload: response,
            });
            if (action.originPage == true) {
              return [
                new merchantManagementActions.GetStoreListByMerchantId({
                  pageNo: action.payload.pageNo,
                  requestBody: action.payload.searchPayLoad,
                }),
              ];
            } else {
              return EMPTY;
            }
          })
        )
    )
  );

  @Effect()
  getStoreProofileAction$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreProfileAction>(
      merchantManagementActions.ActionTypes.getStoreProfileAction
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/search/store/store-details",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreProfileAction(
              response
            );
          })
        )
    )
  );

  @Effect()
  updateStoreBasicDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreBasicDetails>(
      merchantManagementActions.ActionTypes.updateStoreBasicDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/app/store",
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreBasicDetails,
              status: true,
              payload: response,
            });
            return new merchantManagementActions.ReflectstoreProfiledetailsAfterUpdate(
              action.payload
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateMerchantType$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMerchantType>(
      merchantManagementActions.ActionTypes.updateMerchantType
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/app/update-store-type",
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateMerchantType,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  elacticStoreDetailsSync$ = this.actions$.pipe(
    ofType<merchantManagementActions.ElacticStoreDetailsSync>(
      merchantManagementActions.ActionTypes.elacticStoreDetailsSync
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/ndh-product/elastic/sync-store-products",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .elacticStoreDetailsSync,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  updateStoreOperationDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreOperationDetails>(
      merchantManagementActions.ActionTypes.updateStoreOperationDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/app/store/store-operation",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreOperationDetails,
              status: true,
              payload: response,
            });
            return new merchantManagementActions.GetStoreProfileAction({
              storeId: action.payload.storeId,
              latitude: "22.5392287",
              longitude: "88.3595163",
            });
          })
        )
    )
  );
  @Effect()
  updateStoreComplianceDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreComplianceDetails>(
      merchantManagementActions.ActionTypes.updateStoreComplianceDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/ndh-admin/store/update-store-complaince",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreComplianceDetails,
              status: true,
              payload: response,
            });
            this.dialog.closeAll();
            return new merchantManagementActions.GetStoreComplianceList(
              action.payload.storeId
            );
          })
        )
    )
  );

  @Effect()
  updateStoreDeliverySettings$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreDeliverySettings>(
      merchantManagementActions.ActionTypes.updateStoreDeliverySettings
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/app/store/delivery-attribute",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreDeliverySettings,
              status: true,
              payload: response,
            });
            return new merchantManagementActions.ReflectstoreProfiledetailsAfterUpdate(
              action.payload
            );
          })
        )
    )
  );

  @Effect()
  getStoreProductDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreProductDetails>(
      merchantManagementActions.ActionTypes.getStoreProductDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/api-elastic-ms/store/details",
            method: "post",
            payload: action.payload,
          },
          true,
          true,
          "application/json",
          "",
          500,
          false,
          environment.base_url
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreProductDetails(
              response
            );
          })
        )
    )
  );

  @Effect()
  getCategoryDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetProductCategory>(
      merchantManagementActions.ActionTypes.getProductCategory
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/api-elastic-ms/store/category",
            method: "post",
            payload: action.payload,
          },
          true,
          true,
          "application/json",
          "",
          500,
          false,
          environment.base_url
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreProductCategory(response);
          })
        )
    )
  );

  @Effect()
  getProductList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetProductList>(
      merchantManagementActions.ActionTypes.getProductList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/api-elastic-ms/store/product/list",
            method: "post",
            payload: action.payload,
          },
          true,
          true,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreProductList(
              response,
              action.refresh
            );
          })
        )
    )
  );

  @Effect()
  getStoreComplianceDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreComplianceDetails>(
      merchantManagementActions.ActionTypes.getStoreComplianceDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store-compliance/${action.payload.complianceId}`,
            method: "get",
          },
          true,
          true,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreComplianceDetails(
              response
            );
          })
        )
    )
  );

  @Effect()
  getProductDetailsById = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreProductDetailsById>(
      merchantManagementActions.ActionTypes.getStoreProductDetailsById
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/store/get-StoreProduct-id?productId=${action.payload.productId}&storeId=${action.payload.storeId}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          mergeMap((response: any) => {
            const returnArr = [];
            if (response.attributeSetId) {
              returnArr.push(
                new catalogMgmtActions.GetAttributesBasedOnCategory({
                  attributeSetId: response.attributeSetId,
                })
              );
              let attributeSetIds = [];
              attributeSetIds.push(response.attributeSetId);
              returnArr.push(
                new catalogMgmtActions.GetAttributeDataFromIds({
                  attributeSetsID: attributeSetIds,
                })
              );
            }
            returnArr.push(
              new merchantManagementActions.StoreStoreProductDetailsById(
                response
              )
            );
            return returnArr;
          })
        )
    )
  );

  @Effect({ dispatch: false })
  activeProductState = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreProductActiveState>(
      merchantManagementActions.ActionTypes.updateStoreProductActiveState
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/app/product`,
            method: "put",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreProductActiveState,
              status: true,
            });
          })
        )
    )
  );
  @Effect()
  productCategoriesByStoreId = this.actions$.pipe(
    ofType<merchantManagementActions.GetProductCategoriesByStoreId>(
      merchantManagementActions.ActionTypes.getProductCategoriesByStoreId
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/category/admin-api/seller-product-categories/${action.storeId}`,
            method: "get",
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreProductCategoriesByStoreId(
              response["payload"]
            );
          })
        )
    )
  );

  @Effect()
  getAllDelivery$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetAllDeliveryRequest>(
      merchantManagementActions.ActionTypes.getAllDeliveryRequest
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/search/getalldeliveryrequest?pageNumber=${action.payload.pageNo}&pageSize=100`,
            method: "post",
            payload: action.payload.requestBody,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryRequestedMerchants(res)
          )
        )
    )
  );

  @Effect()
  getStoreKeyWords$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreKeywords>(
      merchantManagementActions.ActionTypes.getStoreKeywords
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/keywords/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map(
            (res: any) => new merchantManagementActions.StoreStoreKeywords(res)
          )
        )
    )
  );

  @Effect()
  getStoreInfoDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreInfoDetails>(
      merchantManagementActions.ActionTypes.getStoreInfoDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/info/${action.storeId}`,
            method: "get",
          },
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.getStoreInfoDetails,
              payload: res.payload,
              status: true,
            });
            return new merchantManagementActions.StoreStoreInfoDetails(res);
          })
        )
    )
  );

  @Effect()
  getStoreCategory$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreCategory>(
      merchantManagementActions.ActionTypes.getStoreCategory
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ndh-product/store/get-store-catagory/${action.payload.businessCategoryId}`,
            method: "get",
          },
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.getStoreCategory,
              payload: res,
              status: true,
            });
            return new merchantManagementActions.SaveStoreCategory(res);
          })
        );
    })
  );

  @Effect()
  getStoreImages$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreImages>(
      merchantManagementActions.ActionTypes.getStoreImages
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/media/${action.storeId}`,
            method: "get",
          },
          true,
          true
          // 'application/json', '', 500, false, 'http://10.1.30.95:8048', true
        )
        .pipe(
          map((res: any) => new merchantManagementActions.StoreStoreImages(res))
        )
    )
  );
  @Effect()
  getStoreOperationDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreOperationDetails>(
      merchantManagementActions.ActionTypes.getStoreOpertaionDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/operations/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreStoreOperationDetails(res)
          )
        )
    )
  );

  @Effect()
  getStoreDeliverySettings$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreDeliverySettings>(
      merchantManagementActions.ActionTypes.getStoreDeliverySettings
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/delivery/${action.storeId}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreStoreDeliverySettings(res)
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateNewStoreDeliverySettings$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateNewStoreDeliverySettings>(
      merchantManagementActions.ActionTypes.updateNewStoreDeliverySettings
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/delivery`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .getStoreDeliverySettings,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  postStoreInfoDetails = this.actions$.pipe(
    ofType<merchantManagementActions.PostStoreInfoDetails>(
      merchantManagementActions.ActionTypes.postStoreInfoDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/info`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.postStoreInfoDetails,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateStoreKeywords = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreKeywords>(
      merchantManagementActions.ActionTypes.updateStoreKeywords
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/keywords`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateStoreKeywords,
              status: true,
            });
          })
        )
    )
  );
  @Effect({ dispatch: false })
  postStoreOperationDetails = this.actions$.pipe(
    ofType<merchantManagementActions.PostStoreOperationDetails>(
      merchantManagementActions.ActionTypes.postStoreOperationDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/operations`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.getStoreKeywords,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  getDeliveryBoys$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoys>(
      merchantManagementActions.ActionTypes.getDeliveryBoys
    ),
    switchMap((action) => {
      // console.log("Req Body::::::::::::", action.payload);
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boys?page=${action.payload.pageNo}`,
            payload: {
              status: action.payload["status"],
              state_name: action.payload.requestBody["state_name"],
              search: action.payload.requestBody["search"],
              vehicle_type: action.payload.requestBody["vehicle_type"],
              zone: action.payload.requestBody["zone"],
            },
            method: "post",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) => new merchantManagementActions.StoreDeliveryBoys(res)
          )
        );
    })
  );

  @Effect({ dispatch: false })
  approveRrejectDeliveryBoys = this.actions$.pipe(
    ofType<merchantManagementActions.ApproveRrejectDeliveryBoys>(
      merchantManagementActions.ActionTypes.approveRrejectDeliveryBoys
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boys/${action.payload.id}`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .approveRrejectDeliveryBoys,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  getDeliveryBoysOrder$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoysOrder>(
      merchantManagementActions.ActionTypes.getDeliveryBoysOrder
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boy_orders?page=${action.payload.pageNo}`,
            method: "post",
            payload: action.payload.body,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryBoysOrder(res)
          )
        )
    )
  );

  @Effect()
  getDeliveryBoyLiceseTypes$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoyLiceseTypes>(
      merchantManagementActions.ActionTypes.getDeliveryBoyLiceseTypes
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/driving_licens_types`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryBoyLicenseTypes(res)
          )
        )
    )
  );

  @Effect()
  getDrivingLissuingState$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDrivingLissuingState>(
      merchantManagementActions.ActionTypes.getDrivingLissuingState
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/country_state`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDrivingLissuingState(res)
          )
        )
    )
  );

  @Effect()
  getManageStoreProperties$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetManageStoreProperties>(
      merchantManagementActions.ActionTypes.getManageStoreProperties
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/properties/${action.id}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreManageStoreProperties(response)
          )
        )
    )
  );

  @Effect()
  getDeliveryBoyDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoyDetails>(
      merchantManagementActions.ActionTypes.getDeliveryBoyDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boys/${action.payload["id"]}/edit`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          mergeMap((response: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.getDeliveryBoyDetails,
              status: true,
            });
            const returnArr = [];
            returnArr.push(
              new merchantManagementActions.StoreDeliveryBoyDetails(response)
            );
            return returnArr;
          })
        )
    )
  );

  @Effect()
  postStoreImages = this.actions$.pipe(
    ofType<merchantManagementActions.PostStoreImages>(
      merchantManagementActions.ActionTypes.postStoreImages
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/media`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.postStoreImages,
              status: true,
            });
            return new merchantManagementActions.GetStoreImages(
              action.payload.id
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  approveRrejectDriverDetails = this.actions$.pipe(
    ofType<merchantManagementActions.ApproveRejectDriverDetails>(
      merchantManagementActions.ActionTypes.approveRejectDriverDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boys/${action.id}`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: "APPROVE_REJECT_DRIVER_DETAILS",
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  postManageStoreProperties = this.actions$.pipe(
    ofType<merchantManagementActions.PostManageStoreProperties>(
      merchantManagementActions.ActionTypes.postManageStoreProperties
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/properties/merchant-payment`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .postManageStoreProperties,
              status: true,
            });
            return new merchantManagementActions.GetManageStoreProperties(
              action.payload.id
            );
          })
        )
    )
  );

  @Effect()
  getStoreQuickLinks$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreQuickLinks>(
      merchantManagementActions.ActionTypes.getStoreQuickLinks
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/quicklink/store/relation/list?storeId=${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoreQuickLinks(response)
          )
        )
    )
  );
  @Effect()
  getStoreBannerList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreBannerList>(
      merchantManagementActions.ActionTypes.getStoreBannerList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/banner/list`,
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoreBannerList(response)
          )
        )
    )
  );
  @Effect()
  getDeliveryBoyShifts$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoyShifts>(
      merchantManagementActions.ActionTypes.getDeliveryBoyShifts
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boy_shifts?page=${action.payload.pageNo}`,
            method: "post",
            payload: action.payload.body,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryBoyShifts(res)
          )
        )
    )
  );

  @Effect()
  getComplainceTypeDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetComplianceTypeDetails>(
      merchantManagementActions.ActionTypes.getComplianceTypeDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/countryComplience/${action.businessCategoryId}/${action.countryCode}`,
            method: "get",
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreComplianceTypeDetails(
              response
            );
          })
        )
    )
  );

  @Effect()
  getDeliveryBoyCommisions$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoyCommisions>(
      merchantManagementActions.ActionTypes.getDeliveryBoyCommisions
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boy_earnings?page=${action.payload.pageNo}`,
            method: "post",
            payload: action.payload.body,
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryBoyCommisions(res)
          )
        );
    })
  );
  @Effect()
  getDeliveryBoyOrderDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetDeliveryBoyOrderDetails>(
      merchantManagementActions.ActionTypes.getDeliveryBoyOrderDetails
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/delivery-admin-ms/delivery_boy_orders/${action.orderId}/edit`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map(
            (res: any) =>
              new merchantManagementActions.StoreDeliveryBoyOrderDetails(res)
          )
        );
    })
  );

  @Effect()
  getMasterQuickLinks$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetMasterQuickLinks>(
      merchantManagementActions.ActionTypes.getMasterQuickLinks
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/quicklink/store/list?storeId=${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreMasterQuickLinks(response)
          )
        )
    )
  );

  @Effect()
  tagStoreWithQuickLinks = this.actions$.pipe(
    ofType<merchantManagementActions.TagStoreWithQuickLinks>(
      merchantManagementActions.ActionTypes.tagStoreWithQuickLinks
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/admin/quicklink/store/relation/list/create`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .tagStoreWithQuickLinks,
              status: true,
            });
            if (action.payload[0]) {
              return new merchantManagementActions.GetStoreQuickLinks(
                action.payload[0].storeId
              );
            } else {
              return EMPTY;
            }
          })
        )
    )
  );

  @Effect({ dispatch: false })
  postStoreBanner = this.actions$.pipe(
    ofType<merchantManagementActions.PostStoreBanner>(
      merchantManagementActions.ActionTypes.postStoreBanner
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/banner/create`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.postStoreBanner,
              status: true,
            });
            this.router.navigate(["/merchant/banner-management"]);
          })
        )
    )
  );

  @Effect()
  getStoreBannerDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreBannerDetails>(
      merchantManagementActions.ActionTypes.getStoreBannerDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/banner/id/${action.bannerId}`,
            method: "get",
          },
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreBannerDetails(
              response
            );
          })
        )
    )
  );

  @Effect()
  getCollectionBannerList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetCollectionBannerList>(
      merchantManagementActions.ActionTypes.getCollectionBannerList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/master_collection_banners`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreCollectionBannerList(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  postCollectionBanner = this.actions$.pipe(
    ofType<merchantManagementActions.PostCollectionBanner>(
      merchantManagementActions.ActionTypes.postCollectionBanner
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/master_collection_banners`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            if (res) {
              this.apiMessageService.changeApiStatus({
                type: merchantManagementActions.ActionTypes
                  .postCollectionBanner,
                status: true,
                payload: res,
              });
            }
          })
        )
    )
  );
  @Effect()
  getCollectionBannerById$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetCollectionBannerById>(
      merchantManagementActions.ActionTypes.getCollectionBannerById
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/master_collection_banners/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreCollectionBannerById(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  editCollectionBanner$ = this.actions$.pipe(
    ofType<merchantManagementActions.EditCollectionBanner>(
      merchantManagementActions.ActionTypes.editCollectionBanner
    ),
    switchMap(({ payload }) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/master_collection_banners/${payload.id}`,
            method: "put",
            payload,
          },
          true,
          false
        )
        .pipe(
          map((res: any) => {
            if (res) {
              this.apiMessageService.changeApiStatus({
                type: merchantManagementActions.ActionTypes
                  .editCollectionBanner,
                status: true,
                payload: res,
              });
            }
          })
        )
    )
  );
  @Effect({ dispatch: false })
  deleteCollectionBanner$ = this.actions$.pipe(
    ofType<merchantManagementActions.DeleteCollectionBanner>(
      merchantManagementActions.ActionTypes.deleteCollectionBanner
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/master_collection_banners/${action.id}`,
            method: "delete",
          },
          true,
          false
        )
        .pipe(
          map((response: any) => {
            if (response.deleted == true) {
              this.apiMessageService.changeApiStatus({
                type: merchantManagementActions.ActionTypes
                  .deleteCollectionBanner,
                status: true,
                payload: response,
              });
            } else {
              this.toastr.error(response.message);
            }
          })
        )
    )
  );

  @Effect()
  getStoreComplianceList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreComplianceList>(
      merchantManagementActions.ActionTypes.getStoreComplianceList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/store-compliance-details/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreComplianceList(
              response
            );
          })
        )
    )
  );

  @Effect()
  getStoreProductsList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreProductsList>(
      merchantManagementActions.ActionTypes.getStoreProductsList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/admin/store-product-list/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreProductsList(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateStoreBanner = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreBanner>(
      merchantManagementActions.ActionTypes.updateStoreBanner
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/banner/update`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateStoreBanner,
              status: true,
            });
            this.router.navigate(["/merchant/banner-management"]);
          })
        )
    )
  );

  @Effect()
  updateDisplayLicense$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateDisplayLicenseNo>(
      merchantManagementActions.ActionTypes.updateDisplayLicenseNo
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/store-display-license`,
            method: "put",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateDisplayLicenseNo,
              status: true,
            });
            return new merchantManagementActions.GetStoreInfoDetails(
              action.payload.id
            );
          })
        )
    )
  );
  @Effect({ dispatch: false })
  updateStoreProductDetails$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreProductDetails>(
      merchantManagementActions.ActionTypes.updateStoreProductDetails
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/store/update-StoreProduct/${action.payload.id}`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            this.dialog.closeAll();
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .updateStoreProductDetails,
              status: true,
            });
            this.apiMessageService.changeApiStatus({
              type: catalogMgmtActions.ActionTypes.updateStorePendingProducts,
              status: true,
              payload: res,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  registerMerchantFromAdmin$ = this.actions$.pipe(
    ofType<merchantManagementActions.RegisterMerchantFromAdmin>(
      merchantManagementActions.ActionTypes.registerMerchantFromAdmin
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/create-store`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            this.dialog.closeAll();
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .registerMerchantFromAdmin,
              status: true,
            });
            this.router.navigate([
              `/merchant/store-list/${action.payload.merchantId}`,
            ]);
          })
        )
    )
  );

  @Effect()
  getStoreSpecificBulkList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreSpecificBulkList>(
      merchantManagementActions.ActionTypes.getStoreSpecificBulkList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-product/bulk-process/find-bulk-file-list-by-store/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreSpecificBulkList(
              response
            );
          })
        )
    )
  );
  @Effect({ dispatch: false })
  storeBulkFileListImageProcess$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreBulkFileListImageProcess>(
      merchantManagementActions.ActionTypes.storeBulkFileListImageProcess
    ),
    switchMap(({ payload }) => {
      // console.log(payload);
      return this.request
        .request(
          {
            url: `/api/ndh-product/admin/temp-img-process`,
            method: "post",
            payload: payload,
          },
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .storeBulkFileListImageProcess,
              status: true,
              payload: response,
            });
          })
        );
    })
  ); // store bulk file image process

  @Effect()
  getRegisterMerchantBulkList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetRegisterMerchantBulkList>(
      merchantManagementActions.ActionTypes.getRegisterMerchantBulkList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/admin/bulk-process/find-bulk-file-store-list`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreRegisterMerchantBulkList(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  uploadStoreBulkFile$ = this.actions$.pipe(
    ofType<merchantManagementActions.UploadStoreBulkFile>(
      merchantManagementActions.ActionTypes.uploadStoreBulkFile
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/uploadBulkStoreFile`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.uploadStoreBulkFile,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  addStoreToMasterProduct$ = this.actions$.pipe(
    ofType<merchantManagementActions.AddStoreToMasterProduct>(
      merchantManagementActions.ActionTypes.addStoreToMasterProduct
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/admin/unique-to-master-products`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .addStoreToMasterProduct,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  addStoreCreditNote$ = this.actions$.pipe(
    ofType<merchantManagementActions.AddStoreCreditNote>(
      merchantManagementActions.ActionTypes.addStoreCreditNote
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/subscription/admin/creditnote`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res: any) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.addStoreCreditNote,
              status: true,
            });
            this.dialog.closeAll();
            return new merchantManagementActions.GetManageStoreProperties(
              action.payload.storeId
            );
          })
        )
    )
  );

  @Effect()
  getStorecategoryKeywords$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStorecategoryKeywords>(
      merchantManagementActions.ActionTypes.getStorecategoryKeywords
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/api-elastic-ms/store/sector/search/category`,
            method: "post",
            payload: action.payload,
          },
          true,
          false,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStorecategoryKeywords(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  changeStoreProfileStatus$ = this.actions$.pipe(
    ofType<merchantManagementActions.ChangeStoreProfileStatus>(
      merchantManagementActions.ActionTypes.changeStoreProfileStatus
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/update-profile-info-completion`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .changeStoreProfileStatus,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  changeStoreLiveStatus$ = this.actions$.pipe(
    ofType<merchantManagementActions.ChangeStoreLiveStatus>(
      merchantManagementActions.ActionTypes.changeStoreLiveStatus
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/properties/update-store-is-live`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.changeStoreLiveStatus,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  saveStoreRelatedKeywords$ = this.actions$.pipe(
    ofType<merchantManagementActions.SaveStoreRelatedKeywords>(
      merchantManagementActions.ActionTypes.saveStoreRelatedKeywords
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/properties/update-store-all-keywords`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .saveStoreRelatedKeywords,
              status: true,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  saveStoreAccountTaxes$ = this.actions$.pipe(
    ofType<merchantManagementActions.SaveStoreAccountTaxes>(
      merchantManagementActions.ActionTypes.saveStoreAccountTaxes
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/store/update-account-tax-details`,
            method: "put",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.saveStoreAccountTaxes,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  getStoreCreditTransactionHistory$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreCreditTransactionHistory>(
      merchantManagementActions.ActionTypes.getStoreCreditTransactionHistory
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/subscription/transaction-history/${action.storeId}`,
            method: "get",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreCreditTransactionHistory(
              response
            );
          })
        )
    )
  );

  @Effect()
  getStoreCreditRequiredForSubscription$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreCreditRequiredForSubscription>(
      merchantManagementActions.ActionTypes
        .getStoreCreditRequiredForSubscription
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/subscription/get-required-credit-for-subscription`,
            method: "post",
            payload: action.payload,
          },
          true,
          false,
          "application/json",
          "",
          500,
          false,
          environment.base_url,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreCreditRequiredForSubscription(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  upgradeStoreSubscription$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpgradeStoreSubscription>(
      merchantManagementActions.ActionTypes.upgradeStoreSubscription
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/subscription/upgrade`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .upgradeStoreSubscription,
              status: true,
            });
            this.dialog.closeAll();
          })
        )
    )
  );

  @Effect()
  purchaseStoreLayout$ = this.actions$.pipe(
    ofType<merchantManagementActions.PurchaseStoreLayout>(
      merchantManagementActions.ActionTypes.purchaseStoreLayout
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/subscription/purchase-layout`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.purchaseStoreLayout,
              status: true,
            });
            return new merchantManagementActions.GetStoreListLayouts(
              action.payload.storeId
            );
          })
        )
    )
  );

  @Effect()
  editStoreListLayout$ = this.actions$.pipe(
    ofType<merchantManagementActions.EditStoreListLayout>(
      merchantManagementActions.ActionTypes.editStoreListLayout
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store/edit-list-layout`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          mergeMap((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.editStoreListLayout,
              status: true,
            });
            this.dialog.closeAll();
            const returnArr = [];
            if (action.publishLayout == true) {
              returnArr.push(
                new merchantManagementActions.SwitchStoreListLayoutAndPublish({
                  layoutId: action.payload.layoutId,
                  store_id: action.payload.store_id,
                })
              );
            }
            returnArr.push(
              new merchantManagementActions.GetStoreListLayouts(
                action.payload.store_id
              )
            );
            return returnArr;
          })
        )
    )
  );

  @Effect()
  switchStoreListLayoutAndPublish$ = this.actions$.pipe(
    ofType<merchantManagementActions.SwitchStoreListLayoutAndPublish>(
      merchantManagementActions.ActionTypes.switchStoreListLayoutAndPublish
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store/switch-list-layout`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .switchStoreListLayoutAndPublish,
              status: true,
            });
            return new merchantManagementActions.GetStoreListLayouts(
              action.payload.store_id
            );
          })
        )
    )
  );

  @Effect()
  switchStoreDeatilLayout$ = this.actions$.pipe(
    ofType<merchantManagementActions.SwitchStoreDeatilLayout>(
      merchantManagementActions.ActionTypes.switchStoreDeatilLayout
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store/switch-store-layout`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .switchStoreDeatilLayout,
              status: true,
            });
            return new merchantManagementActions.GetStoreDetailsLayouts(
              action.payload.store_id
            );
          })
        )
    )
  );

  @Effect()
  getStoreListLayouts$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreListLayouts>(
      merchantManagementActions.ActionTypes.getStoreListLayouts
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store/get-my-list-layouts/${action.storeId}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreListLayouts(
              response
            );
          })
        )
    )
  );

  @Effect()
  getStoreDetailsLayouts$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreDetailsLayouts>(
      merchantManagementActions.ActionTypes.getStoreDetailsLayouts
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/app/store/get-my-store-layouts/${action.storeId}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((response) => {
            return new merchantManagementActions.StoreStoreDetailsLayouts(
              response
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  deleteStoreBanner$ = this.actions$.pipe(
    ofType<merchantManagementActions.DeleteStoreBanner>(
      merchantManagementActions.ActionTypes.deleteStoreBanner
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/banner/delete/${action.id}`,
            method: "delete",
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.deleteStoreBanner,
              status: true,
            });
            this.router.navigate(["/merchant/banner-management"]);
          })
        )
    )
  );

  @Effect()
  deleteStoreQuickLink$ = this.actions$.pipe(
    ofType<merchantManagementActions.DeleteStoreQuickLink>(
      merchantManagementActions.ActionTypes.deleteStoreQuickLink
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/promotion/quicklink/store/relation/list/delete`,
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.deleteStoreQuickLink,
              status: true,
            });
            return new merchantManagementActions.GetStoreQuickLinks(
              action.payload[0].storeId
            );
          })
        )
    )
  ); // for post method

  @Effect()
  getStoreCountForDashboard$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreCountForDashboard>(
      merchantManagementActions.ActionTypes.getStoreCountForDashboard
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/store-management/v2/dashboard/store-count-status-wise`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            return new merchantManagementActions.SaveStoreCountForDashboard(
              res
            );
          })
        );
    })
  );
  @Effect()
  getProductCountForDashboard$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetProductCountForDashboard>(
      merchantManagementActions.ActionTypes.getProductCountForDashboard
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/store-management/v2/dashboard/product-count-status-wise`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            return new merchantManagementActions.SaveProductCountForDashboard(
              res
            );
          })
        );
    })
  );

  @Effect()
  getOrderCountForDashboard$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetOrderCountForDashboard>(
      merchantManagementActions.ActionTypes.getOrderCountForDashboard
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/order-ms/admin/order_dashboard`,
            method: "post",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            // console.log(res)
            return new merchantManagementActions.SaveOrderCountForDashboard(
              res
            );
          })
        );
    })
  );
  @Effect()
  getStoreCompletenessCount$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreCompletenessCount>(
      merchantManagementActions.ActionTypes.getStoreCompletenessCount
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/store-management/v2/dashboard/store-completeness-analysis`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            // console.log(res)
            return new merchantManagementActions.SaveStoreCompletenessCount(
              res
            );
          })
        );
    })
  );

  @Effect()
  getStoreCategoryList$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreCategoryList>(
      merchantManagementActions.ActionTypes.storeCategoryList
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ndh-product/category/store/categories?pageNumber=1&pageSize=5000&storeId=${action.storeId}`,
            method: "get",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            return new merchantManagementActions.SaveStoreCategoryList(res);
          })
        );
    })
  );
  @Effect()
  addStoreCategoryList$ = this.actions$.pipe(
    ofType<merchantManagementActions.StoreAddCategory>(
      merchantManagementActions.ActionTypes.storeAddCategory
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ndh-product/category/store-categories?storeId=${action.payload.storeId}`,
            method: "post",
            payload: action.payload.details,
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            this.toastr.success("Success");
            return new merchantManagementActions.StoreAddCategorySuccess(res);
          })
        );
    })
  );
  @Effect()
  deleteCategoryItem$ = this.actions$.pipe(
    ofType<merchantManagementActions.DeleteCategory>(
      merchantManagementActions.ActionTypes.deleteCategory
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/ndh-product/category/delete-store-categories/${action.payload.itemId}?storeId=${action.payload.storeId}`,
            method: "delete",
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            this.toastr.success("Deleted");
            return new merchantManagementActions.DeleteCategorySuccess(res);
          })
        );
    })
  );
  @Effect()
  editCategoryItem$ = this.actions$.pipe(
    ofType<merchantManagementActions.EditCategoryDeatils>(
      merchantManagementActions.ActionTypes.editCategoryDeatils
    ),
    switchMap((action) => {
      console.log(action.payload);
      return this.request
        .request(
          {
            url: `/api/ndh-product/category/store-categories?storeId=${action.payload.storeId}`,
            method: "post",
            payload: action.payload.details,
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            console.log(res);
            this.toastr.success("Edited");
            return new merchantManagementActions.EditCategorySuccess(res);
          })
        );
    })
  );
  @Effect()
  getMerchantInfoById$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetMerchantInfoById>(
      merchantManagementActions.ActionTypes.getMerchantInfoById
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/info/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreMerchantInfoById(response)
          )
        )
    )
  );
  @Effect()
  getStoreListByMerchantId$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreListByMerchantId>(
      merchantManagementActions.ActionTypes.getStoreListByMerchantId
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/ndh-admin/search/sellers?pageNumber=${action.payload.pageNo}&pageSize=${action.payload.pageSize}`,
            method: "post",
            payload: action.payload.requestBody,
          },
          true,
          false
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoreListByMerchantId(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  createStoreHub = this.actions$.pipe(
    ofType<merchantManagementActions.CreateStoreHub>(
      merchantManagementActions.ActionTypes.createStoreHub
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/store-hub/create",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) =>
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.createStoreHub,
              status: true,
            })
          )
        )
    )
  );
  @Effect()
  getHubListByMerchantId$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetHubListByMerchantId>(
      merchantManagementActions.ActionTypes.getHubListByMerchantId
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/store-hub/hub-details-by-merchant/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreHubListByMerchantId(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  updateMerchantInfo$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMerchantInfo>(
      merchantManagementActions.ActionTypes.updateMerchantInfo
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/store-merchant/update",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateMerchantInfo,
              status: true,
            });
          })
        )
    )
  );
  @Effect()
  getStoreHubByID$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoreHubByID>(
      merchantManagementActions.ActionTypes.getStoreHubByID
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/store-hub/hub-details/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoreHubByID(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  updateStoreHub$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateStoreHub>(
      merchantManagementActions.ActionTypes.updateStoreHub
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/store-hub/update",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((response) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateStoreHub,
              status: true,
            });
          })
        )
    )
  );

  @Effect()
  getMerchantHubStoreUserList$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetMerchantHubStoreUserList>(
      merchantManagementActions.ActionTypes.getMerchantHubStoreUserList
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/user/admin-api/get-store-users/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreMerchantHubStoreUserList(
                response
              )
          )
        )
    )
  );

  @Effect()
  getUserDetailsById$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetUserDetailsById>(
      merchantManagementActions.ActionTypes.getUserDetailsById
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: `/api/user/admin-users/user-details/${action.payload.id}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreUserDetailsById(response)
          )
        );
    })
  );
  @Effect()
  UpdateMerchantHubUserDetails = this.actions$.pipe(
    ofType<merchantManagementActions.GetUpdateMerchantHubUserDetails>(
      merchantManagementActions.ActionTypes.getUpdateMerchantHubUserDetails
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: "/api/user/admin-users/user-update",
            method: "post",
            payload: action.payload,
          },
          true,
          false
        )
        .pipe(
          map((res) => {
            // console.log(res);
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .getUpdateMerchantHubUserDetails,
              status: true,
            });
            return new merchantManagementActions.SaveUpdateMerchantHubUserDetails(
              res
            );
          })
        );
    })
  );

  @Effect( {dispatch: false} )
  updateMobileEmailofStore$ = this.actions$.pipe(
    ofType<merchantManagementActions.UpdateMobileEmailofStore>(
      merchantManagementActions.ActionTypes.updateMobileEmailofStore
    ),
    switchMap((action) => {
      // console.log( action );
      return this.request
        .request(
          {
            url: "/api/user/admin-api/update-user-phone-email",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res) => {
            // console.log(res);
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.updateMobileEmailofStore,
              status: true,
              payload: res
            });

          })
        );
    })
  );
  // new effect created

  @Effect( {dispatch: false} )
  resetStoreUserPassword$ = this.actions$.pipe(
    ofType<merchantManagementActions.ResetStoreUserPassword>(
      merchantManagementActions.ActionTypes.resetStoreUserPassword
    ),
    switchMap((action) => {
      console.log( action );
      return this.request
        .request(
          {
            url: "/api/user/admin-api/update-password",
            method: "post",
            payload: action.payload,
          },
          true,
          true
        )
        .pipe(
          map((res) => {
            // console.log(res);
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.resetStoreUserPassword,
              status: true,
              payload: res
            });

          })
        );
    })
  );
  // new effect created

  @Effect({ dispatch: false })
  createMerchantHubStoreUser = this.actions$.pipe(
    ofType<merchantManagementActions.CreateMerchantHubStoreUser>(
      merchantManagementActions.ActionTypes.createMerchantHubStoreUser
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/user/admin-api/store-user-registration",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) =>
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes
                .createMerchantHubStoreUser,
              status: true,
            })
          )
        )
    )
  );
  @Effect()
  getStoresByMerchantId$ = this.actions$.pipe(
    ofType<merchantManagementActions.GetStoresByMerchantId>(
      merchantManagementActions.ActionTypes.getStoresByMerchantId
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: `/api/store-management/v2/store-merchant/store-list/${action.payload}`,
            method: "get",
          },
          true
        )
        .pipe(
          map(
            (response) =>
              new merchantManagementActions.StoreStoresByMerchantId(response)
          )
        )
    )
  );
  @Effect({ dispatch: false })
  verifyBankAccount = this.actions$.pipe(
    ofType<merchantManagementActions.VerifyBankAccount>(
      merchantManagementActions.ActionTypes.verifyBankAccount
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/store-merchant/verify-bank-account",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) =>
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.verifyBankAccount,
              status: true,
            })
          )
        )
    )
  );
  @Effect({ dispatch: false })
  verifyPanNo = this.actions$.pipe(
    ofType<merchantManagementActions.VerifyPanNo>(
      merchantManagementActions.ActionTypes.verifyPanNo
    ),
    switchMap((action) =>
      this.request
        .request(
          {
            url: "/api/store-management/v2/store-merchant/verify-pan",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) =>
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.verifyPanNo,
              status: true,
            })
          )
        )
    )
  );
  @Effect()
  verifyGstn = this.actions$.pipe(
    ofType<merchantManagementActions.VerifyGstn>(
      merchantManagementActions.ActionTypes.verifyGstn
    ),
    switchMap((action) => {
      return this.request
        .request(
          {
            url: "/api/store-management/v2/store-hub/verify-gstn",
            method: "post",
            payload: action.payload,
          },
          true
        )
        .pipe(
          map((res) => {
            this.apiMessageService.changeApiStatus({
              type: merchantManagementActions.ActionTypes.verifyGstn,
              status: true,
            });
            return new merchantManagementActions.StoreVerifyGstn(res);
          })
        );
    })
  );
}