import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GetAllCatalogList, ActionTypes } from 'src/app/actions/catalog-management.action';
import { Store, select } from '@ngrx/store';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { CellRendererViewinstoreComponent } from '../../components/cell-renderer-viewinstore/cell-renderer-viewinstore.component';
import { CellRendererImageHoverPreviewComponent } from '../../components/cell-renderer-image-hover-preview/cell-renderer-image-hover-preview.component';
import { CategorySearchDialogComponent } from '../components/category-search-dialog/category-search-dialog.component';
import { ProductFilterPopupComponent } from '../popup-component/product-filter/product-filter-popup.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetPrivateAndMasterCategories } from '../../../../actions/storeManagement.action';

@Component({
  selector: 'app-manage-master-catalog',
  templateUrl: './manage-master-catalog.component.html',
  styleUrls: ['./manage-master-catalog.component.css'],
})
@NgModule({
  imports: [
    MatDialog,
    MatDialogRef
  ]
})
export class ManageMasterCatalogComponent implements OnInit {
  drawerOpen = false;
  DialogRef: MatDialogRef<CategorySearchDialogComponent>;
  loading = true;
  showFirst = true;
  selectedProductIds = [];

  columnDefs = [
    {
      headerName: '',
      field: '',
      height: 40,
      width: 100,
      minWidth: 100,
      filter: false,
      cellRendererFramework: CellRendererImageHoverPreviewComponent,
    },
    {
      headerName: 'Product Name',
      resizable: true,
      minWidth: 200,
      field: 'productName',
      filter: 'agTextColumnFilter',
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 'product_name');
      },
    },
    {
      headerName: 'Brand Name',
      field: 'brand_name',
      resizable: true,
      minWidth: 150,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 'brand_name');
      },
    },
    {
      field: 'categoryName',
      resizable: true,

      minWidth: 150,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 'category_name');
      },
    },
    {
      headerName: 'MRP',
      field: 'maximum_retail_price',
      resizable: true,
      minWidth: 130,
      valueGetter: params => {
        return this.valueGetterForProductDetails(params, 'maximum_retail_price');
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
        return this.valueGetterForProductDetails(params, 'selling_price');
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
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      viewAction: true,
      getIdByIndex: 1,
      cellRendererFramework: CellRendererViewinstoreComponent,
      cellRendererParams: {
        onActionBtnClick: this.editPopupOpen.bind(this)
      },
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
      width: 150,
    },
  ];
  rowHeight = 50;
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
  pageNo = 0;
  totalRecords = 0;
  filterBody = {
    "sortingBy": 'createdAt',
    "sort": 'desc',
    "nameOrNupc": null,
    "fromDate": "",
    "toDate": "",
    "fromMrp": null,
    "toMrp": null,
    "fromSellingPrice": null,
    "toSellingPrice": null,
    "categoryId": null,
    "typeId": null
  }
  selected = this.filterBody['sortingBy']
  constructor(
    private store: Store<any>, 
    private ag: AgGridOptions, 
    public dialog: MatDialog, 
    private apiMessageService: ApiMessageService,
    private route: Router,
  ) {
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
  }

  ngOnInit() {
    this.store.pipe(select('catalogMgmt')).subscribe(res => {
      if (res.allCatalogDetails) {
        this.allCatalogList = res.allCatalogDetails['content'];
        this.rowData = this.allCatalogList;
        this.pageNo = res.allCatalogDetails['number'];
        this.totalRecords = res.allCatalogDetails['totalElements'] - 100;
        this.loading = false;
      }
    });
    this.store.pipe(select('manageCategories')).subscribe(res => {
      if (!res.privateAndMasterCategories) {
        this.store.dispatch(new GetPrivateAndMasterCategories());
      }
    });
  }

  openProductFilter() {
    this.dialog.open(ProductFilterPopupComponent, {
      panelClass: 'filter-modal',
      data: this.filterBody
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
    params.api.sizeColumnsToFit();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
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
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo }));
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

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
  }
  nextPage(event) {
    this.pageNo += 1;
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
  }
  sortBy(event) {
    this.filterBody['sortingBy'] = event.value;
    this.filterBody['sort'] = 'desc'
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
  }
  changeOrder(event) {
    this.filterBody['sort'] = event.value;
    this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));

  }

  openAddNewProductDialog() {
    this.route.navigate(['/catalog/create-master-catalog']);
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.createNewCatalog) {
        if (this.pageNo == 1) {
          this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
        }
      }
      if (res && response.type == ActionTypes.editCatalogDetails) {
        this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
      }
    })
  }
  editPopupOpen(id) {
    this.route.navigate(['/catalog/edit-master-catalog/'+id]);
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.editCatalogDetails) {
        this.store.dispatch(new GetAllCatalogList({ pageNo: this.pageNo, body: this.filterBody }));
      }
    })
  }
}