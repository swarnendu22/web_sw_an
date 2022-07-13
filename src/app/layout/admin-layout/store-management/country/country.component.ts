import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { GetCountries } from 'src/app/actions/storeManagement.action';
import { UpdateCellRendererButtonComponent } from '../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { CellRendererButtonComponent } from '../../components/cell-renderer-button/cell-renderer-button.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  constructor(private _store: Store<storeManagementState>) {
    this._store.dispatch(new GetCountries());
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.rowData = res['countries'] ? res['countries']['payload'] : '';
    });
  }

  columnDefs = [
    {
      headerName: 'Country Code',
      field: 'iso',
      filterable: true,
      resizable: true,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Country Name',
      field: 'name',
      filterable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'Action',
      cellRendererFramework: CellRendererButtonComponent,
      // minWidth: 200,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      suppressSizeToFit: true,
      // suppressColumnVirtualisation: true,
      // floatingFiltersHeight: 0,
      resizable: false,
      // pinned: 'right',
    },
  ];

  rowData = [];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
}
