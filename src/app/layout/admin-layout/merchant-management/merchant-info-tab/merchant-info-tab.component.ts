import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { select, Store } from '@ngrx/store';
import { GetMerchantInfoById } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-merchant-info-tab',
  templateUrl: './merchant-info-tab.component.html',
  styleUrls: ['./merchant-info-tab.component.css']
})
export class MerchantInfoTabComponent implements OnInit {
  merchantId = null;
  tabIndex = 0;
  merchantName = null
  address = null;
  MerchantAddress:any = null;
  merchantInfoById: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private location: Location, 
    private store: Store<any>
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.id;
    if (this.router.url.search('merchant/merchant-info') > 0 ) {
      this.tabIndex = 0;
    } else  if (this.router.url.search('merchant/hub-list') > 0 ) {
      this.tabIndex = 1;
    } else  if (this.router.url.search('merchant/store-list') > 0 ) {
      this.tabIndex = 2;
    } else  if (this.router.url.search('merchant/user-info') > 0 ) {
      this.tabIndex = 3;
    }
  }
  route(event) {
    if(event.index==0) {
      this.router.navigate(['merchant/merchant-info', this.merchantId]);
    } else if(event.index==1) {
      this.router.navigate(['merchant/hub-list', this.merchantId]);
    } else if(event.index==2) {
      this.router.navigate(['merchant/store-list', this.merchantId]);
    } else if(event.index==3) {
      this.router.navigate(['merchant/user-info', this.merchantId]);
    }
  }

  backMerchantList(){
    this.router.navigate(['merchant/merchant-list']);
  }
  ngOnInit(): void {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.merchantInfoById) {
        this.merchantInfoById = res.merchantInfoById.payload;
        this.MerchantAddress = this.merchantInfoById.address;
      } else{
        this.store.dispatch(new GetMerchantInfoById(this.merchantId));
      }
    });
  }
}
