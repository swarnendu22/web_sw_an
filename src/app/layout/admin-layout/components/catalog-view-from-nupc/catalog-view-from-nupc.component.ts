import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-catalog-view-from-nupc',
  templateUrl: `catalog-view-from-nupc.component.html`,
  styleUrls: ['./catalog-view-from-nupc.component.css']
})
export class CatalogViewFromNupcComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.colDef.checkForShow) {
      const checkData = this.params.colDef.checkForShow;
      this.show = (this.params.data[checkData.checkForShowKey] === checkData.checkForShowValue) ? true : false;

    }
  }
  constructor(public _route: Router) { }

  public invokeParentMethod() {
    this.id = this.params.data[1];



    // url.push('show');
    // url.push(this.id);
    let url = `/catalog/manage-master-catalog/show/${this.id}`;
    window.open(url, '_blank');
    // this._route.navigate(url);



  }

  refresh() {
    return false;
  }

}
