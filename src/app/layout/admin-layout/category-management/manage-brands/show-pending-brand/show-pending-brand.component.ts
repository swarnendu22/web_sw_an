import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { brandManagementState } from '../../../../../reducers/brand-management.reducers';
import { GetAllCategory } from '../../../../../actions/storeManagement.action';
import { GetBrandDetails, GetPendingBrands, RejectPendingCategory, ApprovePendingCategory, ActionTypes } from '../../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-pending-brand.component.html',
  styleUrls: ['./show-pending-brand.component.css']
})
export class ShowPendingBrandComponent implements OnInit {


  settings = {};
  pendingBrands = [];
  selectedPendingBrand = null;
  brandLogoUrl = ''
  id = null;
  newBrandForm: FormGroup;
  submitted = false;
  categories = null;
  brandRequest = null;
  brandRequestCode = null;
  categorySelectedItemIds = [];
  disable = true;
  fatchedOldValue = false;
  brandDetails = null;
  selectedCategoryIds = [];
  pevCategorySetName = [];
  prevCategorySetIds = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<brandManagementState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public apiMessageService: ApiMessageService,
    public router: Router
  ) {
    //this.store.dispatch(new GetAllCategory())
    this.id = this.route.snapshot.params.id
    this.store.dispatch(new GetPendingBrands());
    // if (this.id) {
    //   this.store.dispatch(new GetBrandDetails(this.id));
    // }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newBrandForm.controls;
  }

  approveRequest() {
    const approveData = {
      requestId: this.brandRequestCode,
      approveStatus: 'APPROVED',
      remarks: ''
    }
    this.store.dispatch(new ApprovePendingCategory(approveData));
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.approvePendingBrandRequest) {
        const router = this.router
        localStorage.setItem('tabIndexBand', '0');
        this.router.navigate(['category', 'manage']);
      }
    });
  }


  ngOnInit() {
    this.newBrandForm = this.formBuilder.group({
      id: [this.id],
      brandName: ["", Validators.required],
      brandShortName: ["", Validators.required],
      categoryIdList: ["", Validators.required],
      brandLogoUrl: [null],
      profilePage: [null],
      active: [true, Validators.required],
      isPrimiumBrand: [false],
      isRequiredAuthorisation: [false]
    });


    this.settings = {
      singleSelection: false,
      text: "Select Category",
      selectAllText: 'Select All',
      unSelectAllText: "UnSelect All",
      searchPlaceholderText: "Search Category",
      enableSearchFilter: true,
      badgeShowLimit: 4,
      groupBy: "category"
    };

    this.store.pipe(select<any, any>('brands')).subscribe(res => {
      this.pendingBrands = res['pendingBrands'];
      this.brandDetails = res['brandDetails']

      if (this.pendingBrands) {
        this.selectedPendingBrand = this.pendingBrands.find(x => x.id == this.id)
        console.log("Brand Details::::::::::::", this.brandDetails, this.selectedPendingBrand)
        if (this.pendingBrands[0] && this.pendingBrands[0].categorySet) {
          this.prevCategorySetIds = this.pendingBrands[0].categorySet.map(cat => cat.id)
          this.pevCategorySetName = this.pendingBrands[0].categorySet.map(cat => cat.name)
        }
      }

      if (this.selectedPendingBrand) {
        this.brandRequest = JSON.parse(this.selectedPendingBrand['request'])
        this.selectedCategoryIds = this.brandRequest.categoryIdList
        this.brandRequestCode = this.selectedPendingBrand['code']
        if (this.brandRequest.id && this.fatchedOldValue == false) {
          this.fatchedOldValue = true;
          this.store.dispatch(new GetBrandDetails(this.brandRequest.id));
        }
      }

      // if (this.brandRequest && this.brandRequest.id) {
      //     this.store.dispatch(new GetBrandDetails(this.brandRequest.id));
      // }
      if (this.brandRequest) {
        this.brandLogoUrl = this.brandRequest['brandLogoUrl'];
        this.newBrandForm.get('brandName').setValue(this.brandRequest['brandName']);
        this.newBrandForm.get('brandShortName').setValue(this.brandRequest['brandShortName']);
        this.newBrandForm.get('brandLogoUrl').setValue(this.brandRequest['brandLogoUrl']);
        // this.newBrandForm.get('profilePage').setValue(this.brandRequest['profilePage']);
        this.newBrandForm.get('active').setValue(this.brandRequest['active']);
        this.newBrandForm.get('isPrimiumBrand').setValue(this.brandRequest['isPrimiumBrand']);
        this.newBrandForm.get('isRequiredAuthorisation').setValue(this.brandRequest['isRequiredAuthorisation']);

        this.brandRequest['categoryIdList'].map(categorySetItem => this.categorySelectedItemIds.push({ id: categorySetItem }))
        this.newBrandForm.get('categoryIdList').patchValue(this.categorySelectedItemIds.map(cat => cat.id));
        console.log("Request JSON:::::::::", this.newBrandForm);
        this.newBrandForm.disable();
      }

      this.newBrandForm.disable();
    });

    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      this.categories = res['categories']
    });

    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      this.categories = res['allcategories']
    });

    // this.store.pipe(select('manageCategories')).subscribe(res => {
    //   this.brandDetails = res.categories
    // });
  }

  goBack() {
    //const navigationExtras: NavigationExtras = { state: { status: 'Pending' } };
    this.router.navigate(['/category/manage']);
    localStorage.setItem('tabIndexBand', '1');

    //this.router.navigate(['category', 'manage']);
  }

  categorySelectionValue(value) {
    this.categorySelectedItemIds = value
    this.newBrandForm.get('categoryIdList').patchValue(this.categorySelectedItemIds.map(cat => cat.id));
  }

  onIconUpload(event) {
    this.brandLogoUrl = event.Location;
    this.newBrandForm.get('brandLogoUrl').patchValue(this.brandLogoUrl);
  }

  openRejectRequestDialog() {
    this.dialog.open(RejectPendingBrandRequestModal, {
      width: '400px',
      maxHeight: '500px',
      data: { brandRequestId: this.brandRequestCode },
    });
  }
  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.disable = false;
    } else {
      formStats.disable();
      this.disable = true;
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }

  categorySelectionItem(item) {
    console.log("Selected Items:::::::", item);
  }
}


@Component({
  selector: 'app-reject-pending-brand-request',
  templateUrl: 'reject-request.html',
})
export class RejectPendingBrandRequestModal implements OnInit {
  rejectPendingBrandRequestForm: FormGroup;

  constructor(
    public _fb: FormBuilder,
    private _store: Store<brandManagementState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiMessageService: ApiMessageService,
    public router: Router
  ) {
    this.rejectPendingBrandRequestForm = this._fb.group({
      requestId: [this.data.brandRequestId, Validators.required],
      approveStatus: ['REJECTED', Validators.required],
      remarks: [null, Validators.required]
    });
  }

  ngOnInit() { }

  submitReject() {
    console.log(this.rejectPendingBrandRequestForm.value, this.data.brandRequestId);
    this._store.dispatch(new RejectPendingCategory(this.rejectPendingBrandRequestForm.value));
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.rejectPendingBrandRequest) {
        //const navigationExtras: NavigationExtras = { state: { status: 'Pending' } };
        this.router.navigate(['/category/manage']);
        localStorage.setItem('tabIndexBand', '1');
      }
    });
  }


}
