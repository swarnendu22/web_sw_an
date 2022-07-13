import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { DispatchBulkAction, PostAddNewMerchant, GetActiveMerchantDetails, UpdateMerchantDetails, ActionTypes, UpdateMerchantStatus, GetMerchantForEdit, StoreApproveReject } from 'src/app/actions/merchant-management.actions';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import qs from 'qs';
import { ApproveRejectSellerRequest } from './../../../../actions/merchant-management.actions';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationBoxComponent } from '../../components/confirmation-box/confirmation-box.component';
import { MatDialog } from '@angular/material/dialog';


export interface PayLoadForStore {
  "storeId": Number,
  "latitude": String,
  "longitude": String
}

export interface StoreType {
  'store_type': String
}

export interface StoreStatus {
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

export interface Days {
  'daysKey': String,
  'daysValue': String
}

export interface StoreDaysOperation {
  "dayName": String,
  "openTime": String,
  "closeTime": String,
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
  selector: 'app-display-merchant-management',
  templateUrl: './display-merchant-management.component.html',
  styleUrls: ['./display-merchant-management.component.css']
})
export class DisplayMerchantManagementComponent implements OnInit {


  pageDetail = {
    "pageTitle": "Manage Store",
    "merchantCode": ""
  }

  basicDetailsForm: FormGroup;
  paymentDetailsForm: FormGroup;
  merchantDetailsForm: FormGroup;
  categoryDetailsForm: FormGroup
  bankDetailsForm: FormGroup;
  addressDetailsForm: FormGroup;
  storeOperationForm: FormGroup;

  detailsList = {
    commissionType: null,
    merchantGroup: null,
    buisnessCategory: null,
    regionsList: null,
    paymentMethods: null,
    fullfillmentMode: null
  };

  store_status = null;
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
  dayList: Days[] = [
    {
      'daysKey': 'SUNDAY',
      'daysValue': 'SUNDAY'
    },
    {
      'daysKey': 'MONDAY',
      'daysValue': 'MONDAY'
    },
    {
      'daysKey': 'TUESDAY',
      'daysValue': 'TUESDAY'
    },
    {
      'daysKey': 'WEDNESDAY',
      'daysValue': 'WEDNESDAY'
    },
    {
      'daysKey': 'THURSDAY',
      'daysValue': 'THURSDAY'
    },
    {
      'daysKey': 'FRIDAY',
      'daysValue': 'FRIDAY'
    },
    {
      'daysKey': 'SATURDAY',
      'daysValue': 'SATURDAY'
    },
  ]

  storeDaysOperation: StoreDaysOperation = {
    "dayName": '',
    "openTime": '',
    "closeTime": '',
    "isOpen": true
  }

  selectedStoreDaysOperationList: StoreDaysOperation[] = [];

  map: Map = { lat: 22.573715, lng: 88.437532 };

  payLoad: PayLoadForStore = {
    "storeId": null,
    "latitude": '',
    "longitude": ''
  }

  storeType: StoreType[] = [
    {
      store_type: "PUBLIC"
    },
    {
      store_type: "PRIVATE"
    }
  ]

  storeStatus: StoreStatus[] = [
    {
      statusKey: "ALL",
      statusValue: "ALL"
    },
    {
      statusKey: "APPROVED",
      statusValue: "APPROVED"
    },
    {
      statusKey: "APPROVED-NO-PRODUCT",
      statusValue: "APPROVED-NO-PRODUCT"
    },
    {
      statusKey: "REJECTED",
      statusValue: "REJECTED"
    },
    {
      statusKey: "DELETED",
      statusValue: "DELETED"
    },
    {
      statusKey: "PENDING",
      statusValue: "PENDING"
    }
  ]

  storeOperationRequest: StoreOperationRequest = {
    storeid: 0,
    storeOperation: this.selectedStoreDaysOperationList
  }


  formApproveMode = {
    basicDetailsForm: false, addressDetailsForm: false, bankDetailsForm: false, categoryDetailsForm: false, merchantDetailsForm: false, paymentDetailsForm: false, storeOperationForm: false
  }

