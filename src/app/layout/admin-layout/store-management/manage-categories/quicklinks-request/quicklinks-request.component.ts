import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from '../../../../../../../node_modules/ag-grid-angular';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { AgGridOptions } from '../../../../../utils/agGridOption/ag-grid-option';
import { MatDialog } from '@angular/material/dialog';
import { CellRenderCheckboxComponent } from '../../../components/cell-render-checkbox/cell-render-checkbox.component';
import { GetStoreQuickLinksRequests, ActionTypes, ApproveStoreQuickLinksRequest } from '../../../../../actions/storeManagement.action';
import * as moment from 'moment';

@Component({
  selector: 'app-quicklinks-request',
  templateUrl: './quicklinks-request.component.html',
  styleUrls: ['./quicklinks-request.component.css']
})
export class QuicklinksRequestComponent implements OnInit {
  pageNo = 1;
  payload = 'pending';
  pendingProducts = null;
  gridApi = null;
  pendingProductsList = null;
  totalRecords = null;
  defaultColDef;
  rowData = null;
  columnDefs;
  bulkOperationList = [];


  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;

  constructor(
    private store: Store<any>, private router: Router, private apiMessageService: ApiMessageService,
    private ag: AgGridOptions, private dialog: MatDialog
  ) {


    this.columnDefs = [
      {
        headerName: '',
        colId: 'params',
        cellRendererFramework: CellRenderCheckboxComponent,
        cellRendererParams: {
          onActionBtnClick: this.checkBoxSelected.bind(this),
        },
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },

      {
        field: 'code',
        resizable: true,
        filter: false,
        headerName: 'Request Code'
      },
      {
        field: 'request',
        resizable: true,
        filter: false,
        headerName: 'Store Name',
        cellRenderer: (data) => {
          if (data.data.request) {
            console.log(data.data.request)
            return `<p>${JSON.parse(data.data.request).assignedBy}</p>`
          }
        }
      },
      {
        field: 'request',
        resizable: true,
        filter: false,
        headerName: 'Quicklink Name',
        cellRenderer: (data) => {
          if (data.data.request) {
            console.log(data.data.request)
            return `<p>${JSON.parse(data.data.request).quicklinkObj.quicklinkName}</p>`
          }
        }
      },
      {
        field: 'createdAt',
        resizable: true,
        filter: false,
        headerName: 'Created At',
        cellRenderer: (data) => {
          console.log(data.data.request)

          return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
        }
      },

      {
        headerName: 'Status',
        field: 'currentStatus',
        width: 100,
        filter: 'agTextColumnFilter',
        sortable: true,
      },


    ];


  }


  onStatusChange() {
    this.store.dispatch(new GetStoreQuickLinksRequests(this.payload, this.pageNo));
  }

  checkBoxSelected(params) {
    if (params) {
      let index = this.bulkOperationList.indexOf(params.alldata.code);
      if (params.checkBoxValue) {
        if (index < 0) {
          this.bulkOperationList.push(params.alldata.code);
        }
      } else {
        this.bulkOperationList.splice(index, 1);
      }
    }
    console.log("Array formed is ", this.bulkOperationList);
  }

  bulkOperation(operation: String) {

    const payload = [];
    this.bulkOperationList.forEach(element => {
      payload.push({
        "status": operation,
        "requestCode": element,
        "remarks": operation
      })
    })

    console.log(payload);
    this.store.dispatch(new ApproveStoreQuickLinksRequest(payload));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.approveStoreQuickLinksRequest) {
        this.bulkOperationList = [];
        this.store.dispatch(new GetStoreQuickLinksRequests(this.payload, this.pageNo));
      }
    })

  }

  ngOnInit() {
    this.store.dispatch(new GetStoreQuickLinksRequests(this.payload, this.pageNo));
  }


  onGridReady(event) {
    this.gridApi = event.api;
    this.pendingProducts = this.store
      .pipe(select('manageCategories'))
      .subscribe(res => {


        if (res['quicklinksRequests']) {
          this.pendingProductsList = res['quicklinksRequests']['payload'];
          this.totalRecords = res['quicklinksRequests'].totalRecords;
          this.rowData = this.pendingProductsList
          event.api.setRowData(this.pendingProductsList);

        }
      });

    window.addEventListener('resize', function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }

  toggleShowHide() {
    const columns = this.agGrid.columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().field === "storeCategoryName")[0];
    console.log(valueColumn)
    this.agGrid.columnApi.setColumnVisible(valueColumn, false);
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

  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetStoreQuickLinksRequests(this.payload, this.pageNo));
  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetStoreQuickLinksRequests(this.payload, this.pageNo));
  }

  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

}
