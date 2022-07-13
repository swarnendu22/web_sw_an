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
  GetByIdRegion,
  UpdateRegion,
  PostNewRegion,
  GetCountries,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-region',
  templateUrl: './add-new-region.component.html',
  styleUrls: ['./add-new-region.component.css'],
})
export class AddNewRegionComponent implements OnInit {
  addRegionsForm: FormGroup;
  countries$: any[];
  private _id: number;
  isEdit = false;
  _regionsByIdData$: any[];

  public countryControl: FormControl = new FormControl();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute
  ) {
    this.initialForm();
    this._id = this._router.snapshot.params.id;
    this._store.dispatch(new GetCountries());

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdRegion(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries$ = res['countries'] ? res['countries']['payload'] : '';
    });
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._regionsByIdData$ = res['regionsById'];
      // Set Values
      if (this._id && this._regionsByIdData$) {
        this.regionsUpdateValue();
      }
    });
  }

  // Submit Regions Form
  submitRegion(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addRegionsForm)
    if (this._id && this.addRegionsForm.valid && this.addRegionsForm.dirty) {
      console.log('change', this.addRegionsForm.value);
      this._store.dispatch(
        new UpdateRegion(this.addRegionsForm.value, this._id)
      );
    } else if (!this._id && this.addRegionsForm.valid) {
      console.log('Save', this.addRegionsForm.value);
      this._store.dispatch(new PostNewRegion(this.addRegionsForm.value));
    }
  }

  // Forms Logic
  initialForm() {
    this.addRegionsForm = this._fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      countryId: this._fb.group({
        id: [, Validators.required],
      }),
    });
  }

  get formControl() {
    return this.addRegionsForm.controls;
  }

  regionsUpdateValue() {
    this.addRegionsForm.patchValue({
      code: this._regionsByIdData$[0]['code'],
      name: this._regionsByIdData$[0]['name'],
    });
    this.addRegionsForm.get('countryId').patchValue({
      id: this._regionsByIdData$[0]['countryId']['id'],
    });
    this.addRegionsForm.disable();
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
