import { Component, OnInit } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreProductsList, ActionTypes, AddStoreToMasterProduct, CopyProductToOutlet } from '../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { replaceUrlImgix } from '../../../../utils/imgLib';
import { CellRendererViewStoreProductDetailComponent } from '../../components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';
import { UpdateStoreProductComponent } from '../update-store-product/update-store-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CellRenderCheckboxComponent } from '../../components/cell-render-checkbox/cell-render-checkbox.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { ActionTypes as catalogActionTypes } from '../../../../actions/catalog-management.action';
import { StoreProductFilterComponent } from '../../catalog-management/popup-component/store-product-filter/store-product-filter.component';
import { GetPrivateAndMasterCategories } from '../../../../actions/storeManagement.action';
import { MasterToStoreProductPopupComponent } from '../master-to-store-product-popup/master-to-store-product-popup.component';
import { CopyPrductStoreBulkComponent } from '../copy-prduct-store-bulk/copy-prduct-store-bulk.component';

@Component({
  selector: "app-store-products",
  templateUrl: "./store-products.component.html",
  styleUrls: ["./store-products.component.css"],
})
export class StoreProductsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  rowData: any[] = [];
  columnDefs;
  defaultColDef;
  storeId = null;
  bulkOperationList = [];

  filterBody = {
    barCode: null,
    brandId: null,
    categoryName: null,
    status: null,
    storeId: null,
    storeName: null,
    sortingBy: "createdAt",
    sort: "desc",
    nameOrNupc: null,
    fromDate: "",
    toDate: "",
    fromMrp: null,
    toMrp: null,
    fromSellingPrice: null,
    toSellingPrice: null,
    categoryId: null,
    typeId: null,
  };
  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private apiMsgService: ApiMessageService
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreProductsList(this.storeId));
    this.columnDefs = [
      // {
      //   headerName: "",
      //   colId: "params",
      //   cellRendererFramework: CellRenderCheckboxComponent,
      //   cellRendererParams: {
      //     onActionBtnClick: this.checkBoxSelected.bind(this),
      //   },
      //   width: 50,
      //   minWidth: 50,
      //   maxWidth: 50,
      //   sortable: false,
      //   filter: false,
      //   floatingFiltersHeight: 0,
      //   resizable: true,
      // },
      {
        headerName: "Image",
        field: "base_image_url",
        resizable: true,
        sortable: true,
        width: 100,
        cellRenderer: (data) => {
          if (data.data.base_image_url) {
            return `<img src=${replaceUrlImgix(
              data.data.base_image_url
            )}?w=40&h=40 width=40 height=40 >`;
          }
        },
      },
      {
        headerName: "Product Name",
        field: "product_name",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Category Name",
        field: "store_cat_name",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "MRP",
        field: "productVariants",
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          if (data.data.maximum_retail_price) {
            return `<p>₹ ${parseFloat(data.data.maximum_retail_price).toFixed(
              2
            )}</p>`;
          }
        },
      },
      {
        headerName: "Selling Price",
        field: "selling_price",
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          if (data.data.selling_price) {
            return `<p>₹ ${parseFloat(data.data.selling_price).toFixed(2)}</p>`;
          }
        },
      },
      {
        headerName: "Status",
        field: "status",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Action",
        field: "value",
        colId: "params",
        cellRendererFramework: CellRendererViewStoreProductDetailComponent,
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
      filter: "agTextColumnFilter",
    };
  }
  ngOnInit() {
    this.store.pipe(select("manageCategories")).subscribe((res) => {
      if (!res.privateAndMasterCategories) {
        this.store.dispatch(new GetPrivateAndMasterCategories());
      }
    });
    console.log("Category Called");
  }
  openProductFilter() {
    this.dialog.open(StoreProductFilterComponent, {
      panelClass: "filter-modal",
      data: this.filterBody,
    });
  }
  requestFnctn(payload) {
    const dialogRef = this.dialog.open(UpdateStoreProductComponent, {
      width: "100%",
      height: "95%",
      disableClose: true,
      data: {
        id: payload.id,
        storeId: this.storeId,
        status: payload.status,
        approvalFor: payload.approvalFor,
      },
      panelClass: "create-master-modal",
    });
    dialogRef.afterClosed().subscribe((dialogresponse) => {
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (
          res &&
          response.type == catalogActionTypes.updateStorePendingProducts
        ) {
          this.store.dispatch(new GetStoreProductsList(this.storeId));
        }
      });
    });
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
  addToMasterProduct() {
    if (this.bulkOperationList && this.bulkOperationList.length > 0) {
      this.store.dispatch(
        new AddStoreToMasterProduct({
          uniqueProductIds: this.bulkOperationList,
        })
      );
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.storeBulkOperation) {
          this.bulkOperationList = [];
        }
      });
    }
  }
  onGridReady(event) {
    this.gridApi = event.api;
    this.store.pipe(select("merchantManagement")).subscribe((res) => {
      if (res.storeProductsList) {
        this.rowData = res.storeProductsList;
        event.api.setRowData(this.rowData);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
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
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  uploadContentSheet() {
    this.dialog.open(MasterToStoreProductPopupComponent, {
      width: "800px",
      maxHeight: "600px",
      height: "480px",
      disableClose: true,
      panelClass: "custom-AdminFileDownload",
      data: {
        storeId: this.storeId,
      },
    });
  }

  CopyProductToOutlet() {
    const dialog = this.dialog.open(CopyPrductStoreBulkComponent, {
      minWidth: 400,
      maxHeight: 500,
      disableClose: true,
      data: {
        merchantID: sessionStorage.getItem("merchantId"),
        storeId: this.storeId,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      // console.log(result);

      if (result.copyFromStoreId !== undefined && result.copyToStoreId  !== undefined ) {
        let payload = {
          storeId: result.copyFromStoreId,
          storeCollection: result.copyToStoreId,
        };
        this.store.dispatch(new CopyProductToOutlet(payload));

        this.apiMsgService.currentApiStatus.subscribe((data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.copyProductToOutlet
          ) {
            console.log(data.payload);
          }
        });
      }
    });
  }

}