import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/meterial-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgUploadAwsComponent } from '../components/img-upload-aws/img-upload-aws.component';
import { CategoryDropDownComponent } from '../layout/admin-layout/components/category-drop-down/category-drop-down.component';
import { ParentCategoryDropDownComponent } from '../layout/admin-layout/components/parent-category-drop-down/parent-category-drop-down.component';
import { FormatStringPipe } from '../pipes/format-string.pipe';
import { FilterDataPipe } from '../pipes/filter-data.pipe';
import { NumbersOnlyDirective } from '../directives/numbersonly.directive';
import { BlockCopyPasteDirective } from '../directives/block-copy-paste.directive';
import { BlockTypeInputDirective } from '../directives/block-type-input.directive';
import { TwoDigitDecimaNumberDirective } from '../directives/two-digit-decima-number.directive';
import { NumbersInputsDirective } from '../directives/numbersinputs.directive';
import { SplitPipe } from '../pipes/split.pipe';
import { MyFilterPipe } from '../layout/admin-layout/store-management/manage-categories/add-new-category/MyFilterPipe';
import { NgSelectComponent } from '../layout/admin-layout/components/ng-select/ng-select.component';
import { NgMultiselectComponent } from '../layout/admin-layout/components/ng-multiselect/ng-multiselect.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DateFormaterPipe } from '../pipes/date-formater.pipe';
// import { EditPriceInventoryComponent } from '../layout/admin-layout/seller-panel/seller-catalog/edit-price-inventory/edit-price-inventory.component';
import { VariantImageComponent } from '../layout/admin-layout/catalog-management/components/variant-image/variant-image.component';
import { AddNewVariantSelectionComponent } from '../layout/admin-layout/catalog-management/components/add-new-variant-selection/add-new-variant-selection.component';
import { JsonPrittifyPipe } from '../pipes/format-json.pipe';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { InputTrimDirective } from '../directives/input-trim.directive';
import { DoubleSubmitDirective } from '../directives/double-submit-directive';
import { SplitImageNamefromURLPipe } from '../pipes/split-image-namefrom-url.pipe';
import { PancardValidationDirective } from '../directives/panCardValidation.directive';

@NgModule({
  declarations: [
    ImgUploadAwsComponent,
    CategoryDropDownComponent,
    ParentCategoryDropDownComponent,
    NgSelectComponent,
    NgMultiselectComponent,
    FormatStringPipe,
    FilterDataPipe,
    SplitPipe,
    NumbersOnlyDirective,
    TwoDigitDecimaNumberDirective,
    NumbersInputsDirective,
    BlockCopyPasteDirective,
    BlockTypeInputDirective,
    MyFilterPipe,
    DateFormaterPipe,
    JsonPrittifyPipe,
    GroupByPipe,
    InputTrimDirective,
    DoubleSubmitDirective,
    SplitImageNamefromURLPipe,
    PancardValidationDirective
    // EditPriceInventoryComponent

  ],
  imports: [CommonModule, FormsModule, MaterialModule, NgSelectModule,
    InfiniteScrollModule,],
  exports: [
    ImgUploadAwsComponent,
    CategoryDropDownComponent,
    ParentCategoryDropDownComponent,
    NgSelectComponent,
    NgMultiselectComponent,
    FormatStringPipe,
    FilterDataPipe,
    NumbersOnlyDirective,
    TwoDigitDecimaNumberDirective,
    NumbersInputsDirective,
    BlockCopyPasteDirective,
    BlockTypeInputDirective,
    SplitPipe,
    MyFilterPipe,
    InfiniteScrollModule,
    DateFormaterPipe,
    JsonPrittifyPipe,
    GroupByPipe,
    InputTrimDirective,
    DoubleSubmitDirective,
    SplitImageNamefromURLPipe,
    PancardValidationDirective
    // EditPriceInventoryComponent

  ],
  // entryComponents: [EditPriceInventoryComponent]
})
export class CustomModule { }
