import { StorePendingProductsComponent } from './store-pending-products/store-pending-products.component';
import { CatalogFilesComponent } from './catalog-files/catalog-files.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogDashboardComponent } from './catalog-dashboard/catalog-dashboard.component';
//import { ManageMasterCatalogComponent } from './manage-master-catalog/manage-master-catalog.component';
import { CatalogFilesShowGridComponent } from './catalog-files-show-grid/catalog-files-show-grid.component';
import { CatalogFilesShowProductComponent } from './catalog-files-show-product/catalog-files-show-product.component';
import { AdminFilePageComponent } from './admin-file-page/admin-file-page.component';
import { ElasticMasterCatalogComponent } from './elastic-master-catalog/elastic-master-catalog.component';
import { CreateNewMasterCatalogFormComponent } from './create-new-master-catalog-form/create-new-master-catalog-form.component';
import { EditCatalogMasterFormComponent } from './edit-catalog-master-form/edit-catalog-master-form.component';
import { MasterProductViewComponent } from './master-product-view/master-product-view.component';
import { StorePrivateProductsComponent } from './store-private-products/store-private-products.component';

const routes: Routes = [
  { path: '', component: CatalogDashboardComponent },
  //{ path: 'manage-master-catalog', component: ManageMasterCatalogComponent },
  { path: 'manage-master-catalog', component: MasterProductViewComponent },
  { path: 'elastic-master-catalog', component: ElasticMasterCatalogComponent },
  { path: 'pending-catalogs', component: CatalogFilesComponent },
  {
    path: 'pending-catalogs/show/:id', component: CatalogFilesShowGridComponent
  },
  {
    path: 'pending-catalogs/show/:id/show/:id', component: CatalogFilesShowProductComponent
  },
  {
    path: 'admin-file-process', component: AdminFilePageComponent
  },
  {
    path: 'store-pending-products', component: StorePendingProductsComponent
  },
  {
    path: 'create-master-catalog', component: CreateNewMasterCatalogFormComponent
  },
  {
    path: 'edit-master-catalog/:id', component: EditCatalogMasterFormComponent
  },
  { path: 'store-private-products', component: StorePrivateProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogManagementRoutingModule { }