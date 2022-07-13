import { Component, OnInit } from '@angular/core';
import { MerchentsStatus } from '../manage-merchents/constant';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { GetAllMerchants, StoreBulkOperation, ActionTypes, StoreApproveReject, GetBusinessCategory, GetRegionsList } from './../../../../actions/merchant-management.actions';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import qs from 'qs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MerchantManagecellActionButtonComponent } from '../../components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { GridLogoViewerComponent } from '../grid-logo-viewer/grid-logo-viewer.component';
import { CellRenderCheckboxComponent } from '../../components/cell-render-checkbox/cell-render-checkbox.component';
import { ConfirmationBoxComponent } from '../../components/confirmation-box/confirmation-box.component';
import { ToastrService } from 'ngx-toastr';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreFilterPopupComponent } from '../store-filter-popup/store-filter-popup.component';
import { CellRenderStoreTypeComponent } from '../../components/cell-render-store-type/cell-render-store-type.component';
import { CellRenderStoreViewComponent } from '../../components/cell-render-store-view/cell-render-store-view.component';
import * as moment from 'moment';

export interface PayLoadForBulkProcess {
  storeId: number[];
  status: string;
  remarks: string;
  storeObj: any;
}

export interface PayloadForStoreApproveReject {
  storeId: number,
  remarks: string,
  status: string,
  storeObj: any
}

export interface PayLoadForSearch {
  pinCode: string;
  stateCode: string;
  storeName: string;
  businessCategory: number;
  status: string;
  storeType: string;
  storeLevel: string;
  dateType: string;
  isAesc: boolean;
  contactNo: string;
  createdDateFrom: string;
  createdDateTo: string;
  businessCategoryName: string;
}
@Component({
  selector: 'app-deactivated-merchants',
  templateUrl: './deactivated-merchants.component.html',
  styleUrls: ['./deactivated-merchants.component.css']
})
export class DeactivatedMerchantsComponent implements OnInit {
  allMerchants = [];
  private gridApi;
  columnDefs = [];
  defaultColDef;
  rowData: any[];
  private storeSubscription: Subscription;
  modalObj: null;
  paramsFromCellRender = null;
  rowSelection;
  rowHeight;
  bulkOperationList = [];
  pageNo = 1;
  pageSize = 1000;
  totalRecords = 0;
  selectedStatus = 'ALL';
  businessCategoryList = [];
  regionList = [];
  storeTypeSearch = '';
  storeLevel = '';

  payLoadForBulkProcess: PayLoadForBulkProcess = {
    storeId: [],
    remarks: "",
    status: "",
    storeObj: null
  }

  payLoadForStoreApproceReject: PayloadForStoreApproveReject = {
    storeId: 0,
    storeObj: null,
    remarks: "",
    status: ""
  }

  payLoadForSearch: PayLoadForSearch = {
    pinCode: null,
    stateCode: null,
    storeName: null,
    businessCategory: null,
    status: null,
    storeType: null,
    storeLevel: null,
    dateType: null,
    isAesc: null,
    contactNo: null,
    createdDateFrom: null,
    createdDateTo: null,
    businessCategoryName: null,
  };

