import { Component, OnInit, ElementRef, HostListener, ViewChild} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { GetBusinessCategory, RegisterMerchantFromAdmin, GetMerchantsListNew, GetHubListByMerchantId, GetStoreUrl, CreateStoreUrl, GetMerchantInfoById, UpdateStoreUrl, ActionTypes } from '../../../../actions/merchant-management.actions';
import { DialogLatLongComponent } from '../store-info/dialog-lat-long/dialog-lat-long.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { StoreImgUploadToAws, UploadImageToAws } from '../../../../actions/img-upload-aws.action';
import { ImageCropperPopupComponent } from '../image-cropper-popup/image-cropper-popup.component';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { getFileFromUrl } from '../../../../utils/imgLib';
import { AddStoreUrlComponent } from '../add-store-url/add-store-url.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-register-mercchant',
  templateUrl: './register-mercchant.component.html',
  styleUrls: ['./register-mercchant.component.css']
})
export class RegisterMercchantComponent implements OnInit {
  hubListByMerchantId: any = [];
  merchantsListNew: any = [];
  pageNo = 0;
  pageSize = 10000;

  merchantId = null;
  fileUploadSubscription: Subscription;
  registerMerchantForm: FormGroup
  businessCategoryList = null;
  storeUrlList: any = [];
  reverseUrlList: boolean = false;
  map = { lat: 22.5392287, lng: 88.3595163 };
  fileurl = null
  error = {
    image: null,
    address: null,
  }
  deliveryAttributes = {
    "order_fulfillment": {
      "order_processing_time": "120",
      "time_unit": "MINUTE"
    },
    "partner_delivery": false,
    "partner_delivery_params": {
      "charge_sharing_with_customer": false,
      "note": "",
      "seller_bear_above_cart_value": 0,
      "seller_bear_deliver_charge": true,
      "seller_bear_max_cart_percentage": 10,
      "seller_bear_max_value": 100,
      "terms": ""
    },
    "self_delivery": false,
    "self_delivery_params": {
      "additional_delivery_cost_per_unit": 0,
      "distance_unit": "km",
      "fixed_delivery_charge": 0,
      "free_delivery_cart_value": 0,
      "free_delivery_range": 5,
      "max_delivery_range": 5,
      "note": "",
      "terms": ""
    },
    "store_pickup": true,
    "store_pickup_params": {
      "note": "",
      "pickup_time": [

      ],
      "terms": ""
    }
  }

