import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '../../../../../../node_modules/@angular/forms';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { 
  GetMasterCoupons,
  EditStoreCouponCode,
  GetStoreCouponById,
  GetCouponById,
  ActionTypes,
  StoreStoreCouponById
} from '../../../../actions/coupon-code.actions';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMMM, DD YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  }
};
@Component({
  selector: 'app-edit-coupon-store',
  templateUrl: './edit-coupon-store.component.html',
  styleUrls: ['./edit-coupon-store.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EditCouponStoreComponent implements OnInit {
  minDate = new Date();
  couponAssignForm: FormGroup;
  allMasterCoupons:any = [];
  storeName = null;
  storeCouponDetailsById = null;
  pageNo = 1;
  coupon_code = null;
  pageSize = 1000;
  subscriptionApi: Subscription;
  list_visible = true;
  couponCalled = false;

  store_name = '';
  address = '';
  maxDate:any = new Date('31-12-2050');
  expiryFrom:any = '';
  expiryTo:any = '';
  couponId:any = '';
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService,
    public dialogRef: MatDialogRef<EditCouponStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
  ) {
    this.store.dispatch(new GetStoreCouponById(this.data.id))
    this.store.dispatch(new GetMasterCoupons({
      code: null,
      coupon_category: 'SELLER_PROMO,PLATFORM_OFFER',
      perPage: null,
      pageNo: null
    }));
    this.couponCalled = false;
  }

  ngOnInit(): void {
    this.couponAssignForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      max_order_count: ['', [Validators.min(1), Validators.max(100000)]],
      is_active: ['', Validators.required],
      allow_store_update: [false],
    });
    this.store
    .pipe(select('couponCode'))
    .subscribe(res => {
      if (res.allMasterCoupons) {
        this.allMasterCoupons = res.allMasterCoupons['coupons'];
      }
      if (res.couponDetailsById) {
        this.list_visible = res.couponDetailsById.list_visible;
        if(this.couponId > 0) {
          this.expiryFrom = new Date(res.couponDetailsById.start_date);
          this.expiryTo = new Date(res.couponDetailsById.end_date);
          this.maxDate = new Date(this.expiryTo);
        }
      }
      if (res.storeCouponDetailsById) {
        this.storeCouponDetailsById = res.storeCouponDetailsById;
        if(res.storeCouponDetailsById.coupon.id > 0 && this.couponCalled==false) {
          this.couponCalled = true;
          this.couponId = res.storeCouponDetailsById.coupon.id;
          this.store.dispatch(new GetCouponById(res.storeCouponDetailsById.coupon.id));
        }
        this.setformDetails();
      }
    });
  }
  setformDetails() {
    if(this.storeCouponDetailsById.start_date != null) {
      this.couponAssignForm.get('start_date').setValue(new Date(this.storeCouponDetailsById.start_date));
      this.minDate = new Date(this.storeCouponDetailsById.start_date);
    }
    if(this.storeCouponDetailsById.end_date != null) {
      this.couponAssignForm.get('end_date').setValue(new Date(this.storeCouponDetailsById.end_date));
    }
    this.couponAssignForm.get('is_active').setValue(this.storeCouponDetailsById.is_active);
    this.couponAssignForm.get('max_order_count').setValue(this.storeCouponDetailsById.max_order_count);
    if(this.list_visible) {
      this.couponAssignForm.get('allow_store_update').setValue(this.storeCouponDetailsById.allow_store_update);
    }

    let index = this.allMasterCoupons.findIndex(x => x.id == this.storeCouponDetailsById.coupon.id);
    this.coupon_code = this.allMasterCoupons[index].code;

    this.store_name = this.storeCouponDetailsById.store.store_name;
    this.address = this.storeCouponDetailsById.store.address;
  }
  onFormSubmit() {
    if (this.couponAssignForm.valid) {
      if ( new Date(this.couponAssignForm.get('end_date').value).getTime() >  new Date(this.couponAssignForm.get('start_date').value).getTime()) {
        if(this.couponAssignForm.get('max_order_count').value==0) {
          this.toastr.error('Max Order Count should not be less than 1.');
        }
        else
        {
          let myStartDate = moment(this.couponAssignForm.get('start_date').value).format('MM/DD/YYYY 00:00:00');
          let myEndDate = moment(this.couponAssignForm.get('end_date').value).format('MM/DD/YYYY 23:59:59');

          let payload = {
            "id": this.storeCouponDetailsById.id,
            "start_date": new Date(myStartDate).getTime(),
            "end_date":  new Date(myEndDate).getTime(),
            "is_active": this.couponAssignForm.get('is_active').value,
            "max_order_count": this.couponAssignForm.get('max_order_count').value,
            "allow_store_update": this.couponAssignForm.get('allow_store_update').value
          }
          this.store.dispatch(new EditStoreCouponCode(payload));
          this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
            if (data.status === true && data.type ==  ActionTypes.editStoreCouponCode) {
              this.dialogRef.close({'isDone': true});
            }
          });
        }
      } else {
        this.toastr.error('Start Date cannot be greater than or equal to End Date.');
      }
    } else {
      this.markFormGroupTouched(this.couponAssignForm)
    }
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
  filterItemsOfType(){
    return this.allMasterCoupons.filter(x => x.active == true);
  }
  addEvent(type: string, event) {
    this.minDate = new Date(event.target.value);
  }
  ngOnDestroy() {
    this.store.dispatch(new StoreStoreCouponById(null));
  }
}