import { GetAllCountry, ListSearchDECommissionSettings } from './../../../../actions/delivery-boy-management.action';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MapsAPILoader } from '@agm/core';
import { GetDeliveryBoyLiceseTypes, GetDrivingLissuingState, } from 'src/app/actions/merchant-management.actions';
import * as moment from 'moment';
import { StoreImgUploadToAws, UploadImageToAws } from 'src/app/actions/img-upload-aws.action';
import { DeliveryBoyRegistration, GetRegionsByCountryCodeDynamic } from 'src/app/actions/delivery-boy-management.action';
import { PopupForDeleteComponent } from '../components/popup-for-delete/popup-for-delete.component';
import { ImageCropperPopupComponent } from '../../merchant-management/image-cropper-popup/image-cropper-popup.component';


@Component({
  selector: 'app-delivery-boy-registration',
  templateUrl: './delivery-boy-registration.component.html',
  styleUrls: ['./delivery-boy-registration.component.css']
})
export class DeliveryBoyRegistrationComponent implements OnInit {


  public countryFilterCtrl: FormControl = new FormControl();
  public countryPerFilterCtrl: FormControl = new FormControl();
  public statePerFilterCtrl: FormControl = new FormControl();
  public statePreFilterCtrl: FormControl = new FormControl();
  public drivingStateFilterCtrl: FormControl = new FormControl();
  public commissionSettingsFilterCtrl: FormControl = new FormControl();
  driverDetailsForm: FormGroup
  todayDate = new Date(moment(new Date()).subtract(18, 'years').format('YYYY-MM-DD'));
  driverDetails = null;
  minDLDate = new Date();
  fileUploadSubscription: Subscription;
  defaultPhotoUrl = '../../../../../assets/img/driver.png';
  photoUrl = '../../../../../assets/img/driver.png';
  status = null;
  listLicenseTypes = []
  issuingStateList = []
  selectedDrivingLisenceType = []
  vehicleTypeName = null;

  licenseTypeError = false;

  countryListPer = [];
  countryList = [];
  countryCode = null;
  regionListDynamicPer = [];
  regionListDynamicPre = [];
  selectedCountryName = null;
  selectedPerCountryName = null;
  fieldName = null;
  selectedPerStateName = null;
  selectedPreStateName = null;
  basePointLat = null;
  basePointLong = null;
  commissionSettings = []
  commissionDetails = []
  loading = false;

  drivingLicensePattern = '^([a-zA-Z]){2}[0-9]{13}$';
  addrressTypeTextValidation = '^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 \/\.\,]*)?$'; //'^([a-zA-Z0-9.,\/]+\s?)*\s*$'; 
  onlyTextWithOneSpaceValidation = '^[a-zA-Z ]*$';
  onlyTextDotOneSpaceValidation = '^(\s?[ \.]?[a-zA-Z]+)+$';
  alphaNumericValidation = '^[a-zA-Z0-9 ]*$';
  alphaNumericNoSpaceValidation = '^[a-zA-Z0-9]*$';
  public searchControl: FormControl;
  public photoURLControl: FormControl;
  selectControlName = null;

  checkBoxStatus = false;

