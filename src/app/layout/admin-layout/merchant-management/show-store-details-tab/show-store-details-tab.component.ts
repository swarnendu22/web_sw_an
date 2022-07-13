import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { 
  StoreBulkOperation,
  UpdateMerchantType,
  ElacticStoreDetailsSync,
  GetStoreInfoDetails
 } from '../../../../actions/merchant-management.actions';
import { VersionUpdateService } from 'src/app/utils/swUpdate/version-update.service';

@Component({
  selector: 'app-show-store-details-tab',
  templateUrl: './show-store-details-tab.component.html',
  styleUrls: ['./show-store-details-tab.component.css']
})
export class ShowStoreDetailsTabComponent implements OnInit {
  storeId = null;
  tabIndex = 0;
  storeName = null
  address = null
  storeStatus = null
  storeType = null
  storeInfoDetails = null
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private location: Location, 
    private store: Store<any>,
    private _router: VersionUpdateService
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
  }
  backMerchant() {
    this.location.back()
  }
  route(event) {
    const tabindex = event.index;
    this.tabIndex = tabindex;
  }

  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeInfoDetails) {
        this.storeInfoDetails = res.storeInfoDetails;
        this.storeName = this.storeInfoDetails.storeName
        this.address = this.storeInfoDetails.address
        this.storeStatus = this.storeInfoDetails.storeStatus
        this.storeType = this.storeInfoDetails.storeType;
      }
    });

    this._router.moveToDeliverSetting.subscribe( res => {
      this.tabIndex = +res;
    })
  }

  bulkOperation(value) {
    if(this.storeStatus == 'APPROVED') {
      let payload = {
        status: this.storeStatus,
        storeId: [this.storeId],
        remarks: "Bulk Operation For Approve"
      }
      this.store.dispatch(new StoreBulkOperation({ requestBody: payload }));
    }
    else if(this.storeStatus == 'DELETED')
    {
      if(confirm("Do you want to reject this store?")) {
        let payload = {
          status: 'REJECTED',
          storeId: [this.storeId],
          remarks: "Bulk Operation For Reject"
        }
        this.store.dispatch(new StoreBulkOperation({ requestBody: payload }));
      } else {
        this.store.dispatch(new GetStoreInfoDetails(this.storeId))
      }
    }
    // else if(this.storeStatus == 'DEACTIVATED')
    // {
    //   let payload = {
    //     status: 'DEACTIVATED',
    //     storeId: [this.storeId],
    //     remarks: "Bulk Operation For Delist"
    //   }
    //   this.store.dispatch(new StoreBulkOperation({ requestBody: payload }));
    // }
  }
  elacticStoreDetailsSync() {
    let payloadType = {
      storeId: this.storeId
    }
    this.store.dispatch(new ElacticStoreDetailsSync(payloadType));
  }
  onStoreTypeChange() {
    let payloadStoreType = {
      storeType: this.storeType,
      id: this.storeId
    }
    this.store.dispatch(new UpdateMerchantType(payloadStoreType));
  }
}
