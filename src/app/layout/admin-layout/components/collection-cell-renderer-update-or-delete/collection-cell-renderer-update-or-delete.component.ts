import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RequestService } from 'src/app/utils/request/request.service';
import { map } from 'rxjs/internal/operators/map';
import { Store, select } from '@ngrx/store';

import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeleteProductOnCollection } from 'src/app/actions/collections.action';
@Component({
  selector: 'app-collection-cell-renderer-update-or-delete',
  templateUrl: './collection-cell-renderer-update-or-delete.component.html',
  styleUrls: ['./collection-cell-renderer-update-or-delete.component.css']
})
export class CollectionCellRendererUpdateOrDeleteComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public type: string;
  public api: any;
  isEditParent = false;
  isNew = false

  agInit(params: any): void {
    this.params = params;
    this.api = params.api;
    this.type = params.colDef.type;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (params.colDef.type == 'ADD_COLLECTION_PRODUCT') {
      this.type = params.colDef.type
      this.isNew = true
      this.isEditParent = true
    } else if (params.colDef.type == 'EDIT_COLLECTION_TOGGLE') {
      this.type = params.colDef.type
    }
  }
  constructor(
    private apiMessageService: ApiMessageService,
    private _store: Store<any>,
    private _api: RequestService,
    public dialog: MatDialog
  ) {
    this.apiMessageService.currentApiStatus.subscribe(data => {
      // console.log('Update Button', data.type);
      if (data.type === 'EDIT_COLLECTION_TOGGLE') {
        console.log('Toogle', data.type, data.status);
        this.isEditParent = data.status;
      }
    });
  }


  async invokeParentMethod(event) {
    // console.log('Update Button', this.params);
    switch (this.type) {
      case 'ZONE_ZIPCODE_UPDATE':
        console.log('Zipcode Button', this.params.data);
        if (this.params.onUpdateClick instanceof Function) {
          // put anything into params u want pass into parents component
          console.log('FULFILLMENT_ZONE_UPDATE', this.params.data);
          const params = {
            rowData: this.params.node.data,
            id: this.params.rowIndex,
            data: this.params.data,
            // ...something
          };
          this.params.onUpdateClick(params);
        }
        break;
      default: {
        console.log('Default Update');
      }
    }
    // Group ID
  }

  delete($event) {
    switch (this.type) {
      case 'ADD_COLLECTION_PRODUCT':
        let deleteDialogRefCollectionAdd = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Product' } },
        });
        deleteDialogRefCollectionAdd.afterClosed().subscribe(result => {
          console.log('Collection  add result delete', result);
          if (result) {
            // this._store.dispatch(new DeleteZipCode(this.params.data['id']));
            if (this.params.onDeleteClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onDeleteClick(params);
            } else {
              console.log('Collection result delete', this.params.onDeleteClick);
            }
          }
        })
        break;

      case 'EDIT_COLLECTION_TOGGLE':
        let deleteDialogRefCollectionEdit = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Product' } },
        });
        deleteDialogRefCollectionEdit.afterClosed().subscribe(result => {
          console.log('Collection Edit result delete', result);
          if (result) {
            // this._store.dispatch(new DeleteProductOnCollection(this.params.data['id']))
            // this._store.dispatch(new DeleteZipCode(this.params.data['id']));
            if (this.params.onDeleteClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onDeleteClick(params);
            } else {
              console.log('Collection result delete', this.params.onDeleteClick);
            }
          }
        })
        break;

      default: {
        console.log('Default Update');
      }
    }
  }


  refresh() {
    return true;
  }


}
