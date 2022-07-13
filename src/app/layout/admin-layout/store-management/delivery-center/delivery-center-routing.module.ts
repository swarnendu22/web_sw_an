import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryCenterComponent } from './delivery-center.component';
import { AddNewDeliveryCenterComponent } from './add-new-delivery-center/add-new-delivery-center.component';

const routes: Routes = [
  {path:'', component: DeliveryCenterComponent},
  {path:'add-new-delivery-center', component: AddNewDeliveryCenterComponent},
  {path:'show/:id', component: AddNewDeliveryCenterComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryCenterRoutingModule { }
