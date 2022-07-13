import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '../../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { GetAllCategory, GetParentCategory } from '../../../../../actions/storeManagement.action';
import { GetActiveBrands } from '../../../../../actions/brand-management.actions';
import { GetSellers } from '../../../../../actions/seller-management.action';
import { GetCommisioneGroup, PostNewProductException, ApproveRejectException, ActionTypes, PostSaveProductException, ApproveRejectProductException, PostCommissionException, CheckProductNupc } from '../../../../../actions/commission-exception-management.action';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { Router, ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import qs from 'qs';
import { MatDialog } from '@angular/material/dialog';
import { ProductNupcListComponent } from '../product-nupc-list/product-nupc-list.component';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];

@Component({
  selector: 'app-add-new-commission-exception',
  templateUrl: './add-new-commission-exception.component.html',
  styleUrls: ['./add-new-commission-exception.component.css']
})
export class AddNewCommissionExceptionComponent implements OnInit {
  approveselectedIds = null;
  requestId = null;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  selectedValue = [];
  approveObj = null;
  approveMode = null;
  itemList = [];
  sellerList = [];
  brandList = [];
  selectedItems: any;
  sellerSelectedItems = [];
  brandSelectedItems = [];
  settings = {};
  sellerSettings = {};
  brandSettings = {};
  exceptionForm: FormGroup;
  items: FormArray;
  categories = null;
  brands = null;
  sellers = null;
  comssionGroups = null;
  sellerid = null;
  sellName = '';
  formValues = [];
  categoryItems = [];
  selectedItem: any = null;
  searchTerm = '';
  searchTermStatus = false;
  treeStatus = false;

  minDate = new Date();
  maxDate = new Date();
  public sellerFilterCtrl: FormControl = new FormControl();
  public brandFilterCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();



  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;

  commissiontype = '';
  pendingType = '';
  productName = '';

  constructor(private fb: FormBuilder, private store: Store<categoryState>,
    private apiMessageService: ApiMessageService, private activatedRoute: ActivatedRoute,
    private router: Router, public dialog: MatDialog, private toastr: ToastrService, ) {
    this.exceptionForm = fb.group({
      'exceptionName': ['', [Validators.required, Validators.maxLength(200)]],
      'affectFrom': ['', Validators.required],
      'expiryDate': ['', Validators.required],
      'marketplaceCommissionGroup': ['',],
      'marketplaceCategory': [null,],
      'sellers': ['',],
      'marketplaceBrands': [null],
      'addLogistic': [false],
      'addPaymentHandling': [false],
      'addClosingFee': [false],
      'addFullfillmentFee': [false],
      'productId': [null,],
      'productNupc': [null,],
      'value': ['', [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'type': ['p',],
      'items': this.fb.array([])
    });



    if (!this.categories) {
      this.store.dispatch(new GetAllCategory());


    }
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['categories']) {
        this.categories = res['allcategories'];
        this.categoryItems = this.process(this.categories);
      }
    });


