import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { ApiMessageService } from '../../../../utils/api/api-message.service';

@Component({
  selector: 'app-product-image-crop',
  templateUrl: './product-image-crop.component.html',
  styleUrls: ['./product-image-crop.component.css']
})
export class ProductImageCropComponent implements OnInit {
  cropOption = 'Square';
  imageChangedEvent: any = '';
  url: any;
  tempBrandlogourl: any = '';
  editImageUrl = '';
  number_list = [1, 2, 3, 4];
  xaxis:number = 4;
  yaxis:number = 3;
  constructor(
    public dialogRef: MatDialogRef<ProductImageCropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
  ) {
    var reader = new FileReader();
    reader.readAsDataURL(this.data.event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result;
      this.editImageUrl = this.url;
    }
    this.fileChangeEvent(this.data.event);
  }
  ngOnInit(): void {
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.tempBrandlogourl = event.base64;
  }
  
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  imageCroppedDone() {
    this.url = this.tempBrandlogourl;
  }
  imageSubmitCancel() {
    let data = {
      'url': '',
    }
    this.dialogRef.close(data);
  }
  imageSubmit() {
    let data = {
      'url': this.url,
    }
    this.dialogRef.close(data);
  }
  radioChange(cropOption) {
    this.cropOption = cropOption;
  }
  
}