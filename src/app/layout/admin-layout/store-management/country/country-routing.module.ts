import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';
import { AddNewCountryComponent } from './add-new-country/add-new-country.component';

const routes: Routes = [
  { path: '', component: CountryComponent },
  { path: 'add-new-country', component: AddNewCountryComponent },
  { path: 'show/:id', component: AddNewCountryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
