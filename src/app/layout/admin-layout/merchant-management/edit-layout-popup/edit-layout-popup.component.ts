import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { StoreImgUploadToAws, UploadImageToAws } from '../../../../actions/img-upload-aws.action';
import { ImageCropperPopupComponent } from '../image-cropper-popup/image-cropper-popup.component';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { EditStoreListLayout, SwitchStoreListLayoutAndPublish } from '../../../../actions/merchant-management.actions';

@Component({
  selector: 'app-edit-layout-popup',
  templateUrl: './edit-layout-popup.component.html',
  styleUrls: ['./edit-layout-popup.component.css']
})
export class EditLayoutPopupComponent implements OnInit {
  fileUploadSubscription: Subscription;
  layout_name = null
  editlayoutForm: FormGroup
  layoutCover = null
  promo_text = null
  promo_icon = null
  error = {
    image: null,
  }
  layout_data = null
  layouts = {
    'L3003': ['layoutCover', 'promoText', 'promoIcon', 'productImageComponent0', 'productImageComponent1', 'productImageComponent2', 'productImageComponent3'],
    'L3002': ['layoutCover', 'promoText', 'promoIcon', 'productImageComponent0', 'productImageComponent1', 'productImageComponent2', 'productImageComponent3', 'productImageComponent4'],
    'L3001': ['layoutCover', 'promoText', 'promoIcon', 'productImageComponent0', 'productImageComponent1', 'productImageComponent2'],
    'L2001': ['layoutCover', 'promoText', 'promoIcon'],
    'L2002': ['promoText', 'promoIcon', 'productImageComponent0', 'productImageComponent1', 'productImageComponent2', 'productImageComponent3'],
    'L2003': ['layoutCover', 'promoText', 'promoIcon'],
    'L2004': ['layoutCover', 'promoText', 'promoIcon'],
    'L2005': ['layoutCover', 'promoText', 'promoIcon'],
    'L2006': ['layoutCover', 'promoText', 'promoIcon'],
    'L1001': ['promoText', 'promoIcon']
  }
  promoIcons = [
    'https://ndh.imgix.net/ndh-assets/img/discount.svg',
    'https://ndh.imgix.net/ndh-assets/img/hygiene.svg',
    'https://ndh.imgix.net/ndh-assets/img/fresh.svg',
  ]
  featuredImagesLength = 5
  featuredimages = Array
  featuredImagesObj = [null, null, null, null, null]
  layout_id = null
  storeId = null
  is_default = null
  openFor = null
  constructor(
    public dialogRef: MatDialogRef<EditLayoutPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>,
    private matSnackBar: MatSnackBar, public dialog: MatDialog) {
    this.layout_name = this.data.layout_name
    this.layout_id = this.data.layout_id
    this.storeId = this.data.storeId
    this.openFor = this.data.openFor
    this.is_default = this.data.is_default
    this.layout_data = JSON.parse(this.data.data)
    console.log(this.layout_data)
  }

  ngOnInit() {
    if (this.layout_data) {
      Object.keys(this.layout_data).forEach(x => {
        console.log(x)
        switch (x) {
          case 'images':
            this.featuredImagesObj = this.layout_data[x]
            this.featuredImagesLength = this.layout_data[x].length ? this.layout_data[x].length : this.featuredImagesLength
            break;
          case 'base_image':
            this.layoutCover = this.layout_data[x]
            break;
          case 'promo_text':
            this.promo_text = this.layout_data[x]
            break;
          case 'promo_icon':
            this.promo_icon = this.layout_data[x]
            break;
          default:
            break;
        }
      });

    }
  }

  checkCoverImage() {
    const coverImagesArr = ['L2001', 'L2006', 'L2005', 'L2003', 'L2004', 'L3002', 'L3001', 'L3003']
    if (coverImagesArr.includes(this.layout_name))
      return true
    else
      return false
  }
  checkFeaturedImage() {
    const coverImagesArr = ['L3002', 'L3001', 'L3003', 'L2002']
    if (coverImagesArr.includes(this.layout_name))
      return true
    else
      return false
  }

