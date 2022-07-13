import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute } from '@angular/router';
import {
  GetByIdCountry,
  UpdateCountry,
  PostNewCountry,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-country',
  templateUrl: './add-new-country.component.html',
  styleUrls: ['./add-new-country.component.css'],
})
export class AddNewCountryComponent implements OnInit {
  addCounryForm: FormGroup;

  private _id: number;
  isEdit = false;
  _countryByIdData$: any[];

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute
  ) {
    this.initialForm();
    this._id = this._router.snapshot.params.id;
    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdCountry(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this._countryByIdData$ = res['countryById']
        ? res['countryById']['payload']
        : '';
      // Set Values
      if (this._id && this._countryByIdData$) {
        this.countryUpdateValue();
      }
    });
  }

  // Submit Delivery Form
  submitCountry() {
    this.markFormGroupTouched(this.addCounryForm)
    if (this._id) {
      if (this.addCounryForm.valid) {

        console.log('change', this.addCounryForm.value);
        this._store.dispatch(
          new UpdateCountry(this.addCounryForm.value, this._id)
        );
      }
    } else {
      if (this.addCounryForm.valid && this.addCounryForm.dirty) {

        this._store.dispatch(new PostNewCountry(this.addCounryForm.value));
      }
    }
  }

  // Forms Logic
  initialForm() {
    this.addCounryForm = this._fb.group({
      iso: ['', Validators.required],
      name: ['', Validators.required],
      numcode: [, Validators.required],
      statesRequired: [false, Validators.required],
      zipcodeRequired: [false, Validators.required],
    });
  }

  get formControl() {
    return this.addCounryForm.controls;
  }

  countryUpdateValue() {
    this.addCounryForm.patchValue({
      iso: this._countryByIdData$[0]['iso'],
      name: this._countryByIdData$[0]['name'],
      numcode: this._countryByIdData$[0]['numcode'],
      statesRequired: this._countryByIdData$[0]['statesRequired'],
      zipcodeRequired: this._countryByIdData$[0]['zipcodeRequired'],
    });
    this.addCounryForm.disable();
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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
