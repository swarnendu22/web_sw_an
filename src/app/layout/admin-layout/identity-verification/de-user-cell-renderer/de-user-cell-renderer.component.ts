import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-de-user-cell-renderer',
  // templateUrl: './de-user-cell-renderer.component.html',
  template: `
  <a  mat-flat-button color="primary" matTooltip="View" aria-label="Show Details"
  class="btn-data btn-sm-data" (click)="goToDriverDetails()"><mat-icon>visibility</mat-icon></a>
    `,
  styleUrls: ['./de-user-cell-renderer.component.css']
})
export class DeUserCellRendererComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  public checked = false
  status = null
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.data) {
      this.status = this.params.data.status
      this.id = this.params.data.id
    }

    // console.log('DATA', this.params.data)
  }
  constructor(public _route: Router, private store: Store<any>) { }

  refresh() {
    return false;
  }

  selectDB() {
    if (this.params.onMultiSelect instanceof Function) {
      this.params.onMultiSelect(this.params.data)
    }
  }

  rejectApproveOperation(status) {
    if (this.params.onActionBtnClick instanceof Function) {
      const payload = {
        id: this.params.data.id,
        status: status
      };
      this.params.onActionBtnClick(payload);
    }

  }

  goToDriverDetails() {
    if (this.params.onActionBtnClick instanceof Function) {
      this._route.navigate(['/delivery-boy/driver-details', this.params.data.id])
    }
  }
}
