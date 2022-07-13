import { Component, OnInit } from '@angular/core';
import { CellRendererDeliveryBoyCancelPickupsComponent } from '../../components/cell-renderer-delivery-boy-cancel-pickups/cell-renderer-delivery-boy-cancel-pickups.component';
import { GetDeliveryBoyCancelPickups, ApproveRejectDeliveryBoyCancelPickups } from 'src/app/actions/delivery-boy-management.action';
import { select, Store } from '@ngrx/store';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { FilterDeliveryBoyCancelPickupsComponent } from '../filter-delivery-boy-cancel-pickups/filter-delivery-boy-cancel-pickups.component';
import { ApproveRejectDeliveryBoyCancelPickupsComponent } from '../approve-reject-delivery-boy-cancel-pickups/approve-reject-delivery-boy-cancel-pickups.component';

@Component({
  selector: 'app-delivery-boy-cancel-pickups',
  templateUrl: './delivery-boy-cancel-pickups.component.html',
  styleUrls: ['./delivery-boy-cancel-pickups.component.css']
})
export class DeliveryBoyCancelPickupsComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  payLoadForSearch = {
    search: 'PENDING',
  }
  constructor(private ag: AgGridOptions,
    // tslint:disable-next-line: align
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'seller_order_delivery_agent',
        resizable: true,
        cellRenderer: (data) => {
          console.log('Data', data.data)
          if (data.value) {
            return `${data.data.seller_order_delivery_agent.order_assigner_name}`
          }
        }
      },
      {
        headerName: 'Comment',
        field: 'comment',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Reasons',
        field: 'reasons',
        resizable: true,
        sortable: true,

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
        cellRendererFramework: CellRendererDeliveryBoyCancelPickupsComponent,
        cellRendererParams: {
          onActionBtnClick: this.rejectApproveOperation.bind(this),
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
    this.store.dispatch(new GetDeliveryBoyCancelPickups({ status: null }));

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  rejectApproveOperation(data) {
    const dialog = this.dialog.open(ApproveRejectDeliveryBoyCancelPickupsComponent, {
      minHeight: '300px',
      minWidth: '450px',

    });

    dialog.afterClosed().subscribe(result => {
      // console.log(result)
      // if (result) {
      //   this.store.dispatch(new ApproveRejectDeliveryBoyCancelPickups({},2))
      //   this.apiMsgService.currentApiStatus.subscribe((response) => {
      //     if (response.status && response.type == 'APPROVE_REJECT_DELIVERY_BOY_CANCEL_PICKUPS') {
      //       this.store.dispatch(new ApproveRejectDeliveryBoyCancelPickups({},3));
      //     }
      //   })
      // }
    });
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

  // getPageNoData(page: number) {
  //   console.log(page);
  //   this.pageNo = page;
  //   this.store.dispatch(new GetDeliveryBoys({
  //     "pageNo": this.pageNo,
  //     "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'PENDING',
  //     "requestBody": this.payLoadForSearch }));
  // }
  // nextPage(event) {
  //   console.log(event);
  //   // this.p = event;
  //   this.pageNo += 1;
  //   this.store.dispatch(new GetDeliveryBoys({
  //     "pageNo": this.pageNo,
  //     "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'PENDING',
  //     "requestBody": this.payLoadForSearch
  //   }));
  // }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.cancelPickups) {
          console.log(res.cancelPickups['cancel_pickups'])

          this.rowData = res.cancelPickups['cancel_pickups'];
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
    const dialog = this.dialog.open(FilterDeliveryBoyCancelPickupsComponent, {
      panelClass: 'filter-modal',
      height: '10px',
      data: { payLoadForSearch: this.payLoadForSearch }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.payLoadForSearch = result;
        this.store.dispatch(new GetDeliveryBoyCancelPickups({ status: this.payLoadForSearch.search }));
      }
    });
  }


}
