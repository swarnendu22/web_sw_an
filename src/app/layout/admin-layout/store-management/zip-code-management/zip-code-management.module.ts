import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZipCodeManagementRoutingModule } from './zip-code-management-routing.module';
import { ZipCodeManagementComponent } from './zip-code-management.component';
import { AddNewZipCodeComponent } from './add-new-zip-code/add-new-zip-code.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AddNewZoneComponent,
  addZip, updateZip
} from './add-new-zone/add-new-zone.component';
import { AddNewZipZoneUserComponent } from './add-new-zip-zone-user/add-new-zip-zone-user.component';
import { AllZipcodeManagementComponent } from './all-zipcode-management/all-zipcode-management.component';
import { AllZipZoneUserManagementComponent } from './all-zip-zone-user-management/all-zip-zone-user-management.component';
import { CustomModule } from 'src/app/custom/custom.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { EditZoneComponent, editZipcode, addZipcode } from './edit-zone/edit-zone.component';
import { FileUploadAndPreviewComponent } from './popup-components/file-upload-and-preview/file-upload-and-preview.component';
import { ExcelPreviewComponent } from './popup-components/excel-preview/excel-preview.component';
import { EditFileUploadPreviewComponent } from './popup-components/edit-file-upload-preview/edit-file-upload-preview.component';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    ZipCodeManagementComponent,
    AddNewZipCodeComponent,
    addZip,
    updateZip,
    addZipcode,
    editZipcode,
    AddNewZoneComponent,
    AddNewZipZoneUserComponent,
    AllZipcodeManagementComponent,
    AllZipZoneUserManagementComponent,
    EditZoneComponent,
    FileUploadAndPreviewComponent,
    ExcelPreviewComponent,
    EditFileUploadPreviewComponent,
  ],
  imports: [
    CommonModule,
    ZipCodeManagementRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    TooltipModule,
    CustomModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [addZip, updateZip, addZipcode, editZipcode, FileUploadAndPreviewComponent, ExcelPreviewComponent, EditFileUploadPreviewComponent],
  providers: [AgGridOptions],
})
export class ZipCodeManagementModule { }
