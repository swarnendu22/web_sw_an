import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { AddNewPaymentMethodComponent } from './add-new-payment-method/add-new-payment-method.component';

import { PaymentMethodsComponent } from './payment-methods.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { CustomModule } from 'src/app/custom/custom.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [AddNewPaymentMethodComponent, PaymentMethodsComponent],
  imports: [
    CommonModule,
    PaymentMethodsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    TooltipModule,
    CustomModule
  ],
  providers: [AgGridOptions],
})
export class PaymentMethodsModule { }
