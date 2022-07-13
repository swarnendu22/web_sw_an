import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApproveRejectPendingCatalog } from 'src/app/actions/catalog-management.action';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public store: Store<any>
  ) { }

  ngOnInit() {
  }
  onCancelClick() {
    this.dialogRef.close({ cancelClick: true });
  }
  requestProcess() {
    const { payload, type } = this.data;
    this.store.dispatch(new ApproveRejectPendingCatalog({ data: payload, type }));
    this.dialogRef.close({ cancelClick: false });
  }
}
