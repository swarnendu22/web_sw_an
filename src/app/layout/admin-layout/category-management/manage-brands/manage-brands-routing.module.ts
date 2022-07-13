import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveBrandComponent } from './active-brand.component';
import { InActiveBrandComponent } from './in-active-brand/in-active-brand.component';
import { PendingBrandComponent } from './pending-brand/pending-brand.component';
import { AddNewBrandComponent } from './add-new-brand/add-new-brand.component';
import { ShowBrandComponent } from './show-brand/show-brand.component';
import { ShowPendingBrandComponent } from './show-pending-brand/show-pending-brand.component';
import { BrandsPageComponent } from './brands-page/brands-page.component';

const routes: Routes = [
  {
    path: '',
    // component: ActiveBrandComponent,
    component: BrandsPageComponent,
  },
  {
    path: 'in-active-brand',
    component: InActiveBrandComponent,
  },
  {
    path: 'pending-brand',
    component: PendingBrandComponent,
  },
  {
    path: 'add-new-brand',
    component: AddNewBrandComponent,
  },
  {
    path: 'show/:id',
    component: ShowBrandComponent,
  },
  {
    path: 'in-active-brand/show/:id',
    pathMatch: 'full',
    component: ShowBrandComponent,
  },
  {
    path: 'pending-brand/show/:id',
    pathMatch: 'full',
    component: ShowPendingBrandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBrandsRoutingModule { }
