import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetAllOrders, GetPaymentLinkOrders } from '../../../../actions/order-management-apa.action';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../../order-management/order-details/order-details.component';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent implements OnInit {
  start_date:any = '';
  end_date:any = '';

  panelOpenState = false;
  allOrders = [];
  selectedPaymentMode: string = "";
  selectedDeliveryMethod: string = "";
  orderid = '';
  pageNo = 1;
  selectedStore: any = '';
  totalRecords = 0;
  selectedSort = [];
  selectedSort1 = '';
  from_date: any = '';
  to_date: any = '';
  tabIndexOrder: any = 0;
  selectedStatus = 'new';
  perPage = 20;
  displayedColumns: any = [];
  rowData: MatTableDataSource<orderData>;
  options = [
    { name: 'PREPAID', value: 'PREPAID', checked: false },
    { name: 'COD', value: 'COD', checked: false }
  ];
  deliveryOptions = [
    { name: 'Home Delivery', value: 'HOME_DELIVERY', checked: false },
    { name: 'Store Pickup', value: 'STORE_PICKUP', checked: false }
  ];
  selectedDate: string;
  dateList = [
    { name: 'Today', value: '1' },
    { name: 'Last 7 days', value: '6' },
    { name: 'Last 30 days', value: '30' },
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

  constructor(private store: Store<any>, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.selectedStore = this.activatedRoute.snapshot.params.storeId;
    this.searchPendingOrder();
  }

  ngOnInit() {
    this.displayedColumns = ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_method', 'delivery_type', 'talal_item', 'final_total', 'status'];
    this.store
      .pipe(select('orderManagementApa'))
      .subscribe(res => {
        if (res.allOrders && this.tabIndexOrder != 3) {
          this.allOrders = res.allOrders;
          //console.log('this.allOrders', this.allOrders);
          this.totalRecords = this.allOrders['all_records_count'];
          this.rowData = new MatTableDataSource(this.allOrders['orders']);

        }
        if (res.paymentLinkOrders && this.tabIndexOrder == 3) {
          this.allOrders = res.paymentLinkOrders;
          //console.log('this.allOrders1', this.allOrders);
          this.totalRecords = this.allOrders['all_records_count'];
          this.rowData = new MatTableDataSource(this.allOrders['orders']);
        }
      });
  }
  onActionBtnClick(row) {
    // if (this.tabIndexOrder != 3) {
      const dialog = this.dialog.open(OrderDetailsComponent, {
        minWidth: '90vh',
        maxHeight: 600,
        disableClose: true,
        panelClass: 'ndh-order-view',
        data: {
          id: row.id,
          delivery_type: row.type
        }
      });
      dialog.afterClosed().subscribe(result => {
        if (localStorage.getItem('isChangedStatus') == '1') {
          this.searchPendingOrder();
        }
      });
    // }
  }
  onPaginateChange(event) {
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex + 1;
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }

  }
  orderStatusChanged(type) {
    this.selectedStatus = type;
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  clearOrderstatus() {
    if (this.tabIndexOrder == 3) {
      this.selectedStatus = '';
      this.searchPaymentLinkOrder();
    } else {
      this.selectedStatus = '';
      this.searchPendingOrder();
    }
  }
  searchPendingOrder() {
    this.store.dispatch(new GetAllOrders({
      "payment_link": false,
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
      "order_state": this.selectedStatus      
    }));
  }
  searchPaymentLinkOrder() {
    this.store.dispatch(new GetPaymentLinkOrders({
      "payment_link": true,
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
      "order_state": this.selectedStatus      
    }));
  }
  searchById() {
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  refreshOrderList() {
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  onPaymentChange(paymentMethod) {
    // if (checked) {
    //   this.selectedPaymentMode.push(option);
    // } else {
    //   this.selectedPaymentMode.splice(this.selectedPaymentMode.indexOf(option), 1)
    // }
    this.selectedPaymentMode = paymentMethod;
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  clearPaymentMode() {
    this.options.forEach(function (value) {
      value.checked = false;
    });
    this.selectedPaymentMode = "";
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  orderSortingChanged(key, value) {
    this.selectedSort = [];
    let sortingOrder = {}

    sortingOrder[key] = value;
    this.selectedSort.push(sortingOrder)
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  clearorderSorting() {
    this.selectedSort = [];
    this.selectedSort1 = '';
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
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
      if (this.tabIndexOrder == 3) {
        this.searchPaymentLinkOrder();
      } else {
        this.searchPendingOrder();
      }
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
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  clearOrderAll() {
    this.selectedDate = '';
    this.from_date = '';
    this.to_date = '';
    this.deliveryOptions.forEach(function (value) {
      value.checked = false;
    });
    this.selectedDeliveryMethod = "";
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  onDMethodChange( deliveryValue ) {
    this.selectedDeliveryMethod = deliveryValue;
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  clearDeliveryMethod() {
    this.deliveryOptions.forEach(function (value) {
      value.checked = false;
    });
    this.selectedDeliveryMethod = "";
    if (this.tabIndexOrder == 3) {
      this.searchPaymentLinkOrder();
    } else {
      this.searchPendingOrder();
    }
  }
  routeOrders(event) {
    if (event.index == 0) {
      this.displayedColumns = ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_method', 'delivery_type', 'talal_item', 'final_total', 'status'];

      this.tabIndexOrder = 0;
      this.selectedStatus = 'new';
      this.selectedPaymentMode = "";
      this.searchPendingOrder();
    } else if (event.index == 1) {
      this.displayedColumns = ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_method', 'delivery_type', 'talal_item', 'final_total', 'status'];

      this.tabIndexOrder = 1;
      this.selectedStatus = 'completed';
      this.selectedPaymentMode = "";
      this.searchPendingOrder();
    } else if (event.index == 2) {
      this.displayedColumns = ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_method', 'delivery_type', 'talal_item', 'final_total', 'status'];

      this.tabIndexOrder = 2;
      this.selectedStatus = 'cancelled,canceled_by_customer,canceled_by_seller,canceled_by_admin';
      this.selectedPaymentMode = "";
      this.searchPendingOrder();
    } else if (event.index == 3) {
      this.displayedColumns = ['sub_order_no', 'createdAt', 'store_name', 'store_city', 'payment_method', 'delivery_type', 'talal_item', 'final_total', 'status'];
      this.tabIndexOrder = 3;
      this.selectedStatus = '';
      this.selectedPaymentMode = "";
      this.searchPaymentLinkOrder();
    }
  }
}
