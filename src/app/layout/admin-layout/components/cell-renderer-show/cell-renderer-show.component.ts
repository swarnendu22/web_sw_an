import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cell-renderer-show',
  template: `
  <a mat-flat-button color="primary" matTooltip="View" aria-label="View" *ngIf="show" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
`,
  styleUrls: ['./cell-renderer-show.component.css']
})
export class CellRendererShowComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    //console.log('PARAMS', this.params)
  }
  constructor(public _route: Router) { }

  public invokeParentMethod() {
    //console.log(this.params.colDef.getIdByIndex, this.params.data[0]);
    this.id = typeof this.params.colDef.getIdByIndex == 'number' ? this.params.data[this.params.colDef.getIdByIndex] : this.params.data.id;
    let url = this._route.url.split('/').filter(Boolean)
    //console.log(this.params.data.exceptionType);
    //console.log(url, this.id);
    url.push('show');
    url.push(this.id);

    this._route.navigate(url);
  }

  refresh() {
    return false;
  }




}
