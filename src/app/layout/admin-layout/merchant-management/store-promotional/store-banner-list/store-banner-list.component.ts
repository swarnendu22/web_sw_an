import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '../../../../../../../node_modules/@angular/router';
import { GetStoreBannerList, GetRegionsList } from '../../../../../actions/merchant-management.actions';
import * as moment from 'moment';
import { AddStoreBannerComponent } from '../../add-store-banner/add-store-banner.component';
import { replaceUrlImgix } from '../../../../../utils/imgLib';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { GetCountries } from '../../../../../actions/storeManagement.action';

@Component({
  selector: 'app-store-banner-list',
  templateUrl: './store-banner-list.component.html',
  styleUrls: ['./store-banner-list.component.css']
})
export class StoreBannerListComponent implements OnInit {
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
  searchPayload = {

    "bannerType": 'MASTER',
    "sectorId": null,
    "countryCode": null,
    "regionName": null,
    "accessibility": null,
    "isFree": null,
    "status": "ALL"
  }

  constructor(private store: Store<any>, public dialog: MatDialog,
    private router: Router) {

    this.store.dispatch(new GetStoreBannerList(this.searchPayload))
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetRegionsList());

    this.columnDefs = [

      {
        headerName: 'Image',
        field: 'bannerData',
        resizable: true,
        sortable: true,
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        cellRenderer: (data) => {

          if (data.data.bannerData) {
            const imgData = JSON.parse(data.data.bannerData)
            // console.log(imgData)
            if (imgData.image_url)
              return `<img src=${replaceUrlImgix(imgData.image_url)}?w=40&h=40 width=40 height=40 >`
          }
        }
      },
      {
        headerName: 'Reference Id',
        field: 'bannerReferenceId',
        resizable: true,
        sortable: true,

      },

      {
        headerName: 'Sector',
        resizable: true,
        field: 'sectorName',
      },

      {
        headerName: 'bannerName',
        field: 'bannerName',
        resizable: true,

      },
      {
        headerName: 'Accessibility',
        field: 'accessibility',
        resizable: true,

      },
      {
        headerName: 'Base Country',
        field: 'baseCountry',
        resizable: true,

      },
      {
        headerName: 'Base Region',
        field: 'baseRegion',
        resizable: true,

      },
      {
        headerName: 'Pricing',
        field: 'amountPaid',
        resizable: true,

      },
      {
        headerName: 'Expiry Date',
        field: 'expiryDate',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return moment(data.data.expiryDate).format('DD/MM/YYYY HH:mm')
        }
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: CellRendererButtonComponent,
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
        width: 100
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
    this.store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries = res['countries'] ? res['countries']['payload'] : '';
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.storeBannerList) {
          this.rowData = res.storeBannerList[0];
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
  addNewBanner() {
    this.router.navigate(['/merchant/banner-management/add-new/' + this.bannerType])
    // const dialogRef = this.dialog.open(AddStoreBannerComponent, {
    //   width: '1000px',
    //   height: '600px',
    //   panelClass: 'add-new-banner',
    //   data: { storeId: this.storeId, bannerType: this.bannerType }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //   }
    // });
  }
  route(event) {

    console.log('click', event);
    const tabindex = event.index;
    this.tabIndex = tabindex
    if (this.tabIndex == 0) {
      this.bannerType = 'MASTER'
      this.searchPayload.bannerType = 'MASTER'
      this.store.dispatch(new GetStoreBannerList(this.searchPayload))

    }
    else if (this.tabIndex == 1) {
      this.bannerType = 'FEATURED'
      this.searchPayload.bannerType = 'FEATURED'
      this.store.dispatch(new GetStoreBannerList(this.searchPayload))

    }
    else if (this.tabIndex == 2) {
      this.bannerType = 'BRAND'
      this.searchPayload.bannerType = 'BRAND'
      this.store.dispatch(new GetStoreBannerList(this.searchPayload))

    }

  }

  onSearch() {
    this.store.dispatch(new GetStoreBannerList(this.searchPayload))

  }
  onClear() {

    this.searchPayload.sectorId = null
    this.searchPayload.countryCode = null
    this.searchPayload.regionName = null
    this.searchPayload.accessibility = null
    this.searchPayload.isFree = null
    this.searchPayload.status = "ALL"
    this.store.dispatch(new GetStoreBannerList(this.searchPayload))

  }

  onChecked(event) {
    if (event.checked == true)
      this.searchPayload.status = 'ACTIVE'
    else
      this.searchPayload.status = 'ALL'
  }
}
