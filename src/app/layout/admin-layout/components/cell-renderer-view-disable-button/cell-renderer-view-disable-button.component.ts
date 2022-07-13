import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cell-renderer-view-disable-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
     &nbsp;&nbsp;&nbsp;
    <a mat-flat-button color="warn" matTooltip="Disable" aria-label="Disable" class="btn-data btn-sm-data red" (click)="invokeDisableMethod()">{{params.colDef.btnName}}</a>
  `,
  styleUrls: ['./cell-renderer-view-disable-button.component.css']
})
export class CellRendererViewDisableButtonComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router) { }
  public invokeParentMethod() {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = this.params.data;
      this.params.onActionBtnClick(payload, this.params);
    }
  }

  public invokeDisableMethod() {
    if (this.params.onDisableBtnClick instanceof Function) {
      const payload = this.params.data;
      this.params.onDisableBtnClick(payload, this.params);
    }
  }

  refresh() {
    return false;
  }
}
