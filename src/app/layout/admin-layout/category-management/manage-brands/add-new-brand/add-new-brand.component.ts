import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
//import { GetCategory } from '../../../../../actions/storeManagement.action';
//import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { PostNewBrand, ActionTypes, GetBrandOwnerList, GetActiveBrands } from '../../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { RequestService } from '../../../../../utils/request/request.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
//import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { ToastrService } from 'ngx-toastr';
import { AddBrandOwnerComponent } from '../../../catalog-management/add-brand-owner/add-brand-owner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-add-new-brand",
  templateUrl: "./add-new-brand.component.html",
  styleUrls: ["./add-new-brand.component.css"]
})

export class AddNewBrandComponent implements OnInit, OnDestroy {
  // url = "";
  // itemList = [];
  // selectedItems = [];
  brandOwnerList = [];
  selected = 'y';
  imageChangedEvent: any = '';
  selectedItem: any = null;
  settings = {};
  categories = null;
  items = [];
  brandLogoUrl: any = '';
  tempBrandlogourl: any = '';
  brandNameAvailibilityCheck = false;
  brandNameAvailibilityCheckText = null;
  // categorySelectedItemIds = [];
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Search Category...';
  public MaxDisplayed = 5;

  filename = '';
  filetype = '';

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

  newBrandForm: FormGroup;
  categoryLinkList: FormArray;
  submitted = false;
  isSubmit = false;

  itemSubscription: Subscription;
  itemSubscription2: Subscription;
  itemSubscription3: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private apiMessageService: ApiMessageService,
    private router: Router,
    public requestService: RequestService,
    private matSnackBar: MatSnackBar,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    //this.store.dispatch(new GetCategory('false'));
    this.store.dispatch(new GetBrandOwnerList('false'));
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

  // convenience getter for easy access to form fields
  get f() {
    return this.newBrandForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.isSubmit = true
    const keyword = this.newBrandForm.value['brandName']
    if (this.newBrandForm.valid) {
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

            this.itemSubscription2 = this.store.pipe(select('components')).subscribe(res => {
              if (res.awsImgUpload) {
                this.brandLogoUrl = res.awsImgUpload.Location;
                this.brandLogoUrl = "https://ndh.imgix.net/" + this.brandLogoUrl.split('/').slice(3).join('/');
                this.formSubmitafterImage();
              }
            });
          } else {
            this.formSubmitafterImage();
          }
        }
      });
    } else {
      this.markFormGroupTouched(this.newBrandForm);
      this.isSubmit = false
    }
  }
  formSubmitafterImage() {
    let newBrandFormData = this.newBrandForm.value
    newBrandFormData.brandName = this.newBrandForm.value['brandName']
    newBrandFormData.brandLogoUrl = this.brandLogoUrl
    newBrandFormData.isPrimiumBrand = this.newBrandForm.value.isPrimiumBrand ? 1 : 0
    newBrandFormData.isRequiredAuthorisation = this.newBrandForm.value.isRequiredAuthorisation ? 1 : 0
    newBrandFormData.active = this.newBrandForm.value.active
    this.store.dispatch(new PostNewBrand(newBrandFormData));
    this.itemSubscription3 = this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.postNewBrand) {
        this.router.navigate(['category', 'manage']);
      } else {
        this.isSubmit = false;
      }
    });
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
  ngOnInit() {
    this.newBrandForm = this.formBuilder.group({
      brandOwner: null,
      brandName: ["", [Validators.required, Validators.maxLength(100)]],
      //brandShortName: ["", [Validators.required, Validators.maxLength(30)]],
      brandLogoUrl: [null],
      profilePage: [null],
      active: ["1", Validators.required],
      isPrimiumBrand: [false],
      isRequiredAuthorisation: [false],
      // categoryIdList: this.formBuilder.array([]),
      // categoryLinkList: this.formBuilder.array([], [Validators.required])
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

    // this.store.pipe(select('manageCategories')).subscribe(res => {
    //   this.categories = res.categories;
    // });
    this.store.pipe(select('manageCategories')).subscribe(res => {
      if (res.categories) {
        this.categories = res.categories;
        this.items = this.process(this.categories);
      }
    });
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.brandOwnerList) {
        this.brandOwnerList = res.brandOwnerList;
      }
    });
  }
  formArrControls(i) {
    let control = this.newBrandForm.get('categoryLinkList') as FormArray;
    return control.at(i);
  }
  createItem() {
    return this.formBuilder.group({
      'categoryId': [this.selectedItem.id, Validators.required],
      'isSizechartAvailable': ["0", Validators.required],
      'sizechartUrl': [null],
      'path': [this.selectedItem.path.replace("Default Category", "ROOT").split('/').join(' >> '), Validators.required]
      // 'id': [null, Validators.required],
    });
  }
  createNewBandOwner() {
    const dialog = this.dialog.open(AddBrandOwnerComponent, {
      minWidth: '400',
      maxHeight: 600,
      disableClose: true,
      panelClass: 'ndh-order-view',
    })
  }
  categorySizeChartChange(index, value) {
    const categoryRow = this.formArrControls(index);
    if (value === '1') {
      categoryRow.get('sizechartUrl').clearValidators();
      categoryRow.get('sizechartUrl').setValidators([Validators.required]);
    } else {
      categoryRow.get('sizechartUrl').clearValidators();
    }
    this.newBrandForm.updateValueAndValidity();
  }
  addItem(): void {
    if (this.selectedItem === null) {
      this.toastr.error(`Please select brand category before add`);
    } else {
      this.categoryLinkList = this.newBrandForm.get('categoryLinkList') as FormArray;
      if (this.categoryLinkList.value.some(category => category.categoryId === this.selectedItem.id)) {
        this.toastr.error(`This brand category already added into the list`);
      } else {
        this.categoryLinkList.push(this.createItem());
        this.selectedItem = null;
      }
    }
  }
  deleteRow(index: number) {
    this.categoryLinkList = this.newBrandForm.get('categoryLinkList') as FormArray;
    this.categoryLinkList.removeAt(index);
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
    const keyword = this.newBrandForm.value['brandName']
    if (!keyword) {
      this.brandNameAvailibilityCheckText = "Brand name can't be blank";
    } else {
      const checkStatusRes = await this.checkAvailabilityService(keyword)
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0) {
          if (res['payload'][0].isAvailable == 'NO') {
            this.brandNameAvailibilityCheckText = 'Brand name is Already Exist';
          }
          else {
            this.brandNameAvailibilityCheckText = 'Brand name is Valid';
          }
        }
      });
    }
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