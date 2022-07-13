import { Component, OnInit } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetMasterCoupons } from '../../../../actions/coupon-code.actions';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface couponData {
  id: number;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  coupon_type: string;
  restriction_per_user: number;
  coupon_effect_seller_nsp: string;
  active: string;
  expired: string;
}

@Component({
  selector: 'app-special-coupon',
  templateUrl: './special-coupon.component.html',
  styleUrls: ['./special-coupon.component.css']
})
export class SpecialCouponComponent implements OnInit {
  couponCodeVal = null;
  pageNo = 1;
  perPage = 20;
  totalRecords = 0;
  displayedColumns =
      ['code', 'description', 'start_date', 'end_date', 'coupon_type', 'restriction_per_user', 'coupon_effect_seller_nsp', 'active', 'expired', 'action'];
  rowData: MatTableDataSource<couponData>;
  allMasterCoupons = [];
  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private route: Router
  ) {
    this.searchByCode();
  }
  ngOnInit(): void {
    this.store
    .pipe(select('couponCode'))
    .subscribe(res => {
      if (res.allMasterCoupons) {
        this.allMasterCoupons = res.allMasterCoupons;
        this.totalRecords = this.allMasterCoupons['total_records'];
        this.rowData = new MatTableDataSource(this.allMasterCoupons['coupons']);
      }
    });
  }
  onPaginateChange(event){
    console.log("event ", JSON.stringify(event));
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex + 1;
    this.searchByCode();
  }
  searchByCode() {
    this.store.dispatch(new GetMasterCoupons({
      code: this.couponCodeVal,
      coupon_category: 'SPECIAL_PROMO',
      perPage: this.perPage,
      pageNo: this.pageNo
    }));
  }
  addCoupon() {
    sessionStorage.setItem('coupon_category', 'SPECIAL_PROMO');
    this.route.navigate(['/coupon/add-master-coupon']);
  }
  editCoupon(id) {
    this.route.navigate(['/coupon/edit-master-coupon/'+id]);
  }
  getOnlyDate (end_date) {
    return new Date(end_date);
  }
  checkExpired(end_date) {
    if(end_date != '') {
      if(new Date(end_date).getTime() >= new Date('2025/12/31').getTime()) {
        return true;
       } else {
         return false;
       }
    } else {
      return true;
    }
  }
}

