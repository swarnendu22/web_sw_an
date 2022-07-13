import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  opened = false;

  toggleSidebar() {
    console.log('Admin Toggle',this.opened );
    this.opened = !this.opened;
  }

  currentSideMenu = [];


  sideMenuObj = {
    'Store Management': {
      icon: 'store',
      sidenavmenu: [
        {
          name: 'Manage Store Categories',
          icon: 'store',
          subLinks: [
            {
              name: 'Manage Categories',
              navLink: '/store/manage-categories',
            },
            {
              name: 'Pending Categories',
              navLink: '/store/manage-categories/pending-categories',
            },
          ],
        },
        {
          name: 'Manage Product Attributes',
          icon: 'local_mall',
          subLinks: [
            {
              name: 'Attribute Groups',
              navLink: '/store/product-attribute/attribute-group',
            },
            {
              name: 'Attribute Sets',
              navLink: '/store/product-attribute/attribute-set',
            },
            {
              name: 'Product Attributes',
              navLink: '/store/product-attribute',
            },
          ],
        },
        {
          name: 'Site Layouts',
          icon: 'dashboard',
          subLinks: [
            {
              name: 'Android Phone',
              navLink: '/store/site-layout/android-layout',
            },
            {
              name: 'IOS Phone',
              navLink: '/store/site-layout/ios-layout',
            },
            {
              name: 'Mobile Browser',
              navLink: '/store/site-layout/mobile-browser',
            },
          ],
        },
        {
          name: 'Affiliates Group Management',
          icon: 'group',
          parentNavLink: 'affiliatesGroupManagement',
          subLinks: [],
        },
        {
          name: 'Seller Group Management',
          icon: 'assignment_ind',
          parentNavLink: 'sellerGroupManagement',
          subLinks: [],
        },
        {
          name: 'Seller Commission Management',
          icon: 'assignment',
          subLinks: [
            {
              name: 'Commission Management',
              navLink: 'commissionManagement',
            },
            {
              name: 'Other Charges',
              navLink: 'otherCharges',
            },
            {
              name: 'Pending Commission',
              navLink: 'pendingCommission',
            },
          ],
        },
        {
          name: 'Fulfillment Center',
          icon: 'store_mall_directory',
          parentNavLink: 'fulfillmentCenter',
          subLinks: [],
        },
        {
          name: 'Delivery Center',
          icon: 'local_shipping',
          parentNavLink: 'deliveryCenter',
          subLinks: [],
        },
        {
          name: 'Payment Methods',
          icon: 'payment',
          parentNavLink: 'paymentMethods',
          subLinks: [],
        },
        {
          name: 'ZIP Code Management',
          icon: 'my_location',
          parentNavLink: 'zipCodeManagement',
          subLinks: [],
        },
        {
          name: 'Country',
          icon: 'map',
          parentNavLink: 'country',
          subLinks: [],
        },
        {
          name: 'Region',
          icon: 'person_pin_circle',
          parentNavLink: 'region',
          subLinks: [],
        },
        {
          name: 'Logistic Partner',
          icon: 'transfer_within_a_station',
          parentNavLink: 'logisticPartner',
          subLinks: [],
        },
        {
          name: 'App Version Management',
          icon: 'system_update',
          parentNavLink: 'appVersionManagement',
          subLinks: [],
        },
        {
          name: 'Static Page Management',
          icon: 'pages',
          parentNavLink: 'staticPageManagement',
          subLinks: [],
        },
      ],
    },
    'Category Management': {
      icon: 'pages',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'categoryDashboard',
          subLinks: [],
        },
        {
          name: 'Manage Brands',
          icon: 'style',
          subLinks: [
            {
              name: 'Active Brands',
              navLink: 'activeBrand',
            },
            {
              name: 'In-active Brands',
              navLink: 'inActiveBrand',
            },
            {
              name: 'Pending Brands',
              navLink: 'pendingBrand',
            },
          ],
        },
        {
          name: 'Collections',
          icon: 'collections_bookmark',
          subLinks: [
            {
              name: 'Create New Collections',
              navLink: 'createNewCollections',
            },
            {
              name: 'Active Collection',
              navLink: 'activeCollection',
            },
            {
              name: 'In-active Collections',
              navLink: 'inActiveCollections',
            },
          ],
        },
        {
          name: 'Banner Management',
          icon: 'view_carousel',
          subLinks: [
            {
              name: 'New Banner',
              navLink: 'newBanner',
            },
            {
              name: 'Active Banners',
              navLink: 'activeBanner',
            },
            {
              name: 'In-active Banners',
              navLink: 'inActivebanner',
            },
          ],
        },
        {
          name: 'Exception Management',
          icon: 'error',
          subLinks: [
            {
              name: 'Commission Exception',
              navLink: 'commissionException',
            },
            {
              name: 'Product Exception',
              navLink: 'productException',
            },
            {
              name: 'Pending Exception',
              navLink: 'pendingException',
            },
          ],
        },
        {
          name: 'Competitor Analysis',
          icon: 'compare',
          parentNavLink: 'competitorAnalysis',
          subLinks: [],
        },
        {
          name: 'Brand Gap Analysis',
          icon: 'pie_chart',
          parentNavLink: 'brandGapAnalysis',
          subLinks: [],
        },
      ],
    },
    'Merchant Management': {
      icon: 'person_pin',
      sidenavmenu: [
        {
          name: 'Create New Merchant',
          icon: 'group_add',
          parentNavLink: 'createNewMerchant',
          subLinks: [],
        },
        {
          name: 'Active Merchants',
          icon: 'check_circle',
          parentNavLink: 'activeMerchants',
          subLinks: [],
        },
        {
          name: 'In-active Merchants',
          icon: 'cancel',
          parentNavLink: 'inActiveMerchants',
          subLinks: [],
        },
        {
          name: 'De-listed Merchants',
          icon: 'person_add_disabled',
          parentNavLink: 'delistedMerchants',
          subLinks: [],
        },
        {
          name: 'Pending Merchants',
          icon: 'timelapse',
          parentNavLink: 'pendingMerchants',
          subLinks: [],
        },
      ],
    },
    'Affiliates Management': {
      icon: 'person',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'affiliatesDashboard',
          subLinks: [],
        },
        {
          name: 'Master Distributors',
          icon: 'person',
          parentNavLink: 'masterDistributors',
          subLinks: [],
        },
        {
          name: 'Create New Affiliate',
          icon: 'perm_contact_calendar',
          parentNavLink: 'createNewAffiliate',
          subLinks: [],
        },
        {
          name: 'Active Affiliates',
          icon: 'check_circle',
          parentNavLink: 'activeAffiliates',
          subLinks: [],
        },
        {
          name: 'In-active Affiliates',
          icon: 'cancel',
          parentNavLink: 'inActiveAffiliates',
          subLinks: [],
        },
        {
          name: 'Pending Affiliates',
          icon: 'timelapse',
          parentNavLink: 'pendingAffiliates',
          subLinks: [],
        },
      ],
    },
    'Catalog Management': {
      icon: 'import_contacts',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'catalogDashboard',
          subLinks: [],
        },
        {
          name: 'Create New Master Catalog',
          icon: 'library_books',
          parentNavLink: 'createNewMasterCatalog',
          subLinks: [],
        },
        {
          name: 'Manage Master Catalog',
          icon: 'book',
          parentNavLink: 'manageMasterCatalog',
          subLinks: [],
        },
        {
          name: 'In-active Catalog',
          icon: 'cancel',
          parentNavLink: 'inActiveCatalog',
          subLinks: [],
        },
        {
          name: 'No Seller Catalog',
          icon: 'assignment_late',
          parentNavLink: 'noSellerCatalog',
          subLinks: [],
        },
        {
          name: 'Pending Catalogs',
          icon: 'timelapse',
          parentNavLink: 'pendingCatalogs',
          subLinks: [],
        },
      ],
    },
    'Catalog Correction': {
      icon: 'bookmarks',
      sidenavmenu: [
        {
          name: 'Correct Dimension',
          icon: 'open_with',
          parentNavLink: 'correctDimension',
          subLinks: [],
        },
        {
          name: 'Correct MRP & Price',
          icon: 'settings_applications',
          parentNavLink: 'correctPrice',
          subLinks: [],
        },
        {
          name: 'Product Relevance',
          icon: 'perm_media',
          parentNavLink: 'productRelevance',
          subLinks: [],
        },
        {
          name: 'Product Tag',
          icon: 'local_offer',
          parentNavLink: 'productTag',
          subLinks: [],
        },
        {
          name: 'Pending Correction',
          icon: 'timelapse',
          parentNavLink: 'pendingCorrection',
          subLinks: [],
        },
      ],
    },
    'Seller Request': {
      icon: 'question_answer',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'sellerRequestDashboard',
          subLinks: [],
        },
        {
          name: 'Pending New Brand',
          icon: 'branding_watermark',
          parentNavLink: 'pendingNewBrand',
          subLinks: [],
        },
        {
          name: 'Product Relevance',
          icon: 'perm_media',
          parentNavLink: 'requestProductRelevance',
          subLinks: [],
        },
        {
          name: 'Pending New Category',
          icon: 'timelapse',
          parentNavLink: 'pendingNewCategory',
          subLinks: [],
        },
        {
          name: 'Pending New Catalog',
          icon: 'import_contacts',
          parentNavLink: 'pendingNewCatalog',
          subLinks: [],
        },
        {
          name: 'Pending Catalog Link',
          icon: 'link',
          parentNavLink: 'pendingCatalogLink',
          subLinks: [],
        },
        {
          name: 'Pending Price Correction',
          icon: 'exposure',
          parentNavLink: 'pendingPriceCorrection',
          subLinks: [],
        },
        {
          name: 'Pending Dimension Correction',
          icon: 'photo_size_select_small',
          parentNavLink: 'pendingDimensionCorrection',
          subLinks: [],
        },
        {
          name: 'Pending Tax Correction',
          icon: 'poll',
          parentNavLink: 'pendingTaxCorrection',
          subLinks: [],
        },
        {
          name: 'Pending Tax Class/Rate Correction',
          icon: 'timeline',
          parentNavLink: 'pendingTaxRateCorrection',
          subLinks: [],
        },
        {
          name: 'Pending Product Dispute',
          icon: 'error',
          parentNavLink: 'pendingProductDispute',
          subLinks: [],
        },
        {
          name: 'Pending Product Image Correction',
          icon: 'photo',
          parentNavLink: 'pendingProductImageCorrection',
          subLinks: [],
        },
        {
          name: 'Pending NSP Dispute',
          icon: 'rate_review',
          parentNavLink: 'pendingNspDispute',
          subLinks: [],
        },
        {
          name: 'Pending Holiday Calendar',
          icon: 'beach_access',
          parentNavLink: 'pendingHolidayCalendar',
          subLinks: [],
        },
      ],
    },
    'Order Management System': {
      icon: 'view_agenda',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'omsDashboard',
          subLinks: [],
        },
        {
          name: 'New Orders',
          icon: 'assignment_turned_in',
          parentNavLink: 'newOrders',
          subLinks: [],
        },
        {
          name: 'Open Orders',
          icon: 'open_in_browser',
          parentNavLink: 'openOrders',
          subLinks: [],
        },
        {
          name: 'Invoiced Orders',
          icon: 'receipt',
          parentNavLink: 'invoicedOrders',
          subLinks: [],
        },
        {
          name: 'Under Fulfillment',
          icon: 'camera_rear',
          parentNavLink: 'underFulfillment',
          subLinks: [],
        },
        {
          name: 'Completed Orders',
          icon: 'check_circle',
          parentNavLink: 'completedOrders',
          subLinks: [],
        },
        {
          name: 'Un-successful Orders',
          icon: 'cancel',
          parentNavLink: 'unSuccessfulOrders',
          subLinks: [],
        },
      ],
    },
    'Supply Chain Management': {
      icon: 'view_day',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'scmDashboard',
          subLinks: [],
        },
        {
          name: 'Open Pack',
          icon: 'open_in_browser',
          parentNavLink: 'openPack',
          subLinks: [],
        },
        {
          name: 'Manifested Pack',
          icon: 'markunread_mailbox',
          parentNavLink: 'manifestedPack',
          subLinks: [],
        },
        {
          name: 'In-transit Pack',
          icon: 'motorcycle',
          parentNavLink: 'inTransitPack',
          subLinks: [],
        },
        {
          name: 'Delivered Pack',
          icon: 'check_circle',
          parentNavLink: 'deliveredPack',
          subLinks: [],
        },
        {
          name: 'Seller Disputed Pack',
          icon: 'info',
          parentNavLink: 'sellerDisputedPack',
          subLinks: [],
        },
        {
          name: 'RTO Pack',
          icon: 'branding_watermark',
          parentNavLink: 'rtoPack',
          subLinks: [],
        },
        {
          name: 'RTO Transit',
          icon: 'featured_video',
          parentNavLink: 'rtoTransit',
          subLinks: [],
        },
        {
          name: 'RTO Complete',
          icon: 'featured_play_list',
          parentNavLink: 'rtoComplete',
          subLinks: [],
        },
        {
          name: 'Reverse Pickup ',
          icon: 'repeat',
          parentNavLink: 'reversePickup',
          subLinks: [],
        },
        {
          name: 'Dimension Dispute with Logistic',
          icon: 'warning',
          parentNavLink: 'dimensionDisputeWithLogistic',
          subLinks: [],
        },
        {
          name: 'Delivery Charge Dispute with Logistic',
          icon: 'local_shipping',
          parentNavLink: 'deliveryChargeDisputeWithLogistic',
          subLinks: [],
        },
        {
          name: 'Dimension Correction',
          icon: 'photo_size_select_small',
          parentNavLink: 'dimensionCorrection',
          subLinks: [],
        },
        {
          name: 'PIN Code Management',
          icon: 'my_location',
          parentNavLink: 'pinCodeManagement',
          subLinks: [],
        },
      ],
    },
    'Return Cancel Management': {
      icon: 'subdirectory_arrow_left',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'rcmDashboard',
          subLinks: [],
        },
        {
          name: 'Cancel Order Request',
          icon: 'chat_bubble',
          parentNavLink: 'cancelOrderRequest',
          subLinks: [],
        },
        {
          name: 'Return Order Request',
          icon: 'forum',
          parentNavLink: 'returnOrderRequest',
          subLinks: [],
        },
        {
          name: 'Refund Order Request',
          icon: 'message',
          parentNavLink: 'refundOrderRequest',
          subLinks: [],
        },
        {
          name: 'Cancelled Order',
          icon: 'cancel',
          parentNavLink: 'cancelledOrder',
          subLinks: [],
        },
        {
          name: 'Returned Order',
          icon: 'keyboard_return',
          parentNavLink: 'returnedOrder',
          subLinks: [],
        },
        {
          name: 'Refund Order',
          icon: 'vertical_align_top',
          parentNavLink: 'refundOrder',
          subLinks: [],
        },
      ],
    },
    'Finance Module': {
      icon: 'monetization_on',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'financeDashboard',
          subLinks: [],
        },
        {
          name: 'Seller Payment',
          icon: 'assignment_ind',
          subLinks: [
            {
              name: 'Pending Seller Payment',
              navLink: 'pendingSellerPayment',
            },
            {
              name: 'Seller Payment Due',
              navLink: 'sellerPaymentDue',
            },
            {
              name: 'Seller Payment Complete',
              navLink: 'sellerPaymentComplete',
            },
            {
              name: 'Seller Payment Dispute',
              navLink: 'sellerPaymentDispute',
            },
          ],
        },
        {
          name: 'Affiliate Payments',
          icon: 'group',
          subLinks: [
            {
              name: 'Pending Affiliate Payment',
              navLink: 'pendingAffiliatePayment',
            },
            {
              name: 'Affiliate Payment Due',
              navLink: 'affiliatePaymentDue',
            },
            {
              name: 'Affiliate Payment Complete',
              navLink: 'affiliatePaymentComplete',
            },
            {
              name: 'Affiliate Payment Dispute',
              navLink: 'affiliatePaymentDispute',
            },
          ],
        },
        {
          name: 'Offline Top-up',
          icon: 'signal_cellular_off',
          subLinks: [
            {
              name: 'Pending Offline Top-up',
              navLink: 'pendingOfflineTopup',
            },
            {
              name: 'Reconciled Payment',
              navLink: 'offlineReconciledPayment',
            },
            {
              name: 'Un-reconciled Payment',
              navLink: 'offlineUnReconciledPayment',
            },
            {
              name: 'Dispute Payment',
              navLink: 'disputePayment',
            },
          ],
        },
        {
          name: 'Payment Gateway',
          icon: 'credit_card',
          subLinks: [
            {
              name: 'Pending Reconciliation',
              navLink: 'gatewayPendingReconciliation',
            },
            {
              name: 'Reconciled Payment',
              navLink: 'gatewayReconciledPayment',
            },
            {
              name: 'Un-reconciled Payment',
              navLink: 'gatewayUnReconciledPayment',
            },
            {
              name: 'Fraud Transactions',
              navLink: 'gatewayFraudTransactions',
            },
          ],
        },
        {
          name: 'NDH Wallet Payment',
          icon: 'folder',
          subLinks: [
            {
              name: 'Pending Reconciliation',
              navLink: 'walletPendingReconciliation',
            },
            {
              name: 'Reconciled Payment',
              navLink: 'walletReconciledPayment',
            },
            {
              name: 'Un-reconciled Payment',
              navLink: 'walletUnReconciledPayment',
            },
            {
              name: 'Fraud Transactions',
              navLink: 'walletFraudTransactions',
            },
          ],
        },
        {
          name: 'COD Payment',
          icon: 'transfer_within_a_station',
          subLinks: [
            {
              name: 'Pending Reconciliation',
              navLink: 'codPendingReconciliation',
            },
            {
              name: 'Reconciled Payment',
              navLink: 'codReconciledPayment',
            },
            {
              name: 'Un-reconciled Payment',
              navLink: 'codUnReconciledPayment',
            },
          ],
        },
        {
          name: 'Customer Refund',
          icon: 'vertical_align_top',
          subLinks: [
            {
              name: 'Pending Refund',
              navLink: 'pendingRefund',
            },
            {
              name: 'Refund Initiated',
              navLink: 'refundInitiated',
            },
            {
              name: 'Refund Reconciled',
              navLink: 'refundReconciled',
            },
            {
              name: 'Un-Reconciled Refund',
              navLink: 'unReconciledRefund',
            },
          ],
        },
      ],
    },
    'Customer Management': {
      icon: 'group',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'customerDashboard',
          subLinks: [],
        },
        {
          name: 'Active Customers',
          icon: 'person',
          parentNavLink: 'activeCustomers',
          subLinks: [],
        },
        {
          name: 'In-active Customers',
          icon: 'perm_contact_calendar',
          parentNavLink: 'inActiveCustomers',
          subLinks: [],
        },
        {
          name: 'Blocked Customers',
          icon: 'block',
          parentNavLink: 'blockedCustomers',
          subLinks: [],
        },
      ],
    },
    'Cart Management': {
      icon: 'shopping_cart',
      sidenavmenu: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          parentNavLink: 'cartDashboard',
          subLinks: [],
        },
        {
          name: 'Active Carts',
          icon: 'shopping_cart',
          parentNavLink: 'activeCarts',
          subLinks: [],
        },
        {
          name: 'Abandon Carts',
          icon: 'report_off',
          parentNavLink: 'abandonCarts',
          subLinks: [],
        },
        {
          name: 'Completed Carts',
          icon: 'check_circle',
          parentNavLink: 'completedCarts',
          subLinks: [],
        },
      ],
    },
    'Campaign Management': {
      icon: 'headset_mic',
      sidenavmenu: [
        {
          name: 'Create New Notification',
          icon: 'notifications',
          parentNavLink: 'createNewNotification',
          subLinks: [],
        },
        {
          name: 'Current Running Notification',
          icon: 'notifications_active',
          parentNavLink: 'currentRunningNotification',
          subLinks: [],
        },
        {
          name: 'Completed Notification',
          icon: 'notifications_paused',
          parentNavLink: 'completedNotification',
          subLinks: [],
        },
      ],
    },
    'Loyalty Management': {
      icon: 'loyalty',
      sidenavmenu: [
        {
          name: 'Promo Code',
          icon: 'label',
          subLinks: [
            {
              name: 'Create New Promo Code',
              navLink: 'createNewPromoCode',
            },
            {
              name: 'Active Promo Codes',
              navLink: 'activePromoCodes',
            },
            {
              name: 'Un-used Promo Code',
              navLink: 'unUsedPromoCode',
            },
            {
              name: 'In-active Promo Codes',
              navLink: 'inActivePromoCodes',
            },
          ],
        },
        {
          name: 'Rewards',
          icon: 'stars',
          subLinks: [
            {
              name: 'Create New',
              navLink: 'createNewRewards',
            },
            {
              name: 'Active Rewards Program',
              navLink: 'activeRewardsProgram',
            },
            {
              name: 'In-Active Rewards',
              navLink: 'inActiveRewards',
            },
            {
              name: 'Reward Point Management',
              navLink: 'rewardPointManagement',
            },
          ],
        },
        {
          name: 'Vouchers',
          icon: 'loyalty',
          subLinks: [
            {
              name: 'Create New',
              navLink: 'createNewVouchers',
            },
            {
              name: 'Active Vouchers',
              navLink: 'activeVouchers',
            },
            {
              name: 'Used Vouchers',
              navLink: 'usedVouchers',
            },
            {
              name: 'In-Active Vouchers',
              navLink: 'inActiveVouchers',
            },
          ],
        },
        {
          name: 'Membership Programme',
          icon: 'card_membership',
          subLinks: [
            {
              name: 'Active Members',
              navLink: 'activeMembers',
            },
            {
              name: 'Member Pointss',
              navLink: 'memberPoints',
            },
          ],
        },
        {
          name: 'Referral Programme',
          icon: 'share',
          subLinks: [
            {
              name: 'Create New',
              navLink: 'createNewReferral',
            },
          ],
        },
      ],
    },
  };
  sideMenuObjKeys = Object.keys(this.sideMenuObj);
}
