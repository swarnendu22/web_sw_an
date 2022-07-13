import { Component, OnInit, OnDestroy,Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { PostNewBrand, ActionTypes } from '../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { RequestService } from '../../../../utils/request/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {ApproveBrandBatchList } from 'src/app/actions/catalog-management.action';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-add-category-brand",
  templateUrl: "./add-category-brand.component.html",
  styleUrls: ["./add-category-brand.component.css"]
})

export class AddCategoryBrandComponent implements OnInit, OnDestroy {
  brandNameAvailibilityCheck = false;
  brandNameAvailibilityCheckText = null;
  newBrandForm: FormGroup;
  submitted = false;
  isSubmit = false;
  newBandName = null;
  batchId = null;
  batchListSub: Subscription;
  batchListSub2: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private apiMessageService: ApiMessageService,
    private router: Router,
    public requestService: RequestService,
    private matSnackBar: MatSnackBar,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddCategoryBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      if(data.bandName!=null && data.bandName!=undefined)
      {
        this.newBandName = data.bandName;
        this.batchId = data.batchId;
      }
  }
  async onSubmit() {
    this.submitted = true;
    this.isSubmit = true
    const keyword = this.newBrandForm.value['brandName']

    if (this.newBrandForm.valid) {
      const checkStatusRes = await this.checkAvailabilityService(keyword);
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0 && res['payload'][0].isAvailable == 'NO') {
          this.brandNameAvailibilityCheckText = 'Brand name is Already Exist';
          this.isSubmit = false
        } else {
          let newBrandFormData = this.newBrandForm.value;
          newBrandFormData.brandName = this.newBrandForm.value['brandName'];
          //newBrandFormData.brandShortName = this.newBrandForm.value['brandName'];
          newBrandFormData.active = 1;
          newBrandFormData.isPrimiumBrand = 0;
          this.store.dispatch(new PostNewBrand(newBrandFormData));
          this.batchListSub = this.apiMessageService.currentApiStatus.subscribe((data1:any) => {
            if (data1.status === true && data1.type == ActionTypes.postNewBrand) {
              if(this.newBandName!=null && this.newBandName!=undefined)
              {
                let brandApprovedata = {
                  batchId: this.batchId,
                  brandList: [{
                    brandId: data1.payload.id,
                    brandName: this.newBandName
                  }]
                }
                this.store.dispatch(new ApproveBrandBatchList(brandApprovedata));
                this.batchListSub2 = this.apiMessageService.currentApiStatus.subscribe((data2:any) => {
                  if (data2.status === true && data2.type == '[Approve Brand Batch List]') {
                    this.dialogRef.close({payload: data1.payload});
                  }
                });
              } else {
                this.dialogRef.close({payload: data1.payload});
              }
            }
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.newBrandForm);
      this.isSubmit = false
    }
  }
  ngOnInit() {
    this.newBrandForm = this.formBuilder.group({
      brandName: [this.newBandName, [Validators.required, Validators.maxLength(100)]]
    });
  }
  async checkAvailabilityService(keyword) {
    return await this.requestService
      .request(
        {
          method: 'get',
          url: `/api/ndh-product/brand-api/brands/check-availability?name=${keyword}`,
        },
        true
      )
  }
  async checkAvailability(event) {
    const keyword = this.newBrandForm.value['brandName']
    if (!keyword) {
      this.brandNameAvailibilityCheckText = "Brand name can't be blank";
    } else {
      const checkStatusRes = await this.checkAvailabilityService(keyword)
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0) {
          if (res['payload'][0].isAvailable == 'NO') {
            this.brandNameAvailibilityCheckText = 'Brand name is Already Exist';
          }
          else {
            this.brandNameAvailibilityCheckText = 'Brand name is Valid';
          }
        }
      });
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
  get f() {
    return this.newBrandForm.controls;
  }
  statusChange() {
    if (this.f.brandName.errors) {
      this.brandNameAvailibilityCheckText = ''
    }
    return true
  }
  ngOnDestroy() {
    this.isSubmit = false;
    if (this.batchListSub) {
      this.batchListSub.unsubscribe();
    }
    if (this.batchListSub2) {
      this.batchListSub2.unsubscribe();
    }
  }
}