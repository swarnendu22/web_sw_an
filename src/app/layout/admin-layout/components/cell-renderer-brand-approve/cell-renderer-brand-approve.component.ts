import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BrandBatchListComponent } from '../../catalog-management/brand-batch-list/brand-batch-list.component';

@Component({
  selector: 'app-cell-renderer-brand-approve',
  templateUrl: './cell-renderer-brand-approve.component.html',
  styleUrls: ['./cell-renderer-brand-approve.component.css']
})
export class CellRendererBrandApproveComponent implements ICellRendererAngularComp {
  public params: any;
  agInit(params: any): void {
    this.params = params;
  }
  constructor(public _route: Router, private dialog: MatDialog) { }
  public brandList() {
    const dialog = this.dialog.open(BrandBatchListComponent, {
      width: '100%',
      height: '600px',
      disableClose: true,
      panelClass: 'ndh-order-view',
      data: {
        batchId: this.params.data.id,
      }
    })
    dialog.afterClosed().subscribe(result => {
      
    });
  }
  refresh() {
    return false;
  }
  convertLowerCase(str) {
    return str.toLowerCase();
  }
}
