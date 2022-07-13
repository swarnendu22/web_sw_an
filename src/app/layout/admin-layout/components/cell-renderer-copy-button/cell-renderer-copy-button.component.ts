import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { UpdateCommissionGroupTree } from '../../../../actions/commission-exception-management.action';
import { Store } from '../../../../../../node_modules/@ngrx/store';



@Component({
  selector: 'app-cell-renderer-copy-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="Copy" aria-label="Copy" class="btn-data btn-sm-data" (click)="onClick($event)"><i class="fa fa-clone" aria-hidden="true"></i></a>
    <a mat-flat-button class="btn-data btn-sm-data green" matTooltip="Save" aria-label="Save" (click)="onSave($event)">Save</a>
  `,
  styleUrls: ['./cell-renderer-copy-button.component.css'],

})
export class CellRendererCopyButtonComponent implements ICellRendererAngularComp {
  private gridApi;
  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    // console.log(params.data);
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, private store: Store<any>, ) { }

  public copyRowData() {
    this.gridApi = this.params.data;
    console.log('route', this.params.data);
    // var res = this.gridApi.updateRowData({ add: this.params.data });
    // this._route.navigate([this._route.url, 'show', +this.params.data.id]);

  }
  onClick($event) {
    console.log("Value:::::::::::::::");
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        id: this.params.rowIndex
        // ...something
      }
      this.params.onClick(params);

    }
  }
  onSave($event) {
    console.log("Value:::::::::::::::");

    const rowvalue = this.params.data;
    if (rowvalue.type == 'Fixed') {
      rowvalue.type = 'f';
    }
    else {
      rowvalue.type = 'p';
    }

    rowvalue.affectFrom = new Date(rowvalue.affectFrom)
    rowvalue.expiryDate = new Date(rowvalue.expiryDate)
    console.log("RowData:::::::::::::::", rowvalue);

    if (rowvalue.id) {
      this.store.dispatch(new UpdateCommissionGroupTree(rowvalue, 'put'));
    }
    else {
      this.store.dispatch(new UpdateCommissionGroupTree(rowvalue, 'post'));
    }
  }
  refresh() {
    return true;
  }

}
