import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.css']
})
export class ShipmentDetailsComponent implements OnInit {
  ordersDetail = null;
  customerInfo = null;
  storeInfo = null;
  constructor(
    public dialogRef: MatDialogRef<ShipmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog
  ) {
    this.ordersDetail = this.data.allOrdersDetail;
    
  }

  ngOnInit() {
    this.customerInfo = JSON.parse(this.data.allOrdersDetail.customerInfo);
    this.storeInfo = JSON.parse(this.data.allOrdersDetail.storeInfo);
    // console.log(this.storeInfo)
  }
}