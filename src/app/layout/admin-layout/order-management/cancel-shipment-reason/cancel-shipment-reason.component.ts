import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { CancelOrderShipment, ActionTypes } from '../../../../actions/order-management-apa.action';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-cancel-shipment-reason',
  templateUrl: './cancel-shipment-reason.component.html',
  styleUrls: ['./cancel-shipment-reason.component.css']
})
export class CancelShipmentReasonComponent implements OnInit {
  id = null;
  subscriptionApi: Subscription;
  cancelReason = null;
  constructor(
    public dialogRef: MatDialogRef<CancelShipmentReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }
  submitCancelReason() {
    if(this.cancelReason !=null) {
      this.store.dispatch(new CancelOrderShipment({id: this.id, reason: this.cancelReason}));
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
        if (data.status === true && data.type ==  ActionTypes.cancelOrderShipment) {
          this.dialogRef.close( true );
        }
      });
    }
    else {
      this.toastr.error('Please enter cancel reason.');
    }
  }
  closeCancelModal() {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }
}
