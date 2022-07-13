import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-boy-log',
  templateUrl: './delivery-boy-log.component.html',
  styleUrls: ['./delivery-boy-log.component.css']
})
export class DeliveryBoyLogComponent implements OnInit {

  deliveryLogs = []
  constructor(
    public dialogRef: MatDialogRef<DeliveryBoyLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deliveryLogs = this.data.payload;
  }

  ngOnInit() {
  }

}
