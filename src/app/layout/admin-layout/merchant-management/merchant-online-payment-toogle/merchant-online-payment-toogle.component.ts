import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { select, Store } from '@ngrx/store';
import { MerchantAllowOnlinePayment } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-merchant-online-payment-toogle',
  templateUrl: './merchant-online-payment-toogle.component.html',
  styleUrls: ['./merchant-online-payment-toogle.component.css']
})
export class MerchantOnlinePaymentToogleComponent implements ICellRendererAngularComp  {

  constructor( private store: Store<any> ) { }

  ngOnInit(): void {
  }

  public params:any;
  toggleSlide:boolean = false;
  agInit(params:any):void {
    this.params = params;
    if(this.params.data.allowOnlinePayment){
      this.toggleSlide = true;
    } else{
      this.toggleSlide = false;
    }
  }

  toggle( toggleValue ){    
    let isActive = toggleValue.checked;
    let payload = {
      "merchantId": this.params.data.id,
      "allowOnlinePayment": isActive
    } 
    console.log( payload );
    this.store.dispatch ( new MerchantAllowOnlinePayment( { payload })  );
  }

  refresh() {
    return false;
  }

}
