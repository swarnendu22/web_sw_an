import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { CreateNewMasterCatalogPopupComponent } from '../create-new-master-catalog-popup/create-new-master-catalog-popup.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetCategoriesElasticGlobal } from '../../../../actions/storeManagement.action';
import { 
  CreateNewCatalog, 
  GroupActionsBasedOnCategorySelection, 
  GetAttributesBasedOnCategory,
  ActionTypes,
  GetAttributesSetByCategory,
  StoreAttributeDataFromIds,
  StoreAttributesBasedOnCategory,
  StoreProductAttributesByCategory,
  StoreAttributesSetByCategory
} from '../../../../actions/catalog-management.action';
import { StoreImgUploadToAws, UploadImageToAws } from '../../../../actions/img-upload-aws.action';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { NgxUiLoaderService } from '../../../../../../node_modules/ngx-ui-loader';
import { CategoriesListSearchComponent } from '../categories-list-search/categories-list-search.component';
import { AddCategoryBrandComponent } from '../add-category-brand/add-category-brand.component';
import { GetGlobalBrandsElastic } from '../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Observable } from 'rxjs/Rx';
import { ProductImageCropComponent } from '../product-image-crop/product-image-crop.component';

@Component({
  selector: 'app-create-new-master-catalog-form',
  templateUrl: './create-new-master-catalog-form.component.html',
  styleUrls: ['./create-new-master-catalog-form.component.css']
})
export class CreateNewMasterCatalogFormComponent implements OnInit {
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  catalogForm: FormGroup;
  brandsBasedOnCategory = [];
  productAttributesByCategory = []
  productImages = []
  variantType = null
  attributeSetsData = null
  attributesBasedOnCategory = null;
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
  subTimeout2: Subscription;
  subscriptionApi: Subscription;
  imageUploadSubscription: Subscription;

  counter = 0;
  productVeriates = [];
  itemsProductVeriates: FormArray;
  items: FormArray;
  itemsProductSizes: FormArray;
  itemsProductVariates: FormArray;
  barcode = null
  mop = null
  mrperror = null;

  pageNoBrand = 0;
  pageSizeBrand = 100;
  brandName = '';

  constructor(private store: Store<any>,
    public dialogRef: MatDialogRef<CreateNewMasterCatalogPopupComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private apiMessageService: ApiMessageService
  ) {
    this.apiCallCategories();
    this.searchBrandList();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.options.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.optionCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.options.indexOf(fruit);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.options.push(event.option.viewValue);
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
  }

