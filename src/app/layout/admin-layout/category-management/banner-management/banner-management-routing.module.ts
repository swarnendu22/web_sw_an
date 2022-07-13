import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewBannerComponent } from './new-banner/new-banner.component';
import { InActivebannerComponent } from './in-activebanner/in-activebanner.component';
import { ActiveBannerComponent } from './active-banner/active-banner.component';
import { ShowBannerComponent } from './show-banner/show-banner.component';
import { FlashSalesListComponent } from './flash-sales-list/flash-sales-list.component';
import { CreateNewFlashSaleComponent } from './create-new-flash-sale/create-new-flash-sale.component';
import { ShowFlashSaleComponent } from './show-flash-sale/show-flash-sale.component';

const routes: Routes = [
  {
    path: 'new-banner',
    component: NewBannerComponent,
  },
  {
    path: 'in-active-banner',
    component: InActivebannerComponent,
  },
  {
    path: 'active-banner',
    component: ActiveBannerComponent,
  },
  {
    path: 'active-banner/show/:id',
    component: ShowBannerComponent,
  },
  {
    path: 'flash-sales-list',
    component: FlashSalesListComponent,
  },
  {
    path: 'create-new-flash-sale',
    component: CreateNewFlashSaleComponent,
  },
  {
    path: 'flash-sales-list/show/:id',
    component: ShowFlashSaleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerManagementRoutingModule { }
