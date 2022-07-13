import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { GetZone, GetZipCode } from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-all-zipcode-management',
  templateUrl: './all-zipcode-management.component.html',
  styleUrls: ['./all-zipcode-management.component.css'],
})
export class AllZipcodeManagementComponent implements OnInit {
  public gridapi;
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetZipCode());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.rowData = res['zipcode'] ? res['zipcode']['payload'] : '';
    });
  }
  columnDefs = [
    {
      headerName: 'Zipcode',
      field: 'zipCode',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Delivery TAT',
      field: 'deliveryTat',
      filter: 'agNumberColumnFilter',
      resizable: true,
    },
    {
      headerName: 'COD',
      field: 'isCodAvailable',
      filter: 'agTextColumnFilter',
      resizable: true,
      valueGetter: params => {
        if (params.data.isCodAvailable === 1) {
          return 'Yes';
        } else if (params.data.isCodAvailable === 0) {
          return 'No';
        } else {
          return ' ';
        }
      },
    },
    {
      headerName: 'Additional Delivery',
      field: 'additionalDelivery',
      filter: 'agNumberColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: params => {
        if (params.data.status === 0) {
          return '<p class="text-danger">In Active</p>';
        } else if (params.data.status === 1) {
          return '<p class="text-success">Active</p>';
        } else {
          return ' ';
        }
      },
      resizable: true,
    },
    {
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      minWidth: 200,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: false,
    },
  ];

  rowData = [
    // {
    //   zone: 'Kolkata',
    //   totalZip: '101',
    //   cod: 'Yes',
    //   tat: '36',
    //   status: 'Enable',
    // },
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
    this.ag.agGridResize(params);
    console.log(this.gridapi);
    params.api.sizeColumnsToFit();
  }
}
