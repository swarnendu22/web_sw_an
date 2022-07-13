import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtherChargesComponent } from './other-charges/other-charges.component';
import { PendingCommissionComponent } from './pending-commission/pending-commission.component';
import { CommissionManagementComponent } from './commission-management.component';
import { AddNewCommissionGroupComponent } from './add-new-commission-group/add-new-commission-group.component';
import { ShowCommissionManagementComponent } from './show-commission-management/show-commission-management.component';

const routes: Routes = [
  {
    path: '',
    component: CommissionManagementComponent,
  },
  {
    path: 'other-charges',
    component: OtherChargesComponent,
  },
  {
    path: 'pending-commission',
    component: PendingCommissionComponent,
  },
  {
    path: 'add-new-commission-group',
    component: AddNewCommissionGroupComponent,
  },
  {
    path: 'show/:id',
    component: ShowCommissionManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionManagementRoutingModule { }
