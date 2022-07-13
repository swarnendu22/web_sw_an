import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ng2-tooltip-directive';

import { StoreManagementRoutingModule } from './store-management-routing.module';
import { StoreManagementComponent } from './store-management.component';
import { MaterialModule } from '../../../meterial-module';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AffiliatesGroupManagementComponent } from './affiliates-group-management/affiliates-group-management.component';
// import { SellerGroupManagementComponent } from './seller-group-management/seller-group-management.component';

import { AgGridModule } from 'ag-grid-angular';
import { CustomModule } from 'src/app/custom/custom.module';


@NgModule({
  declarations: [StoreManagementComponent],
  imports: [
    CommonModule,
    StoreManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    NgxPaginationModule,
    CustomModule,
    TooltipModule
  ],
  entryComponents: [],
})
export class StoreManagementModule { }
