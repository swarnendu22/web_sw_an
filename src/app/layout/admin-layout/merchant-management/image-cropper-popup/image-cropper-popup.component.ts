import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageCroppedEvent } from '../../../../../../node_modules/ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-popup',
  templateUrl: './image-cropper-popup.component.html',
  styleUrls: ['./image-cropper-popup.component.css']
})
export class ImageCropperPopupComponent implements OnInit {

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.tempUrl = event.base64;
  }
  imageCroppedDone() {
    this.url = this.tempUrl;
    this.onCrop()
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

  imageChangedEvent: any = '';
  tempUrl: any = '';
  url = '';
  file = null;
  filename = null;
  applicationtype = null;
  filetype = null;
  aspectRatio = null;
  constructor(
    public dialogRef: MatDialogRef<ImageCropperPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
    const file = this.data.event.target.files[0];
    this.file = file;
    this.filename = file['name'];
    this.applicationtype = file['type'];
    this.filetype = file['type'].split('/')[1];
    this.aspectRatio = this.data.uploadFor == 'store_logo_url' ? 1 / 1 : 3 / 2;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onCrop() {
    console.log(this.url)
    const blob = this.dataURItoBlob(this.url);
    const newfile = new File([blob], this.filename, { type: this.applicationtype });

    this.dialogRef.close({
      newfile,
      filename: this.filename, filetype: this.filetype, applicationtype: this.applicationtype, uploadFor: this.data.uploadFor
    })
  }
  ngOnInit() {
    this.fileChangeEvent(this.data.event);
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.applicationtype
    });
  }
}
