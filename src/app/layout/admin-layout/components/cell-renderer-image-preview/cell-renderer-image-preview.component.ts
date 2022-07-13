import { Component, OnInit, Inject } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cell-renderer-image-preview',
  template: '<a href="{{imageUrl}}" target="_blank">{{imageUrl}}</a>',
  styleUrls: ['./cell-renderer-image-preview.component.css']
})
export class CellRendererImagePreviewComponent implements ICellRendererAngularComp {
  public params: any;
  public cell: any;
  public id: any;
  public show = true;
  imageUrl = '';
  agInit(params: any): void {
    this.params = params;
    this.imageUrl = this.params.data.sizechartUrl;

  }
  constructor(

    public dialog: MatDialog,

  ) { }


  ngOnInit() {
  }

  viewPop() {
    this.dialog.open(ImagePreviewPopipModalComponent, {
      width: '800px',
      maxHeight: '800px',
      data: { imageUrl: this.imageUrl },
    });
  }

  refresh() {
    return false;
  }
}




@Component({
  selector: 'image-preview-popup-modal-component',
  template: `<h1 mat-dialog-title>Size Chart</h1>
  <div mat-dialog-content>
      <img [src]="imageUrl" height="400px" width="400px">
  </div>
  <div mat-dialog-actions>
  <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
</div>`

})
export class ImagePreviewPopipModalComponent implements OnInit {
  imageUrl = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.imageUrl = data.imageUrl;

  }

  ngOnInit() {

  }

}
