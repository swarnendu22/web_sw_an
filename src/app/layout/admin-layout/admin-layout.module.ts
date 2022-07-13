import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { MaterialModule } from 'src/app/meterial-module';
import {MatChipsModule} from '@angular/material/chips';

// Admin Components
import { AdminLayoutComponent } from './admin-layout.component';
import { StoreManagementModule } from './store-management/store-management.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CellRendererButtonComponent } from './components/cell-renderer-button/cell-renderer-button.component';
import { CustomModule } from 'src/app/custom/custom.module';
import { PendingCellRendererButtonComponent } from './components/pending-cell-renderer-button/pending-cell-renderer-button.component';
import { UpdateCellRendererButtonComponent } from './components/update-cell-renderer-button/update-cell-renderer-button.component';
import { DeleteCellRendererButtonComponent } from './components/delete-cell-renderer-button/delete-cell-renderer-button.component';
import {
  UpdateAttributeSetCellRenderedBtnComponent,
  EditAttributeDialogComponent,
  ConfirmationDialogComponent,
} from './components/update-attribute-set-cell-rendered-btn/update-attribute-set-cell-rendered-btn.component';
import { CellRendererCopyButtonComponent } from './components/cell-renderer-copy-button/cell-renderer-copy-button.component';
import { MyFilterPipe } from './store-management/manage-categories/add-new-category/MyFilterPipe';
import { AgDatePickerComponent } from './components/ag-date-picker/ag-date-picker.component';
import { CellEditorValidateComponent } from './components/cell-editor-validate/cell-editor-validate.component';
import { PendingMerchantCellRendererButtonComponent } from './components/pending-merchant-cell-renderer-button/pending-merchant-cell-renderer-button.component';
import {
  CellRendererProductAttributePopupComponent,
  viewProductAttributeData,
} from './components/cell-renderer-product-attribute-popup/cell-renderer-product-attribute-popup.component';
import { addZip } from './store-management/zip-code-management/add-new-zone/add-new-zone.component';
import { CustomLoadingOverlayComponent } from './components/custom-loading-overlay/custom-loading-overlay.component';
import { CellRendererButtonWithCallbackComponent } from './components/cell-renderer-button-with-callback/cell-renderer-button-with-callback.component';
import { DisableOverlayComponent } from './components/disable-overlay/disable-overlay.component';
import { CellRendererViewDisableButtonComponent } from './components/cell-renderer-view-disable-button/cell-renderer-view-disable-button.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
// import { CellRendererDownloadInvoiceComponent } from './components/cell-renderer-download-invoice/cell-renderer-download-invoice.component';
// import { CellRendererOrderDetailsComponent } from './components/cell-renderer-order-details/cell-renderer-order-details.component';
// import { CellRendererDeliveredPackButtonComponent } from './components/cell-renderer-delivered-pack-button/cell-renderer-delivered-pack-button.component';
// import { ReturnOrderAdminComponent } from './order-management-system/popup-components/return-order-admin/return-order-admin.component';
// import { CellDownloadAdminButtonComponent } from './components/cell-renderer-download-admin-button/cell-renderer-download-admin-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ApproveORRejectCatalogBulkPendingComponent, CellRendererCatalogPendingBulkApproveComponent } from './components/cell-renderer-catalog-pending-bulkapprove/cell-renderer-catalog-pending-bulkapprove';
import { AgMatDateFilterComponent } from './components/ag-mat-date-filter/ag-mat-date-filter.component';
import { CellRendererPendingOrderButtonComponent } from './components/cell-renderer-pending-order-button/cell-renderer-pending-order-button.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { SelectCellRendererComponent } from './components/select-cell-renderer/select-cell-renderer.component';
import { CellRendererImagePreviewComponent, ImagePreviewPopipModalComponent } from './components/cell-renderer-image-preview/cell-renderer-image-preview.component';
import { CatalogViewFromNupcComponent } from './components/catalog-view-from-nupc/catalog-view-from-nupc.component';
import { CellRendererCatalogPendingBulkrejectComponent, RejectCatalogBulkPendingComponent } from './components/cell-renderer-catalog-pending-bulkreject/cell-renderer-catalog-pending-bulkreject.component';
import { CellRendererViewinstoreComponent } from './components/cell-renderer-viewinstore/cell-renderer-viewinstore.component';
import { CellRendererShowBulkMessageExceptionComponent } from './components/cell-renderer-show-bulk-message-exception/cell-renderer-show-bulk-message-exception.component';
// import { ReversePickupIntransitCompleteReasonComponent } from './supply-chain-management/popup-component/reverse-pickup-intransit-complete-reason/reverse-pickup-intransit-complete-reason.component';
// import { ReversePickupReturnCompleteReasonComponent } from './supply-chain-management/popup-component/reverse-pickup-return-complete-reason/reverse-pickup-return-complete-reason.component';
// import { CellRendererReversePickupIntransitPopupComponent } from './components/cell-renderer-reverse-pickup-intransit-popup/cell-renderer-reverse-pickup-intransit-popup.component';
// import { CellRendererMarkasRefundedButtonComponentComponent } from './components/cell-renderer-markas-refunded-button-component/cell-renderer-markas-refunded-button-component.component';
import { CellRendererChangeSizechartButtonComponent } from './components/cell-renderer-change-sizechart-button/cell-renderer-change-sizechart-button.component';
// import { CellRendererConvertToAgentComponent } from './components/cell-renderer-convert-to-agent/cell-renderer-convert-to-agent.component';
import { CellRendererImageHoverPreviewComponent, ImageHoverPreviewComponent } from './components/cell-renderer-image-hover-preview/cell-renderer-image-hover-preview.component';
import { CellRendererCategoryViewButtonComponent } from './components/cell-renderer-category-view-button/cell-renderer-category-view-button.component';
import { CollectionCellRendererUpdateOrDeleteComponent } from './components/collection-cell-renderer-update-or-delete/collection-cell-renderer-update-or-delete.component';
import { CollectionCellRendererRatingComponent } from './components/collection-cell-renderer-rating/collection-cell-renderer-rating.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NewBadgeCellRendererCollectionsComponent } from './components/new-badge-cell-renderer-collections/new-badge-cell-renderer-collections.component';
import { NewNadgeZoneZipcodeCellRendererComponent } from './components/new-nadge-zone-zipcode-cell-renderer/new-nadge-zone-zipcode-cell-renderer.component'
import { MatDialogRef } from '@angular/material/dialog';
import { MerchantManagecellActionButtonComponent } from './components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { GridLogoViewerComponent } from './merchant-management/grid-logo-viewer/grid-logo-viewer.component';
import { CellRendererShowComponent } from './components/cell-renderer-show/cell-renderer-show.component';
import { ManageDeliveryRequestActionComponent } from './components/manage-delivery-request-action/manage-delivery-request-action.component';
import { ManageDraftActionComponent } from './components/manage-draft-action/manage-draft-action.component';
import { CellRenderCheckboxComponent } from './components/cell-render-checkbox/cell-render-checkbox.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import { StoreFilterPopupComponent } from './merchant-management/store-filter-popup/store-filter-popup.component';
import { DeliveryRequestSearchComponent } from './merchant-management/delivery-request-search/delivery-request-search.component';
import { CellRendererDeliveryBoysComponent } from './components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
//import { DriverDetailsApproveRejectPopupComponent } from './components/driver-details-approve-reject-popup/driver-details-approve-reject-popup.component';
import { CellRendererDeliveryBoysOrderComponent } from './components/cell-renderer-delivery-boys-order/cell-renderer-delivery-boys-order.component';
//import { ManageIdentityVerificationComponent } from './identity-verification/manage-identity-verification/manage-identity-verification.component';
import { CellRendererIdentityVerificationComponent } from './components/cell-renderer-identity-verification/cell-renderer-identity-verification.component';
import { IdentityVerificationModalComponent } from './components/identity-verification-modal/identity-verification-modal.component';
import { CelRendererViewComplianceComponent } from './components/cel-renderer-view-compliance/cel-renderer-view-compliance.component';

