import { Component, OnInit, Input } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { DeliveryBoyActionPopupComponent } from '../delivery-boy-action-popup/delivery-boy-action-popup.component';
import { GetDeliveryBoys } from 'src/app/actions/merchant-management.actions';
import { GetDeliveryBoyByStatus, DeliveryBoyForceAction, UpdateDeliveryBoyStatus } from 'src/app/actions/delivery-boy-management.action';
import * as moment from 'moment';
import { CellRendererDeliveryBoysComponent } from '../../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';

@Component({
  selector: 'app-delivery-boy-dashboard-listview',
  templateUrl: './delivery-boy-dashboard-listview.component.html',
  styleUrls: ['./delivery-boy-dashboard-listview.component.css']
})
export class DeliveryBoyDashboardListviewComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  selectedDE = [];
  pageNo = 1;
  totalRecords = null;
  searchTerm = null;
  payLoadForSearch = {
    search: '',
    state_name: null,
    area: null,
    vehicle_type: null,
    active_inactive: [true, false],
    availability_status: ['IDEAL', 'CHECK-IN', 'OCCUPIED'],
    active: true,
    inactive: true,
    free: true,
    occupied: true
  };

  @Input() searchPayload = null;
  constructor(private ag: AgGridOptions,
    private store: Store<any>, private dialog: MatDialog, private buttomSheet: MatBottomSheet, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'DE ID',
        field: 'registration_number',
        resizable: true,
        sortable: true,
        width: 200,
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
        width: 350,
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
    // this.store.dispatch(new GetDeliveryBoyByStatus({
    //   "pageNo": this.pageNo,
    //   "status": '',
    //   "requestBody": this.payLoadForSearch
    // }));
    this.apiMsgService.currentApiStatus.subscribe(data => {
      if (data.status && data.type === 'SEARCH_PAYLOAD_DE_DASHBOARD') {

        console.log('PAYLOAD', data.payload)
        this.payLoadForSearch['state_name'] = data.payload['state_name'] ? data.payload['state_name'] : ''
        // tslint:disable-next-line: no-string-literal
        this.payLoadForSearch['vehicle_type'] = data.payload['vehicle_type'] ? data.payload['vehicle_type'] : ''
        this.payLoadForSearch['area'] = data.payload['area'] ? data.payload['area'] : ''
        this.payLoadForSearch['active_inactive'] = data.payload['active_inactive']
        this.payLoadForSearch['availability_status'] = data.payload['availability_status']

        this.store.dispatch(new GetDeliveryBoyByStatus({
          "pageNo": this.pageNo,
          "status": '',
          "requestBody": this.payLoadForSearch
        }));
        // this.payLoadForSearch = data.payload;
      }
    })
  }

  search() {
    this.payLoadForSearch['search'] = this.searchTerm;
    this.store.dispatch(new GetDeliveryBoyByStatus({
      "pageNo": this.pageNo,
      "status": '',
      "requestBody": this.payLoadForSearch
    }));
  }


  deliveryBoyActionPopup(item) {
    console.log('DE Action', item.value)
    if (item.value === 'FORCE_LOGIN' || item.value === 'FORCE_LOGOUT') {
      let payload = {
        ids: this.selectedDE,
        is_live: item.value === 'FORCE_LOGIN' ? true : false
      }

      this.store.dispatch(new DeliveryBoyForceAction(payload))

      // tslint:disable-next-line: align
    } else {
      let payload = {
        ids: this.selectedDE,
        status: item.value
      }
      this.store.dispatch(new UpdateDeliveryBoyStatus(payload))
      this.apiMsgService.currentApiStatus.subscribe(data => {
        if (data.status && data.type === 'UPDATE_DELIVERY_BOY_STATUS') {

          this.store.dispatch(new GetDeliveryBoyByStatus({
            "pageNo": this.pageNo,
            "status": '',
            "requestBody": this.payLoadForSearch
          }));
        }
      })
    }

  }
  selectDeliveryBoy(e) {
    const index = this.selectedDE.indexOf(e.id);
    if (index > -1) {
      this.selectedDE.splice(index, 1);
    } else {
      this.selectedDE.push(e.id);
    }
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
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
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }

}
