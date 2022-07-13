import { Component, OnInit } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreCoupons } from '../../../../actions/coupon-code.actions';
import {MatTableDataSource} from '@angular/material/table';
import { AddStoreCouponComponent } from '../add-store-coupon/add-store-coupon.component';
import { EditCouponStoreComponent } from '../edit-coupon-store/edit-coupon-store.component';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMasterCoupons } from '../../../../actions/coupon-code.actions';
import { GetAllMerchantsElastic } from './../../../../actions/merchant-management.actions';

export interface couponData {
  id: number;
  store: number;
  coupon: string;
  start_date: string;
  end_date: string;
  max_order_count: number;
  expired: number;
  allow_store_update: string;
  is_active: string;
}
@Component({
  selector: 'app-store-coupon',
  templateUrl: './store-coupon.component.html',
  styleUrls: ['./store-coupon.component.css']
})
export class StoreCouponComponent {
  allMasterCoupons = [];
  coupon_id = null;
  store_id = null;
  storeName = '';
  pageNo1 = 0;
  pageSize1 = 50

  pageNo = 1;
  perPage = 20;
  totalRecords = 0;
  displayedColumns =
      ['store', 'coupon', 'start_date', 'end_date', 'max_order_count', 'expired', 'allow_store_update', 'is_active', 'action'];
  rowData: MatTableDataSource<couponData>;
  allStoreCoupons = [];
  allStore = [];
  pageNo2 = 1;
  pageSize2 = 1000;
  store_coupan_length: number = null;
  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if(this.route.snapshot.params.id > 0) {
      this.coupon_id = parseInt(this.route.snapshot.params.id);
      this.searchByCode();
    } else {
      this.searchByCode();
    }
    this.store.dispatch(new GetMasterCoupons({
      code: null,
      coupon_category: 'SELLER_PROMO,PLATFORM_OFFER',
      perPage: null,
      pageNo: null
    }));
    this.storeSearch();
    this.store_coupan_length = 0;
  }
  ngOnInit(): void {
    this.store
    .pipe(select('couponCode'))
    .subscribe(res => {
      if (res.allStoreCoupons) {
        this.allStoreCoupons = res.allStoreCoupons;
        this.store_coupan_length = this.allStoreCoupons['store_coupons'].length;
        // console.log( this.store_coupan_length );
        this.totalRecords = this.allStoreCoupons['total_records'];
        this.rowData = new MatTableDataSource(this.allStoreCoupons['store_coupons']);
      }
      if (res.allMasterCoupons) {
        this.allMasterCoupons = res.allMasterCoupons['coupons'];
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
  onPaginateChange(event){
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex + 1;
    this.searchByCode();
  }

  searchByCode() {
    this.store.dispatch(new GetStoreCoupons({
      store_id: this.store_id,
      coupon_id: this.coupon_id,
      perPage: this.perPage,
      pageNo: this.pageNo
    }));

  }

  assignStore() {
    const dialogRef = this.dialog.open(AddStoreCouponComponent, {
      width: '100%', 
      height: '96%', 
      panelClass: 'add-store-coupon-dialog',
      disableClose: true,
      data: {
        id: this.coupon_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDone == true) {
        this.searchByCode();
      }
    });
  }
  editCoupon(id) {
    const dialogRef = this.dialog.open(EditCouponStoreComponent, {
      width: '600px', 
      panelClass: 'add-store-coupon-dialog',
      disableClose: true,
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDone == true) {
        this.searchByCode();
      }
    });
  }
  couponChange() {
    this.searchByCode();
  }
  storeChange() {
    this.searchByCode();
  }
  findStore (storeName:any) {
    this.storeName = storeName;
    this.pageNo1 = 0;
    this.allStore = [];
    this.storeSearch();
  }
  onScrollDown() {
    this.pageNo1++;
    this.storeSearch();
  }
  storeSearch() {
    let payloadStoreSearch = {
      from: this.pageNo1 * this.pageSize1,
      size:  this.pageSize1,
      storeName: this.storeName
    }
    this.store.dispatch(new GetAllMerchantsElastic(payloadStoreSearch));
  }
  getOnlyDate (end_date) {
    return new Date(end_date);
  }
}
