import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '../../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { GetCategory, GetParentCategory, } from '../../../../../actions/storeManagement.action';
import { GetActiveBrands, } from '../../../../../actions/brand-management.actions';
import { GetSellers } from '../../../../../actions/seller-management.action';
import { GetCommisioneGroup, GetCommsionExceptionDetails, ResetCommissionExceptionDetails, UpdateNewProductException, ApproveRejectException, ActionTypes, ApproveRejectProductException, GetProductExceptionDetail, UpdateSaveProductException, UpdateCommissionException, CheckProductNupc } from '../../../../../actions/commission-exception-management.action';
import { ActivatedRoute, Router } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import qs from 'qs';
import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';
import { ProductNupcListComponent } from '../product-nupc-list/product-nupc-list.component';
const _ = require('lodash');

@Component({
  selector: 'app-show-commission-exception',
  templateUrl: './show-commission-exception.component.html',
  styleUrls: ['./show-commission-exception.component.css']
})
export class ShowCommissionExceptionComponent implements OnInit, OnDestroy {
  requestedCategoryData = [];
  approveselectedIds = [];
  requestId = null;
  approveMode = false;
  requestObj = null;
  approveObj = null;
  selectedValue = [];
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
  categories = [];
  brands = null;
  sellers = null;
  comssionGroups = null;
  id = null;
  sellerid = null;
  sellName = '';
  productExceptionDetails = null;
  selectedOption = [];
  searchTermStatus = false;
  treeStatus = false;

  formValues = [];

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
  categoryItems = [];
  selectedItem: any = null;
  searchTerm = '';
  productName = '';

  constructor(private fb: FormBuilder, private store: Store<categoryState>,
    private route: ActivatedRoute, private apiMessageService: ApiMessageService,
    private router: Router, public dialog: MatDialog, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
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




    this.store.dispatch(new GetCategory('false'));

    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['categories']) {
        this.categories = res['categories'];
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


    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    this.approveMode = this.approveObj.approveMode;
    this.commissiontype = this.approveObj.exceptiontype;
    console.log(this.approveObj)
    this.id = this.route.snapshot.params.id
    if (this.id) {
      if (this.commissiontype == 'b') {
        this.store.dispatch(new GetCommsionExceptionDetails(this.id));

      } else {
        this.store.dispatch(new GetProductExceptionDetail(this.id));

      }

    }

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
    this.getApproveRequest();


    if (this.commissiontype == 'b') {
      this.store.pipe(select<any, any>('commissionsExceptions')).subscribe(res => {
        this.productExceptionDetails = res['exceptionDetails'];
        console.log('Detail', this.productExceptionDetails);
        console.log(this.commissiontype);
        if (this.productExceptionDetails) {
          this.getBrandlevelRequest();
          this.exceptionForm.disable();
        }
      });
    } else {
      this.store.pipe(select<any, any>('productExceptions')).subscribe(res => {
        this.productExceptionDetails = res['productExceptionDetails'];
        console.log('Detail', this.productExceptionDetails);
        console.log(this.commissiontype);
        if (this.productExceptionDetails) {
          this.getProductLevelRequest();
          this.exceptionForm.disable();
        }
      });
    }

    // this.changeRadio();



  }

