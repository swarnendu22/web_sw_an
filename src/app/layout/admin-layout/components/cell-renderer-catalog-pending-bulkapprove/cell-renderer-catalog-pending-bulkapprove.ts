import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetBulkUploadCatalog, BulkFileRetry } from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RejectCatalogBulkPendingComponent } from '../cell-renderer-catalog-pending-bulkreject/cell-renderer-catalog-pending-bulkreject.component';
import { RequestService } from '../../../../utils/request/request.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { PostvalidateBrand } from '../../../../actions/brand-management.actions';

@Component({
  selector: 'app-cell-renderer-catalog-pending-bulk-approve',
  templateUrl: './cell-renderer-catalog-pending-bulkapprove.html',
  styleUrls: ['./cell-renderer-catalog-pending-bulkapprove.css']
})
export class CellRendererCatalogPendingBulkApproveComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public data: any;
  agInit(params: any): void {
    this.params = params;
    this.data = params.data;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(
    public _route: Router, 
    public store: Store<any>, 
    public apiMessageService: ApiMessageService, 
    public dialog: MatDialog,
    public requestService: RequestService,
  ) { }

  downloadLog() {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/ndh-product/bulk-process/download-product-log-excel/${this.params.data.id}`, 'application/vnd.ms-excel')
      .subscribe(
      data => {
        saveAs(data, `Log_${moment(new Date()).format("DD-MM-YYYY LTS").replace(/[- ]/gm, "_")}.xlsx`);
      },
      error => console.error(error)
    );
  }
  refresh() {
    return false;
  }
  retryProcess() {
    const payload = {
      "fileBatchId": this.data.id
    }
    this.store.dispatch(new BulkFileRetry(payload))
  }
  convertLowerCase(str) {
    return str.toLowerCase();
  }
  async ValidateBulk() {
    let payload = {
      batchId: this.data.id
    }
    this.store.dispatch(new PostvalidateBrand(payload));
  }
}

@Component({
  selector: 'approve-reject-catalog-bulk-pending',
  templateUrl: 'approve-reject-catalog-bulk-pending.html',
})
export class ApproveORRejectCatalogBulkPendingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ApproveORRejectCatalogBulkPendingComponent>) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close({ cancelClick: true });
  }
  requestProcess() {
    this.dialogRef.close({ cancelClick: false });
  }


}
