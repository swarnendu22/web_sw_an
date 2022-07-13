import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { GetPendingCategory } from '../../../../../actions/storeManagement.action';
import { PendingCellRendererButtonComponent } from '../../../components/pending-cell-renderer-button/pending-cell-renderer-button.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-pending-category',
  templateUrl: './pending-category.component.html',
  styleUrls: ['./pending-category.component.css'],
})
export class PendingCategoryComponent {
  public defaultColDef;
  public columnDefs;
  public rowData;
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  public pendingCategories;

  constructor(private store: Store<categoryState>, private ag: AgGridOptions) {
    this.columnDefs = [
      {
        field: 'code',
        headerName: 'Request no',
      },
      {
        field: 'name',
        headerName: 'Name',
      },
      {
        field: 'alias',
        headerName: 'Alias',
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: PendingCellRendererButtonComponent,
        width: 130,
        btnName: [
          { name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' },
          { name: 'Disable', btnTxtColor: '#fff', btnColor: '#F4516C' },
        ],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
      },
    ];
    // this.defaultColDef = { resizable: true };
    this.rowData = [
      {
        orgHierarchy: ['Men'],
        Code: '10001',
        attributeSet: '',
        icon: '',
        status: 'Active',
        action: '',
      },
      {
        orgHierarchy: ['Men', 'Topwear'],
        jobTitle: 'Exec. Vice President',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: ['Men', 'Topwear', 'Shirt'],
        jobTitle: 'Director of Operations',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: ['Men', 'Topwear', 'Blazzer'],
        jobTitle: 'Director of Operations',
        employmentType: 'Permanent',
      },
    ];
    this.groupDefaultExpanded = -1;
    this.getDataPath = function (data) {
      return data.orgHierarchy;
    };
    this.autoGroupColumnDef = {
      headerName: 'Category Name',
      cellRendererParams: { suppressCount: true },
    };
    this.store.dispatch(new GetPendingCategory());
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      this.pendingCategories = res['pendingCategories'];
      console.log('=================>', this.pendingCategories);
      if (this.pendingCategories !== null) {
        console.log(
          'this.pendingCategories:::::::::::::::',
          this.serializeData(this.pendingCategories['payload'])
        );
        event.api.setRowData(
          this.serializeData(this.pendingCategories['payload'])
        );
      }
    });
  }

  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
  }

  serializeData(data) {
    const serilizeData = [];
    data.map(item => {
      const rquest = JSON.parse(item.request);
      serilizeData.push({
        code: item.code,
        id: item.id,
        name: rquest.name,
        alias: rquest.alias,
        image: rquest.image,
        level: rquest.level,
        status: rquest.status,
        attributeSetId: rquest.attributeSetId,
      });
    });
    return serilizeData;
  }
}
