// import { GetCatalogFilesAllData } from './../../../../actions/catalog-management.action';
import { Component, OnInit } from '@angular/core';
import { GetCatalogFilesAllData } from 'src/app/actions/catalog-management.action';
import { Store, select } from '@ngrx/store';
//import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { CellRendererCatalogPendingBulkApproveComponent } from '../../components/cell-renderer-catalog-pending-bulkapprove/cell-renderer-catalog-pending-bulkapprove';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererBrandApproveComponent } from '../../components/cell-renderer-brand-approve/cell-renderer-brand-approve.component';
import * as moment from 'moment';
import { GetActiveBrands } from '../../../../actions/brand-management.actions';

@Component({
  selector: 'app-catalog-files',
  templateUrl: './catalog-files.component.html',
  styleUrls: ['./catalog-files.component.css'],
})
export class CatalogFilesComponent implements OnInit {
  loading = false
  status = 'MASTERPRODUCT';
  private gridColumnApi;
  columnDefs = [
    {
      headerName: 'Batch Id',
      field: 'id',
      resizable: true,
      width: 130

    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
      },
      width: 150
    },
    {
      field: 'storeName',
      headerName: 'Store Name',
      resizable: true,
      width: 170
    },
    {
      headerName: 'FileName',
      field: 'productDetailFile',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.productDetailFile) {
          return `<a href="${data.data.productDetailFile}">${data.data.productDetailFile.split('/').pop()}</a>`
        }
      },
      minWidth: 150
    },
    {
      headerName: 'Total Rows',
      field: 'totalRows',
      resizable: true,
      width: 100

    },
    {
      headerName: 'Transfer Count',
      field: 'transferCount',
      resizable: true,
      width: 120

    },
    {
      headerName: 'Status',
      field: 'status',
      resizable: true,
      width: 120

    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      resizable: true,
      width: 110

    },
    {
      headerName: 'validation Count',
      field: 'validationCount',
      resizable: true,
      width: 140

    },
    {
      headerName: 'Validation Started At',
      field: 'validationStartedAt',
      resizable: true,
      cellRenderer: (data) => {
        if( data.data.validationStartedAt ){
          return moment(data.data.validationStartedAt).format('DD/MM/YYYY HH:mm');
        }
      },
      width: 160
    },
    {
      headerName: 'Validation Ended At',
      field: 'validationEndedAt',
      resizable: true,
      cellRenderer: (data) => {
        if( data.data.validationEndedAt ){
        return moment(data.data.validationEndedAt).format('DD/MM/YYYY HH:mm');
        }
      },
      width: 160
    },
    {
      headerName: 'Approve Brand',
      field: 'status',
      sortable: false,
      filter: false,
      cellRendererFramework: CellRendererBrandApproveComponent,
      cellRendererParams: {
        onLoadingClick: this.loadingCall.bind(this),
      },
      width: 130
    },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      getIdByIndex: 1,
      cellRendererFramework: CellRendererCatalogPendingBulkApproveComponent,
      cellRendererParams: {
        onLoadingClick: this.loadingCall.bind(this),
      },
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
      width: 120

    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  allCatalogList = null;
  rowData = [];
  constructor(
    private store: Store<any>, 
    private ag: AgGridOptions, 
    public apiMessageService: ApiMessageService
  ) {
    this.store.dispatch(new GetActiveBrands('1'));
  }

  ngOnInit() {
    this.getData();
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'BULKAPPROVE_CATALOG_EFFECT_RESPONSE' && data.status) {

        this.loadingCall();
      }
    })
  }
  loadingCall() {
    this.loading = !this.loading;
  }
  onFirstDataRendered(params) {
    //params.api.sizeColumnsToFit();
  }
  onStatusChange() {
    this.getData();
  }
  getData() {
    this.store.dispatch(
      new GetCatalogFilesAllData({
        type: this.status
      })
    );
  }
  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    //params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridColumnApi = event.columnApi;
    this.store.pipe(select('catalogFilesReducer')).subscribe(res => {
      this.allCatalogList = res.allCatalogFiles
        ? res.allCatalogFiles['payload']
        : null;
      if (this.allCatalogList) {
        this.rowData = this.allCatalogList;
        event.api.setRowData(this.rowData);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
  valueGetterForProductDetails(params, index) {
    return params.data[index];
  }
  invokeParentMethod(params) {

  }
  iniciate_product_bulk() {
    
  }
}
