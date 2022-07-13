import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise/main';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { MaterialModule } from '../../../meterial-module';
import { CategoryManagementComponent } from './category-management.component';
import { CustomModule } from '../../../custom/custom.module';
import { NgxMatSelectSearchModule } from '../../../../../node_modules/ngx-mat-select-search';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
@NgModule({
  declarations: [
    CategoryManagementComponent,
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    CustomModule,
    NgxMatSelectSearchModule,

  ],
  providers: [AgGridOptions],
  entryComponents: []
})
export class CategoryManagementModule { }