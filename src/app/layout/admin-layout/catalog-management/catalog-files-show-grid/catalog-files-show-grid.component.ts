import { Component, OnInit } from '@angular/core';
import { GetDataBasedOfFileId } from 'src/app/actions/catalog-management.action';
import { Store, select } from '@ngrx/store';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PendingCellRendererButtonComponent } from '../../components/pending-cell-renderer-button/pending-cell-renderer-button.component';
import { Location } from '@angular/common';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { CellRendererCatalogPendingBulkApproveComponent } from '../../components/cell-renderer-catalog-pending-bulkapprove/cell-renderer-catalog-pending-bulkapprove';
import { CellRendererShowBulkMessageExceptionComponent } from '../../components/cell-renderer-show-bulk-message-exception/cell-renderer-show-bulk-message-exception.component';

@Component({
  selector: 'app-catalog-files-show-grid',
  templateUrl: './catalog-files-show-grid.component.html',
  styleUrls: ['./catalog-files-show-grid.component.css'],
})
export class CatalogFilesShowGridComponent implements OnInit {
  columnDefs = [
    {
      resizable: true,
      headerName: 'Id',
      width: 150,
      field: 'id',
    },
    {
      resizable: true,
      headerName: 'Product Image',
      width: 150,
      cellRenderer: params =>
        params['data'] && params['data']['marketplaceProductImagesTemp']
          ? `<img src='${params['data']['marketplaceProductImagesTemp']['baseImageUrl']}' alt='' height='25' width='25'>`
          : '',
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      resizable: true,
    },
    {
      headerName: 'Product Type',
      resizable: true,
      valueGetter: params => {
        const value =
          params.data['productType'] == 'c' ? 'configurable' : 'simple';
        return value;
      },
    },
    {
      headerName: 'Exception',
      resizable: true,
      cellRendererFramework: CellRendererShowBulkMessageExceptionComponent,

      // cellRenderer: params => {
      //   if (params.data['exception']) {
      //     const value = JSON.parse(params.data['exception']);
      //     return '<a href="javascript:void(0);">' + value[0].reason + '</a>';

      //   } else {
      //     return '<a></a>';
      //   }
      // },
    },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      checkForShow: { checkForShowKey: 'status', checkForShowValue: 'PENDING' },
      cellRendererFramework: CellRendererButtonComponent,
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: true,
      // width: 200
    },

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    height: 50,
  };
  allCatalogList = null;
  rowData = [];

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ag: AgGridOptions,
    private router: Router
  ) {
    const id = this.activatedRoute.snapshot.params.id;
    // console.log('ID', id);
    // if (!this.allCatalogList) {
    this.store.dispatch(new GetDataBasedOfFileId({ fileId: id }));
    // }
  }

  ngOnInit() {
    this.store.pipe(select('catalogFilesReducer')).subscribe(res => {
      this.rowData = res.dataBasedOnFileId
        ? res.dataBasedOnFileId['payload']
        : [];
      // if (this.allCatalogList) {
      //   this.rowData = this.allCatalogList;
      //   // event.api.setRowData(this.rowData);
      //   console.log(this.allCatalogList);
      // }
    });
    // const id = this.activatedRoute.snapshot.params.id;
    // console.log('ID', id);
    // // if (!this.allCatalogList) {
    // this.store.dispatch(new GetDataBasedOfFileId({ fileId: id }));
    // // }
  }
  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
  }
  // onFirstDataRendered(params) {
  //   // params.api.sizeColumnsToFit();
  // }

  onGridReady(event) {
    // this.store.pipe(select('catalogFilesReducer')).subscribe(res => {
    //   this.allCatalogList = res.dataBasedOnFileId
    //     ? res.dataBasedOnFileId['payload']
    //     : null;
    //   if (this.allCatalogList) {
    //     this.rowData = this.allCatalogList;
    //     event.api.setRowData(this.rowData);
    //     console.log(this.allCatalogList);
    //   }
    // });
  }

  goBack() {
    // this.location.back();
    this.router.navigate(['catalog/pending-catalogs']);
    this.rowData = []
  }
  valueGetterForProductDetails(params, index) {
    return params.data[index];
  }
  invokeParentMethod() {
    // console.log('params');
  }

  ngOnDestroy(): void {
    this.rowData = []
  }
}
