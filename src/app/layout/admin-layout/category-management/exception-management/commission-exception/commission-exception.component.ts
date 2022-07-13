import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { commissionExceptionState } from '../../../../../reducers/commission-management.reducer';
import { GetCommisionexceptions } from '../../../../../actions/commission-exception-management.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
// import { Store, select } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-commission-exception',
  templateUrl: './commission-exception.component.html',
  styleUrls: ['./commission-exception.component.css'],
})
export class CommissionExceptionComponent implements OnInit {
  public defaultColDef;
  public columnDefs;
  public rowData = [];
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  commissionsExceptions = null;
  constructor(
    private store: Store<commissionExceptionState>,
    private ag: AgGridOptions
  ) {
    this.columnDefs = [
      {
        field: 'exceptionName',
        resizable: true,
        headerName: 'Exception Name',
        filter: 'agTextColumnFilter',
        sortable: true,
        minWidth: 500
      },
      {
        field: 'exceptionType',
        resizable: true,
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        sortable: true,
        width: 100
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
        width: 100
      },
    ];

    this.store.dispatch(new GetCommisionexceptions());
  }

  ngOnInit() {
    this.store.dispatch(new GetCommisionexceptions());
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
    this.store.pipe(select<any, any>('commissionsExceptions')).subscribe(res => {
      this.commissionsExceptions = res['commissionExceptions'];
      if (this.commissionsExceptions != null) {
        // this.serialize(this.commissionsExceptions);
        event.api.setRowData(this.commissionsExceptions);
        // console.log(this.commissionsExceptions);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  serialize(commissionExceptions) {
    this.commissionsExceptions.map(excp => {
      this.rowData.push({
        addClosingFee: excp.addClosingFee,
        addFullfillmentFee: excp.addClosingFee,
        addLogistic: excp.addLogistic,
        addPaymentHandling: excp.addPaymentHandling,
        affectFrom: excp.affectFrom,
        code: excp.code,
        createdAt: excp.createdAt,
        expiryDate: excp.expiryDate,
        marketplaceBrands: excp.marketplaceBrands,
        marketplaceCategory: excp.marketplaceCategory,
        marketplaceCommissionGroup: excp.marketplaceCommissionGroup,
        sellers: excp.sellers,
        value: excp.value,
        id: excp.code,
      });
    });
  }
}
