import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { GetAppVersion } from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import * as moment from 'moment';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-app-version-management',
  templateUrl: './app-version-management.component.html',
  styleUrls: ['./app-version-management.component.css'],
})
export class AppVersionManagementComponent implements OnInit {
  frameworkComponents;
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetAppVersion());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['appVersions'] ? res['appVersions']['payload'] : '';
    });


  }

  columnDefs = [
    {
      headerName: 'Version Number',
      field: 'versionNumber',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Product Description',
      field: 'productDesc',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Release Date',
      field: 'releaseDate',
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsLong = cellValue;
          console.log("filterLocalDateAtMidnight moment date string() ::", moment(filterLocalDateAtMidnight.getTime()).format('DD/MM/YYYY'));
          console.log("dateAsString moment date string() ::", moment(dateAsLong).format('DD/MM/YYYY'));
          console.log("filterLocalDateAtMidnight.getTime() ::", filterLocalDateAtMidnight.getTime());
          console.log("dateAsLong ::", dateAsLong);
          // var cellDate = new Date(dateAsLong);
          filterLocalDateAtMidnight = new Date(filterLocalDateAtMidnight.getTime());

          if (filterLocalDateAtMidnight.getTime() === dateAsLong) {
            return 0;
          }
          if (dateAsLong < filterLocalDateAtMidnight.getTime()) {
            return -1;
          }
          if (dateAsLong > filterLocalDateAtMidnight.getTime()) {
            return 1;
          }
        }
      },
      cellRenderer: (params) => {
        console.log("data.releaseDate", params.data.releaseDate);
        return moment(params.data.releaseDate).format('DD/MM/YYYY');
      },
      resizable: true,
    },
    {
      headerName: 'OS',
      field: 'os',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Mandatory',
      field: 'isMandatory',
      valueGetter: params => {
        console.log(
          'Pras',
          params.data.isMandatory,
          typeof params.data.isMandatory
        );
        if (
          params.data.isMandatory === '1' ||
          params.data.isMandatory === true
        ) {
          return 'Yes';
        } else if (params.data.isMandatory === false) {
          return 'No';
        } else {
          return ' ';
        }
      },
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      width: 180,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      resizable: false,
    },
  ];

  rowData = [
    {
      versionNumber: '2.1.0',
      releaseDocument: 'Attached',
      releaseDate: '10/2/2019',
      os: 'Android',
      mandatory: 'Yes',
    },
  ];
  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
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
