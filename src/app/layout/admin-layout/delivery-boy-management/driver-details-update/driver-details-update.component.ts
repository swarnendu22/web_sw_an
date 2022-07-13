import { PopupForDeleteComponent } from './../components/popup-for-delete/popup-for-delete.component';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MapsAPILoader } from '@agm/core';
import { ApproveRejectDriverDetails, GetDeliveryBoyDetails, GetDeliveryBoyLiceseTypes, GetDrivingLissuingState } from 'src/app/actions/merchant-management.actions';
import * as moment from 'moment';
import { StoreImgUploadToAws, UploadImageToAws } from 'src/app/actions/img-upload-aws.action';
import { DriverDetailsApproveRejectPopupComponent } from '../../components/driver-details-approve-reject-popup/driver-details-approve-reject-popup.component';
import { Location } from '@angular/common';
import { DriverDetailsHistoryModalComponent } from '../components/driver-details-history-modal/driver-details-history-modal.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { GetRegionsByCountryCodeDynamic, ListSearchDECommissionSettings, ActionTypes } from 'src/app/actions/delivery-boy-management.action';
import { ImageCropperPopupComponent } from '../../merchant-management/image-cropper-popup/image-cropper-popup.component';
import { AssignTrainingPopupComponent } from '../components/assign-training-popup/assign-training-popup.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-driver-details-update',
  templateUrl: './driver-details-update.component.html',
  styleUrls: ['./driver-details-update.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DriverDetailsUpdateComponent implements OnInit {

  public countryFilterCtrl: FormControl = new FormControl();
  public countryPerFilterCtrl: FormControl = new FormControl();
  public statePerFilterCtrl: FormControl = new FormControl();
  public statePreFilterCtrl: FormControl = new FormControl();
  public drivingStateFilterCtrl: FormControl = new FormControl();
  public commissionSettingsFilterCtrl: FormControl = new FormControl();

  driverDetailsForm: FormGroup;
  todayDate = new Date(moment(new Date()).subtract(18, 'years').format('DD/MM/YYYY'));
  driverDetails = null;
  id = null;
  minDLDate = new Date();
  maxDOB = new Date(moment(new Date()).subtract(18, 'years').format('DD/MM/YYYY'));
  fileUploadSubscription: Subscription;
  defaultPhotoUrl = '../../../../../assets/img/driver.png';
  photoUrl = '../../../../../assets/img/driver.png';
  status = null;
  listLicenseTypes = [];
  issuingStateList = [];
  selectedDrivingLisenceType = [];
  vehicleTypeName = null;
  driverDetailsHistory = null;
  mainCountryList: any[] = [];
  selectedCountryName = null;
  selectedPerCountryName = null;
  fieldName = null;
  countryListPer = [];
  countryList = [];
  regionListDynamicPer = [];
  regionListDynamicPre = [];

  commissionSettings = [];
  commissionDetails = [];

  countryCode = null;
  selectedPerStateName = null;
  selectedPreStateName = null;
  checkBoxStatus = false;
  licenseTypeError = false;
  loading = false;
  selectControlName = null;
  routeStatus = null

  public searchControl: FormControl;

  map = { lat: 22.5735175, lng: 88.43757029999999 };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('fileInput') fileInput: any;

  documentSelectArray = [
    {
      name: 'Present Address Proof',
      value: 'pre_address_proof_file_url',
      disable: false,
    },
    {
      name: 'Permanent Address Proof',
      value: 'per_address_proof_file_url',
      disable: false,
    },
    {
      name: 'Proof of Identity (Front Page)',
      value: 'proof_of_identity_photo_url',
      disable: false,
    },
    {
      name: 'Proof of Identity (Back Page)',
      value: 'proof_of_identity_backpage_url',
      disable: false,
    },
    {
      name: 'Pan Card Document',
      value: 'pan_card_photo_url',
      disable: false,
    },
    {
      name: 'Police Verification Certificate',
      value: 'police_verification_certificate_url',
      disable: false,
    },
    {
      name: 'Qualification Document',
      value: 'highest_qualification_certificate_url',
      disable: false,
    },
    {
      name: 'Pass Book Copy',
      value: 'pass_book_copy_url',
      disable: false,
    },
    {
      name: 'Driving Licence Front Page',
      value: 'driving_license_front_page_url',
      disable: true,
    },
    {
      name: 'Driving Licence Back Page',
      value: 'driving_license_back_page_url',
      disable: true,
    },
    {
      name: 'Vehicle Insurance Copy',
      value: 'vehicle_insurance_copy_url',
      disable: true,
    },
  ];

  constructor(

    private store: Store<any>,
    public _fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog, private route: ActivatedRoute,
    public apiService: ApiMessageService,
    private _snackBar: MatSnackBar,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private apiMsgService: ApiMessageService,
  ) {
    this.id = this.route.snapshot.params.id;
    this.routeStatus = this.route.snapshot.params.routeStatus;
    this.store.dispatch(new ListSearchDECommissionSettings({}));
    this.store.dispatch(new GetDeliveryBoyDetails({ id: this.route.snapshot.params.id }));
    this.store.dispatch(new GetDeliveryBoyLiceseTypes());
    this.store.dispatch(new GetDrivingLissuingState());

  }

  openDocument(controlName) {
    window.open(this.driverDetailsForm.get(controlName).value, '_blank');
  }

  markerDragEnd(map, event) {
    console.log('Map, Events', map, event);
    this.map = { lat: +event.coords.lat, lng: +event.coords.lng };
    this.driverDetailsForm.get('base_point_lat').setValue(+event.coords.lat);
    this.driverDetailsForm.get('base_point_long').setValue(+event.coords.lng);
  }
  ngOnInit() {
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.commissionSettingsListSearch) {
          console.log(res.commissionSettingsListSearch);
          this.commissionSettings = res.commissionSettingsListSearch;
        }
      });

    this.mainCountryList = this.route.snapshot.data.countryList;
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
        componentRestrictions: { country: 'in' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.map = { lat: +place.geometry.location.lat(), lng: +place.geometry.location.lng() };
          this.driverDetailsForm.get('base_point_lat').setValue(+place.geometry.location.lat());
          this.driverDetailsForm.get('base_point_long').setValue(+place.geometry.location.lng());
        });
      });
    });
    // this.store.dispatch(new GetAllDeliveryRequest({ pageNo: this.pageNo, requestBody:null}));
    this.driverDetailsForm = this._fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      photo_url: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      dob: ['', Validators.required],
      gender: ['MALE', Validators.required],
      status: ['', Validators.required],
      register_as: ['', Validators.required],
      delivery_agent_commision_setting_id: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      // Working Details
      driving_license_number: ['', [, Validators.pattern('^([a-zA-Z]){2}[0-9]{13}$')]],
      driving_licence_state: ['',],
      driving_license_front_page_url: ['',],
      driving_license_back_page_url: ['',],
      // driving_license_type:  this._fb.array([this.createLType()]),
      driving_license_type: ['',],
      driving_license_validity: ['',],

      pan_card_number: ['', [Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')]],
      pan_card_photo_url: ['',],
      police_verification_certificate_url: ['',],
      highest_qualification: ['',],
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
      pre_lat: [''],
      pre_long: [''],

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
      per_lat: ['',],
      per_long: [''],

      // operational
      base_point_lat: [, Validators.required],
      base_point_long: [, Validators.required],
      max_buffer_distance: ['', Validators.required],

      // Vehicle
      vehicle_model_name: [''],
      vehicle_model_year: [''],
      vehicle_plate_number: [''], // [Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')] vehicle plat number 29 sept
      vehicle_insurance_copy_url: [''],

      // Bank
      bank_name: [''],
      account_holder_name: [''],
      account_number: [''],
      ifsc_code: [''],
      pass_book_copy_url: [''],
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      if (res && res['deliveryBoyDetails']) {
        this.driverDetails = res.deliveryBoyDetails;
        this.driverDetailsHistory = res.deliveryBoyDetails.delivery_boy_status_histories;
        console.log('driverDetails -->', this.driverDetails);
        // this.driverDetailsForm.get('id').setValue(this.driverDetails.delivery_boy.id);
        this.driverDetailsForm.get('name').setValue(this.driverDetails.delivery_boy.name);
        this.driverDetailsForm.get('photo_url').setValue(this.driverDetails.delivery_boy.photo_url ? this.driverDetails.delivery_boy.photo_url + '?h=50&w=50' : this.photoUrl + '?h=50&w=50');
        this.driverDetailsForm.get('phone').setValue(this.driverDetails.delivery_boy.phone);


        this.driverDetailsForm.get('email').setValue(this.driverDetails.delivery_boy.email);
        this.driverDetailsForm.get('status').setValue(this.driverDetails.delivery_boy.status);
        this.driverDetailsForm.get('register_as').setValue(this.driverDetails.delivery_boy.register_as);

        if (this.driverDetails.delivery_boy.dob && moment(new Date()).diff(moment(this.driverDetails.delivery_boy.dob, 'DD/MM/YYYY'), 'years') >= 18) {
          this.driverDetailsForm.get('dob').setValue(moment(this.driverDetails.delivery_boy.dob, 'DD/MM/YYYY'));
          // this.driverDetailsForm.get('dob').setValue(this.driverDetails.delivery_boy.dob)
        } else {
          this.driverDetailsForm.get('dob').setValue(moment(this.driverDetails.delivery_boy.dob, 'DD/MM/YYYY'));
          // this.driverDetailsForm.get('dob').setValue(this.driverDetails.delivery_boy.dob)
          this.driverDetailsForm.get('dob').setErrors({ pattern: true });
          this.driverDetailsForm.get('dob').markAsTouched();
        }
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('gender').setValue(this.driverDetails.delivery_boy.gender ? this.driverDetails.delivery_boy.gender : 'MALE');
        this.driverDetailsForm.get('vehicle_type').setValue(this.driverDetails.delivery_boy.vehicle_type);
        this.driverDetailsForm.get('delivery_agent_commision_setting_id').setValue(this.driverDetails.delivery_boy.delivery_agent_commision_setting_id);
        this.setCommissionDetails();
        this.driverDetailsForm.get('driving_license_number').setValue(this.driverDetails.delivery_boy.driving_license_number);
        this.driverDetailsForm.get('driving_licence_state').setValue(this.driverDetails.delivery_boy.driving_licence_state);
        this.driverDetailsForm.get('pan_card_photo_url').setValue(this.driverDetails.delivery_boy.pan_card_photo_url);
        this.driverDetailsForm.get('pan_card_number').setValue(this.driverDetails.delivery_boy.pan_card_number);
        // tslint:disable-next-line: max-line-length

        if (this.driverDetails.marketplace_driving_license_detail != null) {
          this.driverDetailsForm.get('driving_license_type').setValue(this.driverDetails.marketplace_driving_license_detail.details);
        } else {
          this.driverDetailsForm.get('driving_license_type').setValue('');
        }
        // tslint:disable-next-line: max-line-length
        if (this.driverDetails.delivery_boy.dob.includes('-')) {
          this.driverDetailsForm.get('driving_license_validity').setValue((new Date(this.driverDetails.delivery_boy.driving_license_validity)));
        } else {
          this.driverDetailsForm.get('driving_license_validity').setValue(moment(this.driverDetails.delivery_boy.driving_license_validity, 'DD/MM/YYYY').toDate());
        }
        this.driverDetailsForm.get('driving_license_back_page_url').setValue(this.driverDetails.delivery_boy.driving_license_back_page_url);
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('driving_license_front_page_url').setValue(this.driverDetails.delivery_boy.driving_license_front_page_url);
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('police_verification_certificate_url').setValue(this.driverDetails.delivery_boy.police_verification_certificate_url);
        this.driverDetailsForm.get('highest_qualification').setValue(this.driverDetails.delivery_boy.highest_qualification);
        this.driverDetailsForm.get('proof_of_identity_photo_url').setValue(this.driverDetails.delivery_boy.proof_of_identity_photo_url);
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('proof_of_identity_backpage_url').setValue(this.driverDetails.delivery_boy.proof_of_identity_backpage_url);
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('highest_qualification_certificate_url').setValue(this.driverDetails.delivery_boy.highest_qualification_certificate_url);

        // Present Address
        this.driverDetailsForm.get('pre_address1').setValue(this.driverDetails.present_address.address1);
        this.driverDetailsForm.get('pre_address2').setValue(this.driverDetails.present_address.address2);
        this.driverDetailsForm.get('pre_address_proof_file_url').setValue(this.driverDetails.delivery_boy.proof_of_present_addess_photo_url);
        this.driverDetailsForm.get('pre_address_type').setValue(this.driverDetails.present_address.address_type);
        this.driverDetailsForm.get('pre_city').setValue(this.driverDetails.present_address.city);
        this.driverDetailsForm.get('pre_zipcode').setValue(this.driverDetails.present_address.zipcode);
        this.driverDetailsForm.get('pre_country_code').setValue(this.driverDetails.present_address.country_code);
        this.driverDetailsForm.get('pre_state_name').setValue(this.driverDetails.present_address.state_name);
        this.driverDetailsForm.get('pre_country_name').setValue(this.driverDetails.present_address.country_name);

        this.setCountryPayload(this.driverDetails.present_address.country_name, 'pre_country_name');
        // this.driverDetailsForm.get('pre_country_name').setValue(this.mainCountryList && this.mainCountryList[this.mainCountryList && this.mainCountryList.map(val => val['countryName']).indexOf(this.driverDetails.present_address.country_name)]);
        this.driverDetailsForm.get('pre_lat').setValue(this.driverDetails.present_address.lat);
        this.driverDetailsForm.get('pre_long').setValue(this.driverDetails.present_address.long);

        // Permanent Address
        this.driverDetailsForm.get('per_address1').setValue(this.driverDetails.permanent_address.address1);
        this.driverDetailsForm.get('per_address2').setValue(this.driverDetails.permanent_address.address2);
        this.driverDetailsForm.get('per_address_proof_file_url').setValue(this.driverDetails.delivery_boy.proof_of_permanent_address_photo_url);
        this.driverDetailsForm.get('per_address_type').setValue(this.driverDetails.permanent_address.address_type);
        this.driverDetailsForm.get('per_city').setValue(this.driverDetails.permanent_address.city);
        this.driverDetailsForm.get('per_zipcode').setValue(this.driverDetails.permanent_address.zipcode);
        this.driverDetailsForm.get('per_country_code').setValue(this.driverDetails.permanent_address.country_code);
        this.driverDetailsForm.get('per_state_name').setValue(this.driverDetails.permanent_address.state_name);
        this.driverDetailsForm.get('per_country_name').setValue(this.driverDetails.permanent_address.country_name);
        this.driverDetailsForm.get('per_lat').setValue(this.driverDetails.permanent_address.lat);
        this.driverDetailsForm.get('per_long').setValue(this.driverDetails.permanent_address.long);

        this.setCountryPayload(this.driverDetails.permanent_address.country_name, 'per_country_name');

        // opeartional
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('base_point_lat').setValue(this.driverDetails.delivery_boy_area_of_operation && this.driverDetails.delivery_boy_area_of_operation.base_point_lat
          ? +this.driverDetails.delivery_boy_area_of_operation.base_point_lat : this.map.lat);
        // tslint:disable-next-line: max-line-length
        this.driverDetailsForm.get('base_point_long').setValue(this.driverDetails.delivery_boy_area_of_operation && this.driverDetails.delivery_boy_area_of_operation.base_point_long
          ? +this.driverDetails.delivery_boy_area_of_operation.base_point_long : this.map.lng);
        this.driverDetailsForm.get('max_buffer_distance').setValue(this.driverDetails.delivery_boy_area_of_operation ? this.driverDetails.delivery_boy_area_of_operation.max_buffer_distance : '');
        // this.map = { lat: this.driverDetails.delivery_boy_area_of_operation && this.driverDetails.delivery_boy_area_of_operation.base_point_lat, lng: this.driverDetails.delivery_boy_area_of_operation && this.driverDetails.delivery_boy_area_of_operation.base_point_long };

        // Vehicle
        this.driverDetailsForm.get('vehicle_model_name').setValue(this.driverDetails.delivery_boy.vehicle_model_name);
        this.driverDetailsForm.get('vehicle_model_year').setValue(this.driverDetails.delivery_boy.vehicle_model_year);
        this.driverDetailsForm.get('vehicle_plate_number').setValue(this.driverDetails.delivery_boy.vehicle_plate_number);
        this.driverDetailsForm.get('vehicle_insurance_copy_url').setValue(this.driverDetails.delivery_boy.vehicle_insurance_copy_url);

        // Bank Details
        this.driverDetailsForm.get('bank_name').setValue(this.driverDetails.delivery_boy.bank_name);
        this.driverDetailsForm.get('account_holder_name').setValue(this.driverDetails.delivery_boy.account_holder_name);
        this.driverDetailsForm.get('account_number').setValue(this.driverDetails.delivery_boy.account_number);
        this.driverDetailsForm.get('ifsc_code').setValue(this.driverDetails.delivery_boy.ifsc_code);
        this.driverDetailsForm.get('pass_book_copy_url').setValue(this.driverDetails.delivery_boy.pass_book_copy_url);
        // tslint:disable-next-line: max-line-length
        this.map = {
          lat: this.driverDetails.delivery_boy_area_of_operation &&
            +this.driverDetails.delivery_boy_area_of_operation.base_point_lat ? +this.driverDetails.delivery_boy_area_of_operation.base_point_lat : +this.map.lat,
          lng: this.driverDetails.delivery_boy_area_of_operation &&
            +this.driverDetails.delivery_boy_area_of_operation.base_point_long ? +this.driverDetails.delivery_boy_area_of_operation.base_point_long : +this.map.lng
        };
        // this.photoUrl = this.driverDetails.delivery_boy.photo_url ? this.driverDetails.delivery_boy.photo_url : this.photoUrl;
        this.photoUrl = this.driverDetails.delivery_boy.photo_url ? this.driverDetails.delivery_boy.photo_url + '?h=50&w=50' : this.photoUrl + '?h=50&w=50';
        this.status = this.driverDetails.delivery_boy.status;
        // tslint:disable-next-line: max-line-length
        this.vehicleTypeName = this.vehicleTypeChecking(this.driverDetails.delivery_boy.vehicle_type);
        this.selectedDrivingLisenceType = this.driverDetails.marketplace_driving_license_detail ? this.driverDetails.marketplace_driving_license_detail.details.map(dl => dl.id) : [];

        if (this.driverDetailsForm.get('status').value === 'APPROVED') {

          this.driverDetailsForm.get('phone').disable();
        }

        this.vehicleType(this.driverDetailsForm.get('vehicle_type').value);
        this.documentChangeDisableType();
        this.setDocumentDisableState();

      }

      if (res && res.deliveryBoyLisenseTypes) {
        this.listLicenseTypes = res.deliveryBoyLisenseTypes.driving_licens_types;
      }
      if (res && res.drivingIssuingState) {
        this.issuingStateList = res.drivingIssuingState;
      }

    });


  }
  CloseWindow() {
    window.open('', '_parent', '');
    window.close();
  }

  changeCommission(e) {
    this.commissionDetails = this.commissionSettings.filter(item => item.id === e);
    // console.log('Commission', e, this.commissionDetails)
  }

  selectRegionByCountry(e) {
    console.log('country countryFilterCtrl', this.countryFilterCtrl.value);
    console.log('country e value ==>', e);
    this.fieldName = e.source.ngControl.name;
    if (e.source.ngControl.name == 'per_country_name') {
      this.regionListDynamicPer = [];
      this.statePerFilterCtrl.reset();
      this.driverDetailsForm.get('per_state_name').reset();
    } else if (e.source.ngControl.name == 'pre_country_name') {
      this.regionListDynamicPre = [];
      this.statePreFilterCtrl.reset();
      this.driverDetailsForm.get('pre_state_name').reset();
    }
    this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: e.value.countryCode }));
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.regionByCountryCodeDynamic) {
          if (this.fieldName == 'per_country_name') {
            this.regionListDynamicPer = res.regionByCountryCodeDynamic;
          } else if (this.fieldName == 'pre_country_name') {
            this.regionListDynamicPre = res.regionByCountryCodeDynamic;
          }
          res.regionByCountryCodeDynamic = null;
        }
      });
    if (this.fieldName == 'per_country_name') {
      console.log('Set permanetn address country::::::;', this.selectedPerCountryName);
      this.driverDetailsForm.get('per_country_name').setValue(this.selectedPerCountryName);
      this.driverDetailsForm.get('per_country_code').setValue(e.value.countryCode);
    } else if (this.fieldName == 'pre_country_name') {
      console.log('Set present address country::::::;', this.selectedCountryName);
      this.driverDetailsForm.get('pre_country_name').setValue(this.selectedCountryName);
      this.driverDetailsForm.get('pre_country_code').setValue(e.value.countryCode);
    }
    console.log('pre_country_name now', this.driverDetailsForm.get('pre_country_name'));
    console.log('pre_country_code now', this.driverDetailsForm.get('pre_country_code'));
  }

  goBackButton() {
    console.log('goBackButton url', this.router.url);
    let strURL = this.router.url;
    const strlength = strURL.split('/', 3).join('/').length;
    strURL = strURL.substring(0, strlength);

    if (this.routeStatus) {
      this.router.navigate([strURL], { queryParams: { routeStatus: this.routeStatus } });
    } else {
      this.router.navigate([strURL]);
    }
  }
  updateDriver(status) {
    // tslint:disable-next-line: max-line-length
    console.log('FORM VALID', this.driverDetailsForm.valid, this.driverDetailsForm.status, this.driverDetailsForm.errors, this.driverDetailsForm.controls, this.driverDetailsForm.value);
    if (status === 'REJECTED') {
      this.dialog.open(DriverDetailsApproveRejectPopupComponent, {
        width: '550px',
        data: { payload: { name: 'REJECT' } },
      }).afterClosed().subscribe(result => {
        if (result) {
          // console.log('Result', this.driverDetailsForm.value)
          this.store.dispatch(new ApproveRejectDriverDetails(this.updateRejectPayload(status), this.id));
          this.apiService.currentApiStatus.subscribe(details => {
            if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
              this.goBackButton();
              // this.router.navigate(['merchant/delivery-boys'])
            }
          });
        }
      });
    }
    else if (status === 'HOLD') {
      this.dialog.open(DriverDetailsApproveRejectPopupComponent, {
        width: '550px',
        data: { payload: { name: 'HOLD' } },
      }).afterClosed().subscribe(result => {
        if (result) {
          // console.log('Result', this.driverDetailsForm.value)
          this.store.dispatch(new ApproveRejectDriverDetails(this.updateRejectPayload(status), this.id));
          this.apiService.currentApiStatus.subscribe(details => {
            if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
              this.goBackButton();
              // this.router.navigate(['merchant/delivery-boys'])
            }
          });
        }
      });
    }
    else if (status === 'TRAINING') {
      const dialogRef = this.dialog.open(AssignTrainingPopupComponent, {
        minHeight: '500px',
        width: '600px',
        panelClass: 'training-modal',
        disableClose: true,
        data: {
          bulkOperationList: [parseInt(this.id)],
          type: 'NEW-SCHEDULE'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.apiMsgService.currentApiStatus.subscribe((response) => {
          let res: any = response.status;
          if (res && response.type == ActionTypes.assignTrainingToDeliveryBoy) {
            this.goBackButton()
          }
        })
      })
    }
    else {
      this.markFormGroupTouched(this.driverDetailsForm);
      this.getFormValidationErrors()
      if (this.driverDetailsForm.valid) {
        this.dialog.open(DriverDetailsApproveRejectPopupComponent, {
          width: '550px',
          data: { payload: { name: status } },
        }).afterClosed().subscribe(result => {
          if (result) {
            console.log('APPROVE BODY', this.updatePayload(status));
            this.store.dispatch(new ApproveRejectDriverDetails(this.updatePayload(status), this.id));
            this.apiService.currentApiStatus.subscribe(details => {
              if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
                this.goBackButton();
                // this.router.navigate(['merchant/delivery-boys'])
              }
            });
          }
        });
      }
    }
  }

  getFormValidationErrors() {
    Object.keys(this.driverDetailsForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.driverDetailsForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  updateDriverProfile() {
    this.markFormGroupTouched(this.driverDetailsForm);
    console.log('Update', this.driverDetailsForm.value);
    console.log('Update validation', this.driverDetailsForm.valid);
    if (this.driverDetailsForm.valid) {
      // console.log('aafter valid check inside updateDriverProfile()');
      const payload = this.updatePayload(this.status);
      // delete payload.marketplace_delivery_boy.status;
      console.log('Result', payload);
      this.store.dispatch(new ApproveRejectDriverDetails(this.updatePayload(this.driverDetailsForm.get('status').value), this.id));
      this.apiService.currentApiStatus.subscribe(details => {
        if (details.type === 'APPROVE_REJECT_DRIVER_DETAILS') {
          this.goBackButton();
          // this.router.navigate(['delivery-boy/approved-delivery-boy']);
          // this.router.navigate(['merchant/delivery-boys'])
        }
      });

    }
  }

  sameAsPresent(completed: boolean) {
    this.checkBoxStatus = completed;

    const e = {
      source: {
        ngControl: {
          name: 'per_country_name'
        }
      },
      value: {
        countryCode: this.driverDetailsForm.get('pre_country_code').value
      }
    };
    if (completed) {
      this.driverDetailsForm.get('per_address1').setValue(this.driverDetailsForm.get('pre_address1').value);
      this.driverDetailsForm.get('per_address2').setValue(this.driverDetailsForm.get('pre_address2').value);
      this.driverDetailsForm.get('per_address_type').setValue(this.driverDetailsForm.get('pre_address_type').value);
      this.driverDetailsForm.get('per_city').setValue(this.driverDetailsForm.get('pre_city').value);
      this.driverDetailsForm.get('per_zipcode').setValue(this.driverDetailsForm.get('pre_zipcode').value);

      this.driverDetailsForm.get('per_country_name').setValue(this.driverDetailsForm.get('pre_country_name').value);
      this.selectedPerCountryName = this.driverDetailsForm.get('pre_country_name').value;
      this.selectRegionByCountry(e);
      this.driverDetailsForm.get('per_country_code').setValue(this.driverDetailsForm.get('pre_country_code').value);
      this.driverDetailsForm.get('per_state_name').setValue(this.driverDetailsForm.get('pre_state_name').value);
      this.driverDetailsForm.get('per_address_proof_file_url').setValue(this.driverDetailsForm.get('pre_address_proof_file_url').value);
      this.selectedPerStateName = this.driverDetailsForm.get('pre_state_name').value;


    } else {
      this.driverDetailsForm.get('per_address1').setValue('');
      this.driverDetailsForm.get('per_address2').setValue('');
      this.driverDetailsForm.get('per_address_type').setValue('');
      this.driverDetailsForm.get('per_city').setValue('');
      this.driverDetailsForm.get('per_zipcode').setValue('');
      this.driverDetailsForm.get('per_state_name').setValue('');
      this.driverDetailsForm.get('per_country_name').setValue('');
      this.driverDetailsForm.get('per_country_code').setValue('');
      this.driverDetailsForm.get('per_address_proof_file_url').setValue('');
    }
  }

  goToDriverDetails() {
    console.log('Route in driver details', this.router.url + '/driver-details', this.id);
    console.log('Case in driver details', this.router.url.substring(this.router.url.lastIndexOf('/') + 1, this.router.url.length));
    const caseExpressionURL = this.router.url.substring(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    switch (caseExpressionURL) {
      case 'approved-delivery-boy': {
        this.router.navigate([this.router.url + '/driver-details', this.id]);
        break;
      }
      case 'inactive-delivery-boy': {
        this.router.navigate([this.router.url + '/driver-details', this.id]);
        break;
      }
      case 'pending-delivery-boy': {
        this.router.navigate([this.router.url + '/driver-details', this.id]);
        break;
      }
      default: {
        this.router.navigate(['/delivery-boy/driver-details', this.id]);
        break;
      }
    }
    // if (this.params.onActionBtnClick instanceof Function) {

    //   this._route.navigate(['/delivery-boy/driver-details', this.params.data.id])
    // }
  }
  vehicleType(value) {
    this.vehicleTypeName = this.vehicleTypeChecking(value);

    console.log('Vehicle Type', value, this.vehicleTypeName);
    if (value == 'eRiksa' || value == 'Bicycle') {

      this.driverDetailsForm.get('driving_license_number').setValue('');
      this.driverDetailsForm.get('driving_license_validity').setValue('');
      this.driverDetailsForm.get('driving_licence_state').setValue('');
      this.driverDetailsForm.get('driving_license_back_page_url').setValue('');
      this.driverDetailsForm.get('driving_license_front_page_url').setValue('');

      this.driverDetailsForm.get('driving_license_number').clearValidators();
      this.driverDetailsForm.get('driving_license_number').disable();

      this.driverDetailsForm.get('driving_licence_state').clearValidators();
      this.driverDetailsForm.get('driving_licence_state').disable();


      this.driverDetailsForm.get('driving_license_type').clearValidators();
      this.driverDetailsForm.get('driving_license_type').disable();


      this.driverDetailsForm.get('driving_license_validity').clearValidators();
      this.driverDetailsForm.get('driving_license_validity').disable();


      this.driverDetailsForm.get('driving_license_back_page_url').clearValidators();
      this.driverDetailsForm.get('driving_license_back_page_url').disable();


      this.driverDetailsForm.get('driving_license_front_page_url').clearValidators();
      this.driverDetailsForm.get('driving_license_front_page_url').disable();


      // this.driverDetailsForm.get('vehicle_model_name').clearValidators()
      // this.driverDetailsForm.get('vehicle_model_year').clearValidators()
      // this.driverDetailsForm.get('vehicle_plate_number').clearValidators()
      // this.driverDetailsForm.get('vehicle_insurance_copy_url').clearValidators()

      this.commissionDetails = this.commissionSettings.filter(function (item) {
        return item.id == 2;
      });
      this.driverDetailsForm.get('delivery_agent_commision_setting_id').setValue(2);
      this.driverDetailsForm.updateValueAndValidity();
      const indexFront = this.documentSelectArray.findIndex(item => item.value === 'driving_license_front_page_url');
      this.documentSelectArray[indexFront].disable = true;
      const indexBack = this.documentSelectArray.findIndex(item => item.value === 'driving_license_back_page_url');
      this.documentSelectArray[indexBack].disable = true;
      const indexInsuranceBack = this.documentSelectArray.findIndex(item => item.value === 'vehicle_insurance_copy_url');
      this.documentSelectArray[indexInsuranceBack].disable = true;
    } else {

      console.log('ELSE Value', this.driverDetailsForm.get('driving_license_back_page_url').errors);

      if (value === 'Two Wheeler') {
        this.commissionDetails = this.commissionSettings.filter(function (item) {
          return item.id == 1;
        });

        this.driverDetailsForm.get('delivery_agent_commision_setting_id').setValue(1);
      } else if (value === 'Four Wheeler') {
        this.commissionDetails = this.commissionSettings.filter(function (item) {
          return item.id == 3;
        });
        this.driverDetailsForm.get('delivery_agent_commision_setting_id').setValue(3);
      }

      this.driverDetailsForm.get('driving_license_number').setValue(this.driverDetails.delivery_boy.driving_license_number);
      this.driverDetailsForm.get('driving_license_validity').setValue(moment(this.driverDetails.delivery_boy.driving_license_validity, 'DD/MM/YYYY').toDate());
      this.driverDetailsForm.get('driving_licence_state').setValue(this.driverDetails.delivery_boy.driving_licence_state);
      this.driverDetailsForm.get('driving_license_back_page_url').setValue(this.driverDetails.delivery_boy.driving_license_back_page_url);
      this.driverDetailsForm.get('driving_license_front_page_url').setValue(this.driverDetails.delivery_boy.driving_license_front_page_url);

      // if (!Boolean(this.driverDetailsForm.get('driving_license_number').value)) {
      // }
      this.driverDetailsForm.get('driving_license_number').setValidators([Validators.required, Validators.pattern('^([a-zA-Z]){2}[0-9]{13}$')]);
      // this.driverDetailsForm.get('driving_license_number').markAsTouched();
      this.driverDetailsForm.get('driving_license_number').enable();


      // // tslint:disable-next-line: max-line-length
      this.driverDetailsForm.get('driving_licence_state').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_licence_state').enable();


      this.driverDetailsForm.get('driving_license_type').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_type').enable();


      this.driverDetailsForm.get('driving_license_validity').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_validity').enable();


      // this.driverDetailsForm.get('driving_license_back_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_back_page_url').enable();


      // this.driverDetailsForm.get('driving_license_front_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_front_page_url').enable();
      this.driverDetailsForm.updateValueAndValidity();
      console.log('Else', this.driverDetailsForm.errors);
      const indexFront = this.documentSelectArray.findIndex(item => item.value === 'driving_license_front_page_url');
      this.documentSelectArray[indexFront].disable = false;
      const indexBack = this.documentSelectArray.findIndex(item => item.value === 'driving_license_back_page_url');
      this.documentSelectArray[indexBack].disable = false;
      const indexInsuranceBack = this.documentSelectArray.findIndex(item => item.value === 'vehicle_insurance_copy_url');
      this.documentSelectArray[indexInsuranceBack].disable = false;
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

  setCountryPayload(value, controlName) {
    const indexValue = this.mainCountryList.map(val => val.countryName).indexOf(value);

    if (indexValue !== null) {
      this.driverDetailsForm.get(controlName).setValue(this.mainCountryList[indexValue]);

      // console.log('Country ==========', this.driverDetailsForm.get(controlName).value)
      this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: this.mainCountryList[indexValue].countryCode }));
      this.store
        .pipe(select('deliveryBoyManagement'))
        .subscribe(res => {
          if (res.regionByCountryCodeDynamic) {
            controlName === 'per_country_name' ? this.regionListDynamicPer = res.regionByCountryCodeDynamic :
              this.regionListDynamicPre = res.regionByCountryCodeDynamic;
          }
        });
    }

  }

  setCommissionDetails() {
    const id = this.driverDetailsForm.get('delivery_agent_commision_setting_id').value;
    this.commissionDetails = this.commissionSettings.filter(function (item) {
      return item.id == id;
    });
  }

  vehicleTypeValidity(value) {
    this.vehicleTypeName = this.vehicleTypeChecking(value);

    console.log('Vehicle Type', value, this.vehicleTypeName);
    if (!this.vehicleTypeName) {
      this.driverDetailsForm.get('driving_license_number').clearValidators();

      this.driverDetailsForm.get('driving_licence_state').clearValidators();


      this.driverDetailsForm.get('driving_license_type').clearValidators();


      this.driverDetailsForm.get('driving_license_validity').clearValidators();
      this.driverDetailsForm.get('driving_license_validity').setValue('');


      this.driverDetailsForm.get('driving_license_back_page_url').clearValidators();


      this.driverDetailsForm.get('driving_license_front_page_url').clearValidators();


      // this.driverDetailsForm.get('vehicle_model_name').clearValidators()
      // this.driverDetailsForm.get('vehicle_model_year').clearValidators()
      // this.driverDetailsForm.get('vehicle_plate_number').clearValidators()
      // this.driverDetailsForm.get('vehicle_insurance_copy_url').clearValidators()
      this.driverDetailsForm.updateValueAndValidity();
    } else {
      this.driverDetailsForm.get('driving_license_number').setErrors({ required: true });


      this.driverDetailsForm.get('driving_licence_state').setErrors({ required: true });


      this.driverDetailsForm.get('driving_license_type').setErrors({ required: true });


      this.driverDetailsForm.get('driving_license_validity').setErrors({ required: true });


      this.driverDetailsForm.get('driving_license_back_page_url').setErrors({ required: true });


      this.driverDetailsForm.get('driving_license_front_page_url').setErrors({ required: true });


      this.driverDetailsForm.updateValueAndValidity();
    }
  }

  licenseTypeChange(e) {
    console.log('licenseTypeChange////', e);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  selectDocumentToUpload(e) {
    console.log('E', e);
    this.selectControlName = e;
  }

  onSelectFileNew(event) {
    const controlName = this.selectControlName;
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0].name;
      const filetype = event.target.files[0].type.split('/')[1];
      const applicationtype = event.target.files[0].type;
      const acceptedFileType = ['jpeg', 'jpg', 'png', 'pdf'];

      if (acceptedFileType.indexOf(filetype) == -1) {
        this._snackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 });
      } else {
        console.log('FILETYPE', filetype);
        if (filetype !== 'pdf') {
          this.doImageCrop(event, controlName);
        } else {
          this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, controlName);
        }

      }
    }
  }


  dobDateFilter(dob) {
    return moment(new Date()).diff(moment(dob, 'DD/MM/YYYY'), 'years') >= 18;
  }

  onSelectFile(event, controlName) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0].name;
      const filetype = event.target.files[0].type.split('/')[1];
      const applicationtype = event.target.files[0].type;
      const acceptedFileType = ['jpeg', 'jpg', 'png', 'pdf'];

      if (acceptedFileType.indexOf(filetype) == -1) {
        this._snackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 });
      } else {
        if (filetype !== 'pdf') {
          this.doImageCrop(event, controlName);
        } else {
          this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, controlName);
        }
      }
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
        this.loading = true;
        const { newfile, filename, filetype, applicationtype, uploadFor } = result;
        console.log('RESULT', result);
        this.uploadFileToAws(newfile, filename, filetype, applicationtype, uploadFor, );
      }
    });
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, controlName) {
    this.loading = true;
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, '_');
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype });

    this.store.dispatch(new UploadImageToAws({ file, folderName: 'asset/delivery_boy_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res.awsImgUpload) {

        console.log('IMAGE LOCATION', controlName, res.awsImgUpload.Location);
        this.driverDetailsForm.get(controlName).setValue(res.awsImgUpload.Location);

        if (controlName == 'photo_url') {
          this.photoUrl = res.awsImgUpload.Location;
        } else {
          const index = this.documentSelectArray.findIndex(item => item.value === controlName);
          this.documentSelectArray[index].disable = true;
        }

        this.fileInput.nativeElement.value = '';
        this.fileUploadSubscription.unsubscribe();
        this.loading = false;
        //// ----- SAVE IMAGE DONE ----/////////
      }
    });
  }

  historyModalOpen() {
    const dialogRef = this.dialog.open(DriverDetailsHistoryModalComponent, {
      // width: '500px',
      data: this.driverDetailsHistory
    });
  }
  deleteFile(controlName) {

    if (controlName == 'photo_url') {
      this.driverDetailsForm.get(controlName).setValue(this.defaultPhotoUrl);
      this.photoUrl = this.defaultPhotoUrl;
    } else {
      this.driverDetailsForm.get(controlName).setValue('');
      const index = this.documentSelectArray.findIndex(item => item.value === controlName);
      this.documentSelectArray[index].disable = false;
    }


  }
  deleteFileOpenModal(controlName) {
    const dialogRef = this.dialog.open(PopupForDeleteComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.close) {
          this.deleteFile(controlName);
        }
      }
    });
  }


  changeVal(e) {
    console.log('E', e.value);
    this.driverDetailsForm.get('driving_license_type').setValue(e.value);
  }

  documentChangeDisableType() {
    const vehicle_type = this.driverDetailsForm.get('vehicle_type').value;

    if (vehicle_type === 'eRiksa' || vehicle_type === 'Bicycle') {
      const indexFront = this.documentSelectArray.findIndex(item => item.value === 'driving_license_front_page_url');
      this.documentSelectArray[indexFront].disable = true;
      const indexBack = this.documentSelectArray.findIndex(item => item.value === 'driving_license_back_page_url');
      this.documentSelectArray[indexBack].disable = true;
      const indexInsuranceBack = this.documentSelectArray.findIndex(item => item.value === 'vehicle_insurance_copy_url');
      this.documentSelectArray[indexInsuranceBack].disable = true;
    } else {
      const indexFront = this.documentSelectArray.findIndex(item => item.value === 'driving_license_front_page_url');
      this.documentSelectArray[indexFront].disable = false;
      const indexBack = this.documentSelectArray.findIndex(item => item.value === 'driving_license_back_page_url');
      this.documentSelectArray[indexBack].disable = false;
      const indexInsuranceBack = this.documentSelectArray.findIndex(item => item.value === 'vehicle_insurance_copy_url');
      this.documentSelectArray[indexInsuranceBack].disable = false;
    }
  }

  setDocumentDisableState() {
    this.documentSelectArray.forEach((item, index) => {
      if (this.driverDetailsForm.get(item.value).value) {
        this.documentSelectArray[index].disable = true;
      } else {
        this.documentSelectArray[index].disable = false;
      }
    });
  }

  serialiseLicenseType(typeList, reverse = false) {
    console.log('seriali 1st', typeList);

    if (reverse) {
      const payload = [];
      if (Array.isArray(typeList)) {
        typeList.forEach(type => {
          payload.push({
            driving_license_vehicle_type_id: type.id,
            driving_license_vhicle_type: type.title
          });
        });
        console.log('seriali', payload);
        return payload;
      }
    } else {
      const payload = [];
      if (Array.isArray(typeList)) {
        typeList.forEach(type => {
          payload.push({
            id: type.driving_license_vehicle_type_id,
            title: type.driving_license_vhicle_type
          });
        });
        console.log('seriali', payload);
        return payload;
      }
    }
  }

  updatePayload(status) {
    const selectedDrivingLisences = [];
    const distrinctDrivingLisenceTypes = this.selectedDrivingLisenceType;
    this.listLicenseTypes.filter(dlType => {
      if (distrinctDrivingLisenceTypes.includes(dlType.id)) {
        selectedDrivingLisences.push(dlType);
      }
    });
    console.log('DOB::::', moment(this.driverDetailsForm.get('dob').value).format('DD/MM/YYYY').toString());
    return {
      marketplace_delivery_boy: {
        // id: this.driverDetailsForm.get('id').value,
        name: this.driverDetailsForm.get('name').value,
        phone: this.driverDetailsForm.get('phone').value,
        email: this.driverDetailsForm.get('email').value,
        photo_url: this.driverDetailsForm.get('photo_url').value,
        dob: moment(this.driverDetailsForm.get('dob').value).format('DD/MM/YYYY').toString(),
        register_as: this.driverDetailsForm.get('register_as').value,
        age: this.driverDetails.delivery_boy.age,
        status,

        vehicle_type: this.driverDetailsForm.get('vehicle_type').value,
        delivery_agent_commision_setting_id: this.driverDetailsForm.get('delivery_agent_commision_setting_id').value,
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
        driving_license_back_page_url: this.driverDetailsForm.get('driving_license_back_page_url').value,

        proof_of_address_type: this.driverDetails.delivery_boy.proof_of_address_type,
        proof_of_address_number: this.driverDetails.delivery_boy.proof_of_address_number,
        proof_of_address_photo_url: this.driverDetails.delivery_boy.proof_of_address_photo_url,

        proof_of_present_addess_photo_url: this.driverDetailsForm.get('pre_address_proof_file_url').value,
        proof_of_permanent_address_photo_url: this.driverDetailsForm.get('per_address_proof_file_url').value,



        vehicle_model_name: this.driverDetailsForm.get('vehicle_model_name').value,
        vehicle_model_year: this.driverDetailsForm.get('vehicle_model_year').value,
        vehicle_plate_number: this.driverDetailsForm.get('vehicle_plate_number').value,
        vehicle_insurance_copy_url: this.driverDetailsForm.get('vehicle_insurance_copy_url').value,

        bank_name: this.driverDetailsForm.get('bank_name').value,
        account_holder_name: this.driverDetailsForm.get('account_holder_name').value,
        account_number: this.driverDetailsForm.get('account_number').value,
        ifsc_code: this.driverDetailsForm.get('ifsc_code').value,
        pass_book_copy_url: this.driverDetailsForm.get('pass_book_copy_url').value,

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
        country_name: this.driverDetailsForm.get('per_country_name').value.countryName,
        country_code: this.driverDetailsForm.get('per_country_code').value,
        // address_proof_file_url: this.driverDetailsForm.get('per_address_proof_file_url').value
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
        country_name: this.driverDetailsForm.get('pre_country_name').value.countryName,
        country_code: this.driverDetailsForm.get('pre_country_code').value,
        // address_proof_file_url: this.driverDetailsForm.get('pre_address_proof_file_url').value
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
    };
  }


  updateRejectPayload(status) {
    const selectedDrivingLisences = [];
    const distrinctDrivingLisenceTypes = this.selectedDrivingLisenceType;
    this.listLicenseTypes.filter(dlType => {
      if (distrinctDrivingLisenceTypes.includes(dlType.id)) {
        selectedDrivingLisences.push(dlType);
      }
    });

    return {
      marketplace_delivery_boy: {
        id: this.driverDetails.delivery_boy.id,
        phone: this.driverDetails.delivery_boy.phone,
        email: this.driverDetails.delivery_boy.email,
        photo_url: this.driverDetails.delivery_boy.photo_url,
        dob: this.driverDetails.delivery_boy.dob,
        gender: this.driverDetails.delivery_boy.gender,
        age: this.driverDetails.delivery_boy.age,
        register_as: this.driverDetails.register_as,
        vehicle_type: this.driverDetails.delivery_boy.vehicle_type,
        delivery_agent_commision_setting_id: this.driverDetails.delivery_boy.delivery_agent_commision_setting_id,
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
        driving_license_back_page_url: this.driverDetails.delivery_boy.driving_license_back_page_url,

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
        pass_book_copy_url: this.driverDetails.delivery_boy.pass_book_copy_url,

        police_verification_certificate_url: this.driverDetails.delivery_boy.police_verification_certificate_url,
        highest_qualification: this.driverDetails.delivery_boy.highest_qualification,
        highest_qualification_certificate_url: this.driverDetails.delivery_boy.highest_qualification_certificate_url,
        status
      },
      permanent_address: {
        address1: this.driverDetails.permanent_address.address1,
        address2: this.driverDetails.permanent_address.address2,
        address_type: this.driverDetails.permanent_address.address_proof_type,
        city: this.driverDetails.permanent_address.city,
        zipcode: this.driverDetails.permanent_address.zipcode,
        // phone: this.driverDetails.permanent_address.phone,
        state_name: this.driverDetails.permanent_address.state_name,
        lat: this.driverDetails.permanent_address.lat,
        long: this.driverDetails.permanent_address.long,
        country_name: this.driverDetails.permanent_address.country_name,
        country_code: this.driverDetails.permanent_address.country_code,
        proof_of_permanent_address_photo_url: this.driverDetails.permanent_address.per_address_proof_file_url

      },
      present_address: {
        address1: this.driverDetails.present_address.address1,
        address2: this.driverDetails.present_address.address2,
        address_type: this.driverDetails.present_address.address_proof_type,
        city: this.driverDetails.present_address.city,
        zipcode: this.driverDetails.present_address.zipcode,
        state_name: this.driverDetails.present_address.state_name,
        lat: this.driverDetails.present_address.lat,
        long: this.driverDetails.present_address.long,
        country_name: this.driverDetails.present_address.country_name,
        country_code: this.driverDetails.present_address.country_code,
        proof_of_present_addess_photo_url: this.driverDetails.present_address.per_address_proof_file_url

      },
      marketplace_driving_license_detail: {
        // details: this.driverDetails.marketplace_driving_license_detail.details
        details: selectedDrivingLisences
      },
      driver_operational_area: {
        base_point_lat: this.driverDetails.delivery_boy.base_lat,
        base_point_long: this.driverDetails.delivery_boy.base_long,
        max_buffer_distance: this.driverDetails.delivery_boy.max_buffer_distance
      }
    };
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        // this.getPlacesfromCoordinate()
        console.log('Lat lng', this.map.lat, this.map.lng);
        this.driverDetailsForm.get('base_point_lat').setValue(this.map.lat);
        this.driverDetailsForm.get('base_point_long').setValue(this.map.lng);
      });
    }
  }

  ngOnDestroy() {
    this.driverDetailsForm.reset();
  }

}
