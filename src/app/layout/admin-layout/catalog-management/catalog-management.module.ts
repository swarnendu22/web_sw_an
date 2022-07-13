import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogManagementRoutingModule } from './catalog-management-routing.module';
import { CatalogDashboardComponent } from './catalog-dashboard/catalog-dashboard.component';
import { ManageMasterCatalogComponent } from './manage-master-catalog/manage-master-catalog.component';
import { MaterialModule } from 'src/app/meterial-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomModule } from 'src/app/custom/custom.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { AgGridModule } from 'ag-grid-angular';
import { VariantImageComponent } from './components/variant-image/variant-image.component';
import { AddNewVariantSelectionComponent } from './components/add-new-variant-selection/add-new-variant-selection.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogFilesComponent } from './catalog-files/catalog-files.component';
import { CatalogFilesShowGridComponent } from './catalog-files-show-grid/catalog-files-show-grid.component';
import { CatalogFilesShowProductComponent } from './catalog-files-show-product/catalog-files-show-product.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ConfirmDialogComponent } from './catalog-files-show-product/confirm-dialog/confirm-dialog.component';
import { AdminFileUploadComponent, AdminFileUploadMessageDialog } from './admin-file-upload/admin-file-upload.component';
import { AdminFileDownloadComponent } from './admin-file-download/admin-file-download.component';
import { AdminFilePageComponent } from './admin-file-page/admin-file-page.component';
import { ApprovalDialogComponent } from './components/approval-dialog/approval-dialog.component';
import { NdhStoreOpenLinkComponent } from './components/ndh-store-open-link/ndh-store-open-link.component';
import { AddAttributeFromCatalogComponent } from './add-attribute-from-catalog/add-attribute-from-catalog.component';
import { ColorPickerModule } from '../../../../../node_modules/ngx-color-picker';
import { CategorySearchDialogComponent } from './components/category-search-dialog/category-search-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductFilterPopupComponent } from './popup-component/product-filter/product-filter-popup.component';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { ElasticMasterCatalogComponent } from './elastic-master-catalog/elastic-master-catalog.component';
import { CreateNewMasterCatalogPopupComponent } from './create-new-master-catalog-popup/create-new-master-catalog-popup.component';
import { CreateNewMasterCatalogFormComponent } from './create-new-master-catalog-form/create-new-master-catalog-form.component';
import { EditCatalogMasterFormComponent } from './edit-catalog-master-form/edit-catalog-master-form.component';
import { StorePendingProductsComponent } from './store-pending-products/store-pending-products.component';
import { StoreProductFilterComponent } from './popup-component/store-product-filter/store-product-filter.component';
import { BrandBatchListComponent } from './brand-batch-list/brand-batch-list.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MasterProductViewComponent, DialogContentExampleDialog } from './master-product-view/master-product-view.component';
import {MatTableModule} from '@angular/material/table';
import { StorePrivateProductsComponent } from './store-private-products/store-private-products.component';
import { ProductImageCropComponent } from './product-image-crop/product-image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CatalogDashboardComponent,
    ManageMasterCatalogComponent,
    VariantImageComponent,
    AddNewVariantSelectionComponent,
    CatalogFilesComponent,
    CatalogFilesShowGridComponent,
    CatalogFilesShowProductComponent,
    ConfirmDialogComponent,
    AdminFilePageComponent,
    AdminFileUploadComponent,
    AdminFileDownloadComponent,
    AdminFileUploadMessageDialog,
    AdminFilePageComponent,
    ApprovalDialogComponent,
    NdhStoreOpenLinkComponent,
    AddAttributeFromCatalogComponent,
    CategorySearchDialogComponent,
    ProductFilterPopupComponent,
    ElasticMasterCatalogComponent,
    CreateNewMasterCatalogPopupComponent,
    CreateNewMasterCatalogFormComponent,
    EditCatalogMasterFormComponent,
    StorePendingProductsComponent,
    StoreProductFilterComponent,
    BrandBatchListComponent,
    MasterProductViewComponent,
    DialogContentExampleDialog,
    StorePrivateProductsComponent,
    ProductImageCropComponent
  ],
  imports: [
    CommonModule,
    CatalogManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularEditorModule,
    CustomModule,
    FormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridModule,
    NgbModule,
    ColorPickerModule,
    ImageCropperModule,
    NgxPaginationModule,
    MatTreeModule,
    MatTableModule,
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    }),
    CarouselModule,
  ],
  providers: [AgGridOptions],
  exports: [ApprovalDialogComponent, AddAttributeFromCatalogComponent],
  entryComponents: [
    ConfirmDialogComponent,
    AdminFileUploadComponent,
    AdminFileDownloadComponent,
    AdminFileUploadMessageDialog,
    ApprovalDialogComponent,
    NdhStoreOpenLinkComponent,
    AddAttributeFromCatalogComponent,
    CategorySearchDialogComponent,
    ProductFilterPopupComponent,
    CreateNewMasterCatalogPopupComponent,
    StoreProductFilterComponent,
    BrandBatchListComponent,
    DialogContentExampleDialog,
    ProductImageCropComponent
  ]
})
export class CatalogManagementModule { }
