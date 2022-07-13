import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import {
  GetFulfillmentCenter,
  GetStaticPageManagement,
} from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';

@Component({
  selector: 'app-static-page-management',
  templateUrl: './static-page-management.component.html',
  styleUrls: ['./static-page-management.component.css'],
})
export class StaticPageManagementComponent implements OnInit {
  constructor(private _store: Store<storeManagementState>) {
    this._store.dispatch(new GetStaticPageManagement());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['staticPageManagement']
        ? res['staticPageManagement']['payload']
        : '';
      // console.log('rowdata', res);
    });
  }

  columnDefs = [
    {
      headerName: 'Page',
      field: 'pageCode',
      filterable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Static Page Name',
      field: 'staticPageName',
      filterable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Content',
      field: 'data',
      filterable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Type',
      field: 'format',
      filter: 'agTextColumnFilter',
      filterable: true,
      resizable: true,
    },
    // {
    //   headerName: 'Last Modofied Date',
    //   field: 'lastModofiedDate',
    //   filterable: true,
    //   resizable: true,
    // },
    {
      headerName: 'Active',
      field: 'active',
      valueGetter: params => {
        console.log(params.data.active, typeof params.data.active);
        if (params.data.active === true) {
          return 'Yes';
        } else if (params.data.active === false) {
          console.log('false');
          return 'No';
        }
      },
      filterable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
    },

    {
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: false,
    },
  ];

  rowData = [
    {
      page: '101',
      staticPageName: 'Terms & Conditions',
      content: 'This document is an electronic....',
      type: 'FORMATED',
      lastModofiedDate: '14/06/2019 12:32:12',
    },
  ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
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
