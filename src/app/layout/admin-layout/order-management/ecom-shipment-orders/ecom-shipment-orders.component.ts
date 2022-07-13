import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetEcomShipmentOrders } from '../../../../actions/order-management-apa.action';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { CancelShipmentReasonComponent } from '../cancel-shipment-reason/cancel-shipment-reason.component';
import { EcomReportComponent } from '../ecom-report/ecom-report.component';

export interface orderData {
  orderId: number;
  subOrderDate: string;
  orderNumber: string;
  status: string;
  courrier: string;
  trackingId: string;
  shippingChargeTotal: number;
  paymentMethod: string;
  orderStatus: string;
  cancellationReason: string;
}
@Component({
  selector: 'app-ecom-shipment-orders',
  templateUrl: './ecom-shipment-orders.component.html',
  styleUrls: ['./ecom-shipment-orders.component.css']
})
export class EcomShipmentOrdersComponent implements OnInit {
  subscriptionApi: Subscription;
  start_date:any = null;
  end_date:any = null;
  panelOpenState = true;
  ecomShipmentOrders = [];
  orderid = null;
  pageNo = 0;
  totalRecords = 0;
  from_date :any = null;
  to_date :any = null;
  selectedStatus = 'ACCEPTED';
  perPage = 20;
  displayedColumns = ['subOrderDate', 'trackingId', 'courrier', 'shippingChargeTotal', 'paymentMethod', 'status', 'orderNumber',  'shipmentDetails'];
  rowData: MatTableDataSource<orderData>;
  options = [
    {name:'PREPAID', value:'PREPAID', checked:false},
    {name:'COD', value:'COD', checked:false}
  ];
  selectedDate: string;
  dateList = [
    {name: 'Today', value: '1'},
    {name: 'Last 7 days', value: '6'},
    {name: 'Last 30 days', value: '30'},
    {name: 'Custom Date', value: ''}
  ];
  isCustomDate = false;
  constructor(private store: Store<any>, private dialog: MatDialog, private apiMessageService: ApiMessageService) {
    this.searchShipmentOrder();
  }
  ngOnInit() {
    this.store
    .pipe(select('orderManagementApa'))
    .subscribe(res => {
      if (res.ecomShipmentOrders) {
        this.ecomShipmentOrders = res.ecomShipmentOrders;
        this.totalRecords = this.ecomShipmentOrders['total_count'];
        this.rowData = new MatTableDataSource(this.ecomShipmentOrders['shipment_order_tracking_list']);
      }
    });
  }
  onPaginateChange(event){
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex;
    this.searchShipmentOrder();
  }
  orderStatusChanged(type) {
    this.selectedStatus = type;
    this.searchShipmentOrder();
  }
  clearOrderstatus() {
    this.selectedStatus = 'ACCEPTED';
    this.searchShipmentOrder();
  }
  searchShipmentOrder() {
    this.store.dispatch(new GetEcomShipmentOrders({
      "STATUS": this.selectedStatus,
      "PAGE_NUMBER": this.pageNo,
      "PAGE_SIZE": this.perPage,
      "ORDERID": this.orderid,
      "FROM_DATE": this.from_date,
      "TO_DATE": this.to_date,
    }));
  }
  subTimeout: Subscription;
  searchById() {
    if (this.subTimeout) {
      this.subTimeout.unsubscribe();
    }
    this.subTimeout = Observable.timer(1000).subscribe(() => {
      this.searchShipmentOrder();
    });  
  }
  orderDateChanged(event) {
    if(event.value=='') {
      this.isCustomDate = true;
    } else {
      this.to_date = moment().format("YYYY-MM-DD 23:59:59");
      if(event.value=='1') {
        this.from_date = moment().format("YYYY-MM-DD 00:00:00");
      } else {
        let dateDaysAgoFrom = new Date(new Date().getTime() - event.value * 24 * 60 * 60 * 1000);
        this.from_date = moment(dateDaysAgoFrom).format("YYYY-MM-DD 00:00:00");
      }
      this.searchShipmentOrder();
    }
  }
  changeDate() {
    if (this.start_date && this.end_date) {
      this.from_date = moment(this.start_date).format('YYYY-MM-DD 00:00:00');
      this.to_date = moment(this.end_date).format('YYYY-MM-DD 23:59:59');
      this.searchShipmentOrder();
    }
  }
  clearOrderDate() {
    this.selectedDate = null;
    this.from_date = null;
    this.to_date = null;
    this.searchShipmentOrder();
  }
  pageChange() {
  }

  // onActionBtnClick(id, deliveryType) {
  //   const dialog = this.dialog.open(OrderDetailsComponent, {
  //     minWidth: '90vh',
  //     maxHeight: 600,
  //     disableClose: true,
  //     panelClass: 'ndh-order-view',
  //     data: {
  //       id: id,
  //       delivery_type: deliveryType
  //     }
  //   })
  //   dialog.afterClosed().subscribe(result => {
  //     if(localStorage.getItem('isChangedStatus')=='1') {
  //       this.searchShipmentOrder();
  //     }
  //   });
  // }

  onActionBtnClickNew(id, deliveryType, index) {
    const dialog = this.dialog.open(EcomReportComponent, {
      minWidth: '90vh',
      maxHeight: 600,
      disableClose: true,
      data: {
        id: id,
        delivery_type: deliveryType,
        allOrdersDetails: this.ecomShipmentOrders['shipment_order_tracking_list'][index]
      }
    })
    dialog.afterClosed().subscribe(result => {
      // if(localStorage.getItem('isChangedStatus')=='1') {
      //   this.searchShipmentOrder();
      // }
      if( result ){
        this.searchShipmentOrder();
      }
    });
  }

  // onShipmentDetails(allOrdersDetail) {
  //   const dialog = this.dialog.open(ShipmentDetailsComponent, {
  //     minWidth: '70vh',
  //     maxHeight: 600,
  //     disableClose: true,
  //     panelClass: 'ndh-order-view',
  //     data: {
  //       allOrdersDetail: allOrdersDetail
  //     }
  //   })
  //   dialog.afterClosed().subscribe(result => {
  //   });
  // }
}