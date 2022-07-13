import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ApproveRrejectDeliveryBoys } from '../../../../actions/merchant-management.actions';
import { Store } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-cell-renderer-delivery-boys-order',
  template: `
<a  mat-flat-button color="primary" matTooltip="View" aria-label="View"
class="btn-data btn-sm-data" (click)="goToDriverDetails()"><mat-icon>visibility</mat-icon></a>

  `,
  styleUrls: ['./cell-renderer-delivery-boys-order.component.css']
})
export class CellRendererDeliveryBoysOrderComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  status = null
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.data) {
      this.status = this.params.data.status
    }

    console.log('DATA', this.params.data)
  }
  constructor(public _route: Router, private store: Store<any>, ) { }

  refresh() {
    return false;
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
      this._route.navigate(['/merchant/driver-order-details', this.params.data.sales_seller_order_id])
    }
  }

}
