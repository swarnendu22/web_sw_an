import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { GetDeliveryBoys, ApproveRrejectDeliveryBoys, ActionTypes } from 'src/app/actions/merchant-management.actions';
import { DeliveryBoyAreaOperationsComponent } from '../components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { DeliveryBoyActionPopupComponent } from '../components/delivery-boy-action-popup/delivery-boy-action-popup.component';
import { UpdateDeliveryBoyStatus, DeliveryBoyForceAction, GetRegionsByCountryCode, GetZoneByRegionCode, GetDeliveryBoyByStatus } from 'src/app/actions/delivery-boy-management.action';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-approved-delivery-boy',
  templateUrl: './approved-delivery-boy.component.html',
  styleUrls: ['./approved-delivery-boy.component.css']
})
export class ApprovedDeliveryBoyComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  selectedDE = [];
  regionList = [];
  zoneList = [];
  vehicleType: null;
  city: null;
  area: null;
  zone: null;
  state_name: {};
  searchTerm: '';
  payLoadForSearch = {
    search: '',
    state_name: null,
    vehicle_type: null,
    area: null,
  }

  DEAction = new FormControl();

  constructor(private ag: AgGridOptions,
    private store: Store<any>, private dialog: MatDialog, private buttomSheet: MatBottomSheet, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'DE ID',
        field: 'registration_number',
        resizable: true,
        sortable: true,
        cellRendererFramework: CellRendererDeliveryBoysComponent,
        cellRendererParams: {
          onMultiSelect: this.selectDeliveryBoy.bind(this)
        },
      },
      {
        headerName: 'Name',
        field: 'name',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Mobile No.',
        field: 'phone',
        resizable: true,
        sortable: true,
      },
      // {
      //   headerName: 'Alt No.',
      //   resizable: true,
      //   field: 'alit_no',
      // },


      {
        headerName: 'Last Seen',
        field: 'last_seen',
        resizable: true,
        cellRenderer: (data) => {
          if (data.data.last_seen) {
            return moment(data.data.last_seen.date).format('lll')
          }
        }

      },
      {
        headerName: 'Status',
        field: 'is_live',
        resizable: true,
        cellRenderer: (data) => {
          if (data.value === true) {
            return '<div class="status-circle-green"></div>'
          } else {
            return '<div class="status-circle-red"></div>'
          }
        }
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
        headerName: 'Vehicle',
        field: 'vehicle_type',
        resizable: true
      },
      // {
      //   headerName: 'Action',
      //   field: 'value',
      //   colId: 'params',
      //   cellRendererFramework: CellRendererDeliveryBoysComponent,
      //   cellRendererParams: {
      //     onActionBtnClick: this.rejectApproveOperation.bind(this),
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
    this.store.dispatch(new GetRegionsByCountryCode());
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": 'APPROVED',
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

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  selectDeliveryBoy(params) {
    console.log('EEE', params)
    if (params) {
      let index = this.selectedDE.indexOf(params.allData.id);
      if (params.checkboxValue) {
        if (index < 0) {
          this.selectedDE.push(params.allData.id);
        }
      } else {
        this.selectedDE.splice(index, 1);
      }
    }
    // const index = this.selectedDE.indexOf(params.allData.id);
    // if (index > -1) {
    //   this.selectedDE.splice(index, 1);
    //   console.log('after splice inside selectDeliveryBoy(e)-->', this.selectedDE.splice(index, 1));
    // } else {
    //   this.selectedDE.push(params.allData.id);
    // }
    console.log('Selected DB', this.selectedDE)
  }

  deliveryBoyActionPopup(item) {
    console.log('DE Action', item.value);
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name,
      vehicle_type: this.vehicleType,
      area: this.area
    }
    if (item.value === 'FORCE_LOGIN' || item.value === 'FORCE_LOGOUT') {
      // let payload = {
      //   ids: this.selectedDE,
      //   is_live: item.value === 'FORCE_LOGIN' ? true : false
      // }

      const dialogData = this.dialog.open(DeliveryBoyActionPopupComponent, {
        data: {
          payload: {
            ids: this.selectedDE,
            is_live: item.value === 'FORCE_LOGIN' ? true : false
          },
          DE: 'ACTIVE',
          DE_ACTION: item.value
        },
        disableClose: true
      });

      dialogData.afterClosed().subscribe(result => {
        if (!result) {
          this.DEAction.reset();
        }
      })

      // this.store.dispatch(new DeliveryBoyForceAction(payload))
      this.apiMsgService.currentApiStatus.subscribe(data => {
        if (data.status && data.type === 'DELIVERY_BOY_FORCE_ACTION') {
          this.DEAction.reset();
          this.selectedDE = []
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": 'APPROVED',
            "requestBody": payLoadForSearch
          }));
        }
      })

      // tslint:disable-next-line: align
    } else {

      const dialogData = this.dialog.open(DeliveryBoyActionPopupComponent, {
        data: {
          payload: {
            ids: this.selectedDE,
            status: item.value
          },
          DE: 'ACTIVE',
          DE_ACTION: item.value
        },
        disableClose: true
      });
      dialogData.afterClosed().subscribe(result => {
        if (!result) {
          this.DEAction.reset();
        }
      })
      // let payload = {
      //   ids: this.selectedDE,
      //   status: item.value
      // }
      // this.store.dispatch(new UpdateDeliveryBoyStatus(payload))
      this.apiMsgService.currentApiStatus.subscribe(data => {
        if (data.status && data.type === 'UPDATE_DELIVERY_BOY_STATUS') {
          this.DEAction.reset();
          this.selectedDE = []
          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": 'APPROVED',
            "requestBody": payLoadForSearch
          }));
        }
      })
    }

  }


  search() {
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name, //this.state_name ? this.state_name['regionName'] : '',
      vehicle_type: this.vehicleType,
      area: this.area
    }

    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": 'APPROVED',
      "requestBody": payLoadForSearch
    }));
  }

  selectRegion(e) {
    console.log('Select', e.value)
    this.area = null;
    this.state_name = e.value;
    // this.store.dispatch(new GetZoneByRegionCode({ regionCode: e.value.regionCode }));
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
      "status": 'APPROVED',
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
      "status": 'APPROVED',
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
        if (res.regionsList) {
          console.log(res.regionsList);
          this.regionList = res.regionsList;
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
