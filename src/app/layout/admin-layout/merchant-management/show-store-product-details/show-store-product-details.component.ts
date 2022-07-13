import { UpdateStoreProductComponent } from './../update-store-product/update-store-product.component';
import { GetStoreProductDetails, GetProductCategory, GetProductList, StoreProductList, StoreProductCategory, StoreStoreProductDetails } from './../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { storeOpenCalculate } from '../../../../utils/storeOpenCalculate';

@Component({
  selector: 'app-show-store-product-details',
  templateUrl: './show-store-product-details.component.html',
  styleUrls: ['./show-store-product-details.component.css']
})
export class ShowStoreProductDetailsComponent implements OnInit, OnDestroy {

  storeId = null;
  productDetails = null;
  productCategories = null;
  productList = null;
  store_cover_image = null;
  store_logo = null;
  storePick = null;
  store_display_name = null
  store_address = null
  store_rating = null
  store_review = null
  store_contact = null
  storeOpenDetails = null
  selectedCategoryId = null
  deliveryText = null
  is_live = null
  searchTerm = ''
  from = 0
  categoryFilterObj = {
    "query_string": {
      "query": ``,
      "default_field": "product_catagory",
      "fields": [],
      "type": "best_fields",
      "default_operator": "or",
      "max_determinized_states": 10000,
      "enable_position_increments": true,
      "fuzziness": "AUTO",
      "fuzzy_prefix_length": 0,
      "fuzzy_max_expansions": 50,
      "phrase_slop": 0,
      "escape": false,
      "auto_generate_synonyms_phrase_query": true,
      "fuzzy_transpositions": true,
      "boost": 1.0
    }
  }

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreProductDetails({
      latitude: "22.5392287",
      longitude: "88.3595163",
      storeId: this.storeId
    }))
    this.store.dispatch(new GetProductCategory({
      storeId: this.storeId
    }))
    this.getProductList();
  }

  ngOnInit() {
    this.store.pipe(select("merchantManagement")).subscribe(res => {
      if (res.storeProductDetails) {
        const productDetails = res.storeProductDetails.hits[0]._source;
        this.productDetails = productDetails;
        this.store_display_name = productDetails.store_display_name
        this.store_address = productDetails.store_address
        this.store_rating = productDetails.store_rating
        this.store_review = productDetails.store_review
        this.store_contact = productDetails.store_contact
        this.store_cover_image = productDetails.store_cover_image
        this.store_logo = productDetails.store_logo_url
        if (productDetails.delivery_attributes) {
          this.storePick = productDetails.delivery_attributes.store_pickup == "YES" ? 'available' : 'not available';
        }
        this.is_live = productDetails.is_live;
        this.storeOpenDetails = storeOpenCalculate(productDetails.store_operation)
        this.deliveryText = this.getDeliveryValue(res.storeProductDetails.hits[0])
      }
    });

    this.store.pipe(select("merchantManagement")).subscribe(response => {
      if (response.storeProductCategory) {
        this.productCategories = response.storeProductCategory.obj;
      }
    });

    this.store.pipe(select("merchantManagement")).subscribe(res => {
      if (res.storeProductList) {
        this.productList = res.storeProductList;
      }
    })
  }

  getDeliveryValue = (store) => {
    let text = 'Does not deliver to your location';
    if (store._source.store_local_listing_range) {
      let listRange = Number(store._source.store_local_listing_range)
      if (listRange > 0) {
        if (store.fields) {
          if (Number(store.fields.distance[0] * 1000) <= listRange) {
            text = 'Delivery availaible';
          }
        } else {
          text = 'Delivery not availaible';
        }
      } else {
        text = 'Delivery not availaible';
      }
    }
    return text;
  }

  getProductList() {
    this.store.dispatch(new GetProductList({
      categories: [],
      from: 0,
      productName: '',
      size: 10,
      storeId: this.storeId
    }, true));
  }

  categoryFilter(categoryName, categoryId) {
    this.from = 0
    this.selectedCategoryId = categoryId
    this.categoryFilterObj.query_string.query = `${categoryName}*`
    this.store.dispatch(new GetProductList({
      categories: this.selectedCategoryId ? [this.categoryFilterObj] : [],
      from: this.from,
      productName: '',
      size: 10,
      storeId: this.storeId
    }, true));
    this.topFunction()
  }
  searchProduct(event) {
    this.from = 0
    if (event.keyCode != 8 && event.keyCode != 46) {
      if (this.searchTerm.length > 2) {
        this.store.dispatch(new GetProductList({
          categories: this.selectedCategoryId ? [this.categoryFilterObj] : [],
          from: this.from,
          productName: this.searchTerm,
          size: 10,
          storeId: this.storeId
        }, true));
      }
    } else {
      this.store.dispatch(new GetProductList({
        categories: this.selectedCategoryId ? [this.categoryFilterObj] : [],
        from: this.from,
        productName: this.searchTerm,
        size: 10,
        storeId: this.storeId
      }, true));
    }
    this.topFunction()

  }

  showMore() {
    this.from += 10
    this.store.dispatch(new GetProductList({
      categories: this.selectedCategoryId ? [this.categoryFilterObj] : [],
      from: this.from,
      productName: '',
      size: 10,
      storeId: this.storeId
    }, false));
  }

  topFunction() {
    let myDiv = document.getElementById('containerDivFilter');
    myDiv.scrollTop = 0;
  }

  public openProductDialog(product: any) {

    let temp = this.dialog.open(UpdateStoreProductComponent, {
      maxHeight: '550px',
      disableClose: true,
      minWidth: '800px',
      panelClass: 'view-product-details',
      data: {
        productId: product._source.product_id,
        storeId: product._source.store_id
      }
    });
    temp.afterClosed().subscribe((res) => {

    });
  }

  ngOnDestroy() {
    this.store.dispatch(new StoreStoreProductDetails(null))
    this.store.dispatch(new StoreProductCategory(null))
    this.store.dispatch(new StoreProductList(null, true))
  }
}
