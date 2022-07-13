import { Component, OnInit } from '@angular/core';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import {
  GetFulfillmentCenter,
  GetZone,
  GetZoneCount,
} from 'src/app/actions/storeManagement.action';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-zip-code-management',
  templateUrl: './zip-code-management.component.html',
  styleUrls: ['./zip-code-management.component.css'],
})
export class ZipCodeManagementComponent implements OnInit {
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetZoneCount());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.rowData = res['zoneCount'] ? res['zoneCount']['payload'] : '';
    });
  }
  columnDefs = [
    {
      headerName: 'Zone',
      field: 'zoneName',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Total Zip',
      field: 'totalZip',
      filter: 'agNumberColumnFilter',
      resizable: true,
    },
    {
      headerName: 'COD',
      field: 'isCodAvailable',
      filter: 'agTextColumnFilter',
      resizable: true,
      valueGetter: params => {
        if (params.data.isCodAvailable === true) {
          return 'Yes';
        } else if (params.data.isCodAvailable === false) {
          return 'No';
        } else {
          return ' ';
        }
      },
    },
    {
      headerName: 'TAT (in Hrs)',
      field: 'deliveryTat',
      filter: 'agNumberColumnFilter',
      resizable: true,
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
      minWidth: 100,
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
    params.api.sizeColumnsToFit();
  }
}
