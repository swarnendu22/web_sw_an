import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cell-renderer-category-view-button',
  template: `
    <a mat-flat-button matTooltip="View" aria-label="View" color="primary"*ngIf="show" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-category-view-button.component.css']
})
export class CellRendererCategoryViewButtonComponent implements ICellRendererAngularComp {
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
    console.log(this.params.colDef.getIdByIndex, this.params.data[0]);
    this.id = typeof this.params.colDef.getIdByIndex == 'number' ? this.params.data[this.params.colDef.getIdByIndex] : this.params.data.id;
    let url = this._route.url.split('/').filter(Boolean)
    console.log(this.params.data.exceptionType);
    if (this.params.data.exceptionType) {
      if (this.params.data.exceptionType == 'CATEGORY') {
        // url=(url).split('/').filter(Boolean);
        this._route.navigate([`category/exception/commission-exception/show/${this.id}`]);
      }

      if (this.params.data.exceptionType == 'PRODUCT') {

        this._route.navigate([`category/exception/product-exception/show/${this.id}`]);

      }
    }
    else {
      let temp = url.splice(-1)[0];
      let tempUrl = temp.split('?');

      url.push(tempUrl[0]);
      url.push('show');
      url.push(this.id);
      let finalUrl = url.join("/");
      this._route.navigate([finalUrl]);
    }
  }
  refresh() {
    return false;
  }
}
