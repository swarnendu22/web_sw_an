import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../reducers/storemanagement.reducers';
import { GetProductAttribute } from '../../../../actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.css'],
})
export class ProductAttributeComponent implements OnInit {
  public defaultColDef;
  public columnDefs;
  public rowData;
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  attributes = null;

  constructor(private store: Store<categoryState>, private ag: AgGridOptions) {
    this.store.dispatch(new GetProductAttribute());

    this.columnDefs = [
      {
        headerName: 'Group Name',
        filter: 'agTextColumnFilter',
        field: 'groupId',
        resizable: true,
        // minWidth: 100,
        filterable: true,
        valueGetter: params => {
          return params.data.groupId.groupName;
        },
      },
      // {
      //   headerName: 'Identifier',
      //   field: 'code',
      //   // minWidth: 100,
      //   resizable: true,
      //   filterable: true,
      //   filter: 'agTextColumnFilter',
      // },
      {
        headerName: 'Product Attribute Name',
        field: 'name',
        // width: 100,
        // minWidth: 100,
        filterable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'type',
        // width: 100,
        // minWidth: 100,
        filterable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
      },
      // {
      //   headerName: 'Variant',
      //   field: 'isVariant',
      //   width: 150,
      //   // minWidth: 100,
      //   filterable: true,
      //   filter: 'agTextColumnFilter',
      //   resizable: true,
      //   valueGetter: params => {
      //     if (params.data.isVariant === true) {
      //       return 'Yes';
      //     } else if (params.data.isVariant === false) {
      //       return 'No';
      //     } else {
      //       return ' ';
      //     }
      //   },
      // },
      // {
      //   headerName: 'Length',
      //   field: 'maxLength',
      //   width: 150,
      //   // width: 100,
      //   // minWidth: 100,
      //   filterable: true,
      //   filter: 'agTextColumnFilter',
      //   resizable: true,
      // },
      // {
      //   field: 'filterable',
      //   // minWidth: 120,
      //   filterable: true,
      //   width: 150,
      //   filter: 'agTextColumnFilter',
      //   resizable: true,
      //   valueGetter: params => {
      //     if (params.data.filterable === true) {
      //       return 'Yes';
      //     } else if (params.data.filterable === false) {
      //       return 'No';
      //     } else {
      //       return ' ';
      //     }
      //   },
      // },
      // {
      //   field: 'searchable',
      //   // width: 100,
      //   // minWidth: 120,
      //   width: 150,
      //   valueGetter: params => {
      //     if (params.data.searchable == 'true') {
      //       return 'Yes';
      //     } else if (params.data.searchable == 'false') {
      //       return 'No';
      //     } else {
      //       return ' ';
      //     }
      //   },
      //   filterable: true,
      //   resizable: true,
      //   filter: 'agTextColumnFilter',
      // },
      // {
      //   field: 'isVisibleOnFront',
      //   // width: 100,
      //   // minWidth: 180,
      //   width: 150,
      //   filter: 'agTextColumnFilter',
      //   resizable: true,
      //   valueGetter: params => {
      //     if (params.data.isVisibleOnFront === true) {
      //       return 'Yes';
      //     } else if (params.data.isVisibleOnFront === false) {
      //       return 'No';
      //     } else {
      //       return ' ';
      //     }
      //   },
      // },
      // {
      //   field: 'isVisibleOnList',
      //   // width: 100,
      //   // minWidth: 150,
      //   width: 150,
      //   filterable: true,
      //   filter: 'agTextColumnFilter',
      //   resizable: true,
      //   valueGetter: params => {
      //     if (params.data.isVisibleOnList === true) {
      //       return 'Yes';
      //     } else if (params.data.isVisibleOnList === false) {
      //       return 'No';
      //     } else {
      //       return ' ';
      //     }
      //   },
      // },
      {
        field: 'action',
        cellRendererFramework: CellRendererButtonComponent,
        width: 150,
        btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: false
      },
    ];
  }

  ngOnInit() {
    console.log('network call');
    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.rowData = res['productAttributes'];
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    // this.store.pipe(select('productAttributes')).subscribe(res => {
    //   this.rowData = res['productAttributes'];
    // });

    window.addEventListener('resize', function () {
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
