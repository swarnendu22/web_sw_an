import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetProducts, GetSearchProductNupcOrName } from '../../../../../actions/commission-exception-management.action';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import * as _ from 'lodash';
@Component({
  selector: 'app-product-nupc-list',
  templateUrl: './product-nupc-list.component.html',
  styleUrls: ['./product-nupc-list.component.css']
})
export class ProductNupcListComponent {
  listType = '';
  products = null;
  productId = null;
  searchTerm = '';
  oldSearchTerm = '';
  payload = {
    pageNumber: 1,
    pageSize: 50,
    searchTerm: ''
  }

  constructor(public dialogRef: MatDialogRef<ProductNupcListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<categoryState>) {
    this.listType = this.data.listType;
    // this.searchTerm = this.data.searchTerm;


  }
  done() {

    const fIndex = _.findIndex(this.products, e => e.id == this.productId);
    let productName = '';
    if (fIndex > -1) {
      productName = this.products[fIndex]['productName'];
      this.dialogRef.close({
        id: this.productId,
        productName: productName
      });
    }

  }


  serach() {

    if (this.searchTerm == this.oldSearchTerm) {
      this.payload.searchTerm = this.oldSearchTerm;
      // if (!this.products) {
      this.store.dispatch(new GetSearchProductNupcOrName(this.payload, false));

      // }
    }
    else {
      this.payload.searchTerm = this.searchTerm;
      this.payload.pageNumber = 1;
      // if (!this.products) {
      this.store.dispatch(new GetSearchProductNupcOrName(this.payload, true));
      this.topFunction();


      // }
    }


    this.store.pipe(select<any, any>('commissionsExceptions')).subscribe(res => {
      if (res['productNameList'] && res['productNameList'].list) {
        this.products = res['productNameList'].list;
        this.oldSearchTerm = this.searchTerm;

      }

    });
  }

  showMore() {
    console.log('called');
    this.payload.pageNumber += 1;
    this.payload.searchTerm = this.searchTerm;
    this.store.dispatch(new GetSearchProductNupcOrName(this.payload, false));
    // this.loading = true;

  }

  topFunction() {
    var myDiv = document.getElementById('containerDivFilter');

    myDiv.scrollTop = 0;
  }
}
