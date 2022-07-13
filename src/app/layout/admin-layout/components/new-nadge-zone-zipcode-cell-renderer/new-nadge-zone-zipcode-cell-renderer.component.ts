import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RequestService } from 'src/app/utils/request/request.service';
import { map } from 'rxjs/internal/operators/map';
import { Store, select } from '@ngrx/store';

import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-nadge-zone-zipcode-cell-renderer',
  templateUrl: './new-nadge-zone-zipcode-cell-renderer.component.html',
  styleUrls: ['./new-nadge-zone-zipcode-cell-renderer.component.css']
})
export class NewNadgeZoneZipcodeCellRendererComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public type: string;
  public api: any;
  zipCode: any;
  isNew = false

  agInit(params: any): void {
    this.params = params;
    this.api = params.api;
    this.type = params.colDef.type;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (params.data.isNew) {
      this.zipCode = params.data.zipCode
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
      // if (data.type === 'NEW_NUPC_ADDED') {
      //   console.log('Toogle', data.type, data.status);
      //   this.zipCode = this.params.data.zipCode
      // }
    });
  }


  refresh() {
    return true;
  }

}
