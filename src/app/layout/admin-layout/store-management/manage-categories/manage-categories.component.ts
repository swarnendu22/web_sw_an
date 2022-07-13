import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../reducers/storemanagement.reducers';
import {
  GetCategory,
  PostCategoryPosition,
} from '../../../../actions/storeManagement.action';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { CellRendererCategoryViewButtonComponent } from '../../components/cell-renderer-category-view-button/cell-renderer-category-view-button.component';
import { CellRendererCategoryLogoComponent } from '../../components/cell-renderer-category-logo/cell-renderer-category-logo.component';

@Component({
  selector: 'app-manage-s',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
})
export class ManageCategoriesComponent implements OnInit {
  selected = 'c';
  public defaultColDef;
  public columnDefs;
  public rowData = [];
  public groupDefaultExpanded;
  public getDataPath;
  public autoGroupColumnDef;
  pageNo: any = 1;
  totalRecords = 0;
  categories = null;
  showPos: any = '';
  public gridapi;
  pos = false;
  rowHeight;

  constructor(
    private store: Store<categoryState>, 
    private ag: AgGridOptions, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.columnDefs = [
      {
        field: 'image',
        headerName: 'Image',
        width: 200,
        cellRendererFramework: CellRendererCategoryLogoComponent
      },
      {
        field: 'status',
        cellRenderer: params => {
          return params['data']['status'] ? '<p class="text-success">Active</p>' : '<p class="text-danger">Inactive</p>';
        },
        sortable: true,
        width: 150,

      },
      {
        headerName: 'Action',
        cellRendererFramework: CellRendererCategoryViewButtonComponent,
        resizable: true,
        width: 100,
      },
    ];
    this.getDataPath = function (data) {
      return data.hierarchy;
    };
    this.autoGroupColumnDef = {
      headerName: 'Category',
      resizable: true,
      cellRendererParams: { suppressCount: true },
      rowDrag: function (params) {
        return params.data.isProduct;
      },
      width: 450,
      filter: 'agTextColumnFilter'
    };
    this.rowHeight = 100;
  }
  ngOnInit() {
   
  }
  methodFromParent(cell) {
    alert(`"Parent Component Method from ${cell}!`);
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(event) {
    this.gridapi = event.api;
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      //console.log(res);
      if(res.categories) {
        this.categories = res.categories['payload'];
        this.rowData = [];
        this.childCategory(this.categories);
        this.gridapi.setRowData(this.rowData);
        this.pageNo = res.categories['pageNumber'];
        this.totalRecords = res.categories['totalRecords'];
      } else {
        this.store.dispatch(new GetCategory({ pageNo: this.pageNo }));
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
  getPageNoData(page: number) {
    this.pageNo = page;
    this.store.dispatch(new GetCategory({ pageNo: this.pageNo }));
  }
  nextPage(event) {
    this.pageNo += 1;
    this.store.dispatch(new GetCategory({ pageNo: this.pageNo }));
  }
  refreshCat() {
    this.store.dispatch(new GetCategory({ pageNo: this.pageNo }));
  }
  catHierarchy(parentId, hierarchy) {
    if (parentId !== null) {
      this.rowData.map(gc => {
        if (gc.id == parentId) {
          hierarchy.push(gc.name);
          this.catHierarchy(gc.parentId, hierarchy);
        }
      });
    }
  }
  childCategory(categories) {
    categories.map(category => {
      if (category.parentId != null) {
        const hierarchy = [];
        hierarchy.push(category.name);
        this.catHierarchy(category.parentId, hierarchy);
        this.rowData.push({
          hierarchy: hierarchy.reverse(),
          alias: category.alias,
          attributeSetId: category.attributeSetId
            ? category.attributeSetId.name
            : null,
          id: category.id,
          image: category.image,
          level: category.level,
          name: category.name,
          parentId: category.parentId,
          status: category.status,
          isProduct: category.products,
          attributeSetCode: category.attributeSetId ? category.attributeSetId.code : null,
        });
      }
      this.childCategory(category.childList);
    });
  }
  onGridSizeChanged(params) {
    this.ag.agGridResize(params);
    params.api.sizeColumnsToFit();
  }
  onRowDragEnd(e) {
    let position = e.node.rowIndex;
    if(e.node.parent.rowIndex!=undefined) {
      position = e.node.rowIndex - e.node.parent.rowIndex;
    }
    const payload = {
      categoryId: e.node.data.id,
      position: position,
    };
    this.store.dispatch(new PostCategoryPosition(JSON.stringify(payload)));
  }
  onRowGroupOpened(params) {
    //console.log('onRowGroupOpened : ', params.node);
  }
  routeMethod() {
    this.router.navigate(['/store/manage-categories/add-new']);
  }
}