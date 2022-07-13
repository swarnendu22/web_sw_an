import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { DispatchBulkAction, PostAddNewMerchant, GetActiveMerchantDetails, UpdateMerchantDetails, ActionTypes, UpdateMerchantStatus , GetMerchantForEdit, EnableStoreDelivery, StoreRequestApprove, GetStoreDraftRequest, StoreStoreDraftRequest, StoreMerchantDetails } from 'src/app/actions/merchant-management.actions';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import qs from 'qs';
import { ApproveRejectSellerRequest } from './../../../../actions/merchant-management.actions';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/utils/request/request.service';
import { ToastrService } from 'ngx-toastr';
import { number } from 'ngx-custom-validators/src/app/number/validator';

export interface StoreType{
   'store_type': String
}

export interface DeliveryRequestStatus {
  statusKey: string;
  statusValue: string;
}

export interface PayloadForApproveReject {
  status: string;
  requestCode : string;
  remarks: string;

}

export interface ResponseStoreRequestDraft{
  id: number;
  code : string;
  request: any;
  requestDate: Date;
  currentStatus:string;
  createdAt:Date
}

export interface Map{
  lat:number,
  lng:number
}

export interface PayLoadForStore {
  "storeId": Number,
  "latitude": String,
  "longitude": String
}

@Component({
  selector: 'app-approve-store-draft',
  templateUrl: './approve-store-draft.component.html',
  styleUrls: ['./approve-store-draft.component.css']
})
export class ApproveStoreDraftComponent implements OnInit {


pageDetail = {
    "pageTitle" : "Draft Store",
     "merchantCode":""
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
changeRequestValue = null;
payloadForApproveReject : PayloadForApproveReject = {
  status:"",
  requestCode:"",
  remarks:""
};

public AllowParentSelection = false;
public RestructureWhenChildSameName = false;
public ShowFilter = true;
public Disabled = false;
public FilterPlaceholder = 'Select Category...';
public MaxDisplayed = 5;
items = [];
selectedItem : any = null;
addCategoryCounter:number = 0;
deleteCategoryCounter:number = 0;
storeCategoryList = [];

currentStoreDetial = null; 


deliveryRequetStatusList : DeliveryRequestStatus[] = [
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

responseStoreRequestDraft : ResponseStoreRequestDraft = {
  "id":0,
  "code":"",
  "createdAt":null,
  "currentStatus":"",
  "request":null,
  "requestDate":null
} 

formApproveMode = {
  basicDetailsForm: false
}

constructor(private fb: FormBuilder, private store: Store<any>,
  private activatedRoute: ActivatedRoute, 
  private apiMsgService: ApiMessageService,
  private route : Router,
  private toaster: ToastrService) {
    this.store.pipe(select('merchantManagement')).subscribe(arg => this.getDetailsFromStore(arg));
    this.store.pipe(select('manageCategories')).subscribe(res => {
      this.categories = res.allcategories;
    });
    this.setUpInitialForm();
    this.basicDetailsForm.disable();
    this.callStoreDraftRequest();
  }


  ngOnInit() {
  this.store.dispatch(new DispatchBulkAction());
  this.store.dispatch(new GetAllCategory());

  this.callMerchantManagementDetail();

  this.store.pipe(select("manageCategories")).subscribe(res => {
    this.items = res.allcategories;
  });
  
}

ngOnDestroy() {
  this.clearStoreDate();
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
    businessCategoryId:[],
    businessCategoryName:[],
    store_address:[],
    store_cover_image:[],
    store_logo_url:[],
    remarks:['', Validators.required],
  });

}


initilizeBasicDetailsForm(){
    if(this.currentStoreDetial){
      this.basicDetailsForm.get('store_display_name').setValue(this.currentStoreDetial.storeName);
      this.basicDetailsForm.get('tagLine').setValue(this.currentStoreDetial.tagLine);
      this.basicDetailsForm.get('businessCategoryId').setValue(this.currentStoreDetial.businessCategoryId);
      //this.basicDetailsForm.get('businessCategoryName').setValue(this.currentStoreDetial.);
      this.basicDetailsForm.get('businessCategoryName').setValue("Business Category Name");
      this.basicDetailsForm.get('store_address').setValue(this.currentStoreDetial.address);
      this.basicDetailsForm.get('store_cover_image').setValue(this.currentStoreDetial.storeCoverImage);
      this.basicDetailsForm.get('store_logo_url').setValue(this.currentStoreDetial.storeLogoUrl);
      this.basicDetailsForm.get('remarks').enable();
      this.approveMode = true;
    }
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
  if(type !== 'APPROVED'){
     if(this.payloadForApproveReject.remarks.trim() === ""){
       this.basicDetailsForm.get('remarks').enable();
       this.basicDetailsForm.get('remarks').markAllAsTouched();
       this.toaster.error("Please Provide Remarks");
     }else{
      this.store.dispatch(new StoreRequestApprove(this.payloadForApproveReject));
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.storeRequestApprove) {
          this.basicDetailsForm.get('remarks').disable();
          this.toaster.success(type);
          this.parentMethod();
        }
      })
     }
  }else{
    this.store.dispatch(new StoreRequestApprove(this.payloadForApproveReject));
    this.apiMsgService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.storeRequestApprove) {
        this.basicDetailsForm.get('remarks').disable();
        this.toaster.success(type);
        this.parentMethod();
      }
    }) 
  }
} 
checkExtension(file) {
  return file.split('.').pop();
}


parentMethod(){
  this.clearStoreDate();
  this.callStoreDraftRequest();
  this.callMerchantManagementDetail();
}

callStoreDraftRequest(){
  this.store.dispatch(new GetStoreDraftRequest());
}

callMerchantManagementDetail(){
  this.approveMode = false;
  this.store.pipe(select("merchantManagement")).subscribe(res=>{
    if(res && res.storeStoreDraftRequest && res.storeStoreDraftRequest.payload && res.storeStoreDraftRequest.payload.length>0){
      this.responseStoreRequestDraft.id = res.storeStoreDraftRequest.payload[0].id;
      this.responseStoreRequestDraft.code = res.storeStoreDraftRequest.payload[0].code;
      this.payloadForApproveReject.requestCode = res.storeStoreDraftRequest.payload[0].code;
      this.responseStoreRequestDraft.createdAt = new Date(res.storeStoreDraftRequest.payload[0].createdAt);
      this.responseStoreRequestDraft.requestDate =  new Date(res.storeStoreDraftRequest.payload[0].requestDate);
      this.responseStoreRequestDraft.request = JSON.parse(res.storeStoreDraftRequest.payload[0].request);
      this.currentStoreDetial = this.responseStoreRequestDraft.request.store;
      if(this.currentStoreDetial){
        this.initilizeBasicDetailsForm();
      }
    }
  });

}

clearStoreDate(){
  this.store.dispatch(new StoreStoreDraftRequest(null));
}

}
