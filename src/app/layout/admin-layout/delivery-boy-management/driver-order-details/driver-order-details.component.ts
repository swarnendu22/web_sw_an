import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { GetDeliveryBoyOrderDetails } from 'src/app/actions/merchant-management.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-driver-order-details',
  templateUrl: './driver-order-details.component.html',
  styleUrls: ['./driver-order-details.component.css']
})
export class DriverOrderDetailsComponent implements OnInit {
  driverOrderDetailsForm: FormGroup
  driverOrderDetails = null
  orderId = null

  orderDate = null;
  orderTime = null;
  orderStatus = null;
  orderFrom = null;
  source = null;
  destination = null;
  itemDetails = [];
  tripDetails = null;
  orderTotal = null;
  totalEarnings = null;

  constructor(
    private store: Store<any>,
    public _fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public apiService: ApiMessageService,
    private _snackBar: MatSnackBar,

  ) {
    this.orderId = this.route.snapshot.params.orderId;
    this.store.dispatch(new GetDeliveryBoyOrderDetails(this.route.snapshot.params.orderId));
  }

  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {

      // tslint:disable-next-line: no-string-literal
      if (res && res['deliveryBoyOrderDetails']) {
        this.driverOrderDetails = res.deliveryBoyOrderDetails;
        console.log('DATA', this.driverOrderDetails.delivery_boy_order)
        this.orderDate = moment(this.driverOrderDetails.delivery_boy_order.created_at).format('D MMMM ,YYYY')
        this.orderTime = moment(this.driverOrderDetails.delivery_boy_order.created_at).format('hh:mm A')
        this.orderStatus = this.driverOrderDetails.delivery_boy_order.status;
        this.orderFrom = this.driverOrderDetails.delivery_boy_order.seller_order.store_info.store_name;
        this.source = this.driverOrderDetails.delivery_boy_order.source_address;
        this.destination = this.driverOrderDetails.delivery_boy_order.destination_address;
        this.itemDetails = this.driverOrderDetails.delivery_boy_order.order_items;
        this.tripDetails = this.driverOrderDetails.delivery_boy_order.order_histories;
        this.orderTotal = this.driverOrderDetails.delivery_boy_order.seller_order.total_order_price;
        this.totalEarnings = this.driverOrderDetails.delivery_boy_order.charge;
      }
    })
  }

}
