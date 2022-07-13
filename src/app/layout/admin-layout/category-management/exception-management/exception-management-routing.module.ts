import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionExceptionComponent } from './commission-exception/commission-exception.component';
import { ProductExceptionComponent } from './product-exception/product-exception.component';
import { PendingExceptionComponent } from './pending-exception/pending-exception.component';
import { AddNewCommissionExceptionComponent } from './add-new-commission-exception/add-new-commission-exception.component';
import { AddNewProductExceptionComponent } from './add-new-product-exception/add-new-product-exception.component';
import { ShowCommissionExceptionComponent } from './show-commission-exception/show-commission-exception.component';
import { ShowProductExceptionComponent } from './show-product-exception/show-product-exception.component';

const routes: Routes = [
  { path: 'commission-exception', component: CommissionExceptionComponent },
  { path: 'product-exception', component: ProductExceptionComponent },
  { path: 'pending-exception', component: PendingExceptionComponent },
  { path: 'add-new-commission-exception', component: AddNewCommissionExceptionComponent },
  { path: 'add-new-product-exception', component: AddNewProductExceptionComponent },
  { path: 'commission-exception/show/:id', component: ShowCommissionExceptionComponent },
  { path: 'product-exception/show/:id', component: ShowProductExceptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionManagementRoutingModule { }
