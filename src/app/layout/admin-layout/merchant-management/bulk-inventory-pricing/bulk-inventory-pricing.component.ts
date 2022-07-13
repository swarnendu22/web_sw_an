import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererCatalogPendingBulkApproveComponent } from '../../components/cell-renderer-catalog-pending-bulkapprove/cell-renderer-catalog-pending-bulkapprove';
import { BulkPriceUploadComponent } from '../bulk-price-upload/bulk-price-upload.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { GetStoreSpecificBulkList } from '../../../../actions/merchant-management.actions';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bulk-inventory-pricing',
  templateUrl: './bulk-inventory-pricing.component.html',
  styleUrls: ['./bulk-inventory-pricing.component.css']
})
export class BulkInventoryPricingComponent implements OnInit {
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

  download(event) {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/store-management/v2/admin/bulk-process/download-store-product-price-inventory/${this.storeId}`,
      'application/vnd.ms-excel'
    )
      .subscribe(
        data => {
          saveAs(data, `store_${this.storeId}_${moment(new Date()).format("DD-MM-YYYY LTS").replace(/[- ]/gm, "_")}.xlsx`);
        },
        error => console.error(error)
      );
  }

  uploadContentSheet() {
    this.dialog.open(BulkPriceUploadComponent, {
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
        console.log(this.allCatalogList)
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