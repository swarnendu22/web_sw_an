import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cell-renderer-pending-order-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" class="btn-data btn-sm-data" (click)="orderDetails()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-pending-order-button.component.css'],
})
export class CellRendererPendingOrderButtonComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  agInit(params: any): void {
    this.params = params;
    console.log("Params11111111111:::::::::::", this.params)
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router) { }

  public orderDetails() {
    console.log('Order details..................')
  }

  refresh() {
    return false;
  }
}
