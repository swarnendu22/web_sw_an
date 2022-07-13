import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomModule } from 'src/app/custom/custom.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantManagementRoutingModule } from './merchant-management-routing.module';
import { CreateNewMerchantComponent } from './create-new-merchant/create-new-merchant.component';
import { MaterialModule } from 'src/app/meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { ManageMerchentsComponent } from './manage-merchents/manage-merchents.component';
import { DisplayMerchantManagementComponent } from './display-merchant-management/display-merchant-management.component';
import { ManageDeliveryRequestComponent } from './manage-delivery-request/manage-delivery-request.component';
import { DisplayManageDeliveryRequestComponent } from './display-manage-delivery-request/display-manage-delivery-request.component';
import { AgmCoreModule } from '@agm/core';
import { ManageDraftComponent } from './manage-draft/manage-draft.component';
import { ShowDraftDetailsComponent } from './show-draft-details/show-draft-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApproveStoreDraftComponent } from './approve-store-draft/approve-store-draft.component';
import { ApproveStoreComponent } from './approve-store/approve-store.component';
import { ManageStoreAssignComponent } from './manage-store-assign/manage-store-assign.component';
import { ShowStoreDetailsComponent } from './show-store-details/show-store-details.component';
import { ShowStoreProfileDetailsComponent } from './show-store-profile-details/show-store-profile-details.component';
import { ShowStoreProductDetailsComponent } from './show-store-product-details/show-store-product-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TooltipModule } from '../../../../../node_modules/ng2-tooltip-directive';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { StoreInfoComponent } from './store-info/store-info.component';
import { ShowStoreDetailsTabComponent } from './show-store-details-tab/show-store-details-tab.component';
import { DialogLatLongComponent } from './store-info/dialog-lat-long/dialog-lat-long.component';
import { StorePropertiesComponent } from './store-properties/store-properties.component';
import { StoreKeywordsComponent } from './store-keywords/store-keywords.component';
import { StorePromotionalComponent } from './store-promotional/store-promotional.component';
import { StoreDeliverySettingsComponent } from './store-delivery-settings/store-delivery-settings.component';
import { StoreOperationComponent } from './store-operation/store-operation.component';
import { StoreLayoutsComponent } from './store-layouts/store-layouts.component';
import { StoreComplianceComponent } from './store-compliance/store-compliance.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import { StoreUsersComponent } from './store-users/store-users.component';
import { StoreMediaComponent } from './store-media/store-media.component';
import { AddNewQuicklinkComponent } from './add-new-quicklink/add-new-quicklink.component';
import { AddStoreBannerComponent } from './add-store-banner/add-store-banner.component';
import { QueryBuilderModule } from '../../../../../node_modules/angular2-query-builder';
import { AceEditorModule } from '../../../../../node_modules/ng2-ace-editor';
import { StoreBannerListComponent } from './store-promotional/store-banner-list/store-banner-list.component';
import { ShowStoreBannerComponent } from './show-store-banner/show-store-banner.component';
import { AddComplianceFormComponent } from './store-compliance/add-compliance-form/add-compliance-form.component';
import { PendingMerchantsComponent } from './pending-merchants/pending-merchants.component';
import { RejectedMerchantsComponent } from './rejected-merchants/rejected-merchants.component';
import { RegisterMercchantComponent } from './register-mercchant/register-mercchant.component';
import { StoreBulkFileComponent } from './store-bulk-file/store-bulk-file.component';
import { StoreFileUploadComponent } from './store-file-upload/store-file-upload.component';
import { StoreFileDownloadComponent } from './store-file-download/store-file-download.component';
import { RegisterBulkMerchantComponent } from './register-bulk-merchant/register-bulk-merchant.component';
import { RegisterBulkMerchantGridComponent } from './register-bulk-merchant-grid/register-bulk-merchant-grid.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EditLayoutPopupComponent } from './edit-layout-popup/edit-layout-popup.component';
import { BulkInventoryPricingComponent } from './bulk-inventory-pricing/bulk-inventory-pricing.component';
import { BulkPriceUploadComponent } from './bulk-price-upload/bulk-price-upload.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CollectionBannerListComponent } from './collection-banner-list/collection-banner-list.component';
import { AddCollectionBannerComponent } from './add-collection-banner/add-collection-banner.component';
import { EditCollectionBannerComponent } from './edit-collection-banner/edit-collection-banner.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreBulkUpdateComponent } from './store-bulk-update/store-bulk-update.component';
import { DeactivatedMerchantsComponent } from './deactivated-merchants/deactivated-merchants.component';
import { MasterToStoreProductPopupComponent } from './master-to-store-product-popup/master-to-store-product-popup.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantInfoComponent } from './merchant-info/merchant-info.component';
import { UsersInfoComponent } from './users-info/users-info.component';
import { StoreListComponent } from './store-list/store-list.component';
import { MerchantInfoTabComponent } from './merchant-info-tab/merchant-info-tab.component';
import { AddComplianceMerchantComponent } from './add-compliance-merchant/add-compliance-merchant.component';
import { HubListComponent } from './hub-list/hub-list.component';
import { AddStoreUrlComponent } from './add-store-url/add-store-url.component';
import { MerchantHubStoreToggleComponent } from './merchant-hub-store-toggle/merchant-hub-store-toggle.component';
import { SubscriptionDialogComponent } from './subscription-dialog/subscription-dialog.component';
import { NgxColorsModule } from 'ngx-colors';
import { MerchantToggleComponent } from './merchant-toggle/merchant-toggle.component';
import { DeliveryManagementComponent } from './delivery-management/delivery-management.component';
import { EditDeliveryPartnerComponent } from './edit-delivery-partner/edit-delivery-partner.component';
import { MerchantOnlinePaymentToogleComponent } from './merchant-online-payment-toogle/merchant-online-payment-toogle.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CopyPrductStoreBulkComponent } from './copy-prduct-store-bulk/copy-prduct-store-bulk.component';
import { StoreUserRestPasswordComponent } from './store-user-rest-password/store-user-rest-password.component';

@NgModule({
  declarations: [
    CreateNewMerchantComponent,
    ManageMerchentsComponent,
    ManageMerchentsComponent,
    DisplayMerchantManagementComponent,
    ManageDeliveryRequestComponent,
    DisplayManageDeliveryRequestComponent,
    ManageDraftComponent,
    ShowDraftDetailsComponent,
    ApproveStoreDraftComponent,
    ApproveStoreComponent,
    ManageStoreAssignComponent,
    ShowStoreDetailsComponent,
    ShowStoreProfileDetailsComponent,
    ShowStoreProductDetailsComponent,
    StoreInfoComponent,
    ShowStoreDetailsTabComponent,
    DialogLatLongComponent,
    StorePropertiesComponent,
    StoreKeywordsComponent,
    StorePromotionalComponent,
    StoreDeliverySettingsComponent,
    StoreOperationComponent,
    StoreLayoutsComponent,
    StoreComplianceComponent,
    StoreProductsComponent,
    StoreOrdersComponent,
    StoreUsersComponent,
    StoreMediaComponent,
    AddNewQuicklinkComponent,
    AddStoreBannerComponent,
    StoreBannerListComponent,
    ShowStoreBannerComponent,
    AddComplianceFormComponent,
    PendingMerchantsComponent,
    RejectedMerchantsComponent,
    RegisterMercchantComponent,
    StoreBulkFileComponent,
    StoreFileUploadComponent,
    StoreFileDownloadComponent,
    RegisterBulkMerchantComponent,
    RegisterBulkMerchantGridComponent,
    EditLayoutPopupComponent,
    BulkInventoryPricingComponent,
    BulkPriceUploadComponent,
    CollectionBannerListComponent,
    AddCollectionBannerComponent,
    EditCollectionBannerComponent,
    StoreBulkUpdateComponent,
    DeactivatedMerchantsComponent,
    MasterToStoreProductPopupComponent,
    AddCategoryComponent,
    MerchantListComponent,
    MerchantInfoComponent,
    UsersInfoComponent,
    StoreListComponent,
    MerchantInfoTabComponent,
    AddComplianceMerchantComponent,
    HubListComponent,
    AddStoreUrlComponent,
    MerchantHubStoreToggleComponent,
    SubscriptionDialogComponent,
    MerchantToggleComponent,
    DeliveryManagementComponent,
    EditDeliveryPartnerComponent,
    MerchantOnlinePaymentToogleComponent,
    CopyPrductStoreBulkComponent,
    StoreUserRestPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    MerchantManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    CustomModule,
    NgbModule,
    MatStepperModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatListModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    NgxColorsModule,
    NgxMaterialTimepickerModule.setLocale('en-IN'),
    NgCircleProgressModule.forRoot({}),
    NgxDaterangepickerMd.forRoot(),
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    }),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyC0L4aWz6tMLmFj--LKx7gvw4kxPSRJUGo',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    NgxPaginationModule,
    TooltipModule,
    QueryBuilderModule,
    AceEditorModule,
    NgxQRCodeModule,
    ImageCropperModule,
  ],
  entryComponents: [
    DialogLatLongComponent, 
    AddNewQuicklinkComponent, 
    AddStoreBannerComponent,
    AddComplianceFormComponent, 
    StoreFileDownloadComponent,
    StoreFileUploadComponent, 
    EditLayoutPopupComponent, 
    BulkPriceUploadComponent, 
    StoreBulkUpdateComponent, 
    MasterToStoreProductPopupComponent,
    AddComplianceMerchantComponent
  ],
  providers: [AgGridOptions],
})
export class MerchantManagementModule { }