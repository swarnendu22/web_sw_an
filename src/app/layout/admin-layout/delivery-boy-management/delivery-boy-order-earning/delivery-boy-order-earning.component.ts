import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererDeliveryBoysComponent } from '../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { GetDeliveryBoys, ApproveRrejectDeliveryBoys, ActionTypes } from 'src/app/actions/merchant-management.actions';
import { DeliveryBoyAreaOperationsComponent } from '../components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { DeliveryBoyActionPopupComponent } from '../components/delivery-boy-action-popup/delivery-boy-action-popup.component';
import { CellRendererOrderVsEarningComponent } from '../../components/cell-renderer-order-vs-earning/cell-renderer-order-vs-earning.component';
import { DeliveryBoyEarningBreakupComponent } from '../components/delivery-boy-earning-breakup/delivery-boy-earning-breakup.component';


@Component({
  selector: 'app-delivery-boy-order-earning',
  templateUrl: './delivery-boy-order-earning.component.html',
  styleUrls: ['./delivery-boy-order-earning.component.css']
})
export class DeliveryBoyOrderEarningComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  payLoadForSearch = {
    search: 'APPROVED',
    state_name: null,
    vehicle_type: null
  }
  constructor(private ag: AgGridOptions,
    private store: Store<any>, private dialog: MatDialog, private buttomSheet: MatBottomSheet, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'DE ID',
        field: 'id',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Date',
        field: 'name',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'OE',
        field: 'phone',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'MG',
        resizable: true,
        field: 'email',
      },


      {
        headerName: 'Earning',
        field: 'driving_licence_state',
        resizable: true,

      },
      {
        headerName: 'Login',
        field: 'vehicle_type',
        resizable: true,
        cellRenderer: (data) => {
          return '<div class="circle"></div>'
        }
      },
      {
        headerName: 'Order Count',
        field: 'driving_license_number',
        resizable: true,
        cellRenderer: (data) => {
          if (data.value) {
            return `<a target="_blank" href="${data.data.driving_license_front_page_url}">${data.value}</a>`
          }
        }
      },
      {
        headerName: 'Rejection',
        field: 'pan_card_number',
        resizable: true,
        cellRenderer: (data) => {
          if (data.value) {
            return `<a target="_blank" href="${data.data.pan_card_photo_url}">${data.value}</a>`

          }
        }
      },
      {
        headerName: 'Denied',
        field: 'status',
        resizable: true
      },
      {
        headerName: 'View',
        field: 'value',
        colId: 'params',
        cellRendererFramework: CellRendererOrderVsEarningComponent,
        cellRendererParams: {
          onActionBtnClick: this.earningBreakup.bind(this),
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
      "status": 'APPROVED',
      "requestBody": this.payLoadForSearch
    }));

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  selectDeliveryBoy(e) {
    console.log("Select DB", e)
  }


  earningBreakup() {
    const dialog = this.dialog.open(DeliveryBoyEarningBreakupComponent, {
      minHeight: '300px',
      minWidth: '950px',
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

  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    this.store.dispatch(new GetDeliveryBoys({
      "pageNo": this.pageNo,
      "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'APPROVED',
      "requestBody": this.payLoadForSearch
    }));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    this.pageNo += 1;
    this.store.dispatch(new GetDeliveryBoys({
      "pageNo": this.pageNo,
      "status": this.payLoadForSearch ? this.payLoadForSearch.search : 'APPROVED',
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

}
