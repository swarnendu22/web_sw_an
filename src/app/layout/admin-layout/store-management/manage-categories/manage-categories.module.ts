import { AdminLayoutModule } from './../../admin-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCategoriesRoutingModule } from './manage-categories-routing.module';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { ManageCategoriesComponent } from './manage-categories.component';
import { PendingCategoryComponent } from './pending-category/pending-category.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise/main';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';

//import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
//import { MyFilterPipe } from './add-new-category/MyFilterPipe';
import { ShowCategoryComponent, CategoryCommissionDeleteDialog } from './show-category/show-category.component';
//import { NgSelectComponent } from '../../components/ng-select/ng-select.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
// import { ChecklistDatabase } from '../../catalog-management/manage-catalog/catalog-product-filter/catalog-product-filter.component';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatTableModule } from '@angular/material/table';
import { TooltipModule } from 'ng2-tooltip-directive';
import { PrivateCategoryComponent } from './private-category/private-category.component';
import { CategoryKeywordsComponent } from './category-keywords/category-keywords.component';
import { QuicklinksRequestComponent } from './quicklinks-request/quicklinks-request.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCategoryImageComponent } from './edit-category-image/edit-category-image.component';

@NgModule({
  imports: [
    CommonModule,
    ManageCategoriesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutModule,
    CustomModule,
    TooltipModule,
    NgxPaginationModule,
    ImageCropperModule,
    MatTableModule,
    AgGridModule.withComponents([]),
    NgxMatSelectSearchModule,
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    }),
  ],
  declarations: [
    ShowCategoryComponent,
    ManageCategoriesComponent,
    AddNewCategoryComponent,
    PendingCategoryComponent,
    CategoryCommissionDeleteDialog,
    PrivateCategoryComponent,
    CategoryKeywordsComponent,
    QuicklinksRequestComponent,
    EditCategoryImageComponent
  ],
  providers: [AgGridOptions],
  entryComponents: [CategoryCommissionDeleteDialog, EditCategoryImageComponent]
})
export class ManageCategoriesModule { }
