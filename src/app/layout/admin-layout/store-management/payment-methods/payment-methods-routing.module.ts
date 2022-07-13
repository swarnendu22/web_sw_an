import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodsComponent } from './payment-methods.component';
import { AddNewPaymentMethodComponent } from './add-new-payment-method/add-new-payment-method.component';

const routes: Routes = [
  { path: '', component: PaymentMethodsComponent },
  { path: 'add-new-payment-method', component: AddNewPaymentMethodComponent },
  { path: 'show/:id', component: AddNewPaymentMethodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMethodsRoutingModule {}
