import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import {
  GetZipCode,
  GetZipZoneUser,
} from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-all-zip-zone-user-management',
  templateUrl: './all-zip-zone-user-management.component.html',
  styleUrls: ['./all-zip-zone-user-management.component.css'],
})
export class AllZipZoneUserManagementComponent implements OnInit {
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetZipZoneUser());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.rowData = res['allZipZoneUser']
        ? res['allZipZoneUser']['payload']
        : '';
    });
  }
  columnDefs = [
    {
      headerName: 'Zone Name',
      field: 'zoneId.zoneName',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'User Group Name',
      field: 'userGroupId.name',
      filter: 'agTextColumnFilter',
      resizable: true,
      width: 300,
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
      headerName: 'Additional Delivery',
      field: 'additionalDelivery',
      filter: 'agNumberColumnFilter',
      resizable: true,
      width: 300,
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
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
}
