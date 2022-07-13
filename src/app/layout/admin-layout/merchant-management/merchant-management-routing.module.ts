import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDeliveryRequestComponent } from './manage-delivery-request/manage-delivery-request.component';
import { DisplayManageDeliveryRequestComponent } from './display-manage-delivery-request/display-manage-delivery-request.component';
import { ManageMerchentsComponent } from './manage-merchents/manage-merchents.component';
import { ManageDraftComponent } from './manage-draft/manage-draft.component';
import { ShowDraftDetailsComponent } from './show-draft-details/show-draft-details.component';
import { ApproveStoreDraftComponent } from './approve-store-draft/approve-store-draft.component';
import { ApproveStoreComponent } from './approve-store/approve-store.component';
import { ManageStoreAssignComponent } from './manage-store-assign/manage-store-assign.component';
import { ShowStoreDetailsTabComponent } from './show-store-details-tab/show-store-details-tab.component';
import { StoreBannerListComponent } from './store-promotional/store-banner-list/store-banner-list.component';
import { AddStoreBannerComponent } from './add-store-banner/add-store-banner.component';
import { ShowStoreBannerComponent } from './show-store-banner/show-store-banner.component';
import { PendingMerchantsComponent } from './pending-merchants/pending-merchants.component';
import { RejectedMerchantsComponent } from './rejected-merchants/rejected-merchants.component';
import { RegisterMercchantComponent } from './register-mercchant/register-mercchant.component';
import { RegisterBulkMerchantComponent } from './register-bulk-merchant/register-bulk-merchant.component';
import { RegisterBulkMerchantGridComponent } from './register-bulk-merchant-grid/register-bulk-merchant-grid.component';
import { CreateNewMerchantComponent } from './create-new-merchant/create-new-merchant.component';
import { CollectionBannerListComponent } from './collection-banner-list/collection-banner-list.component';
import { AddCollectionBannerComponent } from './add-collection-banner/add-collection-banner.component';
import { EditCollectionBannerComponent } from './edit-collection-banner/edit-collection-banner.component';
import { DeactivatedMerchantsComponent } from './deactivated-merchants/deactivated-merchants.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantInfoTabComponent } from './merchant-info-tab/merchant-info-tab.component';

const routes: Routes = [
  {
    path: 'merchant-list',
    component: MerchantListComponent
  },
  {
    path: 'merchant-info/:id',
    component: MerchantInfoTabComponent
  },
  {
    path: 'hub-list/:id',
    component: MerchantInfoTabComponent
  },
  {
    path: 'store-list/:id',
    component: MerchantInfoTabComponent
  },
  {
    path: 'user-info/:id',
    component: MerchantInfoTabComponent
  },
  {
    path: 'manage-active-merchant',
    component: ManageMerchentsComponent
  },
  {
    path: 'manage-pending-merchant',
    component: PendingMerchantsComponent
  },
  {
    path: 'manage-rejected-merchant',
    component: RejectedMerchantsComponent
  },
  {
    path: 'manage-deactivated-merchant',
    component: DeactivatedMerchantsComponent
  },
  {
    path: 'delivery-request',
    component: ManageDeliveryRequestComponent
  },
  {
    path: 'create-new-merchant',
    component: CreateNewMerchantComponent
  },
  {
    path: 'manage-store/show/:storeId/:latitude/:longitude',
    component: ShowStoreDetailsTabComponent
  },
  {
    path: 'manage-active-merchant/show/:storeId/:latitude/:longitude',
    component: ShowStoreDetailsTabComponent
  },
  {
    path: 'manage-pending-merchant/show/:storeId/:latitude/:longitude',
    component: ShowStoreDetailsTabComponent
  },
  {
    path: 'manage-rejected-merchant/show/:storeId/:latitude/:longitude',
    component: ShowStoreDetailsTabComponent
  },
  {
    path: 'delivery-request/show/:id',
    component: DisplayManageDeliveryRequestComponent
  },
  {
    path: 'manage-draft',
    component: ManageDraftComponent
  },
  {
    path: 'manage-draft/show/:requestData',
    component: ShowDraftDetailsComponent
  },
  {
    path: "approvedraft",
    component: ApproveStoreDraftComponent
  }
  ,
  {
    path: "approveStore",
    component: ApproveStoreComponent
  },
  {
    path: "storeassign",
    component: ManageStoreAssignComponent
  },
  {
    path: 'banner-management',
    component: StoreBannerListComponent
  },
  {
    path: 'banner-management/add-new/:bannerType',
    component: AddStoreBannerComponent
  },
  {
    path: 'banner-management/show/:id',
    component: ShowStoreBannerComponent
  },
  {
    path: 'register-store/:merchantId',
    component: RegisterMercchantComponent
  },
  {
    path: 'register-bulk-merchant',
    component: RegisterBulkMerchantComponent
  },
  {
    path: 'register-bulk-merchant-grid',
    component: RegisterBulkMerchantGridComponent
  },
  {
    path: 'collection-banner',
    component: CollectionBannerListComponent
  },
  {
    path: 'add-collection-banner',
    component: AddCollectionBannerComponent
  },
  {
    path: 'edit-collection-banner/:id',
    component: EditCollectionBannerComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantManagementRoutingModule { }