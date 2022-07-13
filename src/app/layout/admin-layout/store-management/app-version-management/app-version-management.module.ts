import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppVersionManagementRoutingModule } from './app-version-management-routing.module';
import { AddNewAppVersionComponent } from './add-new-app-version/add-new-app-version.component';
import { AppVersionManagementComponent } from './app-version-management.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@NgModule({
  declarations: [AddNewAppVersionComponent, AppVersionManagementComponent],
  imports: [
    CommonModule,
    AppVersionManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgGridModule,
    CustomModule,
  ],

  providers: [AgGridOptions],
})
export class AppVersionManagementModule { }
