import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryCenterRoutingModule } from './delivery-center-routing.module';
import {
  AddNewDeliveryCenterComponent,
  UpdateDCPopup,
} from './add-new-delivery-center/add-new-delivery-center.component';

import { DeliveryCenterComponent } from './delivery-center.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/meterial-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AddNewDeliveryCenterComponent,
    DeliveryCenterComponent,
    UpdateDCPopup,
  ],
  imports: [
    CommonModule,
    DeliveryCenterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    CustomModule,
    TooltipModule,
    NgxMatSelectSearchModule,
  ],
  providers: [AgGridOptions],
  entryComponents: [UpdateDCPopup],
})
export class DeliveryCenterModule { }
