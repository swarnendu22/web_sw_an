import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetAllOrdersDetail, PostOrderStatusUpdate, TrackOrders } from '../../../../actions/order-management-apa.action';
import { DeliveryBoyLogComponent } from '../../delivery-boy-management/components/delivery-boy-log/delivery-boy-log.component';
import { changeOrderStatus } from 'src/app/utils/orderdetailFunction';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  allOrdersDetail = null
  customer_info = null
  storeInfo = null
  delivery_boy_details = null
  id = null
  delivery_icon = null
  delivery_type = null
  taxCharges :any = 0;
  selectedStatus:string = '';
  statusDropdown:string = '';
  orderStatus:any = '';
  commercial_summary:any = '';
  payment_mode = null
  order_histories = null
  transaction_details = null
  order_items = null
  final_total = null
  sub_order_no = null
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog
  ) {
    this.store.dispatch(new GetAllOrdersDetail(this.data.id));
    if(this.data.delivery_type == 'STORE_PICKUP') {
      this.delivery_type = 'STORE PICKUP';
      this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/self_pickup_order.svg';
    } else {
      this.delivery_type = 'HOME DELIVERY';
      this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/delivery_order.svg';
    }
    this.track( data.id );
  }

  ngOnInit() {
    localStorage.setItem('isChangedStatus', '0');
    this.store
      .pipe(select('orderManagementApa'))
      .subscribe(res => {
        
        if (res.allOrdersDetail) {
          this.allOrdersDetail = res.allOrdersDetail;
          this.id = res.allOrdersDetail.id;
          this.statusDropdown = res.allOrdersDetail.current_state;
          this.selectedStatus = changeOrderStatus(res.allOrdersDetail.current_state);
          this.customer_info = res.allOrdersDetail.customer ? res.allOrdersDetail.customer : null;
          this.storeInfo = res.allOrdersDetail.store ? res.allOrdersDetail.store : null;
          this.order_histories = res.storeTrackOrderDetails ? res.storeTrackOrderDetails : null;
          this.commercial_summary = res.allOrdersDetail.bag ? res.allOrdersDetail.bag : null;
          if(this.commercial_summary) {
            this.taxCharges = parseFloat(this.commercial_summary.total_packaging_charge) + parseFloat(this.commercial_summary.total_tax_amount) + parseFloat(this.commercial_summary.total_platform_charge);
            this.taxCharges = this.taxCharges.toFixed(2);
          }
          // if(res.allOrdersDetail.type == "HOME_DELIVERY"){
          //   this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/delivery_order.svg';
          // } else if( res.allOrdersDetail.type == "STORE PICKUP" ){
          //   this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/self_pickup_order.svg';
          // } 

          this.payment_mode = res.allOrdersDetail.payment_method ? res.allOrdersDetail.payment_method : null;
          this.transaction_details = res.allOrdersDetail.bag.payments.online.length !==0 ? res.allOrdersDetail.bag.payments.online : null;
          this.order_items = res.allOrdersDetail.cart.items ? res.allOrdersDetail.cart.items : null;
          this.final_total = res.allOrdersDetail.final_total ? res.allOrdersDetail.final_total : null;
          this.sub_order_no = res.allOrdersDetail.display_order_number ? res.allOrdersDetail.display_order_number : null;
          this.orderStatus = res.allOrdersDetail.status;          
        }

      });
  }

  statusSUbmit: boolean = false;
  onStatusChange( value ){
    if( value ){
      this.statusSUbmit = true;
    }
    if( value === 'new'){
      this.statusSUbmit = false;
    }
  }

  orderStatusSubmit() {
    localStorage.setItem('isChangedStatus', '1');
    const payload = {
      "id": this.data.id,
      "status_change_to": this.selectedStatus
    }
    if( this.selectedStatus !=="new" ){
      const dialog = this.dialog.open(DialogOverviewExampleDialog, {
        minWidth: 300,
        maxHeight: 300,
        data: payload
      });
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(new PostOrderStatusUpdate(payload))
        }
      });
      
    }
  }
  
  deliveryLogs() {
    const dialog = this.dialog.open(DeliveryBoyLogComponent, {
      minHeight: '400px',
      minWidth: '650px',
      panelClass: 'assign-delivery',
      data: { payload: this.order_histories }
    });
  }
  cancelledOrder() {
    const dialog = this.dialog.open(AdminCancellOrderMessageDialog, {
      width: '250px',
      data: { message: 'Do you want to cancel this order?' }
    });
    dialog.afterClosed().subscribe(result => {
      if(result=='cancelled_order') {
        this.selectedStatus = 'cancel';
        this.orderStatusSubmit();
      }
    });
  }
  openDeliveryChargeDetails() {
    const dialog = this.dialog.open(DeliveryChargeDetails, {
      minHeight: '100px',
      minWidth: '300px',
      data: { payload: this.commercial_summary.delivery}
    });
  }
  openTaxChargeDetails() {
    const dialog = this.dialog.open(TaxChargeDetails, {
      minHeight: '100px',
      minWidth: '300px',
      data: { payload: this.commercial_summary}
    });
  }

  track( orderid ){
    console.log(orderid)
    this.store.dispatch(new TrackOrders({
      "id": orderid
    }));
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<div mat-dialog-content>
    <p>{{message}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button cdkFocusInitial (click)="cancelYes();">Yes</button>
    <button mat-button cdkFocusInitial (click)="cancelNo();">No</button>
  </div>`,
})
export class AdminCancellOrderMessageDialog {
  message = '';
  constructor(
    public dialogRef: MatDialogRef<AdminCancellOrderMessageDialog>,
    private router: Router, private apiMessageService: ApiMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.message = data.message;
  }
  cancelYes() {
    this.dialogRef.close('cancelled_order');
  }
  cancelNo() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'deliveryChargeDetails',
  templateUrl: 'delivery-charge-details.html',
})
export class DeliveryChargeDetails {
  chargeDetails: any;
  constructor(
    public dialogRef: MatDialogRef<DeliveryChargeDetails>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.chargeDetails = this.data.payload;
  }
}

@Component({
  selector: 'taxChargeDetails',
  templateUrl: 'tax-charge-details.html',
})
export class TaxChargeDetails {
  chargeDetails = [];
  constructor(
    public dialogRef: MatDialogRef<TaxChargeDetails>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.chargeDetails = this.data.payload;
  }
}


@Component({
  selector: 'status-model.html',
  templateUrl: './status-model.html'
})
export class DialogOverviewExampleDialog {
  newStatus: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {      
      // console.log( data )
      this.newStatus = this.data.status_change_to
    }

    response( response:boolean ): void {
    this.dialogRef.close( response );
  }

}