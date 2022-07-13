import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ResetDeliveryComponent } from '../components/reset-delivery/reset-delivery.component';
import { UnassignDeliveryBoyComponent } from '../components/unassign-delivery-boy/unassign-delivery-boy.component';
import { OrderListingByStatus, OrderListingBySearchTerm, OrderStatusChanged, AddCommentToOrderHistory } from 'src/app/actions/delivery-boy-management.action';
import { Store, select } from '@ngrx/store';
import { AssignDeliveryBoyComponent } from '../components/assign-delivery-boy/assign-delivery-boy.component';
import { DeliveryBoyLogComponent } from '../components/delivery-boy-log/delivery-boy-log.component';
import { FormControl } from '@angular/forms';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-delivery-boy-orders',
  templateUrl: './delivery-boy-orders.component.html',
  styleUrls: ['./delivery-boy-orders.component.css']
})
export class DeliveryBoyOrdersComponent implements OnInit {
  // status = "active_orders";
  searchTerm = '';
  loading = true
  opendDeliveryBoy = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedRows$: Observable<any[]>;
  totalRows$: Observable<number>;

  totalOrderListing = []
  comment = null;
  searchKeyword = new FormControl('');
  orderStatus = new FormControl('');
  status = new FormControl('ndh_go_active_orders');
  totalOrderItems = [];

  constructor(private dialog: MatDialog, private store: Store<any>, private apiMsgService: ApiMessageService) {

  }

  ngOnInit() {
    this.store.dispatch(new OrderListingByStatus({ multi_status: 'ndh_go_active_orders', search: '' }));
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.orderListingByStatus) {
          this.loading = false;
          console.log('ORDER LISTING', res.orderListingByStatus['total_order_items'])

          this.totalOrderListing = res.orderListingByStatus['seller_order_delivery_agents'];
          this.totalOrderItems = res.orderListingByStatus['seller_order_delivery_agents']['total_order_items'];
        }
      });
    // this.store
    //   .pipe(select('deliveryBoyManagement'))
    //   .subscribe(res => {
    //     if (res.orderListingBySearchTerm) {
    //       this.loading = false;
    //       console.log('ORDER LISTING search', res.orderListingBySearchTerm)
    //       this.totalOrderListing = res.orderListingBySearchTerm['seller_orders'];
    //     }
    //   });
  }

  unassignDeliveryBoy() {
    const dialog = this.dialog.open(UnassignDeliveryBoyComponent, {
      minHeight: '400px',
      minWidth: '450px',
      panelClass: 'assign-delivery',
    });
  }

  assignDeliveryBoy(item) {
    const dialog = this.dialog.open(AssignDeliveryBoyComponent, {
      minHeight: '400px',
      minWidth: '750px',
      panelClass: 'assign-delivery',
      data: { item }
    });

  }

  resetDeliveryBoy() {
    const dialog = this.dialog.open(ResetDeliveryComponent, {
      minHeight: '400px',
      minWidth: '450px',
      panelClass: 'assign-delivery',
    });

  }

  deliveryLogs(item) {
    const dialog = this.dialog.open(DeliveryBoyLogComponent, {
      minHeight: '400px',
      minWidth: '650px',
      panelClass: 'assign-delivery',
      data: { payload: item['order_histories'] }
    });

  }

  searchByStatus(e) {
    console.log('searchByStatus', e.value)
    this.store.dispatch(new OrderListingByStatus({ multi_status: this.status.value, search: this.searchKeyword.value }));
  }
  search() {
    console.log('search', this.searchKeyword.value)
    this.store.dispatch(new OrderListingByStatus({ multi_status: this.status.value, search: this.searchKeyword.value }));
    // this.store.dispatch(new OrderListingBySearchTerm({ status: this.searchTerm }));
  }

  orderStatusChanged(e, id) {
    console.log('ORDER STATUS', e.value, id)
    // this.store.dispatch(new OrderStatusChanged({ id, status_change_to: this.orderStatus.value }));
    // this.apiMsgService.currentApiStatus.subscribe(data => {
    //   if (data.status && data.type === 'ORDER_STATUS_CHANGED') {
    //     this.store.dispatch(new OrderListingByStatus({ status: this.status.value, search: this.searchKeyword.value }));
    //   }
    // })
  }

  orderStatusSubmit(id) {
    console.log('ORDER STATUS', id)
    this.store.dispatch(new OrderStatusChanged({ id, status_change_to: this.orderStatus.value }));
    this.apiMsgService.currentApiStatus.subscribe(data => {
      if (data.status && data.type === 'ORDER_STATUS_CHANGED') {
        this.store.dispatch(new OrderListingByStatus({ multi_status: this.status.value, search: this.searchKeyword.value }));
      }
    })
  }

  addComment(sellerOrderId) {

    const payload = {
      sellerOrderId,
      comment: this.comment
    }

    console.log('Payload', payload)
    this.store.dispatch(new AddCommentToOrderHistory(payload))
    this.apiMsgService.currentApiStatus.subscribe(data => {
      if (data.status && data.type === 'DELIVERY_BOY_ADD_COMMENT_ORDER_HISTORY') {
        this.comment = null;
      }
    })

  }

  setOpendDeliveryBoy(item) {
    console.log('Delivery', item)
    this.opendDeliveryBoy = item
  }
}
