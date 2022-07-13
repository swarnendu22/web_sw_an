import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { brandManagementState } from '../../../../../reducers/brand-management.reducers';
import { GetInactiveBrands } from '../../../../../actions/brand-management.actions';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-in-active-brand',
  templateUrl: './in-active-brand.component.html',
  styleUrls: ['./in-active-brand.component.css'],
})
export class InActiveBrandComponent implements OnInit {
  public brands = [];
  public gridEvent = null;

  constructor(
    private store: Store<brandManagementState>,
    private ag: AgGridOptions
  ) {
  }

  ngOnInit() { }

  columnDefs = [
    {
      field: 'brandLogoUrl',
      headerName: 'Logo',
      width: 100,
      sortable: false,
      resizable: false,
      filter: false,
      cellRenderer: params =>
        params['data'] && params['data']['brandLogoUrl']
          ? `<img src="${params['data']['brandLogoUrl']}" alt="" height="25" width="25">`
          : '',
    },
    {
      field: 'brandName',
      headerName: 'Brand Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    // {
    //   field: 'brandShortName',
    //   headerName: 'Short Name',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    // },
    // {
    //   field: 'isPrimiumBrand',
    //   headerName: 'Premium Brand',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    //   valueGetter: params => {
    //     if (params.data.isPrimiumBrand === 1) {
    //       return 'Yes';
    //     } else {
    //       return 'No';
    //     }
    //   },
    // },
    // {
    //   field: 'isRequiredAuthorisation',
    //   headerName: 'Required Authorisation',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    //   valueGetter: params => {
    //     if (params.data.isRequiredAuthorisation === 1) {
    //       return 'Yes';
    //     } else {
    //       return 'No';
    //     }
    //   },
    // },
    {
      headerName: 'Action',
      cellRendererFramework: CellRendererButtonComponent,
      width: 120,
      btnName: [
        { name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' },
        { name: 'Disable', btnTxtColor: '#fff', btnColor: '#F4516C' },
      ],
      sortable: false,
      filter: false,
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
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
    this.gridEvent = event;
    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      this.brands = res['inactiveBrands'];
      if (this.brands !== null) {
        this.gridEvent.api.setRowData(this.brands);
      } else {
        this.store.dispatch(new GetInactiveBrands());
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
}
