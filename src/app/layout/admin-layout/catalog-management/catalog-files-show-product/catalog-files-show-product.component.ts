import { ApprovalDialogComponent } from './../components/approval-dialog/approval-dialog.component';
import { ApiMessageService } from './../../../../utils/api/api-message.service';
// import { GetAllCatalogList, StoreCatalogDetailsById, StoreBrandsListBasedOnCategory, StoreAttributesBasedOnCategory, ApproveRejectPendingCatalog } from 'src/app/actions/catalog-management.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { CustomValidators } from 'ngx-custom-validators';
import { 
  //GetCategory, 
  GetParentCategory 
} from 'src/app/actions/storeManagement.action';
import { GetActiveBrands } from '../../../../actions/brand-management.actions';

import {
  GetAttributesList, GetAttributesValueBasedOnAttribute, GetProductVariants, GetValueBasedOnVariant, 
  //CreateNewCatalog,
  //GetBrandsListBasedOnCategory,
  EditCatalogFileDetails,
  GroupActionsBasedOnCategorySelection,
  //GetProductDetailsFromSku,
  GetAttributesBasedOnCategory,
  //GetCatalogDetailsById,
  AddNewVariantToConfigurableProductInCatalogFile,
  GetProductDetailsFromFile,
  //ApproveRejectPendingCatalog,
  ActionTypes,
  LinkBrandWithCategory,
  GetPriceDetailOfCatalog,
  ResetCatalogMangementAll,
  ResetIndependentDropDownCatalogManagement,
  ResetDynamicLoadingStateCatalogMgt,
  ResetValueDynamicLoadingStateCatalogMgt,
  ResetCatalogFilesReducer,
  ResetCatalogFilesConfigurableDataState
} from './../../../../actions/catalog-management.action';
import { GetAttributeSet } from './../../../../actions/storeManagement.action';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment.prod';
import { AddAttributeFromCatalogComponent } from '../add-attribute-from-catalog/add-attribute-from-catalog.component';

@Component({
  selector: 'app-catalog-files-show-product',
  templateUrl: './catalog-files-show-product.component.html',
  styleUrls: ['./catalog-files-show-product.component.css']
})
export class CatalogFilesShowProductComponent implements OnInit, OnDestroy {

  public brandFilterCtrl: FormControl = new FormControl();
  public attributeilterCtrl: FormControl = new FormControl();
  public myTempAttributeInputCtrl: FormControl = new FormControl();
  public myTempAttributeValCtrl: FormControl = new FormControl();
  public ExistingAttrCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();

  htmlContent = '';
  mrpValue;

  htmlContent2 = '';
  variantDetailsArr

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '5rem',
    placeholder: 'Enter Description',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  config2: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '5rem',
    placeholder: 'Enter Other Description',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  @ViewChild('shippingPriceSection') shippingPriceSection: ElementRef<any>;
  editableProductDetails = null;
  editableProductId = null;
  eidtableId = null;
  categories = [];
  categoryId = null;
  typeId = null;
  selectedOption = [];
  attributesBasedOnCategory = null;
  brandsBasedOnCategory = null;
  productVariant = [];
  valueBasedOnVariant = null;
  attributeSetsData = null;
  attributeSetId = null;
  attributesList = null;
  attributeValueBasedOnAttribute = null;
  tempNewAttributesArr = [];
  tempProductVariant = []; //For storing parent variant dropdown which will be have reduced value based on selection.
  newProductVariant = []; //For storing new variants which gets added on clicking add new variant.
  variantBasedOnVariant = {}; //For storing diffrent variants diffrent value based on parent variant from reducer.
  attributeBasedOnAttribute = {}; //For storing diffrent attributes diffrent value based on parent attribute from reducer.
  productVariantDetails = [];
  productImagesArr = [];//For storing productImages.
  productImagesForEidtableMode = [];//When in editable mode porductImages store.
  recoveryAttributesArr = {};
  catalogForm: FormGroup;
  disableProps = { basicDetails: false, priceDetails: false, meta: false, attrDetails: false, imgDetails: false };
  catalogStoreSubscription: Subscription;
  eidtableDetailsStoreSubscription: Subscription;
  apiMessageServiceSubscription: Subscription;
  modalImagesArr = [];
  modalVariantDetails = null;
  currentModalImageType = null;
  configurableSkuDetails = null;
  editableConfgurableProductOptions = null;
  editableFormSet = false;
  loading = false;

  amazon;
  flipkart;
  myntra;
  paytmMall;
  snapdeal;
  amazonUrl: FormControl = new FormControl('')
  flipkartUrl: FormControl = new FormControl('')
  myntraUrl: FormControl = new FormControl('')
  paytmMallUrl: FormControl = new FormControl('')
  snapdealUrl: FormControl = new FormControl('')

  constructor(private store: Store<any>, private fb: FormBuilder, private snackBar: MatSnackBar, private activatedRoutes: ActivatedRoute, private route: Router,
    private dialog: MatDialog,
    private modalService: NgbModal, config: NgbModalConfig, private apiMessageService: ApiMessageService, private location: Location) {

    config.backdrop = 'static';
    config.keyboard = false;
    this.initialFormSetup();
    const eidtableId = this.activatedRoutes.snapshot.params.id;
    console.log("EDITABLE ID FOUND", eidtableId);
    if (eidtableId) {
      this.editableFunctionReady(eidtableId);
    }
    // this.location.onUrlChange(res => {
    //   this.catalogForm.reset();
    //   this.store.dispatch(new StoreCatalogDetailsById(null));
    //   this.store.dispatch(new StoreBrandsListBasedOnCategory(null));
    //   this.store.dispatch(new StoreAttributesBasedOnCategory(null));
    // })
    // this.activatedRoutes.params.subscribe()
    this.store.pipe(select('parentCategories')).subscribe(res => this.categories = res.parentCategories);

    this.store.pipe(select('productAttributes')).subscribe(res => this.attributeSetsData = res.attributeSet);
    this.store.pipe(select('independentDropdown')).subscribe(res => {
      this.productVariant = res.productVariant ? res.productVariant.payload : [];
      this.attributesList = res.attributesList ? res.attributesList.payload : null;
      this.tempProductVariant = this.productVariant
        ? Array.from(this.productVariant)
        : [];
      if (this.editableProductDetails && this.tempProductVariant.length > 0) {
        this.makingOfProductVariantsInEditMode();
      }
      // console.log('productVr', this.tempProductVariant, this.productVariant);
    });
    this.catalogStoreSubscription = this.store.pipe(select('catalogFilesReducer')).subscribe(res => {
      this.editableProductDetails = res.dataBasedOnProductIdFromFile ? res.dataBasedOnProductIdFromFile.payload[0] : null;
      console.log('EDIT_DETAILS', this.editableProductDetails);
      if (this.editableProductDetails) {
        this.assignFormBasedOnEditable();
      }
    });
    this.store.pipe(select('catalogFilesConfigurableReducer')).subscribe(res => {
      this.configurableSkuDetails = res.datDetailsOnConfigurableIdFromFile ? res.datDetailsOnConfigurableIdFromFile : null;
      if (this.configurableSkuDetails) {
        console.log('sku_Details');
        this.productSkuDetailsFetch();
      }

    })
    this.store.pipe(select('valueOfCatalogMgmt')).subscribe(res => {
      this.attributesBasedOnCategory = res.attributesBasedOnCategory ? this.onAttributeValueAvailaible(res) : null;
      if (res.compAnalysyis) {
        const compAnalysyisarr = res.compAnalysyis.payload;
        compAnalysyisarr.forEach(element => {
          if (element.ecomName == 'FLIPKART') {
            this.flipkart = element.url;
          }
          if (element.ecomName == 'AMAZON') {
            this.amazon = element.url;
          }
          if (element.ecomName == 'SNAPDEAL') {
            this.snapdeal = element.url;
          }
        });

      }
    });
    this.store.pipe(select('valueOfValueCatalogMgmt')).subscribe(res => {
      this.gettingValueBasedOnParentDropDown(res, 'valueBasedOnVariant');
      this.gettingValueBasedOnParentDropDown(
        res,
        'attributeValueBasedOnAttribute'
      );
    });
    this.apiMessageServiceSubscription = this.apiMessageService.currentApiStatus.subscribe(res => {
      if (res.status) {
        if (res.type === ActionTypes.addNewVariantToConfigurableProductInCatalogFile) {
          this.onSuccessAdditionOfNewVariantInEditableMode(res.payload);
        } else if (res.type === ActionTypes.editCatalogFileDetails) {
          this.onSucessEditCatalogFileDetails(res.payload);
        } else if (res.type === ActionTypes.createNewCatalog) {
          this.route.navigate(['catalog/manage-master-catalog']);
        }
      }
    })
    this.store.dispatch(new GetActiveBrands('1'));
  }
  ngOnInit() {
    this.store.dispatch(new GetParentCategory());
    this.store.dispatch(new GetAttributeSet());
    if (this.editableProductId) {
      this.loading = true;
      this.store.dispatch(new GetProductDetailsFromFile({ productId: this.editableProductId }));
      this.store.dispatch(new GetPriceDetailOfCatalog(this.editableProductId));
    }
    this.productImagesArr.push({ name: 'simple', imageUrls: [] });
    this.store.pipe(select('brands')).subscribe(res => {
      if (res.activeBrands) {
        this.brandsBasedOnCategory = res.activeBrands;
      }
    });

  }
  ngOnDestroy() {
    if (this.catalogStoreSubscription) {
      this.catalogStoreSubscription.unsubscribe();
    }
    if (this.eidtableDetailsStoreSubscription) {
      this.eidtableDetailsStoreSubscription.unsubscribe();
    }
    if (this.apiMessageServiceSubscription) {
      this.apiMessageServiceSubscription.unsubscribe();
    }
    this.eidtableId = null;
    this.catalogForm.reset();
    this.brandFilterCtrl.reset()
    this.attributeilterCtrl.reset();
    this.myTempAttributeInputCtrl.reset();
    this.myTempAttributeValCtrl.reset();
    this.ExistingAttrCtrl.reset();
    this.store.dispatch(new ResetCatalogMangementAll())
    this.store.dispatch(new ResetIndependentDropDownCatalogManagement())
    this.store.dispatch(new ResetDynamicLoadingStateCatalogMgt())
    this.store.dispatch(new ResetValueDynamicLoadingStateCatalogMgt())
    this.store.dispatch(new ResetCatalogFilesReducer())
    this.store.dispatch(new ResetCatalogFilesConfigurableDataState())
  }
  goBack() {
    this.location.back();
    // this.catalogForm.reset();
  }
  onSuccessAdditionOfNewVariantInEditableMode(response) {
    const productVariantDetailsArr = this.getFormArray('productVariantsDetails');
    const { variantName, variantIsbn, variantEan, variantUpc, variantMrp,
      variantSellingPrice, variantIsDefault, updatedImages } = response['variantValue'];
    this.getFormArray('tempNewVariantsForEditableMode').removeAt(response['variantIndex']);
    // variantName, variantNupc = '', variantIsbn = '', variantEan = '',
    // variantUpc = '', variantMrp = '', variantSellingPrice = '', variantIsDefault = false, updatedImages = []
    productVariantDetailsArr.push(this.initialiseProductVariantDetails(
      variantName, response['nupc'], variantIsbn, variantEan, variantUpc, variantMrp, variantSellingPrice, variantIsDefault, [[updatedImages]]
    ));
  }
  onSucessEditCatalogFileDetails(response) {
    if (response.editType === 'editVariantDetails') {
      console.log('response', response.data);
      this.getFormArray('productVariantsDetails').controls[parseInt(response.data, 10)].get('editMode').setValue(false);
    } else {
      this.disableProps[response.editType] = true;
    }
  }
  editableFunctionReady(editableId) {
    // Since they are not giving product id in the api direct i am using the serial_id to fetch data from reducers.
    this.disableProps = { basicDetails: true, priceDetails: true, meta: true, attrDetails: true, imgDetails: true }
    this.config.editable = false;
    this.config2.editable = false;
    // this.eidtableDetailsStoreSubscription = this.store.pipe(select('catalogMgmt')).subscribe(res => {

    if (this.eidtableId !== editableId) {
      this.eidtableId = editableId;
      this.editableProductId = editableId;
      console.log(this.editableProductId);
      // this.store.dispatch(new GetCatalogDetailsById({ id: this.editableProductId }));
    }
    // });
  };
  assignFormBasedOnEditable() {
    if (this.editableProductDetails.productType == 's') {
      this.loading = false;
    }
    const categoryId = this.editableProductDetails.categoryId;
    if (categoryId && this.categoryId !== categoryId) {
      this.categoryId = categoryId;
      this.selectedOption = [this.categoryId];
      this.catalogForm.get('categories').patchValue(this.categoryId);
      //this.store.dispatch(new GetBrandsListBasedOnCategory({ categoryId: this.categoryId }));
      if (this.editableProductDetails.marketplaceBulkCatalogFiles) {
        this.store.dispatch(new GetProductVariants({ attributeSetId: this.editableProductDetails.marketplaceBulkCatalogFiles.attributeSetId }))
      }
    }
    this.catalogForm.get('brand').patchValue(this.editableProductDetails.brandId);

    this.attributeSetId = this.editableProductDetails.marketplaceBulkCatalogFiles ? this.editableProductDetails.marketplaceBulkCatalogFiles.attributeSetId : null;
    this.typeId = this.editableProductDetails.productType;

    this.productImagesArr = [];
    const imgElement = this.editableProductDetails.marketplaceProductImagesTemp;
    // this.editableProductDetails.marketplaceProductImagesTemp.forEach(imgElement => {
    if (imgElement.images) {
      this.productImagesArr.push({ name: this.editableProductDetails.id, imageUrls: JSON.parse(imgElement.images) });
    }
    // });
    const marketplaceProductDetails = this.editableProductDetails;

    const productAttributesArr = this.getFormArray('productAttributes');
    productAttributesArr.clear();
    if (marketplaceProductDetails.productDetailAttributes) {
      JSON.parse(marketplaceProductDetails.productDetailAttributes).forEach(attrElemnt => {
        const { id, code, name, value, is_key } = attrElemnt;
        productAttributesArr.push(this.intializeFormArray(id, code, name, value, is_key));
      });
    }
    console.log("PRODUCT_ATTRIBUTES_ARR", productAttributesArr)
    // const productKeyAttributesArr = this.getFormArray('productKeyAttributes');
    // if (marketplaceProductDetails.productKeyAttributes) {
    //   JSON.parse(marketplaceProductDetails.productKeyAttributes).forEach(keyAttr => {
    //     const { code, name, value } = keyAttr;
    //     productKeyAttributesArr.push(this.intializeFormArray(code, name, value, true));
    //   });
    // }
    this.catalogForm.get('shippingMrp').patchValue(marketplaceProductDetails.maximumRetailPrice);
    this.catalogForm.get('shippingRetailPrice').patchValue(marketplaceProductDetails.sellingPrice);
    this.catalogForm.get('shippingCurrency').patchValue('INR');
    this.catalogForm.get('shippingIsbn').patchValue(marketplaceProductDetails.isbn);
    this.catalogForm.get('shippingUpc').patchValue(marketplaceProductDetails.upc);
    this.catalogForm.get('shippingEan').patchValue(marketplaceProductDetails.ean);
    this.catalogForm.get('shippingUpc').patchValue(marketplaceProductDetails.upc);
    this.catalogForm.get('shippingLength').patchValue(marketplaceProductDetails.standardLength);
    this.catalogForm.get('shippingWidth').patchValue(marketplaceProductDetails.standardWidth);
    this.catalogForm.get('shippingHeight').patchValue(marketplaceProductDetails.standardHeight);
    this.catalogForm.get('shippingWeight').patchValue(marketplaceProductDetails.standardWeight);
    this.catalogForm.get('shippingHsnCode').patchValue(marketplaceProductDetails.taxClass);
    if (marketplaceProductDetails.taxValue) {
      let value = marketplaceProductDetails.taxValue.toString();
      this.catalogForm.get('shippingGst').patchValue(value);
    }

    this.catalogForm.get('productName').patchValue(marketplaceProductDetails.productName);
    this.catalogForm.get('description').patchValue(marketplaceProductDetails.productDescription);
    this.catalogForm.get('otherDetails').patchValue(marketplaceProductDetails.productOtherDetails);
    const marketplaceSeoDetails = marketplaceProductDetails.marketplaceProductSeoTemp;
    if (marketplaceSeoDetails) {
      this.catalogForm.get('metaExclude').patchValue(marketplaceSeoDetails.excludeStemap === 1 ? true : false);
      this.catalogForm.get('metaTitle').patchValue(marketplaceSeoDetails.metaTitle);
      this.catalogForm.get('metaKeyword').patchValue(marketplaceSeoDetails.metaKeywords);
      this.catalogForm.get('metaDesc').patchValue(marketplaceSeoDetails.metaDescription);
    }
    // const configurableProductOptions = JSON.parse(marketplaceProductDetails.configurableProductOptions);
    // if (configurableProductOptions) {
    //   this.editableConfgurableProductOptions = configurableProductOptions.display_blocks.length > 0 ? configurableProductOptions : null;
    // }
    // console.log(configurableProductOptions);
    // CONSTRUCTION OF DROP-DOWN FOR EDITABLE MODE.
    console.log('ONCE AGAIN CALLED');
    // if (configurableProductOptions) {
    this.makingOfProductVariantsInEditMode();
    //   this.newProductVariant = [];
    //   let configIndex = 0;
    //   configurableProductOptions.display_blocks.forEach((block, index) => {
    //     console.log('called display_block')
    //     if (block.type !== 'IMAGE_BLOCK') {
    //       configIndex += 1;
    //       console.log('TEMP', this.tempProductVariant);
    //       const variantSection = this.tempProductVariant.find(i => { console.log(i); return i[1] === block.code });
    //       console.log('test', variantSection);
    //       if (variantSection) {
    //         if (configIndex === 1) {
    //           this.newProductVariant.push({ code: block.code, attribute: variantSection[2], values: '', addable: true, prevValues: block.values, variantDetails: variantSection });
    //         } else {
    //           this.newProductVariant.push({ code: block.code, attribute: variantSection[2], values: block.values.join(','), addable: true, prevValues: block.values, variantDetails: variantSection });
    //         }
    //       }
    //     }
    //   });

    //   // CONSTRUCTION OF VARIANTS FOR EDITABLE MODE.
    //   const productVariantDetailsArr = this.getFormArray('productVariantsDetails');
    //   productVariantDetailsArr.clear();

    //   configurableProductOptions.variants.forEach(variantDetails => {

    //     const variantName = [];
    //     const variantImage = [];
    //     variantDetails.variant.forEach(vr => {
    //       if (vr.includes('https')) {
    //         variantImage.push(vr);
    //       } else {
    //         variantName.push(vr);
    //       }
    //     });
    //     const isDefault = variantDetails.isDefault ? JSON.parse(variantDetails.isDefault) : false;
    //     console.log('isDefault', isDefault, variantDetails.isDefault);
    //     // variantName, variantNupc = '', variantIsbn = '', variantEan = '',
    //     // variantUpc = '', variantMrp = '', variantSellingPrice = '', variantIsDefault = false, updatedImages = []
    //     productVariantDetailsArr.push(this.initialiseProductVariantDetails(
    //       variantName.join('/'),
    //       variantDetails.sku,
    //       '', '', '', '', '', isDefault, [[variantImage]]
    //     ));
    //   });
    //   console.log('ABCDH', productVariantDetailsArr);
    //   // this.productSkuDetailsFetch();
    // }


    // this.product
  }
  makingOfProductVariantsInEditMode() {
    const configurableProductOptions = JSON.parse(this.editableProductDetails.configurableProductOptions);

    if (configurableProductOptions) {
      this.editableConfgurableProductOptions = configurableProductOptions.display_blocks.length > 0 ? configurableProductOptions : null;
      this.newProductVariant = [];
      let configIndex = 0;
      let foundData = {}
      configurableProductOptions.display_blocks.forEach((block, index) => {
        console.log('called display_block')
        if (block.type !== 'IMAGE_BLOCK') {
          configIndex += 1;
          console.log('TEMP', this.tempProductVariant);
          const variantSection = this.tempProductVariant.find(i => { console.log(i); return i[1] === block.code });
          console.log('test', variantSection);
          if (variantSection) {
            if (!foundData[block.code]) {
              foundData[block.code] = true;
              if (configIndex === 1) {
                // prevValues: block.values,
                this.newProductVariant.push({ code: block.code, attribute: variantSection[2], values: block.values.join(','), prevValues: block.values, addable: true, variantDetails: variantSection });
              } else {
                this.newProductVariant.push({ code: block.code, attribute: variantSection[2], values: block.values.join(','), addable: true, prevValues: block.values, variantDetails: variantSection });
              }
            }
          }
        }
      });

      // CONSTRUCTION OF VARIANTS FOR EDITABLE MODE.
      const productVariantDetailsArr = this.getFormArray('productVariantsDetails');
      productVariantDetailsArr.clear();
      console.log('VARINATS', configurableProductOptions.variants);
      configurableProductOptions.variants.forEach(variantDetails => {

        const variantName = [];
        const variantImage = [];
        variantDetails.variant.forEach(vr => {
          if (vr.includes('https')) {
            variantImage.push(vr);
          } else {
            variantName.push(vr);
          }
        });
        const isDefault = variantDetails.isDefault ? JSON.parse(variantDetails.isDefault) : false;
        console.log('isDefault', isDefault, variantDetails.isDefault);
        // variantName, variantNupc = '', variantIsbn = '', variantEan = '',
        // variantUpc = '', variantMrp = '', variantSellingPrice = '', variantIsDefault = false, updatedImages = []
        productVariantDetailsArr.push(this.initialiseProductVariantDetails(
          variantName.join('/'),
          variantDetails.sku,
          '', '', '', '', '', isDefault, [[variantImage]]
        ));
      });
      console.log('ABCDH', productVariantDetailsArr);
      // this.productSkuDetailsFetch();
    }
  }
  productSkuDetailsFetch() {
    console.log("AVAHSH", this.configurableSkuDetails);
    const productVariantDetailsArr = this.getFormArray('productVariantsDetails');
    productVariantDetailsArr.controls.forEach(item => {
      console.log(item.get('variantNupc').value);
      const details = this.configurableSkuDetails[item.get('variantNupc').value];
      // console.log("DETAILS", details, productVariantDetailsArr.controls);
      this.loading = false;

      if (details) {
        const { isbn, ean, upc, maximumRetailPrice, sellingPrice } = details.payload[0];
        const images = JSON.parse(details.payload[0].marketplaceProductImagesTemp.images);

        // variantIsbn = '', variantEan = '',
        // variantUpc = '', variantMrp = '', variantSellingPrice = ''
        item.patchValue({
          variantIsbn: isbn,
          variantEan: ean,
          variantUpc: upc,
          variantMrp: maximumRetailPrice,
          variantSellingPrice: sellingPrice,
          updatedImages: [images]
        });

        console.log('////////////', item);
      } else {
        this.loading = false;
      }
      // if ()
    });
  }
  onAttributeValueAvailaible(res) {
    const urlArr = res.attributesBasedOnCategory.metadata.requestedURI.split('/')
    const attributeIdFromApi = parseInt(urlArr[urlArr.length - 1], 10);
    this.attributesBasedOnCategory = res.attributesBasedOnCategory.payload;
    const clearArray = this.attributeSetId === attributeIdFromApi ? false : true;
    // if (this.attributeSetId !== attributeIdFromApi) {
    this.attributeSetId = attributeIdFromApi;
    this.tempNewAttributesArr = [];
    const productAttributesArr = _.cloneDeep(this.getFormArray('productAttributes'), true);
    const mainProAttrArr = this.getFormArray('productAttributes')
    const tempAttributeData = productAttributesArr.controls;
    // if (clearArray) {
    mainProAttrArr.clear();
    // }
    // console.log('VAL', clearArray);
    this.attributesBasedOnCategory.forEach(element => {
      let index = null;
      index = tempAttributeData.findIndex(dt => dt.get('code').value == element[1]);
      const data = tempAttributeData[index];
      let value = '';
      let key = false;
      if (data) {
        value = data.get('value').value;
        key = data.get('is_key').value;
      }
      // console.log('VALUE', value, data, index);
      // if (!clearArray) {
      //   productAttributesArr.removeAt(index);
      //   console.log(productAttributesArr);
      // }
      if (index >= 0) {

        mainProAttrArr.push(
          this.intializeFormArray(element[0], element[1], element[2], value, key, element[3], element[4], element[5] == 'M')
        );
      }
    });
    // if (this.newProductVariant.length > 0) {
    //   this.newProductVariant.forEach(vr => {
    //     this.checkIfAttributeExists(vr.code, true);
    //   });
    // }
    // }
    return this.attributeBasedOnAttribute;
  }
  gettingValueBasedOnParentDropDown(res, type) {
    if (type === 'valueBasedOnVariant') {
      if (res.valueBasedOnVariant) {
        const varinatIdFromApi = getId(type);
        this.variantBasedOnVariant[varinatIdFromApi] =
          res.valueBasedOnVariant.payload;
        console.log('VERDGDH', this.variantBasedOnVariant, this.newProductVariant);
      }
    } else if (type === 'attributeValueBasedOnAttribute') {
      if (res.attributeValueBasedOnAttribute) {
        const attributeIdFromApi = getId(type);
        this.attributeBasedOnAttribute[attributeIdFromApi] =
          res.attributeValueBasedOnAttribute.payload;
        console.log(this.attributeBasedOnAttribute[attributeIdFromApi]);
      }
    }
    function getId(reducerType) {
      const requestedUriArr = res[reducerType].metadata.requestedURI.split('/');
      const idFromApi = parseInt(
        requestedUriArr[requestedUriArr.length - 1],
        0
      );
      return idFromApi;
    }
  }
  removeDisable(keyName) {
    if (keyName === 'basicDetails') {
      this.disableProps.basicDetails = !this.disableProps.basicDetails;
      this.config.editable = !this.config.editable;
      this.config2.editable = !this.config2.editable;
    } else {
      if (keyName === 'attrDetails' && this.disableProps['attrDetails']) {
        if (this.attributeSetId) {
          this.store.dispatch(new GetAttributesBasedOnCategory({ attributeSetId: this.attributeSetId }));
        }
      }
      this.disableProps[keyName] = !this.disableProps[keyName];
    }
  }
  categorySelectionValue(event) {
    this.catalogForm.get('brand').patchValue('');
    var attributeSetId = null;
    this.categories.map(e => {
      if (e.id == event.value) {
        console.log('CATEGORY_SELECTION', e.id, event.value);

        attributeSetId = e.attributeSetId;
      }
    })

    this.categoryId = event.value;
    if (attributeSetId == null) {
      alert('No Attributes Found');
    } else {
      this.store.dispatch(new GetProductVariants({ attributeSetId }));
    }
    if (this.eidtableId == null) {
      // const attributeSetId = attributeSetId;
      if (this.editableProductId) {
        console.log('attributeSetId', attributeSetId);

        if (this.selectedOption[0] != this.categoryId) {
          this.store.dispatch(
            new GroupActionsBasedOnCategorySelection({
              categoryId: this.categoryId,
              attributeSetId: attributeSetId,
            })
          );
        }
      } else {
        console.log('attributeSetId', attributeSetId);

        this.store.dispatch(
          new GroupActionsBasedOnCategorySelection({
            categoryId: this.categoryId,
            attributeSetId: attributeSetId,
          })
        );
      }
    }
  }
  attributeSetSelectionDropDown(event) {
    const attributeSetId = event.value;
    this.store.dispatch(new GetAttributesBasedOnCategory({ attributeSetId }));
  }
  addNewAttribute() {
    this.store.dispatch(new GetAttributesList());
    console.log(this.getFormArray('productAttributes').controls);
    this.tempNewAttributesArr.push({
      code: '',
      name: '',
      value: '',
      is_key: false,
      type: '',
      dropDownValue: '',
      addable: false
    });
    // const productAttributesArr = this.getFormArray('productAttributes');
    // productAttributesArr.push(this.intializeFormArray());
    console.log('add New Attribute donne');
  }
  deleteFromAlreadyAddedAttribute(index) {
    this.openDialogGeneric('delete attribute', { type: 'existAttribute', arrName: this.getFormArray('productAttributes'), index });
  }
  openDialogGeneric(text, payload) {
    const dialog = this.dialog.open(ApprovalDialogComponent, {
      width: '300px',
      data: { text }
    });
    dialog.afterClosed().subscribe(res => {
      if (!res.cancelClick) {
        payload.arrName.removeAt(payload.index);
      }
    });
  }
  deleteAddedAttribute(index) {
    this.tempNewAttributesArr.splice(index, 1);
  };

