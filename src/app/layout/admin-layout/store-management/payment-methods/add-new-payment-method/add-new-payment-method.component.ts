import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute } from '@angular/router';
import {
  GetByIdPaymentMethod,
  PostNewPaymentMethod,
  UpdatePaymentMethod,
} from 'src/app/actions/storeManagement.action';
import { GetRegionsList } from 'src/app/actions/merchant-management.actions';

@Component({
  selector: 'app-add-new-payment-method',
  templateUrl: './add-new-payment-method.component.html',
  styleUrls: ['./add-new-payment-method.component.css'],
})
export class AddNewPaymentMethodComponent implements OnInit {
  addPaymentMethodForm: FormGroup;
  private _id: number;
  isEdit = false;
  _paymentMethodByIdData$: any[];

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute
  ) {
    this.initialForm();
    this._id = this._router.snapshot.params.id;
    // Edit Block
    console.log('ID', this._id);
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdPaymentMethod(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._paymentMethodByIdData$ = res['paymentMethodById'];
      // Set Values
      if (this._id && this._paymentMethodByIdData$) {
        this.paymentMethodUpdateValue();
      }
    });
  }

  // Submit Delivery Form
  submitPaymentMethod(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addPaymentMethodForm)
    if (this._id) {
      if (this.addPaymentMethodForm.valid && this.addPaymentMethodForm.dirty) {
        console.log('change', this.addPaymentMethodForm.value);
        this._store.dispatch(
          new UpdatePaymentMethod(this.addPaymentMethodForm.value, this._id)
        );
      }
    } else {
      if (this.addPaymentMethodForm.valid) {

        this._store.dispatch(
          new PostNewPaymentMethod(this.addPaymentMethodForm.value)
        );
      }
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

  // Forms Logic
  initialForm() {
    this.addPaymentMethodForm = this._fb.group({
      title: ['', Validators.required],
      method: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get formControl() {
    return this.addPaymentMethodForm.controls;
  }

  paymentMethodUpdateValue() {
    this.addPaymentMethodForm.patchValue({
      title: this._paymentMethodByIdData$[0]['title'],
      method: this._paymentMethodByIdData$[0]['method'],
      description: this._paymentMethodByIdData$[0]['description'],
    });
    this.addPaymentMethodForm.get('method').disable();
    this.addPaymentMethodForm.disable();
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
}
