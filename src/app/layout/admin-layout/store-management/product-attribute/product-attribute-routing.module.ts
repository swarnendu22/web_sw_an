//import { AttributesPageComponent } from './attributes-page/attributes-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAttributeComponent } from './product-attribute.component';
import { AttributeSetComponent } from './attribute-set/attribute-set.component';
import { AttributeGroupComponent } from './attribute-group/attribute-group.component';
import { AddProductAttributeComponent } from './add-product-attribute/add-product-attribute.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AddNewGroupComponent } from './add-new-group/add-new-group.component';
import { EditProductAttributeComponent } from './edit-product-attribute/edit-product-attribute.component';
import { EditProductAttributeSetComponent } from './edit-product-attribute-set/edit-product-attribute-set.component';

const routes: Routes = [
  {
    path: '',
    component: ProductAttributeComponent,
    //  component:AttributesPageComponent,
  },
  {
    path: 'attribute-set',
    component: AttributeSetComponent,
  },
  {
    path: 'attribute-group',
    component: AttributeGroupComponent,
  },

  {
    path: 'new-attribute-group',
    pathMatch: 'full',
    component: AddNewGroupComponent,
  },
  {
    path: 'attribute-group/show/:id',
    pathMatch: 'full',
    component: AddNewGroupComponent,
  },
  {
    path: 'add-product-attribute',
    component: AddProductAttributeComponent,
  },
  {
    path: 'show/:id',
    pathMatch: 'full',
    component: EditProductAttributeComponent,
  },
  {
    path: 'add-attribute',
    component: AddAttributeComponent,
  },
  {
    path: 'attribute-set/show/:id',
    pathMatch: 'full',
    component: AddAttributeComponent,
  },
  {
    path: 'edittest/:id',
    pathMatch: 'full',
    component: EditProductAttributeSetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAttributeRoutingModule { }
