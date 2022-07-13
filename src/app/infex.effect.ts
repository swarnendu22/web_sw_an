import { ComponentEffects } from './layout/admin-layout/components/components.effect';
import { QueryManagmentEffects } from './layout/admin-layout/category-management/banner-management/query-management.effect';
import { BannerManagementEffects } from './layout/admin-layout/category-management/banner-management/banner-management.effect';
import { categoryEffects } from './layout/admin-layout/store-management/manage-categories/manageCategory.effect';
import { productAttributeEffects } from './layout/admin-layout/store-management/product-attribute/productAttribute.effect';
import { commissionEffects } from './layout/admin-layout/store-management/commission-management/commissionManagement.effect';
import { BrandManagementEffects } from './layout/admin-layout/category-management/manage-brands/manage-brand.effect';
import { ImgUploadAwsEffect } from './components/img-upload-aws/img-upload-aws.effect';
import { commissionExceptionEffects } from './layout/admin-layout/category-management/exception-management/exception-management.effect';
import { MerchantManagementEffects } from './layout/admin-layout/merchant-management/merchant-management.effect';
import { CatalogManagementEffects } from './layout/admin-layout/catalog-management/catalog-management.effect';
// import { affiliateManagementEffects } from './layout/admin-layout/affiliates-management/affiliate-management.effect';
import { fulfillmentEffects } from './layout/admin-layout/store-management/fulfillment-center/fulfillmentCenter.effects';
import { deliveryCenterEffects } from './layout/admin-layout/store-management/delivery-center/delivery-center.effects';
import { paymentMethodEffects } from './layout/admin-layout/store-management/payment-methods/payment-methods.effects';
import { regionsEffects } from './layout/admin-layout/store-management/region/regions.effects';
import { countriesEffects } from './layout/admin-layout/store-management/country/countries.effects';
import { logisticPartnerEffects } from './layout/admin-layout/store-management/logistic-partner/logistic-partner.effects';
import { appVersionEffects } from './layout/admin-layout/store-management/app-version-management/app-version.effects';
import { staticPageManagementEffects } from './layout/admin-layout/store-management/static-page-management/static-page-management.effects';
// import { OrderManagementSystemEffects } from './layout/admin-layout/order-management-system/order-management-system.effect';
import { ZipCodeManagementEffects } from './layout/admin-layout/store-management/zip-code-management/zip-code-management.effects';
// import { SellerOrderEffects } from './layout/admin-layout/seller-panel/seller-order/seller-order.effects';
import { sellerCatalogEffects } from './layout/admin-layout/seller-panel/seller-catalog/seller-catalog.effect';
import { IndentityVerificationEffects } from './layout/admin-layout/identity-verification/identity-verification.effect';
import { DeliveryBoyManagementEffects } from './layout/admin-layout/delivery-boy-management/delivery-boy-management.effect';
import { OrderManagementApaEffects } from './layout/admin-layout/order-management/order-management-apa.effect';
import { CouponManagementApaEffects } from './layout/admin-layout/coupon-management/coupon-management-apa.effect';
// import { collectionsEffects } from './layout/admin-layout/category-management/collections/collections.effects';
// import { CouponCodeEffects } from './layout/admin-layout/category-management/coupon-code/coupon-code.effect';
// import { ReturnCancelRequestManagementEffects } from './layout/admin-layout/return-cancel-management/return-cancel-request-management.effects';
// import { sellerAdminCatalogEffects } from './layout/admin-layout/catalog-management/manage-catalog/manage-catalog-admin.effect';
// import { CustomerManagementEffect } from './layout/admin-layout/customer-management/customer-management.effect';
// import { CartManagementEffects } from './layout/admin-layout/cart-management/cart-management.effect';
// import { supplyChainManagementEffects } from './layout/admin-layout/supply-chain-management/supply-chain-management.effect';
// import { sellerRequestEffects } from './layout/admin-layout/seller-request/seller-request.effect';
// import { financeManagementEffects } from './layout/admin-layout/finance-module/finance-module.effect';

export const IndexEffects = [
  categoryEffects,
  productAttributeEffects,
  commissionEffects,
  BrandManagementEffects,
  ImgUploadAwsEffect,
  commissionExceptionEffects,
  CatalogManagementEffects,
  MerchantManagementEffects,
  // affiliateManagementEffects,
  fulfillmentEffects,
  deliveryCenterEffects,
  paymentMethodEffects,
  regionsEffects,
  countriesEffects,
  logisticPartnerEffects,
  appVersionEffects,
  staticPageManagementEffects,
  // OrderManagementSystemEffects,
  ZipCodeManagementEffects,
  // SellerOrderEffects,
  sellerCatalogEffects,
  // collectionsEffects,
  BannerManagementEffects,
  QueryManagmentEffects,
  // CouponCodeEffects,
  ComponentEffects,
  IndentityVerificationEffects,
  DeliveryBoyManagementEffects,
  OrderManagementApaEffects,
  CouponManagementApaEffects
  // ReturnCancelRequestManagementEffects,
  // sellerAdminCatalogEffects,
  // CustomerManagementEffect,
  // CartManagementEffects,
  // supplyChainManagementEffects,
  // sellerRequestEffects,
  // financeManagementEffects,

];
