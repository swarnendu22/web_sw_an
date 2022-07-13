import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { select, Store } from '@ngrx/store';
import { GetUpdateMerchantHubUserDetails } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-merchant-hub-store-toggle',
  templateUrl: './merchant-hub-store-toggle.component.html',
  styleUrls: ['./merchant-hub-store-toggle.component.css']
})
export class MerchantHubStoreToggleComponent implements ICellRendererAngularComp {
  public params:any;
  toggleSlide:boolean = false;

  constructor(
    private store: Store<any>
  ) { }

  agInit(params:any):void {
    this.params = params;
    // console.log( this.params );
    if(this.params.data.isActive == 1){
      this.toggleSlide = true;
    } else{
      this.toggleSlide = false;
    }
  }
  toggle( toggleValue ){
    let isActive = toggleValue.checked;
    let payload = {
      "id": this.params.data.id,
      "isActive": isActive
    } 
    this.store.dispatch( new GetUpdateMerchantHubUserDetails( payload) );
    // if( this.params.data.role == "MERCHANT"){          
    //   this.store.dispatch( new GetUpdateMerchantHubUserDetails( payload) );
    // } 
    // else if( this.params.data.role == "HUB"){
    //   this.store.dispatch( new GetUpdateMerchantHubUserDetails( payload) );
    // }
    // else if( this.params.data.role == "STORE"){
    //   this.store.dispatch( new GetUpdateMerchantHubUserDetails( payload) );
    // }
  }
  refresh() {
    return false;
  }

}
