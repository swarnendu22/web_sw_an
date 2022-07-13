
import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetBulkUploadCatalog, RejectBulkPendingCatatlog } from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cell-renderer-catalog-pending-bulkreject',
  template: `
    <a mat-flat-button color="warn" matTooltip="Reject" aria-label="Reject" *ngIf="params.data.status=='PENDING' && params.data.sellerId!=0" class="btn-data btn-sm-data red" (click)="invokeParentMethod()"><mat-icon>clear</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-catalog-pending-bulkreject.component.css']
})
export class CellRendererCatalogPendingBulkrejectComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, public store: Store<any>, public apiMessageService: ApiMessageService, public dialog: MatDialog,

  ) { }
  public invokeParentMethod() {
    const dialog = this.dialog.open(RejectCatalogBulkPendingComponent, {
      width: '300px',
      data: {
        id: this.params.data.id
      }
    });

  }

  refresh() {
    return false;
  }

}


@Component({
  selector: 'reject-catalog-bulk-pending',
  template: `<mat-dialog-content>
  <p>Reason to Reject</p>
  <mat-form-field appearance="outline">

            <input matInput [(ngModel)]="remarks">
          </mat-form-field>
</mat-dialog-content>
<mat-dialog-actions align="end">

  <button mat-button [mat-dialog-close]="true" (click)="onCancelClick()">Cancel</button>
  <button mat-flat-button color="primary" cdkFocusInitial [mat-dialog-close]="true" (click)="rejectProcess()">Reject</button>
</mat-dialog-actions>`,
})
export class RejectCatalogBulkPendingComponent implements OnInit {
  remarks = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RejectCatalogBulkPendingComponent>,
    public store: Store<any>
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close({ cancelClick: true });
  }
  rejectProcess() {
    this.dialogRef.close({ cancelClick: false });
    console.log(this.data.id);
    this.store.dispatch(new RejectBulkPendingCatatlog({
      fileId: this.data.id,
      remarks: this.remarks,
    }));
  }
}