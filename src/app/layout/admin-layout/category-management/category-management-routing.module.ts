import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryManagementComponent } from "./category-management.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () => import('./manage-brands/manage-brands.module').then(m => m.ManageBrandsModule),
        data:{preload:true}
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
