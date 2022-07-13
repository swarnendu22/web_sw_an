import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { GetLogisticPartner } from 'src/app/actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-logistic-partner',
  templateUrl: './logistic-partner.component.html',
  styleUrls: ['./logistic-partner.component.css'],
})
export class LogisticPartnerComponent implements OnInit {
  constructor(
    private _store: Store<storeManagementState>,
    private ag: AgGridOptions
  ) {
    this._store.dispatch(new GetLogisticPartner());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['logisticPartner'];
    });
  }

  columnDefs = [
    {
      headerName: 'Code',
      field: 'logisticCode',
      filter: 'agTextColumnFilter',
      resizable: true,
      minWidth: 100
    },
    {
      headerName: 'Logistic Name',
      field: 'logisticCompany',
      filter: 'agTextColumnFilter',
      resizable: true,
      minWidth: 130
    },
    // {
    //   headerName: 'Priority',
    //   field: 'priority',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    //   minWidth:50
    // },
    {
      headerName: 'Status',
      field: 'apiActive',
      filter: 'agTextColumnFilter',
      resizable: true,
      minWidth: 50,
      cellRenderer: params => {
        if (params.data.apiActive == 1) {
          return '<p class="text-success">Active</p>';
        } else {
          return '<p class="text-danger">In Active</p>';
        }
      },
    },
    // {
    //   headerName: 'Account Code',
    //   field: 'accountCode',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    //   minWidth:100
    // },
    // {
    //   headerName: 'User Name',
    //   field: 'apiUserName',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    //   minWidth:100
    // },
    // // {
    // //   headerName: 'Password',
    // //   field: 'password',
    // //   filter: 'agTextColumnFilter',
    // //   resizable: true,
    // // },
    // {
    //   headerName: 'Production API Key',
    //   field: 'productionApiKey',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    //   minWidth:160
    // },
    // {
    //   headerName: 'Sandbox API Key',
    //   field: 'sandboxApiKey',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    //   minWidth:150
    // },
    // {
    //   headerName: 'Other API Details',
    //   field: 'otherApiDetails',
    //   filter: 'agTextColumnFilter',
    //   resizable: true,
    // },
    {
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      width: 100,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: false,
      // pinned: 'right',
    },
  ];

  rowData = [
    {
      logisticCode: 'ECOM',
      logisticName: 'ECOM India Pvt Ltd',
      priority: 'West Bengal',
      status: 'Enable',
      accountCode: 'ndh001',
      userName: 'STPL1@3',
      password: '1S#QD22',
      apiKey: 'Ky987bYUksHJDJDKD',
    },
  ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
}
