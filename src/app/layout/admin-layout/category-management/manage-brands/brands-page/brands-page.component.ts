import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetActiveBrands, GetInactiveBrands, GetPendingBrands, StoreActiveBrands } from '../../../../../actions/brand-management.actions';
import { brandManagementState } from '../../../../../reducers/brand-management.reducers';

@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.css']
})
export class BrandsPageComponent implements OnInit {
  tabIndex:any = 0;

  constructor(private store: Store<brandManagementState>,) {
    if(localStorage.getItem('tabIndexBand')) {
      this.tabIndex = localStorage.getItem('tabIndexBand');
    }
   }

  ngOnInit() {
  }
  refreshBand() {
    if(this.tabIndex=='0') {
      this.store.dispatch(new GetActiveBrands('1'));
    } else if(this.tabIndex=='1') {
      this.store.dispatch(new GetInactiveBrands());
    } else {
      this.store.dispatch(new GetPendingBrands());
    }
  }
  route(event) {
    console.log('click', event);
    const tabindex = event.index;
    this.tabIndex = tabindex;
    localStorage.setItem('tabIndexBand', this.tabIndex);
  }
}
