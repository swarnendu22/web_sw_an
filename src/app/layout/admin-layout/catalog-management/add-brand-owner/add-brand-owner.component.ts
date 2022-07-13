import { Component, OnInit, OnDestroy,Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { PostNewBrandOwner, ActionTypes } from '../../../../actions/brand-management.actions';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { RequestService } from '../../../../utils/request/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-brand-owner',
  templateUrl: './add-brand-owner.component.html',
  styleUrls: ['./add-brand-owner.component.css']
})
export class AddBrandOwnerComponent implements OnInit {
  brandNameAvailibilityCheck = false;
  brandNameAvailibilityCheckText = null;
  newBrandForm: FormGroup;
  submitted = false;
  isSubmit = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private apiMessageService: ApiMessageService,
    private router: Router,
    public requestService: RequestService,
    private matSnackBar: MatSnackBar,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddBrandOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  async onSubmit() {
    this.submitted = true;
    this.isSubmit = true
    const keyword = this.newBrandForm.value['brandName']

    if (this.newBrandForm.valid) {
      const checkStatusRes = await this.checkAvailabilityService(keyword);
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0 && res['payload'][0].isAvailable == 'NO') {
          this.brandNameAvailibilityCheckText = 'Brand owner name is Already Exist';
          this.isSubmit = false
        } else {
          let newBrandFormData = this.newBrandForm.value;
          newBrandFormData.masterBrandName = this.newBrandForm.value['brandName'];
          this.store.dispatch(new PostNewBrandOwner(newBrandFormData));
          this.apiMessageService.currentApiStatus.subscribe(data => {
            if (data.status === true && data.type == ActionTypes.postNewBrandOwner) {
              this.dialogRef.close();
            }
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.newBrandForm);
      this.isSubmit = false
    }
  }
  ngOnInit(): void {
    this.newBrandForm = this.formBuilder.group({
      brandName: ["", [Validators.required, Validators.maxLength(100)]]
    });
  }
  async checkAvailabilityService(keyword) {
    return await this.requestService
      .request(
        {
          method: 'get',
          url: `/api/ndh-product/brand-api/brand-owner/check-availability/${keyword}`,
        },
        true
      )
  }
  async checkAvailability(event) {
    const keyword = this.newBrandForm.value['brandName']
    if (!keyword) {
      this.brandNameAvailibilityCheckText = "Brand owner name can't be blank";
    } else {
      const checkStatusRes = await this.checkAvailabilityService(keyword)
      checkStatusRes.subscribe(res => {
        if (res['payload'].length > 0) {
          if (res['payload'][0].isAvailable == 'NO') {
            this.brandNameAvailibilityCheckText = 'Brand owner name is Already Exist';
          }
          else {
            this.brandNameAvailibilityCheckText = 'Brand owner name is Valid';
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
    this.isSubmit = false
  }
}
