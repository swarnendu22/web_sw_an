import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-manage-delivery-request-action',
  template: `<a mat-flat-button color="primary" matTooltip="View" aria-label="View"  class="btn-data btn-sm-data" (click)="invokeParentMethod('VIEW')"><mat-icon>visibility</mat-icon></a>`,
  styleUrls: ['./manage-delivery-request-action.component.css']
})
export class ManageDeliveryRequestActionComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }

  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = {
        alldata: {
          id: this.params.data.request['id'],
          code: this.params.data['code']
        }
      };
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }
}
