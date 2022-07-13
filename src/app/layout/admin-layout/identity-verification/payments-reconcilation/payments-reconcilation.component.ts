import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '../../../../../../node_modules/@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { UploadPaymentCsvComponent } from '../upload-payment-csv/upload-payment-csv.component';
import { GetPaymentReconcilationList, ActionTypes } from '../../../../actions/identity-verification.action';
import * as moment from 'moment';
import { CellRendererViewStoreProductDetailComponent } from '../../components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';

@Component({
  selector: 'app-payments-reconcilation',
  templateUrl: './payments-reconcilation.component.html',
  styleUrls: ['./payments-reconcilation.component.css']
})
@Injectable()
export class PaymentsReconcilationComponent implements OnInit {

  storeId = null
  loading = false
  status = 'PENDING';
  start_date:any = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  end_date:any = new Date()
  pageNo = 1
  totalRecords = 0
  columnDefs = [
    {
      headerName: 'Start Date',
      field: 'start_date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.start_date).format('YYYY-MM-DD')
      }
    },
    {
      headerName: 'End Date',
      field: 'end_date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.end_date).format('YYYY-MM-DD')
      }
    },
    {
      headerName: 'JustPay File',
      field: 'jus_filename',
      resizable: true,
      cellRenderer: (data) => {
        return `<a href="${data.data.jus_filename}">${data.data.jus_filename.split('/').pop()}</a>`
      }
    },
    {
      headerName: 'Payment Gateway FileName',
      field: 'pg_filename',
      resizable: true,
      cellRenderer: (data) => {
        return `<a href="${data.data.pg_filename}">${data.data.pg_filename.split('/').pop()}</a>`
      }
    },
    {
      headerName: 'JustPay Validity',
      field: 'jus_isvalid',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.jus_isvalid) {
          return data.data.jus_isvalid == 'N' ? 'Not Valid' : 'Valid'
        }
      }
    },
    {
      headerName: 'Payment Gateway Validity',
      field: 'pg_isvalid',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.pg_isvalid) {
          return data.data.jus_isvalid == 'N' ? 'Not Valid' : 'Valid'
        }
      }
    },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      cellRendererFramework: CellRendererViewStoreProductDetailComponent,
      cellRendererParams: {
        onActionBtnClick: this.requestFnctn.bind(this),
      },
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

  constructor(public dialog: MatDialog, private store: Store<any>, private router: Router,
    private ag: AgGridOptions, public apiMessageService: ApiMessageService, private activatedRoute: ActivatedRoute, ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    let start_date = sessionStorage.getItem('start_date');
    let end_date = sessionStorage.getItem('end_date');
    if(start_date) {
      this.start_date = start_date;
    } else {
      this.start_date = moment(this.start_date).format('YYYY-MM-DD');
    }
    if(end_date) {
      this.end_date = end_date;
    } else {
      this.end_date =  moment(this.end_date).format('YYYY-MM-DD');
    }
    this.store.dispatch(new GetPaymentReconcilationList({
      "start_date": this.start_date,
      "end_date": this.end_date,
    }, this.pageNo))
  }


  requestFnctn(payload) {
    console.log(payload)
    this.router.navigate(['/users/payment-recon-data-list/' + payload.id])
  }

  uploadContentSheet() {
    const dialog = this.dialog.open(UploadPaymentCsvComponent, {
      width: '600',
      // maxHeight: '600px',
      // height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload',
    });
    dialog.afterClosed().subscribe(res => {

      this.apiMessageService.currentApiStatus.subscribe(data => {

        if (data.type === ActionTypes.uploadPaymentReconcilationCsv && data.status == true) {

          this.store.dispatch(new GetPaymentReconcilationList({
            "start_date": moment(this.start_date).format('YYYY-MM-DD'),
            "end_date": moment(this.end_date).format('YYYY-MM-DD'),
          }, this.pageNo))
        }
      })

    })
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
    this.store.pipe(select('identityVerification')).subscribe(res => {

      if (res && res.paymentReconcilationList) {
        this.rowData = res.paymentReconcilationList['payment_recon_masters'];
        this.totalRecords = res.paymentReconcilationList['total_records'];

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


  changeDate() {
    console.log('change')
    this.pageNo = 1
    if (this.start_date && this.end_date) {
      sessionStorage.setItem('start_date', moment(this.start_date).format('YYYY-MM-DD'));
      sessionStorage.setItem('end_date', moment(this.end_date).format('YYYY-MM-DD'));

      this.store.dispatch(new GetPaymentReconcilationList({
        "start_date": moment(this.start_date).format('YYYY-MM-DD'),
        "end_date": moment(this.end_date).format('YYYY-MM-DD'),
      }, this.pageNo))
    }
  }


  getPageNoData(page: number) {
    this.pageNo = page;
    if (this.start_date && this.end_date) {
      this.store.dispatch(new GetPaymentReconcilationList({
        "start_date": moment(this.start_date).format('YYYY-MM-DD'),
        "end_date": moment(this.end_date).format('YYYY-MM-DD'),
      }, this.pageNo))
    }
  }
  nextPage(event) {
    this.pageNo += 1;
    if (this.start_date && this.end_date) {
      this.store.dispatch(new GetPaymentReconcilationList({
        "start_date": moment(this.start_date).format('YYYY-MM-DD'),
        "end_date": moment(this.end_date).format('YYYY-MM-DD'),
      }, this.pageNo))
    }
  }

}
