import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-delete-quicklink',
  templateUrl: './cell-renderer-delete-quicklink.component.html',
  styleUrls: ['./cell-renderer-delete-quicklink.component.css']
})
export class CellRendererDeleteQuicklinkComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }



  public deleteQuickLink() {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = {
        alldata: this.params.data
      }
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }

}
