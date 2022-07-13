import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { brandManagementState } from '../../../../../reducers/brand-management.reducers';
import { GetPendingBrands } from '../../../../../actions/brand-management.actions';
import * as moment from 'moment';
import { PendingCellRendererButtonComponent } from '../../../components/pending-cell-renderer-button/pending-cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-pending-brand',
  templateUrl: './pending-brand.component.html',
  styleUrls: ['./pending-brand.component.css'],
})
export class PendingBrandComponent implements OnInit {
  public brands = [];

  constructor(
    private store: Store<brandManagementState>,
    private ag: AgGridOptions
  ) { }

  ngOnInit() {
  }

  columnDefs = [
    {
      field: 'code',
      headerName: 'Request No',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Request Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var cellDate = new Date(cellValue);
          var filterDate = new Date(filterLocalDateAtMidnight)
          if (filterDate.toLocaleDateString() === cellDate.toLocaleDateString()) {
            return 0;
          }
          if (filterDate.toLocaleDateString() < cellDate.toLocaleDateString()) {
            return -1;
          }
          if (filterDate.toLocaleDateString() > cellDate.toLocaleDateString()) {
            return 1;
          }
        }
      },
      // cellRenderer: params => {
      //   return moment(params.data.createdAt, 'x').format('MMM, DD YYYY LTS')
      // },
      resizable: true,
    },
    {
      field: 'brandName',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    // {
    //   headerName: 'Release Date',
    //   field: 'releaseDate',
    // filter: 'agDateColumnFilter',
    // filterParams: {
    //   comparator: function (filterLocalDateAtMidnight, cellValue) {
    //     var dateAsLong = cellValue;
    //     console.log("filterLocalDateAtMidnight moment date string() ::", moment(filterLocalDateAtMidnight.getTime()).format('DD/MM/YYYY'));
    //     console.log("dateAsString moment date string() ::", moment(dateAsLong).format('DD/MM/YYYY'));
    //     console.log("filterLocalDateAtMidnight.getTime() ::", filterLocalDateAtMidnight.getTime());
    //     console.log("dateAsLong ::", dateAsLong);
    //     // var cellDate = new Date(dateAsLong);
    //     filterLocalDateAtMidnight = new Date(filterLocalDateAtMidnight.getTime());

    //     if (filterLocalDateAtMidnight.getTime() === dateAsLong) {
    //       return 0;
    //     }
    //     if (dateAsLong < filterLocalDateAtMidnight.getTime()) {
    //       return -1;
    //     }
    //     if (dateAsLong > filterLocalDateAtMidnight.getTime()) {
    //       return 1;
    //     }
    //   }
    // },
    // cellRenderer: (params) => {
    //   console.log("data.releaseDate", params.data.releaseDate);
    //   return moment(params.data.releaseDate).format('DD/MM/YYYY');
    // },
    //   resizable: true,
    // },
    {
      field: 'brandShortName',
      headerName: 'Short Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },

    {
      field: 'type',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'createdBy',
      headerName: 'Requested By',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Action',
      // field: 'value',
      // colId: 'params',
      cellRendererFramework: PendingCellRendererButtonComponent,
      btnName: [
        { name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' },
        { name: 'Disable', btnTxtColor: '#fff', btnColor: '#F4516C' },
      ],
      sortable: false,
      filter: false,
      // floatingFiltersHeight: 0,
      resizable: true,
      suppressSizeToFit: true,
      width: 120
    },
  ];

  // rowData = [
  //     { requestNo: '', requestDate: '', type: '', requestBy: '', pendingSince:'', action: '',},
  // ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }



  onGridReady(event) {
    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      this.brands = res['pendingBrands'];
      if (this.brands !== null) {
        event.api.setRowData(this.serializeData(this.brands));
      } else {
        this.store.dispatch(new GetPendingBrands());
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  serializeData(data) {
    const serilizeData = [];
    data.map(item => {
      //console.log("Created at::::::::::::::::", item.createdAt)
      const rquest = JSON.parse(item.request);
      serilizeData.push({
        code: item.code,
        id: item.id,
        remarks: item.remarks,
        active: rquest.active,
        brandLogoUrl: rquest.brandLogoUrl,
        brandName: rquest.brandName,
        brandShortName: rquest.brandShortName,
        createdAt: moment(item.createdAt, 'x').format('MMM, DD YYYY LTS'),
        createdBy: rquest.createdBy,
        type: item.type,
      });
    });
    return serilizeData;
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
