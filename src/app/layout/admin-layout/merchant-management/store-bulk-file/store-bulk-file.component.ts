import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererCatalogPendingBulkApproveComponent } from '../../components/cell-renderer-catalog-pending-bulkapprove/cell-renderer-catalog-pending-bulkapprove';
import { StoreFileDownloadComponent } from '../store-file-download/store-file-download.component';
import { StoreFileUploadComponent } from '../store-file-upload/store-file-upload.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { GetStoreSpecificBulkList, StoreBulkFileListImageProcess, ActionTypes } from '../../../../actions/merchant-management.actions';
import { StoreBulkUpdateComponent } from '../store-bulk-update/store-bulk-update.component';

@Component({
  selector: 'app-store-bulk-file',
  templateUrl: './store-bulk-file.component.html',
  styleUrls: ['./store-bulk-file.component.css']
})
export class StoreBulkFileComponent implements OnInit {
  storeId = null
  loading = false
  status = 'PENDING';

  columnDefs = [

    {
      headerName: 'Store Name',
      field: 'storeName',
      resizable: true,

    },
    {
      headerName: 'FileName',
      field: 'productDetailFile',
      resizable: true,
      cellRenderer: (data) => {
        return `<a href="${data.data.productDetailFile}">${data.data.productDetailFile.split('/').pop()}</a>`
      }
    },
    {
      headerName: 'Total Rows',
      field: 'totalRows',
      resizable: true,
    },
    {
      headerName: 'Transfer Count',
      field: 'transferCount',
      resizable: true,
    },
    // {
    //   headerName: 'Pending Count',
    //   field: 'transferCount',
    //   resizable: true,
    //   width: 140,
    //   valueGetter: params => {
    //     const pendingCount = params.data['totalRows'] - params.data['transferCount'];
    //     return pendingCount;
    //   },
    // },
    {
      headerName: 'Created At',
      field: 'createdAt',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
      }
    },
    {
      headerName: 'Created By',
      field: 'userName',
      resizable: true,

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
      cellRenderer: (data) => {
        return `<p title=${data.data.remarks}>${data.data.remarks}</p>`
      }
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
      width: 140,
    },

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  allCatalogList = null;
  rowData = [];
  constructor(public dialog: MatDialog, private store: Store<any>,
    private ag: AgGridOptions, public apiMessageService: ApiMessageService, private activatedRoute: ActivatedRoute, ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;

  }

  downloadModalOpen() {
    this.dialog.open(StoreFileDownloadComponent, {
      width: '800px',
      maxHeight: '600px',
      height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload',
      data: {
        storeId: this.storeId
      }
    });
  }

  uploadContentSheet() {
    this.dialog.open(StoreFileUploadComponent, {
      width: '800px',
      maxHeight: '600px',
      height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload',
      data: {
        storeId: this.storeId
      }
    });
  }

  ProcessImage(){
    let payload = {
      storeId: this.storeId
    }
    this.store.dispatch( new StoreBulkFileListImageProcess( payload ) );

    this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ==  ActionTypes.storeBulkFileListImageProcess ) {
        console.log( data.payload );
      }
    });

  }

  uploadStoreSheet(processingBy) {
    this.dialog.open(StoreBulkUpdateComponent, {
      width: '800px',
      maxHeight: '600px',
      height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload',
      data: {
        processingBy: processingBy,
        storeId: this.storeId
      }
    });
  }

  ngOnInit() {
    this.getData();
    this.apiMessageService.currentApiStatus.subscribe(data => {

      if (data.type === 'BULKAPPROVE_CATALOG_EFFECT_RESPONSE' && data.status) {

        this.loadingCall();
      }
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      console.log( res.storeInfoDetails.businessCategoryId );
    });
  }

  loadingCall() {
    this.loading = !this.loading;
  }

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }
  onStatusChange(event) {
    const value = event.value;
    this.status = value;
    this.getData();
  }
  getData() {
    this.store.dispatch(
      new GetStoreSpecificBulkList(this.storeId)
    );
  }
  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      this.allCatalogList = res.storeSpecificBulkList
        ? res.storeSpecificBulkList
        : null;
      if (this.allCatalogList) {
        this.rowData = this.allCatalogList;
        event.api.setRowData(this.rowData);
        // console.log(this.allCatalogList)
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

}
