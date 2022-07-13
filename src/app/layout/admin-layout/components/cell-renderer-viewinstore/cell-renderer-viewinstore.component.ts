
import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
//import { CreateNewMasterCatalogPopupComponent } from '../../catalog-management/create-new-master-catalog-popup/create-new-master-catalog-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cell-renderer-viewinstore',
  template: `
    <a mat-flat-button matTooltip="View" aria-label="View" color="primary" class="btn-sm-data"
    (click)="invokeParentMethod()"><mat-icon>visibility</mat-icon></a>
  `,
  styleUrls: ['./cell-renderer-viewinstore.component.css']
})
export class CellRendererViewinstoreComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }
  constructor(public _route: Router, public dialog: MatDialog

  ) { }
  openNewTab() {
    // window.location.href = "https://www.nextdoorhub.com/product/" + sku + "/show";
    let link = environment.storeFrontBaseUrl + '/product/' + this.params.data['id'] + '/show';
    window.open(link, '_blank');
  }

  refresh() {
    return false;
  }

  public invokeParentMethod() {
    this.id = this.params.data['id'];
    this.params.onActionBtnClick(this.id);

    // this.dialog.open(CreateNewMasterCatalogPopupComponent, {
    //   maxHeight: '550px',
    //   disableClose: true,
    //   data: {
    //     id: this.id
    //   },
    //   panelClass: 'create-master-modal'

    // });
  }

}
