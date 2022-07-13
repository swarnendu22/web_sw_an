import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MerchantManagementState } from 'src/app/reducers/merchant-management.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { DriverDocumentViewComponent } from '../driver-document-view/driver-document-view.component';
import {
  GetDeliveryBoyDetails,
  ApproveRejectDriverDetails,
  GetDeliveryBoyLiceseTypes,
  GetDrivingLissuingState
} from 'src/app/actions/merchant-management.actions'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { UploadImageToAws, StoreImgUploadToAws } from 'src/app/actions/img-upload-aws.action';
import { Subscription } from 'rxjs/internal/Subscription';
import {MatSnackBar} from '@angular/material/snack-bar';
// tslint:disable-next-line: max-line-length
import { DriverDetailsApproveRejectPopupComponent } from '../../components/driver-details-approve-reject-popup/driver-details-approve-reject-popup.component';
import { MapsAPILoader } from '@agm/core';
import * as  moment from 'moment';

declare var google;

export interface Map {
  lat: number,
  lng: number
}

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  driverDetailsForm: FormGroup
  todayDate = new Date()
  driverDetails = null
  id = null
  minDLDate = new Date()
  fileUploadSubscription: Subscription;
  defaultPhotoUrl = '../../../../../assets/img/driver.png'
  photoUrl = '../../../../../assets/img/driver.png';
  status = null
  listLicenseTypes = []
  issuingStateList = []
  selectedDrivingLisenceType = []
  vehicleTypeName = null

  licenseTypeError = false

  public searchControl: FormControl;

  map: Map = { lat: 22.5392287, lng: 88.3595163 };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private store: Store<any>,
    public _fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog, private route: ActivatedRoute,
    public apiService: ApiMessageService,
    private _snackBar: MatSnackBar,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) {
    this.id = this.route.snapshot.params.id;
    //   this.store.dispatch(new GetDeliveryBoyDetails({ id: this.route.snapshot.params.id }));
    //   this.store.dispatch(new GetDeliveryBoyLiceseTypes());
    //   this.store.dispatch(new GetDrivingLissuingState());
  }

  openDocument(controlName) {

    window.open(this.driverDetailsForm.get(controlName).value, '_blank');
    // const dialogRef = this.dialog.open(DriverDocumentViewComponent, {
    //   height: '600px',
    //   panelClass: 'driver-document-modal',
    //   data: { docUrl: this.driverDetailsForm.get(controlName).value }


    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  markerDragEnd(map, event) {
    console.log('Map, Events', map, event);
    this.map = { lat: +event.coords.lat, lng: +event.coords.lng };
    this.driverDetailsForm.get('base_point_lat').setValue(+event.coords.lat);
    this.driverDetailsForm.get('base_point_long').setValue(+event.coords.lng);
  }

  ngOnInit() {

    this.searchControl = new FormControl();
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.map = { lat: +place.geometry.location.lat(), lng: +place.geometry.location.lng() };
    //     });
    //   });
    // });
    // this.store.dispatch(new GetAllDeliveryRequest({ pageNo: this.pageNo, requestBody:null}));
    this.driverDetailsForm = this._fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      photo_url: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['MALE', Validators.required],
      status: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      // Working Details
      driving_license_number: ['', [Validators.required, Validators.pattern('^([a-zA-Z]){2}[0-9]{13}$')]],
      driving_licence_state: ['', Validators.required],
      driving_license_front_page_url: ['', Validators.required],
      driving_license_back_page_url: ['', Validators.required],
      // driving_license_type:  this._fb.array([this.createLType()]),
      driving_license_type: ['', Validators.required],
      driving_license_validity: ['', Validators.required],

      pan_card_number: ['', [Validators.required, Validators.pattern("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$")]],
      pan_card_photo_url: ['', Validators.required],
      police_verification_certificate_url: ['', Validators.required],
      highest_qualification: ['', Validators.required],
      proof_of_identity_photo_url: ['', Validators.required],
      proof_of_identity_backpage_url: ['', Validators.required],
      highest_qualification_certificate_url: [''],

      // Present Address
      pre_address1: ['', Validators.required],
      pre_address2: ['', Validators.required],
      pre_address_proof_file_url: ['', Validators.required],
      pre_address_type: ['', Validators.required],
      pre_city: ['', Validators.required],
      pre_state_name: ['', Validators.required],
      pre_country_name: ['', Validators.required],
      pre_country_code: ['', Validators.required],
      pre_zipcode: ['', Validators.required],
      pre_lat: ['', Validators.required],
      pre_long: ['', Validators.required],

      // Permanent Address
      per_address1: ['', Validators.required],
      per_address2: ['', Validators.required],
      per_address_proof_file_url: ['', Validators.required],
      per_address_type: ['', Validators.required],
      per_city: ['', Validators.required],
      per_state_name: ['', Validators.required],
      per_country_name: ['', Validators.required],
      per_country_code: ['', Validators.required],
      per_zipcode: ['', Validators.required],
      per_lat: ['', Validators.required],
      per_long: ['', Validators.required],

      // operational
      base_point_lat: ['', Validators.required],
      base_point_long: ['', Validators.required],
      max_buffer_distance: ['', Validators.required],

      // Vehicle
      vehicle_model_name: [''],
      vehicle_model_year: [''],
      vehicle_plate_number: [''],
      vehicle_insurance_copy_url: [''],

      // Bank
      bank_name: [''],
      account_holder_name: [''],
      account_number: [''],
      ifsc_code: [''],
    })
    // this.store.pipe(select('merchantManagement')).subscribe(res => {
    //   // tslint:disable-next-line: no-string-literal
    //   if (res && res['deliveryBoyDetails']) {
    //     this.driverDetails = res.deliveryBoyDetails;
    //     // this.driverDetailsForm.get('id').setValue(this.driverDetails.delivery_boy.id);
    //     this.driverDetailsForm.get('name').setValue(this.driverDetails.delivery_boy.name);
    //     this.driverDetailsForm.get('photo_url').setValue(this.driverDetails.delivery_boy.photo_url);
    //     this.driverDetailsForm.get('phone').setValue(this.driverDetails.delivery_boy.phone);
    //     this.driverDetailsForm.get('email').setValue(this.driverDetails.delivery_boy.email);
    //     this.driverDetailsForm.get('status').setValue(this.driverDetails.delivery_boy.status);
    //     this.driverDetailsForm.get('dob').setValue(moment(this.driverDetails.delivery_boy.dob, 'DD-MM-YYYY').toDate());
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('gender').setValue(this.driverDetails.delivery_boy.gender ? this.driverDetails.delivery_boy.gender : 'MALE');
    //     this.driverDetailsForm.get('vehicle_type').setValue(this.driverDetails.delivery_boy.vehicle_type);
    //     this.driverDetailsForm.get('driving_license_number').setValue(this.driverDetails.delivery_boy.driving_license_number);
    //     this.driverDetailsForm.get('driving_licence_state').setValue(this.driverDetails.delivery_boy.driving_licence_state);
    //     this.driverDetailsForm.get('pan_card_photo_url').setValue(this.driverDetails.delivery_boy.pan_card_photo_url);
    //     this.driverDetailsForm.get('pan_card_number').setValue(this.driverDetails.delivery_boy.pan_card_number);
    //     // tslint:disable-next-line: max-line-length
    //     // this.driverDetailsForm.get('driving_license_type').setValue(this.serialiseLicenseType(this.driverDetails.marketplace_driving_license_detail.details, true));
    //     this.driverDetailsForm.get('driving_license_type').setValue(this.driverDetails.marketplace_driving_license_detail.details);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('driving_license_validity').setValue(moment(this.driverDetails.delivery_boy.driving_license_validity, 'DD-MM-YYYY').toDate());
    //     this.driverDetailsForm.get('driving_license_back_page_url').setValue(this.driverDetails.delivery_boy.driving_license_back_page_url);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('driving_license_front_page_url').setValue(this.driverDetails.delivery_boy.driving_license_front_page_url);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('police_verification_certificate_url').setValue(this.driverDetails.delivery_boy.police_verification_certificate_url);
    //     this.driverDetailsForm.get('highest_qualification').setValue(this.driverDetails.delivery_boy.highest_qualification);
    //     this.driverDetailsForm.get('proof_of_identity_photo_url').setValue(this.driverDetails.delivery_boy.proof_of_identity_photo_url);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('proof_of_identity_backpage_url').setValue(this.driverDetails.delivery_boy.proof_of_identity_backpage_url);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('highest_qualification_certificate_url').setValue(this.driverDetails.delivery_boy.highest_qualification_certificate_url);

    //     // Present Address
    //     this.driverDetailsForm.get('pre_address1').setValue(this.driverDetails.present_address.address1);
    //     this.driverDetailsForm.get('pre_address2').setValue(this.driverDetails.present_address.address2);
    //     this.driverDetailsForm.get('pre_address_proof_file_url').setValue(this.driverDetails.present_address.address_proof_file_url);
    //     this.driverDetailsForm.get('pre_address_type').setValue(this.driverDetails.present_address.address_type);
    //     this.driverDetailsForm.get('pre_city').setValue(this.driverDetails.present_address.city);
    //     this.driverDetailsForm.get('pre_zipcode').setValue(this.driverDetails.present_address.zipcode);
    //     this.driverDetailsForm.get('pre_country_code').setValue(this.driverDetails.present_address.country_code);
    //     this.driverDetailsForm.get('pre_state_name').setValue(this.driverDetails.present_address.state_name);
    //     this.driverDetailsForm.get('pre_country_name').setValue(this.driverDetails.present_address.country_name);
    //     this.driverDetailsForm.get('pre_lat').setValue(this.driverDetails.present_address.lat);
    //     this.driverDetailsForm.get('pre_long').setValue(this.driverDetails.present_address.long);

    //     // Permanent Address
    //     this.driverDetailsForm.get('per_address1').setValue(this.driverDetails.permanent_address.address1);
    //     this.driverDetailsForm.get('per_address2').setValue(this.driverDetails.permanent_address.address2);
    //     this.driverDetailsForm.get('per_address_proof_file_url').setValue(this.driverDetails.permanent_address.address_proof_file_url);
    //     this.driverDetailsForm.get('per_address_type').setValue(this.driverDetails.permanent_address.address_type);
    //     this.driverDetailsForm.get('per_city').setValue(this.driverDetails.permanent_address.city);
    //     this.driverDetailsForm.get('per_zipcode').setValue(this.driverDetails.permanent_address.zipcode);
    //     this.driverDetailsForm.get('per_country_code').setValue(this.driverDetails.permanent_address.country_code);
    //     this.driverDetailsForm.get('per_state_name').setValue(this.driverDetails.permanent_address.state_name);
    //     this.driverDetailsForm.get('per_country_name').setValue(this.driverDetails.permanent_address.country_name);
    //     this.driverDetailsForm.get('per_lat').setValue(this.driverDetails.permanent_address.lat);
    //     this.driverDetailsForm.get('per_long').setValue(this.driverDetails.permanent_address.long);

    //     // opeartional
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('base_point_lat').setValue(this.driverDetails.delivery_boy.base_lat ? this.driverDetails.delivery_boy.base_lat : this.driverDetails.present_address.lat);
    //     // tslint:disable-next-line: max-line-length
    //     this.driverDetailsForm.get('base_point_long').setValue(this.driverDetails.delivery_boy.base_lng ? this.driverDetails.delivery_boy.base_lng : this.driverDetails.present_address.long);
    //     // this.driverDetailsForm.get('max_buffer_distance').setValue();

    //     // Vehicle
    //     this.driverDetailsForm.get('vehicle_model_name').setValue(this.driverDetails.delivery_boy.vehicle_model_name);
    //     this.driverDetailsForm.get('vehicle_model_year').setValue(this.driverDetails.delivery_boy.vehicle_model_year);
    //     this.driverDetailsForm.get('vehicle_plate_number').setValue(this.driverDetails.delivery_boy.vehicle_plate_number);
    //     this.driverDetailsForm.get('vehicle_insurance_copy_url').setValue(this.driverDetails.delivery_boy.vehicle_insurance_copy_url);

    //     // Bank Details
    //     this.driverDetailsForm.get('bank_name').setValue(this.driverDetails.delivery_boy.bank_name);
    //     this.driverDetailsForm.get('account_holder_name').setValue(this.driverDetails.delivery_boy.account_holder_name);
    //     this.driverDetailsForm.get('account_number').setValue(this.driverDetails.delivery_boy.account_number);
    //     this.driverDetailsForm.get('ifsc_code').setValue(this.driverDetails.delivery_boy.ifsc_code);
    //     // tslint:disable-next-line: max-line-length
    //     this.map = { lat: this.driverDetails.delivery_boy.base_lat ? +this.driverDetails.delivery_boy.base_lat : +this.driverDetails.present_address.lat, lng: this.driverDetails.delivery_boy.base_lng ? +this.driverDetails.delivery_boy.base_lng : +this.driverDetails.present_address.long }
    //     this.photoUrl = this.driverDetails.delivery_boy.photo_url ? this.driverDetails.delivery_boy.photo_url : this.photoUrl;
    //     this.status = this.driverDetails.delivery_boy.status;
    //     // tslint:disable-next-line: max-line-length
    //     this.vehicleTypeName = this.vehicleTypeChecking(this.driverDetails.delivery_boy.vehicle_type)
    //     this.selectedDrivingLisenceType = this.driverDetails.marketplace_driving_license_detail.details.map(dl => dl.id)

    //     // if (this.vehicleTypeName) {
    //     //   this.vehicleType(this.driverDetailsForm.get('vehicle_type').value);

    //     // }

    //     console.log('TYPE NAME', this.vehicleTypeName)
    //   }

    //   if (res && res['deliveryBoyLisenseTypes']) {
    //     this.listLicenseTypes = res.deliveryBoyLisenseTypes.driving_licens_types;
    //     console.log('TYPE', this.listLicenseTypes);
    //   }
    //   if (res && res['drivingIssuingState']) {
    //     this.issuingStateList = res.drivingIssuingState;
    //   }
    // });

  }

  // createLType(): FormGroup {
  //   return this._fb.group({
  //     driving_license_vhicle_type: '',
  //     driving_license_vehicle_type_id: '',
  //   });
  // }

  updateDriver(status) {
    // tslint:disable-next-line: max-line-length
    console.log('FORM VALID', this.driverDetailsForm.valid, this.driverDetailsForm.status, this.driverDetailsForm.errors, this.driverDetailsForm.controls, this.driverDetailsForm.value)
    if (status === 'REJECTED') {
      this.dialog.open(DriverDetailsApproveRejectPopupComponent, {
        width: '550px',
        data: { payload: { name: 'REJECT' } },
      }).afterClosed().subscribe(result => {
        if (result) {
          console.log('Result', this.driverDetailsForm.value)
          this.store.dispatch(new ApproveRejectDriverDetails(this.updateRejectPayload(status), this.id));
          this.apiService.currentApiStatus.subscribe(details => {
            if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
              this.router.navigate(['merchant/delivery-boys'])
            }
          })
        }
      })
    } else {
      this.markFormGroupTouched(this.driverDetailsForm)
      if (this.driverDetailsForm.valid) {

        console.log('VALID FORM')
        this.dialog.open(DriverDetailsApproveRejectPopupComponent, {
          width: '550px',
          data: { payload: { name: 'Approve' } },
        }).afterClosed().subscribe(result => {
          if (result) {
            console.log('Form Body', new ApproveRejectDriverDetails(this.updatePayload(status), this.id))
            this.store.dispatch(new ApproveRejectDriverDetails(this.updatePayload(status), this.id));
            this.apiService.currentApiStatus.subscribe(details => {
              if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
                this.router.navigate(['merchant/delivery-boys'])
              }
            })
          }
        })
      }
    }
  }

  updateDriverProfile() {
    this.markFormGroupTouched(this.driverDetailsForm)
    console.log('Update', this.driverDetailsForm.value)
    if (this.driverDetailsForm.valid) {
      // let payload = this.updatePayload(this.status)
      // delete payload.marketplace_delivery_boy.status;
      // console.log('Result', payload);
      this.store.dispatch(new ApproveRejectDriverDetails(this.updatePayload(this.driverDetailsForm.get('status').value), this.id));
      this.apiService.currentApiStatus.subscribe(details => {
        if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
          this.router.navigate(['merchant/delivery-boys'])
        }
      })

    }
  }

  vehicleType(value) {
    this.vehicleTypeName = this.vehicleTypeChecking(value);

    console.log('Vehicle Type', value, this.vehicleTypeName);
    if (value == 'eRiksa' || value == 'Bicycle') {

      this.driverDetailsForm.get('driving_license_number').setValue('')
      this.driverDetailsForm.get('driving_license_validity').setValue('')
      this.driverDetailsForm.get('driving_licence_state').setValue('')
      this.driverDetailsForm.get('driving_license_back_page_url').setValue('')
      this.driverDetailsForm.get('driving_license_front_page_url').setValue('')

      this.driverDetailsForm.get('driving_license_number').clearValidators()
      this.driverDetailsForm.get('driving_license_number').disable()

      this.driverDetailsForm.get('driving_licence_state').clearValidators()
      this.driverDetailsForm.get('driving_licence_state').disable()


      this.driverDetailsForm.get('driving_license_type').clearValidators()
      this.driverDetailsForm.get('driving_license_type').disable()


      this.driverDetailsForm.get('driving_license_validity').clearValidators()
      this.driverDetailsForm.get('driving_license_validity').disable()


      this.driverDetailsForm.get('driving_license_back_page_url').clearValidators()
      this.driverDetailsForm.get('driving_license_back_page_url').disable()


      this.driverDetailsForm.get('driving_license_front_page_url').clearValidators()
      this.driverDetailsForm.get('driving_license_front_page_url').disable()


      // this.driverDetailsForm.get('vehicle_model_name').clearValidators()
      // this.driverDetailsForm.get('vehicle_model_year').clearValidators()
      // this.driverDetailsForm.get('vehicle_plate_number').clearValidators()
      // this.driverDetailsForm.get('vehicle_insurance_copy_url').clearValidators()
      this.driverDetailsForm.updateValueAndValidity()
    } else {

      console.log('ELSE Value', this.driverDetailsForm.get('driving_license_back_page_url').errors)

      this.driverDetailsForm.get('driving_license_number').setValue(this.driverDetails.delivery_boy.driving_license_number)
      this.driverDetailsForm.get('driving_license_validity').setValue(moment(this.driverDetails.delivery_boy.driving_license_validity, 'DD-MM-YYYY').toDate())
      this.driverDetailsForm.get('driving_licence_state').setValue(this.driverDetails.delivery_boy.driving_licence_state)
      this.driverDetailsForm.get('driving_license_back_page_url').setValue(this.driverDetails.delivery_boy.driving_license_back_page_url)
      this.driverDetailsForm.get('driving_license_front_page_url').setValue(this.driverDetails.delivery_boy.driving_license_front_page_url)

      // if (!Boolean(this.driverDetailsForm.get('driving_license_number').value)) {
      // }
      this.driverDetailsForm.get('driving_license_number').setValidators([Validators.required]);
      // this.driverDetailsForm.get('driving_license_number').markAsTouched();
      this.driverDetailsForm.get('driving_license_number').enable();


      // // tslint:disable-next-line: max-line-length
      this.driverDetailsForm.get('driving_licence_state').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_licence_state').enable()


      this.driverDetailsForm.get('driving_license_type').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_type').enable()


      this.driverDetailsForm.get('driving_license_validity').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_validity').enable()


      this.driverDetailsForm.get('driving_license_back_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_back_page_url').enable()


      this.driverDetailsForm.get('driving_license_front_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_front_page_url').enable()
      this.driverDetailsForm.updateValueAndValidity()
      console.log('Else', this.driverDetailsForm.errors)
    }
  }

  vehicleTypeChecking(typeName) {
    switch (typeName) {
      case 'Bicycle':
        return false;
      case 'Two Wheeler':
        return true;
      case 'eRiksa':
        return false;
      case 'Four Wheeler':
        return true;
      default:
        return true;
    }
  }


  vehicleTypeValidity(value) {
    this.vehicleTypeName = this.vehicleTypeChecking(value);

    console.log('Vehicle Type', value, this.vehicleTypeName);
    if (!this.vehicleTypeName) {
      this.driverDetailsForm.get('driving_license_number').clearValidators()

      this.driverDetailsForm.get('driving_licence_state').clearValidators()


      this.driverDetailsForm.get('driving_license_type').clearValidators()


      this.driverDetailsForm.get('driving_license_validity').clearValidators()
      this.driverDetailsForm.get('driving_license_validity').setValue('')


      this.driverDetailsForm.get('driving_license_back_page_url').clearValidators()


      this.driverDetailsForm.get('driving_license_front_page_url').clearValidators()


      // this.driverDetailsForm.get('vehicle_model_name').clearValidators()
      // this.driverDetailsForm.get('vehicle_model_year').clearValidators()
      // this.driverDetailsForm.get('vehicle_plate_number').clearValidators()
      // this.driverDetailsForm.get('vehicle_insurance_copy_url').clearValidators()
      this.driverDetailsForm.updateValueAndValidity()
    } else {
      this.driverDetailsForm.get('driving_license_number').setErrors({ required: true });


      this.driverDetailsForm.get('driving_licence_state').setErrors({ required: true })


      this.driverDetailsForm.get('driving_license_type').setErrors({ required: true })


      this.driverDetailsForm.get('driving_license_validity').setErrors({ required: true })


      this.driverDetailsForm.get('driving_license_back_page_url').setErrors({ required: true })


      this.driverDetailsForm.get('driving_license_front_page_url').setErrors({ required: true })


      this.driverDetailsForm.updateValueAndValidity()
    }
  }

  // drivingLicenseTypeValid() {
  //   const typeLength = this.driverDetailsForm.get('driving_license_type').value

  //   console.log('TYPE ERROR', this.vehicleTypeName)

  //   if (this.vehicleTypeName) {
  //     console.log('TYPE ERROR', this.vehicleTypeName)

  //     if (typeLength.length > 0) {
  //       return true
  //     } else {
  //       this.driverDetailsForm.get('driving_license_type').setErrors({ required: true });
  //       this.driverDetailsForm.get('driving_license_type').markAllAsTouched()
  //       return false
  //     }
  //   } else {
  //     console.log('TYPE ERROR', this.vehicleTypeName)

  //     return true
  //   }

  // }

  licenseTypeChange(e) {
    console.log('licenseTypeChange////', e)
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

    // this.drivingLicenseTypeValid()
    // this.vehicleType(this.driverDetailsForm.get('vehicle_type').value);
  }

  onSelectFile(event, controlName) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      let acceptedFileType = ['jpeg', 'jpg', 'png', 'pdf'];

      if (acceptedFileType.indexOf(filetype) == -1) {
        this._snackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, controlName)
      }
    }
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, controlName) {
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

        console.log('IMAGE LOCATION', controlName, res['awsImgUpload'].Location);
        this.driverDetailsForm.get(controlName).setValue(res['awsImgUpload'].Location);

        if (controlName == 'photo_url') {
          this.photoUrl = res['awsImgUpload'].Location
        }

        this.fileUploadSubscription.unsubscribe();
        ////----- SAVE IMAGE DONE ----/////////
      }
    });
  }

  deleteFile(controlName) {
    if (controlName == 'photo_url') {
      this.driverDetailsForm.get(controlName).setValue(this.defaultPhotoUrl);
      this.photoUrl = this.defaultPhotoUrl;
    } else {
      this.driverDetailsForm.get(controlName).setValue('');
    }
  }

  changeVal(e) {
    console.log('E', e.value)
    this.driverDetailsForm.get('driving_license_type').setValue(e.value);
  }

  serialiseLicenseType(typeList, reverse = false) {
    console.log('seriali 1st', typeList)

    if (reverse) {
      let payload = []
      if (Array.isArray(typeList)) {
        typeList.forEach(type => {
          payload.push({
            driving_license_vehicle_type_id: type.id,
            driving_license_vhicle_type: type.title
          })
        })
        console.log('seriali', payload)
        return payload
      }
    } else {
      let payload = []
      if (Array.isArray(typeList)) {
        typeList.forEach(type => {
          payload.push({
            id: type.driving_license_vehicle_type_id,
            title: type.driving_license_vhicle_type
          })
        })
        console.log('seriali', payload)
        return payload
      }
    }
  }

  updatePayload(status) {
    let selectedDrivingLisences = []
    const distrinctDrivingLisenceTypes = this.selectedDrivingLisenceType;
    this.listLicenseTypes.filter(dlType => {
      if (distrinctDrivingLisenceTypes.includes(dlType.id)) {
        selectedDrivingLisences.push(dlType)
      }
    })
    console.log("selectedDrivingLisences::::", selectedDrivingLisences)
    return {
      marketplace_delivery_boy: {
        // id: this.driverDetailsForm.get('id').value,
        name: this.driverDetailsForm.get('name').value,
        phone: this.driverDetailsForm.get('phone').value,
        email: this.driverDetailsForm.get('email').value,
        photo_url: this.driverDetailsForm.get('photo_url').value,
        dob: this.driverDetailsForm.get('dob').value,

        age: this.driverDetails.delivery_boy.age,
        status,

        vehicle_type: this.driverDetailsForm.get('vehicle_type').value,
        driving_license_number: this.driverDetailsForm.get('driving_license_number').value,
        driving_licence_state: this.driverDetailsForm.get('driving_licence_state').value,
        driving_license_validity: this.driverDetailsForm.get('driving_license_validity').value,
        pan_card_number: this.driverDetailsForm.get('pan_card_number').value,
        pan_card_photo_url: this.driverDetailsForm.get('pan_card_photo_url').value,

        proof_of_identity_type: this.driverDetails.delivery_boy.proof_of_identity_type,
        proof_of_identity_number: this.driverDetails.delivery_boy.proof_of_identity_number,

        proof_of_identity_photo_url: this.driverDetailsForm.get('proof_of_identity_photo_url').value,
        proof_of_identity_backpage_url: this.driverDetailsForm.get('proof_of_identity_backpage_url').value,
        driving_license_front_page_url: this.driverDetailsForm.get('driving_license_front_page_url').value,

        proof_of_address_type: this.driverDetails.delivery_boy.proof_of_address_type,
        proof_of_address_number: this.driverDetails.delivery_boy.proof_of_address_number,
        proof_of_address_photo_url: this.driverDetails.delivery_boy.proof_of_address_photo_url,


        vehicle_model_name: this.driverDetailsForm.get('vehicle_model_name').value,
        vehicle_model_year: this.driverDetailsForm.get('vehicle_model_year').value,
        vehicle_plate_number: this.driverDetailsForm.get('vehicle_plate_number').value,
        vehicle_insurance_copy_url: this.driverDetailsForm.get('vehicle_insurance_copy_url').value,

        bank_name: this.driverDetailsForm.get('bank_name').value,
        account_holder_name: this.driverDetailsForm.get('account_holder_name').value,
        account_number: this.driverDetailsForm.get('account_number').value,
        ifsc_code: this.driverDetailsForm.get('ifsc_code').value,

        police_verification_certificate_url: this.driverDetailsForm.get('police_verification_certificate_url').value,
        highest_qualification: this.driverDetailsForm.get('highest_qualification').value,
        highest_qualification_certificate_url: this.driverDetailsForm.get('highest_qualification_certificate_url').value,
      },
      permanent_address: {
        address1: this.driverDetailsForm.get('per_address1').value,
        address2: this.driverDetailsForm.get('per_address2').value,
        address_type: this.driverDetailsForm.get('per_address_type').value,
        city: this.driverDetailsForm.get('per_city').value,
        zipcode: this.driverDetailsForm.get('per_zipcode').value,
        // phone: this.driverDetailsForm.get('phone').value,
        state_name: this.driverDetailsForm.get('per_state_name').value,
        lat: this.driverDetailsForm.get('per_lat').value,
        long: this.driverDetailsForm.get('per_long').value,
        country_name: this.driverDetailsForm.get('per_country_name').value,
        country_code: this.driverDetailsForm.get('per_country_code').value
      },
      present_address: {
        address1: this.driverDetailsForm.get('pre_address1').value,
        address2: this.driverDetailsForm.get('pre_address2').value,
        address_type: this.driverDetailsForm.get('pre_address_type').value,
        city: this.driverDetailsForm.get('pre_city').value,
        zipcode: this.driverDetailsForm.get('pre_zipcode').value,
        state_name: this.driverDetailsForm.get('pre_state_name').value,
        lat: this.driverDetailsForm.get('pre_lat').value,
        long: this.driverDetailsForm.get('pre_long').value,
        country_name: this.driverDetailsForm.get('pre_country_name').value,
        country_code: this.driverDetailsForm.get('pre_country_code').value
      },
      marketplace_driving_license_detail: {
        // details: this.serialiseLicenseType(this.driverDetailsForm.get('driving_license_type').value, true)
        details: selectedDrivingLisences
        // details: [{
        //   driving_license_vehicle_type_id: 1,
        //   driving_license_vhicle_type: 'LMV'
        // },
        // {
        //   driving_license_vehicle_type_id: 1,
        //   driving_license_vhicle_type: 'HMV'
        // }]
      },
      driver_operational_area: {
        base_point_lat: this.driverDetailsForm.get('base_point_lat').value,
        base_point_long: this.driverDetailsForm.get('base_point_long').value,
        max_buffer_distance: this.driverDetailsForm.get('max_buffer_distance').value
      }
    }
  }


  updateRejectPayload(status) {
    let selectedDrivingLisences = []
    const distrinctDrivingLisenceTypes = this.selectedDrivingLisenceType;
    this.listLicenseTypes.filter(dlType => {
      if (distrinctDrivingLisenceTypes.includes(dlType.id)) {
        selectedDrivingLisences.push(dlType)
      }
    })
    return {
      marketplace_delivery_boy: {
        id: this.driverDetails.delivery_boy.id,
        phone: this.driverDetails.delivery_boy.phone,
        email: this.driverDetails.delivery_boy.email,
        photo_url: this.driverDetails.delivery_boy.photo_url,
        dob: this.driverDetails.delivery_boy.dob,
        gender: this.driverDetails.delivery_boy.gender,
        age: this.driverDetails.delivery_boy.age,

        vehicle_type: this.driverDetails.delivery_boy.vehicle_type,
        driving_license_number: this.driverDetails.delivery_boy.driving_license_number,
        driving_licence_state: this.driverDetails.delivery_boy.driving_licence_state,
        driving_license_validity: this.driverDetails.delivery_boy.driving_license_validity,
        pan_card_number: this.driverDetails.delivery_boy.pan_card_number,
        pan_card_photo_url: this.driverDetails.delivery_boy.pan_card_photo_url,

        proof_of_identity_type: this.driverDetails.delivery_boy.proof_of_identity_type,
        proof_of_identity_number: this.driverDetails.delivery_boy.proof_of_identity_number,

        proof_of_identity_photo_url: this.driverDetails.delivery_boy.proof_of_identity_photo_url,
        proof_of_identity_backpage_url: this.driverDetails.delivery_boy.proof_of_identity_backpage_url,
        driving_license_front_page_url: this.driverDetails.delivery_boy.driving_license_front_page_url,

        proof_of_address_type: this.driverDetails.delivery_boy.proof_of_address_type,
        proof_of_address_number: this.driverDetails.delivery_boy.proof_of_address_number,
        proof_of_address_photo_url: this.driverDetails.delivery_boy.proof_of_address_photo_url,


        vehicle_model_name: this.driverDetails.delivery_boy.vehicle_model_name,
        vehicle_model_year: this.driverDetails.delivery_boy.vehicle_model_year,
        vehicle_plate_number: this.driverDetails.delivery_boy.vehicle_plate_number,
        vehicle_insurance_copy_url: this.driverDetails.delivery_boy.vehicle_insurance_copy_url,

        bank_name: this.driverDetails.delivery_boy.bank_name,
        account_holder_name: this.driverDetails.delivery_boy.account_holder_name,
        account_number: this.driverDetails.delivery_boy.account_number,
        ifsc_code: this.driverDetails.delivery_boy.ifsc_code,

        police_verification_certificate_url: this.driverDetails.delivery_boy.police_verification_certificate_url,
        highest_qualification: this.driverDetails.delivery_boy.highest_qualification,
        highest_qualification_certificate_url: this.driverDetails.delivery_boy.highest_qualification_certificate_url,
        status
      },
      permanent_address: {
        address1: this.driverDetails.present_address.per_address1,
        address2: this.driverDetails.present_address.per_address2,
        address_type: this.driverDetails.present_address.per_address_proof_type,
        city: this.driverDetails.present_address.per_city,
        zipcode: this.driverDetails.present_address.per_zipcode,
        // phone: this.driverDetails.present_address.phone,
        state_name: this.driverDetails.present_address.per_state_name,
        lat: this.driverDetails.present_address.per_lat,
        long: this.driverDetails.present_address.per_long,
        country_name: this.driverDetails.present_address.per_country_name,
        country_code: this.driverDetails.present_address.per_country_code
      },
      present_address: {
        address1: this.driverDetails.permanent_address.pre_address1,
        address2: this.driverDetails.permanent_address.pre_address2,
        address_type: this.driverDetails.permanent_address.pre_address_proof_type,
        city: this.driverDetails.permanent_address.pre_city,
        zipcode: this.driverDetails.permanent_address.pre_zipcode,
        state_name: this.driverDetails.permanent_address.pre_state_name,
        lat: this.driverDetails.permanent_address.pre_lat,
        long: this.driverDetails.permanent_address.pre_long,
        country_name: this.driverDetails.permanent_address.pre_country_name,
        country_code: this.driverDetails.permanent_address.pre_country_code
      },
      marketplace_driving_license_detail: {
        // details: this.driverDetails.marketplace_driving_license_detail.details
        details: selectedDrivingLisences
      },
      driver_operational_area: {
        base_point_lat: this.driverDetails.delivery_boy.base_point_lat,
        base_point_long: this.driverDetails.delivery_boy.base_point_long,
        max_buffer_distance: this.driverDetails.delivery_boy.max_buffer_distance
      }
    }
  }

}
