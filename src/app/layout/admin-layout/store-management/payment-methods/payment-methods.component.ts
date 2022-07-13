import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';
import { GetPaymentMethod } from 'src/app/actions/storeManagement.action';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent implements OnInit {
  public gridapi;
  constructor(private _store: Store<storeManagementState>, private ag: AgGridOptions) {
    this._store.dispatch(new GetPaymentMethod());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this.rowData = res['paymentMethods']
        ? res['paymentMethods']['payload']
        : '';
    });
  }
  columnDefs = [
    // { headerName: 'ID', field: 'id', hide: true },
    {
      headerName: 'Payment Method',
      field: 'method',
      filter: 'agTextColumnFilter',
    },
    { headerName: 'Title', field: 'title', filter: 'agTextColumnFilter' },
    {
      headerName: 'Desription',
      field: 'description',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      width: 100,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: false,
    },
  ];

  rowData = [];
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
    console.log(this.gridapi);
    params.api.sizeColumnsToFit();
  }
}
