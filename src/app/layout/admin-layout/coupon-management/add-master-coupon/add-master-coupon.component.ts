import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetAllMerchantsElastic } from './../../../../actions/merchant-management.actions';
import {
  CreateMasterCoupon,
  ActionTypes
} from '../../../../actions/coupon-code.actions';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../actions/img-upload-aws.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from '../../../../../../node_modules/ngx-ui-loader';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetBusinessCategory } from '../../../../actions/merchant-management.actions';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMMM, DD YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MM YYYY',
  }
};
@Component({
  selector: 'app-add-master-coupon',
  templateUrl: './add-master-coupon.component.html',
  styleUrls: ['./add-master-coupon.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddMasterCouponComponent implements OnInit {
  public Editor = ClassicEditor;
  couponForm: FormGroup;
  pageNo = 1;
  pageSize = 1000;

  storeName = '';
  allStore = [];
  pageNoStore = 0;
  pageSizeStore = 50;

  subscriptionApi: Subscription;
  minDate = new Date();

  fileUploadSubscription: Subscription;

  filename = '';
  filetype = '';
  imageChangedEvent: any = '';

  coupon_asset_url: any = null;
  coupon_response_asset_url: any = null;
  coupon_response_asset_type: any = null;

  global = true;
  store_owned = false;
  store_id_coupon = null;
  check_payment_condition = false;

  isCouponType = false;
  isHideFromDisabled = false
  isBearBySeller = false
  conditions = null;

  businessCategoryList = null
  businessCategoryFilter = []
  coupon_payment_conditions_attributes: any = null;
  neverExpired = false;

  arrayBuffer: any;
  file: File;
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
  ) {
    this.store.dispatch(new GetBusinessCategory());
  }

  ngOnInit(): void {
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.allMerchantsElastic) {
          this.allStore = this.allStore.concat(res.allMerchantsElastic);
        }
      });
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
    });

    let start_date1 = new Date().getTime();
    let start_date = new Date(start_date1);
    let end_date1 = new Date('2025/12/31').getTime();
    let end_date = new Date(end_date1);
    this.neverExpired = true;

    let coupon_category = 'SELLER_PROMO';
    if (sessionStorage.getItem('coupon_category') != '' && sessionStorage.getItem('coupon_category') != null) {
      coupon_category = sessionStorage.getItem('coupon_category');
    }

    this.couponForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      coupon_category: [coupon_category, Validators.required],
      description: ['', Validators.required],

      start_date: [start_date, Validators.required],
      end_date: [end_date, Validators.required],

      coupon_type: ['', Validators.required],
      platforms: ['', Validators.required],
      list_visible: ['Yes'],
      coupon_effect_seller_nsp: [true],
      cod_available: [false, Validators.required],

      active: ['true', Validators.required],

      business_catagories: ['*'],
      business_sector: ['*'],
      store_subscription: ['*'],
      store_visibility: ['PRIVATE'],

      restriction_per_user: ['', Validators.min(2)],
      ordersType: ['ALL', Validators.required],
      cart_attributes_value: [''],
      number_of_uses: [''],

      discount_name: ['DISCOUNT', Validators.required],
      discount_amount: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      discount_type: ['PERCENT_AMOUNT_DISCOUNT', Validators.required],
      discount_max_upto: [null, [Validators.min(0), Validators.max(10000000)]],

      terms_and_conditions: [''],
    });
    this.couponForm.get('coupon_type').setValue('INSTANT_DISCOUNT');
    this.isCouponType = true;
    this.isBearBySeller = true;
    this.isHideFromDisabled = true;
    this.coupon_category_change();
  }
  onFormSubmit() {
    if (this.couponForm.valid) {
      if (new Date(this.couponForm.get('end_date').value).getTime() > new Date(this.couponForm.get('start_date').value).getTime()) {
        if (this.coupon_response_asset_url) {
          this.coupon_response_asset_type = 'URL';
        } else {
          this.coupon_response_asset_type = null;
        }
        if (this.couponForm.get('terms_and_conditions').value != '') {
          let isConditionsValue = true;
          let isCouponPayment = true;

          let actionsCoupon = {
            "discount_type": this.couponForm.get('discount_type').value,
            "discount_amount": parseFloat(this.couponForm.get('discount_amount').value),
            "discount_max_upto": parseFloat(this.couponForm.get('discount_max_upto').value)
          }
          if (this.couponForm.get('discount_type').value == 'FIXED_AMOUNT_DISCOUNT') {
            actionsCoupon = {
              "discount_type": this.couponForm.get('discount_type').value,
              "discount_amount": parseFloat(this.couponForm.get('discount_amount').value),
              "discount_max_upto": null
            }
          }

          let conditionsValue = 0
          if (this.couponForm.get('ordersType').value == 'SUBTOTAL') {
            if (this.couponForm.get('cart_attributes_value').value > 0) {
              conditionsValue = this.couponForm.get('cart_attributes_value').value;
            }
            else {
              this.toastr.error('Enter Subtotal above value.');
              isConditionsValue = false;
            }
          }
          let conditions = {
            "rules": [
              {
                "matcher": "ALL",
                "cart_attributes": [
                  {
                    "type": "SUBTOTAL",
                    "value": conditionsValue,
                    "operator": "IS_OR_GT"
                  }
                ]
              }
            ],
            "matcher": "ALL"
          }
          if (this.coupon_payment_conditions_attributes == null && this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {
            this.toastr.error('Upload payment method.');
            isCouponPayment = false
          }
          let list_visible = true;
          if (this.couponForm.get('list_visible').value == 'Yes') {
            list_visible = false;
          }

          let restriction_per_user = null;
          if (this.couponForm.get('number_of_uses').value == 'one') {
            restriction_per_user = '1';
          }
          else if (this.couponForm.get('number_of_uses').value == 'max_upto') {
            restriction_per_user = this.couponForm.get('restriction_per_user').value;
          }

          let coupon_condition_attributes = null
          if (this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {
            coupon_condition_attributes = {
              "business_catagories": this.couponForm.get('business_catagories').value,
              "business_sector": this.couponForm.get('business_sector').value,
              "store_subscription": this.couponForm.get('store_subscription').value,
              "store_visibility": this.couponForm.get('store_visibility').value
            }
          }
          if (isCouponPayment && isConditionsValue) {

            let myStartDate = moment(this.couponForm.get('start_date').value).format('MM/DD/YYYY 00:00:00');
            let myEndDate = moment(this.couponForm.get('end_date').value).format('MM/DD/YYYY 23:59:59');

            let payload = {
              "code": this.couponForm.get('code').value,
              "coupon_category": this.couponForm.get('coupon_category').value,
              "description": this.couponForm.get('description').value,

              "start_date": new Date(myStartDate).getTime(),
              "end_date": new Date(myEndDate).getTime(),

              "coupon_type": this.couponForm.get('coupon_type').value,
              "platforms": this.couponForm.get('platforms').value,
              "list_visible": list_visible,
              "active": this.couponForm.get('active').value,

              "restriction_per_user": restriction_per_user,

              "actions": actionsCoupon,
              "conditions": conditions,
              "coupon_condition_attributes": coupon_condition_attributes,
              "coupon_payment_conditions_attributes": this.coupon_payment_conditions_attributes,

              "terms_and_conditions": this.couponForm.get('terms_and_conditions').value,
              "coupon_effect_seller_nsp": this.couponForm.get('coupon_effect_seller_nsp').value,
              "cod_available": this.couponForm.get('cod_available').value,

              "coupon_asset": this.coupon_asset_url,
              "coupon_response_asset": this.coupon_response_asset_url,
              "coupon_response_asset_type": this.coupon_response_asset_type,

              "global": this.global,
              "store_owned": this.store_owned,
              "check_payment_condition": this.check_payment_condition,
              "store_id": this.store_id_coupon
            }
            this.store.dispatch(new CreateMasterCoupon(payload));
            this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data: any) => {
              if (data.status === true && data.type == ActionTypes.createMasterCoupon) {
                if (this.couponForm.get('coupon_category').value == 'SELLER_PROMO') {
                  this.router.navigate(['/coupon/master-coupon']);
                } else if (this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {
                  this.router.navigate(['/coupon/special-coupon']);
                } else if (this.couponForm.get('coupon_category').value == 'PLATFORM_OFFER') {
                  this.router.navigate(['/coupon/platform-coupon']);
                }
              }
            });
          }
        } else {
          this.toastr.error('Terms & Conditions cannot be blank.');
        }
      } else {
        this.toastr.error('Start Date cannot be greater than or equal to End Date.');
      }
    } else {
      this.markFormGroupTouched(this.couponForm)
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['jpeg', 'jpg', 'png'];
      var reader = new FileReader();

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        this.uploadFileToAws(event.target.files[0], event.target.files[0]['name'], filetype, event.target.files[0]['type'])
      }
    }
  }
  uploadFileToAws(fileObj, filename, filetype, applicationtype) {
    this.store.dispatch(new StoreImgUploadToAws(null));
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })
    this.ngxService.start()
    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-admin/gstn' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        this.ngxService.stop();
        if (res['awsImgUpload'].Location) {
          this.coupon_asset_url = res['awsImgUpload'].Location;
          this.fileUploadSubscription.unsubscribe();
        }
      }
    })
  }

  onSelectFile1(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['jpeg', 'jpg', 'png'];
      var reader = new FileReader();

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        this.uploadFileToAws1(event.target.files[0], event.target.files[0]['name'], filetype, event.target.files[0]['type'])
      }
    }
  }
  uploadFileToAws1(fileObj, filename, filetype, applicationtype) {
    this.store.dispatch(new StoreImgUploadToAws(null));
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })
    this.ngxService.start()
    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-admin/gstn' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        this.ngxService.stop();
        if (res['awsImgUpload'].Location) {
          this.coupon_response_asset_url = res['awsImgUpload'].Location;
          this.fileUploadSubscription.unsubscribe();
        }
      }
    })
  }
  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.reset(formGroup.value);
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  addEvent(type: string, event) {
    this.minDate = new Date(event.target.value);
  }
  coupon_discount_type(event) {
    if (this.couponForm.get('discount_type').value == 'PERCENT_AMOUNT_DISCOUNT') {
      this.couponForm.get('discount_max_upto').setValidators([Validators.min(0), Validators.max(10000000)]);
    } else {
      this.couponForm.get('discount_max_upto').setValidators([Validators.min(0), Validators.max(10000000)]);
    }
  }
  coupon_category_change() {
    sessionStorage.setItem('coupon_category', this.couponForm.get('coupon_category').value);

    if (this.couponForm.get('coupon_category').value == 'SELLER_PROMO') {

      this.couponForm.get('list_visible').setValue('Yes');
      this.isHideFromDisabled = true;

      this.couponForm.get('coupon_effect_seller_nsp').setValue(true);
      this.isBearBySeller = true;

    } else if (this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {

      this.couponForm.get('list_visible').setValue('Yes');
      this.isHideFromDisabled = true;

      this.couponForm.get('coupon_effect_seller_nsp').setValue(false);
      this.isBearBySeller = true;

    } else if (this.couponForm.get('coupon_category').value == 'PLATFORM_OFFER') {

      this.couponForm.get('list_visible').setValue('Yes');
      this.isHideFromDisabled = false;

      this.couponForm.get('coupon_effect_seller_nsp').setValue(false);
      this.isBearBySeller = true;

    } else {
      this.couponForm.get('list_visible').setValue('Yes');
      this.isHideFromDisabled = false;

      this.couponForm.get('coupon_effect_seller_nsp').setValue(false);
      this.isBearBySeller = false;
    }

    if (this.couponForm.get('coupon_category').value == 'SELLER_PROMO') {
      this.global = true;
      this.couponForm.get('coupon_type').setValue('INSTANT_DISCOUNT');
      this.isCouponType = true;
    } else {
      this.global = true;
      this.couponForm.get('coupon_type').setValue('');
      this.isCouponType = false;
    }

    if (this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {
      this.couponForm.get('business_catagories').setValidators([Validators.required]);
      this.couponForm.get('business_sector').setValidators([Validators.required]);
      this.couponForm.get('store_subscription').setValidators([Validators.required]);
      this.check_payment_condition = true;
    } else {
      this.couponForm.get('business_catagories').clearValidators();
      this.couponForm.get('business_sector').clearValidators();
      this.couponForm.get('store_subscription').clearValidators();
      this.check_payment_condition = false;
    }
  }
  onScrollDown() {
    this.pageNoStore++;
    this.storeSearch();
  }
  findStore(storeName: any) {
    this.storeName = storeName;
    this.pageNoStore = 0;
    this.allStore = [];
    this.storeSearch();
  }
  storeSearch() {
    let payloadStoreSearch = {
      from: this.pageNoStore * this.pageSizeStore,
      size: this.pageSizeStore,
      storeName: this.storeName
    }
    this.store.dispatch(new GetAllMerchantsElastic(payloadStoreSearch));
  }
  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      if (data) {
        this.coupon_payment_conditions_attributes = data;
      }
      console.log(data); // Data will be logged in array format containing objects
    };
  }
  downloaPaymentOption() {
    const blob = new Blob(['https://ndh.imgix.net/ndh-admin/payment_option/98497646709822.xlsx'], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  businessSectorChanged() {
    this.businessCategoryFilter = [];
    if (this.couponForm.get('business_sector').value != '*') {
      this.businessCategoryList.forEach(element => {
        if (element.sectorName.toLowerCase() == this.couponForm.get('business_sector').value.toLowerCase()) {
          this.businessCategoryFilter.push(element);
        }
      });
    }
  }
  gobackCoupon() {
    if (this.couponForm.get('coupon_category').value == 'SELLER_PROMO') {
      this.router.navigate(['/coupon/master-coupon']);
    } else if (this.couponForm.get('coupon_category').value == 'SPECIAL_PROMO') {
      this.router.navigate(['/coupon/special-coupon']);
    } else if (this.couponForm.get('coupon_category').value == 'PLATFORM_OFFER') {
      this.router.navigate(['/coupon/platform-coupon']);
    } else {
      this.router.navigate(['/coupon/master-coupon']);
    }
  }
  endDateEvent(type: string, event) {
    let end_date3 = moment(event.target.value).format('YYYY/MM/DD');
    let end_date = new Date('2025/12/31').getTime();
    let end_date2 = new Date(end_date3).getTime();

    if (end_date2 >= end_date) {
      this.neverExpired = true;
    } else {
      this.neverExpired = false;
    }
  }
  onlyExeptNumber(fieldName){
    this.couponForm.get(fieldName).setValue(this.couponForm.get(fieldName).value.replace(/[^0-9]/g, ''));
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }
}
