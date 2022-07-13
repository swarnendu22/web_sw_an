import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';
import {
  GetDeliveryBoys,
  ApproveRrejectDeliveryBoys,
  ActionTypes,
  GetDeliveryBoysOrder,
  GetDeliveryBoyShifts
} from '../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { FilterDeliveryBoysComponent } from '../components/filter-delivery-boys/filter-delivery-boys.component';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { DeliveryBoyAreaOperationsComponent } from '../components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-driver-shift-details',
  templateUrl: './driver-shift-details.component.html',
  styleUrls: ['./driver-shift-details.component.css']
})
export class DriverShiftDetailsComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private autoGroupColumnDef;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  id = null;
  totalRecords = null;
  payLoadForSearch = null
  fromDate = new FormControl(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  toDate = new FormControl(new Date())
  constructor(private ag: AgGridOptions,
    // tslint:disable-next-line: align
    private store: Store<any>, private dialog: MatDialog, private route: ActivatedRoute, private apiMsgService: ApiMessageService) {
    this.id = this.route.snapshot.params.id;


    this.columnDefs = [
      {
        headerName: 'Slot Date',
        field: 'slot_history_date',
        resizable: true,
        sortable: true,
        rowGroup: true,
      },
      {
        headerName: 'From Time',
        field: 'from_time',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value, 'x').format('LT')

          }
        }
      },
      {
        headerName: 'To Time',
        resizable: true,
        sortable: true,
        field: 'to_time',
        cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value, 'x').format('LT')

          }
        }
      },


      {
        headerName: 'Total Duration',
        field: 'total_slot_duration',
        resizable: true,
        sortable: true,
        aggFunc: 'sum',
        cellRenderer: (data) => {
          if (data.value) {
            return this.convertMS(data.value)

          }
        }

      }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetDeliveryBoyShifts({ "pageNo": this.pageNo, "body": { id: this.id, from_date: this.fromDate.value, to_date: this.toDate.value } }));
  }


  searchShift() {
    // tslint:disable-next-line: max-line-length
    this.store.dispatch(new GetDeliveryBoyShifts({ "pageNo": this.pageNo, "body": { id: this.id, from_date: moment(this.fromDate.value).startOf('day').toString(), to_date: moment(this.toDate.value).startOf('day').toString() } }));

  }

  clearShift() {
    this.fromDate.setValue(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    this.toDate.setValue(new Date());
    // tslint:disable-next-line: max-line-length
    this.store.dispatch(new GetDeliveryBoyShifts({ "pageNo": this.pageNo, "body": { id: this.id, from_date: moment(this.fromDate.value).startOf('day').toString(), to_date: moment(this.toDate.value).startOf('day').toString() } }));

  }

  fromDateChange(e) {
    this.fromDate.setValue(e.target.value);
    this.toDate.setValue(new Date());
  }
  toDateChange(e) {
    this.toDate.setValue(e.target.value);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    // day = Math.floor(hour / 24);
    // hour = hour % 24;
    return `${hour}:${minute}:${seconds}`
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
  //             "status": this.payLoadForSearch ? this.payLoadForSearch.status : 'PENDING'
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
    this.store.dispatch(new GetDeliveryBoys({ "pageNo": this.pageNo, "status": this.payLoadForSearch ? this.payLoadForSearch.status : 'PENDING' }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetDeliveryBoys({ "pageNo": this.pageNo, "status": this.payLoadForSearch ? this.payLoadForSearch.status : 'PENDING' }));
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.deliveryBoyShifts) {
          console.log('Delivery Boy Shifts...........', res.deliveryBoyShifts)
          this.totalRecords = res.deliveryBoyShifts.total_record;

          this.rowData = res.deliveryBoyShifts.delivery_boy_shifts;
          event.api.setRowData(this.rowData);


        }
      });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

  }

  openFilter() {
    const dialog = this.dialog.open(FilterDeliveryBoysComponent, {
      panelClass: 'filter-modal',
      height: '10px',
      data: { payLoadForSearch: this.payLoadForSearch }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.pageNo = 1;
        this.payLoadForSearch = result;
        this.store.dispatch(new GetDeliveryBoys({ pageNo: this.pageNo, status: this.payLoadForSearch.status, requestBody: this.payLoadForSearch }));
      }
    });
  }

}
