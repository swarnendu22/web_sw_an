import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-delete-cell-renderer-button',
  template: `
  <a mat-flat-button color="primary" class="btn-data" (click)="invokeParentMethod()">Update</a>
`,
  styleUrls: ['./delete-cell-renderer-button.component.css']
})
export class DeleteCellRendererButtonComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    // console.log(params.data);
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor() { }

  public invokeParentMethod() {
    // Group ID
    this.id = this.params.data.id;
    console.log('Pra', this.params, this.cell, this.id);
  }

  refresh() {
    return false;
  }

}
