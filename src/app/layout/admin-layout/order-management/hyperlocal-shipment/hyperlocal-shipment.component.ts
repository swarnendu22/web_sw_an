import { Component, OnInit } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetEcomShipmentOrders, GetHyperLocalShipmentOrders } from '../../../../actions/order-management-apa.action';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { CancelShipmentReasonComponent } from '../cancel-shipment-reason/cancel-shipment-reason.component';
// import {PageEvent} from '@angular/material/paginator';

import { EcomReportComponent } from '../ecom-report/ecom-report.component';
import { HyperlocalReportComponent } from '../hyperlocal-report/hyperlocal-report.component';

export interface orderData {
  ndhOrderId: number;
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
  selector: 'app-hyperlocal-shipment',
  templateUrl: './hyperlocal-shipment.component.html',
  styleUrls: ['./hyperlocal-shipment.component.css']
})
export class HyperlocalShipmentComponent implements OnInit {

  subscriptionApi: Subscription;
  start_date:any = null;
  end_date:any = null;
  panelOpenState = true;
  ecomShipmentOrders = [];
  ndhOrderId = null;
  pageNo = 1;
  totalRecords = 0;
  from_date :any = null;
  to_date :any = null;
  selectedStatus = null;
  perPage = 20;
  bulkCancelList: number[] = [];
  displayedColumns = ['Bulk_Select','shipment_date', 'vendor_shipment_id', 'partner_name', 'final_total', 'payment_method', 'status', 'order_number',  'shipmentDetails'];
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
      if (res.hyperlocalShipmentOrders) {
        // console.log( res.hyperlocalShipmentOrders );
        this.ecomShipmentOrders = res.hyperlocalShipmentOrders;
        this.totalRecords = this.ecomShipmentOrders['Total_Size'];
        this.rowData = new MatTableDataSource(this.ecomShipmentOrders['Admin_Response_Data_List']);
      } 
    });
  }
  onPaginateChange(event){
    this.perPage = event.pageSize;
    this.pageNo = event.pageIndex+1;
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
    this.store.dispatch(new GetHyperLocalShipmentOrders({
      "STATUS": this.selectedStatus,
      "PAGE_NUMBER": this.pageNo,
      "PAGE_SIZE": this.perPage,
      "ORDERID": this.ndhOrderId,
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
  forseCancelShipment(id) {
    if(id > 0) {
      const dialog = this.dialog.open(CancelShipmentReasonComponent, {
        width: '400px',
        disableClose: true,
        data: { id: id },
      })
      dialog.afterClosed().subscribe(result => {
        this.searchShipmentOrder();
      });
    }
  }

  onActionBtnClickNew(id, deliveryType, index) {
    // console.log( id, deliveryType, index );
    const dialog = this.dialog.open(HyperlocalReportComponent, {
      minWidth: '90vh',
      maxHeight: 600,
      disableClose: true,
      data: {
        id: id,
        delivery_type: deliveryType,
        allOrdersDetails: this.ecomShipmentOrders['Admin_Response_Data_List'][index]
      }
    })
    dialog.afterClosed().subscribe(result => {
      if( localStorage.getItem('isChangedStatus') == '1' ) {
        this.searchShipmentOrder();
      }
    });
  }

  searchByIdAndRemove( ndh_order_id ){
    for( let i = 0; i < this.bulkCancelList.length; i++ ){
      if( this.bulkCancelList[i] === ndh_order_id ){
        this.bulkCancelList.splice( i, 1 );
        return;
      }
    }
  }
  checkCheckBoxvalue( selectedData, ndh_order_id ){
    if( selectedData.checked ){
      if( this.bulkCancelList.indexOf( ndh_order_id ) === -1 ){
        this.bulkCancelList.push( ndh_order_id );
      }
    } else {
      this.searchByIdAndRemove( ndh_order_id );
    }
    // console.log( this.bulkCancelList );
    
  }
  
}
