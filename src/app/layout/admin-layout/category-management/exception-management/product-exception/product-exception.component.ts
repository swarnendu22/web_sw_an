import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { commissionExceptionState } from '../../../../../reducers/commission-management.reducer';
import {
  GetCommisionexceptions,
  GetProductExceptions,
} from '../../../../../actions/commission-exception-management.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
@Component({
  selector: 'app-product-exception',
  templateUrl: './product-exception.component.html',
  styleUrls: ['./product-exception.component.css'],
})
export class ProductExceptionComponent implements OnInit {
  public defaultColDef;
  public columnDefs;
  public rowData = [];
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  productExceptions = null;
  constructor(
    private store: Store<commissionExceptionState>,
    private ag: AgGridOptions
  ) {
    this.columnDefs = [
      { field: 'code', resizable: true },
      {
        field: 'createdAt',
        resizable: true,
        valueGetter: function (params) {
          return new Date(params.data.createdAt);
        },
      },
      { field: 'value', resizable: true },
      { field: 'addLogistic', resizable: true },
      { field: 'addPaymentHandling', resizable: true },
      { field: 'addClosingFee', resizable: true },
      { field: 'addFullfillmentFee', resizable: true },
      {
        field: 'affectFrom',
        resizable: true,
        valueGetter: function (params) {
          return new Date(params.data.createdAt);
        },
      },
      {
        field: 'expiryDate',
        resizable: true,
        valueGetter: function (params) {
          return new Date(params.data.createdAt);
        },
      },

      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: CellRendererButtonComponent,

        btnName: [
          { name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' },
          { name: 'Disable', btnTxtColor: '#fff', btnColor: '#F4516C' },
        ],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
      },
    ];

    this.store.dispatch(new GetProductExceptions());
  }

  ngOnInit() {
    this.store.dispatch(new GetProductExceptions());
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    var gridWidth = params.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.store.pipe(select<any, any>('productExceptions')).subscribe(res => {
      console.log(res);
      this.productExceptions = res['productExceptions'];
      event.api.setRowData(this.productExceptions);

      if (this.productExceptions != null) {
        this.serialize();
        event.api.setRowData(this.rowData);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  serialize() {
    this.rowData = [];
    console.log('push called');
    this.productExceptions.map(excp => {
      this.rowData.push({
        addClosingFee: excp.addClosingFee,
        addFullfillmentFee: excp.addFullfillmentFee,
        addLogistic: excp.addLogistic,
        addPaymentHandling: excp.addPaymentHandling,
        affectFrom: excp.affectFrom,
        code: excp.code,
        createdAt: excp.createdAt,
        expiryDate: excp.expiryDate,
        value: excp.value,
        id: excp.id,
      });
    });
  }

  ngOnDestroy() {
    console.log('destroyer');
    this.rowData = [];
    this.productExceptions = null;
  }
}
