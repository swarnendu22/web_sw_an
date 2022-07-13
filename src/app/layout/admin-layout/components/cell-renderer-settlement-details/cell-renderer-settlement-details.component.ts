import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import * as moment from 'moment';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import {ICellRendererParams} from "@ag-grid-community/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SubmitManualSettelment } from '../../../../actions/identity-verification.action'
@Component({
  selector: 'app-cell-renderer-settlement-details',
  templateUrl: './cell-renderer-settlement-details.component.html',
  styleUrls: ['./cell-renderer-settlement-details.component.css']
})
export class CellRendererSettlementDetailsComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ManualSettelmentForm>
    ) { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }

  // agInit(params: ICellRendererParams): void {
  //   this.cellValue = this.getValueToDisplay(params);
  // }


  public invokeParentMethod(type) {
    if (this.params.onActionBtnClick instanceof Function) {
      const { id, storeId, status, approvalFor } = this.params.data;
      const payload = {
        id: id,
        storeId: storeId,
        status: status,
        approvalFor: approvalFor,

      };
      this.params.onActionBtnClick(payload);
    }
  }

  openManualSettelmentForm() {
    const dialog = this.dialog.open(ManualSettelmentForm, {
      width: '450px',
      data: this.params.data
    });
  }

  refresh() {
    return false;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './manual_settlement_form.html',
  styleUrls: ['./manual_settlement_form.css']
})
export class ManualSettelmentForm {
  message = '';
  manualSettlementForm: FormGroup;
  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManualSettelmentForm>,
    // private router: Router, private apiMessageService: ApiMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.message = data.message;
  }

  get f() {
    return this.manualSettlementForm.controls;
  }

  ngOnInit() {
    this.manualSettlementForm = this.formBuilder.group({
      bank_txn_reference: ["", [Validators.required, Validators.maxLength(100)]],
      bank_txn_date: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.manualSettlementForm.valid) {
     var payload = { body: {
          bank_txn_reference: this.manualSettlementForm.value['bank_txn_reference'],
          bank_txn_date: moment(this.manualSettlementForm.value['bank_txn_date']).format('DD/MM/YYYY')
        },
        id: this.data.id,
        settlement_id: this.data.settlement_id
     }
     this.store.dispatch(new SubmitManualSettelment(payload))
     this.dialogRef.close();
    }
  }
}
