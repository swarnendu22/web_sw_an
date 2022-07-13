import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetAllOrders } from '../../../../actions/order-management-apa.action';
import { GetSearchMerchants } from './../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

export interface orderData {
  id: number;
  store_name: string;
  store_city: string;
  sub_order_no: string;
  payment_mode: string;
  state: string;
  status: string;
  created_at: string;
  final_total: number;
  is_sla_breach: boolean;
  sla: string;
  total_item: string;
  talal_quantity: number;
}
export interface PayLoadForSearch {
  pinCode: string;
  stateCode: string;
  storeName: string;
  businessCategory: number;
  status: string;
  dateType: string;
  isAesc: boolean;
  contactNo: string;
  createdDateFrom: string;
  createdDateTo: string;
  businessCategoryName: string;
}

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent implements OnInit {
  start_date:any = '';
  end_date:any = '';

  panelOpenState = false;
  allOrders = [];
  allStore = [];
  selectedPaymentMode:string = "";
  selectedDeliveryMethod:string = "";
  orderid = '';
  pageNo = 1;
  selectedStore: any = '';
  totalRecords = 0;
  selectedSort = [];
  selectedSort1 = '';
  from_date :any = '';
  to_date :any = '';
  selectedStatus = 'canceled,canceled_by_customer,canceled_by_seller,canceled_by_admin';
  perPage = 20;
  displayedColumns =
      ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_mode', 'delivery_type', 'total_item', 'final_total', 'status'];
  rowData: MatTableDataSource<orderData>;
  options = [
    {name:'PREPAID', value:'PREPAID', checked:false},
    {name:'COD', value:'COD', checked:false}
  ];
  deliveryOptions = [
    {name:'Home Delivery', value:'HOME_DELIVERY', checked:false},
    {name:'Store Pickup', value:'STORE_PICKUP', checked:false}
  ];
  selectedDate: string;
  dateList = [
    {name: 'Today', value: '1'},
    {name: 'Last 7 days', value: '6'}, 
    {name: 'Last 30 days', value: '30'},
    {name: 'Custom Date', value: ''}
  ];
  isCustomDate = false;

  payLoadForSearch: PayLoadForSearch = {
    pinCode: null,
    stateCode: null,
    storeName: null,
    businessCategory: null,
    status: null,
    dateType: null,
    isAesc: null,
    contactNo: null,
    createdDateFrom: null,
    createdDateTo: null,
    businessCategoryName: null,
  };
  
  constructor(private store: Store<any>, private dialog: MatDialog) {
    this.searchPendingOrder();
  }

  ngOnInit() {
    this.store
    .pipe(select('orderManagementApa'))
    .subscribe(res => {
      this.allOrders = res.allOrders;
      if (this.allOrders) {
        this.totalRecords = this.allOrders['all_records_count'];
        this.rowData = new MatTableDataSource(this.allOrders['orders']);
        
      }
    });
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if(res.allSearchMerchants) {
        this.allStore = res.allSearchMerchants['payload'];
      }
    });
  }
  findStore (event:any) {
    if(event.target.value != '') {
      this.findSearchStore(event.target.value);
    } else {
      this.allStore = [];
    }
  }
  findSearchStore(storeName: any) {
    const payload = {
      "storeName": storeName
    }
    this.store.dispatch(new GetSearchMerchants(payload));
  }
  onActionBtnClick(row) {
    const dialog = this.dialog.open(OrderDetailsComponent, {
      minWidth: '90vh',
      maxHeight: 600,
      disableClose: true,
      panelClass: 'ndh-order-view',
      data: {
        id: row.id,
        delivery_type: row.type
      }
    })
    dialog.afterClosed().subscribe(result => {
      if(localStorage.getItem('isChangedStatus')=='1') {
        this.searchPendingOrder();
      }
    });
  }
  onPaginateChange(event){
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex + 1;
    this.searchPendingOrder();
  }
  searchPendingOrder() {
    this.store.dispatch(new GetAllOrders({
      "status": this.selectedStatus,
      "search": this.orderid,
      "order_by_data": this.selectedSort,
      "from_date": this.from_date,
      "to_date": this.to_date,
      "payment_method": this.selectedPaymentMode,
      "delivery_type": this.selectedDeliveryMethod,
      "store_id": this.selectedStore,
      "page": this.pageNo,
      "per_page": this.perPage,
      "order_state": this.selectedStatus,
      "payment_link": false
    }));
  }

  // subTimeout: Subscription;
  // searchById() {
  //   if (this.subTimeout) {
  //     this.subTimeout.unsubscribe();
  //   }
  //   this.subTimeout = Observable.timer(1000).subscribe(() => {
  //     this.searchPendingOrder();
  //   });
  // }

  searchById() {
    this.searchPendingOrder();
  }
  onsearchById(value) {
    if (value === "") {
      this.searchPendingOrder();
    }
  }
  
  onPaymentChange( paymentMethod ) {
    // if(checked){
    //   this.selectedPaymentMode.push(option);
    // } else {
    //   this.selectedPaymentMode.splice(this.selectedPaymentMode.indexOf(option), 1)
    // }
    // console.log('selectedPaymentMode', this.selectedPaymentMode);
    this.selectedPaymentMode = paymentMethod;
    this.searchPendingOrder();
  }
  clearPaymentMode() {
    this.options.forEach(function (value) {
      value.checked = false;
    });
    this.selectedPaymentMode = "";
    this.searchPendingOrder();
  }
  orderSortingChanged(key, value) {
    this.selectedSort = [];
    let sortingOrder = {}

    sortingOrder[key] = value;
    this.selectedSort.push(sortingOrder)
    console.log('this.selectedSort', this.selectedSort);
    this.searchPendingOrder();
  }
  clearorderSorting() {
    this.selectedSort = [];
    this.selectedSort1 = '';
    this.searchPendingOrder();
  }
  orderDateChanged(event) {
    if(event.value=='') {
      this.isCustomDate = true;
    } else {
      this.to_date = new Date(moment().format("YYYY-MM-DD 23:59:59")).getTime();
      //console.log(this.to_date);

      if(event.value=='1') {
        this.from_date = new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime();
        //console.log(this.from_date);
      } else {
        let dateDaysAgoFrom = new Date(new Date().getTime() - event.value * 24 * 60 * 60 * 1000);
        this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
        //console.log( this.from_date);
      }
      this.searchPendingOrder();
    }
  }
  changeDate() {
    if (this.start_date && this.end_date) {
      this.from_date = new Date(moment(this.start_date).format('YYYY-MM-DD  00:00:00')).getTime();
      this.to_date = new Date(moment(this.end_date).format('YYYY-MM-DD 23:59:59')).getTime();
      this.searchPendingOrder();
    }
  }
  clearOrderDate() {
    this.selectedDate = '';
    this.from_date = '';
    this.to_date = '';
    this.searchPendingOrder();
  }
  clearOrderAll() {
    this.selectedDate = '';
    this.from_date = '';
    this.to_date = '';
    this.deliveryOptions.forEach(function (value) {
      value.checked = false;
    });
    this.selectedDeliveryMethod = "";
    this.searchPendingOrder();
  }
  onDMethodChange( deliveryValue ) {
    this.selectedDeliveryMethod = deliveryValue;
    this.searchPendingOrder();
  }
  clearDeliveryMethod() {
    this.deliveryOptions.forEach(function (value) {
      value.checked = false;
    });
    this.selectedDeliveryMethod = "";
    this.searchPendingOrder();
  }
  storeChange() {
    this.searchPendingOrder();
  }
}