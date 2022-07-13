import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreManagementComponent } from './store-management.component';

const routes: Routes = [
  {
    path: '',
    component: StoreManagementComponent,
    children: [
      {
        path: 'product-attribute',
        loadChildren: () => import('./product-attribute/product-attribute.module').then(m => m.ProductAttributeModule),
        data:{preload:true}
      },
      {
        path: 'manage-categories',
        loadChildren: () => import('./manage-categories/manage-categories.module').then(m => m.ManageCategoriesModule),
        data:{preload:false}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagementRoutingModule { }
