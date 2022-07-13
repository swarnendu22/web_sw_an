import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  DispatchBulkAction,
  PostAddNewMerchant,
  ApproveRejectSellerRequest,
  ActionTypes
} from 'src/app/actions/merchant-management.actions';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import qs from 'qs';
import { Subscription, Observer, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/utils/request/request.service';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-merchant',
  templateUrl: './create-new-merchant.component.html',
  styleUrls: ['./create-new-merchant.component.css'],
})
export class CreateNewMerchantComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  basicDetailsForm: FormGroup;
  
  detailsList = {
    commissionType: null,
    merchantGroup: null,
    buisnessCategory: null,
    regionsList: null,
    paymentMethods: null,
    fullfillmentMode: null,
  };
  selectedItem: any = null;
  categories = null;
  editableMerchantId = null;
  approveObj = null;
  approveMode = null;
  selectedOption = [];
  merchantEmailAvaibilityText = '';
  apiMsgServiceSubscription: Subscription;
  submitted = false;
  resetSelection = false;
  formDirective: FormGroupDirective;

  public AllowParentSelection = false;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;
  items = [];
  selectedCategoryList = [];
 

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private apiMsgService: ApiMessageService,
    private location: Location,
    private requestService: RequestService,
    private toaster: ToastrService
  ) {
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(arg => this.getDetailsFromStore(arg));

    this.store.dispatch(new GetAllCategory());

    this.apiMsgServiceSubscription = this.apiMsgService.currentApiStatus.subscribe(
      res => {
        if (res.type === 'EDIT TYPE SELLER REQUEST APPROVALREJCT') {
          if (res.status) {
            this.location.back();
          }
        } else if (res.type === ActionTypes.postAddNewMerchant) {
          if (res.status) {
            this.submitted = false;
            this.resetSelection = false;
            this.merchantEmailAvaibilityText = '';
            this.formDirective.resetForm();
            this.basicDetailsForm.reset();
          }
        }
      }
    );
    this.setUpInitialForm();
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

  // getMoreInformations(): string {
  //  return 'This is required Field \n ok FINE';
  // }

  ngOnInit() {
    this.store.pipe(select('manageCategories')).subscribe(res => {
      if (res.categories) {
        this.categories = res.allcategories;
        this.items = this.process(this.categories);
      }
    });
    this.store.dispatch(new DispatchBulkAction());
    this.store.dispatch(new GetAllCategory());
    this.setDefaultFormValue();
    this.getApproveRequest();
  }

  setDefaultFormValue(){
    this.basicDetailsForm.get('geoLat').setValue('22.573705');
    this.basicDetailsForm.get('geoLong').setValue('88.437596');
  }

  ngAfterViewChecked() {
    if (this.approveMode) {
      document
        .querySelectorAll('.btn-sm-upload')
        .forEach((ite: any) => (ite.style.display = 'none'));
    }
  }
  ngOnDestroy() {
    this.apiMsgServiceSubscription.unsubscribe();
  }
  getApproveRequest() {
    this.approveObj = qs.parse(
      this.activatedRoute.snapshot.queryParams.approveObj
    );
    if (this.approveObj) {
      this.approveMode = this.approveObj.approveMode;
      if (this.approveMode) {
        Object.keys(this.approveObj.requestObj).forEach(field => {
          const value = isNaN(this.approveObj.requestObj[field])
            ? this.approveObj.requestObj[field]
            : +this.approveObj.requestObj[field];
          if (this.basicDetailsForm.get(field)) {
            // this.basicDetailsForm.get(field).setValue(value);
            this.basicDetailsForm.get(field).setValue(this.approveObj.requestObj[field]);
            if (field == 'marketplaceCategoryList') {
              //this.selectedOption = this.approveObj.requestObj[field];
               this.selectedCategoryList = this.approveObj.requestObj[field];
            } else if (field == 'businessCategoryId') {
              this.basicDetailsForm.get('businessCategoryId').patchValue(parseInt(this.approveObj.requestObj[field]));
            }  else if (field == 'regionCode') {
              this.basicDetailsForm.get('regionCode').patchValue(parseInt(this.approveObj.requestObj[field]));
            }
          }
        });
        this.basicDetailsForm.disable();
      }
    }
  }
  goBack() {
    this.location.back();
  }
  getDetailsFromStore(arg) {
    Object.assign(this.detailsList, arg);
  }
  onFileUpload(event, type) {
    let url = event.Location;
    if (url.length > 0) {
      var extension = url.split('.');
      if (extension && (extension.includes("jpeg") || extension.includes("jpg") || extension.includes("png") || extension.includes("pdf"))) {
        this.basicDetailsForm.get(type).setValue(event.Location);
      } else {
        this.toaster.warning('Please insert a proper image file, JPEG,PNG or PDF only.')
      }
    } else {

    }
  }
  categorySelectionValue(event) {
    const value = event.map(i => i.item.id);
    this.basicDetailsForm.get('marketplaceCategoryList').setValue(value);
  }
  requestProcess(type) {
    this.approveObj.apiObj.approveStatus = type;
    this.store.dispatch(
      new ApproveRejectSellerRequest({
        type: 'ADD',
        data: this.approveObj.apiObj,
      })
    );
  }
  
/*
  async checkAvailabilityService(keyword) {
    const payload = { email: keyword.toString() };
    return this.apiMsgService
      .checkAvailability(
        payload
      )
  }

  async checkAvailability() {
    const keyWord = this.basicDetailsForm.get('storeEmail').value;
    if(!keyWord && keyWord!==''){
    const checkStatusRes: Observable<any> = await this.checkAvailabilityService(keyWord);
    return checkStatusRes.pipe(map(res =>
      res.message.toLowerCase() == 'no' ? true : false
    ));
    }
  }


  async checkAvaibilityOnClick() {
    if (this.basicDetailsForm.get('storeEmail').valid) {
      this.merchantEmailAvaibilityText = '';
      const res = await this.checkAvailability();
      res.subscribe(dt => {
        this.merchantEmailAvaibilityText = dt ? 'Email is Available' : 'Email Already Taken';
      });
    } else {
      this.merchantEmailAvaibilityText = 'Enter a valid email';
    }
  }
*/
  assignToLegalName(event) {
    const value = event.target.value;
    this.basicDetailsForm.get('legalName').setValue(value.trim());
  }

  async onSubmit(formDirective: FormGroupDirective) {
    this.formDirective = formDirective;
    this.basicDetailsForm.get('countryCode').setValue("IN");  
    const regionId = this.basicDetailsForm.get('regionCode').value;
    const region = this.detailsList.regionsList.payload.find(
      i => i.id === regionId
    );
    if (region) {    
      this.basicDetailsForm.get('regionName').setValue(region.name);
    }

    /*
    if(this.selectedCategoryList && this.selectedCategoryList.length>0){
        this.basicDetailsForm.get('marketplaceCategoryList').setValue(this.selectedCategoryList);      
    }else{
      this.basicDetailsForm.get('marketplaceCategoryList').setValue(null); 
      this.toaster.error('Plese select product category');
      this.basicDetailsForm.controls['marketplaceCategoryList'].setErrors({'incorrect': true});
    }
    */

    this.submitted = true;
    if (this.basicDetailsForm.valid ) {
      console.log(this.basicDetailsForm.value);

      this.store.dispatch(new PostAddNewMerchant(this.basicDetailsForm.value));
      this.resetSelection = true;

     /*
      const res = await this.checkAvailability();
      res.subscribe(dt => {
        if (dt) {
          this.store.dispatch(new PostAddNewMerchant(this.basicDetailsForm.value));
          this.resetSelection = true;
        } else {
          alert('Email Already Taken');
        }
      });
     */
    }
  }

  get f() {
    return this.basicDetailsForm.controls;
  }
  
  setUpInitialForm() {
    this.basicDetailsForm = this.fb.group({
      storeName: ['', Validators.required],
      legalName: ['', Validators.required],
      contactNumber: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/),Validators.maxLength(10)]],
      supportNumber: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/),Validators.maxLength(10)]],
      homedelivery:[],
      geoLat:[],
      geoLong:[],
      zoneId:[],
      isActive:[],
      storeOperation:[],
      storeid:[],
      countryCode:[],
      address: ['', ],
      landmark: '',
      zipCode: ['', [Validators.pattern(/^[0-9]{6}$/)]],
      city: [],
      regionCode: [],
      regionName: [''],
      businessCategoryId: [],
      storeLogoUrl: ['']
    });
  }

  checkExtension(file) {
    return file.split('.').pop();
  }

  /*
  onSelectedChange(e){
    if(this.selectedItem){

      let findIndex = this.selectedCategoryList.findIndex( (category) => category.id === this.selectedItem.id );
      if(findIndex === -1){
        if(this.selectedItem.path){
          this.selectedItem.path = this.selectedItem.path.replace(/[/]/g, ' >> ');
        }

        if(this.selectedItem.products){
          this.selectedCategoryList.push(this.selectedItem);
        }else{
          this.toaster.error('Products not found for this category');
        }
      }else{
        this.toaster.info('Category is already present');
      }
    }
  }

  deleteSelectedCategory(selectedCategory){

     if(selectedCategory && !this.approveMode){
        let findIndex = this.selectedCategoryList.findIndex( (category) => category.id === selectedCategory.id );
        if(findIndex !== -1){
          this.selectedCategoryList.splice(findIndex,1);
        }
      }else{
         this.toaster.error('Can not delete catrgory, non ed');
      }
  }
  */

}
