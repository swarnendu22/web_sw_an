import { Injectable } from "@angular/core";
@Injectable()
export class AgGridOptions {
  constructor() {}

  agGridResize(params, sizeColumnsToFit = false) {
    console.log('--');
    var gridWidth = params.clientWidth;
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
    if (sizeColumnsToFit) params.api.sizeColumnsToFit();
  }
}
