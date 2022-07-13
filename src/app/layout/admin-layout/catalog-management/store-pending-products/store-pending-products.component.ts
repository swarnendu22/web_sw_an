import { ActionTypes } from 'src/app/actions/catalog-management.action';
import { UpdateStoreProductComponent } from './../../merchant-management/update-store-product/update-store-product.component';
import { CellRenderCheckboxComponent } from './../../components/cell-render-checkbox/cell-render-checkbox.component';
import { CellRendererButtonComponent } from './../../components/cell-renderer-button/cell-renderer-button.component';
import { GetStoreProductPendingList, UpdateStorePendingProducts } from './../../../../actions/catalog-management.action';
import { ApiMessageService } from './../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { replaceUrlImgix } from 'src/app/utils/imgLib';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { CellRendererViewStoreProductDetailComponent } from '../../components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from '../../../../../../node_modules/ag-grid-community';
import { AgGridAngular } from '../../../../../../node_modules/ag-grid-angular';
import { element } from '../../../../../../node_modules/protractor';
import { StoreProductFilterComponent } from '../popup-component/store-product-filter/store-product-filter.component';
import { GetPrivateAndMasterCategories } from '../../../../actions/storeManagement.action';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-store-pending-products',
  templateUrl: './store-pending-products.component.html',
  styleUrls: ['./store-pending-products.component.css']
})
export class StorePendingProductsComponent implements OnInit {

  rejectReason = ''
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  slides = ["https://ndh.imgix.net/ndh-stores/stores_img/1612264319851.jpg", "https://ndh.imgix.net/ndh-stores/stores_img/1612264319854.jpg", "https://ndh.imgix.net/ndh-stores/stores_img/1612264319856.jpg"]
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;
  @ViewChild('rejectProductModal') rejectProductModal: TemplateRef<any>;

  productId = null
  approvalFor = null
  filterBody = {
    "barCode": null,
    "brandId": null,
    "categoryName": null,
    "status": 'PENDING',
    "storeId": null,
    "storeName": null,

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

  constructor(
    private store: Store<any>, private router: Router, private apiMessageService: ApiMessageService,
    private ag: AgGridOptions, private dialog: MatDialog, private toastr: ToastrService
  ) {
  }

  openProductFilter() {
    this.dialog.open(StoreProductFilterComponent, {
      panelClass: 'filter-modal',
      data: this.filterBody
    });
  }


  requestFnctn(payload) {
    // const dialogRef = this.dialog.open(UpdateStoreProductComponent, {
    //   maxHeight: '550px',
    //   // minWidth: '550px',
    //   disableClose: true,
    //   data: {
    //     id: payload.id,
    //     storeId: payload.storeId,
    //     status: payload.status,
    //     approvalFor: payload.approvalFor,
    //   },
    //   panelClass: 'create-master-modal'
    // });

    // dialogRef.afterClosed().subscribe(res => {

    //   this.apiMessageService.currentApiStatus.subscribe((response) => {
    //     let res: any = response.status;
    //     if (res && response.type == ActionTypes.updateStorePendingProducts) {
    //       this.bulkOperationList = [];
    //       this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
    //     }
    //   })

    // })
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
  ngOnInit() {
    this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
    this.store.pipe(select('manageCategories')).subscribe(res => {
      if (!res.privateAndMasterCategories) {
        this.store.dispatch(new GetPrivateAndMasterCategories());
      }
    });

    this.pendingProducts = this.store
      .pipe(select('catalogMgmt'))
      .subscribe(res => {
        if (res['storePendingProucts']) {
          this.pendingProductsList = res['storePendingProucts'].content;
          this.totalRecords = res['storePendingProucts'].totalElements;
          this.rowData = this.pendingProductsList;
        }
      });
  }


  toggleShowHide() {
    const columns = this.agGrid.columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().field === "storeCategoryName")[0];
    console.log(valueColumn)
    this.agGrid.columnApi.setColumnVisible(valueColumn, false);
  }

  nextPage(event) {
    console.log(event);
    this.pageNo += 1;
    this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
  }

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
  }

  defaultColumnDefination() {
    this.gridApi.columnController.setColumnDefs(this.gridApi.columnController.columnDefs.splice(0, 10));
    this.gridApi.sizeColumnsToFit();
  }

  getproductMrp(storeProductVariants) {
    if (storeProductVariants) {
      if(storeProductVariants[0].storeProductInventories[0]) {
        return storeProductVariants[0].storeProductInventories[0].mrp;
      }
    }
  }

  getproductPrice(storeProductVariants) {
    if (storeProductVariants) {
      if(storeProductVariants[0].storeProductInventories[0]) {
        return storeProductVariants[0].storeProductInventories[0].price;
      }
    }
  }


  openRejectModal(id, approvalUserId) {
    this.productId = id
    this.approvalFor = approvalUserId
    this.dialog.open(this.rejectProductModal, {
      height: '350px',
      width: '500px',
    })
  }

  bulkOperation(operation: String, productId = null, storeId = null) {
    const payload = {
      "productId": this.productId,
      "status": operation,
      "remarks": null,
      "storeId": null
    }
    if (operation == 'APPROVED') {
      payload.remarks = operation;
      payload.productId = productId;
      payload.storeId = storeId;
    } else {
      if (this.rejectReason != '' && this.rejectReason != null) {
        payload.remarks = this.rejectReason
      }
      else {
        this.toastr.error('Enter Reject Reason.')
        return
      }
    }
    const url = this.approvalFor == 'MODIFIED' ? '/api/store-management/v2/app/product/exsisting/approve' : '/api/ndh-product/admin/new-product-approve'
    console.log(payload);
    this.store.dispatch(new UpdateStorePendingProducts(payload, url));
    this.apiMessageService.currentApiStatus.subscribe((data) => {
      console.log(data);
      if (data.status === true && data.type == ActionTypes.updateStorePendingProducts) {
        this.bulkOperationList = [];
        this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
      }
    })
  }
  jsonParse(images) {
    console.log(images);
    const imagesArr = JSON.parse(images)
    if (imagesArr && imagesArr.length > 0)
      return imagesArr
    else
      return []
  }
  refreshCat() {
    this.store.dispatch(new GetStoreProductPendingList(this.filterBody, this.pageNo));
  }
}