  onSelectFile(event, filefor, index = null) {
    if (event.target.files && event.target.files[0]) {

      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      const acceptedFileType = ['jpeg', 'jpg', 'png', 'gif'];
      var reader = new FileReader();
      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = () => {
          // called once readAsDataURL is completed

          if (filefor == 'store_logo_url') {
            this.checkImageResolution(event.target.files[0], reader.result, filename, filetype, applicationtype, 'layoutCover')
            // this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, 'layoutCover')
          } else {
            this.checkImageResolution(event.target.files[0], reader.result, filename, filetype, applicationtype, 'featuredImage', index)
            // this.uploadFileToAws(event.target.files[0], filename, filetype, applicationtype, 'featuredImage', index)
          }


        }
        // this.doImageCrop(event, filefor, index)
      }
    }

  }


  checkImageResolution(file, readerResult, filename, filetype, applicationtype, uploadedfor, index = null) {
    console.log('checking image resolution')
    let imgWidth;
    let imgHeight;
    var newBannerImg = new Image();
    newBannerImg.onload = function () {
      console.log('entered')
      imgHeight = `${newBannerImg.height}`
      imgWidth = `${newBannerImg.width}`

      try {
        if (uploadedfor == 'featuredImage') {
          console.log(this.layout_data['image_hight'], '-', this.layout_data['image_width'])
          console.log(imgHeight, '--', imgWidth)

          if (imgHeight != this.layout_data['image_hight'] && imgWidth != this.layout_data['image_width']) {
            this.featuredImagesObj[index] = null
            throw new Error('error')
          } else {
            this.uploadFileToAws(file, filename, filetype, applicationtype, uploadedfor, index)
          }
        }
        else if (uploadedfor == 'layoutCover') {
          if (imgWidth != this.layout_data['base_image_width'] && imgHeight != this.layout_data['base_image_hight']) {
            this.layoutCover = null
            throw new Error('error')
          } else {
            this.uploadFileToAws(file, filename, filetype, applicationtype, uploadedfor)
          }
        }

      } catch (error) {
        this.matSnackBar.open(`Image Resoulation should be as mentioned`, '', { duration: 5000 })
      }

    }.bind(this);
    newBannerImg.src = readerResult;

  }
  // checkImageResolution(file, readerResult, filename, filetype, applicationtype, uploadedfor, index = null) {
  //   console.log('checking image resolution')
  //   let imgWidth;
  //   let imgHeight;
  //   var newBannerImg = new Image();
  //   newBannerImg.onload = function () {
  //     console.log('entered')
  //     imgHeight = `${newBannerImg.height}`
  //     imgWidth = `${newBannerImg.width}`

  //     try {

  //       Object.keys(this.layout_data).forEach(x => {
  //         console.log(x)
  //         console.log(imgHeight, '--', imgWidth)
  //         switch (x) {
  //           case 'images':
  //             console.log('case : images')
  //             console.log(this.layout_data['image_hight'], '-', this.layout_data['image_width'])
  //             if (imgHeight != this.layout_data['image_hight'] && imgWidth != this.layout_data['image_width']) {
  //               this.featuredImagesObj[index] = null
  //               throw new Error('error')
  //             } else {
  //               this.uploadFileToAws(file, filename, filetype, applicationtype, uploadedfor, index)
  //             }
  //             break;
  //           case 'base_image':
  //             console.log('case : images')
  //             if (imgWidth != this.layout_data['base_image_width'] && imgHeight != this.layout_data['base_image_hight']) {
  //               this.layoutCover = null
  //               throw new Error('error')
  //             } else {
  //               this.uploadFileToAws(file, filename, filetype, applicationtype, uploadedfor)
  //             }
  //             break;
  //           default:
  //             break;
  //         }
  //       });

  //     } catch (error) {
  //       this.matSnackBar.open(`Image Resoulation should be as mentioned`, '', { duration: 5000 })
  //     }

  //   }.bind(this);
  //   newBannerImg.src = readerResult;

  // }


  doImageCrop(event, uploadFor, index = null) {
    const dialogRef = this.dialog.open(ImageCropperPopupComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'image-crop-dialog',
      data: { event, uploadFor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var reader = new FileReader();
        const { newfile, filename, filetype, applicationtype, uploadFor } = result
        const file = new File([newfile], filename, { type: applicationtype })
        reader.readAsDataURL(file); // read file as data url

        reader.onload = () => { // called once readAsDataURL is completed
          // this.editlayoutForm.get('storeLogoUrl').setValue(file);
          this.layoutCover = reader.result;
          this.error.image = null

        }
        // this.uploadFileToAws(newfile, filename, filetype, applicationtype, uploadFor, index)
      }
    });
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, uploadedfor, index = null) {
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
        console.log(res['awsImgUpload'].Location)
        if (uploadedfor == 'layoutCover') {
          this.layoutCover = res['awsImgUpload'].Location;
        } else {
          this.featuredImagesObj[index] = res['awsImgUpload'].Location
        }

        this.fileUploadSubscription.unsubscribe()

        ////----- SAVE IMAGE DONE ----/////////
      }
    });
  }

  checkIsActive(icon) {
    // console.log(this.promo_icon, '---', icon)
    if (this.promo_icon == icon) {
      return true
    } else {
      return false
    }

  }
  setPromoIcon(icon) {
    this.promo_icon = icon

  }

  onSubmit(publishLayout = false) {

    const payloadObj = {
      data: {},
      is_default: this.is_default,
      layoutId: this.layout_id,
      store_id: this.storeId
    }
    Object.keys(this.layout_data).forEach(x => {
      console.log(x)
      switch (x) {
        case 'images':
          payloadObj.data[x] = this.featuredImagesObj
          break;
        case 'base_image':
          payloadObj.data[x] = this.layoutCover;
          break;
        case 'promo_text':
          payloadObj.data[x] = this.promo_text;
          break;
        case 'promo_icon':
          payloadObj.data[x] = this.promo_icon;
          break;
        default:
          payloadObj.data[x] = this.layout_data[x];
          break;
      }
    });
    payloadObj.data['edited_by_seller'] = true
    payloadObj.data = JSON.stringify(payloadObj.data)
    console.log(payloadObj)
    this.store.dispatch(new EditStoreListLayout(payloadObj, publishLayout))
  }



}
