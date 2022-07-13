import { Component, OnInit } from '@angular/core';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { Store, select } from '@ngrx/store';
import { GetDeliveryCenter } from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-delivery-center',
  templateUrl: './delivery-center.component.html',
  styleUrls: ['./delivery-center.component.css'],
})
export class DeliveryCenterComponent implements OnInit {
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetDeliveryCenter());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['deliveryCenter']
        ? res['deliveryCenter']['payload']
        : '';
    });
  }

  columnDefs = [
    {
      headerName: 'DH Code',
      field: 'dcCode',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'DH Name',
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

  //   columnDefs = [
  //     {headerName: 'DHUB Code', field: 'dhubCode' },
  //     {headerName:'DHUB Name', field: 'dhubName' },
  //     {headerName:'Address', field: 'address' },
  //     {headerName:'City ', field: 'city' },
  //     {headerName:'ZIP Code', field: 'zipcode' },
  //     {headerName:'Region', field: 'region' },
  //     {headerName:'Contact Number', field: 'contactNumber' },
  //     {headerName:'Contact Person', field: 'contactPerson' },
  //     {headerName:'Servicing to Zip', field: 'servicingZip' },
  //     {headerName:'Status', field: 'status' }
  // ];

  rowData = [
    // { dhubCode: '', dhubName: '', address: '', city:'', zipcode: '',region: '',contactNumber: '',contactPerson:'', servicingZone: '',status: ''},
  ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
}
