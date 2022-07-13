import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { parentCategoryState } from '../../../../../reducers/storemanagement.reducers';
import {
  //GetCommission,
  //GetParentCategory,
  PostNewCategoryRequest,
  GetAttributeSet, 
  ActionTypes, 
  GetAllCategory, 
  StoreCommission
} from '../../../../../actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import _ from 'lodash';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.css']
})
export class AddNewCategoryComponent implements OnInit, OnDestroy {
  public gridApi;
  itemList = [];
  selectedItem: any = null;
  public attributeSetFilterCtrl: FormControl = new FormControl();
  settings = {};
  categories = null;
  parentCategories = null;
  attributeSet = null;
  alias = null;
  imageChangedEvent: any = '';
  url: any = '';
  tempBrandlogourl: any = '';
  newCategoryForm: FormGroup;
  commisionArr = [];
  allowCommisions = false;
  filename = '';
  filetype = '';
  businessCategoryList = null;
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
    // this.saveImage();

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

  commissions = null;
  rowData = [];
  forPos = false;
  public columnDefs;

  submitted = false;

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
  pos = false;

  itemSubscription: Subscription;
  itemSubscription2: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<parentCategoryState>,
    private apiMessageService: ApiMessageService,
    public router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {
    this.store.dispatch(new GetAllCategory());
    this.store.dispatch(new GetAttributeSet());
    // this.store.dispatch(new GetCommission());
    this.store.dispatch(new GetBusinessCategory());
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
        }
        this.fileChangeEvent(event);
      }

    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.newCategoryForm.controls; }
  changeCategory(event) {
    this.newCategoryForm.get('parentId').setValue(parseInt(this.selectedItem['id']));
    if(event.level>1) {
      this.newCategoryForm.get('businessCatId').setValue(null);
      this.disabledBusinessCategory = true;
    } else {
      this.disabledBusinessCategory = false;
    }
  }
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.submitted = true;

    if (this.selectedItem) {
      this.newCategoryForm.get('parentId').setValue(parseInt(this.selectedItem['id']));
      this.newCategoryForm.get('level').setValue(this.selectedItem['level']);
      this.newCategoryForm.get('ancestry').setValue(this.selectedItem['ancestry']);
      this.newCategoryForm.get('path').setValue(this.selectedItem['path']);
    }

    const attributevalid = this.checkAttributeValidation();
    if (this.newCategoryForm.valid && attributevalid) {
      if (this.tempBrandlogourl) {
        const date = new Date();
        let extension = this.filename.substring(this.filename.lastIndexOf('.'));
        extension = extension.toLowerCase();

        let previousName = this.filename.replace(/ /g, "_");
        previousName = previousName.replace(extension, '');
        let name = previousName + `_${date.getTime()}` + extension;
        const blob = this.dataURItoBlob(this.url);
        const file = new File([blob], name, { type: `image/${this.filetype}` });

        this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-assets/categories-images-temp' }));

        this.itemSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
          console.log(res);
          if (res['awsImgUpload']) {
            this.url = "https://ndh.imgix.net/" + res['awsImgUpload'].Location.split('/').slice(3).join('/');
            this.formSubmitafterImage();
          }
        });
      }
      else {
        this.formSubmitafterImage();
      }
    } else {
      this.markFormGroupTouched(this.newCategoryForm);
    }
  }
  formSubmitafterImage() {
    var catagoryAttributeSetRels = [];
    if(this.newCategoryForm.value['attributeSetIds']) {
    this.newCategoryForm.value['attributeSetIds'].forEach(element => {
       catagoryAttributeSetRels.push({
        attributeSetId: element
       })
     });
    }
    var formData = {
      name: this.newCategoryForm.value['name'],
      metaTitle: this.newCategoryForm.value['metaTitle'],
      metaKeyword: this.newCategoryForm.value['metaKeyword'],
      metaDesc: this.newCategoryForm.value['metaDesc'],
      alias: this.newCategoryForm.value['name'],
      cropListImage: this.newCategoryForm.value['cropListImage'] ? true : false,
      products: this.newCategoryForm.value['products'] ? true : false,
      status: this.newCategoryForm.value['status'] ? true : false,
      displayMode: this.newCategoryForm.value['displayMode'],
      position: this.newCategoryForm.value['position'],
      isActive: this.newCategoryForm.value['isActive'] ? true : false,
      image: this.url,
      isBanner: this.newCategoryForm.value['isBanner'] ? true : false,
      defaultSortingBy: this.newCategoryForm.value['defaultSortingBy'],
      catagoryAttributeSetRels: catagoryAttributeSetRels,
      pos: this.pos,
      parentId: parseInt(this.newCategoryForm.get('parentId').value),
      level: this.selectedItem['level'],
      ancestry: this.selectedItem['ancestry'],
      path: this.selectedItem['path'],
      marketplaceCommissionList: this.newCategoryForm.value['products'] ? this.newCategoryForm.value['commissionItems'] : [],
      businessCatId: this.newCategoryForm.value['businessCatId'],
      sectorId: null,
    }

    this.store.dispatch(new PostNewCategoryRequest(formData));
    formData = null;
    this.itemSubscription2 = this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.postNewCategoryRequest) {
        this.router.navigate(['store', 'manage-categories']);
      }
    });
  }
  ngOnInit() {
    this.tempBrandlogourl = '';
    this.url = '';
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['allcategories']) {
        this.categories = res['allcategories'];
        this.items = this.process(this.categories);
      }
    });

    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      if (res.buisnessCategory) {
        this.businessCategoryList = res.buisnessCategory.payload;
      }
    });
    // this.store.pipe(select('parentCategories')).subscribe(res => {
    //   this.parentCategories = res.parentCategories;
    // });

    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeSet = res['attributeSet'];
      //console.log('this.attributeSet', this.attributeSet);
    });

    this.newCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      parentId: ['', Validators.required],
      businessCatId: [null],
      attributeSetIds: [null],
      defaultSortingBy: ['', Validators.required],
      displayMode: ['', Validators.required],
      position: ['', [Validators.required, Validators.maxLength(3)]],
      ancestry: [null],
      path: [''],
      level: [1],
      allowProductLink: [false, Validators.required],
      cropListImage: [false, Validators.required],
      useForPromoRules: [false, Validators.required],
      products: [false],
      image: [''],
      metaTitle: ['', [Validators.maxLength(100)]],
      metaKeyword: ['', [Validators.maxLength(100)]],
      metaDesc: ['', [Validators.maxLength(100)]],
      status: [true, Validators.required],
      pos: [false, Validators.required],
      commissionItems: this.formBuilder.array([]),
      sectorId: [null]
    });

    this.settings = {
      singleSelection: false,
      text: "Select Parent Category",
      // selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      searchPlaceholderText: 'Search Category',
      enableSearchFilter: true,
      // badgeShowLimit: 4,
      limitSelection: 1,
      groupBy: "category"
    };
    this.store.pipe(select<any, any>('commissions')).subscribe(res => {
      this.commissions = res['commissions'];
      if (this.commissions) {
        this.commissionItems = null;
        // this.setFormArrayItems();
      }
    });
  }
  categorySelectionValue(event) {
    this.selectedItem = this.categories.filter(e => e.id == event.value)[0];
    console.log(event[0]['item'])
  }
  getAlias(value) {
    return value.trim().replace(/[^A-Z0-9]+/ig, '-')
  }
  transformAlias(event) {
    this.alias = this.getAlias(event.target.value)
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  toggleAllowProductLink() {
    if (this.newCategoryForm.get('pos').value == true) {
      this.newCategoryForm.get('products').setValue(false);
      this.newCategoryForm.get('products').disable();
    } else {
      this.newCategoryForm.get('products').enable();
    }
  }
  setFormArrayItems() {
    this.commissionItems = null;
    this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
    this.commissions.forEach(element => {
      this.commissionItems.push(
        this.formBuilder.group({
          'id': [''],
          'groupId': [element.id],
          'groupName': [element.groupName, [Validators.required],],
          'affectFrom': ['', [Validators.required],],
          'expiryDate': ['', Validators.required],
          'sellingPriceFrom': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
          'sellingPriceTo': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
          'type': ['p', [Validators.required],],
          'value': ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)],],
          'isFixed': [1, [Validators.required],],
        })
      );
    });
  }
  formArrControls(i) {
    let control = this.newCategoryForm.get('commissionItems') as FormArray;
    return control.at(i);
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
  onIconUpload(event) {
    this.url = event.Location;
    console.log(event);
  }
  ngOnDestroy() {
    this.commissionItems = null;
    this.store.dispatch(new StoreCommission(null));
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.itemSubscription2) {
      this.itemSubscription2.unsubscribe();
    }
  }
  copyRow(i) {
    this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
    this.commissionItems.insert(i + 1,
      this.formBuilder.group({
        "id": '',
        "groupId": this.formArrControls(i).get('id').value,
        'groupName': [this.formArrControls(i).get('groupName').value, [Validators.required],],
        'affectFrom': [this.formArrControls(i).get('affectFrom').value, [Validators.required],],
        'expiryDate': [this.formArrControls(i).get('expiryDate').value, Validators.required],
        'sellingPriceFrom': [this.formArrControls(i).get('sellingPriceFrom').value, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'sellingPriceTo': [this.formArrControls(i).get('sellingPriceTo').value, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'type': [this.formArrControls(i).get('type').value, [Validators.required],],
        'value': [this.formArrControls(i).get('value').value, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)],],
        'isFixed': [0, [Validators.required],],
      })
    );
  }

  // toggleCopyRow() {
  //   this.allowCommisions = !this.allowCommisions;
  //   if (this.allowCommisions) {
  //     this.setFormArrayItems();
  //   } else {
  //     this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
  //     this.commissionItems.clear();
  //   }
  //   this.checkAttributeValidation();
  // }

  deleteRow(index: number) {
    this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
    this.commissionItems.removeAt(index);
  }
  routeMethod() {
    this.router.navigate(['/store/manage-categories']);
  }
  checkAttributeValidation() {
    if (this.newCategoryForm.get('products').value) {
      if (!this.newCategoryForm.get('attributeSetIds').value) {
        this.newCategoryForm.get('attributeSetIds').setErrors({
          'customRequired': 'Required'
        });
        return false;
      } else {
        return true;
      }
    }
    else {
      this.newCategoryForm.get('attributeSetIds').reset();
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
      // this.formArrControls(i).get('value').reset(null);
      this.formArrControls(i).get('value').clearValidators();
      this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]);
      this.newCategoryForm.updateValueAndValidity();
      this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
      this.commissionItems.updateValueAndValidity();
    } else {
      this.formArrControls(i).get('value').setErrors(null);
      this.formArrControls(i).get('value').clearValidators();
      this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)]);
      this.newCategoryForm.updateValueAndValidity();
      this.commissionItems = this.newCategoryForm.get('commissionItems') as FormArray;
      this.commissionItems.updateValueAndValidity();

      if (+this.formArrControls(i).get('value').value > 100.00) {
        this.formArrControls(i).get('value').setErrors({ 'max': 'Max 100' });
      }
    }
  }
}
