import { CustomModule } from './../../../../custom/custom.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerManagementRoutingModule } from './banner-management-routing.module';
import { NewBannerComponent } from './new-banner/new-banner.component';
import { InActivebannerComponent } from './in-activebanner/in-activebanner.component';
import { ActiveBannerComponent } from './active-banner/active-banner.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxMatSelectSearchModule } from '../../../../../../node_modules/ngx-mat-select-search';
import { ShowBannerComponent } from './show-banner/show-banner.component';
import { FlashSalesListComponent } from './flash-sales-list/flash-sales-list.component';
import { CreateNewFlashSaleComponent } from './create-new-flash-sale/create-new-flash-sale.component';
import { ShowFlashSaleComponent } from './show-flash-sale/show-flash-sale.component';



@NgModule({
  declarations: [NewBannerComponent, InActivebannerComponent, ActiveBannerComponent, ShowBannerComponent, FlashSalesListComponent, CreateNewFlashSaleComponent, ShowFlashSaleComponent],
  imports: [
    CommonModule,
    BannerManagementRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgGridModule,
    QueryBuilderModule,
    CustomModule,
    NgxMatSelectSearchModule,
    AceEditorModule,
  ],
  exports: [NgxMatSelectSearchModule]
})
export class BannerManagementModule { }