  @ViewChild('hasValue', { static: false }) UrlDropdown;
  enabled:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<any>, 
    public dialog: MatDialog, 
    private matSnackBar: MatSnackBar, 
    private toaster: ToastrService,
    private route: Router,
    private apiMessageService: ApiMessageService
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.merchantId;
    this.store.dispatch(new GetBusinessCategory());
    // this.store.dispatch(new GetMerchantsListNew({ pageNo: this.pageNo, pageSize: this.pageSize }));
    this.store.dispatch(new GetMerchantInfoById(this.merchantId));
    this.getStoreURl( this.merchantId );
    if(this.merchantId > 0) {
      this.hubListByMerchant(this.merchantId);
    }
  }
  markerDragEnd(map, event) {
    // console.log('Map, Events', map, event);
  }
  openDialogLatLong() {
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

        this.registerMerchantForm.get('geoLong').setValue(result.lng);
        this.registerMerchantForm.get('geoLat').setValue(result.lat);
        if (result.address) {
          this.error.address = null
          this.registerMerchantForm.get('address').setValue(result.address);
        }
        if (result.address_components) {
          this.registerMerchantForm.get('city').setValue(result.address_components.city);
          this.registerMerchantForm.get('zipCode').setValue(result.address_components.zipCode);
          this.registerMerchantForm.get('landmark').setValue(result.address_components.area);
          this.registerMerchantForm.get('regionName').setValue(result.address_components.state);
        }
      }
    });
  }
  
  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      // console.log(res);
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
      if(res.saveStoreUrl){
        this.storeUrlList = res.saveStoreUrl.payload;
        this.storeUrlList = Object.assign([], this.storeUrlList);
        if( this.reverseUrlList ){
          this.storeUrlList.reverse();
        }
      }
      if(res.saveCreatedStoreUrl){
        // this.storeUrlList = Object.assign([], this.storeUrlList);
        // if( this.storeUrlList[ this.storeUrlList.length -1].id !== res.saveCreatedStoreUrl.payload.id ){
        //   this.storeUrlList.unshift(res.saveCreatedStoreUrl.payload);
        // }        
      }
      if( res.updatedStoreUrl){

      }

    });
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.merchantInfoById) {
          this.merchantsListNew = [res.merchantInfoById.payload];          
        }
        if(res.hubListByMerchantId) {
          this.hubListByMerchantId = res.hubListByMerchantId['obj'];
        }
    });
    this.registerMerchantForm = this.fb.group({
      merchantId: [parseInt(this.merchantId), [Validators.required]],
      hubId: ['', [Validators.required]],
      urlId: ['', [Validators.required]],
      storeName: ['', [Validators.required]],
      regionName: ['',],
      address: [''],
      city: ['',],
      countryCode: ['IN',],
      zipCode: [''],
      landmark: [''],
      businessCategoryId: ['', [Validators.required]],
      geoLat: [''],
      geoLong: [''],
      storePickup: [true],
      homedelivery: [false],
      storeLogoUrl: [null],
      deliveryAttributes: [this.deliveryAttributes],
      contactNumber: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      supportNumber: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10) ]],
      // allowCartWithOthers: [true],
      zoneId: [0],
      accept_cod: [false],
      accept_online_payment: [false],
      storeOperationTimingChange: [false],
      accept_payment: [false],
      email: [null, [Validators.email]],
      userName: [null, [Validators.required]],
      allowCartWithOthers: [false],
      allowMarketplace: [false],
    });
  }
  
  hubListByMerchant(merchantId) {
    this.store.dispatch(new GetHubListByMerchantId(merchantId));
  }
  onSelectFile(event, filefor, index = null) {
    if (event.target.files && event.target.files[0]) {
      // console.log(event.target.files[0])
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      const acceptedFileType = ['jpeg', 'jpg', 'png', 'gif'];;
      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        this.doImageCrop(event, filefor, index)
      }
    }
  }

  doImageCrop(event, uploadFor, index = null) {
    const dialogRef = this.dialog.open(ImageCropperPopupComponent, {
      width: '500px',
      // height: '500px',
      panelClass: 'image-crop-dialog',
      data: { event, uploadFor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var reader = new FileReader();
        const { newfile, filename, filetype, applicationtype, uploadFor } = result
        const file = new File([newfile], filename, { type: applicationtype })
        reader.readAsDataURL(file); // read file as data url

        reader.onload = () => { // called once readAsDataURL is completed
          this.registerMerchantForm.get('storeLogoUrl').setValue(file);
          this.fileurl = reader.result;
          this.error.image = null
        }
      }
    });
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype) {
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })

    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      console.log("first");
      if (res['awsImgUpload']) {
        // console.log(res['awsImgUpload'].Location)
        this.registerMerchantForm.get('storeLogoUrl').setValue(res['awsImgUpload'].Location);
        this.formSubmitafterImage()
        this.fileUploadSubscription.unsubscribe();
      }
    });
  }
  async onSubmit() {
    if (this.registerMerchantForm.valid) {
      // console.log( 'valid', this.registerMerchantForm );
      if (this.registerMerchantForm.get('storeLogoUrl').value) {
        let file;
        let filename;
        let filetype;
        let applicationtype;
        if (typeof this.registerMerchantForm.get('storeLogoUrl').value == 'object') {
          file = this.registerMerchantForm.get('storeLogoUrl').value;

        } else {
          file = await getFileFromUrl(this.registerMerchantForm.get('storeLogoUrl').value)
        }
        filename = file['name'];
        filetype = file['type'].split('/')[1];
        applicationtype = file['type'];
        this.uploadFileToAws(file, filename, filetype, applicationtype)
      } else {  
        this.formSubmitafterImage();
      }

    } else {
      if (this.fileurl == null && this.registerMerchantForm.get('storeLogoUrl').value == null)
        // this.error.image = 'Image is required';
      if (!this.registerMerchantForm.get('address').value)
        this.error.address = 'Address is required'
      this.markFormGroupTouched(this.registerMerchantForm)
    }
  }
  formSubmitafterImage() {
    if( this.registerMerchantForm.get('contactNumber').value == "" ){
      this.registerMerchantForm.get('contactNumber').setValue(null);
    }     
    if( this.registerMerchantForm.get('email').value == "" ){
      this.registerMerchantForm.get('email').setValue(null);
    } 
    if( this.registerMerchantForm.get('contactNumber').value || this.registerMerchantForm.get('email').value ) {
      this.store.dispatch(new RegisterMerchantFromAdmin(this.registerMerchantForm.value));
    } else {
      this.registerMerchantForm.controls['contactNumber'].setErrors({'incorrect': true});
      this.registerMerchantForm.controls['email'].setErrors({'incorrect': true});
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
  imageReset() {
    this.fileurl = null;
    this.registerMerchantForm.get('storeLogoUrl').setValue(null)
  }
  openStoreList() {
    this.route.navigate([`merchant/store-list/${this.merchantId}`]);
  }
  merchantChant() {
    this.merchantId = this.registerMerchantForm.get('merchantId').value;
    if(this.merchantId > 0) {
      this.hubListByMerchant(this.merchantId);
      this.getStoreURl( this.merchantId );
    }
  }
  getStoreURl( merchantId ){
    this.store.dispatch( new GetStoreUrl( { "id": merchantId} ));
  }
  createStoreURl( params ){
    this.store.dispatch( new CreateStoreUrl( 
      { 
        "merchantId": this.merchantId,
        // "internalDomain": params.internalDomain,
        "externalDomain": params.externalDomain.replace(/ +/g, ""),
        // "internalSubDomain": params.internalsubdomain,
        "externalSubDomain": params.externalsubdomain.replace(/ +/g, ""),
        // "internalProtocol": params.internalProtocol + `://`,
        "externalProtocol": params.externalProtocol + `://`,
        "externalPublicUrl": params.externalPublicUrl.replace(/ +/g, ""),
        "themeColor": params.themeColor,
        "themeTextColor": params.themeTextColor
        // "internalPublicUrl": params.internalPublicUrl
       }
       ));
  }

  updateStoreUrl( params, id ) {
    this.store.dispatch( new UpdateStoreUrl({
      "merchantId": this.merchantId,
      // "internalDomain": params.internalDomain,
      "externalDomain": params.externalDomain.replace(/ +/g, ""),
      // "internalSubDomain": params.internalsubdomain,
      "externalSubDomain": params.externalsubdomain.replace(/ +/g, ""),
      // "internalProtocol": params.internalProtocol + `://`,
      "externalProtocol": params.externalProtocol + `://`,
      "externalPublicUrl": params.externalPublicUrl.replace(/ +/g, ""),
      "themeColor": params.themeColor,
      "themeTextColor": params.themeTextColor,
      "id": id
      // "internalPublicUrl": params.internalPublicUrl
    }) 
    )
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
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


}
