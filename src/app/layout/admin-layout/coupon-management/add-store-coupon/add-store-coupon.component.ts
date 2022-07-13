import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '../../../../../../node_modules/@angular/forms';
import { GetAllMerchantsElastic } from './../../../../actions/merchant-management.actions';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { 
  GetMasterCoupons,
  CreateStoreCoupon,
  GetCouponById,
  ActionTypes
} from '../../../../actions/coupon-code.actions';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { Observable, Subscriber } from 'rxjs/Rx';
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
  selector: 'app-add-store-coupon',
  templateUrl: './add-store-coupon.component.html',
  styleUrls: ['./add-store-coupon.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddStoreCouponComponent implements OnInit {
  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;
  minDate = new Date();
  couponId:any = '';
  couponAssignForm: FormGroup;
  allMasterCoupons = [];
  allStore = [];
  storeName = '';
  pageNo = 0;
  pageSize = 50;
  maxDate:any = new Date('31-12-2050');
  stores = [];
  list_visible = true;
  subscriptionApi: Subscription;
  subTimeout3: Subscription;
  expiryFrom:any = '';
  expiryTo:any = '';
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService,
    public dialogRef: MatDialogRef<AddStoreCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
  ) {
    this.store.dispatch(new GetMasterCoupons({
      code: null,
      coupon_category: 'SELLER_PROMO,PLATFORM_OFFER',
      perPage: null,
      pageNo: null
    }));
    if( this.data.id != null) {
      this.couponId = this.data.id;
      this.store.dispatch(new GetCouponById(this.couponId));
    }
    this.storeSearch();
  }

  ngOnInit(): void {
    if(parseInt(this.couponId) > 0) {
      this.couponAssignForm = this.fb.group({
        storeName: [null],
        coupon_id: [parseInt(this.couponId), Validators.required],
        store_ids:this.fb.array([]),
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        max_order_count: ['', [Validators.min(1), Validators.max(100000)]],
        allow_store_update: [false],
      });
    } else {
      this.couponAssignForm = this.fb.group({
        storeName: [null],
        coupon_id: [null, Validators.required],
        store_ids:this.fb.array([]),
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        max_order_count: ['', Validators.max(100000)],
        allow_store_update: [false],
      });
    }
    
    this.store
    .pipe(select('couponCode'))
    .subscribe(res => {
      if (res.allMasterCoupons) {
        this.allMasterCoupons = res.allMasterCoupons['coupons'];
      }
      if (res.couponDetailsById) {
        this.stores = res.couponDetailsById.stores;
        this.list_visible = res.couponDetailsById.list_visible;

        if(this.couponId > 0) {
          this.expiryFrom = new Date(res.couponDetailsById.start_date);
          this.expiryTo = new Date(res.couponDetailsById.end_date);
          this.maxDate = new Date(this.expiryTo);

          this.couponAssignForm.get('start_date').setValue(new Date());
          this.couponAssignForm.get('end_date').setValue(new Date(res.couponDetailsById.end_date));
        }
       
      }
    });
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.allMerchantsElastic) {
        this.allStore = this.allStore.concat(res.allMerchantsElastic);
      }
    });
  }
  onChange(id:number, store_name: string, store_logo_url, short_address, event) {
    const storeFormArray = <FormArray>this.couponAssignForm.controls.store_ids;
    if(event.checked) {
      storeFormArray.push(new FormControl({
        id: id,
        store_name: store_name,
        store_logo_url: store_logo_url,
        short_address: short_address
      }));
    } else {
      let index = storeFormArray.controls.findIndex(x => x.value.id == id)
      storeFormArray.removeAt(index);
    } 
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch(err) { }
  }
  removeStore(index) {
    const storeFormArray = <FormArray>this.couponAssignForm.controls.store_ids;
    storeFormArray.removeAt(index);
  }
  selectedStore(id:number) {
    const storeFormArray = <FormArray>this.couponAssignForm.controls.store_ids;
    let index = storeFormArray.controls.findIndex(x => x.value.id == id)
    if(index === -1) {
      return false;
    } else {
      return true;
    }
  }
  filterItem() {
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
    this.subTimeout3 = Observable.timer(500).subscribe(() => { 
      this.allStore = [];
      this.pageNo = 0;
      this.storeSearch();
    });
  }
  onScrollDown() {
    this.pageNo++;
    this.storeSearch();
  }
  storeSearch() {
    let payloadStoreSearch = {
      from: this.pageNo * this.pageSize,
      size:  this.pageSize,
      storeName: this.storeName
    }
    this.store.dispatch(new GetAllMerchantsElastic(payloadStoreSearch));
  }
  onFormSubmit() {
    if (this.couponAssignForm.valid) {
      if(this.couponAssignForm.get('store_ids').value.length > 0) {
        if ( new Date(this.couponAssignForm.get('end_date').value).getTime() >  new Date(this.couponAssignForm.get('start_date').value).getTime()) {
          let store_ids = [];
          this.couponAssignForm.get('store_ids').value.forEach(element => {
            store_ids.push(element.id);
          });
          if(this.couponAssignForm.get('max_order_count').value=='0') {
            this.toastr.error('Max Order Count should not be less than 1.');
          }
          else
          {
            let myStartDate = moment(this.couponAssignForm.get('start_date').value).format('MM/DD/YYYY 00:00:00');
            let myEndDate = moment(this.couponAssignForm.get('end_date').value).format('MM/DD/YYYY 23:59:59');

            let payload = {
              "coupon_id": this.couponAssignForm.get('coupon_id').value,
              "store_ids": store_ids,
              "start_date": new Date(myStartDate).getTime(),
              "end_date":  new Date(myEndDate).getTime(),
              "is_active": 1,
              "max_order_count": this.couponAssignForm.get('max_order_count').value,
              "allow_store_update": this.couponAssignForm.get('allow_store_update').value
            }
            this.store.dispatch(new CreateStoreCoupon(payload));
            this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
              if (data.status === true && data.type ==  ActionTypes.createStoreCoupon) {
                this.dialogRef.close({'isDone': true});
              }
            });
          }
        } else {
          this.toastr.error('Start Date cannot be greater than or equal to End Date.');
        }
      } else {
        this.toastr.error('Please Select Store');
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
  checkStore(id) {
    var index1 = this.stores.findIndex(x => x.id == id);
    if(index1 === -1) {
     return true;
    } else {
      return false;
    }
  }
  couponChange(event) {
    this.couponId = event.value;
    this.store.dispatch(new GetCouponById(event.value));
  }
  addEvent(type: string, event) {
    this.minDate = new Date(event.target.value);
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
  }
}