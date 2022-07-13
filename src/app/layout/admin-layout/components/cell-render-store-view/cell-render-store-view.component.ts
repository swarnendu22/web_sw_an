import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { environment } from '../../../../../environments/environment.prod'

@Component({
  selector: 'app-cell-render-store-view',
  templateUrl: './cell-render-store-view.component.html',
  styleUrls: ['./cell-render-store-view.component.css']
})
export class CellRenderStoreViewComponent implements ICellRendererAngularComp {
  public params:any;
  storePublicUrl = '';
  constructor() { }

  agInit(params:any):void {
    this.params = params;
    this.storePublicUrl =  `${this.params.data.storeExternalURL}`;
  }
  refresh() {
    return false;
  }
}