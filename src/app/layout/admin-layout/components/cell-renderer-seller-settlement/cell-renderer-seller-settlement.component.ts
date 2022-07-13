import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';

@Component({
  selector: 'app-cell-renderer-seller-settlement',
  templateUrl: './cell-renderer-seller-settlement.component.html',
  styleUrls: ['./cell-renderer-seller-settlement.component.css']
})
export class CellRendererSellerSettlementComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;

  constructor() { }

  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
  }
  refresh() {
    return false;
  }

}