import { CellRendererDeliveryBoyCancelPickupReasonsComponent } from './components/cell-renderer-delivery-boy-cancel-pickup-reasons/cell-renderer-delivery-boy-cancel-pickup-reasons.component';
import { CellRendererDeliveryBoyCancelPickupsComponent } from './components/cell-renderer-delivery-boy-cancel-pickups/cell-renderer-delivery-boy-cancel-pickups.component';
import { CellRendererViewStoreProductDetailComponent } from './components/cell-renderer-view-store-product-detail/cell-renderer-view-store-product-detail.component';
import { CellRendererSettlementDetailsComponent, ManualSettelmentForm } from './components/cell-renderer-settlement-details/cell-renderer-settlement-details.component'
import { MatListModule } from '@angular/material/list';
import { CellRendererOrderVsEarningComponent } from './components/cell-renderer-order-vs-earning/cell-renderer-order-vs-earning.component';
import { UpdateStoreProductComponent } from './merchant-management/update-store-product/update-store-product.component';
import { CellRendererBulkStoreActionButtonComponent } from './components/cell-renderer-bulk-store-action-button/cell-renderer-bulk-store-action-button.component';
import { CellRendererPrivateCategoriesTreeComponent } from './components/cell-renderer-private-categories-tree/cell-renderer-private-categories-tree.component';
import { ImageCropperPopupComponent } from './merchant-management/image-cropper-popup/image-cropper-popup.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CellRendererDeleteQuicklinkComponent } from './components/cell-renderer-delete-quicklink/cell-renderer-delete-quicklink.component';
import { CellRendererRescheduleButtonComponent } from './components/cell-renderer-reschedule-button/cell-renderer-reschedule-button.component';
import { CellRendererViewOrderDetailsApaComponent } from './components/cell-renderer-view-order-details-apa/cell-renderer-view-order-details-apa.component';
import { DeliveryBoyLogComponent } from './delivery-boy-management/components/delivery-boy-log/delivery-boy-log.component';
import { ChartsModule } from '../../../../node_modules/ng2-charts';
import { CountToModule } from '../../../../node_modules/angular-count-to';
import { CellRendererCategoryLogoComponent } from './components/cell-renderer-category-logo/cell-renderer-category-logo.component';
// import { ProductFilterPopupComponent } from './catalog-management/popup-component/product-filter/product-filter-popup.component';
import { CategoriesListSearchComponent } from './catalog-management/categories-list-search/categories-list-search.component';
import { AddCategoryBrandComponent } from './catalog-management/add-category-brand/add-category-brand.component';
import { AddBrandOwnerComponent } from './catalog-management/add-brand-owner/add-brand-owner.component';
import { CellRendererBrandApproveComponent } from './components/cell-renderer-brand-approve/cell-renderer-brand-approve.component';
import { CellRenderStoreTypeComponent } from './components/cell-render-store-type/cell-render-store-type.component';
import { CellRenderStoreViewComponent } from './components/cell-render-store-view/cell-render-store-view.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    DashboardComponent,
    CellRendererButtonComponent,
    PendingCellRendererButtonComponent,
    UpdateCellRendererButtonComponent,
    DeleteCellRendererButtonComponent,
    UpdateAttributeSetCellRenderedBtnComponent,
    CellRendererCopyButtonComponent,
    AgDatePickerComponent,
    CellEditorValidateComponent,
    PendingMerchantCellRendererButtonComponent,
    CellRendererProductAttributePopupComponent,
    viewProductAttributeData,
    CustomLoadingOverlayComponent,
    CellRendererButtonWithCallbackComponent,
    DisableOverlayComponent,
    CellRendererViewDisableButtonComponent,
    EditAttributeDialogComponent,
    SpinnerLoadingComponent,
    // CellRendererDownloadInvoiceComponent,
    // CellRendererOrderDetailsComponent,
    // CellRendererDeliveredPackButtonComponent,
    // ReturnOrderAdminComponent,
    // CellDownloadAdminButtonComponent,
    ConfirmationDialogComponent,
    ConfirmDialogComponent,
    ResetPasswordComponent,
    ApproveORRejectCatalogBulkPendingComponent,
    AgMatDateFilterComponent,
    CellRendererPendingOrderButtonComponent,
    MultiSelectComponent,
    SelectCellRendererComponent,
    CellRendererImagePreviewComponent,
    ImagePreviewPopipModalComponent,
    CatalogViewFromNupcComponent,
    CellRendererCatalogPendingBulkrejectComponent,
    CellRendererViewinstoreComponent,
    RejectCatalogBulkPendingComponent,
    CellRendererShowBulkMessageExceptionComponent,
    // ReversePickupIntransitCompleteReasonComponent,
    // ReversePickupReturnCompleteReasonComponent,
    // CellRendererMarkasRefundedButtonComponentComponent,
    CellRendererChangeSizechartButtonComponent,
    // CellRendererConvertToAgentComponent,
    CellRendererImageHoverPreviewComponent,
    ImageHoverPreviewComponent,
    CellRendererCategoryViewButtonComponent,
    CollectionCellRendererUpdateOrDeleteComponent,
    CollectionCellRendererRatingComponent,
    NewBadgeCellRendererCollectionsComponent,
    NewNadgeZoneZipcodeCellRendererComponent,
    MerchantManagecellActionButtonComponent,
    GridLogoViewerComponent,
    CellRendererShowComponent,
    ManageDeliveryRequestActionComponent,
    ManageDraftActionComponent,
    CellRenderCheckboxComponent,
    ConfirmationBoxComponent,
    StoreFilterPopupComponent,
    DeliveryRequestSearchComponent,
    CellRendererDeliveryBoysComponent,
    CellRendererDeliveryBoysOrderComponent,
    CellRendererIdentityVerificationComponent,
    IdentityVerificationModalComponent,
    CellRendererDeliveryBoyCancelPickupReasonsComponent,
    CellRendererDeliveryBoyCancelPickupsComponent,
    CelRendererViewComplianceComponent,
    CellRendererViewStoreProductDetailComponent,
    CellRendererOrderVsEarningComponent,
    UpdateStoreProductComponent,
    CellRendererCatalogPendingBulkApproveComponent,
    CellRendererBulkStoreActionButtonComponent,
    CellRendererBulkStoreActionButtonComponent,
    CellRendererPrivateCategoriesTreeComponent,
    CellRendererPrivateCategoriesTreeComponent,
    ImageCropperPopupComponent,
    CellRendererDeleteQuicklinkComponent,
    CellRendererRescheduleButtonComponent,
    CellRendererViewOrderDetailsApaComponent,
    DeliveryBoyLogComponent,
    CellRendererCategoryLogoComponent,
    // ProductFilterPopupComponent
    CategoriesListSearchComponent,
    AddCategoryBrandComponent,
    AddBrandOwnerComponent,
    CellRendererSettlementDetailsComponent,
    ManualSettelmentForm,
    CellRendererBrandApproveComponent,
    CellRenderStoreTypeComponent,
    CellRenderStoreViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AdminLayoutRoutingModule,
    MaterialModule,
    StoreManagementModule,
    CustomModule,
    NgxMatSelectSearchModule,
    OverlayModule,
    BarRatingModule,
    AgGridModule,
    MatListModule,
    ImageCropperModule,
    ChartsModule,
    CountToModule,
    MatChipsModule,
  ],
  entryComponents: [
    CellRendererButtonComponent,
    PendingCellRendererButtonComponent,
    UpdateCellRendererButtonComponent,
    DeleteCellRendererButtonComponent,
    UpdateAttributeSetCellRenderedBtnComponent,
    CellRendererCopyButtonComponent,
    AgDatePickerComponent,
    CellEditorValidateComponent,
    PendingMerchantCellRendererButtonComponent,
    CellRendererProductAttributePopupComponent,
    viewProductAttributeData,
    CustomLoadingOverlayComponent,
    CellRendererButtonWithCallbackComponent,
    DisableOverlayComponent,
    CellRendererViewDisableButtonComponent,
    EditAttributeDialogComponent,
    SpinnerLoadingComponent,
    // CellRendererDownloadInvoiceComponent,
    // CellRendererOrderDetailsComponent,
    // CellRendererDeliveredPackButtonComponent,
    // ReturnOrderAdminComponent,
    // CellDownloadAdminButtonComponent,
    ConfirmationDialogComponent,
    ConfirmDialogComponent,
    ApproveORRejectCatalogBulkPendingComponent,
    CellRendererImagePreviewComponent,
    ImagePreviewPopipModalComponent,
    CatalogViewFromNupcComponent,
    CellRendererCatalogPendingBulkrejectComponent,
    CellRendererViewinstoreComponent,
    RejectCatalogBulkPendingComponent,
    CellRendererShowBulkMessageExceptionComponent,
    // ReversePickupIntransitCompleteReasonComponent,
    // ReversePickupReturnCompleteReasonComponent,
    // CellRendererMarkasRefundedButtonComponentComponent,
    CellRendererChangeSizechartButtonComponent,
    // CellRendererConvertToAgentComponent,
    CellRendererImageHoverPreviewComponent,
    ImageHoverPreviewComponent,
    CellRendererCategoryViewButtonComponent,
    CollectionCellRendererUpdateOrDeleteComponent,
    CollectionCellRendererRatingComponent,
    NewBadgeCellRendererCollectionsComponent,
    NewNadgeZoneZipcodeCellRendererComponent,
    MerchantManagecellActionButtonComponent,
    GridLogoViewerComponent,
    CellRendererShowComponent,
    ManageDeliveryRequestActionComponent,
    ManageDraftActionComponent,
    CellRenderCheckboxComponent,
    ConfirmationBoxComponent,
    StoreFilterPopupComponent,
    DeliveryRequestSearchComponent,
    CellRendererDeliveryBoysComponent,
    CellRendererDeliveryBoysOrderComponent,
    CellRendererIdentityVerificationComponent,
    IdentityVerificationModalComponent,
    CellRendererDeliveryBoyCancelPickupReasonsComponent,
    CellRendererDeliveryBoyCancelPickupsComponent,
    CelRendererViewComplianceComponent,
    CellRendererViewStoreProductDetailComponent,
    CellRendererOrderVsEarningComponent,
    UpdateStoreProductComponent,
    CellRendererCatalogPendingBulkApproveComponent,
    CellRendererBulkStoreActionButtonComponent,
    CellRendererPrivateCategoriesTreeComponent,
    ImageCropperPopupComponent,
    CellRendererDeleteQuicklinkComponent,
    CellRendererRescheduleButtonComponent,
    CellRendererViewOrderDetailsApaComponent,
    DeliveryBoyLogComponent,
    CellRendererCategoryLogoComponent,
    CategoriesListSearchComponent,
    AddCategoryBrandComponent,
    AddBrandOwnerComponent,
    CellRendererSettlementDetailsComponent,
    ManualSettelmentForm,
    CellRendererBrandApproveComponent,
    // ProductFilterPopupComponent,
    CellRenderStoreTypeComponent,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
})



export class AdminLayoutModule { }
