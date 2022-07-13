import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { UpdateCommissionGroupTree } from '../../../../actions/commission-exception-management.action';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { ChangeSizeChart } from '../../../../actions/brand-management.actions';



@Component({
  selector: 'app-cell-renderer-change-sizechart-button',
  template: `
 
  <a mat-flat-button color="primary" matTooltip="Save" aria-label="Save" class="btn-data btn-sm-data green" (click)="onSave()"><mat-icon>save</mat-icon></a>
  <a mat-flat-button color="primary" matTooltip="Delete" aria-label="Delete" class="btn-data btn-sm-data red" ><mat-icon>delete</mat-icon></a>
`,
  styleUrls: ['./cell-renderer-change-sizechart-button.component.css']
})
export class CellRendererChangeSizechartButtonComponent implements ICellRendererAngularComp {

  private gridApi;
  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    // console.log(params.data);
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, private store: Store<any>, ) {
    console.log('vsjkvsjkv');
  }


  onClick($event) {

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
  onSave() {
    console.log('value');
    const rowvalue = this.params.data;
    if (rowvalue.isSizechartAvailable == 'Yes') {
      rowvalue.isSizechartAvailable = '1';
    }
    else {
      rowvalue.isSizechartAvailable = '0';
    }
    this.store.dispatch(new ChangeSizeChart({
      isSizechartAvailable: rowvalue.isSizechartAvailable,
      sizeChartUrl: rowvalue.sizechartUrl,
    }, rowvalue.id));

  }
  refresh() {
    return true;
  }


}
