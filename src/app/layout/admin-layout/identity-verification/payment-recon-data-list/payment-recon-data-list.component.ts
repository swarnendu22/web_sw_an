import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import * as moment from 'moment';
import { GetPaymentReconcilationDataList } from '../../../../actions/identity-verification.action';
import { Location } from '@angular/common'

@Component({
  selector: 'app-payment-recon-data-list',
  templateUrl: './payment-recon-data-list.component.html',
  styleUrls: ['./payment-recon-data-list.component.css']
})
export class PaymentReconDataListComponent implements OnInit {
  id = null
  loading = false
  status = 'PENDING';
  gridApi = null;
  gridApi2 = null;
  gridApi3 = null;
  page = 1;
  per_page = 100;
  total_pages = null;

  columnDefs = [
    {
      headerName: 'Recon JustPay',
      field: 'is_recon_jus',
      resizable: true,
    },
    {
      headerName: 'Recon PaymentGateway',
      field: 'is_recon_pg',
      resizable: true,
    },
    {
      headerName: 'Is Reconciled',
      field: 'is_reconciled',
      resizable: true,
    },
    {
      headerName: 'Is RedFlag',
      field: 'is_redflag',
      resizable: true,
    },
    {
      headerName: 'JustPay Amount',
      field: 'jus_amount',
      resizable: true,
    },
    {
      headerName: 'JustPay Order Date',
      field: 'jus_order_date',
      resizable: true,

      cellRenderer: (data) => {
        if (data.data.ndh_order_date) {
          return moment(data.data.ndh_order_date).format('YYYY-MM-DD')
        }
      }

    },
    {
      headerName: 'Justpay Payment Mode',
      field: 'jus_pay_mode',
      resizable: true,
    }, 
  ];
  rowSelection = 'single';

