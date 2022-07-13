import {FlatTreeControl} from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { GetElasticCatalogList, ActionTypes } from 'src/app/actions/catalog-management.action';
import { Store, select } from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetActiveBrandsElastic } from '../../../../actions/brand-management.actions';
import { GetCategoriesElastic } from '../../../../actions/storeManagement.action';
import { Observable, Subscriber } from 'rxjs/Rx';
import { Subscription } from '../../../../../../node_modules/rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  countProduct: number;
  id: number;
  key: string;
  levelCat: string;
}

var TREE_DATA: any;

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface MasterProductData {
  base_image_url: string;
  product_name: string;
  category_name: string;
  brand_name: string;
  maximum_retail_price: number;
  selling_price: number;
  action: string;
}

@Component({
  selector: 'app-master-product-view',
  templateUrl: './master-product-view.component.html',
  styleUrls: ['./master-product-view.component.css']
})
export class MasterProductViewComponent implements OnInit {
  categoryName = '';
  categoryId:any = null;
  brandID = '';
  brandName = '';
  productName = '';
  ean = '';
  pageNo:any = 0;
  pageSize:any = 20;
  allCatalogList = [];
  totalRecords = 0;
  levelCat:any = '';

  pageNoBrand = 0;
  pageSizeBrand = 100;
  brandsList = [];

  subTimeout: Subscription;
  subTimeout2: Subscription;
  subTimeout3: Subscription;

  pageNoCat = 0;
  pageSizeCat = 100;
  categories = [];

  selectedCateId:any = [];
  selectedBrandName = '';

  nextBrandName  = '';
  preBrandName  = '';
  order_by_short:any = '';
  order_by = '';
  
