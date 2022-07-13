import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';
import { AddNewRegionComponent } from './add-new-region/add-new-region.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomModule } from 'src/app/custom/custom.module';

@NgModule({
  declarations: [RegionComponent, AddNewRegionComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgGridModule,
    CustomModule,
    NgxMatSelectSearchModule,
  ],
})
export class RegionModule {}
