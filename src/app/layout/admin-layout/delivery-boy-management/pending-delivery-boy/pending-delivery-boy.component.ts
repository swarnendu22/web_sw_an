import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { DeliveryBoyAreaOperationsComponent, } from '../components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { FilterDeliveryBoysComponent } from '../components/filter-delivery-boys/filter-delivery-boys.component';
import { AssignTrainingPopupComponent } from '../components/assign-training-popup/assign-training-popup.component';
import { DeliveryBoyShcheduleComponent } from '../components/delivery-boy-shchedule/delivery-boy-shchedule.component';
import { PopupDeMerchandiseComponent } from '../components/popup-de-merchandise/popup-de-merchandise.component';
import { GetPendingDEList, GetRegionsByCountryCode, GetZoneByRegionCode, GetDeliveryBoyByStatus, GetRegionsByCountryCodeDynamic, ActionTypes, CertifyDeliveryBoy } from 'src/app/actions/delivery-boy-management.action';
import * as moment from 'moment';
import { ActivatedRoute } from "@angular/router";
import { CellRendererRescheduleButtonComponent } from '../../components/cell-renderer-reschedule-button/cell-renderer-reschedule-button.component';

@Component({
  selector: 'app-pending-delivery-boy',
  templateUrl: './pending-delivery-boy.component.html',
  styleUrls: ['./pending-delivery-boy.component.css']
})
export class PendingDeliveryBoyComponent implements OnInit {
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
  bulkOperationList = []
  constructor(private ag: AgGridOptions, private route: ActivatedRoute,
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) {
    this.route.queryParams.subscribe(params => {
      this.status = params["routeStatus"] ? params["routeStatus"] : 'PENDING'
    })

    this.columnDefs = [
      {
        headerName: 'Registration No.',
        field: 'registration_number',
        resizable: true,
        sortable: true,
        cellRendererFramework: CellRendererDeliveryBoysComponent,
        cellRendererParams: {
          onMultiSelect: this.onMultiSelect.bind(this),
          openDeliverySchedule: this.openDeliverySchedule.bind(this),
          openeDeMerchandise: this.openeDeMerchandise.bind(this),
        },
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
      // {
      //   headerName: 'Area',
      //   field: 'present_address',
      //   resizable: true,
      //   cellRenderer: (data) => {
      //     return data.data.present_address.address2;
      //   }
      // },
      {
        headerName: 'City',
        field: 'city',
        resizable: true,
        cellRenderer: (data) => {
          return data.data.present_address ? data.data.present_address.city : '';
        }
      },


    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }

  openDeliverySchedule(params) {
    const dialogRef = this.dialog.open(DeliveryBoyShcheduleComponent, {
      width: '600px',
      disableClose: true,
      data: {
        delivery_boy_traning: params.alldata.delivery_boy_traning,
        id: params.alldata.id,
        status: params.alldata.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.scheduleDeliveryBoy) {
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": this.status,
            "requestBody": this.payLoadForSearch
          }));
        }
      })
    });
  }

  openeDeMerchandise(params) {
    const dialogRef = this.dialog.open(PopupDeMerchandiseComponent, {
      disableClose: true,
      data: {
        id: params.alldata.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.updateDeMerchandiseInventory) {
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": this.status,
            "requestBody": this.payLoadForSearch
          }));
        }
      })
    });
  }

  onMultiSelect(params) {
    console.log(params)
    if (params) {
      let index = this.bulkOperationList.indexOf(params.alldata.id);
      if (params.checkBoxValue) {
        if (index < 0) {
          this.bulkOperationList.push(params.alldata.id);
        }
      } else {
        this.bulkOperationList.splice(index, 1);
      }
    }
    console.log(this.bulkOperationList)
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

  search() {
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name,
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
    this.bulkOperationList=[]
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name,
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
    // this.store.dispatch(new GetRegionsByCountryCodeDynamic({ countryCode: e.value.countryCode }));
  }
  selectRegion(e) {
    console.log('Select', e.value)
    this.state_name = e.value;
    // this.store.dispatch(new GetZoneByRegionCode({ regionCode: e.value.regionCode }));
  }

  openTraining() {
    const dialogRef = this.dialog.open(AssignTrainingPopupComponent, {
      minHeight: '500px',
      width: '600px',
      panelClass: 'training-modal',
      disableClose: true,
      data: {
        bulkOperationList: this.bulkOperationList,
        type: 'NEW-SCHEDULE'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.assignTrainingToDeliveryBoy) {
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": this.status,
            "requestBody": this.payLoadForSearch
          }));
        }
      })
    });
  }

  onReschedule(params) {
    console.log(params)
    const dialogRef = this.dialog.open(AssignTrainingPopupComponent, {
      minHeight: '500px',
      width: '600px',
      panelClass: 'training-modal',
      disableClose: true,
      data: {
        bulkOperationList: [params.alldata.id],
        type: 'RE-SCHEDULE'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.apiMsgService.currentApiStatus.subscribe((response) => {
        let res: any = response.status;
        if (res && response.type == ActionTypes.assignTrainingToDeliveryBoy) {
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": this.status,
            "requestBody": this.payLoadForSearch
          }));
        }
      })
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
      state_name: this.state_name,
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
      state_name: this.state_name,
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
          this.gridColumnApi = event.columnApi;
          console.log(this.gridColumnApi)
          var columnDefs = this.gridColumnApi.columnController.columnDefs;
          if (this.status == 'TRAINING') {
            console.log('if')
            const findex = columnDefs.find(e => e.field == 'attendance');

            if (!findex) {
              columnDefs.push(
                {
                  headerName: 'Attendance',
                  field: 'attendance',
                  cellRenderer: (data) => {
                    if (data.data.delivery_boy_traning) {
                      let attendanceStr = '';
                      data.data.delivery_boy_traning.delivery_boy_traning_details.forEach((e, i) => {
                        if (e.attendance != null) {
                          if (i == data.data.delivery_boy_traning.delivery_boy_traning_details.length - 1) {
                            attendanceStr += e.attendance == 'present' ? '<span style="color:green; font-weight:bold">P</span>' : '<span style="color:red; font-weight:bold">A</span>'
                          } else {
                            attendanceStr += e.attendance == 'present' ? '<span style="color:green; font-weight:bold">P</span>,' : '<span style="color:red; font-weight:bold">A</span>,'
                          }
                        }

                      })
                      return attendanceStr;

                    } else {
                      return ''
                    }
                    // return data.data.delivery_boy_traning ? data.data.delivery_boy_traning.delivery_boy_traning_details[0].attendance : '';
                  }
                });
              columnDefs.push(
                {
                  headerName: 'Total Score',
                  field: 'total_score',
                  cellRenderer: (data) => {
                    return data.data.delivery_boy_traning ? data.data.delivery_boy_traning.score : '';
                  }
                });
              columnDefs.push(
                {
                  headerName: 'Score Status',
                  field: 'score_status',
                  cellRenderer: (data) => {
                    return data.data.delivery_boy_traning ? data.data.delivery_boy_traning.status : '';
                  }
                });
              columnDefs.push(
                {
                  headerName: 'Action',
                  field: 'value',
                  colId: 'params',
                  cellRendererFramework: CellRendererRescheduleButtonComponent,
                  cellRendererParams: {
                    onReschedule: this.onReschedule.bind(this),
                  },
                  sortable: false,
                  filter: false,
                  floatingFiltersHeight: 0,
                  resizable: true,
                  pinned: 'right'
                });
            }
            event.api.setColumnDefs(columnDefs);
          } else {
            console.log('else')
            columnDefs.splice(6, 4);
            event.api.setColumnDefs(columnDefs);
          }
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


  certify() {
    const payload = {
      "ids": this.bulkOperationList,
      "status": "CERTIFIED"
    }
    this.store.dispatch(new CertifyDeliveryBoy(payload))

    this.apiMsgService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.certifyDeliveryBoy) {
        this.store.dispatch(new GetDeliveryBoyByStatus({
          "pageNo": this.pageNo,
          "status": this.status,
          "requestBody": this.payLoadForSearch
        }));
      }
    })
  }


  approveDE() {
    const payload = {
      "ids": this.bulkOperationList,
      "status": "APPROVED"
    }
    this.store.dispatch(new CertifyDeliveryBoy(payload))

    this.apiMsgService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.certifyDeliveryBoy) {
        this.store.dispatch(new GetDeliveryBoyByStatus({
          "pageNo": this.pageNo,
          "status": this.status,
          "requestBody": this.payLoadForSearch
        }));
      }
    })
  }



}
