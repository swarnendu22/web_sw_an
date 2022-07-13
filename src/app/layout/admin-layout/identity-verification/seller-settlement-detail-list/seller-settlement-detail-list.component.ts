import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { CellRendererViewStoreProductDetailComponent } from '../../components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';
import { CellRendererSettlementDetailsComponent } from '../../components/cell-renderer-settlement-details/cell-renderer-settlement-details.component'
import { MatDialog } from '../../../../../../node_modules/@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { GetSellerSettlementList, GetSellerSettlementDetailList, ActionTypes, UploadSellerSettlementBankFile } from '../../../../actions/identity-verification.action';
import { GridApi } from '../../../../../../node_modules/ag-grid-community';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-seller-settlement-detail-list',
  templateUrl: './seller-settlement-detail-list.component.html',
  styleUrls: ['./seller-settlement-detail-list.component.css']
})
export class SellerSettlementDetailListComponent implements OnInit {
  @ViewChild('uploadBankFileForSettlement') uploadBankFileForSettlement: TemplateRef<any>;

  bankFileUrl = null
  isReadonly = true
  storeId = null
  loading = false
  status = 'PENDING';
  start_date = new Date()
  end_date = new Date()
  private gridApi;
  columnDefs = [

    {
      headerName: 'Processed Date',
      field: 'settled_process_date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.settled_process_date).format('YYYY-MM-DD')
      }
    },

    {
      headerName: 'Store Name',
      field: 'store_name',
      resizable: true,
    },
    {
      headerName: 'Account Number',
      field: 'account_number',
      resizable: true,

    },
    {
      headerName: 'IFSC Code',
      field: 'ifsc_code',
      resizable: true,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      resizable: true,

    },

    {
      headerName: 'Bank Transaction Ref',
      field: 'bank_txn_reference',
      resizable: true,

    },

    {
      headerName: 'Transaction Status',
      field: 'bank_txn_status',
      resizable: true,

    },

    {
      headerName: 'Bank Transaction Date',
      field: 'bank_txn_date',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.bank_txn_date) {
          return moment(data.data.bank_txn_date).format('YYYY-MM-DD')
        }
      }
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
      cellRendererFramework: CellRendererSettlementDetailsComponent,
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
    }

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  allCatalogList = null;
  rowData = [];
  id = null
  listData = null
  constructor(private store: Store<any>,
    private ag: AgGridOptions, private activatedRoute: ActivatedRoute,
    private apiMessageService: ApiMessageService, private dialog: MatDialog) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.store.dispatch(new GetSellerSettlementDetailList(this.id))
    this.store.pipe(select('identityVerification')).subscribe(res => {
      console.log(res)
      if (res && res.sellerSettlementList) {
        this.listData = res.sellerSettlementList['seller_payment_masters'].find(e => e.id == this.id)
        console.log(this.listData)
      }
    });
  }



  ngOnInit() {

  }

  loadingCall() {
    this.loading = !this.loading;
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
    this.store.pipe(select('identityVerification')).subscribe(res => {

      if (res && res.sellerSettlementDetailList) {
        this.rowData = res.sellerSettlementDetailList;

        event.api.setRowData(this.rowData);
        console.log(this.rowData)
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


  onBtnExport(): void {
    const params = {
      columnGroups: true,
      allColumns: false,
      // columnKeys: ["storeName", "business_category_name"],
      fileName: 'export_it'
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onDownloadBankFile(identifier) {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/delivery-admin-ms/accounts/seller_payment_master/${this.id}/bank_settlement_file?bank_identifier=${identifier}`,
      'application/vnd.ms-excel'
    )
      .subscribe(
        data => {
          console.log('attribute');
          saveAs(data, `bank_${moment(new Date()).format("DD-MM-YYYY LTS").replace(/[- ]/gm, "_")}.csv`);
        },
        error => console.error(error)
      );
  }

  onFileUpload(event, csvTtype) {
    let image = {
      type: '',
      location: '',
      id: null,
      name: ''
    }
    console.log("event", event);
    if ((event.Location.split('.').pop() != 'xls') && (event.Location.split('.').pop() != 'xlsx') && (event.Location.split('.').pop() != 'csv')) {
      alert('Only Excel files are Allowed');
    }
    else {
      image.id = Math.random();
      image.name = event.Location.split('/').slice(3).join('/');
      image.location = event.Location;
      image.type = event.Location.split('.').pop();
    }
    this[csvTtype] = image
    console.log(this[csvTtype]);
  }

  deleteImage(fileType) {
    this[fileType] = null
  }

  uploadContentSheet() {
    const dialog = this.dialog.open(this.uploadBankFileForSettlement, {
      width: '600',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload',
    });
    dialog.afterClosed().subscribe(res => {
      this.apiMessageService.currentApiStatus.subscribe(data => {
        if (data.type === ActionTypes.uploadSellerSettlementBankFile && data.status == true) {
          this.store.dispatch(new GetSellerSettlementDetailList(this.id))
        }
      })

    })
  }

  onSubmit() {
    const payload =
    {
      "bank_settlement_file": this.bankFileUrl.location,
      "bank_identifier": "hdfc"
    }
    this.store.dispatch(new UploadSellerSettlementBankFile(payload, this.id))
  }

  onCloseDialog() {
    this.dialog.closeAll()
  }


}
