import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticPageManagementComponent } from './static-page-management.component';
import { AddNewStaticPageComponent } from './add-new-static-page/add-new-static-page.component';

const routes: Routes = [
  { path: '', component: StaticPageManagementComponent },
  { path: 'add-new-static-page', component: AddNewStaticPageComponent },
  { path: 'show/:id', component: AddNewStaticPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticPageManagementRoutingModule {}
