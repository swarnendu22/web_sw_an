import { DEUsersComponent } from './de-users/de-users.component';
import { BlockedCustomerComponent } from './blocked-customer/blocked-customer.component';
import { ActiveCustomerComponent } from './active-customer/active-customer.component';
import { ManageIdentityVerificationComponent } from './manage-identity-verification/manage-identity-verification.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateUserManagementComponent } from './affiliate-user-management/affiliate-user-management.component';
import { PaymentsReconcilationComponent } from './payments-reconcilation/payments-reconcilation.component';
import { PaymentReconDataListComponent } from './payment-recon-data-list/payment-recon-data-list.component';
import { SellerPaymentSettlementComponent } from './seller-payment-settlement/seller-payment-settlement.component';
import { SellerSettlementDetailListComponent } from './seller-settlement-detail-list/seller-settlement-detail-list.component';

const routes: Routes = [
  {
    path: 'pending-user-updates',
    component: ManageIdentityVerificationComponent
  },
  {
    path: 'active-customers',
    component: ActiveCustomerComponent
  },
  {
    path: 'blocked-customers',
    component: BlockedCustomerComponent
  },
  {
    path: 'affiliate-users',
    component: AffiliateUserManagementComponent
  },
  {
    path: 'delivery-users',
    component: DEUsersComponent
  },
  {
    path: 'payment-reconcilation',
    component: PaymentsReconcilationComponent
  },
  {
    path: 'payment-recon-data-list/:id',
    component: PaymentReconDataListComponent
  },
  {
    path: 'seller-settlement-master-list',
    component: SellerPaymentSettlementComponent
  },
  {
    path: 'seller-settlement-master-list/:id',
    component: SellerSettlementDetailListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityVerificationRoutingModule { }
