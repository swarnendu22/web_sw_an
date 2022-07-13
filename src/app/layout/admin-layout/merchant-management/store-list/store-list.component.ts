import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { GetBusinessCategory, GetRegionsList } from './../../../../actions/merchant-management.actions';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantManagecellActionButtonComponent } from '../../components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { GridLogoViewerComponent } from '../grid-logo-viewer/grid-logo-viewer.component';
import { ToastrService } from 'ngx-toastr';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { CellRenderStoreTypeComponent } from '../../components/cell-render-store-type/cell-render-store-type.component';
import { CellRenderStoreViewComponent } from '../../components/cell-render-store-view/cell-render-store-view.component';
import * as moment from 'moment';
import { GetStoreListByMerchantId } from './../../../../actions/merchant-management.actions';

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
  merchnatId: string;
}

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  merchantId = null;
  allMerchants = [];
  private gridApi;
  columnApi;
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
  storeStatus = 'all';

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
    merchnatId: null,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private apiMsgService: ApiMessageService,
    public dialog: MatDialog,
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.id;
    this.columnDefs = [
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
        cellStyle: { color: 'blue', 'text-decoration': 'underline' },
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
      {
        headerName: 'Store Type',
        field: 'storeType',
        cellRendererFramework: CellRenderStoreTypeComponent,
        width: 150,
        maxWidth: 150,
        minWidth: 150,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
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
        width: 150,
        maxWidth: 150,
        minWidth: 150,
        cellRenderer: (data) => {
          return `<div style="height: 22px;
                  padding: 0px 15px;
                  display: inline-block;
                  line-height: 22px;
                  font-size: 12px;
                  font-weight: 600;
                  background: #46b920;
                  color: white;
                  border-radius: 30px;">${data.data.status}</div>`
        }
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: MerchantManagecellActionButtonComponent,
        cellRendererParams: {
          onActionBtnClick: [this.requestFnctn.bind(this)]
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
      filter: 'agTextColumnFilter'
    };

    this.rowSelection = 'multiple';
    this.rowHeight = 70;
  }

  ngOnInit(): void {
    this.payLoadForSearch.status = this.storeStatus;
    this.payLoadForSearch.merchnatId = this.merchantId;
    this.store.dispatch(new GetStoreListByMerchantId({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
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
  requestFnctn(params) {
    sessionStorage.setItem('merchantId', this.merchantId);
    this.route.navigate([`merchant/manage-store/show/${params.storeId}/${params.latitude}/${params.longitude}`]);
  }
  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
    this.storeSubscription = this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      this.allMerchants = res.storeListByMerchantId;
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
  getPageNoData(page: number) {
    this.selectedStatus = 'ALL';
    this.pageNo = page;

    if (!this.payLoadForSearch) {
      this.payLoadForSearch.merchnatId = this.merchantId;
      this.store.dispatch(new GetStoreListByMerchantId({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    } else {
      if (!this.payLoadForSearch.status) {
        this.selectedStatus = 'ALL';
      } else {
        this.selectedStatus = this.payLoadForSearch.status;
      }
      this.payLoadForSearch.merchnatId = this.merchantId;
      this.store.dispatch(new GetStoreListByMerchantId({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    }
  }
  nextPage(event) {
    this.selectedStatus = 'ALL';
    this.pageNo += 1;
    if (!this.payLoadForSearch) {
      this.payLoadForSearch.merchnatId = this.merchantId;
      this.store.dispatch(new GetStoreListByMerchantId({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));
    } else {
      if (!this.payLoadForSearch.status) {
        this.selectedStatus = 'ALL';
      } else {
        this.selectedStatus = this.payLoadForSearch.status;
      }
      this.payLoadForSearch.merchnatId = this.merchantId;
      this.store.dispatch(new GetStoreListByMerchantId({ pageNo: this.pageNo, pageSize: this.pageSize, requestBody: this.payLoadForSearch }));

    }
  }
  onCellClicked(e) {
    if (e.colDef.field == 'storeName') {
      sessionStorage.setItem('merchantId', this.merchantId);
      this.route.navigate([`merchant/manage-store/show/${e.data.id}/${e.data.geoLat}/${e.data.geoLong}`]);
    }
  }
  openAddStore() {
    this.route.navigate([`merchant/register-store/${this.merchantId}`]);
  }
}
