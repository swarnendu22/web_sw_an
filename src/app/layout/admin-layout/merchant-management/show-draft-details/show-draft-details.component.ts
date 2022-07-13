import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { DispatchBulkAction, PostAddNewMerchant, GetActiveMerchantDetails, UpdateMerchantDetails, ActionTypes, UpdateMerchantStatus, GetMerchantForEdit, EnableStoreDelivery, StoreRequestApprove } from 'src/app/actions/merchant-management.actions';
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

export interface DeliveryRequestStatus {
  statusKey: string;
  statusValue: string;
}

export interface PayloadForApproveReject {
  status: string;
  requestCode: string;
  remarks: string;

}

export interface Map {
  lat: number,
  lng: number
}

export interface PayLoadForStore {
  "storeId": Number,
  "latitude": String,
  "longitude": String
}

@Component({
  selector: 'app-display-manage-delivery-request',
  templateUrl: './show-draft-details.component.html',
  styleUrls: ['./show-draft-details.component.css']
})

export class ShowDraftDetailsComponent implements OnInit {

  paramValue: any = null;

  pageDetail = {
    "pageTitle": "Draft Store",
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
  selectedOption = [];
  storeList = [];
  approveMode = true;
  requestObj = null;
  approveObj = null;
  apiMsgServiceSubscription: Subscription;
  approveScrollViewId = null
  requestedCategoryData = [];
  requestedIdData = [];
  merchantEmailAvaibilityText = '';
  changeRequestValue = null;
  payloadForApproveReject: PayloadForApproveReject = {
    status: "",
    requestCode: "",
    remarks: ""
  };

  isSubmitted = false;

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

  currentStoreDetial: any = null;

  deliveryRequetStatusList: DeliveryRequestStatus[] = [
    {
      statusKey: "APPROVED",
      statusValue: "APPROVED"
    },
    {
      statusKey: "REJECTED",
      statusValue: "REJECTED"
    },
    {
      statusKey: "HOLD",
      statusValue: "HOLD"
    },
  ]

  payLoad: PayLoadForStore = {
    "storeId": null,
    "latitude": '',
    "longitude": ''
  }

  formApproveMode = {
    basicDetailsForm: false
  }

  constructor(private fb: FormBuilder, private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private apiMsgService: ApiMessageService,
    private route: Router,
    private toaster: ToastrService) {

    this.paramValue = JSON.parse(this.activatedRoute.snapshot.params.requestData);
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

    if (this.paramValue) {
      this.changeRequestValue = this.paramValue.request;
      let coverImage = "";
      let logoImage = "";
      console.log("$$$$$$$$$$$$$", this.changeRequestValue)
      if(this.changeRequestValue.coverImage && this.changeRequestValue.coverImage[0]){
        let x = this.changeRequestValue.coverImage[0].split('/');
        if (x.length >= 3) {
        if (x[2].includes('ndhbucket'))
        x[2] = 'ndh.imgix.net';
        coverImage = x.join('/');
        coverImage = `${coverImage}?w=250&h=250`
        this.changeRequestValue.coverImage[0] = coverImage;
       }
      }

      if(this.changeRequestValue.logoUrl){
        let x = this.changeRequestValue.logoUrl.split('/');
        if (x.length >= 3) {
        if (x[2].includes('ndhbucket'))
        x[2] = 'ndh.imgix.net';
        logoImage = x.join('/');
        logoImage = `${logoImage}??w=250&h=250`
        this.changeRequestValue.logoUrl = logoImage;
       }
      }
    
      this.payloadForApproveReject.requestCode = this.paramValue.code;
      this.currentStoreDetial = this.changeRequestValue.store;
      
    }

    if (this.currentStoreDetial) {
      this.initilizeBasicDetailsForm();
    }


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


  setUpInitialForm() {
    this.basicDetailsForm = this.fb.group({
      store_display_name: [''],
      tagLine: [''],
      businessCategoryId: [],
      businessCategoryName: [],
      store_address: [],
      store_cover_image: [],
      store_logo_url: [],
      remarks: ['', Validators.required],
    });

  }


  initilizeBasicDetailsForm() {

    this.basicDetailsForm.get('store_display_name').setValue(this.currentStoreDetial.storeName);
    this.basicDetailsForm.get('tagLine').setValue(this.currentStoreDetial.tagLine);
    this.basicDetailsForm.get('businessCategoryId').setValue(this.currentStoreDetial.businessCategoryId);
    //this.basicDetailsForm.get('businessCategoryName').setValue(this.currentStoreDetial.);
    this.basicDetailsForm.get('businessCategoryName').setValue("Business Category Name");

    this.basicDetailsForm.get('store_address').setValue(this.currentStoreDetial.address);

    let coverImage = "";
    let storeLogoImage = "";
    if(this.currentStoreDetial.storeCoverImage){
      
      let x = this.currentStoreDetial.storeCoverImage.split('/');
      if (x.length >= 3) {
      if (x[2].includes('ndhbucket'))
      x[2] = 'ndh.imgix.net';
      coverImage = x.join('/');
      coverImage = `${coverImage}?w=250&h=250`
      this.basicDetailsForm.get('store_cover_image').setValue(coverImage);
     }
    }else{
      this.basicDetailsForm.get('store_cover_image').setValue(coverImage);
    }

    if(this.currentStoreDetial.storeLogoUrl){
      let x = this.currentStoreDetial.storeLogoUrl.split('/');
      if (x.length >= 3) {
      if (x[2].includes('ndhbucket'))
      x[2] = 'ndh.imgix.net';
      storeLogoImage = x.join('/');
      storeLogoImage = `${storeLogoImage}?w=250&h=250`;
      this.basicDetailsForm.get('store_logo_url').setValue(storeLogoImage);
     }
    }else{
      this.basicDetailsForm.get('store_logo_url').setValue(storeLogoImage);
    }
    this.basicDetailsForm.get('remarks').enable();
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

  requestProcess(type) {
    this.payloadForApproveReject.status = type;
    this.payloadForApproveReject.remarks = this.basicDetailsForm.get('remarks').value;
    if (type !== 'APPROVED') {
      if (this.payloadForApproveReject.remarks.trim() === "") {
        this.basicDetailsForm.get('remarks').enable();
        this.basicDetailsForm.get('remarks').markAllAsTouched();
        this.toaster.error("Please Provide Remarks");
      } else {
        this.store.dispatch(new StoreRequestApprove(this.payloadForApproveReject));
        this.apiMsgService.currentApiStatus.subscribe((response) => {
          let res: any = response.status;
          if (res && response.type == ActionTypes.storeRequestApprove) {
            this.basicDetailsForm.get('remarks').disable();
            this.isSubmitted = true;
            //this.toaster.success(type);
            this.routeManageDraft();
          }
        })
      }
    } else {
      this.store.dispatch(new StoreRequestApprove(this.payloadForApproveReject));
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        console.log(response);
        let res: any = response.status;
        if (res && response.type == ActionTypes.storeRequestApprove) {
          this.isSubmitted = true;
          this.basicDetailsForm.get('remarks').disable();
          //this.toaster.success(type);
          this.routeManageDraft();
        }
      })
    }
  }
  checkExtension(file) {
    console.log("File is", file)
     return file[0].split('.').pop();
  }

  routeManageDraft() {
    let url = 'merchant/manage-draft';
    this.route.navigate([url]);
  }

}