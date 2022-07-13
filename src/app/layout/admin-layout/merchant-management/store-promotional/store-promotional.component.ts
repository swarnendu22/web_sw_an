import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreQuickLinks, DeleteStoreQuickLink, GetMasterQuickLinks } from '../../../../actions/merchant-management.actions';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddNewQuicklinkComponent } from '../add-new-quicklink/add-new-quicklink.component';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { CellRendererDeleteQuicklinkComponent } from '../../components/cell-renderer-delete-quicklink/cell-renderer-delete-quicklink.component';

@Component({
  selector: 'app-store-promotional',
  templateUrl: './store-promotional.component.html',
  styleUrls: ['./store-promotional.component.css']
})
export class StorePromotionalComponent implements OnInit {
  totalRecords = null;
  private gridApi;
  private gridColumnApi;
  rowData: any[];
  columnDefs;
  defaultColDef;
  storeId = null
  tabIndex = 0;
  bannerType = 'MASTER'
  countries = null
  regions = null
  sectors = [
    {
      sectorId: 1,
      sectorName: 'Food',
    },
    {
      sectorId: 2,
      sectorName: 'Mart',
    },
    {
      sectorId: 3,
      sectorName: 'Shopping',
    },
    {
      sectorId: 4,
      sectorName: 'Medicine',
    },
    {
      sectorId: 5,
      sectorName: 'Wine',
    },
    {
      sectorId: 6,
      sectorName: 'Service',
    },
    {
      sectorId: 7,
      sectorName: 'Banking',
    }
  ]
  constructor(private store: Store<any>, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreQuickLinks(this.storeId))
    this.store.dispatch(new GetMasterQuickLinks(this.storeId));

    // this.store.dispatch(new GetCountries());
    // this.store.dispatch(new GetRegionsList());

    this.columnDefs = [

      {
        headerName: 'Quick Link Name',
        field: 'quicklinkName',
        resizable: true,
        sortable: true,

      },
      {
        headerName: 'Created At',
        field: 'createdAt',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return moment(data.data.createdAt).format('DD/MM/YYYY HH:mm')
        }
      },
      {
        headerName: 'Free',
        resizable: true,
        field: 'isFree',
        cellRenderer: (data) => {
          return data.data.isFree != null ? data.data.isFree == true ? 'Free' : 'Paid' : ''
        }
      },

      {
        headerName: 'Status',
        field: 'isActive',
        resizable: true,
        cellRenderer: (data) => {
          return data.data.isActive == true ? 'Active' : 'Inactive'
        },

      },
      {
        headerName: 'Action',
        colId: 'params',
        cellRendererFramework: CellRendererDeleteQuicklinkComponent,
        cellRendererParams: {
          onActionBtnClick: this.onDeleteQuickLink.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
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

  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.storeQuickLinks) {
          console.log(res.storeQuickLinks)
          this.rowData = res.storeQuickLinks[0];
          event.api.setRowData(this.rowData);
        }
      });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

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

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  addNewQuickLink() {
    const dialogRef = this.dialog.open(AddNewQuicklinkComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'image-crop-dialog',
      disableClose: true,
      data: { storeId: this.storeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new GetStoreQuickLinks(this.storeId))
      }
    });
  }

  onDeleteQuickLink(params) {
    console.log(params)
    const payload = [
      {
        "quicklinkId": params.alldata.quicklinkId,
        "storeId": parseInt(this.storeId)
      }
    ]
    this.store.dispatch(new DeleteStoreQuickLink(payload))
  }

  route(event) {
    console.log('click', event);
    const tabindex = event.index;
    this.tabIndex = tabindex

  }
}
