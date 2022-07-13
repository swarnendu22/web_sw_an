import { Component, NgZone } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import qs from 'qs';

@Component({
  selector: 'app-cell-renderer-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" *ngIf="show" class="btn-data btn-sm-data" (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-button.component.css'],
})
export class CellRendererButtonComponent implements ICellRendererAngularComp {
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
  constructor(public _route: Router, private ngZone: NgZone) { }

  public invokeParentMethod() {
    this.ngZone.run(() => {
      this.id = typeof this.params.colDef.getIdByIndex == 'number' ? this.params.data[this.params.colDef.getIdByIndex] : this.params.data.id;
      let url = this._route.url.split('/').filter(Boolean);
      if(this.params.colDef.field == 'actionMerchant') {
        this._route.navigate([`merchant/merchant-info/${this.params.data.id}`]);
      }
      else if (this.params.data.exceptionType) {
        if (this.params.data.exceptionType == 'BRAND') {
          this._route.navigate([`category/exception/commission-exception/show/${this.id}`], {
            queryParams: {
              approveObj: qs.stringify({
                exceptiontype: 'b'
              }),
            }
          });
        }
        if (this.params.data.exceptionType == 'PRODUCT') {
          this._route.navigate([`category/exception/commission-exception/show/${this.id}`], {
            queryParams: {
              approveObj: qs.stringify({

                exceptiontype: 'p'
              }),
            }
          });
        }
      }
      else {
        url.push('show');
        url.push(this.id);
        this._route.navigate(url);
      }
    });
  }
  refresh() {
    return false;
  }
}
