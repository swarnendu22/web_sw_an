import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { GetMerchantsListNew, GetBusinessCategory, GetRegionsList } from './../../../../actions/merchant-management.actions';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { MerchantToggleComponent } from '../merchant-toggle/merchant-toggle.component';
import { Observable, Subscription } from 'rxjs';
import { MerchantOnlinePaymentToogleComponent } from '../merchant-online-payment-toogle/merchant-online-payment-toogle.component';
import * as moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  merchantsListNew = [];
  private gridApi;
  columnApi;
  columnDefs = [];
  defaultColDef;
  rowData: any[];
  inititalhit: boolean = false;

  businessCategoryList = null;

  pageNo = 1;
  pageSize = 200;
  totalRecords = 0;

  sortBy = 'store';
  businessCategory = 'All';
  subscriptionType = 'All';
  status = 'All';
  filters: string[] = [null, null, null, null, null, null];
  selectable:boolean = true;
  removable:boolean = true;
  regions = null;

  opened: boolean = false;
  subsriptionList = [
    { 
      subs: 'Trial',
      params: "TRIAL",
      id: 0
    },
    { 
      subs: 'Basic',
      params: "BASIC",
      id: 1
    },
    { 
      subs: 'Paid',
      params: "PAID",
      id: 2
    }
  ];
  searchByName: string = '';
  subscriptionSelected: number = null;
  businessCategorySelected: number = null;
  regionIdSelected: number = null;
  statusList = [    
    {
      status: 'Active',
      params: true,
      id: 0
    }, {
      status: 'Inactive',
      params: false,
      id: 1
    }
  ]
  statusSelected: number = null;
  sortByList = [
    {
      filter: "Store Count Ascending",
      params: "asc",
      id: 0
    },
    {
      filter: "Store Count Descending",
      params: "desc",
      id: 1
    },
    {
      filter: "Date Ascending",
      params: "asc",
      id: 2
    },
    {
      filter: "Date Descending",
      params: "desc",
      id: 3
    }
  ];
  sortSelectedValue = null;

  constructor(
    private ag: AgGridOptions,
    private store: Store<any>,
    private route: Router,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private apiMsgService: ApiMessageService,
    public dialog: MatDialog,
  ) {
    this.columnDefs = [
      {
        headerName: 'Merchant ID',
        field: 'id',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Merchant Name',
        field: 'legalName',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Region',
        field: 'region',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Registration Date',
        field: 'registrationDate',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Business Category',
        field: 'businessCategory',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Subscription Type',
        field: 'subscriptionLevel',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Stores',
        field: 'storeCount',
        resizable: true,
        sortable: true,
        maxWidth: 100,
      },
      {
        headerName: 'Status',
        field: 'isActive',
        cellRendererFramework: MerchantToggleComponent,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Online Payment',
        field: 'allowOnlinePayment',
        cellRendererFramework: MerchantOnlinePaymentToogleComponent,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Action',
        field: 'actionMerchant',
        cellRendererFramework: CellRendererButtonComponent,
        width: 150,
        btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: false
      }
    ];

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      filter: 'agTextColumnFilter'
    };

    this.alwaysShowCalendars = true;

  }
  ngOnInit(): void {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      } else {
        this.store.dispatch(new GetBusinessCategory());
      }
    });
    this.onMerchantSearch( this.payload );
    this.store.dispatch(new GetRegionsList());

    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
    this.picker = this.pickerDirective.picker;
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.merchantsListNew) {
        this.payload = Object.assign( {}, this.payload );
        this.payload.payload = this.filterFunction( "store_name", null ); 
        this.payload.payload = this.filterFunction( "merchant_name", null ); 

        this.merchantsListNew = res.merchantsListNew;
        this.totalRecords = this.merchantsListNew['totalRecords'];
        this.rowData = this.merchantsListNew['obj'];
        this.inititalhit = true;
        event.api.setRowData(this.rowData);
        this.modalService.dismissAll();
      } else {
        // this.selectSortByDate( this.sortByDate[1] );
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
  getPageNoData(page: number) {
    this.pageNo = page;
    this.payload.pageNo = this.pageNo;
    let params = this.payload;
    this.onMerchantSearch( params );
  }

  onGridSizeChanged(params) {
    var gridWidth = params.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }


  payload = {
    payload: {
      "order_by_date": "desc"
     },
    pageNo: this.pageNo,
    pageSize: this.pageSize
   };

  onMerchantSearch( params = {} ) {
    this.store.dispatch(new GetMerchantsListNew( params ));
  }
  onMerchantSearchCached(){
    this.store.dispatch(new GetMerchantsListNew( this.payload ));
  }

  searchName: string = "Merchant";
  placeHolder:string = "Search";
  
  filtersidebar(){
    this.opened = !(this.opened);
  }
  filterFunction( parameter, value ){
    let payloadval = Object.assign( {}, this.payload.payload );
    payloadval[parameter] = value;
    return payloadval;
  }

  chooseSubscription( subs ){    
    this.subscriptionSelected = subs.id;
    this.payload = Object.assign( {}, this.payload );
    this.payload.payload = this.payload.payload = this.filterFunction("subcrytion_type", subs.params);
    this.filters[0] = "Subscription";
    this.onMerchantSearch( this.payload );
  }
  selectBusinessCategory( item ){
    this.businessCategorySelected = item.id;
    this.payload = Object.assign( {}, this.payload );
    this.payload.payload = this.filterFunction("business_category", item.businessCategoryName);
    this.filters[1] = "Business Category";
    this.onMerchantSearch( this.payload );
  }
  selectStatus( status ){
    this.statusSelected = status.id;
    this.payload = Object.assign( {}, this.payload );
    this.payload.payload = this.filterFunction("status", status.params);
    this.filters[2] = "Status"; 
    this.onMerchantSearch( this.payload );
  }
  selectSort( sort ){
    this.sortSelectedValue = sort.id;
    this.payload = Object.assign( {}, this.payload );
    if( sort.filter === "Store Count Ascending" || sort.filter === "Store Count Descending"){
      this.payload.payload = this.filterFunction( "order_by_date", null );
      this.payload.payload = this.filterFunction("order_by_store_count", sort.params);
    } else{
      this.payload.payload = this.filterFunction( "order_by_store_count", null ); 
      this.payload.payload = this.filterFunction("order_by_date", sort.params);
    }    
    this.filters[3] = "Sort";
    this.onMerchantSearch( this.payload );
  }
  
  selectRegion( region ){
    this.regionIdSelected = region.id;
    this.payload = Object.assign( {}, this.payload );
    this.payload.payload = this.filterFunction("region", region.regionName );
    this.filters[4] = "Region";
    this.onMerchantSearch( this.payload );
  }

  remove( filterVal, index ){
    console.log( filterVal, index)
    if( filterVal === "Subscription" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "subcrytion_type", null ); 
      this.onMerchantSearch( this.payload );  
      this.subscriptionSelected = null;   
    }
    else if( filterVal === "Business Category" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "business_category", null ); 
      this.onMerchantSearch( this.payload );  
      this.businessCategorySelected = null;
    }
    else if( filterVal === "Status" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "status", null ); 
      this.onMerchantSearch( this.payload );     
      this.statusSelected = null;
    }
    else if( filterVal === "Sort" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "order_by_store_count", null );
      this.payload.payload = this.filterFunction( "order_by_date", null );  
      this.onMerchantSearch( this.payload );
      this.sortSelectedValue = null;  
    }   
    else if( filterVal === "Region" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "region", null );  
      this.onMerchantSearch( this.payload );
      this.regionIdSelected = null;  
    }   
    else if( filterVal === "DateRange" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "start_date", null );  
      this.payload.payload = this.filterFunction( "end_date", null );  
      this.selected = null;
      this.onMerchantSearch( this.payload );
    }   
    // this.filters.splice(index, 1);
    this.filters[index] = null;
  }

  onChange( search ){
    if( this.searchName == "Merchant"){
      this.payload.payload = this.filterFunction( "store_name", null );
      this.payload.payload = this.filterFunction( "store_mobile", null );  
      this.payload.payload = this.filterFunction( "storeId", null );  
      this.payload.payload = this.filterFunction( "merchant_name", this.searchByName );      
      this.onMerchantSearch( this.payload );
    }
    else if( this.searchName == "Store"){
      this.payload.payload = this.filterFunction( "merchant_name", null ); 
      this.payload.payload = this.filterFunction( "store_mobile", null );
      this.payload.payload = this.filterFunction( "storeId", null );  
      this.payload.payload = this.filterFunction( "store_name", this.searchByName );       
      this.onMerchantSearch( this.payload );
    }
    else if( this.searchName == "Store_Number"){
      this.payload.payload = this.filterFunction( "merchant_name", null );
      this.payload.payload = this.filterFunction( "store_name", null );  
      this.payload.payload = this.filterFunction( "storeId", null ); 
      this.payload.payload = this.filterFunction( "store_mobile", (this.searchByName != "" ? this.searchByName : null) ); 
      this.onMerchantSearch( this.payload );
    }
    else if( this.searchName == "StoreId"){
      this.payload.payload = this.filterFunction( "merchant_name", null );
      this.payload.payload = this.filterFunction( "store_name", null );  
      this.payload.payload = this.filterFunction( "store_mobile", null ); 
      this.payload.payload = this.filterFunction( "storeId", this.searchByName ); 
      this.onMerchantSearch( this.payload );
    }
  }

  // subTimeout: Subscription;
  // searchMerchantStore(){
  //   if (this.subTimeout) {
  //     this.subTimeout.unsubscribe();
  //   }
  //   this.subTimeout = Observable.timer(1000).subscribe(() => {
  //     this.payload = Object.assign( {}, this.payload );
  //     if( this.searchName == "Merchant"){
  //       this.payload.payload = this.filterFunction( "merchant_name", this.searchByName ); 
  //       this.onMerchantSearch( this.payload );
  //     }
  //     else if( this.searchName == "Store"){
  //       this.payload.payload = this.filterFunction( "store_name", this.searchByName ); 
  //       this.onMerchantSearch( this.payload );
  //     }
  //   });    
  // }

  onMerchantStoreChange( value ){
    if( value === "" ){
      this.payload = Object.assign( {}, this.payload );
      this.payload.payload = this.filterFunction( "store_name", null ); 
      this.payload.payload = this.filterFunction( "merchant_name", null );
      this.payload.payload = this.filterFunction( "store_mobile", null );
      this.payload.payload = this.filterFunction( "storeId", null );
      this.onMerchantSearch( this.payload );
    }
  }

  searchMerchantStoreFun(){
    this.payload = Object.assign( {}, this.payload );
    this.onChange( "search" );
  }
  

  selected: any = null;
  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective;
  alwaysShowCalendars: boolean;
  picker: DaterangepickerComponent;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  open(e) {
    this.pickerDirective.open(e);
  }

  datesUpdated( value ) {
    // console.log( value )
    let startDate = null;
    let endDate = null;
    if( value.startDate ){
      let start = new Date (value.startDate._d);
      let end = new Date (value.endDate._d);
      startDate  = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
      endDate  = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
    }
    this.payload = Object.assign( {}, this.payload );
    this.payload.payload = this.filterFunction("start_date", startDate );
    this.payload.payload = this.filterFunction("end_date", endDate );
    if( this.inititalhit ){
      this.onMerchantSearch( this.payload );
    }    
    if( !startDate && !endDate ){
      this.filters[5] = null;
    } else{
      this.filters[5] = "DateRange";
    }
  }



}
