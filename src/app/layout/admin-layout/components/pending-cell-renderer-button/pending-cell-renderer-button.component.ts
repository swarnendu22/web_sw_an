import { Component, NgZone } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cell-renderer-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
    <a mat-flat-button color="warn" matTooltip="Disable" aria-label="Disable" class="btn-data btn-sm-data red" (click)="invokeParentMethod()"><mat-icon>block</mat-icon></a>
  `,
  styleUrls: ['./pending-cell-renderer-button.component.css'],
})
export class PendingCellRendererButtonComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, private ngZone: NgZone) { }

  public invokeParentMethod() {
    this.ngZone.run(() => {
      this.id = typeof this.params.colDef.getIdByIndex == 'number' ? this.params.data[this.params.colDef.getIdByIndex] : this.params.data.id;
      let url = this._route.url.split('/').filter(Boolean)
      url.push('show');
      url.push(this.id);
      this._route.navigate(url);
    });
  }
  refresh() {
    return false;
  }
}
