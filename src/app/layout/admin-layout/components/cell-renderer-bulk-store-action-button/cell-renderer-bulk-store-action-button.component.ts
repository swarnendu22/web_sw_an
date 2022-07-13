import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-bulk-store-action-button',
  template: `
  <a mat-flat-button color="primary" matTooltip="Download Log" aria-label="Download Log"  class="btn-data btn-sm-data" (click)="downloadLog()"><mat-icon>cloud_download</mat-icon></a>

`,
  styleUrls: ['./cell-renderer-bulk-store-action-button.component.css']
})
export class CellRendererBulkStoreActionButtonComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, public store: Store<any>, public apiMessageService: ApiMessageService, public dialog: MatDialog,

  ) { }


  downloadLog() {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/store-management/v2/admin/bulk-process/download-store-log-excel/${this.params.data.id}`,
      'application/vnd.ms-excel'
    )
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

}
