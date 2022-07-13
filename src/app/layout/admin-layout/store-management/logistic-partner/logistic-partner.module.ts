import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticPartnerRoutingModule } from './logistic-partner-routing.module';
import { AddNewLogisticPartnerComponent } from './add-new-logistic-partner/add-new-logistic-partner.component';

import { LogisticPartnerComponent } from './logistic-partner.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/meterial-module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { CustomModule } from 'src/app/custom/custom.module';

@NgModule({
  declarations: [AddNewLogisticPartnerComponent, LogisticPartnerComponent],
  imports: [
    CommonModule,
    LogisticPartnerRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomModule,
  ],
  providers: [AgGridOptions]
})
export class LogisticPartnerModule { }
