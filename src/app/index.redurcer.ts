import {
  categoryReducer,
  productAttributeReducer,
  parentCategoryReducer,
  commissionManagementReducer,
  generalReducer,
  storeManagementReducer,
  storeProductListReducer
} from './reducers/storemanagement.reducers';
import { brandReducer } from './reducers/brand-management.reducers';
import { componentsReducer } from './reducers/components.reducer';
import {
  commissionExceptionReducer,
  commissionGroupReducer,
  productExceptionReducer,
} from './reducers/commission-management.reducer';
import { sellerReducer } from './reducers/sellers-management.reducers';
import { merchantMgmtReducer } from './reducers/merchant-management.reducers';
import { catalogMgmtReducer, independentDropdownReducer, dynamicLoadingReducer, valueOnDynamicLoadingReducer, catalogFilesReducer, catalogFilesConfigurableReducer } from './reducers/catalog-management.reducer';
import { affiliateGroupReducer } from './reducers/affiliate-group-reducer';
import { orderManagementSystemReducer } from './reducers/order-management-system.reducer';
import { sellerOrderReducer } from './reducers/seller-order.reducer';
import { sellerCatalogReducer, sellerCatalogAdminReducer } from './reducers/seller-catalog-reducer';
import {
  collectionReducer,
  collectionByIdReducer,
} from './reducers/collections.reducers';
import { queryManagementReducer } from './reducers/query-management.reducers';
import { bannerManagementReducer } from './reducers/banner-mangement.reducer';
import { couponCodeReducer } from './reducers/coupon-code.reducer';
import { componentsLayoutReducer } from './reducers/componentsLayout.reducer';
import { returnCancelRequestReducer } from './reducers/return-cancel-request.reducers';
import { customerManagementReducer } from './reducers/customer-management.reducer';
import { cartMgmtReducer } from './reducers/cart-management.reducers';
import { supplyChainReducer } from './reducers/supply-chain-management.reducers';
import { sellerRequestReducer } from './reducers/seller-request.reducer';
import { manageFinanceReducer } from './reducers/finance-management.reducer';
import { identityVerificationReducer } from './reducers/identity-verification-reducer';
import { deliveryBoyMgmtReducer } from './reducers/delivery-boy-management.reducer';
import { orderManagementApaReducer } from './reducers/order-management-apa.reducer';

export const IndexReducer = {
  manageCategories: categoryReducer,
  productAttributes: productAttributeReducer,
  parentCategories: parentCategoryReducer,
  commissions: commissionManagementReducer,
  brands: brandReducer,
  components: componentsReducer,
  commissionsExceptions: commissionExceptionReducer,
  sellers: sellerReducer,
  merchantManagement: merchantMgmtReducer,
  commissionGroups: commissionGroupReducer,
  catalogMgmt: catalogMgmtReducer,
  independentDropdown: independentDropdownReducer,
  valueOfCatalogMgmt: dynamicLoadingReducer,
  valueOfValueCatalogMgmt: valueOnDynamicLoadingReducer,
  productExceptions: productExceptionReducer,
  affiliateGroups: affiliateGroupReducer,
  general: generalReducer,
  storeManagement: storeManagementReducer,
  orderManagementSystem: orderManagementSystemReducer,
  sellerOrder: sellerOrderReducer,
  sellerCatalog: sellerCatalogReducer,
  sellerCatalogAdmin: sellerCatalogAdminReducer,
  collections: collectionReducer,
  collectionById: collectionByIdReducer,
  queryManagement: queryManagementReducer,
  bannerManagement: bannerManagementReducer,
  couponCode: couponCodeReducer,
  componentsLayout: componentsLayoutReducer,
  returnCancelRequest: returnCancelRequestReducer,
  catalogFilesReducer: catalogFilesReducer,
  catalogFilesConfigurableReducer,
  customerManagement: customerManagementReducer,
  cartMgmt: cartMgmtReducer,
  supplyChainManagement: supplyChainReducer,
  sellerRequest: sellerRequestReducer,
  manageFinance: manageFinanceReducer,
  storeProductListReducer: storeProductListReducer,
  identityVerification: identityVerificationReducer,
  deliveryBoyManagement: deliveryBoyMgmtReducer,
  orderManagementApa: orderManagementApaReducer,
  // catalogFilesConfigurableReducer
};


export function clearState(reducer) {
  return function (state: any, action: any): any {
    if (action.type === 'RESET_STATE') {
      state = undefined;
    }
    return reducer(state, action);
  };
}




