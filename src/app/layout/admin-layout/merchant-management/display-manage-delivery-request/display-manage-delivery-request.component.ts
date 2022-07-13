import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { DispatchBulkAction, PostAddNewMerchant, GetActiveMerchantDetails, UpdateMerchantDetails, ActionTypes, UpdateMerchantStatus, GetMerchantForEdit, EnableStoreDelivery } from 'src/app/actions/merchant-management.actions';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import qs from 'qs';
import { ApproveRejectSellerRequest } from './../../../../actions/merchant-management.actions';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import { ToastrService } from 'ngx-toastr';
import { number } from 'ngx-custom-validators/src/app/number/validator';


export interface StoreType {
  'store_type': String
}

export interface Payload {
  "store_id": Number,
  "deliveryAttributes": DeliveryAttributes,
  "status": String,
  "rejectRemarks": String,
  "code": String
}

export interface DeliveryAttributes {
  "self_delivery": Boolean,
  "self_delivery_params": SelfDeliveryParams
}


export interface SelfDeliveryParams {
  "additional_delivery_cost": Number,
  "additional_delivery_cost_unit": String,
  "delivery_redius": Number,
  "delivery_redius_unit": String,
  "free_delivery_cart_value": Number,
  "free_delivery_radius": Number,
  "free_delivery_radius_unit": String,
  "max_delivary_range": Number,
  "note": String,
  "payment_terms": String

}


export interface DeliveryRequestStatus {
  statusKey: string;
  statusValue: string;
}

export interface StoreCategory {
  'id': number,
  'name': String,
  'parentId': String,
  'imageUrl': String,
  'path': String;
}

export interface StoreDaysOperation {
  "dayName": String,
  "openTime": Date,
  "closeTime": Date,
  "isOpen": boolean;
}

export interface Map {
  lat: number,
  lng: number
}

export interface StoreOperationRequest {

  storeid: number;
  storeOperation: StoreDaysOperation[];

}

@Component({
  selector: 'app-display-manage-delivery-request',
  templateUrl: './display-manage-delivery-request.component.html',
  styleUrls: ['./display-manage-delivery-request.component.css']
})
export class DisplayManageDeliveryRequestComponent implements OnInit {

  storeId = null;
  deliveryStatusSelected = null;

  pageDetail = {
    "pageTitle": "Manage Store Delivery Request",
    "merchantCode": ""
  }

  basicDetailsForm: FormGroup;


  detailsList = {
    commissionType: null,
    merchantGroup: null,
    buisnessCategory: null,
    regionsList: null,
    paymentMethods: null,
    fullfillmentMode: null
  };

  categories = null;
  editableMerchantId = null;
  activeMerchantDetails = null;
  selectedOption = [];
  storeList = [];
  approveMode = false;
  requestObj = null;
  approveObj = null;
  apiMsgServiceSubscription: Subscription;
  approveScrollViewId = null
  requestedCategoryData = [];
  requestedIdData = [];
  merchantEmailAvaibilityText = '';
  //marketplaceMerchantCategoryList = [];
  paramsValue: any = null;
  public AllowParentSelection = false;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;
  items = [];
  selectedItem: any = null;
  addCategoryCounter: number = 0;
  deleteCategoryCounter: number = 0;
  storeCategoryList = [];
  apiDetails = null

  storeDaysOperation: StoreDaysOperation = {
    "dayName": '',
    "openTime": new Date(),
    "closeTime": new Date(),
    "isOpen": true
  }

  selectedStoreDaysOperationList: StoreDaysOperation[] = [];

  map: Map = { lat: 28.6139, lng: 77.2090 };


  storeType: StoreType[] = [
    {
      store_type: "PUBLIC"
    },
    {
      store_type: "PRIVATE"
    }
  ]

  deliveryRequetStatusList: DeliveryRequestStatus[] = [
    {
      statusKey: "APPROVED",
      statusValue: "APPROVED"
    },
    {
      statusKey: "REJECTED",
      statusValue: "REJECTED"
    },
    // {
    //   statusKey: "HOLD",
    //   statusValue: "HOLD"
    // },
  ]


  selfDeliveryParams: SelfDeliveryParams = {
    "additional_delivery_cost": 0,
    "additional_delivery_cost_unit": "km",
    "delivery_redius": 0,
    "delivery_redius_unit": "km",
    "free_delivery_cart_value": 0,
    "free_delivery_radius": 0,
    "free_delivery_radius_unit": "km",
    "max_delivary_range": 1,
    "note": "Please call first..",
    "payment_terms": "Some payment terms"

  }

