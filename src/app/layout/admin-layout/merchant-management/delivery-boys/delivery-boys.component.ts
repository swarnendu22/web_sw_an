import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import * as moment from 'moment';
import { GetDeliveryBoys, ApproveRrejectDeliveryBoys, ActionTypes } from '../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { FilterDeliveryBoysComponent } from '../../delivery-boy-management/components/filter-delivery-boys/filter-delivery-boys.component';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { DeliveryBoyAreaOperationsComponent } from '../../delivery-boy-management/components/delivery-boy-area-operations/delivery-boy-area-operations.component';

@Component({
  selector: 'app-delivery-boys',
  templateUrl: './delivery-boys.component.html',
  styleUrls: ['./delivery-boys.component.css']
})
export class DeliveryBoysComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  payLoadForSearch = {
    search: 'PENDING',
    state_name: null,
    vehicle_type: null
  }
  constructor(private ag: AgGridOptions,
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'Photo',
        field: 'photo_url',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return `<img src=${data.value}?w=40&h=40 width=40 height=40 >`
        }
      },
      {
        headerName: 'Name',
        field: 'name',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Phone',
        field: 'phone',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Email',
        resizable: true,
        field: 'email',
      },


      {
        headerName: 'State',
        field: 'driving_licence_state',
        resizable: true,

      },
      {
        headerName: 'Vehicle Type',
        field: 'vehicle_type',
        resizable: true,
      },
      {
        headerName: 'License No',
        field: 'driving_license_number',
        resizable: true,
        cellRenderer: (data) => {
          if (data.value) {
            return `<a target="_blank" href="${data.data.driving_license_front_page_url}">${data.value}</a>`
          }
        }
      },
      {
        headerName: 'Pan Card',
        field: 'pan_card_number',
        resizable: true,
        cellRenderer: (data) => {
          if (data.value) {
            return `<a target="_blank" href="${data.data.pan_card_photo_url}">${data.value}</a>`

          }
        }
      },
      {
        headerName: 'Status',
        field: 'status',
        resizable: true
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: CellRendererDeliveryBoysComponent,
        cellRendererParams: {
          // onActionBtnClick: this.rejectApproveOperation.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
        pinned: 'right'
      },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetDeliveryBoys({
      "pageNo": this.pageNo,
      "status": 'PENDING',
      "requestBody": this.payLoadForSearch
    }));

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
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
    this.store.dispatch(new GetDeliveryBoys({
      "pageNo": this.pageNo,
      "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'PENDING',
      "requestBody": this.payLoadForSearch
    }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetDeliveryBoys({
      "pageNo": this.pageNo,
      "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'PENDING',
      "requestBody": this.payLoadForSearch
    }));
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.deliveryBoys) {
          console.log(res.deliveryBoys)
          this.totalRecords = res.deliveryBoys.total_record;

          this.rowData = res.deliveryBoys.delivery_boys;
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
        this.store.dispatch(new GetDeliveryBoys({
          pageNo: this.pageNo,
          status: this.payLoadForSearch.search,
          requestBody: this.payLoadForSearch
        }));
      }
    });
  }

}
