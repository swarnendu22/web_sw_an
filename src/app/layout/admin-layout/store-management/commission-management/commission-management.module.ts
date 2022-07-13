import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionManagementRoutingModule } from './commission-management-routing.module';
import { CommissionManagementComponent } from './commission-management.component';
import { OtherChargesComponent } from './other-charges/other-charges.component';
import { PendingCommissionComponent } from './pending-commission/pending-commission.component';
import { MaterialModule } from 'src/app/meterial-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AddNewCommissionGroupComponent } from './add-new-commission-group/add-new-commission-group.component';
import { ShowCommissionManagementComponent } from './show-commission-management/show-commission-management.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    CommissionManagementComponent,
    OtherChargesComponent,
    PendingCommissionComponent,
    AddNewCommissionGroupComponent,
    ShowCommissionManagementComponent,
  ],
  imports: [
    CommonModule,
    CommissionManagementRoutingModule,
    MaterialModule,
    FormsModule,
    TooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [AgGridOptions],
})
export class CommissionManagementModule { }