  getProductLevelRequest() {

    if (this.approveMode) {
      this.exceptionForm.get('affectFrom').setValue(this.requestObj['affectFrom'] ? new Date(this.requestObj['affectFrom']) : '');
      this.exceptionForm.get('expiryDate').setValue(this.requestObj['expiryDate'] ? new Date(this.requestObj['expiryDate']) : '');
      this.exceptionForm.get('marketplaceCommissionGroup').setValue(this.requestObj['groupId'] ? parseInt(this.requestObj['groupId']) : '');
      this.exceptionForm.get('type').setValue(this.requestObj['type']);
      this.exceptionForm.get('value').setValue(parseFloat(this.requestObj['value']).toFixed(2));
      this.exceptionForm.get('sellers').setValue(this.requestObj['sellerId'] ? parseInt(this.requestObj['sellerId']) : '');
      this.exceptionForm.get('exceptionName').setValue(this.requestObj['exceptionName']);
      this.exceptionForm.get('productId').setValue(this.requestObj['productId']);
      this.exceptionForm.get('productNupc').setValue(this.requestObj['productNupc']);
      this.exceptionForm.get('addLogistic').setValue(this.requestObj.addLogistic === 'true');
      this.exceptionForm.get('addPaymentHandling').setValue(this.requestObj.addPaymentHandling === 'true');
      this.exceptionForm.get('addClosingFee').setValue(this.requestObj.addClosingFee === 'true');
      this.exceptionForm.get('addFullfillmentFee').setValue(this.requestObj.addFullfillmentFee === 'true');
      this.searchTerm = this.requestObj['productName'];
      this.getProductNupcDetail();
    } else {
      this.exceptionForm.get('affectFrom').setValue(new Date(this.productExceptionDetails[0]['affectFrom']));
      this.exceptionForm.get('expiryDate').setValue(new Date(this.productExceptionDetails[0]['expiryDate']));
      this.exceptionForm.get('marketplaceCommissionGroup').setValue(this.productExceptionDetails[0]['groupId'] ? parseInt(this.productExceptionDetails[0]['groupId']) : '');
      this.exceptionForm.get('type').setValue(this.productExceptionDetails[0]['type']);
      this.exceptionForm.get('value').setValue(this.productExceptionDetails[0]['value']);
      this.exceptionForm.get('sellers').setValue(this.productExceptionDetails[0]['sellerId'] ? parseInt(this.productExceptionDetails[0]['sellerId']) : '');
      this.exceptionForm.get('exceptionName').setValue(this.productExceptionDetails[0]['exceptionName']);
      this.exceptionForm.get('productId').setValue(this.productExceptionDetails[0]['productId']);
      this.exceptionForm.get('productNupc').setValue(this.productExceptionDetails[0]['productNupc']);
      this.exceptionForm.get('addLogistic').setValue(this.productExceptionDetails[0].addLogistic === 'true');
      this.exceptionForm.get('addPaymentHandling').setValue(this.productExceptionDetails[0].addPaymentHandling === 'true');
      this.exceptionForm.get('addClosingFee').setValue(this.productExceptionDetails[0].addClosingFee === 'true');
      this.exceptionForm.get('addFullfillmentFee').setValue(this.productExceptionDetails[0].addFullfillmentFee === 'true');
      this.searchTerm = this.productExceptionDetails[0]['productName'];
      this.getProductNupcDetail();
    }



  }

  getBrandlevelRequest() {


    if (this.approveMode) {
      this.exceptionForm.get('affectFrom').setValue(this.requestObj[0]['affectFrom'] ? new Date(this.requestObj[0]['affectFrom']) : '');
      this.exceptionForm.get('expiryDate').setValue(this.requestObj[0]['expiryDate'] ? new Date(this.requestObj[0]['expiryDate']) : '');
      this.exceptionForm.get('marketplaceCommissionGroup').setValue(parseInt(this.requestObj[0]['marketplaceCommissionGroup']['id'] ? this.requestObj[0]['marketplaceCommissionGroup']['id'] : ''));
      this.exceptionForm.get('marketplaceCategory').setValue(this.requestObj['marketplaceCategory'] ? this.requestObj['marketplaceCategory']['id'] : null);
      this.exceptionForm.get('sellers').setValue(this.requestObj[0]['sellerId'] ? parseInt(this.requestObj[0]['sellerId']) : '');
      this.exceptionForm.get('marketplaceBrands').setValue(parseInt(this.requestObj[0]['marketplaceBrands']['id']));
      this.exceptionForm.get('addLogistic').setValue(this.requestObj[0]['addLogistic'] == 'true');
      this.exceptionForm.get('addPaymentHandling').setValue(this.requestObj[0]['addPaymentHandling'] == 'true');
      this.exceptionForm.get('addClosingFee').setValue(this.requestObj[0]['addClosingFee'] == 'true');
      this.exceptionForm.get('addFullfillmentFee').setValue(this.requestObj[0]['addFullfillmentFee'] == 'true');
      this.exceptionForm.get('exceptionName').setValue(this.requestObj[0]['exceptionName']);
      this.selectedItem = this.requestObj[0]['marketplaceCategory'];

    } else {
      this.exceptionForm.get('affectFrom').setValue(this.productExceptionDetails[0]['affectFrom'] ? new Date(this.productExceptionDetails[0]['affectFrom']) : '');
      this.exceptionForm.get('expiryDate').setValue(this.productExceptionDetails[0]['expiryDate'] ? new Date(this.productExceptionDetails[0]['expiryDate']) : '');
      this.exceptionForm.get('marketplaceCommissionGroup').setValue(this.productExceptionDetails[0]['marketplaceCommissionGroup']['id'] ? this.productExceptionDetails[0]['marketplaceCommissionGroup']['id'] : '');
      this.exceptionForm.get('marketplaceCategory').setValue(this.productExceptionDetails[0]['marketplaceCategory'] ? this.productExceptionDetails[0]['marketplaceCategory']['id'] : null);
      this.exceptionForm.get('sellers').setValue(this.productExceptionDetails[0]['sellers'] ? this.productExceptionDetails[0]['sellers']['id'] : '');
      this.exceptionForm.get('marketplaceBrands').setValue(parseInt(this.productExceptionDetails[0]['marketplaceBrands']['id']));
      this.exceptionForm.get('addLogistic').setValue(this.productExceptionDetails[0]['addLogistic']);
      this.exceptionForm.get('addPaymentHandling').setValue(this.productExceptionDetails[0]['addPaymentHandling']);
      this.exceptionForm.get('addClosingFee').setValue(this.productExceptionDetails[0]['addClosingFee']);
      this.exceptionForm.get('addFullfillmentFee').setValue(this.productExceptionDetails[0]['addFullfillmentFee']);
      this.exceptionForm.get('exceptionName').setValue(this.productExceptionDetails[0]['exceptionName']);
      this.selectedItem = this.productExceptionDetails[0]['marketplaceCategory'];
    }
    this.items = null;
    this.setFormArrayItems();

  }


