import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCouponComponent } from './master-coupon/master-coupon.component';
import { StoreCouponComponent } from './store-coupon/store-coupon.component';
import { EditCouponStoreComponent } from './edit-coupon-store/edit-coupon-store.component';
import { AddMasterCouponComponent } from './add-master-coupon/add-master-coupon.component';
import { EditMasterCouponComponent } from './edit-master-coupon/edit-master-coupon.component';
import { PlatformCouponComponent } from './platform-coupon/platform-coupon.component';
import { CustomCouponComponent } from './custom-coupon/custom-coupon.component';
import { SpecialCouponComponent } from './special-coupon/special-coupon.component';

const routes: Routes = [
  { path: 'master-coupon', component: MasterCouponComponent },
  { path: 'store-coupon/:id', component: StoreCouponComponent },
  { path: 'store-coupon', component: StoreCouponComponent },
  { path: 'master-coupon', component: EditCouponStoreComponent },
  { path: 'add-master-coupon', component: AddMasterCouponComponent },
  { path: 'edit-master-coupon/:id', component: EditMasterCouponComponent },
  { path: 'platform-coupon', component: PlatformCouponComponent },
  { path: 'custom-coupon', component: CustomCouponComponent },
  { path: 'special-coupon', component: SpecialCouponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule { }
