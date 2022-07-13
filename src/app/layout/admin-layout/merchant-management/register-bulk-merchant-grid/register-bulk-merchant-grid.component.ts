import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { GetRegisterMerchantBulkList } from '../../../../actions/merchant-management.actions';
import * as moment from 'moment';
import { CellRendererBulkStoreActionButtonComponent } from '../../components/cell-renderer-bulk-store-action-button/cell-renderer-bulk-store-action-button.component';
@Component({
  selector: 'app-register-bulk-merchant-grid',
  templateUrl: './register-bulk-merchant-grid.component.html',
  styleUrls: ['./register-bulk-merchant-grid.component.css']
})
export class RegisterBulkMerchantGridComponent implements OnInit {
  private gridColumnApi;
  fileList = null
  columnDefs = [


    {
      headerName: 'FileName',
      field: 'filePath',
      resizable: true,
      cellRenderer: (data) => {
        return `<a href="${data.data.filePath}">${data.data.filePath.split('/').pop()}</a>`
      }

    },

    {
      headerName: 'Total Rows',
      field: 'totalRows',
      resizable: true,

    },
    {
      headerName: 'Transfer Count',
      field: 'transferRows',
      resizable: true,

    },

    {
      headerName: 'Created At',
      field: 'createdAt',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
      }
    },

    {
      headerName: 'Status',
      field: 'status',
      resizable: true,

    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      resizable: true,

    },

    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      getIdByIndex: 1,
      cellRendererFramework: CellRendererBulkStoreActionButtonComponent,

      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
      width: 140,
    },

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  rowData = [];
  constructor(private store: Store<any>, private ag: AgGridOptions, ) { }

  ngOnInit() {
    this.store.dispatch(
      new GetRegisterMerchantBulkList()
    );
  }


  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridColumnApi = event.columnApi;
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      this.fileList = res.registerMerchantBulkList
        ? res.registerMerchantBulkList
        : null;
      if (this.fileList) {
        this.rowData = this.fileList;
        event.api.setRowData(this.rowData);
        console.log(this.fileList)
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();

  }
}
