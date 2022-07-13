import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { GetAllDeliveryRequestedMerchants } from './../../../../actions/merchant-management.actions';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import qs from 'qs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PendingMerchantCellRendererButtonComponent } from '../../components/pending-merchant-cell-renderer-button/pending-merchant-cell-renderer-button.component';
import { MerchantManagecellActionButtonComponent } from '../../components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { GridLogoViewerComponent } from '../grid-logo-viewer/grid-logo-viewer.component';
import { ManageDeliveryRequestActionComponent } from '../../components/manage-delivery-request-action/manage-delivery-request-action.component';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';

@Component({
  selector: 'app-approve-store',
  templateUrl: './approve-store.component.html',
  styleUrls: ['./approve-store.component.css']
})
export class ApproveStoreComponent implements OnInit {

  allMerchants = [];
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  private storeSubscription: Subscription;
  modalObj: null;
  paramsFromCellRender = null;

  pageNo = 1;
  totalRecords = null
  constructor(
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {

    this.columnDefs = [
      {
        headerName: 'Logo',
        filter: false,
        sortable: true,
        field: 'value',
        cellRendererFramework: GridLogoViewerComponent,
        floatingFiltersHeight: 0,
        resizable: true,
      },
      {
        headerName: 'Store Name',
        field: 'storeName',
        resizable: true,
        sortable: true
      },
      {
        field: 'city',
        resizable: true
      },
      {
        field: 'regionName',
        resizable: true,
      },
      {
        field: 'zipCode',
        resizable: true,
        headerName: 'Zip Code'
      },
      {
        field: 'status',
        resizable: true,
        headerName: 'Store Status',
        filter: true,
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: ManageDeliveryRequestActionComponent,
        cellRendererParams: {
          onActionBtnClick: this.requestFnctn.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
    };
  }


  ngOnInit() {
    this.store.dispatch(new GetAllDeliveryRequestedMerchants({ pageNo: this.pageNo }));
  }


  requestFnctn(params) {
    let url = this.route.url.split('/').filter(Boolean)
    console.log(params.alldata);
    url.push('show');
    url.push(JSON.stringify(params.alldata));
    this.route.navigate(url);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  statusFilter(ob) {
    let status = ob.value;
    var countryFilterComponent = this.gridApi.getFilterInstance('status');
    if ('ALL' === status) {
      countryFilterComponent.setModel(null);
    } else {
      countryFilterComponent.selectNothing();
      countryFilterComponent.selectValue(status);
      countryFilterComponent.applyModel();
    }
    this.gridApi.onFilterChanged();
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


  onGridReady(event) {
    this.gridApi = event.api;
    this.storeSubscription = this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.deliveryRequestedMerchants) {
          this.allMerchants = res.deliveryRequestedMerchants['obj'];
          this.totalRecords = res.deliveryRequestedMerchants['totalRecords'];
          if (this.allMerchants) {
            this.rowData = this.allMerchants[0];
            console.log(this.rowData);
            event.api.setRowData(this.rowData);
            this.modalService.dismissAll();
          }
        }
      });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetAllDeliveryRequestedMerchants({ pageNo: this.pageNo }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetAllDeliveryRequestedMerchants({ pageNo: this.pageNo }));
  }

}
