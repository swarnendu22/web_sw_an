import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCategoriesComponent } from './manage-categories.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { PendingCategoryComponent } from './pending-category/pending-category.component';
import { ShowCategoryComponent } from './show-category/show-category.component'
import { PrivateCategoryComponent } from './private-category/private-category.component';
import { CategoryKeywordsComponent } from './category-keywords/category-keywords.component';
import { QuicklinksRequestComponent } from './quicklinks-request/quicklinks-request.component';


const routes: Routes = [
  {
    path: '',
    component: ManageCategoriesComponent
  },
  {
    path: 'add-new',
    component: AddNewCategoryComponent
  },
  {
    path: 'pending-categories',
    component: PendingCategoryComponent
  },
  {
    path: 'show/:id',
    component: ShowCategoryComponent
  },
  {
    path: 'private-categories',
    component: PrivateCategoryComponent
  },
  {
    path: 'category-keywords-request',
    component: CategoryKeywordsComponent
  },
  {
    path: 'quicklinks-request',
    component: QuicklinksRequestComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCategoriesRoutingModule { }
