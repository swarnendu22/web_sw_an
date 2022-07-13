import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetAllElasticCatalogList } from 'src/app/actions/catalog-management.action';
import { Store, select } from '@ngrx/store';
import { MatMenuModule } from '@angular/material/menu';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { NdhStoreOpenLinkComponent } from '../components/ndh-store-open-link/ndh-store-open-link.component';
import { CatalogViewFromNupcComponent } from '../../components/catalog-view-from-nupc/catalog-view-from-nupc.component';
import { CellRendererViewinstoreComponent } from '../../components/cell-renderer-viewinstore/cell-renderer-viewinstore.component';
// tslint:disable-next-line: max-line-length
import { CellRendererImageHoverPreviewComponent } from '../../components/cell-renderer-image-hover-preview/cell-renderer-image-hover-preview.component';
import { CategorySearchDialogComponent } from '../components/category-search-dialog/category-search-dialog.component';
import { ProductFilterPopupComponent } from '../popup-component/product-filter/product-filter-popup.component';


@Component({
  selector: 'app-elastic-master-catalog',
  templateUrl: './elastic-master-catalog.component.html',
  styleUrls: ['./elastic-master-catalog.component.css']
})
@NgModule({
  imports: [
    MatDialog,
    MatDialogRef
  ]
})
export class ElasticMasterCatalogComponent implements OnInit {

  drawerOpen = false;
  selected = 'd';
  DialogRef: MatDialogRef<CategorySearchDialogComponent>;
  loading = true;
  showFirst = true;
  selectedProductIds = [];
  columnDefs = [
    // {
    //   resizable: true, headerName: 'Product_Id', width: 150, field: 'id'
    // },
    {
      headerName: '',
      field: 'swatch_image_url',
      height: 40,
      width: 120,
      filter: false,
      cellRendererFramework: CellRendererImageHoverPreviewComponent,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,


      // cellRenderer: params => {
      //   return params.data[9]
      //     ? `<img src="${params.data[9]}" alt="" width="50">`
      //     : 'No Image Found';
      // },
    },
    // Remove this column according to NDH-12 issue raised from Jira
    // {
    //   resizable: true,
    //   headerName: 'Category ID',
    //   field: 'category_id',
    //   width: 130,
    //   valueGetter: params => {
    //     return this.valueGetterForProductDetails(params, 0);
    //   },
    // },
    {
      headerName: 'Product Name',
      resizable: true,
      minWidth: 200,
      field: '',
      filter: 'agTextColumnFilter',
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 3);
      },
      // cellRendererFramework: NdhStoreOpenLinkComponent,
    },
    {
      field: 'nupc',
      resizable: true,

      minWidth: 150,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 2);
      },
    },
    {
      headerName: 'Type',
      field: 'type_id',
      resizable: true,
      minWidth: 150,
      valueGetter: params => {
        const value =
          String.fromCharCode(this.valueGetterForProductDetails(params, 4)) ==
            'c'
            ? 'configurable'
            : 'simple';
        return value;
      },
    },
    // {
    //   resizable: true,
    //   headerName: 'Code',
    //   field: 'id',
    //   cellRendererFramework: CatalogViewFromNupcComponent,

    //   width: 100,

    //   // valueGetter: params => {
    //   //   return this.valueGetterForProductDetails(params, 1);
    //   // },
    // },
    {
      headerName: 'MRP',
      field: 'maximum_retail_price',
      resizable: true,
      minWidth: 130,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 6);
      },
      cellRenderer: data => {
        if (data.value !== null) {
          return `<span style="font-family:Roboto">₹ </span> ${parseFloat(data.value).toFixed(2)}`;
        } else {
          return `<span style="font-family:Roboto">₹ </span> ${0.0.toFixed(2)}`;
        }

      },
    },
    {
      headerName: 'Price',
      field: 'selling_price',
      resizable: true,
      minWidth: 130,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 5);
      },
      cellRenderer: data => {
        if (data.value !== null) {
          return `<span style="font-family:Roboto">₹ </span> ${parseFloat(data.value).toFixed(2)}`;
        } else {
          return `<span style="font-family:Roboto">₹ </span> ${0.0.toFixed(2)}`;
        }
      },
    },

    // {
    //   headerName: 'Total Inventory',
    //   field: 'total_inventpry',
    //   resizable: true,
    //   width: 130,

    //   valueGetter: params => {
    //     const value = this.valueGetterForProductDetails(params, 7)

    //     console.log('Totoal seller', value, null == value)
    //     return value == null ? 'N/A' : value;
    //   },
    // },
    // {
    //   headerName: 'Total Sellers',
    //   field: 'total_sellers',
    //   resizable: true,
    //   width: 130,

    //   valueGetter: params => {
    //     const value = this.valueGetterForProductDetails(params, 8)

    //     console.log('Totoal seller', value, null == value)
    //     return value == null ? 'N/A' : value;
    //   },
    // },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      viewAction: true,
      getIdByIndex: 1,
      // Resolved according to NDH-11 issue raised from Jira
      cellRendererFramework: CellRendererViewinstoreComponent,
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
      width: 150,
    },
    // {
    //   headerName: 'View',
    //   field: 'value',
    //   colId: 'params',
    //   getIdByIndex: 1,
    //   cellRendererFramework: CellRendererViewinstoreComponent,
    //   sortable: false,
    //   filter: false,
    //   floatingFiltersHeight: 0,
    //   resizable: true,
    //   width: 130,
    //   pinned: 'right',
    // },

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  };
  allCatalogList = [];
  rowData = [];
  rowModelType = 'serverSide';
  rowSelection = 'multiple';
  cacheBlockSize = 50;
  maxBlocksInCache = 30;
  pageNo = 1;

  constructor(private store: Store<any>, private ag: AgGridOptions, public dialog: MatDialog) {
    this.store.dispatch(new GetAllElasticCatalogList({ pageNo: this.pageNo }));
  }

  ngOnInit() {
    this.store.pipe(select('catalogMgmt')).subscribe(res => {
      let data = res.allElasticCatalogDetails
        ? res.allElasticCatalogDetails
        : [];
      if (data) {
        this.allCatalogList = data;
      }
      if (this.allCatalogList.length > 0) {
        this.rowData = this.allCatalogList;
        this.loading = false;
        // event.api.setRowData(this.rowData);
        // console.log(this.allCatalogList);
      }
    });
  }

  openProductFilter() {
    this.dialog.open(ProductFilterPopupComponent, {
      panelClass: 'filter-modal'
    });
  }

  onSelectionChanged = function (data) {
    if (data.api.getSelectedRows().length > 0) {
      data.api.getSelectedRows().map(product => {
        this.selectedProductIds.push(product[1]);
      })
    } else {
      this.selectedProductIds = [];
    }
  };

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
  // onGridSizeChanged(params) {
  //   // var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
  //   var gridWidth = params.clientWidth
  //   var columnsToShow = [];
  //   var columnsToHide = [];
  //   var totalColsWidth = 0;
  //   var allColumns = params.columnApi.getAllColumns();
  //   for (var i = 0; i < allColumns.length; i++) {
  //     let column = allColumns[i];
  //     totalColsWidth += column.getMinWidth();
  //     if (totalColsWidth > gridWidth) {
  //       columnsToHide.push(column.colId);
  //     } else {
  //       columnsToShow.push(column.colId);
  //     }
  //   }
  //   params.columnApi.setColumnsVisible(columnsToShow, true);
  //   params.columnApi.setColumnsVisible(columnsToHide, false);
  //   params.api.sizeColumnsToFit();
  // }
  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    // this.loading = false;

    // this.store.pipe(select('catalogMgmt')).subscribe(res => {
    //   let data = res.allCatalogDetails
    //     ? res.allCatalogDetails['payload']
    //     : null;
    //   if (data) {
    //     this.allCatalogList = data;
    //   }
    //   if (this.allCatalogList.length > 0) {
    //     this.rowData = this.allCatalogList;
    //     event.api.setRowData(this.rowData);
    //     console.log(this.allCatalogList);
    //   }
    // });
  }
  ServerSideDatasource(server) {
    return {
      getRows(params) {
        setTimeout(() => {
          let response = server.getResponse(params.request);
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      },
    };
  }
  FakeServer(allData, cacheBlockSize, self) {
    return {
      getResponse(request) {
        console.log(
          'asking for rows: ' + request.startRow + ' to ' + request.endRow
        );
        let rowsThisPage;
        self.pageNo = parseInt(request.endRow, 10) / cacheBlockSize;
        console.log('PAGE_NO', this.pageNo);
        if (self.pageNo !== 1) {
          console.log('THIS', this, self);
          self.getData();
        }
        console.log('START,END', request.startRow, request.endRow);
        rowsThisPage = allData.slice(request.startRow, request.endRow);
        let lastRow = allData.length <= request.endRow ? allData.length : -1;
        return {
          success: true,
          rows: rowsThisPage,
          lastRow: lastRow,
        };
      },
    };
  }

  getData() {
    this.store.dispatch(new GetAllElasticCatalogList({ pageNo: this.pageNo }));
  }
  valueGetterForProductDetails(params, index) {
    return params.data[index];
  }
  invokeParentMethod(params) {
    console.log(params);
  }

  viewDetails() {
    alert('open detail');
  }

  openCategory() {
    const dialogRef = this.dialog.open(CategorySearchDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