  displayedColumns: string[] = ['base_image_url', 'product_name', 'category_name', 'brand_name', 'maximum_retail_price', 'selling_price', 'action'];
  rowData: MatTableDataSource<MasterProductData>;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      countProduct: node.countProduct,
      id: node.id,
      key: node.key,
      levelCat: node.levelCat
    };
  }
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private apiMessageService: ApiMessageService,
    private route: Router,
    private store: Store<any>,
    public dialog: MatDialog
  ) {
    this.order_by_short = {
      'product_id': {"order":"desc"}
    }
    if(localStorage.getItem('selectedCateId') !='' && localStorage.getItem('selectedCateId') !=null) {
      this.selectedCateId = JSON.parse(localStorage.getItem('selectedCateId'));
      this.categoryId = JSON.parse(localStorage.getItem('categoryId'));
      this.levelCat = parseInt(localStorage.getItem('levelCat'));
    }
    if(localStorage.getItem('brandID') !='' && localStorage.getItem('brandID') !=null) {
      this.selectedBrandName = localStorage.getItem('selectedBrandName');
      this.brandID = localStorage.getItem('brandID');
    }
    
    if(localStorage.getItem('ean') !='' && localStorage.getItem('ean') !=null) {
      this.ean = localStorage.getItem('ean');
    }
    if(localStorage.getItem('order_by') !='' && localStorage.getItem('order_by') !=null) {
      this.order_by = localStorage.getItem('order_by');
      this.getOrderByShort();
    }
    if(localStorage.getItem('productName') !='' && localStorage.getItem('productName') !=null) {
      this.order_by_short = '';
      this.productName = localStorage.getItem('productName');
    }

    if(sessionStorage.getItem('pageNo') !='' && sessionStorage.getItem('pageNo') !=null) {
      this.pageNo = sessionStorage.getItem('pageNo');
    }
    if(sessionStorage.getItem('pageSize') !='' && sessionStorage.getItem('pageSize') !=null) {
      this.pageSize = sessionStorage.getItem('pageSize');
    }

    this.searchCatList();
    this.searchBrandList();
    this.serachMasterList();
  }
  ngOnInit(): void {
    this.store.pipe(select('catalogMgmt')).subscribe(res => {
      if (res.elasticCatalogDetails) {
        this.allCatalogList = res.elasticCatalogDetails.hits;
        this.totalRecords =  res.elasticCatalogDetails.total.value;
        this.rowData = new MatTableDataSource(this.allCatalogList);
      }
    });
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.activeBrandsElastic) {
        if(res.activeBrandsElastic.aggregations.agg_tree_brand.buckets.length > 0) {
          this.brandsList = this.brandsList.concat(res.activeBrandsElastic.aggregations.agg_tree_brand.buckets);
          this.preBrandName = res.activeBrandsElastic.aggregations.agg_tree_brand.after_key.brand_name;
        }
      }
    });
    this.store.pipe(select('manageCategories')).subscribe(res => {
      this.categories = [];
      if (res.categoriesElastic) {
        let allTreeCat1 = res.categoriesElastic.aggregations.agg_tree_l1.buckets
          allTreeCat1.forEach(element => {
          var splitted = element.key.split("|", 3); 
          this.categories.push({
            name: splitted[2],
            id: splitted[1],
            key: element.key,
            children: this.childCategory2(element.agg_tree_l2.buckets),
            countProduct: element.doc_count,
            levelCat: 1
          })
        });
        TREE_DATA = this.categories;
        this.dataSource.data = TREE_DATA;
      }
    });
  }
  childCategory2(allTreeCat2: any) {
    let childCategory2 = [];
    allTreeCat2.forEach(element => {
      var splitted2 = element.key.split("|", 3); 
      childCategory2.push({
        name: splitted2[2],
        key: element.key,
        id: splitted2[1],
        children: this.childCategory3(element.agg_tree_l3.buckets),
        countProduct: element.doc_count,
        levelCat: 2
      })
    });
    return childCategory2;
  }
  childCategory3(allTreeCat3: any) {
    let childCategory3 = [];
    allTreeCat3.forEach(element => {
      var splitted3 = element.key.split("|", 3); 
      childCategory3.push({
        name: splitted3[2],
        id: splitted3[1],
        key: element.key,
        countProduct: 0,
        levelCat: 3
      })
    });
    return childCategory3;
  }
  brandListByName() {
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
    this.subTimeout2 = Observable.timer(500).subscribe(() => { 
      this.pageNoBrand = 0;
      this.brandsList = [];
      this.nextBrandName = '';
      this.searchBrandList();
    });
  }
  
  searchBrandList() {
    let payloadBrandSerach = {
      brandName: this.brandName,
      nextBrandName: this.nextBrandName,
      from: this.pageNoBrand,
      size: this.pageSizeBrand
    }
    this.store.dispatch(new GetActiveBrandsElastic(payloadBrandSerach));
  }
  onScrollDown() {
    this.nextBrandName = this.preBrandName;
    this.searchBrandList();
  }
  catListByName() {
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
    this.subTimeout3 = Observable.timer(500).subscribe(() => { 
      this.searchCatList();
    });
  }
  searchCatList() {
    let payloadCatSerach = {
      categoryName: this.categoryName
    }
    this.store.dispatch(new GetCategoriesElastic(payloadCatSerach));
  }
  seearchProductKey() {
    if (this.subTimeout) {
      this.subTimeout.unsubscribe();
    }
    this.subTimeout = Observable.timer(500).subscribe(() => {
      this.pageNo = 0;
      sessionStorage.setItem('pageNo', this.pageNo);
      this.order_by_short = '';

      localStorage.setItem('productName', this.productName);
      localStorage.setItem('ean', this.ean);
      this.serachMasterList()
    });
  }
  serachMasterList() {
    let payloadSerach = {
      categoryId: this.categoryId,
      categoryLevel: this.levelCat,
      brandName: this.brandID,
      productName: this.productName,
      ean: this.ean,
      from: this.pageNo * this.pageSize,
      size: this.pageSize,
      order_by: this.order_by_short
    }
    this.store.dispatch(new GetElasticCatalogList(payloadSerach));
  }
  onPaginateChange(event){
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;

    sessionStorage.setItem('pageSize', this.pageSize);
    sessionStorage.setItem('pageNo', this.pageNo);

    this.serachMasterList();
  }
  openEditNewProductDialog(id) {
    this.route.navigate(['/catalog/edit-master-catalog/'+id]);
  }
  selectedBrand(brandName) {
    if(this.selectedBrandName != brandName) {
      this.selectedBrandName = brandName;
    } else {
      this.selectedBrandName = '';
    }
    this.brandID = this.selectedBrandName;

    localStorage.setItem('selectedBrandName', this.selectedBrandName);
    localStorage.setItem('brandID', this.brandID);

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.serachMasterList();
  }
  removeBrand() {
    localStorage.removeItem('selectedBrandName');
    localStorage.removeItem('brandID');
    
    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.selectedBrandName = '';
    this.brandID = this.selectedBrandName;
    this.serachMasterList();
  }
  removeProduct() {
    if(this.order_by_short == '') {
      this.order_by_short = {
        'product_id': {"order":"desc"}
      }
    }
    localStorage.removeItem('productName');

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.productName = '';
    this.serachMasterList();
  }
  removeEan() {
    localStorage.removeItem('ean');

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.ean = '';
    this.serachMasterList();
  }
  removeCat() {
    localStorage.removeItem('categoryId');
    localStorage.removeItem('levelCat');
    localStorage.removeItem('selectedCateId');

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.selectedCateId = [];
    this.levelCat = '';
    this.categoryId = null;
    this.serachMasterList();
  }
  removeShort() {
    localStorage.removeItem('order_by');

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    this.order_by ='';
    if(this.productName == '') {
      this.order_by_short = {
        'product_id': {"order":"desc"}
      }
    }
    else {
      this.order_by_short ='';
    }
    this.serachMasterList();
  }
  getCateName(name) {
    var splitted4 = name.split("|", 3);
    return splitted4[2];
  }
  onStatusChange() {
    if(this.order_by!='') {
      this.getOrderByShort();
      localStorage.setItem('order_by', this.order_by);

      this.pageNo = 0;
      sessionStorage.setItem('pageNo', this.pageNo);

      this.serachMasterList();
    }
  }
  getOrderByShort () {
    if(this.order_by == 'selling_price_desc') {
      this.order_by_short = {
        selling_price: {"order":"desc"}
      }
    } else if(this.order_by == 'selling_price_asc') {
      this.order_by_short = {
        selling_price: {"order":"asc"}
      }
    } else if(this.order_by == 'product_name_asc') {
      this.order_by_short = {
        'product_name.keyword': {"order":"asc"}
      }
    } else if(this.order_by == 'product_name_desc') {
      this.order_by_short = {
        'product_name.keyword': {"order":"desc"}
      }
    }
  }
  getProductShort(order_by) {
    if(order_by == 'selling_price_desc') {
      return 'Price High to Low';
    } else if(order_by == 'selling_price_asc') {
      return 'Price Low to High';
    } else if(order_by == 'product_name_desc') {
      return 'Product Name Z to A';
    } else if(order_by == 'product_name_asc') {
      return 'Product Name A to Z';
    }
  }
  selectedCategory(cateId, levelCat) {
    this.selectedCateId = [];
    this.selectedCateId.push(cateId);
    this.categoryId = this.selectedCateId;
    this.levelCat = levelCat;

    this.pageNo = 0;
    sessionStorage.setItem('pageNo', this.pageNo);

    localStorage.setItem('categoryId',  JSON.stringify(this.categoryId));
    localStorage.setItem('levelCat', this.levelCat);
    localStorage.setItem('selectedCateId', JSON.stringify(this.selectedCateId));

    this.serachMasterList();
  }
  checkedSelected(key) {
    var index1 = this.selectedCateId.findIndex(x => x == key);
    if(index1 === -1) {
     return false;
    } else {
      return true;
    }
  }
  changeSource(event){
    event.target.src = 'https://ndh.imgix.net/ndh-assets/categories-images/default.png';
  }
  ngOnDestroy() {
    if (this.subTimeout) {
      this.subTimeout.unsubscribe();
    }
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, 
      {
        disableClose: true,
      }
    );
  }
  openAddNewProductDialogNew() {
    this.route.navigate(['/catalog/create-master-catalog']);
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private route: Router,
  ) {
  }
  openBulkProductDialog() {
    this.dialogRef.close();
    this.route.navigate(['/catalog/pending-catalogs']);
  }
  openAddNewProductDialog() {
    this.dialogRef.close();
    this.route.navigate(['/catalog/create-master-catalog']);
  }
}