  setFormArrayItems() {
    this.items = null;
    this.items = this.exceptionForm.get('items') as FormArray;


    if (this.approveMode) {
      this.requestObj.forEach(element => {
        this.items.push(
          this.fb.group({
            'sellingPriceFrom': [parseFloat(element.sellingPriceFrom).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'sellingPriceTo': [parseFloat(element.sellingPriceTo).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'type': [element.type, Validators.required],
            'value': [parseFloat(element.value).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'id': [''],
          })
        );
      });
    } else {
      this.productExceptionDetails.forEach(element => {

        this.items.push(

          this.fb.group({
            'sellingPriceFrom': [element.sellingPriceFrom.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'sellingPriceTo': [element.sellingPriceTo.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'type': [element.type, Validators.required],
            'value': [element.value.toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
            'id': [element.id],
          })
        );
      });
    }
    // if (this.requestObj && (this.requestObj.length > this.productExceptionDetails.length)) {
    //   let requiredLength = this.requestObj.length - this.productExceptionDetails.length;

    //   let newArr = this.requestObj.slice(-requiredLength);
    //   console.log(newArr);
    //   newArr.forEach(element => {
    //     this.items.push(

    //       this.fb.group({
    //         'sellingPriceFrom': [parseInt(element.sellingPriceFrom).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)],],
    //         'sellingPriceTo': [parseInt(element.sellingPriceTo).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)],],
    //         'type': [element.type, Validators.required],
    //         'value': [parseInt(element.value).toFixed(2), [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/)],],
    //         'id': [''],
    //       })
    //     );
    //   });
    // }

  }

  getApproveRequest() {
    this.approveObj = qs.parse(this.route.snapshot.queryParams.approveObj);
    console.log('Request', this.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      if (this.approveMode) {
        this.requestObj = this.approveObj.requestObj;
        this.requestId = this.approveObj.apiObj.requestId;
        // this.approveselectedIds = [this.requestObj[0].marketplaceCategory['id']];


      }
      // console.log('approveselectedIds', this.approveselectedIds);
      // console.log('requestObj', this.requestObj);
    }
  }

  categoryRequestedData(event) {
    this.requestedCategoryData = event;
    console.log(this.requestedCategoryData);
    // this.checkForCategoryRequestChange();
  }
  checkForCategoryRequestChange() {
    let message = this.requestedCategoryData ? 'Requested Change: ' : '';
    this.requestedCategoryData.forEach(item => {
      message = message.concat(`${item.name} | `);
    });
    return message;
  }
  getValueForDropDownInApprove(dropDownType, id, returnParam, lookForParam) {

    if (dropDownType == 'sellers') {
      if (this.sellers) {

        const obj = this.sellers.find(i => i[lookForParam] == id);

        if (obj) {
          return obj[returnParam];
        } else {
          return '';
        }
      }
    }
    if (dropDownType == 'brands') {
      if (this.brands) {

        const obj = this.brands.find(i => i[lookForParam] == id);
        if (obj) {
          return obj[returnParam];
        } else {
          return '';
        }
      }
    }
    if (dropDownType == 'categories') {
      if (this.categories) {

        const rootElement = _.get(this.categories, '[0]', []);

        let obj = this.checkRecursiveCategory(rootElement, id);


        if (obj) {
          return obj;
        } else {
          return '';
        }
      }
    }
    if (dropDownType == 'comssionGroups') {
      if (this.comssionGroups) {

        const findex = _.findIndex(this.comssionGroups, i => i[lookForParam] == id);
        // const obj = this.comssionGroups.find(i => i[lookForParam] == id);

        if (findex > -1) {
          return this.comssionGroups[findex][returnParam];
        } else {
          return '';
        }
      }
    }
    else {
      return '';
    }
  }


  checkRecursiveCategory = (element, itemId) => {


    const elementId = _.get(element, 'id', null);
    const elementName = _.get(element, 'name', null);
    let result = null;

    // Base Condition
    if (elementId !== null && elementId == itemId) {
      return elementName;
    } else {
      const childList = _.get(element, 'childList', []);

      for (let i = 0; i < childList.length; i++) {
        result = this.checkRecursiveCategory(childList[i], itemId);

        if (result !== null) {
          return result;
        }
      }

      return null;
    }

  }


  createItem() {
    return this.fb.group({
      'sellingPriceFrom': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
      'sellingPriceTo': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
      'type': ['p', Validators.required],
      'value': [null, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{2})?$/), Validators.max(99999999.99)],],
      'id': [null],
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

    // console.log(value);
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
        id: control.get('id').value,
        exceptionId: this.productExceptionDetails[0].exceptionId,
      }
      this.formValues.push(fvalues);
    });

    console.log(this.formValues);


    // this.store.dispatch(new UpdateNewProductException(this.formValues, this.id));
    this.store.dispatch(new UpdateCommissionException(this.formValues, this.id, 'BRAND'));

    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      console.log(res);
      if (res && response.type == ActionTypes.updateCommissionException) {
        this.router.navigate(['/category/exception/commission-exception']);
      }
    })


  }


