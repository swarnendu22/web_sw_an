import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { UpdateDeliveryBoyStatus, DeliveryBoyForceAction } from 'src/app/actions/delivery-boy-management.action';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-boy-action-popup',
  templateUrl: './delivery-boy-action-popup.component.html',
  styleUrls: ['./delivery-boy-action-popup.component.css']
})
export class DeliveryBoyActionPopupComponent implements OnInit {

  status = null;
  payload = null;
  comment = null;
  commentError = false;
  DE = 'INACTIVE';
  DE_ACTION = null;
  constructor(private store: Store<any>, public dialogRef: MatDialogRef<DeliveryBoyActionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private apiMsgService: ApiMessageService) {
    if (this.data.payload) {
      this.status = this.data.payload.status ? this.data.payload.status : this.data.payload.is_live ? 'FORCE_LOGIN' : 'FORCE_LOGOUT';
      this.payload = this.data.payload;
      this.DE = this.data.DE;
      this.DE_ACTION = this.data.DE_ACTION;

      console.log('DATA', this.data.payload, this.status, this.DE_ACTION);

    }
  }

  ngOnInit() {

  }

  submitDE() {
    this.payload['comment'] = this.comment;

    if (this.comment) {
      if (this.DE_ACTION === 'FORCE_LOGIN' || this.DE_ACTION === 'FORCE_LOGOUT') {
        this.payload['is_live'] = this.status === 'FORCE_LOGIN' ? true : false;
        this.store.dispatch(new DeliveryBoyForceAction(this.payload))
        this.apiMsgService.currentApiStatus.subscribe(data => {
          if (data.status && data.type === 'DELIVERY_BOY_FORCE_ACTION') {
            console.log('UPDATE_DELIVERY_BOY_STATUS', data, this.DE_ACTION)
            this.dialogRef.close();
          }
        });
      } else {
        this.payload['status'] = this.status;
        this.store.dispatch(new UpdateDeliveryBoyStatus(this.payload))
        this.apiMsgService.currentApiStatus.subscribe(data => {
          if (data.status && data.type === 'UPDATE_DELIVERY_BOY_STATUS') {
            console.log('UPDATE_DELIVERY_BOY_STATUS', data, this.DE_ACTION)
            this.dialogRef.close();
          }
        });
      }
      this.commentError = false
    } else {
      this.commentError = true
      console.log('Common error', this.commentError)
    }

    // this.apiMsgService.currentApiStatus.subscribe(data => {
    //   if (data.status && data.type === 'UPDATE_DELIVERY_BOY_STATUS') {
    //     console.log('UPDATE_DELIVERY_BOY_STATUS', data, this.DE_ACTION)
    //     this.dialogRef.close();
    //   }
    // });
  }

}
