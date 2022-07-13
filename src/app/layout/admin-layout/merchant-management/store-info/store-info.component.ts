import { Component, HostListener, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLatLongComponent } from './dialog-lat-long/dialog-lat-long.component'
import { FormBuilder, Validators, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { GetStoreInfoDetails, PostStoreInfoDetails, GetRegionsList, GetBusinessCategory, ChangeStoreProfileStatus, StoreBulkOperation, GetMerchantsListNew, GetStoreUrl, GetHubListByMerchantId, GetMerchantInfoById, ActionTypes, UpdateStoreUrl, CreateStoreUrl } from '../../../../actions/merchant-management.actions';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetCountries } from '../../../../actions/storeManagement.action';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { environment } from '../../../../../environments/environment.prod';
import { AddStoreUrlComponent } from '../add-store-url/add-store-url.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = `${environment.storeFrontBaseUrl}`;



  storeInfoForm: FormGroup;
  storeId = null;
  storeInfoDetails = null
  countries = null
  regions = null
  businessCategoryList = null
  map = { lat: 22.5392287, lng: 88.3595163 };
  profileCompletionPercent = 0
  profileCompletionData = null;

  compliance_doc = false
  product = false
  delivery_opt = false
  payment_gateway = false
  create_store = false
  storePublicUrl = null
  storeStatus = null
  storeUrlList:any = [];
  merchantIdList:any = [];
  HubIdList:any = [];

  pageNo = 0;
  pageSize = 1000;
  merchantId = null;
  centerurl: string = '';
  
  @ViewChild('hasValue', { static: false }) UrlDropdown;
  enabled:boolean = false;
  reverseUrlList: boolean = false;

  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private store: Store<any>, private apiMessageService: ApiMessageService ) {
    this.merchantId = sessionStorage.getItem('merchantId');
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreInfoDetails(this.storeId))
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetRegionsList());
    this.store.dispatch(new GetBusinessCategory());
  }

  openDialogLatLong() {
    const dialogRef = this.dialog.open(DialogLatLongComponent, {
      width: '600px',
      data: {
        lat: this.map.lat,
        lng: this.map.lng,
        address: this.storeInfoForm.get('address').value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if (result) {
        this.map.lat = result.lat
        this.map.lng = result.lng
        this.storeInfoForm.get('address').setValue(result.address);
        this.storeInfoForm.get('storeLongitude').setValue(this.map.lng);
        this.storeInfoForm.get('storeLatitude').setValue(this.map.lat);
        if (result.address_components) {
          this.storeInfoForm.get('city').setValue(result.address_components.city);
          this.storeInfoForm.get('zipCode').setValue(result.address_components.zipCode);
          this.storeInfoForm.get('landmark').setValue(result.address_components.area);
          this.storeInfoForm.get('regionName').setValue(result.address_components.state);
          this.storeInfoForm.get('shortAddress').setValue(result.address);

        }
      }
    });
  }

  ngOnInit() {
    // this.store.dispatch(new GetMerchantsListNew({ pageNo: this.pageNo, pageSize: this.pageSize }));
    this.store.dispatch(new GetMerchantInfoById( this.merchantId ));
    this.getStoreURl( this.merchantId );
    this.getHubList( this.merchantId );
    
    this.storeInfoForm = this.fb.group({
      id: ['', [Validators.required]],
      storeName: ['', [Validators.required, Validators.maxLength(50)]],
      regionName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      shortAddress: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      countryCode: ['', Validators.maxLength(100)],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/), Validators.maxLength(25)]],
      landmark: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.email, Validators.maxLength(200)]],
      registeredNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ],
      supportNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ],
      businessCategoryId: ['', [Validators.required]],
      storeLatitude: ['', [Validators.required]],
      storeLongitude: ['', [Validators.required]],
      merchantId: [''],
      hubId: [''],
      urlId: ['']
    });
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeInfoDetails) {
        this.storeInfoDetails = res.storeInfoDetails;
        this.storeInfoForm.get("id").setValue(this.storeId);
        this.storeInfoForm
          .get("storeName")
          .setValue(this.storeInfoDetails.storeName);
        this.storeInfoForm
          .get("regionName")
          .setValue(this.storeInfoDetails.regionName);
        this.storeInfoForm
          .get("address")
          .setValue(this.storeInfoDetails.address);
        this.storeInfoForm
          .get("shortAddress")
          .setValue(this.storeInfoDetails.shortAddress);
        this.storeInfoForm.get("city").setValue(this.storeInfoDetails.city);
        this.storeInfoForm
          .get("countryCode")
          .setValue(this.storeInfoDetails.countryCode);
        this.storeInfoForm
          .get("zipCode")
          .setValue(this.storeInfoDetails.zipCode);
        this.storeInfoForm
          .get("landmark")
          .setValue(this.storeInfoDetails.landmark);
        this.storeInfoForm.get("email").setValue(this.storeInfoDetails.email);
        this.storeInfoForm
          .get("registeredNumber")
          .setValue(this.storeInfoDetails.registeredNumber);
        this.storeInfoForm
          .get("supportNumber")
          .setValue(this.storeInfoDetails.supportNumber);
        this.storeInfoForm
          .get("regionName")
          .setValue(this.storeInfoDetails.regionName);
        this.storeInfoForm
          .get("businessCategoryId")
          .setValue(this.storeInfoDetails.businessCategoryId);
        this.storeInfoForm
          .get("storeLongitude")
          .setValue(this.storeInfoDetails.storeLongitude);
        this.storeInfoForm
          .get("storeLatitude")
          .setValue(this.storeInfoDetails.storeLatitude);
        // this.storeInfoForm.get('merchantId').setValue(this.storeInfoDetails.merchantId);
        this.storeInfoForm.get("hubId").setValue(this.storeInfoDetails.hubId);
        this.storeInfoForm.get("urlId").setValue(this.storeInfoDetails.urlId);
        this.map.lat = this.storeInfoDetails.storeLatitude;
        this.map.lng = this.storeInfoDetails.storeLongitude;
        this.storeInfoForm.controls["merchantId"].disable();
        this.storeInfoForm.controls["hubId"].disable();

        if (this.storeInfoDetails["storeExternalURL"]) {
          let temp =
            this.storeInfoDetails.storeExternalURL.includes("ndhgo.com/");
          if (temp) {
            this.centerurl = "?center=" + this.storeInfoDetails.storePublicUrl;
          } else {
            this.centerurl = "";
          }

          this.storePublicUrl = `${this.storeInfoDetails.storeExternalURL}${this.centerurl}`;
        } else {
          this.storePublicUrl = null;
        }
        // this.storePublicUrl = `${environment.storeFrontBaseUrl}/${this.storeInfoDetails.storeExternalURL}`;
        
        this.storeStatus = this.storeInfoDetails.storeStatus;

        this.profileCompletionPercent =
          this.storeInfoDetails.profileCompletionPercent;
        const profileCompletionData = JSON.parse(
          this.storeInfoDetails.profileCompletionData
        );

        // this.profileCompletionPercent = this.profileCompletionPercent
        // const profileCompletionData = JSON.parse(this.profileCompletionData)

        this.compliance_doc =
          profileCompletionData.data.compliance_doc.completed;
        this.product = profileCompletionData.data.product.completed;
        this.delivery_opt = profileCompletionData.data.delivery_opt.completed;
        this.payment_gateway =
          profileCompletionData.data.payment_gateway.completed;
        this.create_store = profileCompletionData.data.create_store.completed;
      }

      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }

      if (res.merchantInfoById) {
        this.storeInfoForm.get('merchantId').setValue(res.merchantInfoById.payload.id);
        this.merchantIdList = [res.merchantInfoById.payload];          
      }
      if( res.saveStoreUrl ){
        // console.log( res.saveStoreUrl );
        this.storeUrlList = res.saveStoreUrl.payload;
        this.storeUrlList = Object.assign([], this.storeUrlList);
        if( this.reverseUrlList ){
          this.storeUrlList.reverse();
        }
      }
      if( res.hubListByMerchantId ){
       this.HubIdList = res.hubListByMerchantId.obj;
      }

    });
    this.store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries = res['countries'] ? res['countries']['payload'] : '';
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }

  onSubmit() {
    ///  console.log("**********",this.storeInfoForm)
    if (this.storeInfoForm.valid) {
      this.store.dispatch(new PostStoreInfoDetails(this.storeInfoForm.value))
    } else {
      this.markFormGroupTouched(this.storeInfoForm)
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


  onProfileStatusChanges() {
    this.profileCompletionPercent = 0
    console.log('called')
    if (this.create_store) {
      this.profileCompletionPercent += 20
    }
    if (this.compliance_doc) {
      this.profileCompletionPercent += 20
    }
    if (this.delivery_opt) {
      this.profileCompletionPercent += 20
    }
    if (this.payment_gateway) {
      this.profileCompletionPercent += 20
    }
    if (this.product) {
      this.profileCompletionPercent += 20
    }


    const statusData = {
      data: {
        compliance_doc: {
          completed: this.compliance_doc
        },
        create_store: {
          completed: true
        },
        delivery_opt: {
          completed: this.delivery_opt
        },
        payment_gateway: {
          completed: this.payment_gateway
        },
        product: {
          completed: this.product
        }
      },
      store_completion_percentage: this.profileCompletionPercent
    }

    const payload = {
      "profileCompletionData": JSON.stringify(statusData),
      "profileCompletionPercent": this.profileCompletionPercent,
      "storeId": this.storeId
    }

    console.log(payload)
    this.store.dispatch(new ChangeStoreProfileStatus(payload))


  }

  getStoreURl( merchantId ){
    this.store.dispatch( new GetStoreUrl( { "id": merchantId} ));
  }
  getHubList( merchantId ){
    this.store.dispatch(new GetHubListByMerchantId( merchantId ));
  }

  updateStoreUrl( params, id ) {
    this.store.dispatch( new UpdateStoreUrl({
      "merchantId": this.merchantId,
      // "internalDomain": params.internalDomain,
      "externalDomain": params.externalDomain,
      // "internalSubDomain": params.internalsubdomain,
      "externalSubDomain": params.externalsubdomain,
      // "internalProtocol": params.internalProtocol + `://`,
      "externalProtocol": params.externalProtocol + `://`,
      "externalPublicUrl": params.externalPublicUrl,
      "themeColor": params.themeColor,
      "themeTextColor": params.themeTextColor,
      "id": id
      // "internalPublicUrl": params.internalPublicUrl
    }) 
    )
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log( this.UrlDropdown)
    if( this.UrlDropdown._panelOpen ){
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  editUrl( urlDetails ){
    const dialog = this.dialog.open(AddStoreUrlComponent, {
      minWidth: 1200,
      maxHeight: 400,
      disableClose: true,
      data: {
        "merchantID": this.merchantId,
        "urlStatus": "Edit Url",
        "urlDetails": urlDetails
      }
    });

    dialog.afterClosed().subscribe(result => {
      if(result != ""){
        if(result.externalPublicUrl != "" ){

          let string = result.externalPublicUrl;
          if (string.charAt(0) == "/") string = string.substr(1);
          if (string.charAt(string.length - 1) == "/") string = string.substr(0, string.length - 1);
          result.externalPublicUrl = "/" + string;

        }
        if(result.externalsubdomain != ""){
          result.externalsubdomain = result.externalsubdomain + ".";
        }
        this.updateStoreUrl( result, urlDetails.id );
        this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ==  ActionTypes.updateStoreUrl) {
            this.getStoreURl( this.merchantId );
          }
        });
        // this.getStoreURl( this.merchantId );
      }      
    });
  }


  createStoreURl( params ){
    this.store.dispatch( new CreateStoreUrl( 
      { 
        "merchantId": this.merchantId,
        // "internalDomain": params.internalDomain,
        "externalDomain": params.externalDomain,
        // "internalSubDomain": params.internalsubdomain,
        "externalSubDomain": params.externalsubdomain,
        // "internalProtocol": params.internalProtocol + `://`,
        "externalProtocol": params.externalProtocol + `://`,
        "externalPublicUrl": params.externalPublicUrl,
        "themeColor": params.themeColor,
        "themeTextColor": params.themeTextColor
        // "internalPublicUrl": params.internalPublicUrl
       }
       ));
  }
  
  addUrlDialog(){
    const dialog = this.dialog.open(AddStoreUrlComponent, {
      minWidth: 1200,
      maxHeight: 400,
      disableClose: true,
      data: {
        "merchantID": this.merchantId,
        "urlStatus": "Add New Url",
        "urlDetails": null
      }
    });

    dialog.afterClosed().subscribe(result => {
      if(result != ""){
        if(result.externalPublicUrl != "" ){

          let string = result.externalPublicUrl;
          if (string.charAt(0) == "/") string = string.substr(1);
          if (string.charAt(string.length - 1) == "/") string = string.substr(0, string.length - 1);
          result.externalPublicUrl = "/" + string;

        }
        if(result.externalsubdomain != ""){
          result.externalsubdomain = result.externalsubdomain + ".";
        }
        this.createStoreURl( result );
        this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ==  ActionTypes.createStoreURl) {
            this.reverseUrlList = true;
            this.getStoreURl( this.merchantId );
          }
        });
        // console.log( result );
      }      
    });
  }
}
