import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetAllOrders } from '../../../../actions/order-management-apa.action';
import { GetSearchMerchants } from './../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import * as moment from 'moment';

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
  talal_item: string;
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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
  filterDate: any = '';
  selectedStatus = '';
  perPage = 20;
  displayedColumns =
      ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_mode', 'delivery_type', 'talal_item', 'final_total', 'status', 'review'];
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
    {name: 'Last 30 days', value: '30'}
  ];

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
  
  constructor(private activatedRoute: ActivatedRoute, private store: Store<any>, private dialog: MatDialog) {
    this.filterDate = this.activatedRoute.snapshot.params.filterDate;
    this.to_date = new Date(moment().format("YYYY-MM-DD H:mm:ss")).getTime();
    console.log('filterDate', this.filterDate);

    if(this.filterDate=='today') {
      this.selectedDate = '1';
      this.from_date = new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime();
    } else if(this.filterDate=='week') {
      this.selectedDate = '7';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    } else {
      this.selectedDate = '30';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    }
    this.searchPendingOrder();
  }

  ngOnInit() {
    this.store
    .pipe(select('orderManagementApa'))
    .subscribe(res => {
      this.allOrders = res.allOrders;
      if (this.allOrders) {
        this.totalRecords = this.allOrders['total_records'];
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
    console.log(row);
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
    console.log("event ", JSON.stringify(event));
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex + 1;
    this.searchPendingOrder();
  }
  orderStatusChanged(type) {
    this.selectedStatus = type;
    this.searchPendingOrder();
  }
  clearOrderstatus() {
    this.selectedStatus = '';
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
      "per_page": this.perPage.toExponential,
      "order_state": this.selectedStatus
    }));
  }
  searchById() {
    this.searchPendingOrder();
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
    this.selectedPaymentMode  = "";
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
    this.to_date = new Date(moment().format("YYYY-MM-DD H:mm:ss")).getTime();
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
  clearOrderDate() {
    this.filterDate = this.activatedRoute.snapshot.params.filterDate;
    this.to_date = new Date(moment().format("YYYY-MM-DD H:mm:ss")).getTime();
    console.log('filterDate', this.filterDate);

    if(this.filterDate=='today') {
      this.selectedDate = '1';
      this.from_date = new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime();
    } else if(this.filterDate=='thisweek') {
      this.selectedDate = '7';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    } else {
      this.selectedDate = '30';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    }
  }
  clearOrderAll() {
    this.filterDate = this.activatedRoute.snapshot.params.filterDate;
    this.to_date = new Date(moment().format("YYYY-MM-DD H:mm:ss")).getTime();
    console.log('filterDate', this.filterDate);

    if(this.filterDate=='today') {
      this.selectedDate = '1';
      this.from_date = new Date(moment().format("YYYY-MM-DD 00:00:00")).getTime();
    } else if(this.filterDate=='week') {
      this.selectedDate = '7';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    } else {
      this.selectedDate = '30';
      let dateDaysAgoFrom = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
      this.from_date = new Date(moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00")).getTime();
    }
    this.deliveryOptions.forEach(function (value) {
      value.checked = false;
    });
    this.selectedDeliveryMethod = "";
    this.searchPendingOrder();
    this.selectedStatus = '';
    this.searchPendingOrder();
    this.options.forEach(function (value) {
      value.checked = false;
    });
    this.selectedPaymentMode = "";
    this.searchPendingOrder();
    this.selectedSort = [];
    this.selectedSort1 = '';
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
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}