import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import {
  UpdateCategoryImage,
  ActionTypes,
} from '../../../../../actions/storeManagement.action';

@Component({
  selector: 'app-edit-category-image',
  templateUrl: './edit-category-image.component.html',
  styleUrls: ['./edit-category-image.component.css']
})
export class EditCategoryImageComponent implements OnInit {
  imageChangedEvent: any = '';
  url: any = '';
  tempBrandlogourl: any = '';

  filename = '';
  filetype = '';
  editImageUrl = '';
  submitted = false;
  itemSubscription: Subscription;
  itemSubscription2: Subscription;
  subTimeout2: Subscription;
  constructor(
    public dialogRef: MatDialogRef<EditCategoryImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<any>, 
    private dialog: MatDialog,
    private apiMessageService: ApiMessageService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.tempBrandlogourl = event.base64;
  }
  imageCroppedDone() {
    this.url = this.tempBrandlogourl;
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
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      var reader = new FileReader();
      this.filename = event.target.files[0]['name'];
      this.filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['png'];

      if (acceptedFileType.indexOf(this.filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be .png`, '', { duration: 2500 })
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.url = reader.result;
          this.editImageUrl = this.url;
        }
        this.fileChangeEvent(event);
      }
    }
  }
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if(this.url !='')
    {
      this.submitted = true;
      const date = new Date();
      let extension = this.filename.substring(this.filename.lastIndexOf('.'));
      extension = extension.toLowerCase();
      let previousName = this.filename.replace(/ /g, "_");
      previousName = previousName.replace(extension, '');
      let name = parseInt(this.data.id) + extension;
      const blob = this.dataURItoBlob(this.url);
      const file = new File([blob], name, { type: `image/${this.filetype}` });
      this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-assets/categories-images',isName: true}));

      this.itemSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
        if (res['awsImgUpload']) {
          console.log( res['awsImgUpload'].Location);
          this.url = res['awsImgUpload'].Location;
          this.url = "https://ndh.imgix.net/" + this.url.split('/').slice(3).join('/');
          let formData = {
            id: this.data.id,
            imageUrl: this.url,
          }
          this.store.dispatch(new UpdateCategoryImage(formData));
          this.itemSubscription2 = this.apiMessageService.currentApiStatus.subscribe(data => {
            if (data.status === true && data.type == ActionTypes.updateCategoryImage) {
              if (this.subTimeout2) {
                this.subTimeout2.unsubscribe();
              }
              this.subTimeout2 = Observable.timer(3000).subscribe(() => { 
                this.submitted = false;
                this.dialogRef.close();
              });
              
            }
          });
        }
      });
    } else {

    }
  }
  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }
  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.itemSubscription2) {
      this.itemSubscription2.unsubscribe();
    }
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
  }
}
