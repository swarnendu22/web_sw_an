import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatAutocomplete} from '@angular/material/autocomplete';
import { CreateNewMasterCatalogPopupComponent } from '../create-new-master-catalog-popup/create-new-master-catalog-popup.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetCategoriesElasticGlobal } from '../../../../actions/storeManagement.action';
import { 
  GetCatalogDetailsById, 
  EditCatalogDetails, 
  StoreCatalogDetailsById,
  StoreAttributesBasedOnCategory, 
  GroupActionsBasedOnCategorySelection, 
  GetAttributesBasedOnCategory,
  GetAttributesSetByCategory,
  DeleteProductImage,
  DeleteProductPrice,
  DeleteProductVariate,
  AddProductImage,
  UpdateProductVarianteFull,
  ActionTypes,
  StoreAttributeDataFromIds,
  StoreProductAttributesByCategory,
  StoreAttributesSetByCategory
} from '../../../../actions/catalog-management.action';
import { GetBrandDetails } from '../../../../actions/brand-management.actions';
import { StoreImgUploadToAws, UploadImageToAws } from '../../../../actions/img-upload-aws.action';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import * as _ from 'lodash'
import { NgxUiLoaderService } from '../../../../../../node_modules/ngx-ui-loader';
import { CategoriesListSearchComponent } from '../categories-list-search/categories-list-search.component';
import { AddCategoryBrandComponent } from '../add-category-brand/add-category-brand.component';
import { GetGlobalBrandsElastic } from '../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Observable } from 'rxjs/Rx';
import { NonNullAssert, NullTemplateVisitor } from '@angular/compiler';
import { ProductImageCropComponent } from '../product-image-crop/product-image-crop.component';

@Component({
  selector: 'app-edit-catalog-master-form',
  templateUrl: './edit-catalog-master-form.component.html',
  styleUrls: ['./edit-catalog-master-form.component.css']
})
export class EditCatalogMasterFormComponent implements OnInit, OnDestroy {
  tabIndex = 0;
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  catalogForm: FormGroup;
  catalogForm2: FormGroup;
  catalogForm3: FormGroup;
  categories = [];
  brandsBasedOnCategory = [];
  productAttributesByCategory = []
  productImages = []
  variantType = null
  attributeSetsData = null
  attributesBasedOnCategory = null
  dropdownclicked = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl = new FormControl();
  options: string[] = [];
  allOptions: string[] = [];

  @ViewChild('optionInput') optionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public ExistingAttrCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();

  fileUploadSubscription: Subscription;
  subscriptionApi: Subscription;
  subscriptionApi2: Subscription;
  subTimeout2: Subscription;
  imageUploadSubscription: Subscription;

  counter = 0;
  productVeriates = [];
  itemsProductVeriates: FormArray;
  items: FormArray;
  itemsProductSizes: FormArray;
  itemsProductVariates: FormArray;
  barcode = null
  sku = null
  mop = null
  mrperror = null
  editableProductDetails = null
  isdetailsFetch = false;

  pageNoBrand = 0;
  pageSizeBrand = 100;
  brandName = '';

  constructor(
    private store: Store<any>,
    public dialogRef: MatDialogRef<CreateNewMasterCatalogPopupComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private apiMessageService: ApiMessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.apiCallCategories();
    this.getCatalogDetailsById();
    this.searchBrandList();
  }

