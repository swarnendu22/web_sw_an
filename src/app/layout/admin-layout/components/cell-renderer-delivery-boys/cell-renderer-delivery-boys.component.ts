import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ApproveRrejectDeliveryBoys } from '../../../../actions/merchant-management.actions';
import { Store } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-cell-renderer-delivery-boys',
  //   template: `
  // <a  mat-flat-button color="primary" matTooltip="View" aria-label="Show Details"
  // class="btn-data btn-sm-data" (click)="goToDriverDetails()"><mat-icon>visibility</mat-icon></a>
  //   `,
  template: `
  <section class="DB-section">
  <mat-checkbox
      color="primary"
      (change)="checkCheckBoxvalue($event)"
      labelPosition="after" *ngIf="status=='VERIFIED' || status=='MERCHANDISHED'">

<a href="javascript:void(0)"(click)="goToDriverDetails()">{{registration_number}}</a>

    
  </mat-checkbox>
<a href="javascript:void(0)" *ngIf="status!='VERIFIED' && status!='MERCHANDISHED'"(click)="goToDriverDetails()">{{registration_number}}</a>
</section>
  `,
  styleUrls: ['./cell-renderer-delivery-boys.component.css']
})
export class CellRendererDeliveryBoysComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public registration_number: any;
  public show = true;
  public checked = false
  status = null
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.data) {
      this.status = this.params.data.status
      this.id = this.params.data.id
      this.registration_number = this.params.data.registration_number
    }

    // console.log('DATA', this.params)
  }
  constructor(public _route: Router, private store: Store<any>, ) { }

  refresh() {
    return false;
  }

  public checkCheckBoxvalue(event) {
    if (this.params.onMultiSelect instanceof Function) {
      const payload = {
        checkBoxValue: event.checked,
        alldata: this.params.data
      }
      this.params.onMultiSelect(payload);
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

    if (this.status == 'TRAINING') {
      this.params.openDeliverySchedule({ alldata: this.params.data });

    }
    else if (this.status == 'CERTIFIED') {
      this.params.openeDeMerchandise({ alldata: this.params.data });
    }
    else {
      console.log("Route in driver details", this._route.url + '/driver-details', this.params.data.id);
      console.log("Case in driver details", this._route.url.substring(this._route.url.lastIndexOf('/') + 1, this._route.url.length));
      let route_url = this._route.url.split('?')[0]
      const caseExpressionURL = route_url.substring(route_url.lastIndexOf('/') + 1, route_url.length);
      // const caseExpressionURL = route_url.substring(route_url.lastIndexOf('/') + 1, route_url.length);
      switch (caseExpressionURL) {
        case 'approved-delivery-boy': {
          this._route.navigate([route_url + '/driver-details', this.params.data.id, this.status]);
          break;
        }
        case 'inactive-delivery-boy': {
          this._route.navigate([route_url + '/driver-details', this.params.data.id, this.status]);
          break;
        }
        case 'pending-delivery-boy': {
          this._route.navigate([route_url + '/driver-details', this.params.data.id, this.status]);
          break;
        }
        default: {
          this._route.navigate(['/delivery-boy/driver-details', this.params.data.id, this.status]);
          break;
        }
      }

    }


  }
}
