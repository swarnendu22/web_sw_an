import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { brandManagementState } from '../../../../reducers/brand-management.reducers';
import { 
  GetActiveBrands, 
  //GetInactiveBrands, 
  GetPendingBrands, StoreActiveBrands 
} from '../../../../actions/brand-management.actions';

import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { PendingCellRendererButtonComponent } from '../../components/pending-cell-renderer-button/pending-cell-renderer-button.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CellRendererShowComponent } from '../../components/cell-renderer-show/cell-renderer-show.component';

@Component({
  selector: 'app-active-brand',
  templateUrl: './active-brand.component.html',
  styleUrls: ['./active-brand.component.css'],
})
export class ActiveBrandComponent implements OnInit {
  brands:any = null;
  statusSelected = '1'
  headerStatusName = 'Active'
  isPending = false
  constructor(
    private store: Store<brandManagementState>,
    private ag: AgGridOptions,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log('ON', history.state)
    this.headerStatusName = history.state.status ? history.state.status : 'Active'
    this.isPending = history.state.status === 'Pending' ? true : false;
    if (history.state.statusSeleted) {
      this.statusSelected = history.state.statusSeleted.toString()
    } else if (history.state.statusSeleted == 0) {
      this.statusSelected = '0'
    } else if (history.state.statusSelected == 'p') {
      this.isPending = true
      this.statusSelected = 'p'
    }
  }

  statusChange(e) {
    let status = e.value;
    this.store.dispatch(new StoreActiveBrands(null))
    switch (status) {
      case '1':
        this.isPending = false
        this.headerStatusName = 'Active';
        this.store.dispatch(new GetActiveBrands('1'));
        break;
      case '0':
        this.isPending = false
        this.headerStatusName = 'Discontinued';
        this.store.dispatch(new GetActiveBrands('0'));
        break;
      case '2':
        this.isPending = false
        this.headerStatusName = 'Hold';
        this.store.dispatch(new GetActiveBrands('2'));
        break;
      case '3':
        this.isPending = false
        this.headerStatusName = 'Blocked';
        this.store.dispatch(new GetActiveBrands('3'));
        break;
      case 'p':
        this.isPending = true
        this.headerStatusName = 'Pending';
        this.store.dispatch(new GetPendingBrands());
        break;
      default:
        this.isPending = false
        this.headerStatusName = 'Active';
        this.store.dispatch(new GetActiveBrands('1'));
    }
  }
  columnDefs = [
    {
      field: 'brandLogoUrl',
      headerName: 'Logo',
      width: 100,
      sortable: false,
      resizable: false,
      filter: false,
      cellRenderer: params =>
        params['data'] && params['data']['brandLogoUrl']
          ? `<img src="${params['data']['brandLogoUrl'] + '?h=40&w=40'}" alt="" height="25" width="25">`
          : '',
    },
    {
      field: 'brandName',
      headerName: 'Brand Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    // {
    //   field: 'brandShortName',
    //   headerName: 'Short Name',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    // },
    // {
    //   field: 'isPrimiumBrand',
    //   headerName: 'Premium Brand',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    //   cellRenderer: params => {
    //     return params.data.isPrimiumBrand ? 'Yes' : 'No'
    //   },
    // },
    // {
    //   field: 'isRequiredAuthorisation',
    //   headerName: 'Required Authorisation',
    //   filter: 'agTextColumnFilter',
    //   sortable: true,
    //   resizable: true,
    //   cellRenderer: params => {
    //     return params.data.isRequiredAuthorisation ? 'Yes' : 'No'
    //   },
    // },
    {
      headerName: 'Action',
      cellRendererFramework: CellRendererShowComponent,
      width: 120,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      resizable: true,
      suppressSizeToFit: true,
    },
  ];
  pendingColumnDefs = [
    {
      field: 'code',
      headerName: 'Request No',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Request Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var cellDate = new Date(cellValue);
          var filterDate = new Date(filterLocalDateAtMidnight)
          if (filterDate.toLocaleDateString() === cellDate.toLocaleDateString()) {
            return 0;
          }
          if (filterDate.toLocaleDateString() < cellDate.toLocaleDateString()) {
            return -1;
          }
          if (filterDate.toLocaleDateString() > cellDate.toLocaleDateString()) {
            return 1;
          }
        }
      },
      resizable: true,
    },
    {
      field: 'brandName',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'brandShortName',
      headerName: 'Short Name',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },

    {
      field: 'type',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'createdBy',
      headerName: 'Requested By',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Action',
      cellRendererFramework: PendingCellRendererButtonComponent,
      btnName: [
        { name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' },
        { name: 'Disable', btnTxtColor: '#fff', btnColor: '#F4516C' },
      ],
      sortable: false,
      filter: false,
      resizable: true,
      suppressSizeToFit: true,
      width: 120
    },
  ];


  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      this.brands = this.isPending ? res['pendingBrands'] : res['activeBrands'];
      if (this.brands !== null) {
        if (this.isPending) {
          event.api.setRowData(this.serializeData(this.brands));
        } else {
          event.api.setRowData(this.brands);
        }
      }
      else
      {
        if (this.isPending) {
          this.store.dispatch(new GetPendingBrands());
        } else {
          this.store.dispatch(new GetActiveBrands(this.statusSelected));
        }
      }
    });
  }

  serializeData(data) {
    const serilizeData = [];
    data.map(item => {
      const rquest = JSON.parse(item.request);
      serilizeData.push({
        code: item.code,
        id: item.id,
        remarks: item.remarks,
        active: rquest.active,
        brandLogoUrl: rquest.brandLogoUrl,
        brandName: rquest.brandName,
        brandShortName: rquest.brandShortName,
        createdAt: moment(item.createdAt, 'x').format('MMM, DD YYYY LTS'),
        createdBy: rquest.createdBy,
        type: item.type,
      });
    });
    return serilizeData;
  }
}