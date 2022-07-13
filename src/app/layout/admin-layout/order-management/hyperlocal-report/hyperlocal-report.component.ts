import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { changeOrderStatus } from 'src/app/utils/orderdetailFunction';
import { GetAllHyperLocalOrdersDetail, ActionTypes, GetAllOrdersDetail, PostOrderStatusUpdate, TrackOrders } from 'src/app/actions/order-management-apa.action';
import { CancelShipmentReasonComponent } from '../cancel-shipment-reason/cancel-shipment-reason.component';
import { DeliveryChargeDetails, DialogOverviewExampleDialog, TaxChargeDetails } from '../order-details/order-details.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-hyperlocal-report',
  templateUrl: './hyperlocal-report.component.html',
  styleUrls: ['./hyperlocal-report.component.css']
})
export class HyperlocalReportComponent implements OnInit {

  allOrdersDetail = null
  customer_info = null
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
  sub_order_no = null;
  placed_at = null;
  storeShipmentDetails = null;
  storeInfo = null;
  cancelOrder: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<HyperlocalReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
  ) { 

    this.store.dispatch(new GetAllOrdersDetail(this.data.id));
    this.storeShipmentDetails = this.data.allOrdersDetails;    
    // console.log( this.data );
    if(this.data.delivery_type == 'STORE_PICKUP') {
      this.delivery_type = 'STORE PICKUP';
      this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/self_pickup_order.svg';
    } else {
      this.delivery_type = 'HOME DELIVERY';
      this.delivery_icon = 'https://ndh.imgix.net/ndh-assets/img/delivery_order.svg';
    }
    this.track( data.id );
    // this.store.dispatch( new GetAllHyperLocalOrdersDetail( {ndh_Order_Id: data.id} ));
    // this.apiMessageService.currentApiStatus.subscribe((data:any) => {
    //   if (data.status === true && data.type ==  ActionTypes.getAllHyperLocalOrdersDetail ) {
    //     console.log( data.payload );
    //   }
    // });    
  }

  ngOnInit(): void {
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

          this.payment_mode = res.allOrdersDetail.payment_method ? res.allOrdersDetail.payment_method : null;
          this.transaction_details = res.allOrdersDetail.bag.payments.online.length !==0 ? res.allOrdersDetail.bag.payments.online : null;
          this.order_items = res.allOrdersDetail.cart.items ? res.allOrdersDetail.cart.items : null;
          this.final_total = res.allOrdersDetail.final_total ? res.allOrdersDetail.final_total : null;
          this.sub_order_no = res.allOrdersDetail.display_order_number ? res.allOrdersDetail.display_order_number : null;
          this.orderStatus = res.allOrdersDetail.status;
          this.placed_at = new Date(res.allOrdersDetail.placed_at);
        }

      });
  }

  track( orderid ){
    this.store.dispatch(new TrackOrders({
      "id": orderid
    }));
  }
  
  statusSUbmit: boolean = false;
  onStatusChange( value ){
    if( value ){
      this.statusSUbmit = true;
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
  
  // cancelOrderSipment(){
  //   const dialog = this.dialog.open(CancelShipmentReasonComponent, {
  //     width: '400px',
  //     disableClose: true,
  //     data: { id: this.storeShipmentDetails.orderId },
  //   })
  //   dialog.afterClosed().subscribe(result => {
  //     this.cancelOrder = result;
  //   });
  // }

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
  closeDialog(){
    this.dialogRef.close( this.cancelOrder );
  }

  manifestlink( url ){
    window.open( url,'_blank');
  }

}
