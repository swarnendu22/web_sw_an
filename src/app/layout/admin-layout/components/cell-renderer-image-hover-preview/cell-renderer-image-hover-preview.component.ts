import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cell-renderer-image-hover-preview',
  templateUrl: './cell-renderer-image-hover-preview.component.html',
  styleUrls: ['./cell-renderer-image-hover-preview.component.css']
})
export class CellRendererImageHoverPreviewComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public hover = false;
  public imageUrl;
  agInit(params: any): void {
    this.params = params;
    this.imageUrl = params.data.image_url ? params.data.image_url : null;
    // console.log('imgUrl', this.imageUrl);
    this.cell = { row: params.value, col: params.colDef.headerName };
  }

  constructor(public dialog: MatDialog, ) { }

  refresh() {
    return false;
  }

  overM() {
    this.dialog.open(ImageHoverPreviewComponent, {
      width: '500px',
      height: '500px',
      maxHeight: '500px',
      data: { imageUrl: this.imageUrl },
      panelClass: 'custom-hoverimg',
    });
  }

  leaveM() {
    // this.dialog.closeAll();
  }



}

// Image Preview Component
@Component({
  selector: 'image-hover-preview',
  templateUrl: 'image-hover-preview.html',
  styleUrls: ['./image-hover-preview.css']
})
export class ImageHoverPreviewComponent implements OnInit {
  imageUrl = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImageHoverPreviewComponent>
  ) {
    this.imageUrl = data.imageUrl.split('?')[0];

  }

  ngOnInit() {

  }

}