  deliveryAttribute: DeliveryAttributes = {
    "self_delivery": false,
    "self_delivery_params": this.selfDeliveryParams
  }



  payload: Payload = {
    "store_id": 0,
    "deliveryAttributes": this.deliveryAttribute,
    "status": "",
    "rejectRemarks": "",
    "code": ''

  };



  storeOperationRequest: StoreOperationRequest = {
    storeid: 0,
    storeOperation: this.selectedStoreDaysOperationList
  }

  formApproveMode = {
    basicDetailsForm: false
  }

  constructor(private fb: FormBuilder, private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private apiMsgService: ApiMessageService,
    private toaster: ToastrService) {

    console.log(this.activatedRoute.snapshot.params)

    this.paramsValue = JSON.parse(this.activatedRoute.snapshot.params.id);
    this.storeId = this.paramsValue.id;

    this.store.dispatch(new GetMerchantForEdit({
      storeId: this.storeId,
      latitude: '22.5735669',
      longitude: '88.437227',
    }));

    this.store.pipe(select('merchantManagement')).subscribe(arg => this.getDetailsFromStore(arg));
    this.store.pipe(select('manageCategories')).subscribe(res => {
      this.categories = res.allcategories;
    });
    this.setUpInitialForm();
    this.basicDetailsForm.disable();
  }

