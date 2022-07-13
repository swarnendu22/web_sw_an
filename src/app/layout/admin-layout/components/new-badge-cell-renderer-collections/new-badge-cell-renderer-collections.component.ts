import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RequestService } from 'src/app/utils/request/request.service';
import { map } from 'rxjs/internal/operators/map';
import { Store, select } from '@ngrx/store';

import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-new-badge-cell-renderer-collections',
  templateUrl: './new-badge-cell-renderer-collections.component.html',
  styleUrls: ['./new-badge-cell-renderer-collections.component.css']
})
export class NewBadgeCellRendererCollectionsComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public type: string;
  public api: any;
  nupc: any;
  isNew = false

  agInit(params: any): void {
    this.params = params;
    this.api = params.api;
    this.type = params.colDef.type;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (params.data.isNew) {
      this.nupc = params.data.nupc
      this.isNew = true
    }
  }
  constructor(
    private apiMessageService: ApiMessageService,
    private _store: Store<any>,
    private _api: RequestService,
    public dialog: MatDialog
  ) {
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'NEW_NUPC_ADDED') {
        console.log('Toogle', data.type, data.status);
        this.nupc = this.params.data.nupc
      }
    });
  }


  refresh() {
    return true;
  }


}
