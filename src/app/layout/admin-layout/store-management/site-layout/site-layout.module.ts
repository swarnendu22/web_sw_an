import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteLayoutRoutingModule } from './site-layout-routing.module';
import { SiteLayoutComponent } from './site-layout.component';
import { AndroidLayoutComponent } from './android-layout/android-layout.component';
import { IosLayoutComponent } from './ios-layout/ios-layout.component';
import { MobileBrowserComponent } from './mobile-browser/mobile-browser.component';
import { MaterialModule } from '../../../../meterial-module';
import { FormsModule, ReactiveFormsModule } from '../../../../../../node_modules/@angular/forms';
import { AgGridModule } from '../../../../../../node_modules/ag-grid-angular';
import { CustomModule } from 'src/app/custom/custom.module';

@NgModule({
  declarations: [SiteLayoutComponent, AndroidLayoutComponent, IosLayoutComponent, MobileBrowserComponent],
  imports: [
    CommonModule,
    SiteLayoutRoutingModule,
    MaterialModule,
    FormsModule,
    CustomModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class SiteLayoutModule { }
