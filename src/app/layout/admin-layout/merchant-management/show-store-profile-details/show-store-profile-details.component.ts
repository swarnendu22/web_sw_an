import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreProfileAction, GetBusinessCategory, UpdateStoreBasicDetails, UpdateStoreDeliverySettings, UpdateStoreOperationDetails, UpdateStoreComplianceDetails, StoreStoreProfileAction, StoreStoreComplianceDetails, GetStoreComplianceDetails } from '../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../actions/img-upload-aws.action';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ImageCropperPopupComponent } from '../image-cropper-popup/image-cropper-popup.component';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { getFileFromUrl } from '../../../../utils/imgLib';
import { saveAs } from 'file-saver';

export interface Map {
  lat: number,
  lng: number
}

@Component({
  selector: 'app-show-store-profile-details',
  templateUrl: './show-store-profile-details.component.html',
  styleUrls: ['./show-store-profile-details.component.css']
})
export class ShowStoreProfileDetailsComponent implements OnInit, OnDestroy {

  map: Map = { lat: 22.5392287, lng: 88.3595163 };
  storeId = null;
  storeProfileDetails = null;
  store_display_name = null;
  tagLine = null;
  businessCategoryId = null;
  businessCategoryList = null;
  store_operation = null;
  store_logo_url = null;
  store_cover_image = null;
  is_live = null
  store_address = null
  formDetailsGST: FormGroup;
  formDetailsFSSAI: FormGroup;
  formDetailsPAN: FormGroup;
  formDeliverySettings: FormGroup;
  formDetailsTradeLicense: FormGroup;
  fileUploadSubscription: Subscription;
  public categoryFilterCtrl: FormControl = new FormControl();
  public selectedAddress: PlaceResult;
  subscription: Subscription;
  enable_delivery_requestStr = '';
  gstComplianceDetails = null;
  fssaiComplianceDetails = null;
  panComplianceDetails = null;
  tradeComplianceDetails = null;
  businessCategoryName = null;

