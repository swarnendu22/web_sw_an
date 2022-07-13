import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { AddNewCountryComponent } from './add-new-country/add-new-country.component';
import { CountryComponent } from './country.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';

@NgModule({
  declarations: [AddNewCountryComponent, CountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgGridModule,
    CustomModule,
  ],
})
export class CountryModule {}
