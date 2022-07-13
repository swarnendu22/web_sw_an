import { Component, OnInit } from '@angular/core';
import { GetCommission } from '../../../../actions/storeManagement.action';
import { commissionState } from '../../../../reducers/storemanagement.reducers';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-commission-management',
  templateUrl: './commission-management.component.html',
  styleUrls: ['./commission-management.component.css'],
})
export class CommissionManagementComponent implements OnInit {
  public defaultColDef;
  public columnDefs;
  public rowData = [];
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  commissions = null;
  constructor(
    private store: Store<commissionState>,
    private ag: AgGridOptions
  ) {
    this.columnDefs = [
      {
        field: 'groupName',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'groupClass',
        headerName: 'Class',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'remarks',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      { field: 'createdBy', filter: 'agTextColumnFilter' },
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

    this.store.dispatch(new GetCommission());
  }

  ngOnInit() {
    this.store.dispatch(new GetCommission());
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.store.pipe(select<any, any>('commissions')).subscribe(res => {
      this.commissions = res['commissions'];
      event.api.setRowData(this.commissions);
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
    console.log(this.commissions);
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
}
