import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryBoyManagementComponent } from './delivery-boy-management.component';
import { DeliveryBoyOrdersComponent } from './delivery-boy-orders/delivery-boy-orders.component';
import { PendingDeliveryBoyComponent } from './pending-delivery-boy/pending-delivery-boy.component';
import { ApprovedDeliveryBoyComponent } from './approved-delivery-boy/approved-delivery-boy.component';
import { InactiveDeliveryBoyComponent } from './inactive-delivery-boy/inactive-delivery-boy.component';
import { DeliveryBoyDashboardComponent } from './delivery-boy-dashboard/delivery-boy-dashboard.component';
import { DeliveryBoyOrderEarningComponent } from './delivery-boy-order-earning/delivery-boy-order-earning.component';
import { DeliveryBoyDebitNoteComponent } from './delivery-boy-debit-note/delivery-boy-debit-note.component';
import { DeliveryBoyCreditNoteComponent } from './delivery-boy-credit-note/delivery-boy-credit-note.component';
import { DeliveryBoyRegistrationComponent } from './delivery-boy-registration/delivery-boy-registration.component';
import { DriverDetailsUpdateComponent } from './driver-details-update/driver-details-update.component';
import { DeCommissionSettingsListComponent } from './delivery-boy-commission-settings/de-commission-settings-list/de-commission-settings-list.component';
import { AddDeCommissionSettingComponent } from './delivery-boy-commission-settings/add-de-commission-setting/add-de-commission-setting.component';
import { EditDeCommissionSettingComponent } from './delivery-boy-commission-settings/edit-de-commission-setting/edit-de-commission-setting.component';
import { AssignTrainingComponent } from './assign-training/assign-training.component';
import { DeliveryBoyMerchandiseComponent } from './delivery-boy-merchandise/delivery-boy-merchandise.component';
import { DECountryResolver } from 'src/app/utils/resolvers/delivery-boy.resolver';

const routes: Routes = [
  {
    path: '',
    component: DeliveryBoyManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'pending-delivery-boy',
        pathMatch: 'full',
      },
      { path: 'delivery-boy-registration', component: DeliveryBoyRegistrationComponent },
      { path: 'pending-delivery-boy', component: PendingDeliveryBoyComponent },
      { path: 'approved-delivery-boy', component: ApprovedDeliveryBoyComponent },
      { path: 'inactive-delivery-boy', component: InactiveDeliveryBoyComponent },
      { path: 'delivery-boy-dashboard', component: DeliveryBoyDashboardComponent },
      { path: 'delivery-boy-orders', component: DeliveryBoyOrdersComponent },
      { path: 'delivery-boy-order-earning', component: DeliveryBoyOrderEarningComponent },
      { path: 'delivery-boy-debit-note', component: DeliveryBoyDebitNoteComponent },
      { path: 'delivery-boy-credit-note', component: DeliveryBoyCreditNoteComponent },
      { path: 'delivery-boy-commission-settings', component: DeCommissionSettingsListComponent },
      { path: 'delivery-boy-commission-settings/add', component: AddDeCommissionSettingComponent },
      { path: 'delivery-boy-commission-settings/show/:id', component: EditDeCommissionSettingComponent },
      {
        path: 'approved-delivery-boy/driver-details/:id/:routeStatus',
        component: DriverDetailsUpdateComponent,
        resolve: { countryList: DECountryResolver }

      },
      {
        path: 'inactive-delivery-boy/driver-details/:id/:routeStatus',
        component: DriverDetailsUpdateComponent,
        resolve: { countryList: DECountryResolver }
      },
      {
        path: 'pending-delivery-boy/driver-details/:id/:routeStatus',
        component: DriverDetailsUpdateComponent,
        resolve: { countryList: DECountryResolver }
      },
      {
        path: 'pending-delivery-boy/assign-training',
        component: AssignTrainingComponent,
      },
      {
        path: 'pending-delivery-boy/delivery-boy-merchandise',
        component: DeliveryBoyMerchandiseComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryBoyManagementRoutingModule { }