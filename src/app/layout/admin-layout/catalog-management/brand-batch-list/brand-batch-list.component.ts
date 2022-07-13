import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetBrandBatchList, ApproveBrandBatchList, ActionTypes } from 'src/app/actions/catalog-management.action';
import { GetActiveBrands, StoreActiveBrands } from '../../../../actions/brand-management.actions';
import { AddCategoryBrandComponent } from '../add-category-brand/add-category-brand.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';

@Component({
  selector: 'app-brand-batch-list',
  templateUrl: './brand-batch-list.component.html',
  styleUrls: ['./brand-batch-list.component.css']
})
export class BrandBatchListComponent implements OnInit {
  allBrandBatchList = [];
  brandsList = [];
  brandSelectedList = [];
  isBrandChanged = false;
  isBrandListFetch = false;
  constructor(
    public dialogRef: MatDialogRef<BrandBatchListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
  ) {
  }
  ngOnInit(): void {
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.activeBrands) {
        this.brandsList = res.activeBrands;
      } else {
        this.store.dispatch(new GetActiveBrands('1'));
      }
      this.store.dispatch(
        new GetBrandBatchList({
          batchId: this.data.batchId
        })
      );
    });
    this.store.pipe(select('catalogFilesReducer')).subscribe(res => {
      if(res.allBrandBatchList) {
        res.allBrandBatchList.forEach((element, i) => {
          var index1 = this.brandsList.findIndex(x => x.id == element.brandId);
          if(index1 === -1) {
            res.allBrandBatchList[i].isDisabled = false;
          } else {
            res.allBrandBatchList[i].isDisabled = true;
          }
        });
        this.allBrandBatchList = res.allBrandBatchList;
        this.isBrandListFetch = true;
      }
    });
  }
  createNewBand(bandName) {
    const dialog = this.dialog.open(AddCategoryBrandComponent, {
      minWidth: '400',
      maxHeight: 600,
      disableClose: true,
      panelClass: 'ndh-order-view',
      data: {
        bandName: bandName,
        batchId: this.data.batchId
      }
    })
    dialog.afterClosed().subscribe(result => {
      this.brandsList.unshift(result['payload']);
      this.store.dispatch(
        new GetBrandBatchList({
          batchId: this.data.batchId
        })
      );
    });
  }
  brandChange(event, brand_name) {
    var index = this.brandSelectedList.findIndex(x => x.brandName == brand_name);
    if(index === -1) {
      this.brandSelectedList.push({
        brandId: event.value,
        brandName: brand_name
      })
    } 
    else {
      this.brandSelectedList[index].brandId = event.value;
    }
    this.isBrandChanged = true;
  }
  onFormSubmit() {
    let brandApprovedata = {
      batchId: this.data.batchId,
      brandList: this.brandSelectedList
    }
    this.store.dispatch(new ApproveBrandBatchList(brandApprovedata));
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.approveBrandBatchList) {
        this.dialogRef.close();
      }
    });
  }
}
