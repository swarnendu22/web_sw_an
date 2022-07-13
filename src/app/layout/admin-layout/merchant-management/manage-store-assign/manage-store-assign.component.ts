import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { GetStoreAssign , StoreStoreAssign, DispatchBulkAction, ActionTypes, StoreRequestApprove} from 'src/app/actions/merchant-management.actions';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import qs from 'qs';
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
  selector: 'app-manage-store-assign',
  templateUrl: './manage-store-assign.component.html',
  styleUrls: ['./manage-store-assign.component.css']
})
export class ManageStoreAssignComponent implements OnInit {

  
pageDetail = {
  "pageTitle" : "Store Approve",
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
map: Map = { lat: 28.6139, lng: 77.2090 };


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
    businessCategoryId:[],
    businessCategoryName:[],
    store_address:[],
    store_logo_url:[],
    remarks:['', Validators.required],
    landmarkName:[],
    storeContact:[]
  });
}


initilizeBasicDetailsForm(){
  if(this.currentStoreDetial){
    this.basicDetailsForm.get('store_display_name').setValue(this.currentStoreDetial.store_display_name);
    this.basicDetailsForm.get('businessCategoryId').setValue(this.currentStoreDetial.businessCategoryId);
    //this.basicDetailsForm.get('businessCategoryName').setValue(this.currentStoreDetial.);
    this.basicDetailsForm.get('businessCategoryName').setValue("businessCategoryName");
    this.basicDetailsForm.get('store_address').setValue(this.currentStoreDetial.store_address);
    this.basicDetailsForm.get('store_logo_url').setValue(this.currentStoreDetial.store_logo_url);
    this.basicDetailsForm.get('landmarkName').setValue(this.currentStoreDetial.store_landmark.name); 
    this.basicDetailsForm.get('storeContact').setValue(this.currentStoreDetial.store_contact);

    if (!isNaN(this.currentStoreDetial.location.lat)) {
      this.map.lat = Number(this.currentStoreDetial.location.lat);
    }

    if (!isNaN(this.currentStoreDetial.location.lon)) {
      this.map.lng = Number(this.currentStoreDetial.location.lon);
    }

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
this.store.dispatch(new GetStoreAssign());
}

callMerchantManagementDetail(){
this.approveMode = false;
this.store.pipe(select("merchantManagement")).subscribe(res=>{
  if(res && res.storeStoreAssign && res.storeStoreAssign.obj && res.storeStoreAssign.obj.length>0){
    this.currentStoreDetial = res.storeStoreAssign.obj[0].sourceAsMap;
    if(this.currentStoreDetial){
      this.initilizeBasicDetailsForm();
    }
  }
});

}

clearStoreDate(){
this.store.dispatch(new StoreStoreAssign(null));
}

}
