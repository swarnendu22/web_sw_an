import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-view-order-details-apa',
  templateUrl: './cell-renderer-view-order-details-apa.component.html',
  styleUrls: ['./cell-renderer-view-order-details-apa.component.css']
})
export class CellRendererViewOrderDetailsApaComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  orderno = null
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
    this.orderno = this.params.data.sub_order_no
  }


  public invokeParentMethod() {
    if (this.params.onActionBtnClick instanceof Function) {
      const { id } = this.params.data;
      const payload = {
        id: id,
      };
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }


}
