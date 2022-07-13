import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cell-renderer-show-bulk-message-exception',
  template: `
    <a href="javascript:void(0);" (click)="showFullMessage()">{{invokeParentMethod()}}</a>
  `,
  styleUrls: ['./cell-renderer-show-bulk-message-exception.component.css']
})
export class CellRendererShowBulkMessageExceptionComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  exception = '';

  agInit(params: any): void {
    this.params = params;

    this.cell = { row: params.value, col: params.colDef.headerName };

  }
  constructor(public _route: Router) { }

  public invokeParentMethod() {

    if (this.params.data) {
      console.log(this.params.data['exception']);
      if (this.params.data['exception']) {
        const value = JSON.parse(this.params.data['exception']);
        this.exception = value[0].reason;
      }
    }

    return this.exception;
  }
  showFullMessage() {
    if (this.params.data) {
      if (this.params.data['exception']) {
        const value = JSON.parse(this.params.data['exception']);
        this.exception = value[0].reason;
        alert(this.exception);

      }
    }
  }

  refresh() {
    return false;
  }

}
