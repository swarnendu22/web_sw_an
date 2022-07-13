import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cell-render-checkbox',
  templateUrl: './cell-render-checkbox.component.html',
  styleUrls: ['./cell-render-checkbox.component.css']
})
export class CellRenderCheckboxComponent implements ICellRendererAngularComp {

  public params:any;
  public cell:any;

  constructor() { }

  agInit(params:any):void {
      this.params = params;
      this.cell = {row: this.params.value, col: this.params.colDef.headerName}
  }



  public checkCheckBoxvalue(event) {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = {
        checkBoxValue:event.checked,
        alldata : this.params.data
      }
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }


}
