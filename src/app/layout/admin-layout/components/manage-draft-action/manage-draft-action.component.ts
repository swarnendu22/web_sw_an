import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-manage-draft-action',
  template: `<a mat-flat-button color="primary" matTooltip="View" aria-label="View"  class="btn-data btn-sm-data" (click)="invokeParentMethod('VIEW')"><mat-icon>visibility</mat-icon></a>`,
  styleUrls: ['./manage-draft-action.component.css']
})
export class ManageDraftActionComponent implements ICellRendererAngularComp {

  

  public params:any;
  public cell:any;

  constructor() { }

  agInit(params:any):void {
      this.params = params;
      this.cell = {row: this.params.value, col: this.params.colDef.headerName}
  }

  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = {
        alldata : this.params.data
      };
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }

}
