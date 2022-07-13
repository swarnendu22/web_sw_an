import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { GetDeliveryBoys, ApproveRrejectDeliveryBoys, ActionTypes } from 'src/app/actions/merchant-management.actions';
import { DeliveryBoyAreaOperationsComponent, } from '../components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { FilterDeliveryBoysComponent } from '../components/filter-delivery-boys/filter-delivery-boys.component';
import { TraineeDatePopupComponent } from '../components/trainee-date-popup/trainee-date-popup.component';
import { AssignTrainingPopupComponent } from '../components/assign-training-popup/assign-training-popup.component';
import { GetPendingDEList, GetRegionsByCountryCode, GetZoneByRegionCode, GetDeliveryBoyByStatus, GetRegionsByCountryCodeDynamic } from 'src/app/actions/delivery-boy-management.action';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-assign-training',
  templateUrl: './assign-training.component.html',
  styleUrls: ['./assign-training.component.css']
})
export class AssignTrainingComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  regionList = [];
  zoneList = [];
  vehicleType: null;
  city: null;
  area: null;
  zone: null;
  state_name: {};
  searchTerm: '';
  status = 'PENDING';
  payLoadForSearch = {
    search: '',
    state_name: null,
    vehicle_type: null,
    area: null,
  }
  constructor(private ag: AgGridOptions,private route: Router,
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'Registration No.',
        field: 'registration_number',
        resizable: true,
        sortable: true,
        cellRendererFramework: CellRendererDeliveryBoysComponent,
        // cellRenderer: (data) => {
        //   // tslint:disable-next-line: max-line-length
        //   return `<a  target="_blank" href="/delivery-boy/driver-details/${data.data.id}">${data.data.registration_number}</a>`;
        // },
      },
      {
        headerName: 'Date',
        field: 'created_at',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return moment(data.data.created_at).format('MM/DD/YYYY HH:mm')
        }

      },
      {
        headerName: 'Name',
        field: 'name',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Mobile No.',
        resizable: true,
        field: 'phone',
      },
      // {
      //   headerName: 'Alt No.',
      //   field: 'driving_licence_state',
      //   resizable: true,

      // },
      // {
      //   headerName: 'Last Seen',
      //   field: 'last_seen',
      //   resizable: true,
      //   cellRenderer: (data) => {
      //     if (data.data.last_seen) {

      //       return data.data.last_seen && moment(data.data.last_seen.date).format('lll')
      //     }
      //   }
      // },
      // {
      //   headerName: 'Status',
      //   field: 'status',
      //   resizable: true,
      //   cellRenderer: (data) => {
      //     if (data.value === 'APPROVED') {
      //       return '<div class="status-circle-green"></div>'
      //     } else {
      //       return '<div class="status-circle-red"></div>'
      //     }
      //   }
      // },
      {
        headerName: 'Vehicle',
        field: 'vehicle_type',
        resizable: true,
      },
      {
        headerName: 'Area',
        field: 'present_address',
        resizable: true,
        cellRenderer: (data) => {
          return data.data.present_address.address2;
        }
      },
      {
        headerName: 'City',
        field: 'city',
        resizable: true,
        cellRenderer: (data) => {
          return data.data.present_address.city;
        }
      },
      {
        headerName: 'Attendance',
        field: 'attendance',
        resizable: true,
        cellRenderer: (data) => {
          return `<p class="mb-0 text-success">P</p>`
        }
      },
      {
        headerName: 'Score',
        field: 'score',
        resizable: true,
        cellRenderer: (data) => {
          return `<p class="mb-0">72</p>`
        }
      },
      {
        headerName: 'Status',
        field: 'status',
        resizable: true,
        cellRenderer: (data) => {
          return `<h6 class="mt-2"><span class="badge badge-pill badge-success">PASS</span></h6>`
        }
      },
      {
        headerName: 'Certified',
        field: 'certified',
        resizable: true,
        cellRenderer: (data) => {
          return `<h6 class="mt-2"><span class="badge badge-pill badge-danger">NO</span></h6>`
        }
      },

      // {
      //   headerName: 'Action',
      //   field: 'value',
      //   colId: 'params',
      //   cellRendererFramework: CellRendererDeliveryBoysComponent,
      //   cellRendererParams: {
      //     // onActionBtnClick: this.rejectApproveOperation.bind(this),
      //   },
      //   sortable: false,
      //   filter: false,
      //   floatingFiltersHeight: 0,
      //   resizable: true,
      //   pinned: 'right'
      // },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: 'IN' }));
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": this.status,
      "requestBody": this.payLoadForSearch
    }));

    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.zoneList) {
          console.log(res.zoneList);
          this.zoneList = res.zoneList;
        }
      });

  }

  openDate() {
    const dialogRef = this.dialog.open(TraineeDatePopupComponent, {
    	// height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMerchandise() {
  	this.route.navigate(['delivery-boy/pending-delivery-boy/delivery-boy-merchandise']);
  }

  search() {
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name ? this.state_name['regionName'] : '',
      vehicle_type: this.vehicleType,
      area: this.area
    }

    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": this.status,
      "requestBody": payLoadForSearch
    }));
  }


  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  selectStatus(e) {
    this.status = e.value;
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name ? this.state_name['regionName'] : '',
      vehicle_type: this.vehicleType,
      area: this.area
    }
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": this.status,
      "requestBody": payLoadForSearch
    }));
  }
  selectCountry(e) {
    console.log('Select Country', e.value);
    this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: e.value.countryCode }));
  }
  selectRegion(e) {
    console.log('Select', e.value)
    // this.state_name = e.value.regionName;
    this.store.dispatch(new GetZoneByRegionCode({ regionCode: e.value.regionCode }));
  }

  openTraining() {
    const dialogRef = this.dialog.open(AssignTrainingPopupComponent, {
      minHeight: '500px',
      width: '600px',
      panelClass: 'training-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // rejectApproveOperation(data) {
  //   const dialog = this.dialog.open(DeliveryBoyAreaOperationsComponent, {
  //     minHeight: '300px',
  //     minWidth: '450px',
  //     data: { id: data.id, status: data.status }
  //   });

  //   dialog.afterClosed().subscribe(result => {
  //     console.log(result)
  //     if (result) {
  //       this.store.dispatch(new ApproveRrejectDeliveryBoys({
  //         id: result.id,
  //         status: result.status,
  //         lat: result.lat,
  //         lng: result.lng,
  //         max_buffer_distance: result.max_buffer_distance
  //       }))
  //       this.apiMsgService.currentApiStatus.subscribe((response) => {
  //         if (response.status && response.type == ActionTypes.approveRrejectDeliveryBoys) {
  //           this.store.dispatch(new GetDeliveryBoys({
  //             "pageNo": this.pageNo,
  //             "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'PENDING',
  //             "requestBody": this.payLoadForSearch
  //           }));
  //         }
  //       })
  //     }
  //   });
  // }

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


  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name['regionName'],
      vehicle_type: this.vehicleType,
      area: this.area
    }
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": 'PENDING',
      "requestBody": payLoadForSearch
    }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name['regionName'],
      vehicle_type: this.vehicleType,
      area: this.area
    }
    this.pageNo += 1;
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": 'PENDING',
      "requestBody": payLoadForSearch
    }));
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.deliveryBoysByStatus) {
          console.log(res.deliveryBoysByStatus)
          this.totalRecords = res.deliveryBoysByStatus.total_record;

          this.rowData = res.deliveryBoysByStatus.delivery_boys;
          event.api.setRowData(this.rowData);
        }
      });
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.regionByCountryCodeDynamic) {
          console.log('Pending delivery Region', res.regionByCountryCodeDynamic);
          this.regionList = res.regionByCountryCodeDynamic;
        }
      });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }


  // openFilter() {
  //   const dialog = this.dialog.open(FilterDeliveryBoysComponent, {
  //     panelClass: 'filter-modal',
  //     height: '10px',
  //     data: { payLoadForSearch: this.payLoadForSearch }
  //   });

  //   dialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.pageNo = 1;
  //       this.payLoadForSearch = result;
  //       this.store.dispatch(new GetDeliveryBoys({
  //         pageNo: this.pageNo,
  //         status: this.payLoadForSearch.search,
  //         requestBody: this.payLoadForSearch
  //       }));
  //     }
  //   });
  // }

}