  constructor(private fb: FormBuilder, private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private apiMsgService: ApiMessageService,
    private location: Location,
    private requestService: RequestService,
    private toaster: ToastrService,
    public dialog: MatDialog,
    public router: Router,

  ) {


    this.payLoad.storeId = this.activatedRoute.snapshot.params.storeId;
    this.payLoad.latitude = this.activatedRoute.snapshot.params.latitude;
    this.payLoad.longitude = this.activatedRoute.snapshot.params.longitude;
    this.editableMerchantId = this.activatedRoute.snapshot.params.storeId;

    this.store.pipe(select('merchantManagement')).subscribe(arg => this.getDetailsFromStore(arg));
    this.store.pipe(select('manageCategories')).subscribe(res => {
      this.categories = res.allcategories;
    });
    //this.store.dispatch(new GetActiveMerchantDetails(this.editableMerchantId));

    this.store.dispatch(new GetMerchantForEdit(this.payLoad));

    this.setUpInitialForm();

    this.basicDetailsForm.disable();
    this.addressDetailsForm.disable();
    this.bankDetailsForm.disable();
    this.categoryDetailsForm.disable();
    this.merchantDetailsForm.disable();
    this.paymentDetailsForm.disable();
    this.storeOperationForm.disable();

  }

  ngOnInit() {
    this.store.dispatch(new DispatchBulkAction());
    this.store.dispatch(new GetAllCategory());

    this.store.pipe(select("manageCategories")).subscribe(res => {
      this.items = res.allcategories;
    })

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      this.activeMerchantDetails = res.merchantDetail;

      if (this.activeMerchantDetails) {
        //this.storeList = this.activeMerchantDetails[0]['marketplaceStoresList'];
        //this.pageDetail.merchantCode = '#'+this.activeMerchantDetails[0]['code'];
        this.store_status = this.activeMerchantDetails[0]['sourceAsMap']['store_status'];
        this.initilizeBasicDetailsForm();
        this.initilizeAddressDetailsForm();
        this.initilizeBankDetailsForm();
        this.initilizeMerchantDetailsForm();
        this.initilizePaymentDetailsForm();
        this.initilizeCategoryDetailsForm();

        //this.categoryDetailsForm.get('multipleCategoryIdStr').setValue(categoryIdList);
      }
    });
    this.getApproveRequest();
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

  getApproveRequest() {
    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      if (this.approveMode) {
        this.requestObj = this.approveObj.requestObj;
        // WHICH FORM HAS THE VALUE DETECT IT.
        Object.keys(this.formApproveMode).forEach((key) => {
          const controls = this[key].controls;
          const requestArr = Object.keys(this.requestObj);
          if (Object.keys(controls).includes(requestArr[2])) {
            if (key == "categoryDetailsForm") {
              this.requestedIdData = this.requestObj['multipleCategoryIdStr'].split(',');
            }
            this.formApproveMode[key] = true;
            this.approveScrollViewId = key;
            return false;
          }
        });
        document.querySelectorAll('.btn-upload-image').forEach((ite: any) => ite.style.display = 'none');
        // SCROLL INTO VIEW.
      }
    }
  }
  getDetailsFromStore(arg) {
    Object.assign(this.detailsList, arg);
  }
  onFileUpload(event, type) {
    this.basicDetailsForm.get(type).setValue(event.Location);
  }
  categorySelectionValue(event) {
    const value = event.map(i => i.item.id);
    this.categoryDetailsForm.get('multipleCategoryIdStr').setValue(value);
  }
  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;

    if (formStats.disabled) {
      formStats.enable();
    } else {
      switch (formName) {
        case 'basicDetailsForm': {
          formStats.reset();
          this.initilizeBasicDetailsForm();
          break;
        }
        case 'addressDetailsForm': {
          formStats.reset();
          this.initilizeAddressDetailsForm();
          break;
        } case 'bankDetailsForm': {
          formStats.reset();
          this.initilizeBankDetailsForm();
          break;
        } case 'merchantDetailsForm': {
          formStats.reset();
          this.initilizeMerchantDetailsForm();
          break;
        } case 'paymentDetailsForm': {
          formStats.reset();
          this.initilizePaymentDetailsForm();
          break;
        }
        case 'categoryDetailsForm': {
          this.populateDefaultCategory();
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

  assignToLegalName(event) {
    const value = event.target.value;
    this.basicDetailsForm.get('legalName').setValue(value.trim())
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
        // if(this.isFormValidValueChange('basicDetailsForm')){ 
        // url = 'sellers/request/basic-info';
        url = 'update/basicinfo';
        data = this[formName].value;
        //}
        break;
      case 'addressDetailsForm':
        // if(this.isFormValidValueChange('addressDetailsForm')){
        //url = 'sellers/request/address';
        url = 'update/addressinfo';
        const regionId = this.addressDetailsForm.get('store_region').value;
        const region = this.detailsList.regionsList.payload.find(i => i.id === regionId);
        this.addressDetailsForm.get('store_regionname').setValue(region.name);
        this.addressDetailsForm.get('store_regioncode').setValue(region.code);
        data = this[formName].value;
        // }
        break;
      case 'bankDetailsForm':
        //if(this.isFormValidValueChange('bankDetailsForm')){
        //url = 'sellers/request/bank-details';
        url = 'update/bankinfo'
        data = this[formName].value;
        //}        
        break;
      case 'storeOperationForm':
        url = 'update/storeOperation'
        this.storeOperationRequest.storeid = id;
        data = this.storeOperationRequest
        break;
      case 'categoryDetailsForm':
        if (this.isFormValidValueChange('categoryDetailsForm')) {
          url = 'sellers/request/categories';
          this[formName].get('storeCategoryList').setValue(this.storeCategoryList);
          data = this[formName].value;
        }
        break;
      case 'merchantDetailsForm':
        if (this.isFormValidValueChange('merchantDetailsForm')) {
          url = 'sellers/request/marchant-details';
          data = this[formName].value;
        }
        break;
      case 'paymentDetailsForm':
        if (this.isFormValidValueChange('paymentDetailsForm')) {
          url = 'sellers/request/commission-payment-info';
          data = this[formName].value;
        }
        break;
      default:
        url = null;
    }
    if (url) {
      const self = this;
      if (this[formName].valid) {
        this.callApi(url, data, id, formName);
      } else {
        this.markFormGroupTouched(this[formName]);
        // alert('Fill All The Required Fields');
      }
      // this.callApi(url, data, id, formName)
    }
    this.disabledForm(formName);
    this.getFormDisableStats(formName);

  }
  setUpInitialForm() {

    this.basicDetailsForm = this.fb.group({
      store_display_name: [''],
      store_contact: [''],
      store_support: [''],
      store_email: [''],
      store_is_active: [],
      self_ship: [],
      store_multi_brand_store: [],
      store_pickup: [],
      store_allow_marketplace: [],
      store_allow_local_listing: [],
      store_local_listing_range: [],
      allowCartWithOthers: [],
      store_status: [],
      logourl: []
    });

    this.addressDetailsForm = this.fb.group({
      store_address: [''],
      store_landmark: '',
      store_zip: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      store_city: ['', Validators.required],
      store_latitude: [],
      store_longitude: [],
      store_region: ['', Validators.required],
      store_regioncode: [''],
      store_regionname: [''],
      shortAddress: []
    });

    this.bankDetailsForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,25}$/)]],
      ifscCode: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      accountType: ['', Validators.required]
    });

    this.categoryDetailsForm = this.fb.group({
      storeCategoryList: [''],
    });

    this.merchantDetailsForm = this.fb.group({
      businessCategoryId: ['', Validators.required],
      store_org_business_model: ['', Validators.required],
      store_type: []
    });


    this.paymentDetailsForm = this.fb.group({
      commissionGroupId: ['', Validators.required],
      paymentMilestone: ['', Validators.required],
      paymentAfter: ['', Validators.required]
    });

    this.storeOperationForm = this.fb.group({
      storeOperations: [],
      dayName: [],
      openTime: [],
      closeTime: [],
      isOpen: []
    })

  }


  callApi(url, data, id, formName) {
    this.store.dispatch(new UpdateMerchantDetails({ url, data, id, formName }));
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

        case 'addressDetailsForm': {
          if (this.addressDetailsForm.get('address').value !== this.activeMerchantDetails[0]['address']) {
            ++index;
          }
          if (this.addressDetailsForm.get('landmark').value !== this.activeMerchantDetails[0]['landmark']) {
            ++index;
          }
          if (this.addressDetailsForm.get('zip').value !== this.activeMerchantDetails[0]['zip']) {
            ++index;
          }
          if (this.addressDetailsForm.get('regionCode').value !== this.activeMerchantDetails[0]['regionCode']) {
            ++index;
          }
          if (this.addressDetailsForm.get('city').value !== this.activeMerchantDetails[0]['city']) {
            ++index;
          }
          break;
        }
        case 'bankDetailsForm': {
          if (this.bankDetailsForm.get('beneficiaryName').value !== this.activeMerchantDetails[0]['beneficiaryName']) {
            ++index;
          }
          if (this.bankDetailsForm.get('accountNumber').value !== this.activeMerchantDetails[0]['accountNumber']) {
            ++index;
          }
          if (this.bankDetailsForm.get('ifscCode').value !== this.activeMerchantDetails[0]['ifscCode']) {
            ++index;
          }
          if (this.bankDetailsForm.get('bankName').value !== this.activeMerchantDetails[0]['bankName']) {
            ++index;
          }
          if (this.bankDetailsForm.get('branchName').value !== this.activeMerchantDetails[0]['branchName']) {
            ++index;
          }
          if (this.bankDetailsForm.get('accountType').value !== this.activeMerchantDetails[0]['accountType']) {
            ++index;
          }
          break;
        }
        case 'merchantDetailsForm': {
          if (this.merchantDetailsForm.get('businessCategoryId').value !== this.activeMerchantDetails[0]['businessCategoryId']) {
            ++index;
          }
          if (this.merchantDetailsForm.get('orgBusinessModel').value !== this.activeMerchantDetails[0]['orgBusinessModel']) {
            ++index;
          }
          break;
        }
        case 'paymentDetailsForm': {
          if (this.paymentDetailsForm.get('commissionGroupId').value !== this.activeMerchantDetails[0]['commissionGroupId']) {
            ++index;
          }
          if (this.paymentDetailsForm.get('paymentMilestone').value !== this.activeMerchantDetails[0]['paymentMilestone']) {
            ++index;
          }
          if (this.paymentDetailsForm.get('paymentAfter').value !== this.activeMerchantDetails[0]['paymentAfter']) {
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
    this.basicDetailsForm.get('store_display_name').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_display_name']);
    this.basicDetailsForm.get('store_contact').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_contact']);
    this.basicDetailsForm.get('store_support').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_support']);
    this.basicDetailsForm.get('store_email').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_email']);
    this.basicDetailsForm.get('store_is_active').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_is_active']);
    this.basicDetailsForm.get('self_ship').setValue(this.activeMerchantDetails[0]['sourceAsMap']['self_ship']);


    this.basicDetailsForm.get('store_multi_brand_store').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_multi_brand_store']);
    this.basicDetailsForm.get('store_pickup').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_pickup']);
    this.basicDetailsForm.get('store_allow_marketplace').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_allow_marketplace']);
    this.basicDetailsForm.get('store_allow_local_listing').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_allow_local_listing']);
    this.basicDetailsForm.get('store_local_listing_range').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_local_listing_range']);
    this.basicDetailsForm.get('allowCartWithOthers').setValue(this.activeMerchantDetails[0]['sourceAsMap']['allowCartWithOthers']);
    this.basicDetailsForm.get('store_status').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_status']);
    this.basicDetailsForm.get('logourl').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_logo_url']);


  }

  initilizeAddressDetailsForm() {
    this.addressDetailsForm.get('store_address').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_address']);

    if (this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']) {
      this.addressDetailsForm.get('store_landmark').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['name']);
      this.addressDetailsForm.get('store_latitude').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['latitude']);
      this.addressDetailsForm.get('store_longitude').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['longitude']);

      if (!isNaN(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['latitude'])) {
        this.map.lat = Number(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['latitude']);
      }

      if (!isNaN(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['longitude'])) {
        this.map.lng = Number(this.activeMerchantDetails[0]['sourceAsMap']['store_landmark']['longitude']);
      }

    }
    this.addressDetailsForm.get('store_zip').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_zip']);
    this.addressDetailsForm.get('store_city').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_city']);
    this.addressDetailsForm.get('store_region').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_region']);
    this.addressDetailsForm.get('shortAddress').setValue(this.activeMerchantDetails[0]['sourceAsMap']['shortAddress']);

  }



  initilizeBankDetailsForm() {
    this.bankDetailsForm.get('beneficiaryName').setValue(this.activeMerchantDetails[0]['beneficiaryName']);
    this.bankDetailsForm.get('accountNumber').setValue(this.activeMerchantDetails[0]['accountNumber']);
    this.bankDetailsForm.get('ifscCode').setValue(this.activeMerchantDetails[0]['ifscCode']);
    // this.bankDetailsForm.get('swiftCode').setValue(this.activeMerchantDetails[0]['swiftCode']);
    this.bankDetailsForm.get('bankName').setValue(this.activeMerchantDetails[0]['bankName']);
    this.bankDetailsForm.get('branchName').setValue(this.activeMerchantDetails[0]['branchName']);
    this.bankDetailsForm.get('accountType').setValue(this.activeMerchantDetails[0]['accountType']);
  }

  initilizeMerchantDetailsForm() {
    this.merchantDetailsForm.get('businessCategoryId').setValue(this.activeMerchantDetails[0]['sourceAsMap']['businessCategoryId']);
    this.merchantDetailsForm.get('store_org_business_model').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_org_business_model']);
    this.merchantDetailsForm.get('store_type').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_type']);
  }

  initilizePaymentDetailsForm() {
    this.paymentDetailsForm.get('commissionGroupId').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_commission_group_id']);
    this.paymentDetailsForm.get('paymentMilestone').setValue(this.activeMerchantDetails[0]['paymentMilestone']);
    this.paymentDetailsForm.get('paymentAfter').setValue(this.activeMerchantDetails[0]['paymentAfter']);
  }

  initilizeCategoryDetailsForm() {

    if (this.storeCategoryList && this.storeCategoryList.length == 0) {
      if (this.activeMerchantDetails[0]['sourceAsMap']['store_category'] && this.activeMerchantDetails[0]['sourceAsMap']['store_category'].length > 0) {
        this.activeMerchantDetails[0]['sourceAsMap']['store_category'].map(storeCategory => {
          if (storeCategory.path) {
            storeCategory.path = storeCategory.path.replace(/[/]/g, ' >> ');
          }
          this.storeCategoryList.push(storeCategory);
        })
      }
    }
    this.categoryDetailsForm.get('storeCategoryList').setValue(this.activeMerchantDetails[0]['sourceAsMap']['store_category']);
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

  markerDragEnd(e) {
    this.map = e.coords;
    this.addressDetailsForm.get('store_latitude').setValue(this.map.lat);
    this.addressDetailsForm.get('store_longitude').setValue(this.map.lat);
  }

  addStoreOperations() {
    if (!this.getFormDisableStats('storeOperationForm') && this.storeDaysOperation.dayName && this.storeDaysOperation.openTime && this.storeDaysOperation.closeTime) {
      if (this.selectedStoreDaysOperationList && this.selectedStoreDaysOperationList.length > 0) {
        let findIndex = this.selectedStoreDaysOperationList.findIndex(storeOperation => storeOperation.dayName == this.storeDaysOperation.dayName);
        if (findIndex !== -1) {
          this.selectedStoreDaysOperationList[findIndex].dayName = this.storeDaysOperation.dayName;
          this.selectedStoreDaysOperationList[findIndex].openTime = this.storeDaysOperation.openTime;
          this.selectedStoreDaysOperationList[findIndex].closeTime = this.storeDaysOperation.closeTime;
          this.selectedStoreDaysOperationList[findIndex].isOpen = this.storeDaysOperation.isOpen;
        } else {
          this.selectedStoreDaysOperationList.push(this.storeDaysOperation);
        }
      } else {
        this.selectedStoreDaysOperationList.push(this.storeDaysOperation);
      }
      this.initilizeStoreDaysOperation();
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
      "openTime": '',
      "closeTime": '',
      "isOpen": true
    }
  }

  rejectApproveOperation(type) {
    if (type) {
      const dialog = this.dialog.open(ConfirmationBoxComponent, {
        width: '50%',
        data: {
          payload: {
            actionType: type,
            paramData: {
              id: this.editableMerchantId,
              storeName: this.activeMerchantDetails[0]['sourceAsMap']['store_display_name'],
              zipCode: this.activeMerchantDetails[0]['sourceAsMap']['store_zip'],
              city: this.activeMerchantDetails[0]['sourceAsMap']['store_city'],
              regionName: this.activeMerchantDetails[0]['sourceAsMap']['store_region']
            }
          }
        }
      });

      dialog.afterClosed().subscribe(result => {
        if (result.processType === 'process') {
          console.log('The dialog was closed', result);

          this.store.dispatch(new StoreApproveReject({
            pageNo: 1,
            requestBody: {
              storeId: result.payload.payload.paramData.id,
              status: result.payload.payload.actionType,
              remarks: result.payload.remarks,
            }
          }, false));
          this.apiMsgService.currentApiStatus.subscribe((response) => {
            let res: any = response.status;
            if (res && response.type == ActionTypes.storeApproveReject) {
              this.router.navigate(['/merchant/manage-active-merchant/']);
            }
          })
        } else {
          console.log('The dialog was closed', result);
        }
      });
    }
  }


}