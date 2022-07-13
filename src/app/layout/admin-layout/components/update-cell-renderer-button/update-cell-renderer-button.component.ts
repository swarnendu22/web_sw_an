import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RequestService } from 'src/app/utils/request/request.service';
import { map } from 'rxjs/internal/operators/map';
import { Store, select } from '@ngrx/store';
import {
  PutAttributeGroup,
  UpdateZone,
  DeleteZone,
  UpdateZipCode,
  DeleteZipCode,
  CheckAttributeGroupName,
  DeleteAttributeGroupName,
  UpdateZoneFulfillmentCenterById,
  DeleteZoneByFulfillmentCenterId,
  UpdateZipcodeByDeliveryCenterId,
  DeleteZipcodeByDeliveryCenterId,
} from 'src/app/actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-cell-renderer-button',
  template: `
    <button
      mat-flat-button
      color="primary"
      class="btn-data"
      (click)="invokeParentMethod($event)"
      [disabled]="!isEditParent"
    >
    {{newZoneZipCode ? 'Edit': 'Edit'}}
    </button>
    <button
      mat-flat-button
      color="warn"
      class="btn-data"
      (click)="delete($event)"
      [disabled]="!isEditParent"
    >
      Delete
    </button>
  `,
  styleUrls: ['./update-cell-renderer-button.component.css'],
})
export class UpdateCellRendererButtonComponent
  implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public type: string;
  api: any;
  isExit = null;
  isEdit = false;
  cellPayload = null;
  isEditParent = false;
  show = false;
  newZoneZipCode = false;
  agInit(params: any): void {
    this.params = params;
    this.api = params.api;
    this.type = params.colDef.type;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (params.colDef.type == 'ADD_ZONE_ZIPCODE') {
      this.type = params.colDef.type;
      this.newZoneZipCode = true
      this.isEditParent = true

    }
  }
  constructor(
    private apiMessageService: ApiMessageService,
    private _store: Store<any>,
    private _api: RequestService,
    public dialog: MatDialog

  ) {
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'TOGGLE_FULFILLMENT_CENTER') {
        console.log('Toogle', data.type, data.status);
        this.isEditParent = data.status;
      }
      if (data.type === 'TOGGLE_DELIVERY_CENTER') {
        this.isEditParent = data.status;
      }

      if (data.type === 'EDIT_ZONE_TOGGLE') {
        this.isEditParent = data.status;
      }
      if (data.type === 'UPDATE_USER_BY_ZONEID') {
        this.isEditParent = true;
      }

      if (data.type === 'EDIT_ZONE') {
        console.log('Change', data.payload, this.params.data);
        const changedValue = data.payload['data']['id'];
        const currValue = this.params.data.id;
        if (changedValue == currValue) {
          this.show = true;
          this.cellPayload = data.payload;
        }
      }
    });
  }

  async invokeParentMethod(event) {
    // console.log('Update Button', this.params);
    switch (this.type) {
      case 'GROUPUPDATE':
        const status = await this.checkAvalibilityGroup(
          this.params.data['groupName']
        );
        status.subscribe(res => {
          if (res) {
            alert(
              'Group Name is already exist. Please try again with different name'
            );
          } else {
            this.id = this.params.data.id;
            const payload = {
              groupName: this.params.data['groupName'],
              id:this.id
            };
            this._store.dispatch(
              new PutAttributeGroup(payload, this.params.data['id'])
            );
          }
        });
        break;
      case 'ZONE_UPDATE':
        console.log('Zone Button', this.params.data['id']);
        if (this.cellPayload != null) {
          if (this.cellPayload.oldValue != this.cellPayload.newValue) {
            this._store.dispatch(
              new UpdateZone(
                { zoneName: this.params.data['zoneName'] },
                this.params.data['id']
              )
            );
            console.log('INNER_EDIT_FULLFILLMENT', this.cellPayload);
            this.cellPayload = null;
            this.show = false;
          }
        }

        break;
      case 'ZONE_ZIPCODE_UPDATE':
        console.log('Zipcode Button', this.params.data);
        if (this.params.onUpdateClick instanceof Function) {
          // put anything into params u want pass into parents component
          // console.log('FULFILLMENT_ZONE_UPDATE', this.params.data);
          const params = {
            rowData: this.params.node.data,
            id: this.params.rowIndex,
            data: this.params.data,
            // ...something
          };
          this.params.onUpdateClick(params);
        }
        // delete this.params.data['createdAt'];
        // delete this.params.data['createdBy'];
        // delete this.params.data['updatedAt'];
        // delete this.params.data['updatedBy'];
        // this.params.data['isCodAvailable'] =
        //   this.params.data['isCodAvailable'] == 'Yes' ? 1 : 0;
        // this._store.dispatch(
        //   new UpdateZipCode(this.params.data, this.params.data['id'])
        // );
        // this.show = false;
        break;
      case 'ADD_ZONE_ZIPCODE':
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
          console.log('ADD_ZONE_ZIPCODE', params);
          this.params.onUpdateClick(params);
        }
        // delete this.params.data['createdAt'];
        // delete this.params.data['createdBy'];
        // delete this.params.data['updatedAt'];
        // delete this.params.data['updatedBy'];
        // this.params.data['isCodAvailable'] =
        //   this.params.data['isCodAvailable'] == 'Yes' ? 1 : 0;
        // this._store.dispatch(
        //   new UpdateZipCode(this.params.data, this.params.data['id'])
        // );
        // this.show = false;
        break;

      case 'FULFILLMENT_ZONE_UPDATE':
        if (this.params.showCLick instanceof Function) {
          // put anything into params u want pass into parents component
          console.log('FULFILLMENT_ZONE_UPDATE', this.params.data);
          const params = {
            rowData: this.params.node.data,
            id: this.params.rowIndex,
            data: this.params.data,
            // ...something
          };
          this.params.showCLick(params);
        }
        // console.log('this.cellPayload:::::::::::', this.cellPayload);
        // if (this.cellPayload != null) {
        //   if (this.cellPayload.oldValue != this.cellPayload.newValue) {
        //     this._store.dispatch(
        //       new UpdateZoneFulfillmentCenterById(
        //         this.params.data,
        //         this.params.data['id']
        //       )
        //     );
        //     console.log('INNER_EDIT_FULLFILLMENT', this.cellPayload);
        //     this.cellPayload = null;
        //     this.show = false;
        //     this.apiMessageService.changeApiStatus({
        //       type: 'EDIT_FULLFILLMENT_ZONE',
        //       status: false,
        //     });
        //   }
        // }
        // console.log('END_FULLFILLMENT', this.cellPayload);
        break;
      case 'DELIVERY_CENTER_UPDATE':
        console.log('DELIVERY_CENTER_UPDATE Button', this.params.data);
        if (this.params.updateClick instanceof Function) {
          // put anything into params u want pass into parents component
          console.log('FULFILLMENT_ZONE_UPDATE', this.params.data);
          const params = {
            rowData: this.params.node.data,
            id: this.params.rowIndex,
            data: this.params.data,
            // ...something
          };
          this.params.updateClick(params);
        }
        // if (this.cellPayload != null) {
        //   if (this.cellPayload.oldValue !== this.cellPayload.newValue) {
        //     this._store.dispatch(
        //       new UpdateZipcodeByDeliveryCenterId(
        //         this.params.data,
        //         this.params.data['id']
        //       )
        //     );
        //     this.cellPayload = null;
        //     this.show = false;
        //   }
        // }

        break;

      default: {
        console.log('Default Update');
      }
    }
    // Group ID
  }

  delete($event) {
    switch (this.type) {
      case 'GROUPUPDATE':
        console.log('Group Button', this.params.data['id']);
        const deleteDialogRefGROUP = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Group' } },
        });

        deleteDialogRefGROUP.afterClosed().subscribe(result => {
          if (result) {
            this._store.dispatch(
              new DeleteAttributeGroupName(this.params.data['id'])
            );
          }
        })
        break;
      case 'ZONE_ZIPCODE_UPDATE':
        console.log('ZONE_ZIPCODE_UPDATE Button', this.params.data);
        const deleteDialogRefZONEZIP = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Zone Zipcode' } },
        });

        deleteDialogRefZONEZIP.afterClosed().subscribe(result => {
          if (result) {
            if (this.params.data.id) {
              this._store.dispatch(new DeleteZipCode(this.params.data['id'], this.params.data['zoneId']['id']));
            }
            if (this.params.onDeleteClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onDeleteClick(params);
            }
          }
        })
        break;
      case 'ZIPCODE_UPDATE':
        console.log('ZIPCODE Button', this.params.data);
        const deleteDialogRefZipcode = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Zipcode' } },
        });
        deleteDialogRefZipcode.afterClosed().subscribe(result => {

          if (result) {
            this._store.dispatch(new DeleteZipCode(this.params.data['id']));
            if (this.params.onClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onDeleteClick(params);
            }
          }
        })
        break;
      case 'ADD_ZONE_ZIPCODE':
        console.log('ZIPCODE Button', this.params.data);
        const deleteDialogRefZipcodeAdd = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Zipcode' } },
        });
        deleteDialogRefZipcodeAdd.afterClosed().subscribe(result => {
          console.log('ZIPCODE result delete', result);
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
              console.log('ZIPCODE result delete', params, result);
              this.params.onDeleteClick(params);
            } else {
              console.log('ZIPCODE result delete', this.params.onDeleteClick);
            }
          }
        })
        break;
      case 'FULFILLMENT_ZONE_UPDATE':
        console.log('FULFILLMENT_ZONE_UPDATE Button', this.params.data);
        const deleteDialogRefFZ = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Fulfillment Center Zone' } },
        });

        deleteDialogRefFZ.afterClosed().subscribe(result => {
          if (result) {
            this._store.dispatch(
              new DeleteZoneByFulfillmentCenterId(this.params.data['id'])
            );
            if (this.params.onClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onClick(params);
            }
          }
        })
        break;
      case 'DELIVERY_CENTER_UPDATE':
        console.log('DELIVERY_CENTER_UPDATE Button', this.params.data);
        const deleteDialogRefDCZ = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: { payload: { name: 'Delivery Center Zipcode' } },
        });

        deleteDialogRefDCZ.afterClosed().subscribe(result => {

          if (result) {
            this._store.dispatch(
              new DeleteZipcodeByDeliveryCenterId(this.params.data['id'])
            );
            if (this.params.onClick instanceof Function) {
              // put anything into params u want pass into parents component
              const params = {
                event: $event,
                rowData: this.params.node.data,
                id: this.params.rowIndex,
                // ...something
              };
              this.params.onClick(params);
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

  edit() {
    this.isEdit = true;
  }

  ngOnDestory() {
    console.log('Destory');
    this.isEditParent = false;
  }

  checkAvalibilityGroup(name: string) {
    return this._api.request(
      {
        url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group/group/${name}`,
        method: 'get',
      },
      true
    );
  }
}
