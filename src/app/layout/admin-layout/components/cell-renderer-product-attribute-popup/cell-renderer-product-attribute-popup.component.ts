import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CancelOrderAdminComponent } from '../../order-management-system/popup-components/cancel-order-admin/cancel-order-admin.component';
// import { ChangeSellerAdminComponent } from '../../order-management-system/popup-components/change-seller-admin/change-seller-admin.component';
import { addZip } from '../../store-management/zip-code-management/add-new-zone/add-new-zone.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import {
  GetByIdProductAttributeValue,
  ResetGetByIdProductAttributeValue,
  ViewProductAttributeValue,
} from 'src/app/actions/storeManagement.action';
import { select, Store } from '@ngrx/store';
import { categoryState } from 'src/app/reducers/storemanagement.reducers';

@Component({
  selector: 'app-cell-renderer-product-attribute-popup',
  template: `
    <ng-container *ngIf="showView">
      <mat-icon style="font-size:24px; color: grey" (click)="viewPop($event)"
        >visibility</mat-icon
      >
    </ng-container>
  `,
  styleUrls: ['./cell-renderer-product-attribute-popup.component.css'],
})
export class CellRendererProductAttributePopupComponent implements OnInit {
  public params: any;
  public cell: any;
  public id: any;
  showView = false;
  attributePayload: any = null;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    this.showView =
      this.params.data.type === 'SELECT' || this.params.data.type === 'SWATCH'
        ? true
        : false;
  }
  constructor(
    public _route: Router,
    public dialog: MatDialog,
    private _store: Store<categoryState>
  ) { }

  ngOnInit() { }

  refresh() {
    return false;
  }

  viewPop(e) {
    this.dialog.open(viewProductAttributeData, {
      width: '800px',
      maxHeight: '500px',
      data: { payload: this.params.data.attribute.id },
    });
  }
  ngOnDestory() {
    this._store.dispatch(new ResetGetByIdProductAttributeValue());
  }
}

@Component({
  selector: 'view-product-attribute-data',
  templateUrl: 'view-product-attribute-data.html',
})
export class viewProductAttributeData implements OnInit {
  attributePayload: any = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _store: Store<categoryState>
  ) {
    this._store.dispatch(new ResetGetByIdProductAttributeValue());
    this._store.dispatch(new ViewProductAttributeValue(this.data.payload));
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributePayload = res['viewProductAttributeValue'];
      console.log('Da', this.data.payload);
    });
  }
  ngOnDestory() {
    this.data = null;
    this._store.dispatch(new ResetGetByIdProductAttributeValue());
  }
}
