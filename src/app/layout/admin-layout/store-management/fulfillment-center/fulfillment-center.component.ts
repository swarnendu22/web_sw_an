import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from '../../../../reducers/storemanagement.reducers';
import { GetFulfillmentCenter } from '../../../../actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-fulfillment-center',
  templateUrl: './fulfillment-center.component.html',
  styleUrls: ['./fulfillment-center.component.css'],
})
export class FulfillmentCenterComponent implements OnInit {
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetFulfillmentCenter());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['fulfillmentcenter'];
    });
  }

  columnDefs = [
    {
      headerName: 'FC Code',
      field: 'fcCode',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'FC Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    // {
    //   headerName: 'Email',
    //   field: 'email',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    // },
    {
      headerName: 'Telephone',
      field: 'telephone',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    // {
    //   headerName: 'Alternative Mobile',
    //   field: 'alternativePhone',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    // },
    {
      headerName: 'Address',
      field: 'address1',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'City ',
      field: 'city',
      filter: 'agTextColumnFilter',
      resizable: true,
      minWidth: 100,
    },
    // {
    //   headerName: 'ZIP Code',
    //   field: 'postcode',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    // },
    {
      headerName: 'Region',
      field: 'region',
      filter: 'agTextColumnFilter',
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
      // pinned: 'right',
    },
  ];

  rowData = [
    // {
    //   fhubCode: '',
    //   fhubName: '',
    //   address: '',
    //   city: '',
    //   zipcode: '',
    //   region: '',
    //   contactNumber: '',
    //   contactPerson: '',
    //   servicingZone: '',
    //   status: '',
    // },
  ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
}
