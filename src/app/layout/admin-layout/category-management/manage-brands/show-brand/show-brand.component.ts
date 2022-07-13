import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { brandManagementState } from '../../../../../reducers/brand-management.reducers';
import { GetBrandDetails, PostNewBrand, ResetBrandDetails, GetBrandOwnerList } from '../../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { RequestService } from '../../../../../utils/request/request.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';
import { ActionTypes } from '../../../../../actions/brand-management.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css']
})
export class ShowBrandComponent implements OnInit, OnDestroy {
  itemList = [];
  settings = {};
  imageChangedEvent: any = '';
  brandOwnerList = [];
  brandDetails = null;
  brandLogoUrl: any = ''
  tempBrandlogourl: any = ''
  id = null;
  newBrandForm: FormGroup;
  submitted = false;
  brandNameAvailibilityCheck = false;
  brandNameAvailibilityCheckText = null;
  readonly = true;
  disable = true;
  selectedCategoryIds = [];
  selectCategoryIds = [];
  selectedItem: any = null;
  isSubmit = false
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Search Category...';
  public MaxDisplayed = 5;

  filename = '';
  filetype = '';
  editBrandLogoUrl = '';
  prevBrandName = '';

  itemSubscription: Subscription;
  itemSubscription2: Subscription;
  itemSubscription3: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<brandManagementState>,
    private route: ActivatedRoute,
    private apiMessageService: ApiMessageService,
    public router: Router,
    public requestService: RequestService,
    private toastr: ToastrService,
    private matSnackBar: MatSnackBar,
    private ngZone: NgZone,
  ) {
    this.ngZone.run(() => {
      this.store.dispatch(new GetBrandOwnerList('false'));
      this.id = this.route.snapshot.params.id
      this.store.dispatch(new GetBrandDetails(this.id));
    });
  }
  ngOnInit() {
    this.newBrandForm = this.formBuilder.group({
      id: [this.id],
      brandOwner: null,
      createdAt: null,
      createdBy: null,
      brandName: ["", [Validators.required, Validators.maxLength(100)]],
      //brandShortName: ["", [Validators.required, Validators.maxLength(30)]],
      brandLogoUrl: [null],
      profilePage: [null],
      active: ["1", Validators.required],
      isPrimiumBrand: [false],
      isRequiredAuthorisation: [false]
    });
    this.settings = {
      singleSelection: false,
      text: "Select Category",
      selectAllText: 'Select All',
      unSelectAllText: "UnSelect All",
      searchPlaceholderText: "Search Category",
      enableSearchFilter: true,
      badgeShowLimit: 4,
      groupBy: "category"
    };
    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      if (res.brandOwnerList) {
        this.brandOwnerList = res.brandOwnerList;
      }
      if(res.brandDetails) {
        this.brandDetails = res.brandDetails;
      }
      this.setupBrandForm();
    });
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.tempBrandlogourl = event.base64;
  }
  imageCroppedDone() {
    this.brandLogoUrl = this.tempBrandlogourl;
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

  private process(data): any {
    let result = [];
    result = data.map((item) => {
      return this.toTreeNode(item);
    });
    return result;
  }

  private toTreeNode(node, parent = null) {

    if (node && node.childList) {
      node.childList.map(item => {
        return this.toTreeNode(item, node);
      });
    }
    return node;
  }
  get f() {
    return this.newBrandForm.controls;
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

  async onSubmit() {
    this.submitted = true;
    this.isSubmit = true
    const keyword = this.newBrandForm.value['brandName'];
    if (this.newBrandForm.valid) {
      if (this.newBrandForm.get('brandName').dirty && this.brandDetails['brandName'] !== keyword) {
        const checkStatusRes = await this.checkAvailabilityService(keyword);
        this.itemSubscription = checkStatusRes.subscribe(res => {
          if (res['payload'].length > 0 && res['payload'][0].isAvailable == 'NO') {
            this.brandNameAvailibilityCheckText = 'Brand name is Already Exist';
            this.isSubmit = false
          } else {
            if (this.tempBrandlogourl) {
              const date = new Date();
              let extension = this.filename.substring(this.filename.lastIndexOf('.'));
              extension = extension.toLowerCase();

              let previousName = this.filename.replace(/ /g, "_");
              previousName = previousName.replace(extension, '');
              let name = previousName + `_${date.getTime()}` + extension;
              const blob = this.dataURItoBlob(this.brandLogoUrl);
              const file = new File([blob], name, { type: `image/${this.filetype}` });

              this.store.dispatch(new UploadImageToAws({ file, folderName: 'brand-icon' }));

              this.itemSubscription2 = this.store.pipe(select<any, any>('components')).subscribe(res => {
                if (res['awsImgUpload']) {
                  this.brandLogoUrl = res['awsImgUpload'].Location;
                  this.brandLogoUrl = "https://ndh.imgix.net/" + this.brandLogoUrl.split('/').slice(3).join('/');
                  this.formSubmitafterImage();
                }
              });
            }
            else {
              this.formSubmitafterImage();
            }
          }
        });
      } else {
        if (this.tempBrandlogourl) {
          const date = new Date();
          let extension = this.filename.substring(this.filename.lastIndexOf('.'));
          extension = extension.toLowerCase();

          let previousName = this.filename.replace(/ /g, "_");
          previousName = previousName.replace(extension, '');
          let name = previousName + `_${date.getTime()}` + extension;
          const blob = this.dataURItoBlob(this.brandLogoUrl);
          const file = new File([blob], name, { type: `image/${this.filetype}` });

          this.store.dispatch(new UploadImageToAws({ file, folderName: 'brand-icon' }));

          this.store.pipe(select<any, any>('components')).subscribe(res => {
            if (res['awsImgUpload']) {
              this.brandLogoUrl = res['awsImgUpload'].Location;
              this.brandLogoUrl = "https://ndh.imgix.net/" + this.brandLogoUrl.split('/').slice(3).join('/');
              this.formSubmitafterImage();
            }
          });
        }
        else {
          this.formSubmitafterImage();
        }
      }
    } else {
      this.markFormGroupTouched(this.newBrandForm);
      this.isSubmit = false

    }
  }
  formSubmitafterImage() {
    let newBrandFormData = this.newBrandForm.value
    newBrandFormData.id = this.brandDetails['id']
    newBrandFormData.brandName = this.newBrandForm.value['brandName'];
    newBrandFormData.brandLogoUrl = this.brandLogoUrl
    newBrandFormData.isPrimiumBrand = this.newBrandForm.value.isPrimiumBrand ? 1 : 0
    newBrandFormData.isRequiredAuthorisation = this.newBrandForm.value.isRequiredAuthorisation ? 1 : 0
    newBrandFormData.active = this.newBrandForm.value.active
    this.store.dispatch(new PostNewBrand(newBrandFormData));
    this.itemSubscription3 = this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.postNewBrand) {
        if(newBrandFormData.active=='0') {
          localStorage.setItem('tabIndexBand', '1');
        } else {
          localStorage.setItem('tabIndexBand', '0');
        }
        this.ngZone.run(() => {
          this.router.navigate(['/category/manage']);
        });
      }
    });
  }
  setupBrandForm() {
    if (this.brandDetails) {
      this.brandLogoUrl = this.brandDetails['brandLogoUrl'];
      this.newBrandForm.get('brandOwner').setValue(this.brandDetails['brandOwner']);
      this.newBrandForm.get('brandName').setValue(this.brandDetails['brandName']);
      //this.newBrandForm.get('brandShortName').setValue(this.brandDetails['brandShortName']);
      this.newBrandForm.get('brandLogoUrl').setValue(this.brandDetails['brandLogoUrl']);
      // this.newBrandForm.get('profilePage').setValue(this.brandDetails['profilePage']);
      this.newBrandForm.get('active').setValue(this.brandDetails['active']);
      this.newBrandForm.get('isPrimiumBrand').setValue(this.brandDetails['isPrimiumBrand']);
      this.newBrandForm.get('isRequiredAuthorisation').setValue(this.brandDetails['isRequiredAuthorisation']);

      this.newBrandForm.get('createdAt').setValue(this.brandDetails['createdAt']);
      this.newBrandForm.get('createdBy').setValue(this.brandDetails['createdBy']);
      this.newBrandForm.disable();
    }
  }

  goBack() {
    this.ngZone.run(() => {
      this.router.navigate(['/category/manage']);
    });
  }

  getStatusString() {
    const status = +this.newBrandForm.value.active;
    switch (status) {
      case 1:
        return 'Active';
      case 0:
        return 'Discontinued';
      case 2:
        return 'Hold';
      case 3:
        return 'Blocked';
      default:
        return 'Active';
    }
  }
  async checkAvailabilityService(keyword) {
    return await this.requestService
      .request(
        {
          method: 'get',
          url: `/api/ndh-product/brand-api/brands/check-availability?name=${keyword}`,
        },
        true
      )
  }
  async checkAvailability(event) {
    const keyword = this.newBrandForm.value['brandName'];
    if (!keyword) {
      this.brandNameAvailibilityCheckText = "Brand name can't be blank";
    } else {
      const checkStatusRes = await this.checkAvailabilityService(keyword)
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0 && res['payload'][0].isAvailable == 'NO') {
          this.brandNameAvailibilityCheckText = 'Brand name is Already Exist';
        } else {
          this.brandNameAvailibilityCheckText = 'Brand name is Valid';
        }
      });
    }
  }

  toggleFormDisable(formName, toggleType) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.disable = false;
    } else {
      formStats.disable();
      this.disable = true;
    }
    if(toggleType == 'cancel') {
      this.setupBrandForm();
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
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
      var reader = new FileReader();
      this.filename = event.target.files[0]['name'];
      this.filetype = event.target.files[0]['type'].split('/')[1];
      console.log(this.filetype);
      const acceptedFileType = ['jpeg', 'jpg', 'png'];

      if (acceptedFileType.indexOf(this.filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be .jpeg, .jpg, .png`, '', { duration: 2500 })
      } else {
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.brandLogoUrl = reader.result;
          this.editBrandLogoUrl = this.brandLogoUrl;
        }
        this.fileChangeEvent(event);
      }

    }
  }
  statusChange() {
    if (this.f.brandName.errors) {
      this.brandNameAvailibilityCheckText = ''
    }
    return true
  }
  ngOnDestroy() {
    this.store.dispatch(new ResetBrandDetails(null));
    this.isSubmit = false;
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.itemSubscription2) {
      this.itemSubscription2.unsubscribe();
    }
    if (this.itemSubscription3) {
      this.itemSubscription3.unsubscribe();
    }
  }
}