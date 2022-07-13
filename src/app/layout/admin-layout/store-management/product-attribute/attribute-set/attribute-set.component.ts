import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import {
  GetAttributeSet,
  GetAttributeSetPagination,
} from '../../../../../actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { ActivatedRoute } from '@angular/router';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ServerSidePagination } from 'src/app/utils/serverSidePagination/server-side-pagination';

@Component({
  selector: 'app-attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrls: ['./attribute-set.component.css'],
})
export class AttributeSetComponent implements OnInit {
  rowModelType = 'serverSide';
  cacheBlockSize = 50;
  maxBlocksInCache = 30;
  pageNo = 1;
  allSetList = [];
  gridEvent;
  constructor(
    private store: Store<categoryState>,
    private ag: AgGridOptions,
    private ssp: ServerSidePagination
  ) {
    this.store.dispatch(new GetAttributeSet());
  }

  ngOnInit() {
    // this.store.pipe(select('productAttributes')).subscribe(res => {
    //   console.log(res);
    //   let data = res['attributeSet'];
    //   if (data) {
    //     this.allSetList.push(...data);
    //   }
    //   if (this.allSetList.length > 0) {
    //     if (this.pageNo == 1) {
    //       let fServer = this.FakeServer(
    //         this.allSetList,
    //         this.cacheBlockSize,
    //         this
    //       );
    //       let datasource = this.ServerSideDatasource(fServer);
    //       if (this.gridEvent) {
    //         this.gridEvent.api.setServerSideDatasource(datasource);
    //       }
    //     }
    //   }
    //   console.log('All', this.allSetList);
    //   // this.store.pipe(select('catalogMgmt')).subscribe(res => {
    //   //   let data = res.allCatalogDetails
    //   //     ? res.allCatalogDetails['payload']
    //   //     : null;
    //   //   if (data) {
    //   //     this.allCatalogList = data;
    //   //   }
    //   //   if (this.allCatalogList.length > 0) {
    //   //     this.rowData = this.allCatalogList;
    //   //     event.api.setRowData(this.rowData);
    //   //     console.log(this.allCatalogList);
    //   //   }
    //   // });
    //   // this.rowData = res['attributeSet'];
    // });
    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.rowData = res['attributeSet'];
    });
  }

  columnDefs = [
    {
      headerName: 'Code',
      field: 'code',
      filter: 'agNumberColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Display Name',
      field: 'label',
      filter: 'agTextColumnFilter',
      sortable: true,
    },
    // {
    //   headerName: 'Key Word',
    //   field: 'name',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    // },
    {
      headerName: 'Attribute',
      field: 'count',
      filter: 'agNumberColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: params => {
        if (params.data.status === '1' || params.data.status === 'Active') {
          return '<p class="text-success">Active</p>';
        } else if (params.data.status === '0') {
          return '<p class="text-danger">In Active</p>';
        } else {
          return ' ';
        }
      },
      filter: 'agTextColumnFilter',
      // filterParams: {
      //   cellHeight: 20,
      //   values: () => {
      //     return ['Active', 'In Active'];
      //   },
      //   debounceMs: 1000,
      // },
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

  rowData = [
    {
      code: '10001',
      displayName: 'attribute_name',
      keyWord: 'kye_word',
      attribute: '10',
      status: 'Active',
      action: '',
    },
  ];
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

  // onGridReady($event) {
  //   this.store.pipe(select('productAttributes')).subscribe(res => {
  //     console.log(res);
  //     let data = res['attributeSet'];
  //     if (data) {
  //       this.allSetList.push(...data);
  //     }
  //     if (this.allSetList.length > 0) {
  //       if (this.pageNo == 1) {
  //         let fServer = this.FakeServer(
  //           this.allSetList,
  //           this.cacheBlockSize,
  //           this
  //         );
  //         let datasource = this.ServerSideDatasource(fServer);
  //           $event.api.setServerSideDatasource(datasource);
  //       }
  //     }
  //     console.log('All', this.allSetList);
  //   });
  //   window.addEventListener("resize", function() {
  //     setTimeout(function() {
  //       $event.api.sizeColumnsToFit(); 
  //     });
  //   });
  //   // this.gridEvent = $event;
  // }

  // ServerSideDatasource(server) {
  //   console.log('Data');
  //   return {
  //     getRows(params) {
  //       setTimeout(() => {
  //         let response = server.getResponse(params.request);
  //         if (response.success) {
  //           params.successCallback(response.rows, response.lastRow);
  //         } else {
  //           params.failCallback();
  //         }
  //       }, 500);
  //     },
  //   };
  // }

  // FakeServer(allData, cacheBlockSize, self) {
  //   console.log('Fake', allData);
  //   return {
  //     getResponse(request) {
  //       console.log(
  //         'asking for rows: ' + request.startRow + ' to ' + request.endRow
  //       );
  //       let rowsThisPage;
  //       self.pageNo = parseInt(request.endRow, 10) / cacheBlockSize;
  //       console.log('PAGE_NO', this.pageNo);
  //       if (self.pageNo !== 1) {
  //         console.log('THIS', this, self);
  //         self.getData();
  //       }
  //       console.log('START,END', request.startRow, request.endRow);
  //       rowsThisPage = allData.slice(request.startRow, request.endRow);
  //       let lastRow = allData.length <= request.endRow ? allData.length : -1;
  //       return {
  //         success: true,
  //         rows: rowsThisPage,
  //         lastRow: lastRow,
  //       };
  //     },
  //   };
  // }

  // getData() {
  //   this.store.dispatch(new GetAttributeSetPagination({ pageNo: this.pageNo }));
  // }
}