  onProductLevelSubmit() {

    this.sellers.map((value, i) => {
      if (value.id == this.f.sellers.value) {
        this.sellName = value.displayName;
      }
    });

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

    let fvalues = {
      id: this.productExceptionDetails[0].id,
      code: null,
      parentId: null,
      addLogistic: this.f.addLogistic.value,
      addPaymentHandling: this.f.addPaymentHandling.value,
      addClosingFee: this.f.addClosingFee.value,
      addFullfillmentFee: this.f.addFullfillmentFee.value,
      affectFrom: new Date(this.f.affectFrom.value),
      expiryDate: new Date(this.f.expiryDate.value),
      groupId: this.f.marketplaceCommissionGroup.value ? this.f.marketplaceCommissionGroup.value : null,
      groupName: marketplaceCommissionGroup.groupName,
      productId: this.f.productId.value,
      productNupc: this.f.productNupc.value,
      productName: this.searchTerm,
      sellerId: this.f.sellers.value ? this.f.sellers.value : null,
      sellerName: this.sellName,
      type: this.f.type.value,
      value: this.f.value.value,
      exceptionName: this.f.exceptionName.value,
      exceptionId: this.productExceptionDetails[0]['exceptionId'],
    }



    console.log(fvalues);


    this.store.dispatch(new UpdateCommissionException(fvalues, this.id, 'PRODUCT'));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      console.log(res);
      if (res && response.type == ActionTypes.updateCommissionException) {
        this.router.navigate(['/category/exception/commission-exception']);
      }
    })
  }

  ngAfterViewInit() {


  }

  ngOnDestroy() {

    this.store.dispatch(new ResetCommissionExceptionDetails());

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



  toggleFormDisable(formName) {
    // this.changeRadio();
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();


    } else {
      formStats.disable();


    }

    // this.changeRadio();

  }
  getFormDisableStats(formName) {
    if (this[formName]) {
      return this[formName].disabled;

    }
  }


  parseFloat(str) {
    return Number(str).toFixed(2)
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
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

  compareActualAndrequestDate(requestDate, actualDate) {
    // console.log(requestDate, actualDate);
    let rDate = new Date(requestDate);
    let aDate = new Date(actualDate);
    if (rDate.getTime() != aDate.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  getProductChangeRequest(field) {

    if (this.requestObj) {
      let existingValue = this.exceptionForm.get(field).value;
      let incomingValue = this.requestObj[field];
      console.log(existingValue, '--', incomingValue);

    }


  }

  getProductNupcDetail() {
    if (this.exceptionForm.get('productNupc').value) {
      this.store.dispatch(new CheckProductNupc(this.exceptionForm.get('productNupc').value));
      this.store.pipe(select<any, any>('commissionsExceptions')).subscribe(res => {
        if (res['productNupcDetail']) {
          const productNupcDetail = res['productNupcDetail'];
          if (productNupcDetail[0]) {
            this.productName = productNupcDetail[0]['marketplaceProductDetails'][0]['productName'];
          }
        }

      });
    }

  }

  checkNumbers(requestValue, oldValue) {
    if (parseFloat(requestValue).toFixed(2) == parseFloat(oldValue).toFixed(2)) {
      return true;
    }
    else {
      return false;
    }

  }
}
