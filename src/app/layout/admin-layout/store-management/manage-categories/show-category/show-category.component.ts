import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { parentCategoryState } from '../../../../../reducers/storemanagement.reducers';
import {
  GetParentCategory,
  PostNewCategoryRequest,
  GetCategoryDetailsRequest,
  GetAttributeSet,
  ActionTypes,
  GetAllCategory,
  GetCommission,
  StoreCommission,
  StoreCategoryDetailsRequest,
  DeleteCategoryCommision
} from '../../../../../actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { GetBusinessCategory } from '../../../../../actions/merchant-management.actions';
import { Subscription } from 'rxjs';

export interface Item {
  id: string,
  name: string,
  capital: string,
  phone: string,
  currency: string
}
export interface DownLineItem {
  item: Item,
  parent: DownLineItem
}
@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit, OnDestroy {
  forPos = false;
  disable = true;
  selectedOption = null;
  selectedParentId = [];
  itemList = [];
  selectedItem: any;
  settings = {};
  categories = null;
  imageChangedEvent: any = '';
  url: any;
  tempBrandlogourl: any = '';
  updateCategoryForm: FormGroup;
  submitted = false;
  id = null;
  categoryDetails = null;
  attributeSet = null;
  public attributeSetFilterCtrl: FormControl = new FormControl();
  alias = null
  level = null
  ancestry = null
  path = null
  enableCategoryDropDown = false;
  businessCategoryList = null
  filename = '';
  filetype = '';
  editImageUrl = '';
  disabledBusinessCategory = false;

  displayModes = [{
    id: 'GRID',
    name: 'GRID'
  }, {
    id: 'LIST',
    name: 'LIST'
  }]

  defaultSortingByOptions = [{
    id: 'BRAND',
    name: 'Brand'
  }, {
    id: 'POSITION',
    name: 'Position'
  }, {
    id: 'RATING',
    name: 'Rating'
  }, {
    id: 'PRICE',
    name: 'Price'
  }, {
    id: 'NEW_PRODUCT',
    name: 'New Product'
  }, {
    id: 'DISCOUNT',
    name: 'Discount'
  }, {
    id: 'RELEVANCE',
    name: 'Relevence'
  }]

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
  formatedCategories = []
  public categoryFilterCtrl: FormControl = new FormControl();
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;
  items = [];
  commissionItems: FormArray;
  maxDate = new Date();
  commissions = null;
  allowCommisions = false;
  pos = false;

  itemSubscription: Subscription;
  itemSubscription2: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<parentCategoryState>,
    private route: ActivatedRoute,
    public router: Router,
    private apiMessageService: ApiMessageService,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.id = this.route.snapshot.params.id;
    // this.store.dispatch(new GetCommission());
    if (this.id) {
      this.store.dispatch(new GetCategoryDetailsRequest(this.id))
    }
    this.store.dispatch(new GetAllCategory())
    this.store.dispatch(new GetAttributeSet());
    this.store.dispatch(new GetBusinessCategory());
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      var reader = new FileReader();
      this.filename = event.target.files[0]['name'];
      this.filetype = event.target.files[0]['type'].split('/')[1];
      console.log(this.filetype);
      const acceptedFileType = ['png'];

      if (acceptedFileType.indexOf(this.filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be .png`, '', { duration: 2500 })
      } else {
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = reader.result;
          this.editImageUrl = this.url;
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
  // convenience getter for easy access to form fields
  get f() { return this.updateCategoryForm.controls; }
  changeCategory(event) {
    this.updateCategoryForm.get('parentId').setValue(parseInt(this.selectedItem['id']));
    if(event.level>1) {
      this.updateCategoryForm.get('businessCatId').setValue(null);
      this.disabledBusinessCategory = true;
    } else {
      this.disabledBusinessCategory = false;
    }
  }
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.submitted = true;
    const attributevalid = this.checkAttributeValidation();
    if (this.updateCategoryForm.valid && attributevalid) {
      if (this.tempBrandlogourl) {
        const date = new Date();
        let extension = this.filename.substring(this.filename.lastIndexOf('.'));
        extension = extension.toLowerCase();
        let previousName = this.filename.replace(/ /g, "_");
        previousName = previousName.replace(extension, '');
        let name = parseInt(this.id) + extension;
        const blob = this.dataURItoBlob(this.url);
        const file = new File([blob], name, { type: `image/${this.filetype}` });
        this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-assets/categories-images',isName: true}));

        this.itemSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
          if (res['awsImgUpload']) {
            console.log( res['awsImgUpload'].Location);
            this.url = res['awsImgUpload'].Location;
            this.url = "https://ndh.imgix.net/" + this.url.split('/').slice(3).join('/');
            this.formSubmitafterImageEdit();
          }
        });
      }
      else {
        this.formSubmitafterImageEdit();
      }
    } else {
      this.markFormGroupTouched(this.updateCategoryForm);
    }
  }
  formSubmitafterImageEdit() {
    var catagoryAttributeSetRels = [];
    if(this.updateCategoryForm.value['attributeSetIds']) {
      this.updateCategoryForm.value['attributeSetIds'].forEach(element => {
        var index1 = this.attributeSet.findIndex(x => x.id == element);
        catagoryAttributeSetRels.push({
          id: this.attributeSet[index1].id,
          attributeSetId: element,
          createdAt: new Date(this.attributeSet[index1].created_at).getTime(),
          createdBy: this.attributeSet[index1].created_by
        })
      });
    }
    var formData = {
      id: parseInt(this.id),
      name: this.updateCategoryForm.value['name'],
      metaTitle: this.updateCategoryForm.value['metaTitle'],
      metaKeyword: this.updateCategoryForm.value['metaKeyword'],
      metaDesc: this.updateCategoryForm.value['metaDesc'],
      alias: this.updateCategoryForm.value['alias'],
      parentId: parseInt(this.updateCategoryForm.get('parentId').value),
      level: this.selectedItem['level'],
      ancestry: this.selectedItem['ancestry'],
      path: this.selectedItem['path'],
      cropListImage: this.updateCategoryForm.value['cropListImage'] ? true : false,
      products: this.updateCategoryForm.get('products').value ? true : false,
      status: this.updateCategoryForm.value['status'] ? true : false,
      displayMode: this.updateCategoryForm.value['displayMode'],
      position: this.updateCategoryForm.value['position'],
      isActive: this.updateCategoryForm.value['isActive'] ? true : false,
      image: this.url,
      isBanner: this.updateCategoryForm.value['isBanner'] ? true : false,
      defaultSortingBy: this.updateCategoryForm.value['defaultSortingBy'],
      catagoryAttributeSetRels: catagoryAttributeSetRels,
      pos: this.updateCategoryForm.value['pos'],
      businessCatId: this.updateCategoryForm.value['businessCatId'],
      createdAt: this.updateCategoryForm.value['createdAt'],
      createdBy: this.updateCategoryForm.value['createdBy']
    }
    this.store.dispatch(new PostNewCategoryRequest(formData));
    this.itemSubscription2 = this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.postNewCategoryRequest) {
        this.router.navigate(['store', 'manage-categories']);
      }
    });
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
  ngOnInit() {
    this.updateCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      alias: ['', Validators.required],
      parentId: ['', Validators.required],
      attributeSetIds: [null],
      defaultSortingBy: ['', Validators.required],
      displayMode: ['', Validators.required],
      position: ['', Validators.required],
      ancestry: [null],
      level: [1],
      allowProductLink: [''],
      cropListImage: [''],
      useForPromoRules: [''],
      products: [false],
      image: [''],
      metaTitle: ['', [Validators.maxLength(100)]],
      metaKeyword: ['', [Validators.maxLength(100)]],
      metaDesc: ['', [Validators.maxLength(100)]],
      status: [true, Validators.required],
      pos: [null, Validators.required],
      commissionItems: this.formBuilder.array([]),
      businessCatId: [null],
      sectorId: [null],
      createdAt: null,
      createdBy: null,
    });
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['allcategories']) {
        this.categories = res['allcategories'];
        this.items = this.process(this.categories);
      }
      if (res['categoryDetails'] && res['categoryDetails']['payload'] && !this.categoryDetails) {
        this.commissionItems = null;
        this.categoryDetails = res['categoryDetails']['payload'][0];
        this.setDataToShowForm()
      }
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
    });
    this.settings = {
      singleSelection: false,
      text: "Select Parent Category",
      unSelectAllText: 'UnSelect All',
      searchPlaceholderText: 'Search Category',
      enableSearchFilter: true,
      limitSelection: 1,
      groupBy: "category"
    };
    this.store.pipe(select<any, any>('commissions')).subscribe(res => {
      this.commissions = res['commissions'];
    });
    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeSet = res.attributeSet;
    });
    // setInterval(() => {
    //   window.location.reload();
    // }, 50000);
  }
  categorySelectionValue(event) {
    this.selectedItem = this.categories.filter(e => e.id == event.value)[0];
  }
  onIconUpload(event) {
    this.url = event.Location;
  }
  imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    if (http.status != 404) {
      return true
    }
    return false
  }
  setDataToShowForm() {
    if (this.categoryDetails) {
      this.commissionItems = null;
      this.enableCategoryDropDown = this.categoryDetails['parentId'] ? true : false;
      this.updateCategoryForm.get('name').setValue(this.categoryDetails['name']);
      this.updateCategoryForm.get('businessCatId').setValue(this.categoryDetails['businessCatId']);

      if (this.imageExists(`https://ndh.imgix.net/ndh-assets/categories-images/${this.id}.png`)) {
        this.url = `https://ndh.imgix.net/ndh-assets/categories-images/${this.id}.png`
        this.updateCategoryForm.get('image').setValue(this.url);
      } else {
        this.url = this.categoryDetails['image']
        this.updateCategoryForm.get('image').setValue(this.categoryDetails['image']);
      }

      this.updateCategoryForm.get('metaTitle').setValue(this.categoryDetails['metaTitle']);
      this.updateCategoryForm.get('alias').setValue(this.categoryDetails['alias']);
      this.updateCategoryForm.get('metaKeyword').setValue(this.categoryDetails['metaKeyword']);
      this.updateCategoryForm.get('metaDesc').setValue(this.categoryDetails['metaDesc']);
      this.updateCategoryForm.get('products').setValue(this.categoryDetails['products']);
      this.updateCategoryForm.get('status').setValue(this.categoryDetails['status'] ? 1 : 0);
      this.updateCategoryForm.get('displayMode').setValue(this.categoryDetails['displayMode']);
      this.updateCategoryForm.get('position').setValue(this.categoryDetails['position']);
      this.updateCategoryForm.get('cropListImage').setValue(this.categoryDetails['cropListImage']);
      this.updateCategoryForm.get('defaultSortingBy').setValue(this.categoryDetails['defaultSortingBy']);

      let attributeSetIds = [];
      if(this.categoryDetails['catagoryAttributeSetRels']) {
        this.categoryDetails['catagoryAttributeSetRels'].forEach(element => {
          attributeSetIds.push(element.attributeSetId)
        });
      }
      this.updateCategoryForm.get('attributeSetIds').setValue(attributeSetIds ? attributeSetIds : null);

      //this.updateCategoryForm.get('attributeSetIds').setValue(this.categoryDetails['attributeSetIds'] ? JSON.parse(this.categoryDetails['attributeSetIds']) : null);

      this.updateCategoryForm.get('cropListImage').setValue(JSON.parse(this.categoryDetails['cropListImage']));
      this.updateCategoryForm.get('pos').setValue(this.categoryDetails['pos']);
      this.selectedOption = this.categoryDetails['parent'];
      if (this.categoryDetails && this.categoryDetails['parent'] && this.categoryDetails['parent']['id']) {
        this.selectedParentId.push(this.categoryDetails['parent']['id'])
      } else {
        this.selectedParentId.push([])
      }
      this.selectedItem = this.categoryDetails['parent'];
      this.updateCategoryForm.get('parentId').setValue(this.selectedItem['id']);
      if(this.selectedItem['level'] > 1) {
        this.disabledBusinessCategory = true;
      } else {
        this.disabledBusinessCategory = false;
      }
      this.updateCategoryForm.disable();

      this.updateCategoryForm.get('createdAt').setValue(this.categoryDetails['createdAt']);
      this.updateCategoryForm.get('createdBy').setValue(this.categoryDetails['createdBy']);
    }
  }
  returnImage() {
    if (this.categoryDetails && this.categoryDetails['image']) {
      return this.categoryDetails['image'];
    }
  }
  getAlias(value) {
    return value.trim().replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
  }
  transformAlias(event) {
    this.alias = this.getAlias(event.target.value)
    this.updateCategoryForm.get('alias').setValue(this.alias);
  }
  toggleFormEnable(formName) {
    const formStats = this[formName] as FormGroup;
    formStats.enable();
    this.disable = false;
    this.updateCategoryForm.controls.useForPromoRules.enable();
    if (this.categoryDetails['products'] == false) {
      this.updateCategoryForm.controls.attributeSetIds.disable();
    }
  }
  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    this.updateCategoryForm.disable();
    this.disable = true;

    this.setDataToShowForm()
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
  checkPos() {
    this.forPos = !this.forPos;
    this.selectedItem = null;
    this.updateCategoryForm.get('parentId').setValue('');
    if (this.forPos) {
      this.store.dispatch(new GetParentCategory(true));
    } else {
      this.store.dispatch(new GetParentCategory());
    }
  }
  toggleAllowProductLink() {
    if (this.updateCategoryForm.get('pos').value == true) {
      this.updateCategoryForm.get('products').setValue(false);
      this.updateCategoryForm.get('products').disable();
    } else {
      this.updateCategoryForm.get('products').enable();

    }
  }
  setFormArrayItems() {
    this.commissionItems = null;
    this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
    var groupName = '';
    this.categoryDetails['marketplaceCommissionList'].forEach(element => {
      const findex = _.findIndex(this.commissionItems.controls, i => i.get('id').value == element.id);
      if (findex < 0) {
        if (this.commissions) {
          this.commissions.map(cel => {
            if (cel.id == element.groupId) {
              groupName = cel.groupName;
            }
          });
        }
        this.commissionItems.push(
          this.formBuilder.group({
            'id': [element.id],
            'groupId': [element.groupId],
            'groupName': [groupName, [Validators.required],],
            'affectFrom': [new Date(element.affectFrom), [Validators.required],],
            'expiryDate': [new Date(element.expiryDate), Validators.required],
            'sellingPriceFrom': [element.sellingPriceFrom.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'sellingPriceTo': [element.sellingPriceTo.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'type': [element.type, [Validators.required],],
            'value': [element.value.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)],],
            'isFixed': [element.isFixed, [Validators.required],],
          })
        );
      }
    });
  }
  formArrControls(i) {
    let control = this.updateCategoryForm.get('commissionItems') as FormArray;
    return control.at(i);
  }
  changeStartDate(event) {
    this.maxDate = new Date();
    this.maxDate.setDate(event.target.value.getDate() + 1);
  }
  makeDecimalFormArrayControl(i, event) {
    var controlname = event.target.getAttribute('formcontrolname');
    let stringValue = this.formArrControls(i).get(controlname).value;

    if (stringValue != '') {
      console.log(this.formArrControls(i).get(controlname).value);
      let val = +this.formArrControls(i).get(controlname).value;
      this.formArrControls(i).get(controlname).patchValue(val.toFixed(2));
    }
  }
  ngOnDestroy() {
    this.commissionItems = null;
    this.categoryDetails = null;
    this.store.dispatch(new StoreCommission(null));
    this.store.dispatch(new StoreCategoryDetailsRequest(null));
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.itemSubscription2) {
      this.itemSubscription2.unsubscribe();
    }
  }
  copyRow(i) {
    this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
    this.commissionItems.insert(i + 1,
      this.formBuilder.group({
        "id": '',
        "groupId": this.formArrControls(i).get('groupId').value,
        'groupName': [this.formArrControls(i).get('groupName').value, [Validators.required],],
        'affectFrom': ['', [Validators.required],],
        'expiryDate': ['', Validators.required],
        'sellingPriceFrom': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'sellingPriceTo': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'type': ['p', [Validators.required],],
        'value': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)],],
        'isFixed': [0, [Validators.required],],
      })
    );
  }
  deleteRow(index: number) {
    if (this.formArrControls(index).get('id').value) {
      const dialogRef = this.dialog.open(CategoryCommissionDeleteDialog, {
        width: '400px',
        data: { catComId: this.formArrControls(index).get('id').value, }
      });
      this.apiMessageService.currentApiStatus.subscribe(data => {
        if (data.status === true && data.type == ActionTypes.deleteCategoryCommision) {
          this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
          this.commissionItems.removeAt(index);
        }
      });
    } else {
      this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
      this.commissionItems.removeAt(index);
    }
  }
  routeMethod() {
    this.router.navigate(['/store/manage-categories']);
  }
  checkAttributeValidation() {
    if (this.updateCategoryForm.get('products').value) {
      this.updateCategoryForm.get('attributeSetIds').enable();
      if (!this.updateCategoryForm.get('attributeSetIds').value) {
        this.updateCategoryForm.get('attributeSetIds').setErrors({
          'customRequired': 'Required'
        });
        return false;
      } else {
        return true;
      }
    }
    else {
      this.updateCategoryForm.get('attributeSetIds').reset();
      this.updateCategoryForm.get('attributeSetIds').disable();
      return true;
    }
  }
  checkDates(i) {
    if (this.formArrControls(i).get('expiryDate').value && this.formArrControls(i).get('affectFrom').value) {
      if (this.formArrControls(i).get('expiryDate').value.getTime() < this.formArrControls(i).get('affectFrom').value.getTime()) {
        this.formArrControls(i).get('affectFrom').markAsTouched();
        this.formArrControls(i).get('affectFrom').setErrors({
          'lessthan': 'Must be Previous than Expiry Date'
        });
      }
      else {
        this.formArrControls(i).get('affectFrom').setErrors(null);
      }
    }
  }
  changePriceFrom(i) {
    if (this.formArrControls(i).get('sellingPriceFrom').value && this.formArrControls(i).get('sellingPriceTo').value) {
      if (+this.formArrControls(i).get('sellingPriceFrom').value > +this.formArrControls(i).get('sellingPriceTo').value) {
        this.formArrControls(i).get('sellingPriceFrom').markAsTouched();
        this.formArrControls(i).get('sellingPriceFrom').setErrors({
          'lessthan': 'Must be Less than Price To'
        });
      }
      else {
        this.formArrControls(i).get('sellingPriceFrom').setErrors(null);
      }
    }
  }
  changeValue(i) {
    if (this.formArrControls(i).get('type').value == 'f') {
      this.formArrControls(i).get('value').setErrors(null);
      this.formArrControls(i).get('value').clearValidators();
      this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]);
      this.updateCategoryForm.updateValueAndValidity();
      this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
      this.commissionItems.updateValueAndValidity();
    } else {
      this.formArrControls(i).get('value').setErrors(null);
      this.formArrControls(i).get('value').clearValidators();
      this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)]);
      this.updateCategoryForm.updateValueAndValidity();
      this.commissionItems = this.updateCategoryForm.get('commissionItems') as FormArray;
      this.commissionItems.updateValueAndValidity();

      if (+this.formArrControls(i).get('value').value > 100.00) {
        this.formArrControls(i).get('value').setErrors({ 'max': 'Max 100' });
      }
    }
  }
}
@Component({
  selector: 'category-commission-delete-dialog',
  template: `Confirmation
  <div mat-dialog-content>
    <p>Do you want to delete this Commission?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">No</button>
    <button mat-button [mat-dialog-close]="true" (click)="deleteRow()" cdkFocusInitial>Yes</button>
  </div>`,
})
export class CategoryCommissionDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<CategoryCommissionDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<parentCategoryState>, ) { }
  deleteRow() {
    this.store.dispatch(new DeleteCategoryCommision(this.data.catComId));
  }
}