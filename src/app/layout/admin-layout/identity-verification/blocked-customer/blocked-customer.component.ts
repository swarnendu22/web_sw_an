import { GetActiveAndInactiveCustomers } from './../../../../actions/identity-verification.action';
import { CellRendererButtonComponent } from './../../components/cell-renderer-button/cell-renderer-button.component';
import { ApiMessageService } from './../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-blocked-customer',
  templateUrl: './blocked-customer.component.html',
  styleUrls: ['./blocked-customer.component.css']
})
export class BlockedCustomerComponent implements OnInit {
  private gridApi;
  rowModelType = 'serverSide';
  cacheBlockSize = 50;
  maxBlocksInCache = 30;
  totalRecords = null;
  pageNo = 1;
  allSetList = [];
  payload = {
    roleNameArr: ['CUSTOMER'],
    activeStatus: 0
  }
  rowData: any;
  activeCustomerList = null;
  activeCustomer = null;
  gridEvent;
  private storeSubscription: Subscription;
  constructor(
    private store: Store<any>, private router: Router, private apiMessageService: ApiMessageService,
    private ag: AgGridOptions
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetActiveAndInactiveCustomers(this.pageNo, this.payload));
    this.store.pipe(select('identityVerification')).subscribe(res => {
      // this.activeCustomerList = res.activeCustomers.payload;
      if (res) {
        this.activeCustomer = res.activeAndInactiveCustomers;
        console.log("Active Customer Component", res.activeAndInactiveCustomers)
      }
    });
  }

  columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: 'agTextColumnFilter',
      sortable: true,
    },

    {
      headerName: 'Phone',
      field: 'phone',
      filter: 'agTextColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      width: 100,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      resizable: false,
    },
  ];

  onGridReady(event) {
    this.gridApi = event.api;
    this.storeSubscription = this.store
      .pipe(select('identityVerification'))
      .subscribe(res => {
        console.log('onGridReady Rss:::', res);
        // this.allIdentityVerification = res.affiliateUsersReducer;
        if (res && res['activeAndInactiveCustomers']) {
          this.activeCustomerList = res['activeAndInactiveCustomers'];
          this.totalRecords = this.activeCustomerList['totalRecords'];
          this.rowData = this.activeCustomerList['payload'];
          event.api.setRowData(this.activeCustomerList['payload']);
          // this.modalService.dismissAll();
        }
      });
    // tslint:disable-next-line: only-arrow-functions
    window.addEventListener('resize', function () {
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }
  // onGridReady(event) {
  //   this.gridApi = event.api;
  //     if (this.activeCustomer) {
  //       this.activeCustomerList = this.activeCustomer.payload;
  //       this.totalRecords = this.activeCustomer.totalRecords;
  //     //  this.rowData = this.allIdentityVerification['payload'];
  //       event.api.setRowData(this.activeCustomerList);
  //       // this.modalService.dismissAll();
  //     }
  //  }

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

  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetActiveAndInactiveCustomers(this.pageNo, this.payload));
  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetActiveAndInactiveCustomers(this.pageNo, this.payload));
  }

  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

}

