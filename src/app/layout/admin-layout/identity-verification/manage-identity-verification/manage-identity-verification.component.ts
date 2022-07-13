import { GetAllIdentityVerificationList } from './../../../../actions/identity-verification.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CellRendererIdentityVerificationComponent } from '../../components/cell-renderer-identity-verification/cell-renderer-identity-verification.component';
import { IdentityVerificationModalComponent } from '../../components/identity-verification-modal/identity-verification-modal.component';

@Component({
  selector: 'app-manage-identity-verification',
  templateUrl: './manage-identity-verification.component.html',
  styleUrls: ['./manage-identity-verification.component.css']
})
export class ManageIdentityVerificationComponent implements OnInit {
  private gridApi;
  columnDefs = [];
  defaultColDef;
  rowData: any[];
  rowSelection;
  pageNo = 1;
  totalRecords = 0;
  private storeSubscription: Subscription;
  allIdentityVerification = [];
  getAllIdentityStateList = [];
  selectedStatus = 'ALL';

  constructor(
    private store: Store<any>,
    private route: Router
  ) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'idName',
        resizable: true
      },
      {
        headerName: 'Identity No.',
        field: 'idNo',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'Type',
        field: 'idType',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'DOB',
        field: 'dob',
        cellRenderer: (data) => {
          return ((data.data.dob == null) ? '' : moment(data.data.dob).format('DD-MM-YYYY HH:mm'));
        },
        resizable: true,
        sortable: true
      },
      {
        headerName: 'Gender',
        field: 'idGender',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'Country',
        field: 'country',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'Identity Match',
        field: 'identityMatch',
        valueGetter(params) {
          return params.data.identityMatch == 1 ? 'Yes' : 'No';
        },
        resizable: true,
        sortable: true
      },
      // {
      //   headerName: 'Verification Status',
      //   field: 'isVerified',
      //   resizable: true,
      //   sortable: true
      // },
      // {
      //   headerName: 'Verified By',
      //   field: 'verifiedBy',
      //   resizable: true,
      //   sortable: true
      // },
      // {
      //   headerName: 'Verification Type',
      //   field: 'verificationType',
      //   resizable: true,
      //   sortable: true
      // },
      // {
      //   headerName: 'Verification Date',
      //   field: 'verificationDate',
      //   cellRenderer: (data) => {
      //     return moment(data.data.verificationDate).format('DD/MM/YYYY HH:mm');
      //   },
      //   resizable: true,
      //   sortable: true
      // },
      {
        headerName: 'Proccessing Status',
        field: 'isPending',
        valueGetter(params) {
          return params.data.isPending == 1 ? 'Pending' : 'Complete';
        },
        resizable: true,
        sortable: true,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        field: 'entryDate',
        resizable: true,
        sortable: true,
        headerName: 'Created At',
        cellRenderer: (data) => {
          return ((data.data.entryDate == null) ? '' : moment(data.data.entryDate).format('DD-MM-YYYY HH:mm'));
        }
      },
      {
        headerName: 'Action',
        //field: 'value',
        // colId: 'params',
        type: IdentityVerificationModalComponent,
        cellRendererFramework: CellRendererIdentityVerificationComponent,
        // cellRendererParams: {
        //   onActionBtnClick: [this.requestFnctn.bind(this), this.rejectApproveOperation.bind(this)]
        // },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter'
    };

    this.rowSelection = 'multiple';
  }

  ngOnInit() {
    this.store.dispatch(new GetAllIdentityVerificationList({ pageNo: this.pageNo, requestBody: null }));
    this.store.pipe(select('identityVerification'))
      .subscribe(response => {
        console.log('ngOnit Rss:::', response);
        if (response && response.getAllIdentityState) {
          this.getAllIdentityStateList = response.getAllIdentityState.payload;
        }
      });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.storeSubscription = this.store
      .pipe(select('identityVerification'))
      .subscribe(res => {
        console.log('onGridReady Rss:::', res);
        // this.allIdentityVerification = res.getAllIdentityState;
        if (res && res['getAllIdentityState']) {
          this.allIdentityVerification = res['getAllIdentityState'];
          this.totalRecords = this.allIdentityVerification['totalRecords'];
          this.rowData = this.allIdentityVerification['payload'];
          event.api.setRowData(this.allIdentityVerification['payload']);
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

  onGridSizeChanged(params) {
    const gridWidth = params.offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
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


  getPageNoData(page: number) {
    this.selectedStatus = 'ALL';
    this.pageNo = page;

    this.defaultColumnDefination();
    this.store.dispatch(new GetAllIdentityVerificationList({ pageNo: this.pageNo, requestBody: null }));

  }
  nextPage(event) {
    this.selectedStatus = 'ALL';
    this.pageNo += 1;
    this.defaultColumnDefination();
    this.store.dispatch(new GetAllIdentityVerificationList({ pageNo: this.pageNo, requestBody: null }));
  }


}
