import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-delivery-partner',
  templateUrl: './edit-delivery-partner.component.html',
  styleUrls: ['./edit-delivery-partner.component.css']
})
export class EditDeliveryPartnerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditDeliveryPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log( this.data );
   }

  ngOnInit(): void {
  }

  UpdateDeliveryPartner( DeliveryPartner ){
    if( DeliveryPartner !== ""){
      let data = {
        newDeliveryPartner: DeliveryPartner.toUpperCase()
      }
      this.dialogRef.close( data );
    }
    
  }

}
