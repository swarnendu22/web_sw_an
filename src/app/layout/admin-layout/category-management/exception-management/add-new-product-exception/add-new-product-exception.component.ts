import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '../../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { GetSellers } from '../../../../../actions/seller-management.action';
import { GetCommisioneGroup, GetProducts, PostSaveProductException, ApproveRejectProductException, ActionTypes } from '../../../../../actions/commission-exception-management.action';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import qs from 'qs';

@Component({
  selector: 'app-add-new-product-exception',
  templateUrl: './add-new-product-exception.component.html',
  styleUrls: ['./add-new-product-exception.component.css']
})
export class AddNewProductExceptionComponent implements OnInit {
  requestId = null;
  approveObj = null;
  approveMode = null;
  sellers = null;
  comssionGroups = null;
  products = null;
  productDropdown = [];
  productExceptionForm: FormGroup;
  formValues = [];
  sellName = '';
  productName = '';
  groupName = '';
  minDate = new Date();
  maxDate = new Date();

  public sellerFilterCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  public groupFilterCtrl: FormControl = new FormControl();


  constructor(private fb: FormBuilder, private store: Store<categoryState>, private apiMessageService: ApiMessageService,
    private router: Router, private activatedRoute: ActivatedRoute, ) {

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
  }



  changeStartDate() {

    this.maxDate = new Date();
    this.maxDate.setDate(this.productExceptionForm.get('affectFrom').value.getDate() + 1);

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
    this.getApproveRequest();


  }


  getApproveRequest() {

    this.approveObj = qs.parse(this.activatedRoute.snapshot.queryParams.approveObj);
    console.log('Deatil', this.approveObj);
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      this.requestId = this.approveObj.apiObj.requestId;
      if (this.approveMode) {
        Object.keys(this.approveObj.requestObj).forEach((field) => {


          const value = isNaN(this.approveObj.requestObj[field]) ? this.approveObj.requestObj[field] : +this.approveObj.requestObj[field];
          if (this.productExceptionForm.get(field)) {
            this.productExceptionForm.get(field).setValue(value);
            this.productExceptionForm.get('affectFrom').setValue(new Date(this.approveObj.requestObj['affectFrom']));
            this.productExceptionForm.get('expiryDate').setValue(new Date(this.approveObj.requestObj['expiryDate']));




            this.productExceptionForm.get('addLogistic').setValue(this.approveObj.requestObj.addLogistic === 'true');
            this.productExceptionForm.get('addPaymentHandling').setValue(this.approveObj.requestObj.addPaymentHandling === 'true');
            this.productExceptionForm.get('addClosingFee').setValue(this.approveObj.requestObj.addClosingFee === 'true');
            this.productExceptionForm.get('addFullfillmentFee').setValue(this.approveObj.requestObj.addFullfillmentFee === 'true');
          }
        });
        this.productExceptionForm.disable();
      }
    }
  }


  onSubmit() {


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
      groupId: this.f.groupId.value,
      groupName: this.groupName,
      productId: this.f.productId.value,
      productName: this.productName,
      sellerId: this.f.sellerId.value,
      sellerName: this.sellName,

      type: this.f.type.value,
      value: this.f.value.value,
    }



    console.log(fvalues);


    this.store.dispatch(new PostSaveProductException(fvalues));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.postSaveProductException) {
        this.router.navigate(['/category/exception/commission-exception']);
      } else if (res && response.type == ActionTypes.postNewProductException) {
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

}
