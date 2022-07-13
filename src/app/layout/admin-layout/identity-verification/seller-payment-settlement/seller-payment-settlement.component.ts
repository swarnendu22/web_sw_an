import { Component, OnInit, ViewChild, TemplateRef, Injectable } from '@angular/core';
import { CellRendererViewStoreProductDetailComponent } from '../../components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';
import { MatDialog } from '../../../../../../node_modules/@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { GetPaymentReconcilationList, ActionTypes, GetSellerSettlementList, CreateSellerSettlement } from '../../../../actions/identity-verification.action';
import { UploadPaymentCsvComponent } from '../upload-payment-csv/upload-payment-csv.component';
import * as moment from 'moment';


@Component({
  selector: 'app-seller-payment-settlement',
  templateUrl: './seller-payment-settlement.component.html',
  styleUrls: ['./seller-payment-settlement.component.css']
})
@Injectable()
export class SellerPaymentSettlementComponent implements OnInit {

  @ViewChild('createSellerSettlementModal') createSellerSettlementModal: TemplateRef<any>;

  isReadonly = true
  storeId = null
  loading = false
  status = 'PENDING';
  start_date:any = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  end_date:any = new Date()
  columnDefs = [

    {
      headerName: 'Date',
      field: 'date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.date).format('YYYY-MM-DD')
      }
    },

    {
      headerName: 'Total Account',
      field: 'total_account',
      resizable: true,
    },
    {
      headerName: 'Total Amount',
      field: 'total_amount',
      resizable: true,

    },
    {
      headerName: 'Last Settled',
      field: 'settled_last_date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.settled_last_date).format('YYYY-MM-DD')
      }
    }, {
      headerName: 'Settle Upto',
      field: 'settled_upto_date',
      resizable: true,
      cellRenderer: (data) => {
        return moment(data.data.settled_upto_date).format('YYYY-MM-DD')
      }
    },
    {
      headerName: 'Is Settled',
      field: 'is_settled',
      resizable: true,
      cellRenderer: (data) => {
        return data.data.is_settled == 0 ? 'NO' : 'YES'
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
  pageNo = 1
  settled_last_date = null
  current_date = null
  payment_settle_upto = null

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
    this.store.dispatch(new GetSellerSettlementList({
      "start_date": moment(this.start_date).format('YYYY-MM-DD'),
      "end_date": moment(this.end_date).format('YYYY-MM-DD'),
    }, this.pageNo))
  }

  requestFnctn(payload) {
    console.log(payload)
    this.router.navigate(['/users/seller-settlement-master-list/' + payload.id])
  }

  createSellerSettlement() {
    const dialog = this.dialog.open(this.createSellerSettlementModal, {
      width: '300',
      // maxHeight: '600px',
      // height: '480px',
      panelClass: 'custom-AdminFileDownload',
      // data:{
      //   settled_last_date:this.settled_last_date,
      //   current_date:this.current_date,
      //   payment_settle_upto:this.payment_settle_upto,
      // }
    });
    dialog.afterClosed().subscribe(res => {

      this.apiMessageService.currentApiStatus.subscribe(data => {

        if (data.type === ActionTypes.createSellerSettlement && data.status == true) {

          this.store.dispatch(new GetSellerSettlementList({
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

      if (res && res.sellerSettlementList) {
        this.rowData = res.sellerSettlementList['seller_payment_masters'];
        this.settled_last_date = res.sellerSettlementList['settled_last_date'];
        this.current_date = res.sellerSettlementList['current_date'];
        this.payment_settle_upto = res.sellerSettlementList['payment_settle_upto'];
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
    if (this.start_date && this.end_date) {
      sessionStorage.setItem('start_date', moment(this.start_date).format('YYYY-MM-DD'));
      sessionStorage.setItem('end_date', moment(this.end_date).format('YYYY-MM-DD'));
      
      this.store.dispatch(new GetSellerSettlementList({
        "start_date": moment(this.start_date).format('YYYY-MM-DD'),
        "end_date": moment(this.end_date).format('YYYY-MM-DD'),
      }, this.pageNo))
    }
  }

  onPaymentSettleClick() {
    const payload = {
      "payment_settle_upto": moment(this.payment_settle_upto).format('YYYY-MM-DD')
    }
    console.log(payload)
    this.store.dispatch(new CreateSellerSettlement(payload))


  }

  onCloseDialog() {
    this.dialog.closeAll()
  }

}
