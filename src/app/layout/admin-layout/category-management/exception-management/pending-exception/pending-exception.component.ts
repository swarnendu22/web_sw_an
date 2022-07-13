import { Component, OnInit } from '@angular/core';
import { commissionExceptionState } from '../../../../../reducers/commission-management.reducer';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { GetPendingException } from '../../../../../actions/commission-exception-management.action';
import { PendingMerchantCellRendererButtonComponent } from '../../../components/pending-merchant-cell-renderer-button/pending-merchant-cell-renderer-button.component';
import { Router } from '../../../../../../../node_modules/@angular/router';
import qs from 'qs';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-pending-exception',
  templateUrl: './pending-exception.component.html',
  styleUrls: ['./pending-exception.component.css'],
})
export class PendingExceptionComponent implements OnInit {
  public defaultColDef;
  public columnDefs;
  public rowData = [];
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  pendingExceptions = null;
  modalObj: null;
  paramsFromCellRender = null;
  constructor(
    private store: Store<commissionExceptionState>,
    private router: Router,
    private ag: AgGridOptions
  ) {
    this.columnDefs = [
      {
        field: 'code',
        resizable: true,
        headerName: 'Code',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'requestType',
        resizable: true,
        headerName: 'Request Type',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'currentStatus',
        resizable: true,
        headerName: 'Current Status',
        filter: 'agTextColumnFilter',
        sortable: true,
      },

      {
        field: 'type',
        resizable: true,
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        sortable: true,
      },

      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: PendingMerchantCellRendererButtonComponent,
        cellRendererParams: {
          onActionBtnClick: this.requestFnctn.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
    ];

    this.store.dispatch(new GetPendingException());
  }

  requestFnctn(params) {
    console.log(params);
    // let parse = qs.parse(params.allData.request);
    // console.log(parse);

    if (params.allData.requestType === 'EDIT') {
      console.log(params.exceptiontype)
      const exceptionId = params.exceptiontype == 'CATEGORYEXCEPTION' ? params.requestObj[0].exceptionId : params.requestObj.exceptionId;
      const exceptiontype = params.exceptiontype == 'CATEGORYEXCEPTION' ? 'b' : 'p';
      this.router.navigate(
        [
          `category/exception/commission-exception/show/${exceptionId}`,
        ],
        {
          queryParams: {
            approveObj: qs.stringify({
              approveMode: true,
              requestObj: params.requestObj,
              apiObj: params.apiObj,
              exceptiontype: exceptiontype
            }),
          },
        }
      );

    } else if (params.allData.requestType === 'ADD') {
      this.modalObj = params.requestObj;
      this.paramsFromCellRender = params;
      // if (params.allData.type === 'CATEGORYEXCEPTION') {
      this.router.navigate(
        [`category/exception/add-new-commission-exception`],
        {
          queryParams: {
            approveObj: qs.stringify({
              approveMode: true,
              requestObj: params.requestObj,
              apiObj: params.apiObj,
              exceptiontype: params.exceptiontype
            }),
          },
        }
      );


    }
  }

  ngOnInit() { }

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
      this.pendingExceptions = res['pendingExceptions'];
      if (this.pendingExceptions != null) {
        event.api.setRowData(this.pendingExceptions);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
}
