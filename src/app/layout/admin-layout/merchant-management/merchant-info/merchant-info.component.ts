import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { GetMerchantInfoById, UpdateMerchantInfo, GetRegionsList, GetBusinessCategory, VerifyBankAccount, VerifyPanNo, ActionTypes, ChangeMerchantSubsOtp, MerchantSubsUpdateByOtp } from './../../../../actions/merchant-management.actions';
import { GetCountries } from '../../../../actions/storeManagement.action';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '../../../../../../node_modules/@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DialogLatLongComponent } from '../store-info/dialog-lat-long/dialog-lat-long.component';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.css']
})
export class MerchantInfoComponent implements OnInit {
  merchantId = null;
  categorySelected = null;
  merchantInfoById = null;
  merchantInfoForm: FormGroup;

  countries = null;
  regions = null;
  businessCategoryList = null;

  panVerificationReference = null;
  accountVerificationReference = null;
  accountVerified = false;
  panVerified = false;
  panVerifiedBtn:boolean = false;
  panNumberEdit:string;
  panNumberOrg = null;

  accountNumberEdit:string = null;
  accountNumberOrg = null;
  ifscCodeEdit:string = null;
  ifscCodeOrg = null;
  bankMobileEdit:string = null;
  bankMobileOrg = null;
  accountVerifiedBtn:boolean = false;

