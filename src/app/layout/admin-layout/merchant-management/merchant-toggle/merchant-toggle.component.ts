import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { select, Store } from '@ngrx/store';
import { UpdateMerchantToggleStatus } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-merchant-toggle',
  templateUrl: './merchant-toggle.component.html',
  styleUrls: ['./merchant-toggle.component.css']
})
export class MerchantToggleComponent implements ICellRendererAngularComp {

  constructor( private store: Store<any> ) { }

  ngOnInit(): void {
  }

  public params:any;
  toggleSlide:boolean = false;

  agInit(params:any):void {
    this.params = params;
    if(this.params.data.isActive){
      this.toggleSlide = true;
    } else{
      this.toggleSlide = false;
    }
  }

  toggle( toggleValue ){    
    let isActive = toggleValue.checked;
    let payload = {
      "merchantId": this.params.data.id,
      "status": isActive
    } 
    // console.log( payload );
    this.store.dispatch ( new UpdateMerchantToggleStatus( { payload })  );
  }

  refresh() {
    return false;
  }

}
