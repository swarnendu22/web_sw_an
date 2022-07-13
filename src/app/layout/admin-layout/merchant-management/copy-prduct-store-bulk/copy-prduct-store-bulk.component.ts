import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { GetStoreListByMerchantId } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-copy-prduct-store-bulk',
  templateUrl: './copy-prduct-store-bulk.component.html',
  styleUrls: ['./copy-prduct-store-bulk.component.css']
})
export class CopyPrductStoreBulkComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CopyPrductStoreBulkComponent>,
    private fb: FormBuilder,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    // console.log( data );
    this.CopyFromStoreId = parseInt(this.data.storeId);
    let payload  = { pageNo: 1,
                    pageSize: 1000, 
                    requestBody: {
                    merchnatId: data.merchantID
                    }};
    this.store.dispatch(new GetStoreListByMerchantId( payload ));
  }

  CopyFromStoreId: number;
  copyFromList: any = [];

  CopyToStoreId: any;
  CopyToStoreList: any = [];

  storesWithNoProd: number = 0;

  ngOnInit(): void {

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if( res.storeListByMerchantId ){
        this.copyFromList = res.storeListByMerchantId.payload;
        this.CopyToStoreList = res.storeListByMerchantId.payload; 
        this.countStoresWithNoProduct( this.CopyToStoreList );
      }
    })
  }

  Submit() {
    // console.log( this.CopyToStoreId )
    this.dialogRef.close( {
      copyFromStoreId: this.CopyFromStoreId,
      copyToStoreId: this.CopyToStoreId
    } );
  }

  countStoresWithNoProduct ( storeList ){
    let len = storeList.length;
    let count = 0;
    for( let i = 0; i < len; i++  ){
      if( !storeList[i].productCount ){
        count++;
      }
    }
    this.storesWithNoProd = count;
  }

}
