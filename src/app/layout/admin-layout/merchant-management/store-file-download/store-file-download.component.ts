import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { GetAttributeDataFromIds } from 'src/app/actions/catalog-management.action';
import { GetAttributeSet } from 'src/app/actions/storeManagement.action';
import { categoryState } from 'src/app/reducers/storemanagement.reducers';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-store-file-download',
  templateUrl: './store-file-download.component.html',
  styleUrls: ['./store-file-download.component.css']
})
export class StoreFileDownloadComponent implements OnInit {

  public sellerFilterCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();

  categories = null;
  selectedItems: any;
  allActiveSellers = [];
  merchantId = null;
  attributeSetId = null;
  categoryId = null;
  categoryItems = []
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;
  attributeSetsData = null;

  constructor(private store: Store<categoryState>,
    private apiMessageService: ApiMessageService, @Inject(MAT_DIALOG_DATA) public data: any) {

    // if (!this.categories) {
    // this.store.dispatch(new GetParentCategory());
    // this.store.dispatch(new GetCategory('false'));

    // }
    this.store.dispatch(new GetAttributeSet());

    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeSetsData = res['attributeSet'];
    });

    this.store.pipe(select<any, any>('parentCategories')).subscribe(res => {
      this.categories = res['parentCategories'];
      console.log('Reducer', res);
    });

    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['categories']) {
        this.categories = res['categories'];
        this.categoryItems = this.process(this.categories);
      }
    });

    // this.store.pipe(select<any, any>('catalogMgmt')).subscribe(res => {
    //   console.log(res);
    //   if (res['attributeSetsData']) {
    //     this.attributeSetsData = res['attributeSetsData'];
    //   }
    // });

    this.store.pipe(select<any, any>('sellerCatalogAdmin')).subscribe(res => {
      this.allActiveSellers = res['allActiveSellers'] ? res['allActiveSellers'].data : [];

      console.log('Select', this.allActiveSellers)


    })
  }
  ngOnInit() {
    // this.store.dispatch(new GetAllActiveSellersForBulkUpload({ 'as': 'as' }));
  }


  private process(data): any {
    let result = [];
    result = data.map((item) => {
      return this.toTreeNode(item);
    });
    return result;
  }

  private toTreeNode(node, parent = null) {

    if (node && node.childList) {
      node.childList.map(item => {
        return this.toTreeNode(item, node);
      });
    }
    return node;
  }


  categorySelectionValue(event) {

    if (this.selectedItems.attributeSetIds == null) {
      alert('Attribute Set Not Found for ' + this.selectedItems.name);
    }
    this.store.dispatch(new GetAttributeDataFromIds({
      attributeSetsID: JSON.parse(this.selectedItems.attributeSetIds)
    }))
    // console.log(this.selectedItems);
  }

  checkForm() {
    if (this.attributeSetId != null) {
      return true;
    }
    else {
      return false;
    }
  }

  download(event) {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/ndh-product/bulk-file/download-product-bulk-file/${this.attributeSetId}`,
      'application/vnd.ms-excel', this.data.storeId
    )
      .subscribe(
        data => {
          console.log('attribute');
          const attribute = this.attributeSetsData.find(e => e.id == this.attributeSetId)
          // let category_nameArr = this.selectedItems.split('>>');
          // var category_name = this.selectedItems.name;
          // category_name = category_name.replace(/[^a-zA-Z ]/g, "");
          saveAs(data, `store_${attribute.name}_${moment(new Date()).format("DD-MM-YYYY LTS").replace(/[- ]/gm, "_")}.xlsx`);
        },
        error => console.error(error)
      );
  }

}
