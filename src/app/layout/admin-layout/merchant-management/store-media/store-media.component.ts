import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { GetStoreImages, PostStoreImages } from 'src/app/actions/merchant-management.actions';
import { ImageCropperPopupComponent } from '../image-cropper-popup/image-cropper-popup.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from '../../../../../../node_modules/rxjs';

import { UploadImageToAws, StoreImgUploadToAws } from '../../../../actions/img-upload-aws.action';


@Component({
  selector: 'app-store-media',
  templateUrl: './store-media.component.html',
  styleUrls: ['./store-media.component.css']
})
export class StoreMediaComponent implements OnInit {
  storeCoverImages = []
  storeLogoImage = null
  storeId = null;
  storeImages = null;
  fileUploadSubscription: Subscription;

  constructor(private store: Store<any>,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreImages(this.storeId));
  }

  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeImages) {
        this.storeImages = res.storeImages[0];
        this.storeLogoImage = this.storeImages.storeStoreLogoImage;
        this.storeCoverImages = this.storeImages.storeCoverImage ? JSON.parse(this.storeImages.storeCoverImage) : [];
      }
    });
  }

  onSelectFile(event, filefor, index = null) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      const acceptedFileType = ['jpeg', 'jpg', 'png', 'gif'];;
      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        // if (filefor == 'store_logo_url' || filefor == 'store_cover_image') {
        this.doImageCrop(event, filefor, index)
      }
    }
  }

  doImageCrop(event, uploadFor, index = null) {
    const dialogRef = this.dialog.open(ImageCropperPopupComponent, {
      width: '500px',
      height: '360px',
      panelClass: 'image-crop-dialog',
      data: { event, uploadFor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { newfile, filename, filetype, applicationtype, uploadFor } = result
        this.uploadFileToAws(newfile, filename, filetype, applicationtype, uploadFor, index)
      }
    });
  }


  uploadFileToAws(fileObj, filename, filetype, applicationtype, uploadFor, index = null) {
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const file = new File([fileObj], name, { type: applicationtype })

    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        console.log('submit post')
        let payload;
        if (uploadFor == 'store_logo_url') {
          payload = {
            id: this.storeId,
            storeCoverImage: this.storeCoverImages,
            storeStoreLogoImage: res['awsImgUpload'].Location
          }
        } else {
          const coverImages = this.storeCoverImages
          if (index == null) {
            coverImages.push(res['awsImgUpload'].Location)
          } else {
            coverImages[index] = res['awsImgUpload'].Location
          }
          payload = {
            id: this.storeId,
            storeCoverImage: coverImages,
            storeStoreLogoImage: this.storeLogoImage
          }
        }

        console.log(payload)
        this.store.dispatch(new PostStoreImages(payload))
        this.fileUploadSubscription.unsubscribe()
        ////----- SAVE IMAGE DONE ----/////////
      }
    });
  }


}
