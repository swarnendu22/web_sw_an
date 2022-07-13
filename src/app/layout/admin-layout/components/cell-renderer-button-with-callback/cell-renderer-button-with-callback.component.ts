/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell-renderer-button-with-callback',
  templateUrl: './cell-renderer-button-with-callback.component.html',
  styleUrls: ['./cell-renderer-button-with-callback.component.css']
})
export class CellRendererButtonWithCallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */


import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cell-renderer-button-with-callback',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-button-with-callback.component.css']
})
export class CellRendererButtonWithCallbackComponent implements ICellRendererAngularComp {
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
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }
}

