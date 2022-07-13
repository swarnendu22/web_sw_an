import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';
import { GetDeliveryBoys, ApproveRrejectDeliveryBoys, ActionTypes, GetDeliveryBoysOrder } from '../../../../actions/merchant-management.actions';
import { MatDialog } from '@angular/material/dialog';
import { FilterDeliveryBoysComponent } from '../../delivery-boy-management/components/filter-delivery-boys/filter-delivery-boys.component';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { DeliveryBoyAreaOperationsComponent } from '../../delivery-boy-management/components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { ActivatedRoute } from '@angular/router';
import { CellRendererDeliveryBoysOrderComponent } from '../../components/cell-renderer-delivery-boys-order/cell-renderer-delivery-boys-order.component';

@Component({
  selector: 'app-delivery-boy-orders',
  templateUrl: './delivery-boy-orders.component.html',
  styleUrls: ['./delivery-boy-orders.component.css']
})
export class DeliveryBoyOrdersComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  id = null;
  totalRecords = null;
  payLoadForSearch = null
  constructor(private ag: AgGridOptions,
    // tslint:disable-next-line: align
    private store: Store<any>, private dialog: MatDialog, private route: ActivatedRoute, private apiMsgService: ApiMessageService) {
    this.id = this.route.snapshot.params.id;


    this.columnDefs = [
      // {
      //   headerName: 'Photo',
      //   field: 'photo_url',
      //   resizable: true,
      //   sortable: true,
      //   cellRenderer: (data) => {
      //     return `<img src=${data.value}?w=40&h=40 width=40 height=40 >`
      //   }
      // },
      {
        headerName: 'Name',
        field: 'order_assigner_name',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Type',
        field: 'order_assigner_user_type',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Order ID',
        field: 'order_id',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Source Address',
        resizable: true,
        field: 'source_address',
        tooltip: (p) => {
          return p.value;
        }
      },
      {
        headerName: 'Destination Address',
        resizable: true,
        field: 'destination_address',
        tooltip: (p) => {
          return p.value;
        }
      },


      {
        headerName: 'Charges',
        field: 'charge',
        resizable: true,

      },
      {
        headerName: 'Accepted Order At',
        field: 'accepted_at',
        resizable: true,
        cellRenderer: data => {
          return moment(data.value, "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm')
        },
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
        cellRendererFramework: CellRendererDeliveryBoysOrderComponent,
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
    this.store.dispatch(new GetDeliveryBoysOrder({ "pageNo": this.pageNo, "body": { id: this.id, status: 'ACCEPTED' } }));

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
        if (res.deliveryBoyOrder) {
          console.log('Delivery Boy Delivery', res.deliveryBoyOrder)
          this.totalRecords = res.deliveryBoyOrder.delivery_boy_orders.length;

          this.rowData = res.deliveryBoyOrder.delivery_boy_orders;
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
