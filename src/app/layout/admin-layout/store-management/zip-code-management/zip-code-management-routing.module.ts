import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZipCodeManagementComponent } from './zip-code-management.component';
import { AddNewZoneComponent } from './add-new-zone/add-new-zone.component';
import { AddNewZipZoneUserComponent } from './add-new-zip-zone-user/add-new-zip-zone-user.component';
import { AddNewZipCodeComponent } from './add-new-zip-code/add-new-zip-code.component';
import { AllZipcodeManagementComponent } from './all-zipcode-management/all-zipcode-management.component';
import { AllZipZoneUserManagementComponent } from './all-zip-zone-user-management/all-zip-zone-user-management.component';
import { EditZoneComponent } from './edit-zone/edit-zone.component';

const routes: Routes = [
  { path: '', redirectTo: 'zone', pathMatch: 'full' },
  { path: 'zone', component: ZipCodeManagementComponent },
  { path: 'zone/add-new-zone', component: AddNewZoneComponent },
  { path: 'zipcode', component: AllZipcodeManagementComponent },
  { path: 'zip-zone-user', component: AllZipZoneUserManagementComponent },
  { path: 'zipcode/add-new-zipcode', component: AddNewZipCodeComponent },
  { path: 'zipcode/show/:id', component: AddNewZipCodeComponent },
  {
    path: 'zip-zone-user/add-new-zip-zone-user',
    component: AddNewZipZoneUserComponent,
  },
  { path: 'zip-zone-user/show/:id', component: AddNewZipZoneUserComponent },
  { path: 'zone/show/:id', component: EditZoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZipCodeManagementRoutingModule { }
