import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cell-renderer-private-categories-tree',
  templateUrl: './cell-renderer-private-categories-tree.component.html',
  styleUrls: ['./cell-renderer-private-categories-tree.component.css']
})

export class CellRendererPrivateCategoriesTreeComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  requestData = null
  @ViewChild('templateReferenceModal') templateReferenceModal: TemplateRef<any>;
  constructor(private dialog: MatDialog) { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
    const { request } = this.params.data;
    this.requestData = JSON.parse(request)
    console.log(this.requestData)

  }

  openModal() {
    let dialogRef = this.dialog.open(this.templateReferenceModal, {
      height: '500px',
      width: '500px',
    });

  }


  refresh() {
    return false;
  }

}