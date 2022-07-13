import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'store',
        loadChildren: () => import('./store-management/store-management.module').then(m => m.StoreManagementModule),
        data:{preload:true}
      },
      {
        path: 'category',
        loadChildren: () => import('./category-management/category-management.module').then(m => m.CategoryManagementModule),
        data:{preload:true}
      },
      {
        path: 'merchant',
        loadChildren: () => import('./merchant-management/merchant-management.module').then(m => m.MerchantManagementModule),
        data:{preload:true}
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog-management/catalog-management.module').then(m => m.CatalogManagementModule),
        data:{preload:true}
      },
      {
        path: 'delivery-boy',
        loadChildren: () => import('./delivery-boy-management/delivery-boy-management.module').then(m => m.DeliveryBoyManagementModule),
        data:{preload:true}
      },
      {
        path: 'orders',
        loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule),
        data:{preload:true}
      },
      {
        path: 'coupon',
        loadChildren: () => import('./coupon-management/coupon-management.module').then(m => m.CouponManagementModule),
        data:{preload:true}
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./identity-verification/identity-verification.module').then(m => m.IdentityVerificationModule),
        data:{preload:true}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule { }
