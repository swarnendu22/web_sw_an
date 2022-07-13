import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticPartnerComponent } from './logistic-partner.component';
import { AddNewLogisticPartnerComponent } from './add-new-logistic-partner/add-new-logistic-partner.component';

const routes: Routes = [
  { path: '', component: LogisticPartnerComponent },
  {
    path: 'add-new-logistic-partner',
    component: AddNewLogisticPartnerComponent,
  },
  { path: 'show/:id', component: AddNewLogisticPartnerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticPartnerRoutingModule {}
