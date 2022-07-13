import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionComponent } from './region.component';
import { AddNewRegionComponent } from './add-new-region/add-new-region.component';

const routes: Routes = [
  { path: '', component: RegionComponent },
  { path: 'add-new-region', component: AddNewRegionComponent },
  { path: 'show/:id', component: AddNewRegionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionRoutingModule {}
