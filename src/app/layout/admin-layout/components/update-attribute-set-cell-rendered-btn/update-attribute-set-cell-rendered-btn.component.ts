import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RequestService } from 'src/app/utils/request/request.service';
import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../reducers/storemanagement.reducers';
import {
  UpdateAttributeSetRel,
  DeleteAttributesOnAttributeSet,
} from '../../../../actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-update-attribute-set-cell-rendered-btn',
  template: `
    <ng-container>
      <button
        mat-flat-button
        matTooltip="Edit" aria-label="Edit"
        color="primary"
        class="btn-data btn-sm-data"
        (click)="updateAttribute(params.data)"
      >
        <mat-icon>edit</mat-icon>
      </button>
      <button
        mat-flat-button
        matTooltip="Delete" aria-label="Delete"
        class="btn-data btn-sm-data red"
        (click)="delete($event)"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </ng-container>
  `,
  styleUrls: ['./update-attribute-set-cell-rendered-btn.component.css'],
})
export class UpdateAttributeSetCellRenderedBtnComponent
  implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  parentID: number;
  isEdit = false;
  isEditParent = false;
  cellPayload = null;
  cellDefs: any;
  show: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(
    private _api: RequestService,
    private _store: Store<categoryState>,
    private apiMessageService: ApiMessageService,
    public dialog: MatDialog
  ) {
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      if (res['getAttributeSetById']) {
        this.parentID = res['getAttributeSetById'][0]['id'];
      }
    });
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'EDIT_ATTRIBUTE_SET') {
        this.isEditParent = !this.isEditParent;
      }

      if (data.type === 'GET_NEW_ATTRIBUTE_SET_BY_ID') {
        this.isEditParent = false;
      }

      if (data.type === 'CHANGE_VALUE') {
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

  public invokeParentMethod($event) {
    this.id = this.params.data.id;
    if (this.cellPayload != null) {
      if (this.cellPayload.oldValue !== this.cellPayload.newValue) {
        console.log('Payload', this.params.data);
        const optional = this.params.data['option'] === 'No' ? 'N' : 'M';
        const data = {
          attributeSet: this.params.data[
            'attributeSet'
          ]['id'],
          attribute: this.params.data[
            'attribute'
          ]['id'],
          name: this.params.data['name'],
          type: this.params.data['type'],
          option: optional,
          isVariant: this.params.data['isVariant'] === 'Yes' ? true : false,
          filterable: this.params.data['filterable'] === 'Yes' ? true : false,
          searchable: this.params.data['searchable'] === 'Yes' ? true : false,
          isVisibleOnFront:
            this.params.data['isVisibleOnFront'] === 'Yes' ? true : false,
          position: this.params.data['position'],
          status: this.params.data['status'] === 'Yes' ? 'ACTIVE' : 'INACTIVE',
          isVisibleOnList:
            this.params.data['isVisibleOnList'] === 'Yes' ? true : false,
        };

        this._store.dispatch(new UpdateAttributeSetRel(this.id, data));
        this.cellPayload = null;
        this.isEdit = false;
        if (this.params.onUpdateClick instanceof Function) {
          const params = {
            event: $event,
            rowData: this.params.node.data,
            id: this.params.rowIndex
          };
          this.params.onUpdateClick(params);
        }
      }
    }
  }
  public delete($event) {
    const deleteDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.id = this.params.data.id;
        const position = this.params.data.position;
        const groupId = this.params.data.attribute.groupId
          .id;
        console.log('Delet', this.parentID, groupId);
        this._store.dispatch(
          new DeleteAttributesOnAttributeSet(
            this.id,
            position,
            this.parentID,
            groupId
          )
        );
        if (this.params.onDeleteClick instanceof Function) {
          const params = {
            event: $event,
            rowData: this.params.node.data,
            index: this.params.rowIndex
          };
          this.params.onDeleteClick(params);
        }
      }
    });
  }
  update() {
    console.log('Update', this.cellPayload);
    console.log('Curr Value', this.params.data);
  }
  refresh() {
    return false;
  }
  edit($event) {
    console.log('Edit', this.params.rowIndex, $event);
    this.isEdit = true;
  }
  updateAttribute(payload) {
    this.dialog.open(EditAttributeDialogComponent, {
      width: '800px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { payload },
    });
  }
  cancel($event) {
    this.isEdit = false;
  }
}
@Component({
  selector: 'edit-dialog-attribute',
  templateUrl: 'edit-dialog-attribute.html',
})
export class EditAttributeDialogComponent implements OnInit {
  updateAttributeForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAttributeDialogComponent>,
    private _fb: FormBuilder,
    private _store: Store<categoryState>
  ) {
    this.initialForm();
  }
  ngOnInit() {
    if (this.data) {
      this.updateAttributeData(this.data);
    }
    console.log('Ng', this.data);
  }
  initialForm() {
    this.updateAttributeForm = this._fb.group({
      groupName: [{ value: '', disabled: true }, Validators.required],
      attributeSet: [],
      attribute: [],
      name: [{ value: '', disabled: true }, Validators.required],
      type: ['', Validators.required],
      option: ['', Validators.required],
      filterable: [false],
      searchable: ['0'],
      isVisibleOnFront: [false],
      isVisibleOnList: [false],
      isVariant: [false],
      maxLength: [null, [Validators.maxLength(10)]],
    });
  }
  updateAttributeData(data) {
    this.updateAttributeForm.patchValue({
      groupName:
        data.payload['attribute']['groupId']['groupName'],
        attributeSet:
        data.payload['attributeSet']['id'],
        attribute:
        data.payload['attribute']['id'],
      name: data.payload['name'],
      type: data.payload['type'],
      option: data.payload['option'],
      filterable: data.payload['filterable'],
      searchable: data.payload['searchable'] === '1' ? true : false,
      isVisibleOnFront: data.payload['isVisibleOnFront'],
      isVisibleOnList: data.payload['isVisibleOnList'],
      isVariant: data.payload['isVariant'],
      maxLength: data.payload['maxLength'],
    });
    this.getDiabled(data.payload['type']);
  }
  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.reset(formGroup.value);
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  submitUpdateAttribute() {
    if (this.updateAttributeForm.valid) {
      const data = {
        attributeSet: this.updateAttributeForm.value[
          'attributeSet'
        ],
        attribute: this.updateAttributeForm.value[
          'attribute'
        ],
        name: this.data.payload['name'],
        type: this.updateAttributeForm.value['type'],
        option: this.updateAttributeForm.value['option'],
        isVariant: this.updateAttributeForm.value['isVariant'],
        filterable: this.updateAttributeForm.value['filterable'],
        searchable:
          this.updateAttributeForm.value['searchable'] === true ? '1' : '0',
        isVisibleOnFront: this.updateAttributeForm.value['isVisibleOnFront'],
        isVisibleOnList: this.updateAttributeForm.value['isVisibleOnList'],
        position: this.data.payload['position'],
        status: this.data.payload['status'],
        maxLength: this.updateAttributeForm.value['maxLength']
      };
      this._store.dispatch(
        new UpdateAttributeSetRel(
          this.data.payload['id'],
          data,
          this.data.payload['attributeSet']['id']
        )
      );
      this.dialogRef.close();
    } else {
      this.markFormGroupTouched(this.updateAttributeForm)
    }
  }
  getDiabled(type: string) {
    if (type === 'TEXT') {
      this.updateAttributeForm.get('isVariant').disable();
    } else {
      this.updateAttributeForm.get('maxLength').disable();
    }
  }
  ngOnDestroy() {
    this.updateAttributeForm.reset();
  }
}
@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private _fb: FormBuilder,
    private _store: Store<categoryState>
  ) { }
  ngOnInit() {
    if (this.data) {
    }
    console.log('Ng', this.data);
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}