  columnDefs2 = [
    {
      headerName: 'Justpay Payment OrderId',
      field: 'jus_pg_order_id',
      resizable: true,
    },
    {
      headerName: 'Justpay Status',
      field: 'jus_status',
      resizable: true,
    },
    {
      headerName: 'Justpay TransactionId',
      field: 'jus_tran_id',
      resizable: true,
    },
    {
      headerName: 'Ndh Amount',
      field: 'ndh_amount',
      resizable: true,
    },
    {
      headerName: 'Ndh Order Date',
      field: 'ndh_order_date',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.ndh_order_date) {
          return moment(data.data.ndh_order_date).format('YYYY-MM-DD')
        }
      }
    },
    {
      headerName: 'NDH Order Id',
      field: 'ndh_order_id',
      resizable: true,
    },
    {
      headerName: 'NDH Order No',
      field: 'ndh_order_no',
      resizable: true,
    },
    {
      headerName: 'Ndh Payment Mode',
      field: 'ndh_pay_mode',
      resizable: true,
    },
    {
      headerName: 'NDH Payment Gateway Id',
      field: 'ndh_pg_id',
      resizable: true,

    },
  ];
  columnDefs3 = [
    {
      headerName: 'Payment Gateway TxnId',
      field: 'ndh_pg_txn_id',
      resizable: true,
    },
    {
      headerName: 'NDH status',
      field: 'ndh_status',
      resizable: true,
    },
    {
      headerName: 'Payment Checkout Number',
      field: 'payment_checkout_number',
      resizable: true,

    },
    {
      headerName: 'Payment Gateway Amount',
      field: 'pg_amount',
      resizable: true,

    },
    {
      headerName: 'Payment Gateway Order Date',
      field: 'pg_order_date',
      resizable: true,
      cellRenderer: (data) => {
        if (data.data.pg_order_date) {
          return moment(data.data.pg_order_date).format('YYYY-MM-DD')
        }
      }
    },
    {
      headerName: 'Payment Gateway OrderId',
      field: 'pg_order_id',
      resizable: true,

    },
    {
      headerName: 'Payment Gateway Status',
      field: 'pg_status',
      resizable: true,

    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      resizable: true,
    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  allCatalogList = null;
  rowData = [];
  rowData2 = [];
  rowData3 = [];
  constructor(private store: Store<any>,
    private ag: AgGridOptions, private activatedRoute: ActivatedRoute, private location: Location) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.store.dispatch(new GetPaymentReconcilationDataList({
      "id": this.id,
      "page": this.page,
      "per_page": this.per_page,
    }));
  }

  ngOnInit() {

  }
  onRowClicked(event) {
    event.node.setSelected(true);
    this.gridApi2.ensureIndexVisible(event.rowIndex);
    this.gridApi2.forEachNode((node2) => {
      if (node2.rowIndex === event.rowIndex) {
        node2.setSelected(true);
        this.gridApi2.ensureIndexVisible(node2.rowIndex);
      }
    });
    this.gridApi3.forEachNode((node3) => {
      if (node3.rowIndex === event.rowIndex) {
        node3.setSelected(true);
        this.gridApi3.ensureIndexVisible(node3.rowIndex);
      }
    });
  }
  onRowClicked2(event) {
    event.node.setSelected(true);
    this.gridApi.forEachNode((node) => {
      if (node.rowIndex === event.rowIndex) {
        node.setSelected(true);
        this.gridApi.ensureIndexVisible(node.rowIndex);
      }
    });
    this.gridApi3.forEachNode((node3) => {
      if (node3.rowIndex === event.rowIndex) {
        node3.setSelected(true);
        this.gridApi3.ensureIndexVisible(node3.rowIndex);
      }
    });
  }
  onRowClicked3(event) {
    event.node.setSelected(true);
    this.gridApi.forEachNode((node) => {
      if (node.rowIndex === event.rowIndex) {
        node.setSelected(true);
        this.gridApi.ensureIndexVisible(node.rowIndex);
      }
    });
    this.gridApi2.forEachNode((node2) => {
      if (node2.rowIndex === event.rowIndex) {
        node2.setSelected(true);
        this.gridApi2.ensureIndexVisible(node2.rowIndex);
      }
    });
  }
  onGridSizeChanged(params) {
   
  }
  onGridReady(event) {
    this.store.pipe(select('identityVerification')).subscribe(res => {
      if (res && res.paymentReconcilationDataList) {
        this.total_pages =  res.paymentReconcilationDataList.total_pages;
        this.rowData = res.paymentReconcilationDataList.payment_recon_masters;
        this.gridApi = event.api;
      }
    });
  }
  firstDataRendered(event) {
    this.gridApi.forEachNode((node) => {
      node.setId('tb_'+node.rowIndex);
      node.id = 'tb_'+node.rowIndex;
      this.gridApi.redrawRows({node})
    });
  }
  onGridReady2(event) {
    this.store.pipe(select('identityVerification')).subscribe(res => {
      if (res && res.paymentReconcilationDataList) {
        this.rowData2 = res.paymentReconcilationDataList.payment_recon_masters;
        this.gridApi2 = event.api;
      }
    });
  }
  firstDataRendered2(event) {
    this.gridApi2.forEachNode((node2) => {
      node2.setId('tb2_'+node2.rowIndex);
      node2.id = 'tb2_'+node2.rowIndex;
      this.gridApi2.redrawRows({node2})
    });
  }
  onGridReady3(event) {
    this.store.pipe(select('identityVerification')).subscribe(res => {
      if (res && res.paymentReconcilationDataList) {
        this.rowData3 = res.paymentReconcilationDataList.payment_recon_masters;
        this.gridApi3 = event.api;
      }
    });
  }
  firstDataRendered3(event) {
    this.gridApi3.forEachNode((node3) => {
      node3.setId('tb3_'+node3.rowIndex);
      node3.id = 'tb3_'+node3.rowIndex;
      this.gridApi3.redrawRows({node3})
    });
  }
  backReconcilation() {
    this.location.back()
  }
  pageChange() {
    this.store.dispatch(new GetPaymentReconcilationDataList({
      "id": this.id,
      "page": this.page,
      "per_page": this.per_page,
    }));
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}