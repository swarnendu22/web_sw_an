import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AddNewQuicklinkComponent } from '../add-new-quicklink/add-new-quicklink.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { FormGroup, Validators, FormBuilder } from '../../../../../../node_modules/@angular/forms';

import { DialogLatLongComponent } from '../store-info/dialog-lat-long/dialog-lat-long.component';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../actions/img-upload-aws.action';
import { GetCountries } from '../../../../actions/storeManagement.action';
import { GetRegionsList, PostStoreBanner } from '../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { getFileFromUrl } from '../../../../utils/imgLib';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-add-store-banner',
  templateUrl: './add-store-banner.component.html',
  styleUrls: ['./add-store-banner.component.css']
})
export class AddStoreBannerComponent implements OnInit {
  storeBannerForm: FormGroup
  sectors = [
    {
      sectorId: 1,
      sectorName: 'Food',
    },
    {
      sectorId: 2,
      sectorName: 'Mart',
    },
    {
      sectorId: 3,
      sectorName: 'Shopping',
    },
    {
      sectorId: 4,
      sectorName: 'Medicine',
    },
    {
      sectorId: 5,
      sectorName: 'Wine',
    },
    {
      sectorId: 6,
      sectorName: 'Service',
    },
    {
      sectorId: 7,
      sectorName: 'Banking',
    }
  ]

