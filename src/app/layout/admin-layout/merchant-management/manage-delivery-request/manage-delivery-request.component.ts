import { Component, OnInit } from '@angular/core';
import { MerchentsStatus } from './constant';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { GetAllDeliveryRequestedMerchants, GetAllDeliveryRequest, GetRegionsList } from './../../../../actions/merchant-management.actions';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { GridLogoViewerComponent } from '../grid-logo-viewer/grid-logo-viewer.component';
import { ManageDeliveryRequestActionComponent } from '../../components/manage-delivery-request-action/manage-delivery-request-action.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryRequestSearchComponent } from '../delivery-request-search/delivery-request-search.component';

export interface DeliveryRequest {
  id: number;
  code: string;
  request: any;
  requestDate: Date;
  currentStatus: string,
  storeLogoUrl: string,
  createdAt: string,
}


export interface PayLoadForSearch {
  contactNo:string;
  storeName:string;
  regionName:string;
  zipCode:number;
  isAccending:boolean;
}


@Component({
  selector: 'app-manage-delivery-request',
  templateUrl: './manage-delivery-request.component.html',
  styleUrls: ['./manage-delivery-request.component.css']
})
export class ManageDeliveryRequestComponent implements OnInit {

  merchentsStatus: MerchentsStatus[] = [
    {
      statusKey: "ALL",
      statusValue: "ALL"
    },
    {
      statusKey: "ACTIVE",
      statusValue: "ACTIVE"
    },
    {
      statusKey: "APPROVED",
      statusValue: "APPROVED"
    },
    {
      statusKey: "PENDING",
      statusValue: "PENDING"
    },
    {
      statusKey: "HOLD",
      statusValue: "HOLD"
    },
    {
      statusKey: "BLOCKED",
      statusValue: "BLOCKED"
    },
    {
      statusKey: "APPROVED-NO-PRODUCT",
      statusValue: "APPROVED-NO-PRODUCT"
    }
  ]

  allMerchants = [];
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  private storeSubscription: Subscription;
  modalObj: null;
  paramsFromCellRender = null;
  regionList = [];

  pageNo = 1;
  totalRecords = null
  constructor(
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
    public dialog: MatDialog
  ) {

    this.columnDefs = [
      {
        headerName: 'Logo',
        filter: false,
        sortable: true,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        field: 'value',
        cellRendererFramework: GridLogoViewerComponent,
        floatingFiltersHeight: 0,
        resizable: true,
      },
      {
        headerName: 'Request Code',
        field: 'code',
        resizable: true,
        sortable: true,

      },
      {
        field: '',
        resizable: true,
        headerName: 'Requested At',
        // filter: 'agDateColumnFilter',
        filter: false,
        cellRenderer: (data) => {
          return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
        }
      },
      {
        headerName: 'Store Name',
        field: 'request.storeName',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'Contact No',
        field: 'request.contactNumber',
        resizable: true,
        sortable: true
      },
      {
        headerName: 'City',
        field: 'request.city',
        resizable: true
      },
      {
        headerName: 'Region',
        field: 'request.regionName',
        resizable: true
      },
      {
        field: 'request.zipCode',
        resizable: true,
        headerName: 'Zip Code'
      },
      {
        field: 'request.status',
        resizable: true,
        headerName: 'Store Status'
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
      filter: 'agTextColumnFilter'
    };
  }

  jsonObject: DeliveryRequest = null;	
  payLoadForSearch : PayLoadForSearch = null;

  ngOnInit() {
    //this.store.dispatch(new GetAllDeliveryRequestedMerchants({ pageNo: this.pageNo }));
    this.store.dispatch(new GetAllDeliveryRequest({ pageNo: this.pageNo, requestBody:null}));
    this.store.dispatch(new GetRegionsList());

    this.store.pipe(select ('merchantManagement')).subscribe(response=>{
      if(response && response.regionsList){
        this.regionList = response.regionsList.payload;
      }
    })

  }

  requestFnctn(params) {
    let url = this.route.url.split('/').filter(Boolean);
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
          this.allMerchants = [];
          if (res.deliveryRequestedMerchants['obj'] && res.deliveryRequestedMerchants['obj'][0]) {
            res.deliveryRequestedMerchants['obj'][0].forEach(element => {
              this.initilizeJsonObject();
              this.jsonObject.code = element.code;
              this.jsonObject.id = element.id;
              this.jsonObject.request = JSON.parse(element.request);
              this.jsonObject.requestDate = new Date(element.requestDate);
              this.jsonObject.createdAt = element.createdAt;
              this.jsonObject.storeLogoUrl = this.jsonObject.request.storeLogoUrl;
              this.allMerchants.push(this.jsonObject);
            });
          }
          this.totalRecords = res.deliveryRequestedMerchants['totalRecords'];
          if (this.allMerchants) {
            this.rowData = this.allMerchants;
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
    this.pageNo = page;
    this.store.dispatch(new GetAllDeliveryRequest({pageNo:this.pageNo,requestBody:this.payLoadForSearch}));
  }

  nextPage(event) {
    this.pageNo += 1;
    this.store.dispatch(new GetAllDeliveryRequest({pageNo:this.pageNo,requestBody:this.payLoadForSearch}));
  }

  public initilizeJsonObject() {
    this.jsonObject = {
      "code": '',
      "id": 0,
      "request": null,
      "requestDate": new Date(),
      "createdAt": "",
      "currentStatus": "",
      "storeLogoUrl": ""
    }
  };

  
  openDeliveryRequestRearch(){
    const dialog = this.dialog.open(DeliveryRequestSearchComponent, {
      panelClass: 'filter-modal',
      height: '10px',
      data:{regionList:this.regionList,payLoadForSearchIn:this.payLoadForSearch}
    });
  
    dialog.afterClosed().subscribe(result => {
      if(result){
        this.pageNo = 1;
        this.payLoadForSearch = result;
        this.store.dispatch(new GetAllDeliveryRequest({pageNo:this.pageNo,requestBody:this.payLoadForSearch}));
      }
    });
  }


}
