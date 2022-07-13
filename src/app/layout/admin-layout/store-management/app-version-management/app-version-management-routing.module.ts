import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppVersionManagementComponent } from './app-version-management.component';
import { AddNewAppVersionComponent } from './add-new-app-version/add-new-app-version.component';

const routes: Routes = [
  { path: '', component: AppVersionManagementComponent },
  { path: 'add-new-app-version', component: AddNewAppVersionComponent },
  { path: 'show/:id', component: AddNewAppVersionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppVersionManagementRoutingModule {}
