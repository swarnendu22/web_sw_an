import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-details-approve-reject-popup',
  templateUrl: './driver-details-approve-reject-popup.component.html',
  styleUrls: ['./driver-details-approve-reject-popup.component.css']
})
export class DriverDetailsApproveRejectPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DriverDetailsApproveRejectPopupComponent>
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log('Ng', this.data);
    }
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

}
