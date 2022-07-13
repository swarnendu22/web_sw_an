import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.css']
})
export class ApprovalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
  }
  onCancelClick() {
    this.dialogRef.close({ cancelClick: true });
  }
  requestProcess() {
    this.dialogRef.close({ cancelClick: false });
  }
}
