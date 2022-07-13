import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPageManagementRoutingModule } from './static-page-management-routing.module';
import { StaticPageManagementComponent } from './static-page-management.component';
import { AddNewStaticPageComponent } from './add-new-static-page/add-new-static-page.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [StaticPageManagementComponent, AddNewStaticPageComponent],
  imports: [
    CommonModule,
    StaticPageManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgGridModule,
    CustomModule,
    AngularEditorModule,
  ],
})
export class StaticPageManagementModule {}
