import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { ManageBrandsRoutingModule } from './manage-brands-routing.module';
import { ActiveBrandComponent } from './active-brand.component';
import { InActiveBrandComponent } from './in-active-brand/in-active-brand.component';
import { AddNewBrandComponent } from './add-new-brand/add-new-brand.component';
import { PendingBrandComponent } from './pending-brand/pending-brand.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomModule } from '../../../../custom/custom.module';
import { ShowBrandComponent } from './show-brand/show-brand.component';
import {
  ShowPendingBrandComponent,
  RejectPendingBrandRequestModal,
} from './show-pending-brand/show-pending-brand.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { BrandsPageComponent } from './brands-page/brands-page.component';

@NgModule({
  declarations: [
    ActiveBrandComponent,
    InActiveBrandComponent,
    AddNewBrandComponent,
    PendingBrandComponent,
    ShowBrandComponent,
    ShowPendingBrandComponent,
    RejectPendingBrandRequestModal,
    BrandsPageComponent,
  ],
  imports: [
    CommonModule,
    ManageBrandsRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    CustomModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ImageCropperModule,
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    })
  ],
  entryComponents: [RejectPendingBrandRequestModal],
  providers: [AgGridOptions],
})
export class ManageBrandsModule { }
