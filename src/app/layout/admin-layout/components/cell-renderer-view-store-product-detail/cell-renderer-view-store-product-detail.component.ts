import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-view-store-product-detail',
  templateUrl: './cell-renderer-view-store-product-detail.component.html',
  styleUrls: ['./cell-renderer-view-store-product-detail.component.css']
})
export class CellRendererViewStoreProductDetailComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }


  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const { id, storeId, status, approvalFor } = this.params.data;
      const payload = {
        id: id,
        storeId: storeId,
        status: status,
        approvalFor: approvalFor,

      };
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }

}

