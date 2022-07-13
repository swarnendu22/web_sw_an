import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { Subscription } from '../../../../../../../node_modules/aws-sdk/clients/shield';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { GetFlashSalesList } from '../../../../../actions/banner-management.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-flash-sales-list',
  templateUrl: './flash-sales-list.component.html',
  styleUrls: ['./flash-sales-list.component.css']
})
export class FlashSalesListComponent implements OnInit {


  columnDefs = [

    { headerName: 'Title', field: 'title' },
    { headerName: 'Description', field: 'description' },
    {
      headerName: 'Start Time',
      field: 'start_time',
      cellRenderer: data => {
        return moment(data.value, "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm')
      },
    },
    {
      headerName: 'End Time',
      field: 'end_time',
      cellRenderer: data => {
        return moment(data.value, "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm')
      },
    },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      cellRendererFramework: CellRendererButtonComponent,
      sortable: false,
      filter: false,
      resizable: true,
      suppressSizeToFit: true,
      pinned: 'right'
    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter'
  };

  rowData = [];
  allFlashSalesList = null;
  constructor(private store: Store<any>) {
    this.store.dispatch(new GetFlashSalesList());
  }

  ngOnInit() {
    // this.store.dispatch(new GetFlashSalesList());
  }



  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.store.pipe(select('bannerManagement')).subscribe(res => {

      this.allFlashSalesList = res.allFlashSalesList;
      if (this.allFlashSalesList) {
        this.rowData = this.allFlashSalesList;
        event.api.setRowData(this.rowData);
      }

    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
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
}