  ngOnInit() {
    this.catalogForm = this.fb.group({
      attributeName: null,
      productVariants: this.fb.array([]),
      productVariantList: this.fb.array([]),
      productBarcodeList: this.fb.array([]),
      standardLength: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardWidth: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardHeight: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardWeight: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
    });
    this.catalogForm2 = this.fb.group({
      id: ['', Validators.required],
      attributeSetId: [null],
      description: ['', Validators.required],
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_].+[a-zA-Z0-9]*')]],
      categories: ['', Validators.required],
      categories_path: [null],
      categoryAncestry: [null],
      attributeId: [null],
      productAttributes:[],
      productDetailsAttributes: this.fb.array([]),
      brand: [''],
      brandName: [null],
      metaTitle: ['', Validators.maxLength(100)],
      metaKeyword: ['', Validators.maxLength(100)],
      metaDesc: ['', Validators.maxLength(255)]
    });
    this.catalogForm3 = this.fb.group({
      productImages: [],
    });
    this.store.pipe(select('valueOfCatalogMgmt')).subscribe(res => {
      this.attributesBasedOnCategory = res.attributesBasedOnCategory ? this.onAttributeValueAvailaible(res) : null;
      if (res.productAttributesByCategory) {
        this.productAttributesByCategory = res.productAttributesByCategory.payload;
      }
    });
    this.store.pipe(select('catalogMgmt')).subscribe(res => {
      if (res.attributeSetsData) {
        this.attributeSetsData = res.attributeSetsData;
      }
      if(res.catalogDetailsById) {
        this.editableProductDetails =  res.catalogDetailsById;
        if(this.isdetailsFetch == false) {
          this.isdetailsFetch = true;
          if(this.editableProductDetails.brandId > 0) {
            this.store.dispatch(new GetBrandDetails(this.editableProductDetails.brandId));
          }
          this.setformDetails();
        }
      }
    });
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.globalBrandsElastic) {
        if(res.globalBrandsElastic.hits.length > 0) {
          this.brandsBasedOnCategory = this.brandsBasedOnCategory.concat(res.globalBrandsElastic.hits);
        }
      }
      if (res.brandDetails) {
        let brandDetails = {
          brand_id: res.brandDetails.id,
          brand_logo_url: res.brandDetails.brandLogoUrl,
          brand_name: res.brandDetails.brandName,
          els_uid: "",
          master_brand_name: res.brandDetails.brandOwner,
        }
        var index1 = this.brandsBasedOnCategory.findIndex(x => x._source.brand_id == res.brandDetails.id);
        if(index1 === -1) {
          this.brandsBasedOnCategory.unshift({_source: brandDetails});
        }
      }
    });
  }
  onScrollDown() {
    this.pageNoBrand++;
    this.searchBrandList();
  }
  filterMyOptions(brandName) {
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
    this.subTimeout2 = Observable.timer(500).subscribe(() => { 
      this.brandName = brandName;
      this.pageNoBrand = 0;
      this.brandsBasedOnCategory = [];
      this.searchBrandList();
    });
  }
  getCatalogDetailsById() {
    this.store.dispatch(new GetCatalogDetailsById({ id: this.route.snapshot.params.id }));
  }
  searchBrandList() {
    this.store.dispatch(new GetGlobalBrandsElastic({from: this.pageNoBrand, size: this.pageSizeBrand, brandName: this.brandName}));
  }
  attributeSetSelectionDropDown(event) {
    const attributeSetId = event.value;
    this.store.dispatch(new GetAttributesBasedOnCategory({ attributeSetId }));
  }
  onAttributeValueAvailaible(res) {
    this.attributesBasedOnCategory = res.attributesBasedOnCategory.payload;
    const productAttributesArr = this.catalogForm2.get('productDetailsAttributes') as FormArray;
    const mainProAttrArr = productAttributesArr
    const tempAttributeData = productAttributesArr.controls;

    mainProAttrArr.clear();
    this.attributesBasedOnCategory.forEach(element => {
      console.log(element);
      let index = null;
      index = tempAttributeData.findIndex(dt => dt.get('attribute_code').value == element[1]);
      const data = tempAttributeData[index];
      let value = '';
      if (data) {
        value = data.get('value').value;
      }
      mainProAttrArr.push(
        this.intializeFormArray(element[0], element[1], element[2], value, element[6], element[3], element[4], element[5] == 'M', element[7], element[8])
      );
    });
    if (this.editableProductDetails && this.editableProductDetails.productAttributes) {
      const productDetailAttributes = this.editableProductDetails.productAttributes;
      const productAttributesArr = this.catalogForm2.get('productDetailsAttributes') as FormArray;
      for (let element of productAttributesArr.controls) {
        const findex = _.findIndex(productDetailAttributes, e => element.get('id').value == e.attributeId);
        if (findex > -1) {
          element.get('value').setValue(productDetailAttributes[findex]['attributeValue'])
        }
      }
    }
  }
  intializeFormArray(id = '', attribute_code = '', name = '', value = '', is_key = false, type, dropdownValue = '', required?, filterable = false, is_visible = false) {
    return this.fb.group({
      id: id,
      attribute_code: attribute_code,
      name: [name],
      value: required ? [value, Validators.required] : [value],
      filterable: [filterable == true ? 'filterable' : 'searchable'],
      type: [type],
      dropDownValue: dropdownValue,
      option: required ? 'M' : 'N'
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
        if (this.imageUploadSubscription) {
          this.imageUploadSubscription.unsubscribe();
        }
        if (this.fileUploadSubscription) {
          this.fileUploadSubscription.unsubscribe();
        }
        this.openCropImage(event, filetype);
      }
    }
  }
  openCropImage(event, filetype) {
    const dialog = this.dialog.open(ProductImageCropComponent, {
      width: '600px',
      maxHeight: '600px',
      disableClose: true,
      data: { event: event },
    })
    this.imageUploadSubscription = dialog.afterClosed().subscribe(data => {
      if(data.url!='') {
        this.uploadFileToAws(data.url, event.target.files[0]['name'], filetype, event.target.files[0]['type']);
      }
      event.target.value = null;
    });
  }
  deleteImage(i, id = 0) {
    if(id > 0) {
      let payloadImageDelete = {
        id: id
      }
      this.store.dispatch(new DeleteProductImage(payloadImageDelete));
    }
    this.productImages.splice(i, 1);
  }
  uploadFileToAws(url, filename, filetype, applicationtype) {
    this.store.dispatch(new StoreImgUploadToAws(null));
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const blob = this.dataURItoBlob(url);
    const file = new File([blob], name, { type: applicationtype })
    this.ngxService.start()
    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        this.ngxService.stop();
        if(res['awsImgUpload'].Location)
        {
          let imageIndex = this.productImages.length;
          if(imageIndex == 0) {
            this.productImages.push({
              id: null,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: true,
              cropListImage: true,
            })
          } else {
            this.productImages.push({
              id: null,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: false,
              cropListImage: false,
            })
          }
          
          this.fileUploadSubscription.unsubscribe();

          let catalogFormData = {
            product_id: this.editableProductDetails.id,
            imageUrl: res['awsImgUpload'].Location,
            isBaseImage: true,
            cropListImage: true,
          };
          if(imageIndex > 0) {
            catalogFormData = {
              product_id: this.editableProductDetails.id,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: false,
              cropListImage: false,
            };
          }
          this.store.dispatch(new AddProductImage(catalogFormData));
          this.apiMessageService.currentApiStatus.subscribe((data: any) => {
            if (data.status === true) {
              if(this.productImages) {
                this.productImages.forEach((element, i) => {
                  if(element.imageUrl ==  data.payload.imageUrl) {
                    this.productImages[i].id = data.payload.id;
                  }
                });
              }
            }
          });
        }
      }
    })
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
  goBack() {
    this.dialog.closeAll();
  }
  createPriceDetailItem(isDefault) {
    return this.fb.group({
      id: [null],
      variantDisplayName: [null, [Validators.required]],
      attributeId:  [null],
      model_no: [null],
      isDefault: [isDefault],
      productBarcodeList: this.fb.array([
        this.initBarcodeList(true, true)
      ])
    });
  }
  initBarcodeList(isActive, isDefault) {
    return this.fb.group({
      'id': [null],
      'maximum_retail_price': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'selling_price': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'minimum_operating_price': [null, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'bar_code': [null],
      "isActive": [isActive],
      "isDefault": [isDefault]
    });
  }
  addPriceDetailItem() {
    const control = <FormArray> this.catalogForm.get('productVariantList');
    if(control.length==0) {
      control.push(this.createPriceDetailItem(true));
    } else {
      const control = <FormArray>this.catalogForm.get('productVariantList');
      let id_all_default = false;
      control.controls.forEach((element, k) => {
        if(element['isDefault']==true) {
          id_all_default = true;
        }
      });
      control.push(this.createPriceDetailItem(false));
      if(!id_all_default) {
        <FormArray>this.catalogForm.get('productVariantList')['controls'][0].get('isDefault').setValue(true);
      }
    }
    this.checkvariateList();
  }
  checkvariateList() {
    const control = <FormArray>this.catalogForm.get('productVariantList');
    if(control.length <= 1) {
      control.controls.forEach((element, k) => {
        <FormArray>this.catalogForm.get('productVariantList')['controls'][k]['controls']['variantDisplayName'].clearValidators();
      });
    }
    else {
      control.controls.forEach((element, k) => {
        <FormArray>this.catalogForm.get('productVariantList')['controls'][k]['controls']['variantDisplayName'].setValidators([Validators.required]);
      });
    }
  }
  addPriceDetailBarcode(i) {
    const control = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
    if(control.length == 0) {
      control.push(this.initBarcodeList(true, true));
    } else {
      control.push(this.initBarcodeList(true, false));
    }
  }
  deletePriceDetailsRow(i: number, id = 0) {
    if(id > 0) {
      let payloadPriceDelete = {
        id: id
      }
      this.store.dispatch(new DeleteProductVariate(payloadPriceDelete));
    }
    const control = <FormArray> this.catalogForm.get('productVariantList');
    control.removeAt(i);
    this.checkvariateList();
  }
  deleteBarcodeRow(i: number, j: number, id = 0) {
    if(id > 0) {
      let payloadPriceDelete = {
        id: id
      }
      this.store.dispatch(new DeleteProductPrice(payloadPriceDelete));
    }
    const control = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
    control.removeAt(j);
  }
  changeIsActivePricing(i, j, isChecked) {
    const control = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList')['controls'][j];
    if(isChecked) {
      control.get('isActive').setValue(true);
    } else {
      control.get('isActive').setValue(false);
    }
  }
  changeRadioPricing(i, j) {
    const control = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
    control.controls.forEach((element, k) => {
      if(j==k) {
        element.get('isDefault').setValue(true)
      } else {
        element.get('isDefault').setValue(false)
      }
    });
  }
  changeRadioVariate(i) {
    const control = <FormArray>this.catalogForm.get('productVariantList');
    control.controls.forEach((element, k) => {
      if(i==k) {
        element.get('isDefault').setValue(true)
      }
      else {
        element.get('isDefault').setValue(false)
      }
     
    });
  }
  fromArrVariantList(i) {
    let control = this.catalogForm.get('productVariantList') as FormArray;
    return control.at(i);
  }
  get f() {
    return this.catalogForm.controls;
  }
  getVariantList(form) {
    return form.controls.productVariantList.controls;
  }
  getBarcodeList(form) {
    return form.controls.productBarcodeList.controls;
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
  validateForm() {
    let status = true;
    if (this.catalogForm2.get('productDetailsAttributes').value.length > 0) {
      const farray = this.catalogForm2.get('productDetailsAttributes') as FormArray;
      farray.controls.forEach((e, i) => {
        if(e.value.option && e.value.option == 'M') {
          e.get('value').setValidators(Validators.required);
          e.get('value').updateValueAndValidity()
          this.catalogForm2.updateValueAndValidity()
        }
      })
    }
    return status
  }
  openCatelist() {
    const dialog = this.dialog.open(CategoriesListSearchComponent, {
      panelClass: 'filter-modal',
    })
    dialog.afterClosed().subscribe(result => {
      this.apiCallCategories();
      if(result.id > 0) {
        this.store.dispatch(
          new GetAttributesSetByCategory({
            categoryId: result.id
          })
        );
        if (this.subscriptionApi) {
          this.subscriptionApi.unsubscribe();
        }
        this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ==  ActionTypes.getAttributesSetByCategory) {
            var attributeSetId = data.payload;
            this.store.dispatch(
              new GroupActionsBasedOnCategorySelection({
                attributeSetId: attributeSetId,
              })
            );
          }
        });
        this.catalogForm2.get('categories').setValue(result.id);
        this.catalogForm2.get('categories_path').setValue(result.path);
        if(result.ancestry != null && result.ancestry != '') {
          this.catalogForm2.get('categoryAncestry').setValue(result.ancestry);
        }
      }
    });
  }
  createNewBand() {
    const dialog = this.dialog.open(AddCategoryBrandComponent, {
      minWidth: '400',
      maxHeight: 600,
      disableClose: true,
      panelClass: 'ndh-order-view',
      data: {
      }
    })
    dialog.afterClosed().subscribe(result => {
      let sourceBrand = {
        brand_id: result['payload'].id,
        brand_name: result['payload'].brandName
      }
      this.brandsBasedOnCategory.unshift({_source: sourceBrand});
    });
  }
  setformDetails() {
    this.catalogForm2.get('id').setValue(this.editableProductDetails.id);
    this.catalogForm2.get('productName').setValue(this.editableProductDetails.productName);
    this.catalogForm2.get('brand').setValue(this.editableProductDetails.brandId);
    this.catalogForm2.get('categories').setValue(this.editableProductDetails.category_id);
    if(this.editableProductDetails.categoryAncestry != null) {
      if(this.editableProductDetails.categoryAncestry != '') {
        var ancestrySplitted = this.editableProductDetails.categoryAncestry.split(".", 1); 
        var categoryAncestry = this.editableProductDetails.categoryAncestry.replace(ancestrySplitted[0]+'.','');
        this.catalogForm2.get('categoryAncestry').setValue(categoryAncestry);
      }
      this.catalogForm2.get('categories_path').setValue(this.editableProductDetails.categoryPath);
    }
    this.catalogForm2.get('attributeId').setValue(this.editableProductDetails.attributeSetId);
    this.catalogForm2.get('description').setValue(this.editableProductDetails.productDescription) 

    if (this.editableProductDetails.productImages) {
      this.productImages = [];
      this.editableProductDetails.productImages.forEach((element) => {
        if(element.isBaseImage==true) {
          let productImages = {
            id: element.id,
            imageUrl: element.imageUrl,
            isBaseImage: element.isBaseImage,
            cropListImage: element.cropListImage,
          }
          this.productImages.unshift(productImages);
        } else {
          this.productImages.push({
            id: element.id,
            imageUrl: element.imageUrl,
            isBaseImage: element.isBaseImage,
            cropListImage: element.cropListImage,
          });
        }
      });
    }

    this.catalogForm2.get('metaTitle').setValue(this.editableProductDetails.metaTitle);
    this.catalogForm2.get('metaKeyword').setValue(this.editableProductDetails.metaKeywords);
    this.catalogForm2.get('metaDesc').setValue(this.editableProductDetails.metaDescription);

    if (this.editableProductDetails.productVariants) {
      this.items = <FormArray> this.catalogForm.get('productVariantList') as FormArray;
      this.items.clear();
      this.editableProductDetails.productVariants.forEach((element, i) => {
        if(i==0) {
          this.catalogForm.get('standardLength').setValue(element.standardLength);
          this.catalogForm.get('standardWidth').setValue(element.standardWidth);
          this.catalogForm.get('standardHeight').setValue(element.standardHeight);
          this.catalogForm.get('standardWeight').setValue(element.standardWeight);
        }
        this.items.push(this.editPriceDetailItem(element, i));
        if(element.productVariantsBarcodes.length) {
          element.productVariantsBarcodes.forEach(element1 => {
            const control1 = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
            control1.push(this.editBarcodeList(element1));
          })
        }
        else
        {
          const control1 = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
            control1.push(this.addBarcodeList());
        }
        if(element.productVariantsBarcodes.length) {
          element.productVariantsAttributes.forEach(element1 => {
            this.catalogForm.get('attributeName').setValue(element1.attributeName);
          })
        }
      });
      this.checkvariateList();
    }
  }
  addBarcodeList() {
    return this.fb.group({
      'id': [null],
      'maximum_retail_price': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'selling_price': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'minimum_operating_price': [null, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'bar_code': [null],
      "isActive": [true],
      "isDefault": [true]
    })
  }
  editPriceDetailItem(element, i) {
    return this.fb.group({
      id: [element.id],
      attributeId: element.productVariantsAttributes[0] ? element.productVariantsAttributes[0].id : null,
      variantDisplayName: [element.variantDisplayName, [Validators.required]],
      model_no: [element.modelNumber],
      isDefault: [element.isDefault],
      productBarcodeList: this.fb.array([
      ])
    });
  }
  editBarcodeList(element1) {
    return this.fb.group({
      'id': [element1.id],
      'maximum_retail_price': [element1.mrp, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'selling_price': [element1.price, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'minimum_operating_price': [element1.mop, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'bar_code': [element1.barcode],
      "isActive": [element1.isActive],
      "isDefault": [element1.isDefault]
    })
  }
  onProductDetailsSubmit() {
    if (this.validateForm() == true && this.catalogForm2.valid) {
      let productAttributes = [];
      if (this.catalogForm2.get('productDetailsAttributes').value.length > 0) {
        const farray = this.catalogForm2.get('productDetailsAttributes') as FormArray
        farray.controls.forEach((e, i) => {
          productAttributes.push({
            attributeId: e.get('id').value,
            attributeName: e.get('name').value,
            attributeValue: e.get('value').value
          })
        })
      }
      let catalogFormData = {
        id: this.editableProductDetails.id,
        productName: this.catalogForm2.get('productName').value,
        productDescription: this.catalogForm2.get('description').value,
        attributeSetId: this.catalogForm2.get('attributeId').value,
        brandId: this.catalogForm2.get('brand').value,
        categoryAncestry: this.catalogForm2.get('categoryAncestry').value,
        category_id: this.catalogForm2.get('categories').value,
        metaTitle: this.catalogForm2.get('metaTitle').value,
        metaDescription: this.catalogForm2.get('metaDesc').value,
        metaKeywords: this.catalogForm2.get('metaKeyword').value,
        productAttributes: productAttributes,
      };
      this.store.dispatch(new EditCatalogDetails(catalogFormData));
    } else {
      this.markFormGroupTouched(this.catalogForm2)
    }
  }
  fullVariateUpdate() {
    if (this.validateForm() == true && this.catalogForm.valid) {
      let isError3  = false;
      let isError4  = false;
      let isError5  = false;
      let isError6  = false;
      let isError7  = false;
      let productVariants = [];
      const farray1 = <FormArray>this.catalogForm.get('productVariantList');
      farray1.controls.forEach((variantList, i) => {
        let productVariantsBarcodes = [];
        let productVariantsAttributes = [];
        const farray2 = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
        farray2.controls.forEach((barcodeList, k) => {
          farray2.controls.forEach((barcodeListNew, l) => {
            if (parseFloat(barcodeList.get('maximum_retail_price').value) == parseFloat(barcodeListNew.get('maximum_retail_price').value) && k != l) {
              isError3 = true;
            } else  if (parseFloat(barcodeList.get('selling_price').value) == parseFloat(barcodeListNew.get('selling_price').value) && k != l) {
              isError4 = true;
            }
            else if (parseFloat(barcodeList.get('selling_price').value) < parseFloat(barcodeList.get('minimum_operating_price').value)) {
              isError5 = true;
            }
            else if (parseFloat(barcodeList.get('maximum_retail_price').value) < parseFloat(barcodeList.get('minimum_operating_price').value)) {
              isError6 = true;
            }
            else if (parseFloat(barcodeList.get('maximum_retail_price').value) < parseFloat(barcodeList.get('selling_price').value)) {
              isError7 = true;
            }
          });
          
          productVariantsBarcodes.push({
            id:  barcodeList['controls'].id.value ? barcodeList['controls'].id.value : NullTemplateVisitor,
            variantId: variantList['controls'].id.value,
            mop: barcodeList.get('minimum_operating_price').value,
            mrp: barcodeList.get('maximum_retail_price').value,
            price: barcodeList.get('selling_price').value,
            barcode: barcodeList.get('bar_code').value,
            isActive: barcodeList.get('isActive').value,
            isDefault: barcodeList.get('isDefault').value
          })
        })

        productVariantsAttributes.push({
          attributeName: this.catalogForm.get('attributeName').value ? this.catalogForm.get('attributeName').value : NonNullAssert,
          attributeValue: variantList.get('variantDisplayName').value ? variantList.get('variantDisplayName').value : null,
          id: variantList.get('attributeId').value ? variantList.get('attributeId').value : null
        });

        var standardHeight =  this.catalogForm.get('standardHeight').value;
        var standardLength =  this.catalogForm.get('standardLength').value;
        var standardWeight =  this.catalogForm.get('standardWeight').value;
        var standardWidth =  this.catalogForm.get('standardWidth').value;
        

        productVariants.push({
          id: variantList['controls'].id.value ? variantList['controls'].id.value : null,
          variantDisplayName: variantList.get('variantDisplayName').value ? variantList.get('variantDisplayName').value : null,
          modelNumber: variantList.get('model_no').value ? variantList.get('model_no').value : null,
          isDefault: variantList.get('isDefault').value ? variantList.get('isDefault').value : false,
          standardHeight: standardHeight,
          standardLength: standardLength,
          standardWeight: standardWeight,
          standardWidth: standardWidth,
          variantType: "VARIANT",
          productVariantsBarcodes: productVariantsBarcodes,
          productVariantsAttributes: productVariantsAttributes,
          product_id: this.editableProductDetails.id,
        })
      })
      if(isError3 == false) {
        if(isError4 == false) {
          if(isError5 == false) {
            if(isError6 == false) {
              if(isError7 == false) {
                let catalogFormData = {
                  productVariantList: productVariants
                };
                this.store.dispatch(new UpdateProductVarianteFull(catalogFormData));
                if (this.subscriptionApi2) {
                  this.subscriptionApi2.unsubscribe();
                }
                this.subscriptionApi2 = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
                  if (data.status === true && data.type ==  ActionTypes.updateProductVarianteFull) {
                    this.isdetailsFetch = false;
                    this.getCatalogDetailsById();
                  }
                });
                
              } else {
                this.toastr.error('Selling Price can not be greater than MRP.')
              }
            } else {
              this.toastr.error('MOP can not be greater than MRP.')
            }
          } else {
            this.toastr.error('Selling Price can not be less than MOP.')
          }
        } else {
          this.toastr.error('Selling Price cannot be equal for same variate.')
        }
      } else {
        this.toastr.error('MRP cannot be equal for same variate.')
      }
    } else {
      this.markFormGroupTouched(this.catalogForm)
    }
  }
  routeTab(event) {
    const tabindex = event.index;
    this.tabIndex = tabindex
  }
  apiCallCategories () {
    let payloadCatSerach = {
      categoryName:'',
      depth: 3,
      level: 1
    }
    this.store.dispatch(new GetCategoriesElasticGlobal(payloadCatSerach));
  }
  ngOnDestroy() {
    this.items = null;
    this.store.dispatch(new StoreCatalogDetailsById(null));
    this.store.dispatch(new StoreAttributesBasedOnCategory(null));
    this.store.dispatch(new StoreAttributeDataFromIds(null));
    this.store.dispatch(new StoreProductAttributesByCategory(null));
    this.store.dispatch(new StoreAttributesSetByCategory(null));

    if (this.imageUploadSubscription) {
      this.imageUploadSubscription.unsubscribe();
    }
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
    if (this.subscriptionApi2) {
      this.subscriptionApi2.unsubscribe();
    }
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
  }
}
