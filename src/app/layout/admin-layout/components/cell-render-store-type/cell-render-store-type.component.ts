import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { 
  UpdateMerchantType
 } from '../../../../actions/merchant-management.actions';
 import { Store } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-cell-render-store-type',
  templateUrl: './cell-render-store-type.component.html',
  styleUrls: ['./cell-render-store-type.component.css']
})
export class CellRenderStoreTypeComponent implements ICellRendererAngularComp {
  public params:any;
  storeType = '';
  storeId = '';

  constructor(private store: Store<any>) {
  }

  agInit(params:any):void {
    this.params = params;
    this.storeType = this.params.data.storeType;
    this.storeId = this.params.data.id;
  }
  onStoreTypeChange() {
    let payloadStoreType = {
      storeType: this.storeType,
      id: this.storeId
    }
    this.store.dispatch(new UpdateMerchantType(payloadStoreType));
  }
  refresh() {
    return false;
  }
}
