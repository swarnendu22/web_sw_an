import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from '../../../../../../../node_modules/ag-grid-angular';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { AgGridOptions } from '../../../../../utils/agGridOption/ag-grid-option';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { CellRenderCheckboxComponent } from '../../../components/cell-render-checkbox/cell-render-checkbox.component';
import { GetCategoryKeywordsRequest, ActionTypes, ApproveCategoryKeywordsRequest } from '../../../../../actions/storeManagement.action';
import * as moment from 'moment';

@Component({
  selector: 'app-category-keywords',
  templateUrl: './category-keywords.component.html',
  styleUrls: ['./category-keywords.component.css']
})
export class CategoryKeywordsComponent implements OnInit {

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
        headerName: 'Category Name',
        field: 'catagory',
        filter: false,
        resizable: false,
        width: 50,

      },
     {
        field: 'sectors',
        resizable: true,
        filter: false,
        headerName: 'Sector',
        cellRenderer: (data) => {
          if(data.data.sectors){
          return `<p>${data.data.sectors.join()}</p>`
          }
        }
      },
     
      {
        headerName: 'Status',
        field: 'status',
        width: 100,
        filter: 'agTextColumnFilter',
        sortable: true,
      },


    ];


  }


onStatusChange() {
     this.store.dispatch(new GetCategoryKeywordsRequest(this.payload, this.pageNo));
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
    console.log("Array formed is ", this.bulkOperationList);
  }

  bulkOperation(operation: String) {

    const payload = [];
    this.bulkOperationList.forEach(element => {
      payload.push({
        "id": element,
        "description": operation,
        "status": operation
      })
    })

    console.log(payload);
    this.store.dispatch(new ApproveCategoryKeywordsRequest(payload));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.approveCategoryKeywordsRequest) {
        this.bulkOperationList = [];
        this.store.dispatch(new GetCategoryKeywordsRequest(this.payload, this.pageNo));
      }
    })

  }

  ngOnInit() {
    this.store.dispatch(new GetCategoryKeywordsRequest(this.payload, this.pageNo));
  }


  onGridReady(event) {
    this.gridApi = event.api;
    this.pendingProducts = this.store
      .pipe(select('manageCategories'))
      .subscribe(res => {
        console.log('onGridReady Rss:::', res);

        if (res['categoryKeywordsRequest']) {
          this.pendingProductsList = res['categoryKeywordsRequest']['obj'][0];
          this.totalRecords = res['categoryKeywordsRequest'].totalRecords;
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
    this.store.dispatch(new GetCategoryKeywordsRequest(this.payload, this.pageNo));
  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetCategoryKeywordsRequest(this.payload, this.pageNo));
  }

  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

}
