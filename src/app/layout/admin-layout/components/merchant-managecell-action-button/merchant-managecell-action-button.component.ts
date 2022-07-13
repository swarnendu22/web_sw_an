import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-merchant-managecell-action-button',
  templateUrl: './merchant-managecell-action-button.component.html',
  styleUrls: ['./merchant-managecell-action-button.component.css']
})
export class MerchantManagecellActionButtonComponent implements ICellRendererAngularComp {

  public params:any;
  public cell:any;

  constructor() { }

  agInit(params:any):void {
      this.params = params;
      this.cell = {row: this.params.value, col: this.params.colDef.headerName}
  }

  
  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick[0] instanceof Function) {
      const { id, geoLat, geoLong, type } = this.params.data;
      const payload = {
        storeId:id,
        latitude:geoLat,
        longitude:geoLong,
        type,
        alldata : this.params.data
      };
      this.params.onActionBtnClick[0](payload);
    }
  }

  public rejectApproveOperation(type){
    if(confirm("Do you want to reject this store?")) {
      if(this.params.onActionBtnClick[1] instanceof Function){
        const payload = {
          paramData : this.params.data,
          actionType : type
        }
        this.params.onActionBtnClick[1](payload);
      }
    }
  }

  refresh() {
    return false;
  }

}