  countries = null
  regions = null
  map = { lat: 0.00, lng: 0.00 };
  refX = '1080px'
  imgHeight = ''
  imgWidth = ''
  fileurl: any
  bannerType = null
  fileUploadSubscription: Subscription;
  constructor(
    private store: Store<any>,
    // public dialogRef: MatDialogRef<AddNewQuicklinkComponent>,
    private apiMessageService: ApiMessageService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.bannerType = this.activatedRoute.snapshot.params.bannerType;
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetRegionsList());
  }

  ngOnInit() {
    this.storeBannerForm = this.fb.group({
      bannerName: ['', [Validators.required]],
      bannerPosition: [null],
      sectorId: [null, Validators.required],
      baseRegion: [null],
      baseCountry: [null],
      bannerType: [this.bannerType, [Validators.required]],
      baseLat: [this.map.lat,],
      baseLong: [this.map.lng,],
      accessibility: ['', Validators.required],
      listingRange: [null,],
      isFree: [false,],
      isGeneral: [false,],
      expiryDate: [null, Validators.required],
      amountPaid: [null,],
      paymentMethod: [null,],
      transactionReference: [null,],
      transactionDate: [null,],
      address: ['',],
      image_url: ['', Validators.required],
      redirection: ['',],
      html_url: [''],
      htmlDisplayType: [''],
      storeSlugUrl: [''],
      pageUrl: [''],
      quicklinkName: [''],
      quicklinkLabel: [''],
      storesLabel: [''],
      storesQuery: [''],
      storesFilter: [''],

    });
    this.storeBannerForm.get('bannerType').setValue(this.bannerType)
    this.store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries = res['countries'] ? res['countries']['payload'] : '';
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }

  openDialogLatLong() {
    const dialogRef = this.dialog.open(DialogLatLongComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.map.lat = result.lat
      this.map.lng = result.lng

      this.storeBannerForm.get('baseLat').setValue(this.map.lat);
      this.storeBannerForm.get('baseLong').setValue(this.map.lng);
      this.storeBannerForm.get('address').setValue(result.address);

    });
  }

  onSubmit() {
    const sector = this.sectors.find(e => e.sectorId == this.storeBannerForm.get('sectorId').value)
    let payload = {
      bannerName: this.storeBannerForm.get('bannerName').value,
      bannerPosition: this.storeBannerForm.get('bannerPosition').value ? this.storeBannerForm.get('bannerPosition').value : null,
      sectorId: this.storeBannerForm.get('sectorId').value,
      sectorName: sector.sectorName,
      baseRegion: this.storeBannerForm.get('baseRegion').value,
      baseCountry: this.storeBannerForm.get('baseCountry').value,
      bannerType: this.storeBannerForm.get('bannerType').value,
      baseLat: this.storeBannerForm.get('baseLat').value,
      baseLong: this.storeBannerForm.get('baseLong').value,
      accessibility: this.storeBannerForm.get('accessibility').value,
      listingRange: this.storeBannerForm.get('listingRange').value,
      isFree: this.storeBannerForm.get('isFree').value,
      isGeneral: this.storeBannerForm.get('isGeneral').value,
      expiryDate: this.storeBannerForm.get('expiryDate').value,
      amountPaid: this.storeBannerForm.get('amountPaid').value,
      paymentMethod: this.storeBannerForm.get('paymentMethod').value,
      transactionReference: this.storeBannerForm.get('transactionReference').value,
      transactionDate: this.storeBannerForm.get('transactionDate').value,
      address: this.storeBannerForm.get('address').value,

    }

    let imgWidth;
    let imgHeight;
    if (this.storeBannerForm.get('bannerType').value == 'MASTER') {
      imgWidth = '1080px'
      imgHeight = '500px'
    } else if (this.storeBannerForm.get('bannerType').value == 'BRAND') {
      imgWidth = '250px'
      imgHeight = '250px'
    } else if (this.storeBannerForm.get('bannerType').value == 'FEATURED') {
      imgWidth = '400px'
      imgHeight = '400px'
    }
    let fullBannerData = {
      dimension: {
        width: imgWidth,
        height: imgHeight,
        ref_x: this.refX
      },
      image_url: this.storeBannerForm.get('image_url').value,
      redirection: this.storeBannerForm.get('redirection').value
    }
    let bannerData = {};
    if (this.storeBannerForm.get('redirection').value == 'HTML') {
      bannerData['HTML'] = {
        url: this.storeBannerForm.get('html_url').value,
        display: this.storeBannerForm.get('htmlDisplayType').value
      }
    }
    else if (this.storeBannerForm.get('redirection').value == 'STORES') {
      bannerData['STORES'] = {
        storesLabel: this.storeBannerForm.get('storesLabel').value,
        storesQuery: this.storeBannerForm.get('storesQuery').value,
        storesFilter: this.storeBannerForm.get('storesFilter').value,
      }
    }
    else if (this.storeBannerForm.get('redirection').value == 'STORE') {
      bannerData['STORE'] = this.storeBannerForm.get('storeSlugUrl').value

    }
    else if (this.storeBannerForm.get('redirection').value == 'QUICKLINK_TAG') {
      bannerData['QUICKLINK_TAG'] = {
        quicklinkName: this.storeBannerForm.get('quicklinkName').value,
        quicklinkLabel: this.storeBannerForm.get('quicklinkLabel').value
      }
    }
    else if (this.storeBannerForm.get('redirection').value == 'PAGE') {
      bannerData['PAGE'] = this.storeBannerForm.get('pageUrl').value
    }
    fullBannerData['data'] = bannerData

    payload['bannerData'] = JSON.stringify(fullBannerData)
    console.log(payload)

    this.store.dispatch(new PostStoreBanner(payload))


  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['jpeg', 'jpg'];
      var reader = new FileReader();

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = () => { // called once readAsDataURL is completed
          this.fileurl = reader.result;
          this.checkImageResolution(event.target.files[0], reader.result)


        }
      }
    }
  }


  checkImageResolution(file, readerResult) {
    let imgWidth;
    let imgHeight;
    var newImg = new Image();
    newImg.onload = function () {
      imgHeight = `${newImg.height}px`
      imgWidth = `${newImg.width}px`

      try {
        if (this.storeBannerForm.get('bannerType').value == 'MASTER') {
          if (imgWidth == '1080px' && imgHeight == '500px') {
            this.storeBannerForm.get('image_url').setValue(file)
          }
          else {
            this.fileurl = '';
            this.storeBannerForm.get('image_url').setValue(null)
            throw new Error('error')
          }
        } else if (this.storeBannerForm.get('bannerType').value == 'BRAND') {
          if (imgWidth == '250px' && imgHeight == '250px') {
            this.storeBannerForm.get('image_url').setValue(file)
          }
          else {
            this.fileurl = '';
            this.storeBannerForm.get('image_url').setValue(null)
            throw new Error('error')
          }
        } else if (this.storeBannerForm.get('bannerType').value == 'FEATURED') {
          if (imgWidth == '400px' && imgHeight == '400px') {
            this.storeBannerForm.get('image_url').setValue(file)
          }
          else {
            this.fileurl = '';
            this.storeBannerForm.get('image_url').setValue(null)
            throw new Error('error')
          }
        }
      } catch (error) {
        this.matSnackBar.open(`Image Resoulation should be as mentioned`, '', { duration: 5000 })
      }

    }.bind(this);
    newImg.src = this.fileurl;

  }


  // changeAccessibilty() {
  //   console.log(this.storeBannerForm.get('accessibility').value)
  //   this.storeBannerForm.get('baseRegion').clearValidators()
  //   this.storeBannerForm.get('baseRegion').setValidators(null)
  //   this.storeBannerForm.get('baseRegion').markAsUntouched()
  //   this.storeBannerForm.get('baseCountry').clearValidators()
  //   this.storeBannerForm.get('baseCountry').markAsUntouched()
  //   this.storeBannerForm.get('baseLat').clearValidators()
  //   this.storeBannerForm.get('baseLat').markAsUntouched()
  //   this.storeBannerForm.get('baseLong').clearValidators()
  //   this.storeBannerForm.get('baseLong').markAsUntouched()
  //   this.storeBannerForm.get('listingRange').clearValidators()
  //   this.storeBannerForm.get('listingRange').markAsUntouched()
  //   this.storeBannerForm.get('address').clearValidators()
  //   this.storeBannerForm.get('address').markAsUntouched()

  //   this.storeBannerForm.get('baseRegion').updateValueAndValidity()
  //   this.storeBannerForm.get('baseCountry').updateValueAndValidity()
  //   this.storeBannerForm.get('baseLat').updateValueAndValidity()
  //   this.storeBannerForm.get('baseLong').updateValueAndValidity()
  //   this.storeBannerForm.get('listingRange').updateValueAndValidity()
  //   this.storeBannerForm.get('address').updateValueAndValidity()
  //   this.storeBannerForm.updateValueAndValidity()

  //   this.storeBannerForm.get('baseRegion').enable()
  //   this.storeBannerForm.get('baseCountry').enable()
  //   this.storeBannerForm.get('baseLat').enable()
  //   this.storeBannerForm.get('baseLong').enable()
  //   this.storeBannerForm.get('listingRange').enable()
  //   this.storeBannerForm.get('address').enable()

  //   if (this.storeBannerForm.get('accessibility').value == 'LOCAL') {
  //     console.log('local')
  //     this.storeBannerForm.get('baseRegion').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseCountry').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseLat').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseLong').setValidators([Validators.required])
  //     this.storeBannerForm.get('listingRange').setValidators([Validators.required])
  //     this.storeBannerForm.get('address').setValidators([Validators.required])
  //     this.storeBannerForm.updateValueAndValidity()
  //     this.storeBannerForm.get('baseRegion').updateValueAndValidity()
  //     this.storeBannerForm.get('baseCountry').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLat').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLong').updateValueAndValidity()
  //     this.storeBannerForm.get('listingRange').updateValueAndValidity()
  //     this.storeBannerForm.get('address').updateValueAndValidity()

  //   }
  //   else if (this.storeBannerForm.get('accessibility').value == 'COUNTRY') {
  //     this.storeBannerForm.get('baseCountry').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseRegion').disable()
  //     this.storeBannerForm.get('listingRange').disable()
  //     this.storeBannerForm.get('address').disable()
  //     this.storeBannerForm.get('baseLat').setValue(0.0000)
  //     this.storeBannerForm.get('baseLong').setValue(0.0000)
  //     this.storeBannerForm.get('listingRange').setValue(0)
  //     this.storeBannerForm.get('baseRegion').updateValueAndValidity()
  //     this.storeBannerForm.get('baseCountry').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLat').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLong').updateValueAndValidity()
  //     this.storeBannerForm.get('listingRange').updateValueAndValidity()
  //     this.storeBannerForm.get('address').updateValueAndValidity()
  //     this.storeBannerForm.updateValueAndValidity()

  //   }
  //   if (this.storeBannerForm.get('accessibility').value == 'REGION') {
  //     this.storeBannerForm.get('baseRegion').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseCountry').setValidators([Validators.required])
  //     this.storeBannerForm.get('baseLat').setValue(0.0000)
  //     this.storeBannerForm.get('baseLong').setValue(0.0000)
  //     this.storeBannerForm.get('listingRange').setValue(0)
  //     this.storeBannerForm.get('listingRange').disable()
  //     this.storeBannerForm.get('address').disable()
  //     this.storeBannerForm.get('baseRegion').updateValueAndValidity()
  //     this.storeBannerForm.get('baseCountry').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLat').updateValueAndValidity()
  //     this.storeBannerForm.get('baseLong').updateValueAndValidity()
  //     this.storeBannerForm.get('listingRange').updateValueAndValidity()
  //     this.storeBannerForm.get('address').updateValueAndValidity()

  //     this.storeBannerForm.updateValueAndValidity()
  //   }
  // }


  changeAccessibilty() {
    this.storeBannerForm.get('baseRegion').enable()
    this.storeBannerForm.get('baseCountry').enable()
    this.storeBannerForm.get('baseLat').enable()
    this.storeBannerForm.get('baseLong').enable()
    this.storeBannerForm.get('listingRange').enable()
    this.storeBannerForm.get('address').enable()

    if (this.storeBannerForm.get('accessibility').value == 'COUNTRY') {
      this.storeBannerForm.get('baseRegion').disable()
      this.storeBannerForm.get('listingRange').disable()
      this.storeBannerForm.get('address').disable()
      this.storeBannerForm.get('baseLat').setValue(0.0000)
      this.storeBannerForm.get('baseLong').setValue(0.0000)
      this.storeBannerForm.get('listingRange').setValue(0)


    }
    if (this.storeBannerForm.get('accessibility').value == 'REGION') {

      this.storeBannerForm.get('baseLat').setValue(0.0000)
      this.storeBannerForm.get('baseLong').setValue(0.0000)
      this.storeBannerForm.get('listingRange').setValue(0)
      this.storeBannerForm.get('listingRange').disable()
      this.storeBannerForm.get('address').disable()
    }
  }


  validateForm() {
    let status = true;
    if (this.storeBannerForm.get('accessibility').value == 'LOCAL') {
      if (this.storeBannerForm.get('baseRegion').value == null) {
        this.toaster.error('Region is Required')
        status = false
      }
      if (this.storeBannerForm.get('baseCountry').value == null) {
        this.toaster.error('Country is Required')
        status = false
      }
      if (this.storeBannerForm.get('baseLat').value == '') {
        this.toaster.error('Lattitude is Required')
        status = false
      }
      if (this.storeBannerForm.get('baseLong').value == '') {
        this.toaster.error('Longitude is Required')
        status = false
      }
      if (this.storeBannerForm.get('listingRange').value == null) {
        this.toaster.error('Listing Range is Required')
        status = false
      }
      if (this.storeBannerForm.get('address').value == '') {
        this.toaster.error('Address is Required')
        status = false
      }

    }
    else if (this.storeBannerForm.get('accessibility').value == 'COUNTRY') {
      if (this.storeBannerForm.get('baseCountry').value == null) {
        this.toaster.error('Country is Required')
        status = false
      }
    }

    else if (this.storeBannerForm.get('accessibility').value == 'REGION') {
      if (this.storeBannerForm.get('baseCountry').value == null) {
        this.toaster.error('Country is Required')
        status = false
      }
      if (this.storeBannerForm.get('baseRegion').value == null) {
        this.toaster.error('Region is Required')
        status = false
      }
    }

    return status

  }

  async formSubmit() {
    if (this.storeBannerForm.valid && this.validateForm() == true) {
      let file;
      let filename;
      let filetype;
      let applicationtype;
      if (typeof this.storeBannerForm.get('image_url').value == 'object') {
        file = this.storeBannerForm.get('image_url').value;
      } else {
        file = await getFileFromUrl(this.storeBannerForm.get('image_url').value)
      }
      filename = file['name'];
      filetype = file['type'].split('/')[1];
      applicationtype = file['type'];

      this.uploadFileToAws(file, filename, filetype, applicationtype, )
    } else {
      this.markFormGroupTouched(this.storeBannerForm)
    }
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype) {
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
        this.storeBannerForm.get('image_url').setValue(res['awsImgUpload'].Location)
        this.onSubmit()
        this.fileUploadSubscription.unsubscribe()
      }
    });
  }
  imageReset() {
    this.fileurl = '';
    this.storeBannerForm.get('image_url').setValue(null)
  }
}
