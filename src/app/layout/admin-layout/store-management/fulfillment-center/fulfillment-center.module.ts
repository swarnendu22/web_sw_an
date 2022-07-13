import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FulfillmentCenterRoutingModule } from './fulfillment-center-routing.module';
import {
  AddNewfulfillmentCenterComponent,
  UpdateFCPopup,
} from './add-newfulfillment-center/add-newfulfillment-center.component';
import { FulfillmentCenterComponent } from './fulfillment-center.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { CustomModule } from 'src/app/custom/custom.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AddNewfulfillmentCenterComponent,
    FulfillmentCenterComponent,
    UpdateFCPopup,
  ],
  imports: [
    CommonModule,
    FulfillmentCenterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TooltipModule,
    AgGridModule,
    CustomModule,
    NgxMatSelectSearchModule,
  ],
  providers: [AgGridOptions],
  entryComponents: [UpdateFCPopup],
})
export class FulfillmentCenterModule { }