    if (!this.brands) {
      this.store.dispatch(new GetActiveBrands())

    }
    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      this.brands = res['activeBrands'];


    });

    if (!this.sellers) {
      this.store.dispatch(new GetSellers())

    }
    this.store.pipe(select<any, any>('sellers')).subscribe(res => {
      this.sellers = res['sellers'];


    });


    if (!this.comssionGroups) {
      this.store.dispatch(new GetCommisioneGroup())

    }
    this.store.pipe(select<any, any>('commissionGroups')).subscribe(res => {
      this.comssionGroups = res['commissionGroups'];


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


  onSubmit() {
    console.log(this.exceptionForm.value);
    this.checkCustomValidation();

    if (this.selectedItem) {
      this.exceptionForm.get('marketplaceCategory').setValue({
        id: this.selectedItem.id,
        name: this.selectedItem.name
      });
    }


    if (this.exceptionForm.valid) {
      if (this.commissiontype == 'b') {
        console.log('b submit');
        this.onBrandLevelSubmit();
      }
      else if (this.commissiontype == 'p') {
        console.log('p submit');
        this.onProductLevelSubmit();
      }
      else if (this.commissiontype == '') {
        this.toastr.error('Please Select Type of Exception', '', { timeOut: 5000 });
      }

    } else {
      this.markFormGroupTouched(this.exceptionForm);
    }


  }

  onProductLevelSubmit() {
    let marketplaceCommissionGroup = {
      id: '',
      groupName: ''
    };
    this.comssionGroups.map((value, i) => {
      if (value.id == this.f.marketplaceCommissionGroup.value) {
        marketplaceCommissionGroup.id = value.id;
        marketplaceCommissionGroup.groupName = value.groupClass;
      }
    });

    this.sellers.map((value, i) => {
      if (value.id == this.f.sellers.value) {
        this.sellerid = value.id;
        this.sellName = value.displayName;
      }
    });


    let fvalues = {
      exceptionName: this.f.exceptionName.value,
      id: null,
      code: null,
      parentId: null,
      addLogistic: this.f.addLogistic.value,
      addPaymentHandling: this.f.addPaymentHandling.value,
      addClosingFee: this.f.addClosingFee.value,
      addFullfillmentFee: this.f.addFullfillmentFee.value,
      affectFrom: new Date(this.f.affectFrom.value),
      expiryDate: new Date(this.f.expiryDate.value),
      groupId: marketplaceCommissionGroup.id ? marketplaceCommissionGroup.id : null,
      groupName: marketplaceCommissionGroup.groupName,
      productId: this.f.productId.value,
      productNupc: this.f.productNupc.value,
      productName: this.searchTerm,
      sellerId: this.sellerid ? this.sellerid : null,
      sellerName: this.sellName,

      type: this.f.type.value,
      value: this.f.value.value,
    }

    console.log(fvalues);

    // this.store.dispatch(new PostSaveProductException(fvalues));
    this.store.dispatch(new PostCommissionException(fvalues, 'PRODUCT'));

    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.postCommissionException) {
        this.router.navigate(['/category/exception/commission-exception']);
      }
    })
  }

  onBrandLevelSubmit() {

    let marketplaceCommissionGroup = {
      id: null,
      groupName: ''
    };

    let marketplaceBrands = {
      id: '',
      brandName: ''
    };

    this.comssionGroups.map((value, i) => {
      if (value.id == this.f.marketplaceCommissionGroup.value) {
        marketplaceCommissionGroup.id = value.id;
        marketplaceCommissionGroup.groupName = value.groupClass;
      }
    });


    this.brands.map((value, i) => {
      if (value.id == this.f.marketplaceBrands.value) {
        marketplaceBrands.id = value.id;
        marketplaceBrands.brandName = value.brandName;
      }
    });
    this.sellers.map((value, i) => {
      if (value.id == this.f.sellers.value) {
        this.sellerid = value.id;
        this.sellName = value.displayName;
      }
    });


    this.formArr.controls.map((control, i) => {
      let fvalues = {
        exceptionName: this.f.exceptionName.value,
        affectFrom: new Date(this.f.affectFrom.value),
        expiryDate: new Date(this.f.expiryDate.value),
        marketplaceCommissionGroup: marketplaceCommissionGroup,
        marketplaceCategory: this.f.marketplaceCategory.value,
        sellerId: this.sellerid ? this.sellerid : null,
        sellerName: this.sellName,
        marketplaceBrands: marketplaceBrands,
        sellingPriceFrom: control.get('sellingPriceFrom').value,
        sellingPriceTo: control.get('sellingPriceTo').value,
        type: control.get('type').value,
        value: control.get('value').value,
        addLogistic: this.f.addLogistic.value,
        addPaymentHandling: this.f.addPaymentHandling.value,
        addClosingFee: this.f.addClosingFee.value,
        addFullfillmentFee: this.f.addFullfillmentFee.value,
      }
      this.formValues.push(fvalues);
    });


    console.log(this.formValues);


    // this.store.dispatch(new PostNewProductException(this.formValues));
    this.store.dispatch(new PostCommissionException(this.formValues, 'BRAND'));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.postCommissionException) {
        this.router.navigate(['/category/exception/commission-exception']);
      } else if (res && response.type == ActionTypes.postSaveProductException) {
        this.router.navigate(['/category/exception/commission-exception']);
      }
    })


  }


  getProductLevelApproveRequest() {

    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    console.log('Deatil', this.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      this.requestId = this.approveObj.apiObj.requestId;
      if (this.approveMode) {
        this.exceptionForm.get('affectFrom').setValue(new Date(this.approveObj.requestObj['affectFrom']));
        this.exceptionForm.get('expiryDate').setValue(new Date(this.approveObj.requestObj['expiryDate']));
        this.exceptionForm.get('marketplaceCommissionGroup').setValue(this.approveObj.requestObj['groupId'] ? this.approveObj.requestObj['groupId'] : '');
        this.exceptionForm.get('type').setValue(this.approveObj.requestObj['type']);
        this.exceptionForm.get('value').setValue(this.approveObj.requestObj['value']);
        this.exceptionForm.get('sellers').setValue(this.approveObj.requestObj['sellerId'] ? this.approveObj.requestObj['sellerId'] : '');
        this.exceptionForm.get('exceptionName').setValue(this.approveObj.requestObj['exceptionName']);
        this.exceptionForm.get('productId').setValue(this.approveObj.requestObj['productId']);
        this.exceptionForm.get('productNupc').setValue(this.approveObj.requestObj['productNupc']);
        this.exceptionForm.get('addLogistic').setValue(this.approveObj.requestObj.addLogistic === 'true');
        this.exceptionForm.get('addPaymentHandling').setValue(this.approveObj.requestObj.addPaymentHandling === 'true');
        this.exceptionForm.get('addClosingFee').setValue(this.approveObj.requestObj.addClosingFee === 'true');
        this.exceptionForm.get('addFullfillmentFee').setValue(this.approveObj.requestObj.addFullfillmentFee === 'true');
        this.searchTerm = this.approveObj.requestObj['productName']
      }

      this.exceptionForm.disable();
    }

  }

  getBrandlevelApproveRequest() {

    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    console.log(this.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;

      if (this.approveMode) {
        this.requestId = this.approveObj.apiObj.requestId;
        this.items = null;
        // this.items.clear();
        Object.keys(this.approveObj.requestObj).forEach((field) => {

          // this.items = null;
          this.items = this.exceptionForm.get('items') as FormArray;
          // this.items.clear();
          this.mapInnerItems(field);

        });
        this.exceptionForm.disable();
      }
    }
  }


  mapInnerItems(field) {
    this.items.push(

      this.fb.group({
        'sellingPriceFrom': [this.approveObj.requestObj[field].sellingPriceFrom, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'sellingPriceTo': [this.approveObj.requestObj[field].sellingPriceTo, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        'type': [this.approveObj.requestObj[field].type, Validators.required],
        'value': [this.approveObj.requestObj[field].value, [Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
        // 'id': [this.approveObj.requestObj[field].id],
      })
    );


    this.exceptionForm.get('exceptionName').setValue(this.approveObj.requestObj[field].exceptionName);
    this.exceptionForm.get('affectFrom').setValue(new Date(this.approveObj.requestObj[field].affectFrom));
    this.exceptionForm.get('expiryDate').setValue(new Date(this.approveObj.requestObj[field].expiryDate));
    this.exceptionForm.get('marketplaceCommissionGroup').setValue(this.approveObj.requestObj[field].marketplaceCommissionGroup.id ? this.approveObj.requestObj[field].marketplaceCommissionGroup.id : '');
    this.exceptionForm.get('sellers').setValue(this.approveObj.requestObj[field].sellerId ? this.approveObj.requestObj[field].sellerId : '');
    this.exceptionForm.get('marketplaceBrands').setValue(this.approveObj.requestObj[field].marketplaceBrands.id);
    this.exceptionForm.get('addLogistic').setValue(this.approveObj.requestObj[field].addLogistic === 'true');
    this.exceptionForm.get('addPaymentHandling').setValue(this.approveObj.requestObj[field].addPaymentHandling === 'true');
    this.exceptionForm.get('addClosingFee').setValue(this.approveObj.requestObj[field].addClosingFee === 'true');
    this.exceptionForm.get('addFullfillmentFee').setValue(this.approveObj.requestObj[field].addFullfillmentFee === 'true');
    this.exceptionForm.get('marketplaceCategory').setValue(this.approveObj.requestObj[field].marketplaceCategory ? this.approveObj.requestObj[field].marketplaceCategory.id : null);


    this.selectedItem = this.approveObj.requestObj[field].marketplaceCategory;


    // this.selectedValue = this.approveObj.requestObj[field].marketplaceCategory.id ? [this.approveObj.requestObj[field].marketplaceCategory.id] : [];

    // this.approveselectedIds = [this.approveObj.requestObj[field].marketplaceCategory.id];
  }

  createItem() {
    return this.fb.group({
      'sellingPriceFrom': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]],
      'sellingPriceTo': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
      'type': ['p', Validators.required],
      'value': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
    });
  }

  addItem(): void {
    this.items = this.exceptionForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  get f() {
    return this.exceptionForm.controls;
  }
  get formArr() {
    return this.exceptionForm.get('items') as FormArray;
  }

  formArrControls(i) {
    let control = this.exceptionForm.get('items') as FormArray;
    return control.at(i);
  }

  categorySelectionValue(event) {

    // this.selectedItems = value[0].item;
    this.selectedItems = event.value;
  }

  makeDecimal(event) {

    var controlname = event.target.getAttribute('formcontrolname');
    let stringValue = this.exceptionForm.get(controlname).value;
    if (stringValue != '') {
      let val = +this.exceptionForm.get(controlname).value;


      this.exceptionForm.get(controlname).patchValue(val.toFixed(2));

    }


  }

  makeDecimalFormArrayControl(i, event) {
    var controlname = event.target.getAttribute('formcontrolname');
    let stringValue = this.formArrControls(i).get(controlname).value;

    if (stringValue != '') {

      let val = +this.formArrControls(i).get(controlname).value;

      // if (Number.isInteger(val)) {
      this.formArrControls(i).get(controlname).patchValue(val.toFixed(2));
      // }
    }

  }

  ngOnInit() {
    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    this.approveMode = this.approveObj.approveMode;
    if (this.approveMode) {
      this.commissiontype = this.approveObj.exceptiontype == 'CATEGORYEXCEPTION' ? 'b' : 'p';
      if (this.commissiontype == 'b') {
        this.getBrandlevelApproveRequest();
      } else {
        this.getProductLevelApproveRequest();

      }
    }
    if (!this.approveMode) {
      // this.commissiontype == 'p';
      // this.changeRadio();
      this.addItem();
    }


  }


  requestProcess(type) {
    this.approveObj.apiObj.approveStatus = type;
    if (this.commissiontype == 'b') {
      this.store.dispatch(new ApproveRejectException(this.approveObj.apiObj, this.requestId));

    } else {
      this.store.dispatch(new ApproveRejectProductException(this.approveObj.apiObj, this.requestId));

    }

    this.router.navigate(['/category/exception/commission-exception']);

  }


  checkDates() {
    if (this.exceptionForm.get('expiryDate').value && this.exceptionForm.get('affectFrom').value) {
      if (this.exceptionForm.get('expiryDate').value.getTime() < this.exceptionForm.get('affectFrom').value.getTime()) {
        this.exceptionForm.get('affectFrom').markAsTouched();
        this.exceptionForm.get('affectFrom').setErrors({
          'lessthan': 'Must be Previous than Expiry Date'
        });
      }
      else {
        this.exceptionForm.get('affectFrom').setErrors(null);

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

  changeValue(i, type = 'b') {
    if (type == 'b') {
      if (this.formArrControls(i).get('type').value == 'f') {
        this.formArrControls(i).get('value').setErrors(null);
        this.formArrControls(i).get('value').clearValidators();
        this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]);
        this.exceptionForm.updateValueAndValidity();
        this.items = this.exceptionForm.get('items') as FormArray;
        this.items.updateValueAndValidity();
      } else {

        this.formArrControls(i).get('value').setErrors(null);
        this.formArrControls(i).get('value').clearValidators();
        this.formArrControls(i).get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)]);
        this.exceptionForm.updateValueAndValidity();
        this.items = this.exceptionForm.get('items') as FormArray;
        this.items.updateValueAndValidity();

        if (+this.formArrControls(i).get('value').value > 100.00) {
          this.formArrControls(i).get('value').setErrors({ 'max': 'Max 100' });
        }

      }

    }
    else {

      if (this.exceptionForm.get('type').value == 'f') {
        this.exceptionForm.get('value').setErrors(null);
        this.exceptionForm.get('value').clearValidators();
        this.exceptionForm.get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)]);
        this.exceptionForm.updateValueAndValidity();
        this.items = this.exceptionForm.get('items') as FormArray;
        this.items.updateValueAndValidity();
      } else {

        this.exceptionForm.get('value').setErrors(null);
        this.exceptionForm.get('value').clearValidators();
        this.exceptionForm.get('value').setValidators([Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(100.00)]);
        this.exceptionForm.updateValueAndValidity();
        this.items = this.exceptionForm.get('items') as FormArray;
        this.items.updateValueAndValidity();

        if (+this.exceptionForm.get('value').value > 100.00) {
          this.exceptionForm.get('value').setErrors({ 'max': 'Max 100' });
        }


      }

    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductNupcListComponent, {
      width: '600px',
      data: {
        listType: 'single',
        // searchTerm: this.searchTerm,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.exceptionForm.get('productId').setValue(result['id'])
        this.searchTerm = result['productName'];
      }


    });
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  clearAllFormErrors(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.setErrors(null);
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  checkCustomValidation() {
    console.log(this.commissiontype);
    this.exceptionForm.get('productId').setErrors(null);
    this.exceptionForm.get('productNupc').setErrors(null);
    this.exceptionForm.get('value').setErrors(null);
    this.exceptionForm.get('type').setErrors(null);
    this.exceptionForm.get('marketplaceCategory').setErrors(null);
    this.exceptionForm.get('marketplaceBrands').setErrors(null);
    const items = this.exceptionForm.get('items') as FormArray;
    items.controls.forEach((element, i) => {
      this.formArrControls(i).get('sellingPriceFrom').setErrors(null);
      this.formArrControls(i).get('sellingPriceTo').setErrors(null);
      this.formArrControls(i).get('type').setErrors(null);
      this.formArrControls(i).get('value').setErrors(null);
    });

    if (this.commissiontype == 'p') {
      if (!this.exceptionForm.get('productNupc').value) {
        this.exceptionForm.get('productNupc').setErrors({
          'required': 'Required'
        })
      }
      if (!this.exceptionForm.get('value').value) {
        this.exceptionForm.get('value').setErrors({
          'required': 'Required'
        })
      }
      if (!this.exceptionForm.get('type').value) {
        this.exceptionForm.get('type').setErrors({
          'required': 'Required'
        })
      }

      this.getProductNupcDetail();

    }
    if (this.commissiontype == 'b') {
      // if (!this.exceptionForm.get('marketplaceCategory').value) {
      //   this.exceptionForm.get('marketplaceCategory').setErrors({
      //     'required': 'Required'
      //   })
      // }
      // if (!this.selectedItem) {
      //   this.exceptionForm.get('marketplaceCategory').setErrors({
      //     'required': 'Required'
      //   })
      // }
      if (!this.exceptionForm.get('marketplaceBrands').value) {
        this.exceptionForm.get('marketplaceBrands').setErrors({
          'required': 'Required'
        })
      }

      const items = this.exceptionForm.get('items') as FormArray;
      items.controls.forEach((element, i) => {
        if (!element.get('sellingPriceFrom').value) {
          this.formArrControls(i).get('sellingPriceFrom').setErrors({
            'required': 'Required'
          })
        }
        if (!element.get('sellingPriceTo').value) {
          this.formArrControls(i).get('sellingPriceTo').setErrors({
            'required': 'Required'
          })
        }
        if (!element.get('type').value) {
          this.formArrControls(i).get('type').setErrors({
            'required': 'Required'
          })
        }
        if (!element.get('value').value) {
          this.formArrControls(i).get('value').setErrors({
            'required': 'Required'
          })
        }
      });
    }

  }


  changeRadio() {
    console.log(this.commissiontype);
    if (this.commissiontype == 'b') {
      this.searchTerm = '';
      this.searchTermStatus = true;
      this.exceptionForm.get('productId').setValue(null);
      this.exceptionForm.get('productNupc').setValue(null);
      this.exceptionForm.get('value').setValue('');
      this.exceptionForm.get('type').setValue('p');
      this.exceptionForm.get('productNupc').disable();
      this.exceptionForm.get('value').disable();
      this.exceptionForm.get('type').disable();
      const formArr = this.exceptionForm.get('items') as FormArray;
      formArr.enable();
      this.exceptionForm.get('marketplaceCategory').enable();
      this.exceptionForm.get('marketplaceBrands').enable();
      this.treeStatus = false;
      this.productName = '';

    }
    else {
      const formArr = this.exceptionForm.get('items') as FormArray;
      formArr.reset();
      formArr.disable();
      this.exceptionForm.get('marketplaceCategory').disable();
      this.exceptionForm.get('marketplaceBrands').disable();
      this.treeStatus = true;
      this.exceptionForm.get('productNupc').enable();
      this.exceptionForm.get('value').enable();
      this.exceptionForm.get('type').enable();
      this.searchTermStatus = false;
    }

  }

  setFromControlDisabelEnable() {
    if (this.approveMode || this.commissiontype == 'p') {
      return true;
    } else {
      return false;
    }
  }

  getProductNupcDetail() {
    this.productName = '';
    if (this.exceptionForm.get('productNupc').value) {
      this.store.dispatch(new CheckProductNupc(this.exceptionForm.get('productNupc').value));
      this.store.pipe(select<any, any>('commissionsExceptions')).subscribe(res => {
        if (res['productNupcDetail']) {
          const productNupcDetail = res['productNupcDetail'];
          if (productNupcDetail[0]) {
            this.exceptionForm.get('productId').setValue(productNupcDetail[0]['id']);
            this.exceptionForm.get('productNupc').setErrors(null);
            this.productName = productNupcDetail[0]['marketplaceProductDetails'][0]['productName'];
            // this.exceptionForm.get('productId').setValue(productNupcDetail[0]['id']);
          } else {
            this.exceptionForm.get('productNupc').setErrors({
              'invalid': 'Invalid NUPC'
            });
            this.productName = '';
          }

        }

      });
    }

  }


}