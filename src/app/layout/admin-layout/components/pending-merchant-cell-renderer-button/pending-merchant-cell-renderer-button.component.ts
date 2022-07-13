import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-pending-merchant-cell-renderer-button',
  template: `
    <a mat-flat-button color="primary" matTooltip="View" aria-label="View" *ngIf="showBtns" class="btn-data btn-sm-data" (click)="invokeParentMethod('APPROVED')"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./pending-merchant-cell-renderer-button.component.css']
})
export class PendingMerchantCellRendererButtonComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public showBtns = true;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.data.createdBy === localStorage.getItem('ndh-admin-user-id')) {
      this.showBtns = false;
    }
  }
  constructor() { }

  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const { id, code, requestType, entityId, request, type } = this.params.data;
      const payload = {
        type: requestType,
        exceptiontype: type,
        entityId,
        requestObj: JSON.parse(request),
        apiObj: {
          id,
          requestId: code,
          approveStatus: type,
          remarks: `${type} Merchant`
        },
        allData: this.params.data
      };
      this.params.onActionBtnClick(payload);
    }
  }

  refresh() {
    return false;
  }
}
