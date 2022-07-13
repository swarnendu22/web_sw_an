import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryImageComponent } from '../../store-management/manage-categories/edit-category-image/edit-category-image.component';

@Component({
  selector: 'app-cell-renderer-category-logo',
  templateUrl: './cell-renderer-category-logo.component.html',
  styleUrls: ['./cell-renderer-category-logo.component.css']
})
export class CellRendererCategoryLogoComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  public imageUrl;

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    if (this.params.colDef.checkForShow) {
      const checkData = this.params.colDef.checkForShow;
      this.show = (this.params.data[checkData.checkForShowKey] === checkData.checkForShowValue) ? true : false;

    }
    this.imageUrl = `https://ndh.imgix.net/ndh-assets/categories-images/`+this.params.data.id+`.png?${Date.now()}`;
  }
  constructor(private dialog: MatDialog) { }
  changeSource(event){
    event.target.src = `https://ndh.imgix.net/ndh-assets/categories-images/default.png?${Date.now()}`;
  }
  public editImage() {
    const dialog = this.dialog.open(EditCategoryImageComponent, {
      width: '400px',
      disableClose: true,
      panelClass: 'ndh-order-view',
      data: {
        id: this.params.data.id,
      }
    })
    dialog.afterClosed().subscribe(result => {
      this.imageUrl = `https://ndh.imgix.net/ndh-assets/categories-images/`+this.params.data.id+`.png?${Date.now()}`;
    });
  }
  refresh() {
    return false;
  }

}
