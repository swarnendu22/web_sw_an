import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-collection-cell-renderer-rating',
  templateUrl: './collection-cell-renderer-rating.component.html',
  styleUrls: ['./collection-cell-renderer-rating.component.css']
})
export class CollectionCellRendererRatingComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  public id: any;
  public type: string;
  public api: any;
  rating: any;

  agInit(params: any): void {
    this.params = params;
    this.api = params.api;
    this.type = params.colDef.type;
    this.cell = { row: params.value, col: params.colDef.headerName };
    this.rating = this.params.data.productRating
    console.log('Rating', this.params)
  }
  constructor() { }

  refresh() {
    return true;
  }

}
