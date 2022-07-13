import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetElasticPrivateProducts, ActionTypes } from 'src/app/actions/catalog-management.action';
import { GetAllMerchantsElastic } from './../../../../actions/merchant-management.actions';

export interface PrivateProductData {
  base_image_url: string;
  product_name: string;
  store_prod_name: string;
  cat_full_tree: string;
  brand_name: string;
  maximum_retail_price: number;
  selling_price: number;
}
@Component({
  selector: 'app-store-private-products',
  templateUrl: './store-private-products.component.html',
  styleUrls: ['./store-private-products.component.css']
})
export class StorePrivateProductsComponent implements OnInit {
  pageNo = 0;
  pageSize = 50;
  privateProductList = [];
  totalRecords = 0;
  storeId = '';
  storeName = '';

  displayedColumns: string[] = ['base_image_url', 'product_name', 'store_prod_name', 'cat_full_tree', 'brand_name', 'maximum_retail_price', 'selling_price'];
  rowData: MatTableDataSource<PrivateProductData>;

  allStore = [];
  pageNo1 = 0;
  pageSize1 = 50;
  constructor(
    private apiMessageService: ApiMessageService,
    private route: Router,
    private store: Store<any>
  ) {
    this.storeSearch();
    this.searchPrivateProductList();
  }

  ngOnInit(): void {
    this.store.pipe(select('catalogMgmt')).subscribe(res => {
      if (res.elasticPrivateProducts) {
        this.privateProductList = res.elasticPrivateProducts.hits;
        this.totalRecords =  res.elasticPrivateProducts.total.value;
        this.rowData = new MatTableDataSource(this.privateProductList);
      }
    });
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.allMerchantsElastic) {
        this.allStore = this.allStore.concat(res.allMerchantsElastic);
      }
    });
  }
  searchPrivateProductList() {
    if(this.storeId=='0') {
      let payloadSerach = {
        storeId: "",
        from: this.pageNo * this.pageSize,
        size: this.pageSize
      }
      this.store.dispatch(new GetElasticPrivateProducts(payloadSerach));
    } else {
      let payloadSerach = {
        storeId: ""+this.storeId,
        from: this.pageNo * this.pageSize,
        size: this.pageSize
      }
      this.store.dispatch(new GetElasticPrivateProducts(payloadSerach));
    }
  }
  onPaginateChange(event){
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;
    this.searchPrivateProductList();
  }
  findStore (storeName:any) {
    this.storeName = storeName;
    this.pageNo1 = 0;
    this.allStore = [];
    this.storeSearch();
  }
  onScrollDown() {
    this.pageNo1++;
    this.storeSearch();
  }
  storeSearch() {
    let payloadStoreSearch = {
      from: this.pageNo1 * this.pageSize1,
      size:  this.pageSize1,
      storeName: this.storeName
    }
    this.store.dispatch(new GetAllMerchantsElastic(payloadStoreSearch));
  }
  getCateName(element) {
    if(element._source.cat_full_tree.children.children) {
      return element._source.cat_full_tree.children.children.cat_name;
    } else if(element._source.cat_full_tree.children) {
      return element._source.cat_full_tree.children.cat_name;
    } else if(element._source.cat_full_tree) {
      return element._source.cat_full_tree.cat_name;
    } else {
      return '';
    }
  }
}