  ngOnInit() {
    this.catalogForm = this.fb.group({
      attributeSetId: [null],
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_].+[a-zA-Z0-9]*')]],
      categories: ['', Validators.required],
      categories_path: '',
      categoryAncestry: '',
      attributeId: '',
      productAttributes:[],
      productVeriatesArray:this.fb.array([]),
      productSizesArray:this.fb.array([]),
      pos: [false, Validators.required],
      brand: [''],
      brandName: [null],
      metaTitle: ['', Validators.maxLength(100)],
      metaKeyword: ['', Validators.maxLength(100)],
      metaDesc: ['', Validators.maxLength(255)],
      metaHeading: '',
      productDetailsAttributes: this.fb.array([]),
      attributeName: null,
      description: ['', Validators.required],
      productImages: [],
      productVariants: this.fb.array([]),
      productVariantList: this.fb.array([]),
      productBarcodeList: this.fb.array([]),
      productVariantDetails: [null],
      standardLength: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardWidth: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardHeight: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
      standardWeight: [null, [Validators.min(0.00), Validators.max(99999999.99), Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)]],
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
    });
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.globalBrandsElastic) {
        if(res.globalBrandsElastic.hits.length > 0) {
          this.brandsBasedOnCategory = this.brandsBasedOnCategory.concat(res.globalBrandsElastic.hits);
        }
      }
    });
    this.addPriceDetailItem();
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
  searchBrandList() {
    this.store.dispatch(new GetGlobalBrandsElastic({from: this.pageNoBrand, size: this.pageSizeBrand, brandName: this.brandName}));
  }
  attributeSetSelectionDropDown(event) {
    const attributeSetId = event.value;
    this.store.dispatch(new GetAttributesBasedOnCategory({ attributeSetId }));
  }
  onAttributeValueAvailaible(res) {
    this.attributesBasedOnCategory = res.attributesBasedOnCategory.payload;
    const productAttributesArr = this.catalogForm.get('productDetailsAttributes') as FormArray;
    const mainProAttrArr = productAttributesArr
    const tempAttributeData = productAttributesArr.controls;

    mainProAttrArr.clear();
    this.attributesBasedOnCategory.forEach(element => {
      let index = null;
      index = tempAttributeData.findIndex(dt => dt.get('attribute_code').value == element[1]);
      const data = tempAttributeData[index];
      let value = '';
      let key = false;
      if (data) {
        value = data.get('value').value;
        key = data.get('is_key').value;
      }
      mainProAttrArr.push(
        this.intializeFormArray(element[0], element[1], element[2], value, element[6], element[3], element[4], element[5] == 'M', element[7], element[8])
      );
    });
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
      console.log(filetype);
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
      console.log(res['awsImgUpload'])
      if (res['awsImgUpload']) {
        this.ngxService.stop()
        this.productImages.push({
          id: null,
          imageUrl: res['awsImgUpload'].Location
        })
        this.fileUploadSubscription.unsubscribe()
      }
    })
  }
  deleteImage(i) {
    this.productImages.splice(i, 1);
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
  onFormSubmit() {
    if (this.validateForm() == true && this.catalogForm.valid) {
      let productAttributes = [];
      if (this.catalogForm.get('productDetailsAttributes').value.length > 0) {
        const farray = this.catalogForm.get('productDetailsAttributes') as FormArray
        farray.controls.forEach((e, i) => {
          productAttributes.push({
            attributeId: e.get('id').value,
            attributeName: e.get('name').value,
            attributeValue: e.get('value').value
          })
        })
      }
      let productImagesAll = [];
      if(this.productImages) {
        this.productImages.forEach((element, i) => {
          if(i == 0) {
            productImagesAll.push({
              imageUrl: element.imageUrl,
              isBaseImage: true,
              cropListImage: true,
            });
          }
          else {
            productImagesAll.push({
              imageUrl: element.imageUrl,
              isBaseImage: false,
              cropListImage: false,
            });
          }
        });
      }
      
      let isError  = false;
      let isError2  = false;
      let isError3  = false;
      let isError4  = false;
      let isError5  = false;
      let productVariants = [];
      const farray1 = <FormArray>this.catalogForm.get('productVariantList');
      farray1.controls.forEach((variantList, i) => {
        let productVariantsBarcodes = [];
        let productVariantsAttributes = [];
        const farray2 = <FormArray>this.catalogForm.get('productVariantList')['controls'][i].get('productBarcodeList');
        farray2.controls.forEach((barcodeList, k) => {
          farray2.controls.forEach((barcodeListNew, l) => {
            if (parseFloat(barcodeList.get('maximum_retail_price').value) == parseFloat(barcodeListNew.get('maximum_retail_price').value) && k != l) {
              isError = true;
            } else  if (parseFloat(barcodeList.get('selling_price').value) == parseFloat(barcodeListNew.get('selling_price').value) && k != l) {
              isError2 = true;
            }
            else if (parseFloat(barcodeList.get('selling_price').value) < parseFloat(barcodeList.get('minimum_operating_price').value)) {
              isError3 = true;
            }
            else if (parseFloat(barcodeList.get('maximum_retail_price').value) < parseFloat(barcodeList.get('minimum_operating_price').value)) {
              isError4 = true;
            } else if (parseFloat(barcodeList.get('maximum_retail_price').value) < parseFloat(barcodeList.get('selling_price').value)) {
              isError5 = true;
            }
          });
          
          productVariantsBarcodes.push({
            mop: barcodeList.get('minimum_operating_price').value,
            mrp: barcodeList.get('maximum_retail_price').value,
            price: barcodeList.get('selling_price').value,
            barcode: barcodeList.get('bar_code').value,
            isActive: barcodeList.get('isActive').value,
            isDefault: barcodeList.get('isDefault').value
          })
        })

        productVariantsAttributes.push({
          attributeName: this.catalogForm.get('attributeName').value,
          attributeValue: variantList.get('variantDisplayName').value ? variantList.get('variantDisplayName').value : null,
          id: null
        });

        var standardHeight =  this.catalogForm.get('standardHeight').value;
        var standardLength =  this.catalogForm.get('standardLength').value;
        var standardWeight =  this.catalogForm.get('standardWeight').value;
        var standardWidth =  this.catalogForm.get('standardWidth').value;
        

        productVariants.push({
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
        })
      })
      if(isError == false) {
        if(isError2 == false) {
          if(isError3 == false) {
            if(isError4 == false) {
              if(isError5 == false) {
                let catalogFormData = {
                  productName: this.catalogForm.get('productName').value,
                  productDescription: this.catalogForm.get('description').value,
                  attributeSetId: this.catalogForm.get('attributeId').value,
                  brandId: this.catalogForm.get('brand').value,
                  categoryAncestry: this.catalogForm.get('categoryAncestry').value,
                  category_id: this.catalogForm.get('categories').value,
                  metaTitle: this.catalogForm.get('metaTitle').value,
                  metaDescription: this.catalogForm.get('metaDesc').value,
                  metaKeywords: this.catalogForm.get('metaKeyword').value,
                  productAttributes: productAttributes,
                  productVariants: productVariants,
                  productImages: productImagesAll,
                };
                this.store.dispatch(new CreateNewCatalog(catalogFormData));
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
  createPriceDetailItem(isDefault) {
    return this.fb.group({
      id: [null],
      variantDisplayName: [null, [Validators.required]],
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
    if(control.length==0) {
      control.push(this.initBarcodeList(true, true));
    } else {
      control.push(this.initBarcodeList(true, false));
    }
  }
  deletePriceDetailsRow(i: number) {
    const control = <FormArray> this.catalogForm.get('productVariantList');
    control.removeAt(i);
    this.checkvariateList();
  }
  deleteBarcodeRow(i: number, j: number) {
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
  formArrControlsSizes(i) {
    let control = this.catalogForm.get('productSizesArray') as FormArray;
    return control.at(i);
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
    if (this.catalogForm.get('productDetailsAttributes').value.length > 0) {
      const farray = this.catalogForm.get('productDetailsAttributes') as FormArray
      farray.controls.forEach((e, i) => {
        if(e.value.option && e.value.option == 'M') {
          e.get('value').setValidators(Validators.required);
          e.get('value').updateValueAndValidity()
          this.catalogForm.updateValueAndValidity()
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
        this.catalogForm.get('categories').setValue(result.id);
        this.catalogForm.get('categories_path').setValue(result.path);
        if(result.ancestry != null && result.ancestry != '') {
          this.catalogForm.get('categoryAncestry').setValue(result.ancestry);
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
  apiCallCategories () {
    let payloadCatSerach = {
      categoryName:'',
      depth: 3,
      level: 1
    }
    this.store.dispatch(new GetCategoriesElasticGlobal(payloadCatSerach));
  }

  ngOnDestroy() {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
    if (this.subTimeout2) {
      this.subTimeout2.unsubscribe();
    }
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
    this.store.dispatch(new StoreAttributeDataFromIds(null));
    this.store.dispatch(new StoreAttributesBasedOnCategory(null));
    this.store.dispatch(new StoreProductAttributesByCategory(null));
    this.store.dispatch(new StoreAttributesSetByCategory(null));
  }
}