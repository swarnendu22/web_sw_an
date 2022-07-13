import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { GetPaymentMethod } from 'src/app/actions/storeManagement.action';
import { GetRegionsList } from 'src/app/actions/merchant-management.actions';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent implements OnInit {
  constructor(private _store: Store<storeManagementState>) {
    this._store.dispatch(new GetRegionsList());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.rowData = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }

  columnDefs = [
    {
      headerName: 'Country Code',
      field: 'countryId.iso',
      filter: 'agNumberColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Region Code',
      field: 'code',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Region Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      resizable: true,
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRendererFramework: CellRendererButtonComponent,
      // width: 180,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      resizable: false,
      // pinned: 'right',
    },
  ];

  rowData = [

  ];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
}
