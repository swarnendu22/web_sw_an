import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionManagementRoutingModule } from './exception-management-routing.module';
import { CommissionExceptionComponent } from './commission-exception/commission-exception.component';
import { ProductExceptionComponent } from './product-exception/product-exception.component';
import { PendingExceptionComponent } from './pending-exception/pending-exception.component';
import { AddNewCommissionExceptionComponent } from './add-new-commission-exception/add-new-commission-exception.component';
import { AddNewProductExceptionComponent } from './add-new-product-exception/add-new-product-exception.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import {
  FormsModule,
  ReactiveFormsModule,
} from '../../../../../../node_modules/@angular/forms';
import { CustomModule } from '../../../../custom/custom.module';
import { ShowCommissionExceptionComponent } from './show-commission-exception/show-commission-exception.component';
import { ShowProductExceptionComponent } from './show-product-exception/show-product-exception.component';
import { NgxMatSelectSearchModule } from '../../../../../../node_modules/ngx-mat-select-search';
import { MyFilterPipe } from '../../store-management/manage-categories/add-new-category/MyFilterPipe';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { NgxTreeSelectModule, ExpandMode } from '../../../../../../node_modules/ngx-tree-select';
import { ProductNupcListComponent } from './product-nupc-list/product-nupc-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    CommissionExceptionComponent,
    ProductExceptionComponent,
    PendingExceptionComponent,
    AddNewCommissionExceptionComponent,
    AddNewProductExceptionComponent,
    ShowCommissionExceptionComponent,
    ShowProductExceptionComponent,
    ProductNupcListComponent,

  ],
  imports: [
    CommonModule,
    ExceptionManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    CustomModule,
    NgxMatSelectSearchModule,
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    }),
    InfiniteScrollModule
  ],
  providers: [AgGridOptions],
  entryComponents: [ProductNupcListComponent]
})
export class ExceptionManagementModule { }