  ngOnInit() {
    this.store.dispatch(new DispatchBulkAction());
    this.store.dispatch(new GetAllCategory());

    this.store.pipe(select("manageCategories")).subscribe(res => {
      this.items = res.allcategories;
    })

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      this.apiDetails = res.merchantDetail;

      if (this.apiDetails) {
        console.log(this.activeMerchantDetails)
        this.activeMerchantDetails = res.merchantDetail[0]['sourceAsMap'];
        this.initilizeBasicDetailsForm();
      }
    });


  }

  ngOnDestroy() {
    //this.apiMsgServiceSubscription.unsubscribe();
  }
  ngAfterViewInit() {

    if (this.approveScrollViewId) {
      const element = document.getElementById(this.approveScrollViewId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
      if (this.approveMode) {
        document.querySelectorAll('.btn-upload-image').forEach((ite: any) => ite.style.display = 'none');
      }
    }

  }

  getDetailsFromStore(arg) {
    Object.assign(this.detailsList, arg);
  }
  onFileUpload(event, type) {
    this.basicDetailsForm.get(type).setValue(event.Location);
  }

  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;

    if (formStats.disabled) {
      formStats.enable();

      this.basicDetailsForm.get('businessCategoryId').disable();
      this.basicDetailsForm.get('storeType').disable();
    } else {
      switch (formName) {
        case 'basicDetailsForm': {
          formStats.reset();
          this.initilizeBasicDetailsForm();
          break;
        }
        default: {

        }
      }
      formStats.disable();
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  getValueForDropDownInApprove(dropDownType, id, returnParam, lookForParam) {
    if (this.detailsList[dropDownType]) {
      const obj = this.detailsList[dropDownType].payload.find(i => i[lookForParam] === id);
      if (obj) {
        return obj[returnParam];
      } else {
        return '';
      }
    } else {
      return '';
    }
  }


  categoryRequestedData(event) {
    this.requestedCategoryData = event;
  }
  checkForCategoryRequestChange() {
    let message = this.requestedCategoryData ? 'Requested Change: ' : '';
    this.requestedCategoryData.forEach(item => {
      message = message.concat(`${item.name} | `);
    });
    return message;
  }

  requestProcess(type) {
    this.approveObj.apiObj.approveStatus = type;
    this.store.dispatch(new ApproveRejectSellerRequest({ type: 'EDIT', data: this.approveObj.apiObj }));
  }


  async checkAvailabilityService(keyword) {
    const payload = { email: keyword.toString() };
    return this.apiMsgService
      .checkAvailability(
        payload
      )
  }
  async checkAvailability() {
    const keyWord = this.basicDetailsForm.get('primaryEmail').value;
    const checkStatusRes: Observable<any> = await this.checkAvailabilityService(keyWord);
    return checkStatusRes.pipe(map(res =>
      res.message.toLowerCase() == 'no' ? true : false
    ));
  }
  async checkAvaibilityOnClick() {
    if (this.basicDetailsForm.get('primaryEmail').valid) {
      if (this.activeMerchantDetails[0]['primaryEmail'] != this.basicDetailsForm.get('primaryEmail').value) {

        this.merchantEmailAvaibilityText = '';

        const res = await this.checkAvailability();
        res.subscribe(dt => {
          this.merchantEmailAvaibilityText = dt ? 'A Valid Email' : 'Email Already Taken';
        });
      }
    } else {
      this.merchantEmailAvaibilityText = 'Enter a valid email';
    }
  }
  async onSubmit(formName) {
    let url = null;
    let data = null;
    const id = this.editableMerchantId;
    switch (formName) {
      case 'basicDetailsForm':
        this.payload.store_id = this.activeMerchantDetails.storeId;
        this.selfDeliveryParams.delivery_redius = this[formName].get("localListingRange").value;
        this.deliveryAttribute.self_delivery_params = this.selfDeliveryParams;
      //  this.deliveryAttribute.self_delivery = this
      console.log("Status", this.deliveryStatusSelected);
      if(this.deliveryStatusSelected == 'APPROVED'){
        this.deliveryAttribute.self_delivery = true;
      }
      else if(this.deliveryStatusSelected == 'REJECTED'){
        this.deliveryAttribute.self_delivery = false;
      }
      else {
        this.deliveryAttribute.self_delivery = null;
      }  
       this.payload.deliveryAttributes = this.deliveryAttribute;
       console.log("Delivery Attributes",  this.payload.deliveryAttributes);
        this.payload.status = this[formName].get("deliveryRequestStatus").value;
        this.payload.rejectRemarks = this[formName].get("remarks").value;
        this.payload.code = this.paramsValue.code;
        url = '/enable-delivery';
        data = this.payload;
        break;
      default:
        url = null;
    }
    if (url) {
      const self = this;
      if (this[formName].valid) {
        this.callApi(url, data, id, formName);
        this.disabledForm(formName);
        this.getFormDisableStats(formName);
      } else {
        this.markFormGroupTouched(this[formName]);
      }
    }
  }
  setUpInitialForm() {

    this.basicDetailsForm = this.fb.group({
      storeName: [''],
      contactNumber: [''],
      supportNumber: [''],
      storeEmail: [''],
      isActive: [],
      shipmentType: [],
      multiBrandStore: [],
      homedelivery: [],
      storePickup: [],
      allowMarketplace: [],
      allowLocalListing: [],
      localListingRange: [],
      allowCartWithOthers: [],
      status: [],
      storeLogoUrl: [],
      address: [],
      shortAddress: [],
      landmark: [],
      city: [],
      regionName: [],
      zipCode: [],
      geoLat: [],
      geoLong: [],
      storeType: [],
      businessCategoryId: [],
      remarks: ["",],
      deliveryRequestStatus: ["", Validators.required]

    });

  }

  callApi(url, data, id, formName) {
    this.store.dispatch(new EnableStoreDelivery({ url, data, formName }));
  }

  checkExtension(file) {
    return file.split('.').pop();
  }

  disabledForm(formName) {
    const formStats = this[formName] as FormGroup;
    formStats.disable();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFormValidValueChange(formName) {
    if (this[formName].valid) {
      let index = 0;
      switch (formName) {
        case 'basicDetailsForm': {
          if (this.basicDetailsForm.get('merchantName').value !== this.activeMerchantDetails[0]['merchantName']) {
            ++index;
          }
          if (this.basicDetailsForm.get('contactPerson').value !== this.activeMerchantDetails[0]['contactPerson']) {
            ++index;
          }
          if (this.basicDetailsForm.get('primaryMobile').value !== this.activeMerchantDetails[0]['primaryMobile']) {
            ++index;
          }
          if (this.basicDetailsForm.get('displayName').value !== this.activeMerchantDetails[0]['displayName']) {
            ++index;
          }
          if (this.basicDetailsForm.get('primaryEmail').value !== this.activeMerchantDetails[0]['primaryEmail']) {
            ++index;
          }
          if (this.basicDetailsForm.get('contactNo').value !== this.activeMerchantDetails[0]['contactNo']) {
            ++index;
          }
          break;
        }
        default: {
          ++index;
        }
      }
      if (index > 0) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  initilizeBasicDetailsForm() {
    console.log(this.activeMerchantDetails)
    this.basicDetailsForm.get('storeName').setValue(this.activeMerchantDetails.store_display_name);
    this.basicDetailsForm.get('contactNumber').setValue(this.activeMerchantDetails.store_contact);
    this.basicDetailsForm.get('supportNumber').setValue(this.activeMerchantDetails.store_support);
    this.basicDetailsForm.get('storeEmail').setValue(this.activeMerchantDetails.store_email);
    this.basicDetailsForm.get('isActive').setValue(this.activeMerchantDetails.store_is_active);
    this.basicDetailsForm.get('shipmentType').setValue(this.activeMerchantDetails.shipmentType);
    this.basicDetailsForm.get('homedelivery').setValue(this.activeMerchantDetails.homedelivery);


    this.basicDetailsForm.get('multiBrandStore').setValue(this.activeMerchantDetails.multiBrandStore);
    this.basicDetailsForm.get('storePickup').setValue(this.activeMerchantDetails.storePickup);
    this.basicDetailsForm.get('allowMarketplace').setValue(this.activeMerchantDetails.allowMarketplace);
    this.basicDetailsForm.get('allowLocalListing').setValue(this.activeMerchantDetails.allowLocalListing);
    this.basicDetailsForm.get('localListingRange').setValue(this.activeMerchantDetails.store_local_listing_range);
    this.basicDetailsForm.get('allowCartWithOthers').setValue(this.activeMerchantDetails.allowCartWithOthers);
    this.basicDetailsForm.get('status').setValue(this.activeMerchantDetails.store_status);


    let logoImage = "";
    if (this.activeMerchantDetails.store_logo_url) {
      let x = this.activeMerchantDetails.store_logo_url.split('/');
      if (x.length >= 3) {
        if (x[2].includes('ndhbucket'))
          x[2] = 'ndh.imgix.net';
        logoImage = x.join('/');
        logoImage = `${logoImage}?w=250&h=250`
        this.basicDetailsForm.get('storeLogoUrl').setValue(logoImage);
      }
    } else {
      this.basicDetailsForm.get('storeLogoUrl').setValue(logoImage);
    }

    this.basicDetailsForm.get('address').setValue(this.activeMerchantDetails.store_address);
    this.basicDetailsForm.get('shortAddress').setValue(this.activeMerchantDetails.shortAddress);
    this.basicDetailsForm.get('landmark').setValue(this.activeMerchantDetails.store_landmark.name);
    this.basicDetailsForm.get('city').setValue(this.activeMerchantDetails.store_city);
    this.basicDetailsForm.get('regionName').setValue(this.activeMerchantDetails.store_region);
    this.basicDetailsForm.get('zipCode').setValue(this.activeMerchantDetails.store_zip);
    this.basicDetailsForm.get('geoLat').setValue(this.activeMerchantDetails.store_landmark.latitude);
    this.basicDetailsForm.get('geoLong').setValue(this.activeMerchantDetails.store_landmark.longitude);
    this.basicDetailsForm.get('storeType').setValue(this.activeMerchantDetails.store_type);
    this.basicDetailsForm.get('businessCategoryId').setValue(this.activeMerchantDetails.businessCategoryId);
    this.basicDetailsForm.get('deliveryRequestStatus').setValue(this.deliveryRequetStatusList[0].statusKey);
    this.basicDetailsForm.get('remarks').setValue("Approved");

    if (!isNaN(this.activeMerchantDetails.store_landmark.latitude)) {
      this.map.lat = Number(this.activeMerchantDetails.store_landmark.latitude);
    }

    if (!isNaN(this.activeMerchantDetails.store_landmark.longitude)) {
      this.map.lng = Number(this.activeMerchantDetails.store_landmark.longitude);
    }
    this.selectedStoreDaysOperationList = this.activeMerchantDetails.storeOperation;

    if ("APPROVED" == this.basicDetailsForm.get('deliveryRequestStatus').value) {
      this.basicDetailsForm.get('remarks').clearValidators();
      this.basicDetailsForm.get('localListingRange').setValidators([Validators.required, Validators.min(1)]);
      this.basicDetailsForm.updateValueAndValidity();
    } else {
      this.basicDetailsForm.get('remarks').setValue('');
      this.basicDetailsForm.get('localListingRange').clearValidators();
      this.basicDetailsForm.get('remarks').setValidators([Validators.required]);
      this.basicDetailsForm.updateValueAndValidity();
    }


  }

  onDeliveryRequestStatusChanged(deliveryStatus) {
    this.deliveryStatusSelected = deliveryStatus;
    console.log(deliveryStatus)
    if ("APPROVED" == deliveryStatus) {
      console.log('approved')

      this.basicDetailsForm.get('remarks').setValue("Approved");
      this.basicDetailsForm.get('remarks').clearValidators();
      this.basicDetailsForm.get('localListingRange').setValidators([Validators.required, Validators.min(1)]);
      this.basicDetailsForm.get('localListingRange').updateValueAndValidity();
      this.basicDetailsForm.get('remarks').updateValueAndValidity();
    } else {
      console.log('reject')

      this.basicDetailsForm.get('remarks').setValue("");
      this.basicDetailsForm.get('localListingRange').clearValidators();
      this.basicDetailsForm.get('remarks').setValidators([Validators.required]);
      this.basicDetailsForm.get('localListingRange').updateValueAndValidity();
      this.basicDetailsForm.get('remarks').updateValueAndValidity();
    }
  }


  initilizeStoreOperationForm() {
    // Not Value Comming From The Get Store By ID so setting value as null;
    // this.storeOperationForm.get('storeOperations').setValue(null);
    //this.storeOperationForm.get('dayName').setValue(null);
    //this.storeOperationForm.get('openTime').setValue(null);
    //this.storeOperationForm.get('closeTime').setValue(null);
    //this.storeOperationForm.get('isOpen').setValue(null);
  }


  onSelectedChange(e) {
    if (this.selectedItem) {
      let storeCategory: StoreCategory = this.initilizeStoreCategory();
      let findIndex = this.storeCategoryList.findIndex((storeCategory) => storeCategory.id === this.selectedItem.id);
      if (findIndex === -1) {
        if (this.selectedItem.path) {
          this.selectedItem.path = this.selectedItem.path.replace(/[/]/g, ' >> ');
        }
        if (this.selectedItem.products) {
          storeCategory = this.selectedItem;
          this.storeCategoryList.push(storeCategory);
          this.addCategoryCounter++;
        } else {
          this.toaster.error('Products not found for this category');
        }
      } else {
        this.toaster.info('Category is already present');
      }
    }
  }

  deleteSelectedCategory(storeCategoryParam) {
    if (!this.getFormDisableStats('categoryDetailsForm')) {
      if (storeCategoryParam) {
        let findIndex = this.storeCategoryList.findIndex((storeCategory) => storeCategory.id === storeCategoryParam.id);
        if (findIndex !== -1) {
          this.deleteCategoryCounter++;
          this.storeCategoryList.splice(findIndex, 1);
        }
      }
    } else {
      this.toaster.error('Can not delete category');
    }
  }


  populateDefaultCategory() {
    if (this.activeMerchantDetails[0]['sourceAsMap']['store_category'] && this.activeMerchantDetails[0]['sourceAsMap']['store_category'].length > 0) {
      this.storeCategoryList = [];
      this.activeMerchantDetails[0]['sourceAsMap']['store_category'].map(storeCategory => {
        if (storeCategory.path) {
          storeCategory.path = storeCategory.path.replace(/[/]/g, ' >> ');
        }
        this.storeCategoryList.push(storeCategory);
      });
    }
  }


  deleteStoreOperations(storeOperation) {
    if (!this.getFormDisableStats('storeOperationForm')) {
      if (storeOperation && storeOperation.dayName) {
        let findIndex = this.selectedStoreDaysOperationList.findIndex(storeDays => storeDays.dayName === storeOperation.dayName);
        if (findIndex !== -1) {
          this.selectedStoreDaysOperationList.splice(findIndex, 1);
        }
      }
    }
  }

  initilizeStoreCategory(): StoreCategory {
    let storeCategory: StoreCategory = {
      'id': 0,
      'name': '',
      'parentId': '',
      'imageUrl': '',
      'path': ''
    }
    return storeCategory;
  }

  initilizeStoreDaysOperation() {
    this.storeDaysOperation = {
      "dayName": '',
      "openTime": new Date(),
      "closeTime": new Date(),
      "isOpen": true
    }
  }

}