  map = { lat: 22.5392287, lng: 88.3595163 };

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
  ]

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
    this.store.dispatch(new GetDeliveryBoyLiceseTypes());
    this.store.dispatch(new GetDrivingLissuingState());
    this.store.dispatch(new GetAllCountry());
    this.store.dispatch(new ListSearchDECommissionSettings({}))
  }

  ngOnInit() {
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.commissionSettingsListSearch) {
          console.log(res.commissionSettingsListSearch)
          this.commissionSettings = res.commissionSettingsListSearch;
        }
      });

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
        componentRestrictions: { country: "in" }

      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.map = { lat: +place.geometry.location.lat(), lng: +place.geometry.location.lng() };
          this.basePointLat = +place.geometry.location.lat();
          this.basePointLong = +place.geometry.location.lng();
          this.driverDetailsForm.get('base_point_lat').setValue(+place.geometry.location.lat());
          this.driverDetailsForm.get('base_point_long').setValue(+place.geometry.location.lng());
        });
      });
    });
    // this.store.dispatch(new GetAllDeliveryRequest({ pageNo: this.pageNo, requestBody:null}));
    this.driverDetailsForm = this._fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      photo_url: [''],
      phone: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      email: [''], //Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      dob: ['', Validators.required],
      gender: ['MALE', Validators.required],
      status: [''], //, Validators.required
      register_as: ['', Validators.required],
      delivery_agent_commision_setting_id: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      // Working Details

      driving_license_number: ['',], //Validators.pattern(new RegExp('^([a-zA-Z]){2}[0-9]{13}$'))
      driving_licence_state: ['',],
      driving_license_front_page_url: ['',],
      driving_license_back_page_url: ['',],
      // driving_license_type:  this._fb.array([this.createLType()]),
      driving_license_type: ['',],
      driving_license_validity: ['',],

      pan_card_number: ['', [Validators.pattern("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$")]],
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
      pre_city: ['', [Validators.required]],
      pre_state_name: ['', Validators.required],
      pre_country_name: ['', Validators.required],
      pre_country_code: ['', Validators.required],
      pre_zipcode: ['', [Validators.required]],
      pre_lat: [''],//, Validators.required
      pre_long: [''],//, Validators.required

      // Permanent Address
      // tslint:disable-next-line: max-line-length
      per_address1: ['', Validators.required],
      per_address2: ['', Validators.required],
      per_address_proof_file_url: ['', Validators.required],
      per_address_type: ['', Validators.required],
      per_city: ['', [Validators.required]],
      per_state_name: ['', Validators.required],
      per_country_name: ['', Validators.required],
      per_country_code: ['', Validators.required],
      per_zipcode: ['', [Validators.required]],
      per_lat: [''], //, Validators.required
      per_long: [''], //, Validators.required

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
      pass_book_copy_url: [''],
    })


    this.store.pipe(select('merchantManagement')).subscribe(res => {

      if (res && res['deliveryBoyLisenseTypes']) {
        this.listLicenseTypes = res.deliveryBoyLisenseTypes.driving_licens_types;
        console.log('TYPE', this.listLicenseTypes);
      }
      if (res && res['drivingIssuingState']) {
        console.log('res.drivingIssuingState ===>', res.drivingIssuingState);
        this.issuingStateList = res.drivingIssuingState;
      }
    });

    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        console.log('Inside Country population RESS===>', res);
        //if (res.getCountryAll) {
        console.log('res.getCountryAll inside registration of delivery boy', res.getAllCountryDE);
        if (this.fieldName != null) {
          if (this.fieldName == 'per_country_name') {
            this.countryListPer = res.getAllCountryDE;
          } else if (this.fieldName == 'pre_country_name') {
            this.countryList = res.getAllCountryDE;
          }
        } else {
          this.countryList = res.getAllCountryDE;
          this.countryListPer = res.getAllCountryDE;
        }
        // }
      });



  }

  changeCommission(e) {
    this.commissionDetails = this.commissionSettings.filter(item => item.id === e)
    console.log('Commission', e, this.commissionDetails)
  }


  selectRegionByCountry(e, country) {
    console.log('country countryFilterCtrl', this.countryFilterCtrl.value);


    this.fieldName = e.source.ngControl.name;
    if (e.source.ngControl.name == 'per_country_name') {
      console.log('country e value ==>', this.fieldName);
      this.regionListDynamicPer = []
      this.statePerFilterCtrl.reset()
      this.driverDetailsForm.get('per_state_name').reset()
    } else if (e.source.ngControl.name == 'pre_country_name') {
      console.log('country pre_country_code ==>', this.fieldName);
      this.regionListDynamicPre = []
      this.statePreFilterCtrl.reset()
      this.driverDetailsForm.get('pre_state_name').reset()
    }
    this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: e.value.countryCode }));
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.regionByCountryCodeDynamic) {
          console.log('Inside store ', this.fieldName);
          if (this.fieldName == 'per_country_name') {
            console.log('regionListDynamicPer -- >', res.regionByCountryCodeDynamic);
            this.regionListDynamicPer = res.regionByCountryCodeDynamic;
          } else if (this.fieldName == 'pre_country_name') {
            console.log('regionListDynamicPre -- >', res.regionByCountryCodeDynamic);
            this.regionListDynamicPre = res.regionByCountryCodeDynamic;
          }
          res.regionByCountryCodeDynamic = null;
        }
      });
    console.log('source.ngControl.name ===>', e.source.ngControl.name);
    if (this.fieldName == 'per_country_name') {
      console.log("Set permanetn address country::::::;", this.selectedPerCountryName)
      this.driverDetailsForm.get('per_country_name').setValue(this.selectedPerCountryName);
      this.driverDetailsForm.get('per_country_code').setValue(e.value.countryCode);
    } else if (this.fieldName == 'pre_country_name') {
      console.log("Set present address country::::::;", this.selectedCountryName)
      this.driverDetailsForm.get('pre_country_name').setValue(this.selectedCountryName);
      this.driverDetailsForm.get('pre_country_code').setValue(e.value.countryCode);
    }
    console.log('pre_country_name now', this.driverDetailsForm.get('pre_country_name'));
    console.log('pre_country_code now', this.driverDetailsForm.get('pre_country_code'));
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
  sameAsPresent(completed: boolean) {
    this.checkBoxStatus = completed;

    let e = {
      source: {
        ngControl: {
          name: 'per_country_name'
        }
      },
      value: {
        countryCode: this.driverDetailsForm.get('pre_country_code').value
      }
    }
    if (completed) {
      this.driverDetailsForm.get('per_address1').setValue(this.driverDetailsForm.get('pre_address1').value);
      this.driverDetailsForm.get('per_address2').setValue(this.driverDetailsForm.get('pre_address2').value);
      this.driverDetailsForm.get('per_address_type').setValue(this.driverDetailsForm.get('pre_address_type').value);
      this.driverDetailsForm.get('per_city').setValue(this.driverDetailsForm.get('pre_city').value);
      this.driverDetailsForm.get('per_zipcode').setValue(this.driverDetailsForm.get('pre_zipcode').value);

      this.driverDetailsForm.get('per_country_name').setValue(this.driverDetailsForm.get('pre_country_name').value);
      this.selectedPerCountryName = this.driverDetailsForm.get('pre_country_name').value;
      this.selectRegionByCountry(e, "");
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

  selectDocumentToUpload(e) {
    console.log('E', e)
    this.selectControlName = e;
  }

  onSelectFileNew(event) {
    const controlName = this.selectControlName;
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
        console.log('FILETYPE', filetype)
        if (filetype !== 'pdf') {
          this.doImageCrop(event, controlName)
        } else {
          this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, controlName)
        }

      }
    }
  }

  markerDragEnd(map, event) {
    console.log('markerDragEnd called---> Map, Events', map, event);
    this.map = { lat: +event.coords.lat, lng: +event.coords.lng };
    this.basePointLat = +event.coords.lat;
    this.basePointLong = +event.coords.lng;
    this.driverDetailsForm.get('base_point_lat').setValue(+event.coords.lat);
    this.driverDetailsForm.get('base_point_long').setValue(+event.coords.lng);
  }

  vehicleType(value) {
    this.vehicleTypeName = this.vehicleTypeChecking(value);

    console.log('Vehicle Type:::::::', value, this.vehicleTypeName);
    if (value == 'eRiksa' || value == 'Bicycle') {
      console.log("value:::::::::::::::::", value, "Clear validation...")
      this.driverDetailsForm.get('driving_license_number').setValue('')
      this.driverDetailsForm.get('driving_license_validity').setValue('')
      this.driverDetailsForm.get('driving_licence_state').setValue('')
      this.driverDetailsForm.get('driving_license_back_page_url').setValue('')
      this.driverDetailsForm.get('driving_license_front_page_url').setValue('')

      this.driverDetailsForm.get('driving_license_number').clearValidators()
      this.driverDetailsForm.get('driving_license_number').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_number').disable()

      this.driverDetailsForm.get('driving_licence_state').clearValidators()
      this.driverDetailsForm.get('driving_licence_state').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_licence_state').disable()


      this.driverDetailsForm.get('driving_license_type').clearValidators()
      this.driverDetailsForm.get('driving_license_type').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_type').disable()


      this.driverDetailsForm.get('driving_license_validity').clearValidators()
      this.driverDetailsForm.get('driving_license_validity').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_validity').disable()


      this.driverDetailsForm.get('driving_license_back_page_url').clearValidators()
      this.driverDetailsForm.get('driving_license_back_page_url').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_back_page_url').disable()


      this.driverDetailsForm.get('driving_license_front_page_url').clearValidators()
      this.driverDetailsForm.get('driving_license_front_page_url').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_front_page_url').disable()


      // this.driverDetailsForm.get('vehicle_model_name').clearValidators()
      // this.driverDetailsForm.get('vehicle_model_year').clearValidators()
      // this.driverDetailsForm.get('vehicle_plate_number').clearValidators()
      // this.driverDetailsForm.get('vehicle_insurance_copy_url').clearValidators()
      this.commissionDetails = this.commissionSettings.filter(function (item) {
        return item.id == 2;
      });
      this.driverDetailsForm.get('delivery_agent_commision_setting_id').setValue(2);
      this.driverDetailsForm.updateValueAndValidity()
      const indexFront = this.documentSelectArray.findIndex(item => item.value === 'driving_license_front_page_url');
      this.documentSelectArray[indexFront].disable = true;
      const indexBack = this.documentSelectArray.findIndex(item => item.value === 'driving_license_back_page_url');
      this.documentSelectArray[indexBack].disable = true;
      const indexInsuranceBack = this.documentSelectArray.findIndex(item => item.value === 'vehicle_insurance_copy_url');
      this.documentSelectArray[indexInsuranceBack].disable = true;
    } else {

      console.log('ELSE Value', this.driverDetails)

      // this.driverDetailsForm.get('driving_license_number').setValue(this.driverDetails.delivery_boy.driving_license_number)
      // this.driverDetailsForm.get('driving_license_validity').setValue(moment(this.driverDetails.delivery_boy.driving_license_validity, 'DD-MM-YYYY').toDate())
      // this.driverDetailsForm.get('driving_licence_state').setValue(this.driverDetails.delivery_boy.driving_licence_state)
      // this.driverDetailsForm.get('driving_license_back_page_url').setValue(this.driverDetails.delivery_boy.driving_license_back_page_url)
      // this.driverDetailsForm.get('driving_license_front_page_url').setValue(this.driverDetails.delivery_boy.driving_license_front_page_url)

      // if (!Boolean(this.driverDetailsForm.get('driving_license_number').value)) {
      // }
      // this.driverDetailsForm.get('driving_license_number').setValidators([Validators.required]);

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

      this.driverDetailsForm.get('driving_license_number').updateValueAndValidity()
      // this.driverDetailsForm.get('driving_license_number').markAsTouched();
      this.driverDetailsForm.get('driving_license_number').enable();


      // // tslint:disable-next-line: max-line-length
      // this.driverDetailsForm.get('driving_licence_state').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_licence_state').updateValueAndValidity()
      this.driverDetailsForm.get('driving_licence_state').enable()


      // this.driverDetailsForm.get('driving_license_type').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_type').updateValueAndValidity()
      this.driverDetailsForm.get('driving_license_type').enable()


      // this.driverDetailsForm.get('driving_license_validity').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_validity').updateValueAndValidity();
      this.driverDetailsForm.get('driving_license_validity').enable()


      // this.driverDetailsForm.get('driving_license_back_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_back_page_url').updateValueAndValidity();
      this.driverDetailsForm.get('driving_license_back_page_url').enable()


      // this.driverDetailsForm.get('driving_license_front_page_url').setValidators([Validators.required]);
      this.driverDetailsForm.get('driving_license_back_page_url').updateValueAndValidity();
      this.driverDetailsForm.get('driving_license_front_page_url').enable()
      this.driverDetailsForm.updateValueAndValidity()
      console.log('Else', this.driverDetailsForm.errors)
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
        console.log('FILETYPE', filetype)
        if (filetype !== 'pdf') {
          this.doImageCrop(event, controlName)
        } else {
          this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, controlName)
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
        const { newfile, filename, filetype, applicationtype, uploadFor } = result
        console.log('RESULT', result)
        this.uploadFileToAws(newfile, filename, filetype, applicationtype, uploadFor, )
      }
    });
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, controlName) {
    this.loading = true;
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })

    this.store.dispatch(new UploadImageToAws({ file, folderName: 'asset/delivery_boy_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {

        console.log('IMAGE LOCATION', controlName, res['awsImgUpload'].Location);
        this.driverDetailsForm.get(controlName).setValue(res['awsImgUpload'].Location);

        if (controlName == 'photo_url') {
          this.photoUrl = res['awsImgUpload'].Location
          this.photoURLControl = res['awsImgUpload'].Location
        } else {
          const index = this.documentSelectArray.findIndex(item => item.value === controlName);
          this.documentSelectArray[index].disable = true;
        }
        this.fileInput.nativeElement.value = '';

        this.fileUploadSubscription.unsubscribe();
        this.loading = false
        ////----- SAVE IMAGE DONE ----/////////
      }
    });
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

  updatePayload() {
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
        dob: moment(this.driverDetailsForm.get('dob').value).format("DD/MM/YYYY"),
        gender: this.driverDetailsForm.get('gender').value,

        age: '',
        // status: '',

        register_as: this.driverDetailsForm.get('register_as').value,

        vehicle_type: this.driverDetailsForm.get('vehicle_type').value,
        delivery_agent_commision_setting_id: this.driverDetailsForm.get('delivery_agent_commision_setting_id').value,
        driving_license_number: this.driverDetailsForm.get('driving_license_number').value,
        driving_licence_state: this.driverDetailsForm.get('driving_licence_state').value,
        driving_license_validity: this.driverDetailsForm.get('driving_license_validity').value ? moment(this.driverDetailsForm.get('driving_license_validity').value).format("DD/MM/YYYY") : null,
        pan_card_number: this.driverDetailsForm.get('pan_card_number').value,
        pan_card_photo_url: this.driverDetailsForm.get('pan_card_photo_url').value,

        proof_of_identity_type: '', // this.driverDetails.delivery_boy.proof_of_identity_type,
        proof_of_identity_number: '', // this.driverDetails.delivery_boy.proof_of_identity_number,

        proof_of_identity_photo_url: this.driverDetailsForm.get('proof_of_identity_photo_url').value,
        proof_of_identity_backpage_url: this.driverDetailsForm.get('proof_of_identity_backpage_url').value,
        driving_license_front_page_url: this.driverDetailsForm.get('driving_license_front_page_url').value,
        driving_license_back_page_url: this.driverDetailsForm.get('driving_license_back_page_url').value,

        proof_of_address_type: '', // this.driverDetails.delivery_boy.proof_of_address_type,
        proof_of_address_number: '', // this.driverDetails.delivery_boy.proof_of_address_number,
        // proof_of_address_photo_url: this.driverDetails.delivery_boy.proof_of_address_photo_url,
        proof_of_permanent_address_photo_url: this.driverDetailsForm.get('per_address_proof_file_url').value,
        proof_of_present_addess_photo_url: this.driverDetailsForm.get('pre_address_proof_file_url').value,


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
          //country_name: this.driverDetailsForm.get('per_country_name').value,
          country_name: this.selectedPerCountryName.countryName,
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
          country_name: this.selectedCountryName.countryName,
          // country_name: this.driverDetailsForm.get('pre_country_name').value,
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

        delivery_boy_area_of_operation: {
          base_point_lat: this.driverDetailsForm.get('base_point_lat').value ? this.driverDetailsForm.get('base_point_lat').value : this.map.lat,
          base_point_long: this.driverDetailsForm.get('base_point_long').value ? this.driverDetailsForm.get('base_point_long').value : this.map.lng,
          max_buffer_distance: this.driverDetailsForm.get('max_buffer_distance').value
        }
      }
    }
  }


  // updateRejectPayload(status) {
  //   let selectedDrivingLisences = []
  //   const distrinctDrivingLisenceTypes = this.selectedDrivingLisenceType;
  //   this.listLicenseTypes.filter(dlType => {
  //     if (distrinctDrivingLisenceTypes.includes(dlType.id)) {
  //       selectedDrivingLisences.push(dlType)
  //     }
  //   })
  //   return {
  //     marketplace_delivery_boy: {
  //       id: this.driverDetails.delivery_boy.id,
  //       phone: this.driverDetails.delivery_boy.phone,
  //       email: this.driverDetails.delivery_boy.email,
  //       photo_url: this.driverDetails.delivery_boy.photo_url,
  //       dob: this.driverDetails.delivery_boy.dob,
  //       gender: this.driverDetails.delivery_boy.gender,
  //       age: this.driverDetails.delivery_boy.age,

  //       vehicle_type: this.driverDetails.delivery_boy.vehicle_type,
  //       driving_license_number: this.driverDetails.delivery_boy.driving_license_number,
  //       driving_licence_state: this.driverDetails.delivery_boy.driving_licence_state,
  //       driving_license_validity: this.driverDetails.delivery_boy.driving_license_validity,
  //       pan_card_number: this.driverDetails.delivery_boy.pan_card_number,
  //       pan_card_photo_url: this.driverDetails.delivery_boy.pan_card_photo_url,

  //       proof_of_identity_type: this.driverDetails.delivery_boy.proof_of_identity_type,
  //       proof_of_identity_number: this.driverDetails.delivery_boy.proof_of_identity_number,

  //       proof_of_identity_photo_url: this.driverDetails.delivery_boy.proof_of_identity_photo_url,
  //       proof_of_identity_backpage_url: this.driverDetails.delivery_boy.proof_of_identity_backpage_url,
  //       driving_license_front_page_url: this.driverDetails.delivery_boy.driving_license_front_page_url,

  //       proof_of_address_type: this.driverDetails.delivery_boy.proof_of_address_type,
  //       proof_of_address_number: this.driverDetails.delivery_boy.proof_of_address_number,
  //       proof_of_address_photo_url: this.driverDetails.delivery_boy.proof_of_address_photo_url,


  //       vehicle_model_name: this.driverDetails.delivery_boy.vehicle_model_name,
  //       vehicle_model_year: this.driverDetails.delivery_boy.vehicle_model_year,
  //       vehicle_plate_number: this.driverDetails.delivery_boy.vehicle_plate_number,
  //       vehicle_insurance_copy_url: this.driverDetails.delivery_boy.vehicle_insurance_copy_url,

  //       bank_name: this.driverDetails.delivery_boy.bank_name,
  //       account_holder_name: this.driverDetails.delivery_boy.account_holder_name,
  //       account_number: this.driverDetails.delivery_boy.account_number,
  //       ifsc_code: this.driverDetails.delivery_boy.ifsc_code,

  //       police_verification_certificate_url: this.driverDetails.delivery_boy.police_verification_certificate_url,
  //       highest_qualification: this.driverDetails.delivery_boy.highest_qualification,
  //       highest_qualification_certificate_url: this.driverDetails.delivery_boy.highest_qualification_certificate_url,
  //       status,

  //       permanent_address: {
  //         address1: this.driverDetails.present_address.per_address1,
  //         address2: this.driverDetails.present_address.per_address2,
  //         address_type: this.driverDetails.present_address.per_address_proof_type,
  //         city: this.driverDetails.present_address.per_city,
  //         zipcode: this.driverDetails.present_address.per_zipcode,
  //         // phone: this.driverDetails.present_address.phone,
  //         //state_name: this.driverDetails.present_address.per_state_name,
  //         lat: this.driverDetails.present_address.per_lat,
  //         long: this.driverDetails.present_address.per_long,
  //         country_name: this.driverDetails.present_address.per_country_name,
  //         country_code: this.driverDetails.present_address.per_country_code
  //       },

  //       present_address: {
  //         address1: this.driverDetails.permanent_address.pre_address1,
  //         address2: this.driverDetails.permanent_address.pre_address2,
  //         address_type: this.driverDetails.permanent_address.pre_address_proof_type,
  //         city: this.driverDetails.permanent_address.pre_city,
  //         zipcode: this.driverDetails.permanent_address.pre_zipcode,
  //         state_name: this.driverDetails.permanent_address.pre_state_name,
  //         lat: this.driverDetails.permanent_address.pre_lat,
  //         long: this.driverDetails.permanent_address.pre_long,
  //         country_name: this.driverDetails.permanent_address.pre_country_name,
  //         country_code: this.driverDetails.permanent_address.pre_country_code
  //       },

  //       marketplace_driving_license_detail: {
  //         // details: this.driverDetails.marketplace_driving_license_detail.details
  //         details: selectedDrivingLisences
  //       },

  //       delivery_boy_area_of_operation: {
  //         base_point_lat: this.basePointLat,
  //         base_point_long: this.basePointLong,
  //         max_buffer_distance: this.driverDetails.delivery_boy.max_buffer_distance
  //       }
  //     }
  //   }
  // }



  submitRegistration() {
    console.log('Register', this.driverDetailsForm.getRawValue())
    console.log('Valid Value', this.driverDetailsForm);

    this.markFormGroupTouched(this.driverDetailsForm)

    let props = Object.keys(this.driverDetailsForm['controls']);
    for (let prop of props) {
      if (this.driverDetailsForm['controls'][prop]['status'] == 'INVALID') {
        console.log(prop, "==============>>>>>>", this.driverDetailsForm['controls'][prop]['status'])
      }
    }
    if (this.driverDetailsForm.valid) {

      console.log('After validation, Raw Value -->', this.driverDetailsForm.getRawValue());
      console.log('After validation, updatePayload -->', this.updatePayload());
      this.store.dispatch(new DeliveryBoyRegistration(this.updatePayload()));
      this.apiService.currentApiStatus.subscribe(details => {
        if (details.type === 'DELIVERY_BOY_REGISTRATION') {
          // this.goBackButton();
          this.router.navigate(['delivery-boy/pending-delivery-boy'])
        }
      })
    }

  }

  goBackButton() {
    console.log("goBackButton url", this.router.url);
    let strURL = this.router.url;
    const strlength = strURL.split('/', 3).join('/').length;
    strURL = strURL.substring(0, strlength);

    this.router.navigate([strURL]);
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        // this.getPlacesfromCoordinate()
        console.log('Lat lng', this.map.lat, this.map.lng)
        this.driverDetailsForm.get('base_point_lat').setValue(this.map.lat);
        this.driverDetailsForm.get('base_point_long').setValue(this.map.lng);
      });
    }
  }



}
