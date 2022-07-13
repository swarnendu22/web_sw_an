import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetUiTemplateComponents } from 'src/app/actions/banner-management.actions';
import { Subscription } from 'rxjs';
import { CellRendererButtonComponent } from './../../../components/cell-renderer-button/cell-renderer-button.component';


@Component({
  selector: 'app-active-banner',
  templateUrl: './active-banner.component.html',
  styleUrls: ['./active-banner.component.css']
})
export class ActiveBannerComponent implements OnInit, OnDestroy {



  columnDefs = [
    {
      width: 80,
      sortable: false,
      resizable: false,
      filter: false,
      headerName: 'Image', cellRenderer: params =>
        params['data'] && params['data']['jpg_image']
          ? `<img src='${params['data']['jpg_image']}' alt='' height='25' width='25'>`
          : ''
    },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Type', field: 'applicable_to_widget_type' },
    { headerName: 'Linkable Type', field: 'linkable_type', width: 150 },
    {
      headerName: 'Action',
      field: 'value',
      colId: 'params',
      cellRendererFramework: CellRendererButtonComponent,
      sortable: false,
      filter: false,
      resizable: true,
      suppressSizeToFit: true,
    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter'
  };
  storeSubscription: Subscription;
  rowData = [];
  activeBanners = null;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new GetUiTemplateComponents());
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }


  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.storeSubscription = this.store.pipe(select('bannerManagement')).subscribe(res => {

      this.activeBanners = res.allActiveBanners;
      if (this.activeBanners) {
        this.rowData = this.activeBanners;
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

}