  onTempAttributesSelectionChange(event, attr) {
    const attrValue = event.value;
    const attrFound = this.checkIfAttributeExists(attrValue.code);
    // const tempArr = this.tempNewAttributesArr[i];
    if (!attrFound) {
      attr.name = attrValue.name;
      attr.code = attrValue.code;
      attr.type = attrValue.type;
      attr.addable = true;
      if (attrValue.type === 'SELECT' || attrValue.type === 'SWATCH') {
        if (!this.attributeBasedOnAttribute[attrValue.id]) {
          this.store.dispatch(
            new GetAttributesValueBasedOnAttribute({ attributeId: attrValue.id })
          );
        }
      }
    } else {
      alert('Attribute Already Exists');
    }
  };
  onTempAttributeValueChange(event, attr, dropDownValue = '') {
    const value = event.target ? event.target.value : event.value;
    attr.value = value;
    attr.dropDownValue = dropDownValue;
  };
  onTempAttributeCheckedChange(event, attr) {
    console.log('TEMP+ATTR', attr);
    attr.is_key = event.checked;
  };
  addNewProductVariant() {
    this.newProductVariant.push({ code: '', attribute: '', values: '', addable: false, attrFound: false });
    this.productImagesArr = [];
  };
  deleteProductVariant(index) {
    const variant = this.newProductVariant[index];
    this.newProductVariant.splice(index, 1);
    if (this.newProductVariant.length === 0) {
      this.addImageForSimpleProduct();
    }
    this.recoverDeletedAttributes(variant.code);
    this.pushingIntoProductVariantDetails();
  };
  productVariantSelectChange(event, variant) {
    const variantValue = event.value;
    // CHECK IF SELECTED VARIANT EXISTS IN ATTRIBUTE.
    const foundIndex = this.newProductVariant.findIndex(
      item => item.code === variantValue[1]
    );
    let canAddVariantValue = false;
    if (foundIndex >= 0) {
      variant.addable = false;
      alert('Variant Already Added');
    } else {
      variant.addable = true;
      canAddVariantValue = true;
      if (!this.editableProductId) {
        variant.attrFound = this.checkIfAttributeExists(variantValue[1], true);
      }
    }
    if (canAddVariantValue) {
      variant.code = variantValue[1];
      variant.attribute = variantValue[2];
      variant.tempVariantDetails = variantValue;
      if (variantValue[3] === 'SELECT') {
        this.store.dispatch(
          new GetValueBasedOnVariant({ attributeId: variantValue[0] })
        );
      }
    }
  };
  productVariantValueChange({ event, variantId }, variant) {
    console.log("VAIAN", event, variant, this.newProductVariant.length)
    let newValue = true;
    const variantValue = event.target ? event.target.value : event.value; //IN CASE OF MAT-SELECT event.values for MAT-INPUT event.target.value.
    let editModeAddVariant = true;
    // ************************************
    // FOR EDITALE MODE ONLY SPECIAL CHECKING.
    // ****************************************
    if (variantValue.length !== 0) {
      if (this.editableProductId && variant.prevValues) {
        if (variant.prevValues.includes(variantValue.toString())) {
          editModeAddVariant = false;
        } else {
          editModeAddVariant = true;
        }
      }
      console.log('editModeAddVariant', editModeAddVariant);
      if (editModeAddVariant) {
        if (variant.values.length === 0) {
          variant.values = variantValue.toString();
        } else {
          const vrValArr = variant.values.split(',');
          if (vrValArr.includes(variantValue.toString())) {
            newValue = false;
          } else {
            // variant.values = variant.values.concat(`,${variantValue}`);
            variant.values = variantValue;
          }
        }
        console.log('newValue', newValue, this.newProductVariant.length);
        if (newValue) {
          variant.prevValues = variant.values.split(',');
          variant.variantDetails = variant.tempVariantDetails ? variant.tempVariantDetails : variant.variantDetails;
          this.pushingIntoProductVariantDetails();
        }
      }
    }
  }
  // Delete The selected variant values from dropdown.
  removeChosenVariantValue(index, variant) {
    const variantArr = variant.values.split(',');
    variantArr.splice(index, 1);
    variant.prevValues.splice(index, 1);
    variant.values = variantArr.join(',');
    this.pushingIntoProductVariantDetails();
  }
  // Make Variant Default (Radio Click).
  onProductVariantDetailsRadioClick(event, index, arrType) {
    console.log(event);
    this.variantDetailsArr = this.getFormArray(arrType);
    this.variantDetailsArr.controls.forEach((vr, vrIndex) => {
      if (index === vrIndex) {
        vr.patchValue({ variantIsDefault: event.source.checked });
      } else {
        vr.patchValue({ variantIsDefault: !event.source.checked });
      }
    });
    if (this.editableProductId) {
      if (arrType === 'tempNewVariantsForEditableMode') {
        const vrDet = this.getFormArray('productVariantsDetails');
        vrDet.controls.forEach(vr => vr.patchValue({ variantIsDefault: !event.source.checked }));
      } else {
        const vrDet = this.getFormArray('tempNewVariantsForEditableMode');
        vrDet.controls.forEach(vr => vr.patchValue({ variantIsDefault: !event.source.checked }));
      }
    }
    // variantDetailsArr.controls[index].patchValue({ variantIsDefault: event.source.checked });
    // variantDetails.get('variantIsDefault').setValue(event.source.checked);
    // console.log(variantDetails);
  }
  // The heart of making of variant products.
  pushingIntoProductVariantDetails() {
    this.variantDetailsArr = this.editableProductId ? this.getFormArray('tempNewVariantsForEditableMode') : this.getFormArray('productVariantsDetails');
    this.variantDetailsArr.clear();
    const self = this;
    console.log('newProduct', this.newProductVariant.length);
    if (this.newProductVariant.length > 0) {
      this.newProductVariant[0].values.split(',').forEach((parent, index) => {
        // variantDetailsArr.push(this.initialiseProductVariantDetails(parent.toString()));
        if (this.newProductVariant.length >= 2) {
          for (let i = 1; i <= this.newProductVariant.length - 1; i++) {
            const childArr = this.newProductVariant[i].values.split(',');
            console.log('CHILD ARR', childArr);
            childArr.forEach(child => {
              if (child.length !== 0) {
                let currName = parent.toString();
                currName = currName.concat(`/${child}`);
                if (!this.avoidDuplicateVariants(currName, child.concat(`/${parent}`))) {
                  console.log(currName);
                  const variantDetails = []
                  if (this.editableProductId) {
                    variantDetails.push(this.setupVariantDetailsArr(this.newProductVariant[0]));
                    const { code, attribute } = this.newProductVariant[i];
                    variantDetails.push(this.setupVariantDetailsArr({ code, attribute, values: child }));
                    // variantNupc = '', variantIsbn = '', variantEan = '',
                    // variantUpc = '', variantMrp = '', variantSellingPrice = '', variantIsDefault = false, updatedImages = [],
                  }
                  this.pushIntoVariantDetails(currName, variantDetails, this.editableProductId);
                }
              } else {
                const variantDetails = [];
                if (this.editableProductId) {
                  console.log('psusj', this.newProductVariant[0]);
                  variantDetails.push(this.setupVariantDetailsArr(this.newProductVariant[0]));
                }
                console.log("VR DETAILS", variantDetails)
                this.pushIntoVariantDetails(parent.toString(), variantDetails, this.editableProductId);
              }
            });
          }
        } else {
          if (!this.avoidDuplicateVariants(parent, parent)) {
            const variantDetails = [];
            if (this.editableProductId) {
              console.log('psusj', this.newProductVariant[0]);
              variantDetails.push(this.setupVariantDetailsArr(this.newProductVariant[0]));
            }
            console.log("VR DETAILS_nuu", variantDetails)

            this.pushIntoVariantDetails(parent.toString(), variantDetails, this.editableProductId);
          }
        }
      });
      console.log(this.variantDetailsArr);
      // function pushIntoVariantDetails(name: string, variantDetails?: Array<any>, editableProductId = false) {
      //   let variantIsDefault = false;
      //   if (variantDetailsArr.length === 0 && !self.editableProductId) {
      //     variantIsDefault = true;
      //   }
      //   if (editableProductId) {
      //     variantDetailsArr.push(
      //       self.initialiseProductVariantDetails(name, '', '', '', '', '', '', variantIsDefault, [], variantDetails)
      //     );
      //   } else {
      //     variantDetailsArr.push(
      //       self.initialiseProductVariantDetails(name, '', '', '', '', '', '', variantIsDefault)
      //     );
      //   }
      //   return null;
      // }

    }
  }
  avoidDuplicateVariants(vrName, reverseVrName?) {
    if (this.editableProductId) {
      const exst: FormArray = this.catalogForm.get('productVariantsDetails') as FormArray;
      const existingVariants = exst.controls;
      const yxt: FormArray = this.catalogForm.get('tempNewVariantsForEditableMode') as FormArray;
      const addedVariants = yxt.controls;
      const nameSet = new Set();
      existingVariants.forEach(v => {
        // const x = v.get('variantName').value.split('/');
        nameSet.add(v.get('variantName').value);

      });
      addedVariants.forEach(v => {
        // const x = v.get('variantName').value.split('/');
        nameSet.add(nameSet.add(v.get('variantName').value))
      });
      if (!nameSet.has(vrName)) {
        return nameSet.has(reverseVrName);
      } else {
        return nameSet.has(vrName)
      }
    } else {
      return false;
    }
  }
  // Check If Attribute Exists with delete_function for purpose (when variant of same attribute is added).
  checkIfAttributeExists(code, deleteAttribute = false) {
    let attrFound = false;
    const productAttributesFormArr = this.getFormArray('productAttributes');
    const index = productAttributesFormArr.controls.findIndex(attr => attr.get('code').value == code);
    if (index < 0) {
      const tempIndex = this.tempNewAttributesArr.findIndex(attr => attr.code == code);
      if (tempIndex >= 0) {
        if (deleteAttribute) {
          const data = this.tempNewAttributesArr[tempIndex];
          data.dropDownValue = this.attributeBasedOnAttribute[data.id];
          this.recoveryAttributesArr[data.code] = { data, type: 'temp' };
          this.tempNewAttributesArr.splice(tempIndex, 1);
        }
        attrFound = true;
      }
    } else {
      if (deleteAttribute) {
        const data = productAttributesFormArr.controls[index];
        this.recoveryAttributesArr[data.get('code').value] = { data, type: 'final' };
        productAttributesFormArr.removeAt(index);
      }
      attrFound = true;
    }
    console.log('ATTR_FOUND', attrFound, this.recoveryAttributesArr);
    return attrFound;
  }
  recoverDeletedAttributes(code) {
    console.log('code', code);
    const attrData = this.recoveryAttributesArr[code.toString()];
    console.log('DT', attrData, this.recoveryAttributesArr);
    if (attrData) {
      if (attrData.type === 'temp') {
        this.tempNewAttributesArr.push(attrData.data);
      } else {
        const productAttributesFormArr = this.getFormArray('productAttributes');
        productAttributesFormArr.push(attrData.data);
      }
      delete this.recoveryAttributesArr[code.toString()]
    }
  }
  setupVariantDetailsArr({ code, attribute, values }) {
    return this.fb.group({
      code,
      attribte: attribute,
      values
    })
  }
  applySinglePriceToAllSku() {
    const shippingPrice = this.catalogForm.get('shippingMrp').value;
    const shippingRetailPrice = this.catalogForm.get('shippingRetailPrice')
      .value;
    console.log(shippingPrice, shippingRetailPrice);
    if (shippingPrice && shippingRetailPrice) {
      const tempVarinatDetailsArr = this.editableProductId ? this.getFormArray('tempNewVariantsForEditableMode') : { controls: [] };
      const variantDetailsArr = this.getFormArray('productVariantsDetails');
      variantDetailsArr.controls.forEach((item) => {
        console.log(item);
        item.patchValue({ variantMrp: shippingPrice, variantSellingPrice: shippingRetailPrice });
      });
      tempVarinatDetailsArr.controls.forEach(item => {
        item.patchValue({ variantMrp: shippingPrice, variantSellingPrice: shippingRetailPrice });
      });
    } else {
      alert('Please set the shipping price to continue');
      this.shippingPriceSection.nativeElement.scrollIntoView(true);
    }
  }
  addImageForSimpleProduct() {
    this.productImagesArr = [];
    this.productImagesArr.push({ name: 'simple', imageUrls: [] });
  }
  applyImageToSku(variantValues, singleSetOfImage) {
    if (!this.editableProductId) {
      this.productImagesArr = [];
      if (singleSetOfImage) {
        console.log('single set', variantValues);
        const valueArr = _.uniq(variantValues.split(','));

        this.productImagesArr.push({ name: valueArr.join(','), imageUrls: [] });
      } else {

        const valueArr = _.uniq(variantValues.split(','));

        valueArr.forEach(element => {
          this.productImagesArr.push({ name: element, imageUrls: [] });
        });

      }
    }
    // else {
    //   this.productImagesForEidtableMode = [];
    //   if (singleSetOfImage) {
    //     this.productImagesForEidtableMode.push({ name: variantValues, imageUrls: [] });
    //   } else {
    //     const valueArr = variantValues.split(',');
    //     valueArr.forEach(element => {
    //       this.productImagesForEidtableMode.push({ name: element, imageUrls: [] });
    //     });
    //   }
    // }
  }
  onproductImagesArrChange(event) {
    // if (this.editableProductId) {
    //   this.productImagesForEidtableMode = event;
    // } else {
    this.productImagesArr = event;
    // }
  }
  onProductImagesChangeInModal(event) {
    // if (this.currentModalImageType === 'newVariantAdded') {
    const formArrName = this.currentModalImageType === 'newVariantAdded'
      ? this.getFormArray('tempNewVariantsForEditableMode') : this.getFormArray('productVariantsDetails');
    const index = formArrName.controls.findIndex(i => event[0].name === i.get('variantName').value);
    console.log(formArrName, index);
    const imgArr = formArrName.controls[index].get('updatedImages') as FormArray;
    console.log(event[0].imageUrls);
    imgArr.clear();
    imgArr.push(new FormControl([...event[0].imageUrls]));
    // formArrName.controls[index].patchValue({ updatedImages: event[0].imageUrls });
    // formArrName.controls[index].setValue({ updatedImages: this.fb.array([...event[0].imageUrls]) });
    console.log(formArrName.controls[index]);
    // }
    console.log(event);
  }
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }
  openVariantModal(content) {
    const self = this;
    if (this.editableConfgurableProductOptions) {
      console.log(this.newProductVariant);
      if (this.newProductVariant.length > 0) {
        this.newProductVariant.forEach((vr, i) => {
          console.log('DRT', vr);
          const vrDetails = vr.variantDetails;
          if (vrDetails[3] === 'SELECT' || vrDetails[3] === 'SWATCH') {
            if (!this.variantBasedOnVariant[vrDetails[0]]) {
              return this.store.dispatch(
                new GetValueBasedOnVariant({ attributeId: vrDetails[0] }))
            }
          }
        });
      }
    } else {
      if (this.newProductVariant.length < 2) {
        const currIndex = this.newProductVariant.length - 1;
        if (currIndex >= 0) {
          const currTempVariant = this.newProductVariant[currIndex];
          if (currTempVariant.values.length === 0) {
            this.newProductVariant.splice(currIndex, 1);
          }
        }
        setNewVariant();
      }
    }
    function setNewVariant() {
      self.addNewProductVariant();
      console.log(self.newProductVariant);
      self.modalVariantDetails = self.newProductVariant[self.newProductVariant.length - 1];
    }
    this.openModal(content);
  }
  openImageModal(content, typeOfImage, variantDetails) {
    this.currentModalImageType = typeOfImage;
    const name = variantDetails.get('variantName').value;
    let imageUrls = variantDetails.get('updatedImages').value;
    if (imageUrls.length > 0) {
      imageUrls = imageUrls[0]
    }
    console.log(imageUrls);
    let sendImageUrls = [];
    if (imageUrls.length > 0) {
      sendImageUrls = imageUrls;
    }
    this.modalImagesArr = [];
    this.modalImagesArr.push({ name, imageUrls: sendImageUrls });
    console.log(this.modalImagesArr);
    this.openModal(content);
  }
  // onProductImageUploaded(event, productImgObject) {
  //   // console.log(productImgObject, event);
  //   productImgObject.imageUrls.push(event.Location);
  // }
  // removeUploadedImage(index, productImgObject) {
  //   productImgObject.imageUrls.splice(index, 1);
  // }
  // imgPositionChange(event: CdkDragDrop<string[]>, productImgObject) {
  //   moveItemInArray(
  //     productImgObject.imageUrls,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
  toggleVariantEditMode(variantDetails) {
    console.log('TOGGLE MODE', variantDetails.get('editMode').value);
    variantDetails.get('editMode').setValue(!variantDetails.get('editMode').value);
  }
  saveExistingVariantDetails(variantDetails, index) {
    console.log('Function Caled', variantDetails.getRawValue());
    if (variantDetails.valid) {
      if (variantDetails.get('updatedImages').value.length > 0) {
        const data = variantDetails.getRawValue();
        delete data.editMode;
        delete data.productVariants;
        data['updatedImages'] = data['updatedImages'][0];
        console.log('INDEX', index);
        if (data.variantSellingPrice && parseInt(data.variantSellingPrice, 10) > 0) {

          this.store.dispatch(new EditCatalogFileDetails({ data, editType: 'editVariantDetails', index }));
        } else {
          alert('Selling Price should be greater then 0');
        }
      } else {
        alert('Variant Images Are mandatory')
      }
    } else {
      alert('Fill All the required fields');
    }
  }
  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.catalogForm.get('categories').patchValue(this.categoryId);
    this.catalogForm.get('attributeId').patchValue(this.attributeSetId);
    this.getPayloadForAttr();
    const productImagesFormArr = this.getFormArray('productImages');
    productImagesFormArr.clear();
    this.productImagesArr.forEach(img => {
      const { name, imageUrls } = img;
      productImagesFormArr.push(this.initialiseProductImages(name, imageUrls));
    });
    const productVariantsArr = this.getFormArray('productVariants')
    productVariantsArr.clear()
    this.newProductVariant.forEach(variant => {
      const { code, attribute, values } = variant;
      // So that no blank value data are submitted.
      if (values.length !== 0) {
        productVariantsArr.push(this.fb.group({ code, attribte: attribute, values }));
      }
    });
    const data = this.makeAttributeArrForPayload(this.catalogForm.getRawValue());
    delete data.tempNewVariantsForEditableMode;
    console.log(data);
    if (this.catalogForm.valid) {
      // const canSubmitForm = false;
      // if (productVariantsArr.length === 0) {
      //   alert('Add a')
      // }
      // this.store.dispatch(new CreateNewCatalog(data));
    } else {
      // alert('Fill all the required fields ');
      this.validateAllFormFields(this.catalogForm)
    }
    console.log(data);
  }
  requestProcess(type) {
    const data = this.catalogForm.getRawValue();
    if (this.catalogForm.valid) {
      if (this.typeId == 'c') {
        const variantList = data.productVariantsDetails;
        const dt = variantList.findIndex(vr => {
          if (vr.variantSellingPrice) {
            return parseInt(vr.variantSellingPrice, 10) <= 0;
          } else {
            console.log('d');
            return true;
          }
        })
        console.log('dt', dt, variantList);
        if (dt < 0) {
          this.openDialog(type);
        } else {
          alert('Variant Selling Price should be greater then 0')
        }
      } else {
        this.openDialog(type);
      }
    } else {
      alert('Fill all the required fields');
      this.markFormGroupTouched(this.catalogForm);
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


  openDialog(type) {
    const payload = { id: this.editableProductId }
    // this.store.dispatch(new ApproveRejectPendingCatalog({ data: payload, type }));
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { payload, type }
    });
    dialog.afterClosed().subscribe(res => {
      if (!res.cancelClick) {
        this.loading = true;
      }
    })
  }
  submitEditableRequest(keyName) {
    let payload = null;
    let isValidForm = false;
    switch (keyName) {
      case 'basicDetails':
        payload = this.getPayloadForBasicDetails();
        isValidForm = this.basicValidateForm();
        break;
      case 'priceDetails':
        payload = this.getPayloadForPriceDetials();
        isValidForm = this.shippingAndPriceValidateForm();
        break;
      case 'meta':
        payload = this.getPayloadForMeta();
        isValidForm = true;

        break;
      case 'imgDetails':
        payload = this.getPayloadForImgDetails();
        isValidForm = true;

        break;
      case 'attrDetails':
        this.getPayloadForAttr(true);
        payload = this.makeAttributeArrForPayload({
          productName: `${this.editableProductId}`,
          productAttributes: this.getFormArray('productAttributes').getRawValue(),
          productKeyAttributes: this.getFormArray('productKeyAttributes').getRawValue()
        });
        isValidForm = this.getFormArray('productKeyAttributes').errors ? false : true;
        break;
    }


    if (keyName != 'comAnysis') {
      if (isValidForm) {
        // console.log(payload);
        this.store.dispatch(new EditCatalogFileDetails({ data: payload, editType: keyName }));
        this.loading = true;

        this.apiMessageService.currentApiStatus.subscribe((response) => {
          if (response.type == ActionTypes.editCatalogFileDetails) {
            let res: any = response.status;
            if (res) {
              this.loading = false;
            }

          }
          else if (response.type == '500_SERVER_ERROR' && response.status == true) {
            let res: any = response.status;
            if (res) {
              this.loading = false;
            }
          }

        });


      } else {
        this.snackBar.open(`Fields are not valid`, '', { duration: 2500 });
        // console.log(this.catalogForm.errors);
      }
    }
  }
  saveNewVariantInEditableMode(variantDetails, index) {
    console.log(variantDetails);
    console.log(variantDetails.getRawValue());
    if (variantDetails.valid) {
      if (variantDetails.get('updatedImages').value.length > 0) {
        const data = variantDetails.getRawValue();
        data['updatedImages'] = data['updatedImages'][0];
        delete data['editMode'];
        let proArray = []
        console.log('Before form submit', data);
        const variantName = data['variantName'].split('/');
        const proVariantArry = data['productVariants'];
        proVariantArry.forEach((variant, i) => {
          let final = Object.assign({}, variant, { values: variantName[i] })
          proArray.push(final);
        });
        const payload = Object.assign({}, data, { productVariants: proArray })
        console.log('Submit', payload);
        this.store.dispatch(new AddNewVariantToConfigurableProductInCatalogFile({ confId: this.editableProductId, data: payload, index }));
      } else {
        alert('UPLOAD A VARIANT IMAGE TO CONTINUE');
      }
    } else {
      alert('Fill All the fields except the nupc');
    }
    // let data = variantDetails.getRawValue();
    // console.log(data);

  }
  deleteNewVariantInEditableMode(index) {
    const tempVr = this.getFormArray('tempNewVariantsForEditableMode');
    tempVr.removeAt(index);
    if (tempVr.length === 0) {
      if (!this.editableConfgurableProductOptions) {
        this.newProductVariant = [];
      }
    }
  }
  getPayloadForBasicDetails() {
    const payload = {};
    payload['category_id'] = this.categoryId;
    payload['product_id'] = this.editableProductId;
    payload['brand'] = this.catalogForm.get('brand').value;
    payload['description'] = this.catalogForm.get('description').value;
    payload['otherDetails'] = this.catalogForm.get('otherDetails').value;
    payload['productName'] = this.catalogForm.get('productName').value;
    // payload['description'] = this.catalogForm.get('description').value.replace(/<[^>]*>/g, '');
    // payload['otherDetails'] = this.catalogForm.get('otherDetails').value.replace(/<[^>]*>/g, '');
    return payload;
  }
  getPayloadForPriceDetials() {
    return {
      id: this.editableProductId,
      maximumRetailPrice: this.catalogForm.get('shippingMrp').value,
      sellingPrice: this.catalogForm.get('shippingRetailPrice').value,
      currency: this.catalogForm.get('shippingCurrency').value,
      isbn: this.catalogForm.get('shippingIsbn').value,
      upc: this.catalogForm.get('shippingUpc').value,
      ean: this.catalogForm.get('shippingEan').value,
      standardLength: this.catalogForm.get('shippingLength').value,
      standardWidth: this.catalogForm.get('shippingWidth').value,
      standardHeight: this.catalogForm.get('shippingHeight').value,
      standardWeight: this.catalogForm.get('shippingWeight').value,
      taxClass: this.catalogForm.get('shippingHsnCode').value,
      taxValue: this.catalogForm.get('shippingGst').value
    };
  }
  getPayloadForMeta() {
    return {
      id: this.editableProductId,
      // id: this.editableProductDetails.marketplaceProductSeo[0].id,
      excludeStemap: this.catalogForm.get('metaExclude').value ? 1 : 0,
      metaTitle: this.catalogForm.get('metaTitle').value,
      metaKeywords: this.catalogForm.get('metaKeyword').value,
      metaDescription: this.catalogForm.get('metaDesc').value,
      h1Heading: '',
      urlKey: ''
    };
  }
  getPayloadForImgDetails() {
    let payload = {};
    payload['simpleProductId'] = [this.editableProductId.toString()];
    payload['updatedImages'] = this.productImagesArr[0].imageUrls.flat();
    return payload;
  }
  getPayloadForAttr(editable = false) {
    const productAttributesArr = this.getFormArray('productAttributes');
    this.tempNewAttributesArr.forEach(tempAttr => {
      const { id, code, name, value, is_key, type, dropDownValue } = tempAttr;
      // So that no blank data are submmited.
      if (value.length !== 0) {
        productAttributesArr.push(this.intializeFormArray(id, code, name, value, is_key, type, dropDownValue));
      }
    });
    this.tempNewAttributesArr = [];
    const productKeyAttributesArr = this.getFormArray('productKeyAttributes');
    if (editable) {
      productKeyAttributesArr.clear();
    }
    // productAttributesArr.controls.forEach((attr: FormGroup) => {
    //   if (attr.get('is_key').value) {
    //     productKeyAttributesArr.push(attr);
    //   }
    // });
    // console.log('ATTR', productAttributesArr, productKeyAttributesArr);
  }
  makeAttributeArrForPayload(payloadObj) {
    const attArr = payloadObj.productAttributes;
    let finalAttributeArr = [];
    let keyFinalAttributeArr = [];
    attArr.forEach(att => {
      const { code, name, value, is_key } = att;
      if (is_key) {
        keyFinalAttributeArr.push({ code, name, value, is_key });
      }
      finalAttributeArr.push({ code, name, value, is_key });
    });
    const finalAttrPayload = { productAttributes: finalAttributeArr, productKeyAttributes: keyFinalAttributeArr };
    const payload = Object.assign({}, payloadObj, finalAttrPayload);
    // payload.description = payload.description.replace(/<[^>]*>/g, '');
    // payload.otherDetails = payload.otherDetails.replace(/<[^>]*>/g, '');

    return payload;
  }
  getFormArray(name) {
    return this.catalogForm.get(name) as FormArray;
  }
  initialFormSetup() {
    this.catalogForm = this.fb.group({
      productName: ['', Validators.required],
      categories: ['', Validators.required],
      attributeId: '',
      brand: ['', Validators.required],
      shippingMrp: ['', [Validators.required, Validators.pattern(/^((?!(-|0))[0-9]{0,7})/)]],
      shippingRetailPrice: ['', [Validators.required, Validators.pattern(/^((?!(-|0))[0-9]{0,7})/)]],
      shippingCurrency: ['INR', Validators.required],
      shippingIsbn: ['', Validators.pattern(/^((?!(-))[0-9]{13})/)],
      shippingEan: ['', Validators.pattern(/^((?!(-))[0-9]{13})/)],
      shippingUpc: ['', Validators.pattern(/^((?!(-))[0-9]{13})/)],
      shippingLength: [null, [Validators.required, Validators.min(1), Validators.pattern(/^((?!(-|0))[0-9]{0,5})/)]],
      shippingWidth: [null, [Validators.required, Validators.min(1), Validators.pattern(/^((?!(-|0))[0-9]{0,5})/)]],
      shippingHeight: [null, [Validators.required, Validators.min(1), Validators.pattern(/^((?!(-|0))[0-9]{0,5})/)]],
      shippingWeight: [null, [Validators.required, Validators.min(1), Validators.pattern(/^((?!(-|0))[0-9]{0,5})/)]],
      shippingHsnCode: ['', [Validators.required, Validators.pattern(/^((?!(-))[\w+\d+]{0,13})/)]],
      shippingGst: ['', Validators.required],
      metaExclude: false,
      metaTitle: ['', Validators.maxLength(100)],
      metaKeyword: ['', Validators.maxLength(100)],
      metaDesc: ['', Validators.maxLength(255)],
      metaHeading: '',
      productAttributes: this.fb.array([]),
      productKeyAttributes: this.fb.array([]),
      productVariantsDetails: this.fb.array([]),
      description: ['', Validators.required],
      otherDetails: [''],
      productImages: this.fb.array([]),
      productVariants: this.fb.array([]),
      tempNewVariantsForEditableMode: this.fb.array([])
    });
  }
  // Initialise Function For Product Attributes.
  intializeFormArray(id = '', code = '', name = '', value = '', is_key = false, type = 'TEXT', dropdownValue = '', required?) {
    if (required) {
      return this.fb.group({
        id: id,
        code: code,
        name: [{ value: name, disabled: true }],
        value: [value, Validators.required],
        is_key: is_key,
        type: type,
        dropDownValue: dropdownValue,
        option: 'M'
      });
    } else {
      return this.fb.group({
        id: id,
        code: code,
        name: [{ value: name, disabled: true }],
        value: [value],
        is_key: is_key,
        type: type,
        dropDownValue: dropdownValue,
        option: 'N'
      });
    }
  }
  initialiseProductVariantDetails(
    variantName, variantNupc = '', variantIsbn = '', variantEan = '',
    variantUpc = '', variantMrp = '', variantSellingPrice = '', variantIsDefault = false, updatedImages = [], productVariants = []) {
    let obj = null;
    if (this.editableProductId) {
      console.log('UPDTDE', updatedImages);
      obj = this.fb.group({
        variantName: [{ value: variantName, disabled: true }],
        variantNupc: [{ value: variantNupc, disabled: true }],
        variantIsbn: [variantIsbn],
        variantEan: [variantEan],
        variantUpc: [variantUpc],
        variantMrp: [variantMrp, Validators.required],
        variantSellingPrice: [variantSellingPrice, Validators.required],
        variantIsDefault: [variantIsDefault, Validators.required],
        updatedImages: this.fb.array([...updatedImages]),
        productVariants: this.fb.array(productVariants),
        editMode: false
      });
    } else {
      obj = this.fb.group({
        variantName: [{ value: variantName, disabled: true }],
        variantNupc: [{ value: variantNupc, disabled: true }],
        variantIsbn: [variantIsbn, Validators.required],
        variantEan: [variantEan, Validators.required],
        variantUpc: [variantUpc, Validators.required],
        variantMrp: [variantMrp, Validators.required],
        variantSellingPrice: [variantSellingPrice, Validators.required],
        variantIsDefault: [variantIsDefault, Validators.required]
      });
    }
    return obj;
  }
  initialiseProductImages(name = '', urlsArr = []) {
    return this.fb.group({
      name,
      imageUrls: this.fb.array([...urlsArr]),
    });
  }

  checkRetailPrice() {
    const mrp = this.catalogForm.get('shippingMrp').value;
    const retailPrice = this.catalogForm.get('shippingRetailPrice').value;
    if (mrp < retailPrice) {
      this.catalogForm.get('shippingRetailPrice').setErrors({ highRetailPrice: true });
    } else {
      this.catalogForm.get('shippingRetailPrice').setErrors({ highRetailPrice: false });
      this.catalogForm.get('shippingRetailPrice').setErrors(null);
    }
  }

  checkMRPOverRP(shippingMrp, shippingRetailPrice) {
    this.mrpValue = this.catalogForm.get(shippingMrp).value;
    console.log('CHECK MRP OVER ', this.mrpValue)
    this.catalogForm.get(shippingRetailPrice).setValidators(CustomValidators.lte(this.mrpValue));
    this.catalogForm.get(shippingRetailPrice).updateValueAndValidity()
  }

  checkMRPOverRPArray(shippingMrp, shippingRetailPrice, i) {
    const mrpValue = this.getFormArray('productVariantsDetails').controls[i].get(shippingMrp).value;
    console.log('CHECK MRP OVER ', mrpValue)
    this.getFormArray('productVariantsDetails').controls[i].get(shippingRetailPrice).setValidators(CustomValidators.lte(mrpValue));
    this.getFormArray('productVariantsDetails').controls[i].get(shippingRetailPrice).updateValueAndValidity()
  }

  onPaste(e) {
    return false
  }

  validateMRPOverRetailPrice(mrpValue: string, retailPrice: string) {
    return (formGroup: FormGroup) => {
      const mrp = formGroup.controls[mrpValue];
      const retailPriceValue = formGroup.controls[retailPrice];

      if (retailPriceValue.errors && !retailPriceValue.errors.highRetailPrice) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (mrp.value < retailPriceValue.value) {
        retailPriceValue.setErrors({ highRetailPrice: true });
      } else {
        retailPriceValue.setErrors(null);
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  pushIntoVariantDetails(name: string, variantDetails?: Array<any>, editableProductId = false) {
    let variantIsDefault = false;
    if (this.variantDetailsArr.length === 0 && !this.editableProductId) {
      variantIsDefault = true;
    }
    if (editableProductId) {
      this.variantDetailsArr.push(
        this.initialiseProductVariantDetails(name, '', '', '', '', '', '', variantIsDefault, [], variantDetails)
      );
    } else {
      this.variantDetailsArr.push(
        this.initialiseProductVariantDetails(name, '', '', '', '', '', '', variantIsDefault)
      );
    }
    return null;
  }

  linkWithCategory(brandid) {
    this.store.dispatch(
      new LinkBrandWithCategory({
        categoryId: [this.categoryId],
      },
        brandid,
      )
    );

  }

  openAddBrand(nupc) {
    let link = environment.localBaseUrl + '/category/manage/add-new-brand';
    window.open(link, '_blank');
  }

  syncBrands() {
    this.catalogForm.get('brand').setValue('');
    if (this.eidtableId == null) {
      const attributeSetId = this.attributeSetId;
      if (this.editableProductId) {
        if (this.selectedOption[0] != this.categoryId) {
          this.store.dispatch(
            new GroupActionsBasedOnCategorySelection({
              categoryId: this.categoryId,
              attributeSetId,
            })
          );
        }
      } else {
        this.store.dispatch(
          new GroupActionsBasedOnCategorySelection({
            categoryId: this.categoryId,
            attributeSetId,
          })
        );
      }
    }
  }

  addAttribute(type, id) {
    console.log(type, id);
    this.dialog.open(AddAttributeFromCatalogComponent, {
      width: '600px',
      maxHeight: '600px',
      data: {
        type: type,
        id: id,
        attributeSetId: this.attributeSetId
      },
    })

  }

  minusCheckRP(formName) {
    const rp = this.catalogForm.get(formName).value
    let patt = new RegExp(/^((?!(-|0))[0-9]{0,7})/);
    var res = patt.test(rp);
    if (!res) {
      const finalVal = rp.toString().replace(/^(-|0)/, '')
      this.catalogForm.get(formName).patchValue(finalVal)
    }
  }

  checkPartForm(payload) {
    console.log('BASIC VALIDATE', payload)
    if (this[payload]) {
      return true
    } else {
      return false
    }
  }

  basicValidateForm() {
    console.log('BASIC VALIDATE', this.catalogForm.get('brand').value, this.categoryId, this.editableProductId, this.catalogForm.get('description').value, this.catalogForm.get('otherDetails').value, this.catalogForm.get('productName').value)
    return this.categoryId &&
      this.editableProductId &&
      this.catalogForm.get('brand').value &&
      this.catalogForm.get('description').value &&
      this.catalogForm.get('productName').value
  }

  shippingAndPriceValidateForm() {
    console.log('Price Check', this.catalogForm.errors)
    if (!this.catalogForm.get('shippingCurrency').value) {
      this.catalogForm.get('shippingCurrency').markAsTouched()
      this.catalogForm.updateValueAndValidity()
    }
    return this.editableProductId &&
      this.catalogForm.get('shippingMrp').value &&
      !(this.catalogForm.get('shippingMrp').hasError('lte')) &&
      this.catalogForm.get('shippingRetailPrice').value &&
      !(this.catalogForm.get('shippingRetailPrice').hasError('lte')) &&
      this.catalogForm.get('shippingCurrency').value &&
      this.catalogForm.get('shippingLength').value &&
      this.catalogForm.get('shippingWidth').value &&
      this.catalogForm.get('shippingHeight').value &&
      this.catalogForm.get('shippingWeight').value &&
      this.catalogForm.get('shippingHsnCode').value &&
      this.catalogForm.get('shippingGst').value
  }

  // seoValidateForm() {
  //   return this.editableProductId &&
  //     this.catalogForm.get('metaTitle').value &&
  //     this.catalogForm.get('metaKeyword').value &&
  //     this.catalogForm.get('metaDesc').value
  // }
}
