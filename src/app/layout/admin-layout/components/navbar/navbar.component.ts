import { AuthenticationService } from './../../../auth-layout/services/_authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetUserMenu, ActionTypes } from '../../../../actions/seller-catalog-action';
import { ResetAllStore } from 'src/app/actions/storeManagement.action';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '../../../../../environments/environment';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  allMenuLinks = [];
  opened: boolean = true;
  toggleSlide: boolean = false;

  title = 'ndh-admin';
  allLinks = [];
  isExpanded = false;
  userMenu = null;
  adminNavMenu: any = [];
  currentSideMenu = [];
  @Output() toggleSidebar = new EventEmitter();
  expandEvent() {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebar.emit(this.isExpanded);
  }

  changecolor: boolean = false;
  hideToolbar: boolean = false;
  moduleName: string = '';
  event = null;
  userStatus = '';
  userName = 'Guest User';
  clickEvent() {
    this.changecolor = !this.changecolor;
  }

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private store: Store<any>,
    private ngxService: NgxUiLoaderService,
    private apiMessageService: ApiMessageService
  ) {
    this.adminNavMenu = JSON.parse(localStorage.getItem('adminNavMenu'));
    this.authService.currentUser.subscribe(res => {
      this.userStatus = res;
      // if (this.userStatus === 'ADMIN') {
      this.userName = localStorage.getItem('ndh-admin-user-id');

      // }
    });
    //this.store.dispatch(new GetUserMenu());
  }

  // expandMainMenuEvent(length){
  //   console.log(length);
  //   if(length==0){
  //     this.isExpanded=!this.isExpanded;
  //     this.toggleSidebar.emit(this.isExpanded);
  //   }
  // }

  ngOnInit() {
    if (this.adminNavMenu) {
      this.sideMenuObj = {};
      this.allLinks = [];
      this.currentSideMenu = [];
      this.userMenu = this.adminNavMenu;
      this.setMenu();
      for (var key in this.sideMenuObj) {
        this.allLinks.push(this.sideMenuObj[key]['mainLink']);
      }
      this.redirectModules();
    } else {
      this.store.pipe(select('sellerCatalog')).subscribe(res => {
        this.sideMenuObj = {};
        this.allLinks = [];
        this.currentSideMenu = [];
        if (res.userMenu) {
          this.userMenu = res.userMenu;
          console.log('res.userMenu', res.userMenu);
          this.setMenu();
          for (var key in this.sideMenuObj) {
            this.allLinks.push(this.sideMenuObj[key]['mainLink']);
          }
          this.redirectModules();

          // console.log(this.allLinks);

        }
      });


      this.router.events.subscribe(event => {
        this.event = event;
        if (event instanceof NavigationEnd) {
          if (event.url === '/') {
            this.hideToolbar = true;
          } else {
            this.hideToolbar = false;
            if (event.url !== '/auth/login') {
              localStorage.setItem('moduleFlow', event.url);
            }
          }
        }
      });
    }
    
    this.selectedSubmenu = sessionStorage.getItem("selectedMenu");
    this.selectedMenuIndex = +sessionStorage.getItem("selectedMainMenu");
  }

  setMenu() {

    if (this.userMenu) {
      this.userMenu['payload'].forEach((element, i) => {

        this.sideMenuObj[element.module] = {};

        this.sideMenuObj[element.module]['icon'] = element.icon;
        this.sideMenuObj[element.module]['mainLink'] = element.link;
        this.sideMenuObj[element.module]['sidenavmenu'] = [];
        element.menus.forEach((e, l) => {
          let sidenavmenu = {
            icon: '',
            subMenuName: '',
            link: '',
            separator: '',
          }

          sidenavmenu.icon = e.icon;
          sidenavmenu.subMenuName = e.subMenu.subMenuName;
          sidenavmenu.link = e.subMenu.link;
          sidenavmenu.separator = e.subMenu.separator;
          this.sideMenuObj[element.module]['sidenavmenu'].push(sidenavmenu);
          this.sideMenuObj[element.module]['sidenavmenu'][l]['subLinks'] = [];

          if (typeof e.subMenu.subMenuList != "undefined" && e.subMenu.subMenuList != null && e.subMenu.subMenuList.length > 0) {
            e.subMenu.subMenuList.forEach(j => {

              let submenuobj = {
                name: '',
                navLink: '',
              }

              submenuobj.name = j.subMenuName;
              submenuobj.navLink = j.link;
              this.sideMenuObj[element.module]['sidenavmenu'][l]['subLinks'].push(submenuobj);
            });
          }
        });
      });
    }
    this.sideMenuObjKeys = Object.keys(this.sideMenuObj);
    //console.log('sideMenuObjKeys', this.sideMenuObjKeys);
    //console.log('sideMenuObj', this.sideMenuObj);
  }

  logout() {
    localStorage.removeItem('ndh-admin-auth-token');
    this.store.dispatch(new ResetAllStore());
    localStorage.removeItem('adminNavMenu');
    this.router.navigate(['auth/login']);
  }
  routeMethod(link) {
    if (link == '/store/manage-categories?pos=true') {
      this.router.navigate(['/store/manage-categories']);
    } else if (link == '/store/manage-categories?pos=false') {
      this.router.navigate(['/store/manage-categories']);
    }
    else if (link == '/store/manage-categories') {
      this.router.navigate(['/store/manage-categories']);
    }
    else {
      this.router.navigate([link]);
      //this.router.navigateByUrl(link, { skipLocationChange: true });
    }
  }
  routeSingleMenu(sideMenu) {
    console.log('function');
    if (sideMenu.subLinks.length === 0) {
      console.log('called first');

      if (sideMenu.link != '/store/manage-categories') {
        console.log('called');
        this.router.navigate([sideMenu.link]);
      }
    } else {
      console.log('called else');
      // this.router.navigate([]);
    }
  }
  redirectModules() {
    if (localStorage.getItem('moduleFlow')) {

      const urlsArr = localStorage.getItem('moduleFlow').split('/');

      urlsArr.splice(0, 1);
      const indexItem = this.allLinks.findIndex(i => i == urlsArr[0]);

      if (indexItem >= 0) {
        this.moduleName = this.sideMenuObjKeys[indexItem];
        this.currentSideMenu = this.sideMenuObj[this.moduleName].sidenavmenu;
      }
      else {
        this.moduleName = this.sideMenuObjKeys[0];
        this.currentSideMenu = this.sideMenuObj[this.moduleName].sidenavmenu;
      }
    }
  }

  currentApplicationVersion = environment.version;

  sideMenuObj = {
  };

  resetMenu(){ 
    this.store.dispatch(new GetUserMenu());
    this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ==  ActionTypes.getUserMenu ) {
          let newLocalStorageData = JSON.stringify( data.payload );
          localStorage.setItem('adminNavMenu', newLocalStorageData );
          location.reload();        
      }
    });
  }

  toggle(){    
    this.toggleSlide = !(this.toggleSlide);
  }
  
  selectedSubmenu: string = "";
  selectedMenuIndex: number;
  getSubMenu( subMenuName, index: number ) {
    this.selectedMenuIndex = index;
    this.selectedSubmenu = subMenuName;
    sessionStorage.setItem("selectedMenu", subMenuName );
    sessionStorage.setItem("selectedMainMenu", index.toString() );
  }



  // sideMenuObj = {
  //   'Store Management': {
  //     icon: 'store',
  //     mainLink: 'store',
  //     sidenavmenu: [
  //       {
  //         name: 'Manage Store Categories',
  //         icon: 'store',

  //         subLinks: [
  //           {
  //             name: 'Manage Categories',
  //             navLink: '/store/manage-categories',
  //           },
  //           // {
  //           //   name: 'Pending Categories',
  //           //   navLink: '/store/manage-categories/pending-categories',
  //           // },
  //         ],
  //       },
  //       {
  //         name: 'Manage Product Attributes',
  //         icon: 'local_mall',
  //         mainLink: 'atrribute',

  //         subLinks: [
  //           {
  //             name: 'Attribute Groups',
  //             navLink: '/store/product-attribute/attribute-group',
  //           },
  //           {
  //             name: 'Attribute Sets',
  //             navLink: '/store/product-attribute/attribute-set',
  //           },
  //           {
  //             name: 'Product Attributes',
  //             navLink: '/store/product-attribute',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Site Layouts',
  //         icon: 'dashboard',
  //         mainLink: 'layout',

  //         subLinks: [
  //           {
  //             name: 'Android Phone',
  //             navLink: '/store/site-layout/android-layout',
  //           },
  //           {
  //             name: 'IOS Phone',
  //             navLink: '/store/site-layout/ios-layout',
  //           },
  //           {
  //             name: 'Mobile Browser',
  //             navLink: '/store/site-layout/mobile-browser',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Seller Commission Management',
  //         icon: 'assignment',
  //         subLinks: [
  //           {
  //             name: 'Commission Management',
  //             navLink: '/store/commission-management',
  //           },
  //           {
  //             name: 'Other Charges',
  //             navLink: '/store/commission-management/other-charges',
  //             menuStatus: 'NA',
  //           },
  //           {
  //             name: 'Pending Commission',
  //             navLink: '/store/commission-management/pending-commission',
  //             menuStatus: 'NA',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Fulfillment Center Management',
  //         icon: 'store_mall_directory',
  //         subLinks: [
  //           {
  //             name: 'Fulfillment Center',
  //             navLink: '/store/fulfillment-center',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Delivery Center Management',
  //         icon: 'local_shipping',
  //         subLinks: [
  //           {
  //             name: 'Delivery Center',
  //             navLink: '/store/delivery-center',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Payment Methods Management',
  //         icon: 'payment',
  //         subLinks: [
  //           {
  //             name: 'Payment Methods',
  //             navLink: '/store/payment-methods',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'ZIP Code Management',
  //         icon: 'location_on',
  //         parentNavLink: '/store/zip-code-management/zip-code-management',
  //         subLinks: [
  //           {
  //             name: 'Zone',
  //             navLink: '/store/zip-code-management',
  //           },
  //           {
  //             name: 'Zipcode',
  //             navLink: '/store/zip-code-management/zipcode',
  //           },
  //           {
  //             name: 'Zip Zone User',
  //             navLink: '/store/zip-code-management/zip-zone-user',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Country Management',
  //         icon: 'map',
  //         subLinks: [
  //           {
  //             name: 'Country',
  //             navLink: '/store/country',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Region Management',
  //         icon: 'person_pin_circle',
  //         subLinks: [
  //           {
  //             name: 'Region ',
  //             navLink: '/store/region',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Logistic Partner',
  //         icon: 'transfer_within_a_station',
  //         subLinks: [
  //           {
  //             name: 'Logistic Partner ',
  //             navLink: '/store/logistic-partner',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'App Version Management',
  //         icon: 'system_update',
  //         subLinks: [
  //           {
  //             name: 'App Version ',
  //             navLink: '/store/app-version-management',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Static Page Management',
  //         icon: 'pages',
  //         subLinks: [
  //           {
  //             name: 'Static Page',
  //             navLink: '/store/static-page-management',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   'Category Management': {
  //     icon: 'pages',
  //     mainLink: 'category',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/category/category-dashboard',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Manage Brands',
  //         icon: 'style',
  //         subLinks: [
  //           {
  //             name: 'Active Brands',
  //             navLink: '/category/manage',
  //           },
  //           {
  //             name: 'In-active Brands',
  //             navLink: '/category/manage/in-active-brand',
  //           },
  //           {
  //             name: 'Pending Brands',
  //             navLink: '/category/manage/pending-brand',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Collections',
  //         icon: 'collections_bookmark',
  //         subLinks: [
  //           {
  //             name: 'Create New Collections',
  //             navLink: '/category/collection/new-collection',
  //           },
  //           {
  //             name: 'Active Collection',
  //             navLink: '/category/collection/active-collection',
  //           },
  //           {
  //             name: 'In-active Collections',
  //             navLink: '/category/collection/in-active-collection',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Banner Management',
  //         icon: 'view_carousel',
  //         subLinks: [
  //           {
  //             name: 'New Banner',
  //             navLink: '/category/banner/new-banner',
  //           },
  //           {
  //             name: 'Active Banners',
  //             navLink: '/category/banner/active-banner',
  //           },
  //           {
  //             name: 'In-active Banners',
  //             navLink: '/category/banner/in-active-banner',
  //             menuStatus: 'NA',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Exception Management',
  //         icon: 'error',
  //         subLinks: [
  //           {
  //             name: 'Commission Exception',
  //             navLink: '/category/exception/commission-exception',
  //           },
  //           // {
  //           //   name: 'Product Exception',
  //           //   navLink: '/category/exception/product-exception',
  //           // },
  //           {
  //             name: 'Pending Exception',
  //             navLink: '/category/exception/pending-exception',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'CouponCode Management',
  //         icon: 'local_offer',
  //         subLinks: [
  //           {
  //             name: 'New Coupon Code',
  //             navLink: '/category/coupon-code/new-coupon-code',
  //           },
  //           {
  //             name: 'Active Coupon Code',
  //             navLink: '/category/coupon-code/active-coupon-code',
  //           },
  //           {
  //             name: 'Inactive Coupon Code',
  //             navLink: '/category/coupon-code/inactive-coupon-code',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Competitor Analysis',
  //         icon: 'compare',
  //         parentNavLink: '/category/competitor-analysis',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Brand Gap Analysis',
  //         icon: 'pie_chart',
  //         parentNavLink: '/category/brand-gap-analysis',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Merchant Management': {
  //     icon: 'person_pin',
  //     mainLink: 'merchant',
  //     sidenavmenu: [
  //       {
  //         name: 'Create New Merchant',
  //         icon: 'group_add',
  //         parentNavLink: '/merchant/create-new-merchant',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Merchant Group Management',
  //         icon: 'assignment_ind',
  //         parentNavLink: '/merchant/group-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Interested Merchant List',
  //         icon: 'person_add_disabled',
  //         parentNavLink: '/merchant/interested-merchant',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Active Merchants',
  //         icon: 'check_circle',
  //         parentNavLink: '/merchant/active-merchant',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'In-active Merchants',
  //         icon: 'cancel',
  //         parentNavLink: '/merchant/in-active-merchant',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'De-listed Merchants',
  //         icon: 'person_add_disabled',
  //         parentNavLink: '/merchant/de-listed-merchant',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Merchants',
  //         icon: 'timelapse',
  //         parentNavLink: '/merchant/pending-merchant',
  //         subLinks: [],
  //       },
  //     ],
  //   },
  //   'Affiliates Management': {
  //     icon: 'person',
  //     mainLink: 'affiliate',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/affiliate',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Master Distributors',
  //         icon: 'person',
  //         parentNavLink: '/affiliate/master-distributors',
  //         subLinks: [],
  //       },

  //       {
  //         name: 'Affiliates Group Management',
  //         icon: 'group',
  //         parentNavLink: '/affiliate/group-management',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Affiliation Request',
  //         icon: 'person_add_disabled',
  //         parentNavLink: '/affiliate/affiliation-request',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Create New Affiliate',
  //         icon: 'perm_contact_calendar',
  //         parentNavLink: '/affiliate/add-new-affiliate',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Active Affiliates',
  //         icon: 'check_circle',
  //         parentNavLink: '/affiliate/active-affiliates',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'In-active Affiliates',
  //         icon: 'cancel',
  //         parentNavLink: '/affiliate/in-active-affiliates',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Pending Affiliates',
  //         icon: 'timelapse',
  //         parentNavLink: '/affiliate/pending-affiliates',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Catalog Management': {
  //     icon: 'import_contacts',
  //     mainLink: 'catalog',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/catalog',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Create New Master Catalog',
  //         icon: 'library_books',
  //         parentNavLink: '/catalog/create-new-master-catalog',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Manage Master Catalog',
  //         icon: 'book',
  //         parentNavLink: '/catalog/manage-master-catalog',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'In-active Catalog',
  //         icon: 'cancel',
  //         parentNavLink: '/catalog/in-active-catalog',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'No Seller Catalog',
  //         icon: 'assignment_late',
  //         parentNavLink: '/catalog/no-seller-catalog',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Catalogs',
  //         icon: 'timelapse',
  //         parentNavLink: '/catalog/pending-catalogs',
  //         subLinks: []
  //       },
  //       {
  //         name: 'Manage Seller Catalog',
  //         icon: 'timelapse',
  //         parentNavLink: '/catalog/manage-catalog//live-stock/in-stock',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Catalog Correction': {
  //     icon: 'bookmarks',
  //     mainLink: 'catalog-correction',
  //     sidenavmenu: [
  //       {
  //         name: 'Correct Dimension',
  //         icon: 'open_with',
  //         parentNavLink: '/catalog-correction/correct-dimension',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Correct MRP & Price',
  //         icon: 'settings_applications',
  //         parentNavLink: '/catalog-correction/correct-price',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Product Relevance',
  //         icon: 'perm_media',
  //         parentNavLink: '/catalog-correction/product-relevance',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Product Tag',
  //         icon: 'local_offer',
  //         parentNavLink: '/catalog-correction/product-tag',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Correction',
  //         icon: 'timelapse',
  //         parentNavLink: '/catalog-correction/pending-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Seller Request': {
  //     icon: 'question_answer',
  //     mainLink: 'seller-request',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/seller-request',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending New Brand',
  //         icon: 'branding_watermark',
  //         parentNavLink: '/seller-request/pending-new-brand',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Product Brand Category Link',
  //         icon: 'perm_media',
  //         parentNavLink: '/seller-request/pending-brand-category-link',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Product Relevance',
  //         icon: 'perm_media',
  //         parentNavLink: '/seller-request/request-product-relevance',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending New Category',
  //         icon: 'timelapse',
  //         parentNavLink: '/seller-request/pending-new-category',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending New Catalog',
  //         icon: 'import_contacts',
  //         parentNavLink: '/seller-request/pending-new-catalog',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Catalog Link',
  //         icon: 'link',
  //         parentNavLink: '/seller-request/pending-catalog-link',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Price Correction',
  //         icon: 'exposure',
  //         parentNavLink: '/seller-request/pending-price-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Dimension Correction',
  //         icon: 'photo_size_select_small',
  //         parentNavLink: '/seller-request/pending-dimension-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Tax Correction',
  //         icon: 'poll',
  //         parentNavLink: '/seller-request/pending-tax-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Tax Class/Rate Correction',
  //         icon: 'timeline',
  //         parentNavLink: '/seller-request/pending-tax-rate-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Product Dispute',
  //         icon: 'error',
  //         parentNavLink: '/seller-request/pending-product-dispute',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Product Image Correction',
  //         icon: 'photo',
  //         parentNavLink: '/seller-request/pending-product-image-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending NSP Dispute',
  //         icon: 'rate_review',
  //         parentNavLink: '/seller-request/pending-nsp-dispute',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Holiday Calendar',
  //         icon: 'beach_access',
  //         parentNavLink: '/seller-request/pending-holiday-calendar',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Order Management System': {
  //     icon: 'view_agenda',
  //     mainLink: 'order-management',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/order-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Pending Orders',
  //         icon: 'assignment_turned_in',
  //         parentNavLink: '/order-management/pending-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'New Orders',
  //         icon: 'assignment_turned_in',
  //         parentNavLink: '/order-management/new-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Open Orders',
  //         icon: 'open_in_browser',
  //         parentNavLink: '/order-management/open-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Invoiced Orders',
  //         icon: 'receipt',
  //         parentNavLink: '/order-management/invoiced-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Under Fulfillment',
  //         icon: 'camera_rear',
  //         parentNavLink: '/order-management/under-fulfillment',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'In Transit',
  //         icon: 'assignment_turned_in',
  //         parentNavLink: '/order-management/in-transit-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Completed Orders',
  //         icon: 'check_circle',
  //         parentNavLink: '/order-management/completed-orders',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Un-successful Orders',
  //         icon: 'cancel',
  //         parentNavLink: '/order-management/un-successful-orders',
  //         subLinks: [],
  //       },
  //     ],
  //   },
  //   'Supply Chain Management': {
  //     icon: 'view_day',
  //     mainLink: 'supply-chain-management',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/supply-chain-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Open Order',
  //         icon: 'open_in_browser',
  //         parentNavLink: '/supply-chain-management/open-order',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Manifested Pack',
  //         icon: 'markunread_mailbox',
  //         parentNavLink: '/supply-chain-management/manifested-pack',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'In-transit Pack',
  //         icon: 'motorcycle',
  //         parentNavLink: '/supply-chain-management/in-transit-pack',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Delivered Pack',
  //         icon: 'check_circle',
  //         parentNavLink: '/supply-chain-management/delivered-pack',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Seller Disputed Pack',
  //         icon: 'info',
  //         parentNavLink: '/supply-chain-management/seller-disputed-pack',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'RTO Pack',
  //         icon: 'branding_watermark',
  //         parentNavLink: '/supply-chain-management/rto-pack',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'RTO Transit',
  //         icon: 'featured_video',
  //         parentNavLink: '/supply-chain-management/rto-transit',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'RTO Complete',
  //         icon: 'featured_play_list',
  //         parentNavLink: '/supply-chain-management/rto-complete',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Reverse Pickup ',
  //         icon: 'repeat',
  //         parentNavLink: '/supply-chain-management/reverse-pickup',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Dimension Dispute with Logistic',
  //         icon: 'warning',
  //         parentNavLink:
  //           '/supply-chain-management/dimension-dispute-with-logistic',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Delivery Charge Dispute with Logistic',
  //         icon: 'local_shipping',
  //         parentNavLink:
  //           '/supply-chain-management/delivery-charge-dispute-with-logistic',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Dimension Correction',
  //         icon: 'photo_size_select_small',
  //         parentNavLink: '/supply-chain-management/dimension-correction',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'PIN Code Management',
  //         icon: 'location_on',
  //         parentNavLink: '/supply-chain-management/pincode-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Return Cancel Management': {
  //     icon: 'subdirectory_arrow_left',
  //     mainLink: 'return-cancel-management',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/return-cancel-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Cancel Order Request',
  //         icon: 'chat_bubble',
  //         parentNavLink: '/return-cancel-management/cancel-order-request',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Return Order Request',
  //         icon: 'forum',
  //         parentNavLink: '/return-cancel-management/return-order-request',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Refund Order Request',
  //         icon: 'message',
  //         parentNavLink: '/return-cancel-management/refund-order-request',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Cancelled Order',
  //         icon: 'cancel',
  //         parentNavLink: '/return-cancel-management/cancelled-order',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Returned Order',
  //         icon: 'keyboard_return',
  //         parentNavLink: '/return-cancel-management/returned-order',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Refund Order',
  //         icon: 'vertical_align_top',
  //         parentNavLink: '/return-cancel-management/refund-order',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Finance Module': {
  //     icon: 'monetization_on',
  //     mainLink: 'finance',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/finance',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Seller Payment',
  //         icon: 'assignment_ind',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Seller Payment',
  //             navLink: '/finance/seller-payment/pending-seller-payment',
  //           },
  //           {
  //             name: 'Seller Payment Due',
  //             navLink: '/finance/seller-payment/seller-payment-due',
  //           },
  //           {
  //             name: 'Seller Payment Complete',
  //             navLink: '/finance/seller-payment/seller-payment-complete',
  //           },
  //           {
  //             name: 'Seller Payment Dispute',
  //             navLink: '/finance/seller-payment/seller-payment-dispute',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Affiliate Payments',
  //         icon: 'group',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Affiliate Payment',
  //             navLink: '/finance/affiliate-payment/pending-affiliate-payment',
  //           },
  //           {
  //             name: 'Affiliate Payment Due',
  //             navLink: '/finance/affiliate-payment/affiliate-payment-due',
  //           },
  //           {
  //             name: 'Affiliate Payment Complete',
  //             navLink: '/finance/affiliate-payment/affiliate-payment-complete',
  //           },
  //           {
  //             name: 'Affiliate Payment Dispute',
  //             navLink: '/finance/affiliate-payment/affiliate-payment-dispute',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Offline Top-up',
  //         icon: 'signal_cellular_off',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Offline Top-up',
  //             navLink: '/finance/offline-topup/pending-offline-topup',
  //           },
  //           {
  //             name: 'Reconciled Payment',
  //             navLink: '/finance/offline-topup/offline-reconciled-payment',
  //           },
  //           {
  //             name: 'Un-reconciled Payment',
  //             navLink: '/finance/offline-topup/offline-un-reconciled-payment',
  //           },
  //           {
  //             name: 'Dispute Payment',
  //             navLink: '/finance/offline-topup/dispute-payment',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Payment Gateway',
  //         icon: 'credit_card',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Reconciliation',
  //             navLink: '/finance/payment-gateway/pending-reconciliation',
  //           },
  //           {
  //             name: 'Reconciled Payment',
  //             navLink: '/finance/payment-gateway/reconciled-payment',
  //           },
  //           {
  //             name: 'Un-reconciled Payment',
  //             navLink: '/finance/payment-gateway/un-reconciled-payment',
  //           },
  //           {
  //             name: 'Fraud Transactions',
  //             navLink: '/finance/payment-gateway/fraud-transactions',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'NDH Wallet Payment',
  //         icon: 'folder',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Reconciliation',
  //             navLink: '/finance/wallet-payment/pending-reconciliation',
  //           },
  //           {
  //             name: 'Reconciled Payment',
  //             navLink: '/finance/wallet-payment/reconciled-payment',
  //           },
  //           {
  //             name: 'Un-reconciled Payment',
  //             navLink: '/finance/wallet-payment/un-reconciled-payment',
  //           },
  //           {
  //             name: 'Fraud Transactions',
  //             navLink: '/finance/wallet-payment/fraud-transactions',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'COD Payment',
  //         icon: 'transfer_within_a_station',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Reconciliation',
  //             navLink: '/finance/cod-payment/pending-reconciliation',
  //           },
  //           {
  //             name: 'Reconciled Payment',
  //             navLink: '/finance/cod-payment/reconciled-payment',
  //           },
  //           {
  //             name: 'Un-reconciled Payment',
  //             navLink: '/finance/cod-payment/un-reconciled-payment',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Customer Refund',
  //         icon: 'vertical_align_top',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Pending Refund',
  //             navLink: '/finance/customer-refund/pending-refund',
  //           },
  //           {
  //             name: 'Refund Initiated',
  //             navLink: '/finance/customer-refund/refund-initiated',
  //           },
  //           {
  //             name: 'Refund Reconciled',
  //             navLink: '/finance/customer-refund/refund-reconciled',
  //           },
  //           {
  //             name: 'Un-Reconciled Refund',
  //             navLink: '/finance/customer-refund/un-reconciled-refund',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   'Customer Management': {
  //     icon: 'group',
  //     mainLink: 'customer',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/customer',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Active Customers',
  //         icon: 'person',
  //         parentNavLink: '/customer/active-customers',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'In-active Customers',
  //         icon: 'perm_contact_calendar',
  //         parentNavLink: '/customer/in-active-customers',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Blocked Customers',
  //         icon: 'block',
  //         parentNavLink: '/customer/blocked-customers',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Cart Management': {
  //     icon: 'shopping_cart',
  //     mainLink: 'cart-management',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashboard',
  //         icon: 'dashboard',
  //         parentNavLink: '/cart-management',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Active Carts',
  //         icon: 'shopping_cart',
  //         parentNavLink: '/cart-management/active-carts',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Abandon Carts',
  //         icon: 'report_off',
  //         parentNavLink: '/cart-management/abandon-carts',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Completed Carts',
  //         icon: 'check_circle',
  //         parentNavLink: '/cart-management/completed-carts',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Campaign Management': {
  //     icon: 'headset_mic',
  //     mainLink: 'campaign',
  //     sidenavmenu: [
  //       {
  //         name: 'Create New Notification',
  //         icon: 'notifications',
  //         parentNavLink: '/campaign/create-new-notification',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Current Running Notification',
  //         icon: 'notifications_active',
  //         parentNavLink: '/campaign/current-running-notification',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Completed Notification',
  //         icon: 'notifications_paused',
  //         parentNavLink: '/campaign/completed-notification',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  //   'Loyalty Management': {
  //     icon: 'loyalty',
  //     mainLink: 'loyality',
  //     sidenavmenu: [
  //       {
  //         name: 'Promo Code',
  //         icon: 'label',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Create New Promo Code',
  //             navLink: '/loyality/promo-code/create-new',
  //           },
  //           {
  //             name: 'Active Promo Codes',
  //             navLink: '/loyality/promo-code/active',
  //           },
  //           {
  //             name: 'Un-used Promo Code',
  //             navLink: '/loyality/promo-code/un-used',
  //           },
  //           {
  //             name: 'In-active Promo Codes',
  //             navLink: '/loyality/promo-code/in-active',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Rewards',
  //         icon: 'stars',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Create New',
  //             navLink: '/loyality/rewards/create-new',
  //           },
  //           {
  //             name: 'Active Rewards Program',
  //             navLink: '/loyality/rewards/active-program',
  //           },
  //           {
  //             name: 'In-Active Rewards',
  //             navLink: '/loyality/rewards/in-active',
  //           },
  //           {
  //             name: 'Reward Point Management',
  //             navLink: '/loyality/rewards/point-management',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Vouchers',
  //         icon: 'loyalty',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Create New',
  //             navLink: '/loyality/vouchers/create-new',
  //           },
  //           {
  //             name: 'Active Vouchers',
  //             navLink: '/loyality/vouchers/active',
  //           },
  //           {
  //             name: 'Used Vouchers',
  //             navLink: '/loyality/vouchers/used',
  //           },
  //           {
  //             name: 'In-Active Vouchers',
  //             navLink: '/loyality/vouchers/in-active',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Membership Programme',
  //         icon: 'card_membership',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Active Members',
  //             navLink: '/loyality/membership/active',
  //           },
  //           {
  //             name: 'Member Points',
  //             navLink: '/loyality/membership/points',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Referral Programme',
  //         icon: 'share',
  //         menuStatus: 'NA',
  //         subLinks: [
  //           {
  //             name: 'Create New',
  //             navLink: '/loyality/referral/create-new',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   'Seller Panel': {
  //     icon: 'person',
  //     mainLink: 'seller',
  //     sidenavmenu: [
  //       {
  //         name: 'Dashbard',
  //         icon: 'dashboard',
  //         parentNavLink: '/seller',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Orders',
  //         icon: 'shopping_basket',
  //         parentNavLink: '/seller/order',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Catalog',
  //         icon: 'import_contacts',
  //         parentNavLink: '/seller/catalog/live-stock/in-stock',
  //         subLinks: [],
  //       },
  //       {
  //         name: 'Payments',
  //         icon: 'monetization_on',
  //         parentNavLink: '/seller/payments',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Grow My Business',
  //         icon: 'trending_up',
  //         parentNavLink: '/seller/grow-business',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Manage Brand',
  //         icon: 'local_offer',
  //         parentNavLink: '/seller/manage-brand',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Report',
  //         icon: 'equalizer',
  //         parentNavLink: '/seller/catalog/report',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Manage Profile',
  //         icon: 'person',
  //         parentNavLink: '/seller/manage-profile',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //       {
  //         name: 'Margin Switch Setting',
  //         icon: 'pages',
  //         parentNavLink: '/seller/margin-switch',
  //         subLinks: [],
  //         menuStatus: 'NA',
  //       },
  //     ],
  //   },
  // };
  sideMenuObjKeys = Object.keys(this.sideMenuObj);


}