  @ViewChild(MatSelectionList, { static: true }) private selectionList: MatSelectionList;;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private apiMessageService: ApiMessageService
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreProfileAction({
      storeId: this.storeId,
      latitude: "22.5392287",
      longitude: "88.3595163"

    }))
    this.store.dispatch(new GetBusinessCategory());
  }

  markerDragEnd(map, event) {
    this.map.lat = event.coords.lat;
    this.map.lng = event.coords.lng;
    this.getPlacesfromCoordinate()
  }
  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        this.getPlacesfromCoordinate()
      });
    }
  }
  getPlacesfromCoordinate() {
    var geocoder = new google.maps.Geocoder;
    var latlng = { lat: this.map.lat, lng: this.map.lng };
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.store_address = results[0].formatted_address
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.store_address = `${result.formatted_address}`
  }

  onLocationSelected(location: Location) {
    this.map.lat = location.latitude;
    this.map.lng = location.longitude;
  }


  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.store.pipe(select("merchantManagement")).subscribe(res => {
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
    });
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeProfileDetails && res.storeProfileDetails.length > 0) {
        this.storeProfileDetails = res.storeProfileDetails
        this.setFormDetails();

      }
    });
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeComplianceDetails && res.storeComplianceDetails.length > 0) {
        if (res.storeComplianceDetails[0].complianceType == 'GST') {
          this.gstComplianceDetails = res.storeComplianceDetails
          this.setGstDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'PAN') {
          this.panComplianceDetails = res.storeComplianceDetails
          this.setPanDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'FSSAI') {
          this.fssaiComplianceDetails = res.storeComplianceDetails
          this.setFssaiDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'TRADELICENSE') {
          this.tradeComplianceDetails = res.storeComplianceDetails
          this.setTradeLicenseDetails();
        }
      }
    });


    this.formDetailsGST = this.fb.group({
      gstNum: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      confirmGstNumber: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      businessName: ['', Validators.required],
      taxStructureConfirm: [2, Validators.required],
      certificateUrl: ['', Validators.required]
    });
    this.formDetailsFSSAI = this.fb.group({
      liscense: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      stateName: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      ownerName: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      validUpto: ['', Validators.required],
      certificateUrl: ['', Validators.required],
      fileObj: [null]
    });
    this.formDetailsPAN = this.fb.group({
      panNumber: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      confirmPanNum: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      businessName: ['', Validators.required],
      dobOfCorporation: ['', Validators.required],
      panType: ['individual', Validators.required],
      certificateUrl: ['', Validators.required],
      entityType: ['individual', Validators.required]
    });
    this.formDetailsTradeLicense = this.fb.group({
      certifyingAuthority: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      certificateType: [1, Validators.required],
      businessName: ['', Validators.required],
      entityType: ['', Validators.required],
      certificateValidity: ['', Validators.required],
      certificateUrl: ['', Validators.required]
    });
    this.formDeliverySettings = this.fb.group({
      store_pickup: [false, Validators.required],
      self_delivery: [false, Validators.required],
      delivery_radius: [''],
      free_delivery_radius: [''],
      additional_delivery_charge: [''],
      order_processing_time: ['', Validators.required],
    });

  }

  setGstDetails() {
    if (this.gstComplianceDetails) {
      const data = JSON.parse(JSON.parse(this.gstComplianceDetails[0].data));
      console.log(data)
      this.formDetailsGST.get('gstNum').setValue(data.gstNum)
      this.formDetailsGST.get('confirmGstNumber').setValue(data.gstNum)
      this.formDetailsGST.get('businessName').setValue(data.businessName)
      this.formDetailsGST.get('taxStructureConfirm').setValue(data.taxStructureConfirm == "yes" ? 2 : 1)
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsGST.get('certificateUrl').setValue(file)
        });
      }
    }
  }


  setFssaiDetails() {
    if (this.fssaiComplianceDetails) {
      const data = JSON.parse(JSON.parse(this.fssaiComplianceDetails[0].data));
      this.formDetailsFSSAI.get('liscense').setValue(data.liscense)
      this.formDetailsFSSAI.get('name').setValue(data.name)
      this.formDetailsFSSAI.get('address1').setValue(data.address1)
      this.formDetailsFSSAI.get('address2').setValue(new Date(data.address2))
      this.formDetailsFSSAI.get('city').setValue(data.city)
      this.formDetailsFSSAI.get('stateName').setValue(data.stateName)
      this.formDetailsFSSAI.get('pinCode').setValue(data.pinCode)
      this.formDetailsFSSAI.get('ownerName').setValue(data.ownerName)
      this.formDetailsFSSAI.get('ownerContactNumber').setValue(data.ownerContactNumber)
      this.formDetailsFSSAI.get('validUpto').setValue(new Date(data.validUpto))
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsFSSAI.get('certificateUrl').setValue(file)
        });
      }
    }
  }

  setPanDetails() {

    if (this.panComplianceDetails) {
      const data = JSON.parse(JSON.parse(this.panComplianceDetails[0].data));
      this.formDetailsPAN.get('panNumber').setValue(data.panNumber)
      this.formDetailsPAN.get('confirmPanNum').setValue(data.confirmPanNum)
      this.formDetailsPAN.get('businessName').setValue(data.businessName)
      this.formDetailsPAN.get('dobOfCorporation').setValue(new Date(data.dobOfCorporation))
      this.formDetailsPAN.get('panType').setValue(data.panType)
      this.formDetailsPAN.get('entityType').setValue(data.entityType)
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsPAN.get('certificateUrl').setValue(file)
        });
      }
    }
  }

  setTradeLicenseDetails() {

  }


  setFormDetails() {
    const currentData = this.storeProfileDetails[0].sourceAsMap

    this.store_display_name = currentData.store_display_name;
    this.tagLine = currentData.tagLine;
    this.businessCategoryId = [currentData.businessCategoryId];
    this.businessCategoryName = currentData.businessCategoryName;
    this.store_logo_url = currentData.store_logo_url;
    this.store_cover_image = currentData.store_cover_image;
    this.is_live = currentData.is_live;
    this.store_operation = currentData.store_operation;
    this.store_address = currentData.store_address;
    this.enable_delivery_requestStr = currentData.enable_delivery_requestStr;
    if (currentData.location) {
      this.map.lat = Number(currentData.location.lat)
      this.map.lng = Number(currentData.location.lon)
    }
    if (currentData.delivery_attributes) {
      this.formDeliverySettings.get('store_pickup').setValue(currentData.delivery_attributes.store_pickup == 'NO' ? false : true)
      this.formDeliverySettings.get('self_delivery').setValue(currentData.delivery_attributes.home_delivery ? true : false)
      this.formDeliverySettings.get('order_processing_time').setValue(currentData.delivery_attributes.order_processing_time.value)
      if (currentData.delivery_attributes.home_delivery) {
        this.formDeliverySettings.get('delivery_radius').setValue(currentData.delivery_attributes.home_delivery.delivery_radius)
        this.formDeliverySettings.get('free_delivery_radius').setValue(currentData.delivery_attributes.home_delivery.free_delivery_radius)
        this.formDeliverySettings.get('additional_delivery_charge').setValue(currentData.delivery_attributes.home_delivery.additional_delivery_cost)
      }
    }


  }

  formatAMPM(dateobj) {
    const date = new Date(Number(dateobj))
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  onSubmit(formType, imageUrl = '') {
    switch (formType) {
      case 'store_logo': {
        const payload = { storeId: this.storeId, logoUrl: imageUrl }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'store_cover_image': {
        const payload = { storeId: this.storeId, coverImage: imageUrl }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'accepting_orders': {
        this.is_live = !this.is_live
        const payload = { storeId: this.storeId, isLive: this.is_live }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'store_name': {
        const payload = { storeId: this.storeId, storeName: this.store_display_name }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'store_tagline': {
        const payload = { storeId: this.storeId, tagLine: this.tagLine }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'store_addresss': {
        const payload = { storeId: this.storeId, latitude: `${this.map.lat}`, longitude: `${this.map.lng}`, address: this.store_address }
        console.log(payload)
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        break;
      }
      case 'business_category': {
        const category = this.businessCategoryList.find(e => e.id == this.businessCategoryId[0])
        const payload = { storeId: this.storeId, businessCategoryId: this.businessCategoryId[0], businessCategoryName: category.businessCategoryName }
        this.store.dispatch(new UpdateStoreBasicDetails(payload))
        console.log(payload)
        break;
      }
      case 'store_operation': {
        const payload = { storeid: this.storeId, storeOperation: this.store_operation }
        console.log(payload)
        this.store.dispatch(new UpdateStoreOperationDetails(payload))
        break;
      }
      case 'formDetailsGST': {
        const formPayload = {
          gstNum: this.formDetailsGST.get('gstNum').value,
          businessName: this.formDetailsGST.get('businessName').value,
          taxStructureConfirm: this.formDetailsGST.get('taxStructureConfirm').value == 1 ? 'no' : 'yes',
          certificateUrl: imageUrl
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'GST',
          label: this.formDetailsGST.get('gstNum').value,
          data: JSON.stringify(formPayload)
        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsPAN': {
        const formPayload = {
          panNumber: this.formDetailsPAN.get('panNumber').value,
          businessName: this.formDetailsPAN.get('businessName').value,
          dobOfCorporation: this.formDetailsPAN.get('dobOfCorporation').value,
          panType: this.formDetailsPAN.get('panType').value,
          certificateUrl: imageUrl,
          entityType: this.formDetailsPAN.get('panType').value == 'entity' ? 'entity' : 'individual'
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'PAN',
          label: this.formDetailsPAN.get('panNumber').value,
          data: JSON.stringify(formPayload)
        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsFSSAI': {
        const formPayload = {
          liscense: this.formDetailsFSSAI.get('liscense').value,
          name: this.formDetailsFSSAI.get('name').value,
          address1: this.formDetailsFSSAI.get('address1').value,
          address2: this.formDetailsFSSAI.get('address2').value,
          city: this.formDetailsFSSAI.get('city').value,
          stateName: this.formDetailsFSSAI.get('stateName').value,
          pinCode: this.formDetailsFSSAI.get('pinCode').value,
          ownerName: this.formDetailsFSSAI.get('ownerName').value,
          ownerContactNumber: this.formDetailsFSSAI.get('ownerContactNumber').value,
          validUpto: this.formDetailsFSSAI.get('validUpto').value,
          certificateUrl: imageUrl,
          fileObj: [null]
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'FSSAI',
          label: this.formDetailsFSSAI.get('liscense').value,
          data: JSON.stringify(formPayload)
        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsTradeLicense': {
        const formPayload = {
          certifyingAuthority: this.formDetailsTradeLicense.get('certifyingAuthority').value,
          certificateNumber: this.formDetailsTradeLicense.get('certificateNumber').value,
          certificateType: this.formDetailsTradeLicense.get('certificateType').value == 2 ? 'entity' : 'individual',
          businessName: this.formDetailsTradeLicense.get('businessName').value,
          certificateUrl: imageUrl,
          certificateValidity: this.formDetailsTradeLicense.get('certificateValidity').value,
          entityType: this.formDetailsTradeLicense.get('certificateType').value == 2 ? 'entity' : 'individual'
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'TRADELICENSE',
          label: this.formDetailsTradeLicense.get('certificateNumber').value,
          data: JSON.stringify(formPayload)
        }
        console.log(payload)
        // this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDeliverySettings': {
        if (this.formDeliverySettings.get('self_delivery').value == true) {
          this.formDeliverySettings.get('additional_delivery_charge').setValidators([Validators.required])
          this.formDeliverySettings.get('delivery_radius').setValidators([Validators.required])
          this.formDeliverySettings.get('free_delivery_radius').setValidators([Validators.required])
          this.formDeliverySettings.get('additional_delivery_charge').updateValueAndValidity()
          this.formDeliverySettings.get('delivery_radius').updateValueAndValidity()
          this.formDeliverySettings.get('free_delivery_radius').updateValueAndValidity()
        } else {
          this.formDeliverySettings.get('additional_delivery_charge').clearValidators()
          this.formDeliverySettings.get('delivery_radius').clearValidators()
          this.formDeliverySettings.get('free_delivery_radius').clearValidators()
          this.formDeliverySettings.get('additional_delivery_charge').updateValueAndValidity()
          this.formDeliverySettings.get('delivery_radius').updateValueAndValidity()
          this.formDeliverySettings.get('free_delivery_radius').updateValueAndValidity()
        }
        if (this.formDeliverySettings.valid) {
          const formPayload = {
            storeid: this.storeId,
            deliveryAttributes: {
              store_pickup: this.formDeliverySettings.get('store_pickup').value == true ? 'YES' : 'NO',
              order_processing_time: {
                value: this.formDeliverySettings.get('order_processing_time').value,
                unit: ""
              }
            }
          }
          if (this.formDeliverySettings.get('self_delivery').value == true) {
            formPayload['home_delivery'] = {
              additional_delivery_cost: this.formDeliverySettings.get('additional_delivery_charge').value,
              additional_delivery_cost_unit: "km",
              delivery_radius: this.formDeliverySettings.get('delivery_radius').value,
              delivery_radius_unit: "km",
              free_delivery_radius: this.formDeliverySettings.get('free_delivery_radius').value,
              free_delivery_radius_unit: "km"
            }

            console.log(formPayload)
          }
          this.store.dispatch(new UpdateStoreDeliverySettings(formPayload))
        }
        else {
          this.markFormGroupTouched(this.formDeliverySettings);
        }
        break;
      }
      default: {
        return null;
      }
    }

    // this.apiMessageService.changeApiStatus({
    //   type: ActionTypes.updateStoreBasicDetails,
    //   status: false,
    //   payload: null
    // })

    // this.subscription = this.apiMessageService.currentApiStatus.subscribe((response) => {
    //   let res: any = response.status;
    //   if (res && response.type == ActionTypes.updateStoreBasicDetails) {
    //     setTimeout(() => {
    //       this.store.dispatch(new GetStoreProfileAction({
    //         storeId: this.storeId, latitude: "22.5392287", longitude: "88.3595163"
    //       }));
    //     }, 3000);
    //     this.subscription.unsubscribe()
    //   }
    // })

  }

  getOpeningAndClosingTime(event, i, type) {
    const time = moment('2011-10-31 ' + event, 'YYYY-MM-DD h:mm a').format('x')
    if (type == 'openTime') {
      this.store_operation[i]['openTime'] = time
    } else {
      this.store_operation[i]['closeTime'] = time
    }
  }

  onSelectFile(event, filefor) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      let acceptedFileType;

      switch (filefor) {
        case 'store_logo_url': {
          acceptedFileType = ['jpeg', 'jpg', 'png', 'gif'];
          break;
        }
        case 'store_cover_image': {
          acceptedFileType = ['jpeg', 'jpg', 'png', 'gif'];
          break;
        }
        default: {
          acceptedFileType = ['jpeg', 'jpg', 'png', 'gif', 'pdf'];
          break;
        }
      }

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        if (filefor == 'store_logo_url' || filefor == 'store_cover_image') {
          this.doImageCrop(event, filefor)
          // this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, filefor)
        }
        else {
          this[filefor].get('certificateUrl').setValue(event.target.files[0])
        }

      }
    }
  }

  deleteFile(formName) {
    this[formName].get('certificateUrl').setValue('')
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, uploadFor) {
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })

    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        if (uploadFor == 'store_logo_url') {
          // this.store_logo_url = res['awsImgUpload'].Location
          this.onSubmit('store_logo', res['awsImgUpload'].Location)
        } else if (uploadFor == 'store_cover_image') {
          // this.store_cover_image = res['awsImgUpload'].Location
          this.onSubmit('store_cover_image', res['awsImgUpload'].Location)
        }
        else {
          this.onSubmit(uploadFor, res['awsImgUpload'].Location)
        }
        this.fileUploadSubscription.unsubscribe();
      }
    });
    this.store.dispatch(new StoreImgUploadToAws(null));
  }


  formSubmitForCompliance(formType) {
    if (this[formType].valid) {
      const file = this[formType].get('certificateUrl').value;
      const filename = file['name'];
      const filetype = file['type'].split('/')[1];
      const applicationtype = file['type'];
      this.uploadFileToAws(file, filename, filetype, applicationtype, formType)
    } else {
      this.markFormGroupTouched(this[formType])
    }
  }

  doImageCrop(event, uploadFor) {
    const dialogRef = this.dialog.open(ImageCropperPopupComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'image-crop-dialog',
      data: { event, uploadFor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { newfile, filename, filetype, applicationtype, uploadFor } = result
        this.uploadFileToAws(newfile, filename, filetype, applicationtype, uploadFor)
      }
    });
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  openedExpansionPanel(formtype) {
    if (this.storeProfileDetails[0].storeCompliance && this.storeProfileDetails[0].storeCompliance.length > 0) {
      this.storeProfileDetails[0].storeCompliance.forEach(element => {
        if (element.complianceType == formtype && element.complianceId) {
          this.store.dispatch(new GetStoreComplianceDetails({
            complianceId: element.complianceId
          }))
        }
      });

    }
  }

  downloadFile(file) {
    saveAs(file)
  }

  ngOnDestroy() {
    if(this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe()
    }
    this.store.dispatch(new StoreImgUploadToAws(null));
    this.store.dispatch(new StoreStoreProfileAction(null));
    this.store.dispatch(new StoreStoreComplianceDetails({ obj: null }))
  }
}
