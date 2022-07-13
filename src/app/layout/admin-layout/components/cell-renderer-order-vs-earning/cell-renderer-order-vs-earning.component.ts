import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ApproveRrejectDeliveryBoys } from '../../../../actions/merchant-management.actions';
import { Store } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-cell-renderer-order-vs-earning',
  template: `
  <a  mat-flat-button color="primary" matTooltip="View" aria-label="Show Details"
    class="btn-data btn-sm-data" (click)="earningBreakup()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-order-vs-earning.component.css']
})
export class CellRendererOrderVsEarningComponent implements ICellRendererAngularComp {

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
  constructor(public _route: Router, private store: Store<any>, ) { }

  refresh() {
    return false;
  }

  selectDB() {
    if (this.params.onMultiSelect instanceof Function) {
      this.params.onMultiSelect(this.params.data)
    }
  }

  earningBreakup() {
    if (this.params.onActionBtnClick instanceof Function) {
      this.params.onActionBtnClick(this.params.data);
    }

  }

  goToDriverDetails() {
    if (this.params.onActionBtnClick instanceof Function) {
      this._route.navigate(['/delivery-boy/driver-details', this.params.data.id])
    }
  }

}
