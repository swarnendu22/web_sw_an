import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../../../../node_modules/@ngrx/store';
import { AgGridAngular } from '../../../../../../../node_modules/ag-grid-angular';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { AgGridOptions } from '../../../../../utils/agGridOption/ag-grid-option';
import { MatDialog } from '@angular/material/dialog';
import { CellRenderCheckboxComponent } from '../../../components/cell-render-checkbox/cell-render-checkbox.component';
import { replaceUrlImgix } from '../../../../../utils/imgLib';
import { GetStorePrivateCategory, ApprovePrivateRequestCategory, ActionTypes } from '../../../../../actions/storeManagement.action';
import * as moment from 'moment';
import { CellRendererPrivateCategoriesTreeComponent } from '../../../components/cell-renderer-private-categories-tree/cell-renderer-private-categories-tree.component';


@Component({
  selector: 'app-private-category',
  templateUrl: './private-category.component.html',
  styleUrls: ['./private-category.component.css']
})
export class PrivateCategoryComponent implements OnInit {

  pageNo = 1;
  payload = 'PENDING';
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
        headerName: 'Request Code',
        field: 'code',
        filter: false,
        resizable: false,
        width: 50,

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
        headerName: 'Category',
        field: 'request',
        width: 100,
        sortable: true,
        cellRendererFramework: CellRendererPrivateCategoriesTreeComponent,
        rowHeight: 100
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
        "requestCode": element,
        "status": operation,
        "remarks": operation
      })
    })

    console.log(payload);
    this.store.dispatch(new ApprovePrivateRequestCategory(payload));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.approvePrivateRequestCategory) {
        this.bulkOperationList = [];
        this.store.dispatch(new GetStorePrivateCategory(this.payload, this.pageNo));
      }
    })

  }

  ngOnInit() {
    this.store.dispatch(new GetStorePrivateCategory(this.payload, this.pageNo));
  }


  onGridReady(event) {
    this.gridApi = event.api;
    this.pendingProducts = this.store
      .pipe(select('manageCategories'))
      .subscribe(res => {
        console.log('onGridReady Rss:::', res);

        if (res['privateCategories']) {
          this.pendingProductsList = res['privateCategories'].payload;
          this.totalRecords = res['privateCategories'].totalRecords;
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
    this.store.dispatch(new GetStorePrivateCategory(this.payload, this.pageNo));
  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetStorePrivateCategory(this.payload, this.pageNo));
  }

  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

}
