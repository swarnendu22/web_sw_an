import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';
import { ListSearchDECommissionSettings } from 'src/app/actions/delivery-boy-management.action';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererDeliveryBoysComponent } from '../../../components/cell-renderer-delivery-boys/cell-renderer-delivery-boys.component';
import { CellRendererShowComponent } from '../../../components/cell-renderer-show/cell-renderer-show.component';

@Component({
  selector: 'app-de-commission-settings-list',
  templateUrl: './de-commission-settings-list.component.html',
  styleUrls: ['./de-commission-settings-list.component.css']
})
export class DeCommissionSettingsListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData: any[];
  pageNo = 1;
  totalRecords = null;
  regionList = [];
  zoneList = [];
  vehicleType: null;
  city: null;
  area: null;
  zone: null;
  state_name: {};
  searchTerm: '';
  status = 'PENDING';
  payLoadForSearch = {
    search: '',
    state_name: null,
    vehicle_type: null,
    area: null,
  }

  constructor(private ag: AgGridOptions,
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Code',
        field: 'code',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Base Rate',
        field: 'base_rate',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Base Distance(In Km)',
        field: 'base_distance_km',
        width: 180,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Base Weight(In Kg)',
        resizable: true,
        field: 'base_weight_kg',
      },
      {
        headerName: 'Addl. Per Kg',
        field: 'additional_per_kg',
        resizable: true,
      },
      {
        headerName: 'Addl. Per Km',
        field: 'additional_per_km',
        resizable: true,

      },
      {
        headerName: 'Base Dimension(In Inch)',
        field: 'base_dimention_inch',
        resizable: true,

      },
      {
        headerName: 'Addl. Per Inch',
        field: 'additional_per_inch',
        resizable: true,

      },
      {
        headerName: 'Max Distance(In Km)',
        field: 'max_distance_km',
        resizable: true,

      },
      {
        headerName: 'Max Weight(In Kg)',
        field: 'max_weight_kg',
        resizable: true,
      },
      {
        headerName: 'Max Dimension(In Inch)',
        field: 'max_dimention_inch',
        resizable: true,

      },
      {
        headerName: 'Max 1st Mile',
        field: 'max_first_mile',
        resizable: true,

      },
      {
        headerName: 'Max Last Mile',
        field: 'max_last_mile',
        resizable: true,

      },

      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: CellRendererShowComponent,
        cellRendererParams: {
          // onActionBtnClick: this.rejectApproveOperation.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
        pinned: 'right'
      },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }

  ngOnInit() {
    this.store.dispatch(new ListSearchDECommissionSettings(
      {
        search: this.searchTerm
      }
    ));
  }

  search() {
    this.store.dispatch(new ListSearchDECommissionSettings(
      {
        search: this.searchTerm
      }
    ));
  }


  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }


  onGridSizeChanged(params) {
    var gridWidth = params.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }


  getPageNoData(page: number) {
    console.log(page);
    this.pageNo = page;
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name['regionName'],
      vehicle_type: this.vehicleType,
      area: this.area
    }
    this.store.dispatch(new ListSearchDECommissionSettings(
      {
        search: this.searchTerm
      }
    ));
  }
  nextPage(event) {
    console.log(event);
    // this.p = event;
    const payLoadForSearch = {
      search: this.searchTerm,
      state_name: this.state_name['regionName'],
      vehicle_type: this.vehicleType,
      area: this.area
    }
    this.pageNo += 1;
    this.store.dispatch(new ListSearchDECommissionSettings(
      {
        search: this.searchTerm
      }
    ));
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.commissionSettingsListSearch) {
          console.log(res.commissionSettingsListSearch)

          this.rowData = res.commissionSettingsListSearch;
          event.api.setRowData(this.rowData);
        }
      });

  }
}
