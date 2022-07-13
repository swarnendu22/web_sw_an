import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ManageMerchantDraft, StoreMerchantDraft } from './../../../../actions/merchant-management.actions';

import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ManageDraftActionComponent } from '../../components/manage-draft-action/manage-draft-action.component';
import * as moment from 'moment';

export interface MerchentsStatus {
  statusKey: string;
  statusValue: string;
}

export interface DraftRequest {
  id: number;
  code: string;
  request: any;
  requestDate: Date;
  currentStatus: string
  createdAt: any
}

@Component({
  selector: 'app-manage-draft',
  templateUrl: './manage-draft.component.html',
  styleUrls: ['./manage-draft.component.css']
})
export class ManageDraftComponent implements OnInit {



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

  allMerchants: DraftRequest[] = [];
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  private storeSubscription: Subscription;
  modalObj: null;
  paramsFromCellRender = null;
  jsonObject: DraftRequest = null;
  pageNo = 1;
  totalRecords = null;


  constructor(
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    this.store.dispatch(new ManageMerchantDraft({ "pageNo": this.pageNo }));

    this.columnDefs = [
      {
        headerName: 'Request Code',
        field: 'code',
        resizable: true,
        sortable: true,

      },
      {
        field: '',
        resizable: true,
        filter: false,
        headerName: 'Requested At',
        cellRenderer: (data) => {
          console.log(data)
          return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
        }
      },
      {
        headerName: 'Store Name',
        field: 'request.store.storeName',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'City',
        resizable: true,
        field: 'request.store.city',
      },
      {
        headerName: 'Region Name',
        field: 'request.store.regionName',
        resizable: true,
      },
      {
        headerName: 'Zip Code',
        field: 'request.store.zipCode',
        resizable: true
      },
      {
        headerName: 'Contact No',
        field: 'request.store.contactNumber',
        resizable: true
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: ManageDraftActionComponent,
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
      filter: 'agTextColumnFilter',
    };

  }

  ngOnInit() {

 //   this.store.dispatch(new ManageMerchantDraft({ "pageNo": this.pageNo }));

  }


  ngOnDestroy() {
    this.store.dispatch(new StoreMerchantDraft(null));
  }


  requestFnctn(params) {
    let url = this.route.url.split('/').filter(Boolean)
    url.push('show');
    url.push(JSON.stringify(params.alldata));
    this.route.navigate(url);
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

  public initilizeJsonObject() {
    this.jsonObject = {
      "code": '',
      "id": 0,
      "request": null,
      "requestDate": new Date(),
      "currentStatus": "",
      "createdAt": "",
    }
  };

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new ManageMerchantDraft({ "pageNo": this.pageNo }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new ManageMerchantDraft({ "pageNo": this.pageNo }));
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.storeSubscription = this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        console.log("&&&&&&&&&&&&&&&&", res)
        if (res.manageMerchantDraft) {
          console.log("*****Component********", res.manageMerchantDraft)
          this.totalRecords = res.manageMerchantDraft.totalRecords;
          if (res.manageMerchantDraft.obj[0]) {
            this.allMerchants = [];
            res.manageMerchantDraft.obj[0].forEach(element => {
              this.initilizeJsonObject();
              this.jsonObject.code = element.code;
              this.jsonObject.createdAt = element.createdAt;
              this.jsonObject.id = element.id;
              this.jsonObject.request = JSON.parse(element.request);
              this.jsonObject.requestDate = new Date(element.requestDate);
              this.allMerchants.push(this.jsonObject);
            });
            this.rowData = this.allMerchants;
          }
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

}
