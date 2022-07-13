import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  coupon_payment_conditions = null;
  private gridApi;
  columnDefs = [
    {
      headerName: 'payment_method',
      field: 'payment_method',
      resizable: true,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'payment_type',
      field: 'payment_type',
      resizable: true,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'values',
      field: 'values',
      resizable: true,
      sortable: false,
      filter: false,
    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  rowData = [];
  constructor(
    public dialogRef: MatDialogRef<PaymentMethodListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
    private ag: AgGridOptions
  ) {
    this.coupon_payment_conditions = this.data;
    console.log(this.coupon_payment_conditions);
  }
  ngOnInit(): void {

  }
  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridApi = event.api
    this.rowData = this.coupon_payment_conditions;
    console.log(this.rowData);
  }
  onBtnExport(): void {
    const params = {
      columnGroups: true,
      allColumns: false,
      columnKeys: ["payment_method", "payment_type", "values"],
      fileName: 'paymentMethod'
    };
    this.gridApi.exportDataAsCsv(params);
  }
  onBtnExportExcel(): void {
    const params = {
      columnGroups: true,
      allColumns: false,
      columnKeys: ["payment_method", "payment_type", "values"],
      fileName: 'paymentMethod'
    };
    this.gridApi.exportDataAsExcel(params);
  }
}
