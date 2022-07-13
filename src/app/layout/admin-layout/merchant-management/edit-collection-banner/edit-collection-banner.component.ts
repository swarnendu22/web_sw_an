import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '../../../../../../node_modules/@angular/forms';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { 
  EditCollectionBanner,
  GetCollectionBannerById,
  ActionTypes
} from '../../../../actions/merchant-management.actions';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from 'rxjs';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../actions/img-upload-aws.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from '../../../../../../node_modules/ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-collection-banner',
  templateUrl: './edit-collection-banner.component.html',
  styleUrls: ['./edit-collection-banner.component.css']
})
export class EditCollectionBannerComponent implements OnInit {
  bannerForm: FormGroup;
  subscriptionApi: Subscription;
  itemSubscription2: Subscription;
  fileUploadSubscription: Subscription;
  filename = '';
  filetype = '';
  imageChangedEvent: any = '';
  collectionBannerById = null;
  banner_url: any = null;
  temp_banner_url: any = '';
  edit_banner_url = '';

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
  ) {
    this.store.dispatch(new GetCollectionBannerById(this.route.snapshot.params.id))
  }

  ngOnInit(): void {
    this.bannerForm = this.fb.group({
      collection_name: ['', Validators.required],
      display_layout: ['', Validators.required]
    });
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.collectionBannerById) {
        this.collectionBannerById = res.collectionBannerById;
        this.setformDetails();
      }
    });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.temp_banner_url = event.base64;
  }
  imageCroppedDone() {
    this.banner_url = this.temp_banner_url;
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
  setformDetails() {
    this.bannerForm.get('collection_name').setValue(this.collectionBannerById.collection_name);
    this.bannerForm.get('display_layout').setValue(this.collectionBannerById.display_layout);
    this.banner_url = this.collectionBannerById.image;
  }
  onFormSubmit() {
    if (this.bannerForm.valid) {
      if(this.banner_url != null) {
        if (this.temp_banner_url) {
          const date = new Date();
          let extension = this.filename.substring(this.filename.lastIndexOf('.'));
          extension = extension.toLowerCase();

          let previousName = this.filename.replace(/ /g, "_");
          previousName = previousName.replace(extension, '');
          let name = previousName + `_${date.getTime()}` + extension;
          const blob = this.dataURItoBlob(this.banner_url);
          const file = new File([blob], name, { type: `image/${this.filetype}` });

          this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-admin/gstn' }));

          this.itemSubscription2 = this.store.pipe(select('components')).subscribe(res => {
            if (res.awsImgUpload) {
              this.banner_url = res.awsImgUpload.Location;
              this.banner_url = "https://ndh.imgix.net/" + this.banner_url.split('/').slice(3).join('/');
              this.formSubmitafterImage();
            }
          });
        } else {
          this.formSubmitafterImage();
        }
      } else {
        this.toastr.error('Please Upload Banner Image.');
      }
    } else {
      this.markFormGroupTouched(this.bannerForm)
    }
  }
  formSubmitafterImage() {
    let payload = {
      "id": this.collectionBannerById.id,
      "collection_name": this.bannerForm.get('collection_name').value,
      "display_layout": this.bannerForm.get('display_layout').value,
      "image": this.banner_url
    }
    this.store.dispatch(new EditCollectionBanner(payload));
    this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ==  ActionTypes.editCollectionBanner) {
        this.router.navigate(['/merchant/collection-banner']);
      }
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      var reader = new FileReader();
      this.filename = event.target.files[0]['name'];
      this.filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['jpeg', 'jpg', 'png'];
      if (acceptedFileType.indexOf(this.filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be .jpeg, .jpg, .png`, '', { duration: 2500 })
      } else {
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          console.log(reader.result);
          this.banner_url = reader.result;
          this.edit_banner_url = this.banner_url;
        }
        this.fileChangeEvent(event);
      }
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
  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.reset(formGroup.value);
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
    if (this.itemSubscription2) {
      this.itemSubscription2.unsubscribe();
    }
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
  }
}