  constructor(
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private apiMsgService: ApiMessageService,
    public dialog: MatDialog,

  ) {

    this.columnDefs = [
      // {
      //   headerName: '',
      //   colId: 'params',
      //   cellRendererFramework: CellRenderCheckboxComponent,
      //   cellRendererParams: {
      //     onActionBtnClick: this.checkBoxSelected.bind(this),
      //   },
      //   width: 50,
      //   maxWidth: 50,
      //   minWidth: 50,
      //   sortable: false,
      //   filter: false,
      //   floatingFiltersHeight: 0,
      //   resizable: true,
      // },
      {
        headerName: 'Logo',
        filter: false,
        sortable: true,
        width: 70,
        maxWidth: 70,
        minWidth: 70,
        field: 'value',
        cellRendererFramework: GridLogoViewerComponent,
        floatingFiltersHeight: 0,
        resizable: true,
      },
      {
        headerName: '',
        field: 'value',
        cellRendererFramework: CellRenderStoreViewComponent,
        width: 50,
        maxWidth: 50,
        minWidth: 50,
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
      {
        headerName: 'Store Name',
        field: 'storeName',
        resizable: true,
        sortable: true,
        //cellStyle: { color: 'blue', 'text-decoration': 'underline' },
      },
      {
        headerName: 'Business Category',
        field: 'business_category_name',
        resizable: true,
        sortable: true,
        width: 150,
        maxWidth: 150,
        minWidth: 150,
      },
      {
        field: 'city',
        resizable: true,
        width: 120,
        maxWidth: 120,
        minWidth: 120,
      },
      {
        field: 'regionName',
        resizable: true,
        width: 120,
        maxWidth: 120,
        minWidth: 120,
      },
      {
        field: 'contactNumber',
        resizable: true,
        headerName: 'Contact No'
      },
      {
        field: 'productCount',
        resizable: true,
        headerName: 'Products',
        filter: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        cellRenderer: (data) => {
          if (data.data.productCount)
            return Number(data.data.productCount)
        }
      },
      // {
      //   field: 'profileCompletionPercent',
      //   resizable: true,
      //   headerName: 'Profile %'
      // },
      {
        headerName: 'Store Type',
        field: 'storeType',
        width: 150,
        maxWidth: 150,
        minWidth: 150,
        autoHeight: true,
        sortable: false,
        filter: false,
        resizable: true,
      },
      {
        headerName: 'Store Level',
        field: 'storeLevel',
        resizable: true,
        sortable: true,
        width: 120,
        maxWidth: 120,
        minWidth: 120,
      },
      // {
      //   field: 'contactSyncCount',
      //   resizable: true,
      //   headerName: 'Contact Sync',
      //   cellRenderer: (data) => {
      //     if (data.data.contactSyncCount)
      //       return Number(data.data.contactSyncCount)
      //   }
      // },
      {
        field: 'createdAt',
        resizable: true,
        filter: false,
        headerName: 'Created At',
        cellRenderer: (data) => {
          return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
        }
      },
      {
        field: 'status',
        resizable: true,
        headerName: 'Status',
        filter: false,
        cellRenderer: (data) => {
          return `<div style="height: 22px;
          padding: 0px 15px;
          display: inline-block;
          line-height: 22px;
          font-size: 12px;
          font-weight: 600;
          background: red;
          color: white;
          border-radius: 30px;">${data.data.status}</div>`
        }
      },
      // {
      //   headerName: 'Action',
      //   field: 'value',
      //   colId: 'params',
      //   cellRendererFramework: MerchantManagecellActionButtonComponent,
      //   cellRendererParams: {
      //     onActionBtnClick: [this.requestFnctn.bind(this), this.rejectApproveOperation.bind(this)]
      //   },
      //   width: 50,
      //   sortable: false,
      //   filter: false,
      //   floatingFiltersHeight: 0,
      //   resizable: true,
      // }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter'
    };

    this.rowSelection = 'multiple';
    this.rowHeight = 50;
  }

  ngOnInit() {
    this.payLoadForSearch.status = 'DEACTIVATED'
    this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    this.store.dispatch(new GetBusinessCategory());
    this.store.dispatch(new GetRegionsList());
    this.store.pipe(select('merchantManagement'))
      .subscribe(response => {
        if (response && response.buisnessCategory) {
          this.businessCategoryList = response.buisnessCategory.payload;
        }
      })
    this.store.pipe(select('merchantManagement')).subscribe(response => {
      if (response && response.regionsList) {
        this.regionList = response.regionsList.payload;
      }
    })
  }
  onStoreTypeChange() {
    this.payLoadForSearch = {
      pinCode: null,
      stateCode: null,
      storeName: null,
      businessCategory: null,
      status: 'DEACTIVATED',
      storeType: this.storeTypeSearch,
      storeLevel: this.storeLevel,
      dateType: null,
      isAesc: null,
      contactNo: null,
      createdDateFrom: null,
      createdDateTo: null,
      businessCategoryName: null,
    };
    this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  statusFilter() {
    let status = this.selectedStatus;
    var countryFilterComponent = this.gridApi.getFilterInstance('status');
    let columnDefTemp = this.changeColumnDefination(this.gridApi.columnController.columnDefs, status);
    if ('ALL' === status) {
      countryFilterComponent.setModel(null);
    } else {
      countryFilterComponent.selectNothing();
      countryFilterComponent.selectValue(status);
      countryFilterComponent.applyModel();
    }
    this.gridApi.onFilterChanged();
    this.gridApi.columnController.setColumnDefs(columnDefTemp);
    this.gridApi.sizeColumnsToFit();
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

  requestFnctn(params) {
    let url = this.route.url.split('/').filter(Boolean)
    url.push('show');
    url.push(params.storeId);
    url.push(params.latitude);
    url.push(params.longitude);
    this.route.navigate(url);
  }

  rejectApproveOperation(params) {
    if (params) {
      const dialog = this.dialog.open(ConfirmationBoxComponent, {
        width: '50%',
        data: { payload: params }
      });
      dialog.afterClosed().subscribe(result => {
        if (result.processType === 'process') {
          this.payLoadForStoreApproceReject.storeId = result.payload.payload.paramData.id;
          this.payLoadForStoreApproceReject.status = result.payload.payload.actionType;
          this.payLoadForStoreApproceReject.remarks = result.remarks;
          this.store.dispatch(new StoreApproveReject({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForStoreApproceReject, searchPayLoad: this.payLoadForSearch }));
          this.apiMsgService.currentApiStatus.subscribe((response) => {
            let res: any = response.status;
            if (res && response.type == ActionTypes.storeApproveReject) {
              this.bulkOperationList = [];
              if (this.payLoadForSearch && this.payLoadForSearch.status) {
                this.selectedStatus = this.payLoadForSearch.status;
              } else {
                this.selectedStatus = "ALL";
              }
            }
          })
        }
      });
    }
  }
  checkBoxSelected(params) {
    if (params) {
      let index = this.bulkOperationList.indexOf(params.alldata.id);
      if (params.checkBoxValue) {
        if (index < 0) {
          this.bulkOperationList.push(params.alldata.id);
        }
      } else {
        this.bulkOperationList.splice(index, 1);
      }
    }
  }
  onGridReady(event) {
    this.gridApi = event.api;
    this.storeSubscription = this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      this.allMerchants = res.allMerchants;
      if (this.allMerchants) {
        this.totalRecords = this.allMerchants['totalRecords'];
        this.rowData = this.allMerchants['payload'];
        event.api.setRowData(this.rowData);
        this.modalService.dismissAll();
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
  changeColumnDefination(columnDefination: any[], status: string): any[] {
    let columnDefTemp = [];
    if ('ALL' === status) {
      if (columnDefination.length === 11) {
        columnDefTemp = columnDefination.splice(0, 10);
      }
    } else {
      if (columnDefination.length === 10) {
        columnDefination.push({
          headerName: 'Check',
          colId: 'params',
          cellRendererFramework: CellRenderCheckboxComponent,
          cellRendererParams: {
            onActionBtnClick: this.checkBoxSelected.bind(this),
          },
          sortable: false,
          filter: false,
          floatingFiltersHeight: 0,
          resizable: true
        });
      }
      columnDefTemp = columnDefination;
    }
    return columnDefTemp;
  }
  bulkOperation(operation) {
    if (this.bulkOperationList && this.bulkOperationList.length > 0) {
      this.payLoadForBulkProcess.status = operation;
      this.payLoadForBulkProcess.storeId = this.bulkOperationList;
      if (operation === 'REJECTED') {
        this.payLoadForBulkProcess.remarks = "Bulk Operation For Reject";
      } else {
        this.payLoadForBulkProcess.remarks = "Bulk Operation For Approve";
      }
      this.store.dispatch(new StoreBulkOperation({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForBulkProcess, searchPayLoad: this.payLoadForSearch }));
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.storeBulkOperation) {
          this.selectedStatus = this.payLoadForSearch.status;
          this.bulkOperationList = [];
        }
      })
    } else {
      this.toaster.error("No Store Selected");
    }
  }
  getPageNoData(page: number) {
    this.selectedStatus = 'ALL';
    this.pageNo = page;

    if (!this.payLoadForSearch) {
      this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    } else {
      if (!this.payLoadForSearch.status) {
        this.selectedStatus = 'ALL';
      } else {
        this.selectedStatus = this.payLoadForSearch.status;
      }
      this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    }
  }
  nextPage(event) {
    this.selectedStatus = 'ALL';
    this.pageNo += 1;
    if (!this.payLoadForSearch) {
      this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    } else {
      if (!this.payLoadForSearch.status) {
        this.selectedStatus = 'ALL';
      } else {
        this.selectedStatus = this.payLoadForSearch.status;
      }
      this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));

    }
  }
  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }
  addCheckBoxInColumnDefination() {
    if (this.gridApi.columnController.columnDefs.length === 10) {
      let columnDef = this.gridApi.columnController.columnDefs.push({
        headerName: 'Check',
        colId: 'params',
        cellRendererFramework: CellRenderCheckboxComponent,
        cellRendererParams: {
          onActionBtnClick: this.checkBoxSelected.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true
      });
      this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs);
      this.gridApi.sizeColumnsToFit();
    }
  }
  openStoreFilter() {
    const dialog = this.dialog.open(StoreFilterPopupComponent, {
      panelClass: 'filter-modal',
      data: { businessCategoryList: this.businessCategoryList, regionList: this.regionList, payLoadForSearchIn: this.payLoadForSearch }
    });
    dialog.afterClosed().subscribe(result => {
      this.pageNo = 1;
      this.selectedStatus = '';
      if (result) {
        this.payLoadForSearch = result;
        this.store.dispatch(new GetAllMerchants({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
        if (!this.payLoadForSearch.status) {
          this.selectedStatus = 'ALL';
        } else {
          this.selectedStatus = this.payLoadForSearch.status;
        }
      }
    });

  }
  onCellClicked(e) {
    // if (e.colDef.field == 'storeName') {
    //   let url = this.route.url.split('/').filter(Boolean)
    //   url.push('show');
    //   url.push(e.data.id);
    //   url.push(e.data.geoLat);
    //   url.push(e.data.geoLong);
    //   this.route.navigate(url);
    // }
  }
}