import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';


@Component({
  selector: 'app-delivery-boy-history',
  templateUrl: './delivery-boy-history.component.html',
  styleUrls: ['./delivery-boy-history.component.css']
})
export class DeliveryBoyHistoryComponent implements OnInit {

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
        headerName: 'Date',
        field: 'id',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Order ID',
        field: 'name',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Purpose',
        field: 'phone',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Amount',
        resizable: true,
        field: 'email',
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

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  selectDeliveryBoy(e) {
    console.log("Select DB", e)
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
