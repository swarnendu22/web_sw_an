import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute } from '@angular/router';
import {
  GetByIdCountry,
  UpdateCountry,
  PostNewCountry,
  GetByIdLogisticPartner,
  PostNewLogisticPartner,
  UpdateLogisticPartner,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-logistic-partner',
  templateUrl: './add-new-logistic-partner.component.html',
  styleUrls: ['./add-new-logistic-partner.component.css'],
})
export class AddNewLogisticPartnerComponent implements OnInit {
  addLogisticPartnerForm: FormGroup;

  private _id: number;
  isEdit = false;
  _logisticPartnerByIdData$: any[];

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
      this._store.dispatch(new GetByIdLogisticPartner(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._logisticPartnerByIdData$ = res['logisticPartnerById'];
      // Set Values
      if (this._id && this._logisticPartnerByIdData$) {
        this.logisticPartnerUpdateValue();
        console.log('ng', this._logisticPartnerByIdData$);
      }
    });
  }

  // Submit Delivery Form
  submitLogisticPartner(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addLogisticPartnerForm)
    if (this._id) {

      if (this.addLogisticPartnerForm.valid) {
        console.log('change', this.addLogisticPartnerForm.value);
        this._store.dispatch(
          new UpdateLogisticPartner(this.addLogisticPartnerForm.value, this._id)
        );
      }
    } else {
      if (this.addLogisticPartnerForm.valid && this.addLogisticPartnerForm.dirty) {

        this._store.dispatch(
          new PostNewLogisticPartner(this.addLogisticPartnerForm.value)
        );
      }
    }
  }

  // Forms Logic
  initialForm() {
    this.addLogisticPartnerForm = this._fb.group({
      logisticCode: ['', Validators.required],
      logisticCompany: ['', Validators.required],
      priority: [, Validators.required],
      apiActive: [, Validators.required],
      licenceinfo: ['', Validators.required],
      accountCode: ['', Validators.required],
      apiUserName: ['', Validators.required],
      apiPassword: ['', Validators.required],
      productionApiKey: ['', Validators.required],
      sandboxApiKey: ['', Validators.required],
      otherApiDetails: ['', Validators.required],
    });
  }

  get formControl() {
    return this.addLogisticPartnerForm.controls;
  }

  logisticPartnerUpdateValue() {
    this.addLogisticPartnerForm.patchValue({
      logisticCode: this._logisticPartnerByIdData$[0]['logisticCode'],
      logisticCompany: this._logisticPartnerByIdData$[0]['logisticCompany'],
      priority: this._logisticPartnerByIdData$[0]['priority'],
      apiActive: this._logisticPartnerByIdData$[0]['apiActive'],
      licenceinfo: this._logisticPartnerByIdData$[0]['licenceinfo'],
      accountCode: this._logisticPartnerByIdData$[0]['accountCode'],
      apiUserName: this._logisticPartnerByIdData$[0]['apiUserName'],
      apiPassword: this._logisticPartnerByIdData$[0]['apiPassword'],
      productionApiKey: this._logisticPartnerByIdData$[0]['productionApiKey'],
      sandboxApiKey: this._logisticPartnerByIdData$[0]['sandboxApiKey'],
      otherApiDetails: this._logisticPartnerByIdData$[0]['otherApiDetails'],
    });
    this.addLogisticPartnerForm.disable();
    console.log('Upate', this.addLogisticPartnerForm.disabled);
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
