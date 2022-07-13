import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAttributeRoutingModule } from './product-attribute-routing.module';
import { ProductAttributeComponent } from './product-attribute.component';
import { AttributeGroupComponent } from './attribute-group/attribute-group.component';
import { AttributeSetComponent } from './attribute-set/attribute-set.component';
import {
  AddAttributeComponent,
} from './add-attribute/add-attribute.component';
import { AddProductAttributeComponent } from './add-product-attribute/add-product-attribute.component';
import { MaterialModule } from '../../../../meterial-module';
import {
  FormsModule,
  ReactiveFormsModule,
} from '../../../../../../node_modules/@angular/forms';
import { ColorPickerModule } from '../../../../../../node_modules/ngx-color-picker';
import { AgGridModule } from '../../../../../../node_modules/ag-grid-angular';
import { CustomModule } from 'src/app/custom/custom.module';
import { AddNewGroupComponent } from './add-new-group/add-new-group.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { EditProductAttributeComponent } from './edit-product-attribute/edit-product-attribute.component';
import { EditProductAttributeSetComponent, ViewAttributeComponent } from './edit-product-attribute-set/edit-product-attribute-set.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ServerSidePagination } from 'src/app/utils/serverSidePagination/server-side-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AttributesPageComponent } from './attributes-page/attributes-page.component';


@NgModule({
  declarations: [
    ProductAttributeComponent,
    AttributeGroupComponent,
    AttributeSetComponent,
    AddAttributeComponent,
    AddProductAttributeComponent,
    AddNewGroupComponent,
    EditProductAttributeComponent,
    EditProductAttributeSetComponent,
    ViewAttributeComponent,
    AttributesPageComponent
  ],
  imports: [
    CommonModule,
    ProductAttributeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    CustomModule,
    TooltipModule,
    NgxMatSelectSearchModule,
    AgGridModule.withComponents([]),
  ],
  entryComponents: [ViewAttributeComponent],
  providers: [AgGridOptions, ServerSidePagination],
})
export class ProductAttributeModule { }