  map = { lat: 22.5392287, lng: 88.3595163 };
  subscriptionApi: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private http: HttpClient,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.id;
    this.store.dispatch(new GetMerchantInfoById(this.merchantId));
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetRegionsList());
    this.store.dispatch(new GetBusinessCategory());
  }
  ngOnInit(): void {
    this.merchantInfoForm = this.fb.group({
      legalName: [''],
      address: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/), Validators.maxLength(25)]],
      country: ['', Validators.maxLength(100)],

      storeEmail: ['', [Validators.email, Validators.maxLength(200)]],
      bankLinkedMobile: [''],
      
      accountNumber: ['', [Validators.maxLength(16)]],
      ifscCode: [''],
      benificiaryName: [''],
      bankName: [''],
      branchName: [''],
      bankAddress: [''],
      accountType: [''],

      panFullName: [''],
      panNo: ['', [Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],

      businessCategory: [''],
      form60Submited: [''],

      id: [''],
      terminalId: [''],
      vpa: [''],
      accept_online_payment: [''],
    });
   
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.merchantInfoById) {
        this.merchantInfoById = res.merchantInfoById.payload;
        let acceptOnlinePayment = this.merchantInfoById.acceptOnlinePayment;
        if( !this.merchantInfoById.acceptOnlinePayment ){
          acceptOnlinePayment = false;
        }        

        this.merchantInfoForm.get('id').setValue(this.merchantInfoById.id);
        this.merchantInfoForm.get('address').setValue(this.merchantInfoById.address);
        this.merchantInfoForm.get('city').setValue(this.merchantInfoById.city);
        this.merchantInfoForm.get('landmark').setValue(this.merchantInfoById.landmark);
        this.merchantInfoForm.get('pincode').setValue(this.merchantInfoById.pincode);
        this.merchantInfoForm.get('state').setValue(this.merchantInfoById.state);
        this.merchantInfoForm.get('country').setValue(this.merchantInfoById.country);
        this.merchantInfoForm.get('storeEmail').setValue(this.merchantInfoById.storeEmail);
        this.merchantInfoForm.get('bankLinkedMobile').setValue(this.merchantInfoById.bankLinkedMobile);
        this.merchantInfoForm.get('accountNumber').setValue(this.merchantInfoById.accountNumber);
        this.merchantInfoForm.get('ifscCode').setValue(this.merchantInfoById.ifscCode);
        this.merchantInfoForm.get('benificiaryName').setValue(this.merchantInfoById.benificiaryName);
        this.merchantInfoForm.get('bankName').setValue(this.merchantInfoById.bankName);
        this.merchantInfoForm.get('branchName').setValue(this.merchantInfoById.branchName);
        this.merchantInfoForm.get('bankAddress').setValue(this.merchantInfoById.bankAddress);
        this.merchantInfoForm.get('accountType').setValue(this.merchantInfoById.accountType);
        this.merchantInfoForm.get('legalName').setValue(this.merchantInfoById.legalName);
        this.merchantInfoForm.get('panNo').setValue(this.merchantInfoById.panNo);
        this.merchantInfoForm.get('panFullName').setValue(this.merchantInfoById.panFullName);
        this.merchantInfoForm.get('businessCategory').setValue(this.merchantInfoById.businessCategory);
        this.merchantInfoForm.get('form60Submited').setValue(this.merchantInfoById.form60Submited);
        this.merchantInfoForm.get('accept_online_payment').setValue( acceptOnlinePayment );
        this.merchantInfoForm.controls['businessCategory'].disable();

        this.panVerificationReference = this.merchantInfoById.panVerificationReference;
        this.accountVerificationReference =  this.merchantInfoById.accountVerificationReference;

        this.accountVerified = this.merchantInfoById.accountVerified;
        this.accountVerifiedBtn = this.accountVerified;
        this.panVerified = this.merchantInfoById.panVerified;
        this.panVerifiedBtn = this.panVerified;
        this.panNumberOrg = this.merchantInfoForm.get('panNo').value;
        this.accountNumberOrg = this.merchantInfoForm.get('accountNumber').value;
        this.ifscCodeOrg = this.merchantInfoForm.get('ifscCode').value;
        this.bankMobileOrg = this.merchantInfoForm.get('bankLinkedMobile').value;
      }
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
    });
    this.store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries = res['countries'] ? res['countries']['payload'] : '';
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }
  onSubmitMerchantInfo() {
    if (this.merchantInfoForm.valid) {
      let payload = {
        id: this.merchantId,
        address: this.merchantInfoForm.get('address').value,
        city: this.merchantInfoForm.get('city').value,
        landmark: this.merchantInfoForm.get('landmark').value,
        pincode: this.merchantInfoForm.get('pincode').value,
        state: this.merchantInfoForm.get('state').value,
        country: this.merchantInfoForm.get('country').value,

        storeEmail: this.merchantInfoForm.get('storeEmail').value,
        bankLinkedMobile: this.merchantInfoForm.get('bankLinkedMobile').value,

        accountNumber: this.merchantInfoForm.get('accountNumber').value,
        ifscCode: this.merchantInfoForm.get('ifscCode').value,
        benificiaryName: this.merchantInfoForm.get('benificiaryName').value,
        bankName: this.merchantInfoForm.get('bankName').value,
        branchName: this.merchantInfoForm.get('branchName').value,
        bankAddress: this.merchantInfoForm.get('bankAddress').value,
        accountType: this.merchantInfoForm.get('accountType').value,

        legalName: this.merchantInfoForm.get('legalName').value,
        panNo: this.merchantInfoForm.get('panNo').value,

        businessCategory: this.merchantInfoForm.get('businessCategory').value,
        form60Submited: this.merchantInfoForm.get('form60Submited').value,
        acceptOnlinePayment: this.merchantInfoForm.get('accept_online_payment').value
      }
      this.store.dispatch(new UpdateMerchantInfo(payload))
    } else {
      this.markFormGroupTouched(this.merchantInfoForm)
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  verifyBankInformation() {
    let accountNumber = this.merchantInfoForm.get('accountNumber').value;
    let ifscCode = this.merchantInfoForm.get('ifscCode').value;
    let bankLinkedMobile = this.merchantInfoForm.get('bankLinkedMobile').value;
    if(accountNumber != null) {
      if(ifscCode != null) {
        if(accountNumber != null) {
          let payload = {
            merchantId: this.merchantId,
            accountNumber: accountNumber,
            ifsc: ifscCode,
            mobileNo: bankLinkedMobile
          }
          this.store.dispatch(new VerifyBankAccount(payload));
          if (this.subscriptionApi) {
            this.subscriptionApi.unsubscribe();
          }
          this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
            if (data.status === true && data.type ==  ActionTypes.verifyBankAccount) {
              this.store.dispatch(new GetMerchantInfoById(this.merchantId));
            }
          });
        } else {
          this.toastr.error('Enter Registered Mobile Number.')
        }
      } else {
        this.toastr.error('Enter Account Number.')
      }
    } else {
      this.toastr.error('Enter IFSC Code.')
    }
  }
  verifyLegalInformation() {
    let panNo = this.merchantInfoForm.get('panNo').value;
    if(panNo != null) {
      let payload = {
        merchantId: this.merchantId,
        panNo: panNo,
      }
      this.store.dispatch(new VerifyPanNo(payload));
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
        if (data.status === true && data.type ==  ActionTypes.verifyPanNo) {
          this.store.dispatch(new GetMerchantInfoById(this.merchantId));
        }
      });
    } else {
      this.toastr.error('Enter PAN Number.')
    }
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }
  changeSubsDialog(){
    this.store.dispatch( new ChangeMerchantSubsOtp( { storeName: this.merchantInfoForm.get('legalName').value } ) );
    this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ==  ActionTypes.changeMerchantSubsOtp) {
        console.log( data.payload )
      }
    });
    // console.log("open");
    const dialog = this.dialog.open( SubscriptionDialogComponent, {
      maxWidth: 400,
      disableClose: true,
      data: {
        "dummyData": "dummyData"
      }
    });

    dialog.afterClosed().subscribe(result => {
      if(result != ""){
        // console.log( result );
        let payloadData = {
          otp: result.otp,
          subsInfo: {
            id: this.merchantId,
            subscription_level: result.subscriptionType,
            subscription_expiry_on: result.date,
            max_stores_allowed: result.maxStore
          }
        }
        this.store.dispatch( new MerchantSubsUpdateByOtp( payloadData ));
        this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ==  ActionTypes.merchantSubsUpdateByOtp) {
            console.log( data.payload )
            this.store.dispatch(new GetMerchantInfoById(this.merchantId));
          }
        });

      }      
    });
  }

  PaymentStatus( value: boolean ){
    let payload = {
      id: this.merchantId,
      acceptOnlinePayment: value
    }
    this.store.dispatch( new UpdateMerchantInfo(payload) );
  }
  form60Submission( event: MatCheckboxChange ) :void {
    let payload = {
      id: this.merchantId,
      form60Submited: event.checked
    }
    this.store.dispatch( new UpdateMerchantInfo(payload) );
  }
  accountTypeStatus(value) {
    if (this.merchantInfoById.accountVerified) {
      let payload = {
        id: this.merchantId,
        accountType: value
      }
      this.store.dispatch(new UpdateMerchantInfo(payload));
    }
  }

  editAddress(){
    const dialogRef = this.dialog.open(DialogLatLongComponent, {
      width: '600px',
      data: {
        lat: this.map.lat,
        lng: this.map.lng
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.map.lat = result.lat
        this.map.lng = result.lng

        if (result.address) {
          // this.error.address = null
          this.merchantInfoForm.get('address').setValue(result.address);
        }
      }
    });
  }

  onPanChange( pan ){
    if( !this.panNumberOrg){
      this.panNumberOrg = "";
    }
    // console.log( pan, this.panNumberOrg );
    if( pan !== this.panNumberOrg){
      this.panVerifiedBtn = false;
    } else {
      this.panVerifiedBtn = true;
    }
  }

  bankDetailsUpdate( value ){
    if(this.accountNumberEdit != null && this.ifscCodeEdit != null && this.bankMobileEdit ===''){
      this.bankMobileEdit = null;
    }
    if( this.accountNumberEdit !== this.accountNumberOrg || this.ifscCodeEdit !== this.ifscCodeOrg || this.bankMobileOrg !== this.bankMobileEdit ){
      this.accountVerifiedBtn = false;
    } else{
      this.accountVerifiedBtn = true;
    }
  }


}
