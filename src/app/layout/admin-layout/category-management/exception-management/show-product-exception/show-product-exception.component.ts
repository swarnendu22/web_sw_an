import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '../../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { GetSellers } from '../../../../../actions/seller-management.action';
import { GetCommisioneGroup, GetProducts, PostSaveProductException, GetProductExceptionDetail, UpdateSaveProductException, ApproveRejectProductException, ActionTypes } from '../../../../../actions/commission-exception-management.action';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { ActivatedRoute, Router } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import qs from 'qs';


@Component({
  selector: 'app-show-product-exception',
  templateUrl: './show-product-exception.component.html',
  styleUrls: ['./show-product-exception.component.css']
})
export class ShowProductExceptionComponent implements OnInit {
  requestId = null;
  approveMode = false;
  requestObj = null;
  approveObj = null;
  sellers = null;
  comssionGroups = null;
  products = null;
  productDropdown = [];
  productExceptionForm: FormGroup;
  formValues = [];
  sellName = '';
  productName = '';
  groupName = '';
  id = null;

  minDate = new Date();
  maxDate = new Date();
  // detailsList = {
  //   commissionType: null,
  //   merchantGroup: null,
  //   buisnessCategory: null,
  //   regionsList: null,
  //   paymentMethods: null,
  //   fullfillmentMode: null
  // };


  productExceptionDetails = null;
  public sellerFilterCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public groupFilterCtrl: FormControl = new FormControl();

  constructor(private fb: FormBuilder, private store: Store<categoryState>,
    private route: ActivatedRoute, private apiMessageService: ApiMessageService,
    private router: Router) {

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
    if (!this.products) {
      this.store.dispatch(new GetProducts())

    }
    this.store.pipe(select<any, any>('productExceptions')).subscribe(res => {

      this.products = res['productList'];
      this.getProductlist();

    });

    this.id = this.route.snapshot.params.id
    if (this.id) {
      this.store.dispatch(new GetProductExceptionDetail(this.id));

    }

  }

  ngOnInit() {

    this.productExceptionForm = this.fb.group({
      exceptionName: [null, Validators.required],
      groupId: [null, Validators.required],
      sellerId: [null, Validators.required],
      productId: [null, Validators.required],
      affectFrom: ['', Validators.required],
      expiryDate: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required],
      addLogistic: [false],
      addPaymentHandling: [false],
      addClosingFee: [false],
      addFullfillmentFee: [false],


    });




    this.store.pipe(select<any, any>('productExceptions')).subscribe(res => {
      this.productExceptionDetails = res['productExceptionDetails'];

      if (this.productExceptionDetails) {

        this.productExceptionForm.get('affectFrom').setValue(this.productExceptionDetails[0] ? new Date(this.productExceptionDetails[0]['affectFrom']) : '');
        this.productExceptionForm.get('expiryDate').setValue(this.productExceptionDetails[0] ? new Date(this.productExceptionDetails[0]['expiryDate']) : '');
        this.productExceptionForm.get('value').setValue(Number(this.productExceptionDetails[0]['value']).toFixed(2));
        this.productExceptionForm.get('type').setValue(this.productExceptionDetails[0]['type']);
        this.productExceptionForm.get('addLogistic').setValue(JSON.parse(this.productExceptionDetails[0]['addLogistic']));
        this.productExceptionForm.get('addPaymentHandling').setValue(JSON.parse(this.productExceptionDetails[0]['addPaymentHandling']));
        this.productExceptionForm.get('addClosingFee').setValue(JSON.parse(this.productExceptionDetails[0]['addClosingFee']));
        this.productExceptionForm.get('addFullfillmentFee').setValue(JSON.parse(this.productExceptionDetails[0]['addFullfillmentFee']));
        this.productExceptionForm.get('productId').setValue(parseInt(this.productExceptionDetails[0]['productId']));
        this.productExceptionForm.get('sellerId').setValue(parseInt(this.productExceptionDetails[0]['sellerId']));
        this.productExceptionForm.get('groupId').setValue(parseInt(this.productExceptionDetails[0]['groupId']));
        this.productExceptionForm.get('exceptionName').setValue(this.productExceptionDetails[0]['exceptionName']);

      }

      console.log('Detail', this.productExceptionForm.value);
    });
    this.getApproveRequest();
    this.productExceptionForm.disable();

  }

  getApproveRequest() {
    this.approveObj = qs.parse(this.route.snapshot.queryParams.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      if (this.approveMode) {
        this.requestObj = this.approveObj.requestObj;
        this.requestId = this.approveObj.apiObj.requestId;


      }
      console.log('Request Obj', this.requestObj);
    }
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
    if (dropDownType == 'productDropdown') {
      if (this.productDropdown) {

        const obj = this.productDropdown.find(i => i[lookForParam] == id);

        if (obj) {
          return obj[returnParam];
        } else {
          return '';
        }
      }
    }
    if (dropDownType == 'comssionGroups') {
      if (this.comssionGroups) {

        const obj = this.comssionGroups.find(i => i[lookForParam] == id);

        if (obj) {
          return obj[returnParam];
        } else {
          return '';
        }
      }
    }
    else {
      return '';
    }
  }

  get f() {
    return this.productExceptionForm.controls;
  }

  getProductlist() {
    if (this.products != null) {
      this.products.map((value) => {
        let obj = {
          id: value.marketplaceProductDetails[0].id,
          productName: value.marketplaceProductDetails[0].productName,
        }
        this.productDropdown.push(obj);

      });
    }

  }
  changeStartDate() {

    this.maxDate = new Date();
    this.maxDate.setDate(this.productExceptionForm.get('affectFrom').value.getDate() + 1);

  }


  onSubmit() {
    console.log(this.productExceptionDetails[0].id)

    this.sellers.map((value, i) => {
      if (value.id == this.f.sellerId.value) {
        this.sellName = value.displayName;
      }
    });
    this.productDropdown.map((value, i) => {
      if (value.id == this.f.productId.value) {
        this.productName = value.productName;
      }
    });
    this.comssionGroups.map((value, i) => {
      if (value.id == this.f.groupId.value) {
        this.groupName = value.groupName;
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
      groupId: this.f.groupId.value,
      groupName: this.groupName,
      productId: this.f.productId.value,
      productName: this.productName,
      sellerId: this.f.sellerId.value,
      sellerName: this.sellName,

      type: this.f.type.value,
      value: this.f.value.value,
      exceptionName: this.f.exceptionName.value,
      exceptionId: this.productExceptionDetails[0]['exceptionId'],
    }



    console.log(fvalues);


    this.store.dispatch(new UpdateSaveProductException(fvalues, this.id));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      console.log(res);
      if (res && response.type == ActionTypes.updateSaveProductException) {
        this.router.navigate(['/category/exception/commission-exception']);
      } else if (res && response.type == ActionTypes.updateNewProductException) {
        this.router.navigate(['/category/exception/commission-exception']);
      } else if (res && response.type == ActionTypes.updateCommissionGroup) {
        this.router.navigate(['/category/exception/commission-exception']);
      } else if (res && response.type == ActionTypes.updateCommissionGroupTree) {
        this.router.navigate(['/category/exception/commission-exception']);
      }
    })
    this.productExceptionForm.reset();
  }

  requestProcess(type) {
    this.approveObj.apiObj.approveStatus = type;
    this.store.dispatch(new ApproveRejectProductException(this.approveObj.apiObj, this.requestId));
    this.router.navigate(['/category/exception/commission-exception']);

  }


  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();


    } else {
      formStats.disable();


    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }

  parseFloat(str) {
    return Number(str).toFixed(2)
  }

}
