import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cel-renderer-view-compliance',
  templateUrl: './cel-renderer-view-compliance.component.html',
  styleUrls: ['./cel-renderer-view-compliance.component.css']
})
export class CelRendererViewComplianceComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }


  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const { complianceType, id } = this.params.data;
      const payload = {
        complianceType, id
      };
      this.params.onActionBtnClick(payload);
    }
  }

  addCompliance() {
    const complianceType = this.params.data.complianceType
  }

  refresh() {
    return false;
  }

}