import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FulfillmentCenterComponent } from './fulfillment-center.component';
import { AddNewfulfillmentCenterComponent } from './add-newfulfillment-center/add-newfulfillment-center.component';

const routes: Routes = [
  { path: '', component: FulfillmentCenterComponent },
  {
    path: 'add-new-fulfillment-center',
    component: AddNewfulfillmentCenterComponent,
  },
  {
    path: 'show/:id',
    component: AddNewfulfillmentCenterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FulfillmentCenterRoutingModule {}
