import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute } from '@angular/router';
import {
  GetCountries,
  GetZone,
  GetByIdFulfillmentCenter,
  UpdateFulfillmentCenter,
  PostNewFulfillmentCenter,
  PostNewZone,
  GetByIdAppVersion,
  UpdateAppVersion,
  PostNewAppVersion,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-app-version',
  templateUrl: './app-new-app-version.component.html',
  styleUrls: ['./add-new-app-version.component.css'],
})
export class AddNewAppVersionComponent implements OnInit {
  addAppversionForm: FormGroup;
  private _id: number;
  isEdit = false;
  loading = false;
  _appVersionByIdData$: any[];
  showFile;

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
      this._store.dispatch(new GetByIdAppVersion(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._appVersionByIdData$ = res['appVersionsById'];
      // Set Values
      if (this._id && this._appVersionByIdData$) {
        this.appVersionUpdateValue();
      }
    });
  }

  // Submit Fulfillment Form
  submitAppVersion(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addAppversionForm)
    if (this._id) {
      if (this.addAppversionForm.valid && this.addAppversionForm.dirty) {

        const mandatory = Boolean(
          this.addAppversionForm.get('isMandatory').value
        );
        console.log('mandatory', mandatory);
        const payload = Object.assign({}, this.addAppversionForm.value, {
          isMandatory: mandatory,
        });
        console.log('change', this.addAppversionForm.value);
        this._store.dispatch(new UpdateAppVersion(payload, this._id));
      }
    } else {
      if (this.addAppversionForm.valid) {

        const mandatory = Boolean(
          this.addAppversionForm.get('isMandatory').value
        );
        const payload = Object.assign({}, this.addAppversionForm.value, {
          isMandatory: mandatory,
        });
        this._store.dispatch(new PostNewAppVersion(payload));
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
    this.addAppversionForm = this._fb.group({
      os: ['', Validators.required],
      versionNumber: ['', Validators.required],
      versionCode: ['', Validators.required],
      isMandatory: [false, Validators.required],
      versionNamespace: ['', Validators.required],
      // packageSize: [''],
      packageUrl: ['', Validators.required],
      releaseDate: [, Validators.required], // number
      liveDate: [, Validators.required],
      productDesc: ['', Validators.required], // number
      bugFixed: ['', Validators.required], // string
    });
  }

  get formControl() {
    return this.addAppversionForm.controls;
  }

  appVersionUpdateValue() {
    this.addAppversionForm.patchValue({
      os: this._appVersionByIdData$[0]['os'],
      versionNumber: this._appVersionByIdData$[0]['versionNumber'],
      versionCode: this._appVersionByIdData$[0]['versionCode'],
      isMandatory: this._appVersionByIdData$[0]['isMandatory'],
      versionNamespace: this._appVersionByIdData$[0]['versionNamespace'],
      // packageSize: this._appVersionByIdData$[0]['packageSize'], // number
      packageUrl: this._appVersionByIdData$[0]['packageUrl'], // number
      releaseDate: new Date(this._appVersionByIdData$[0]['releaseDate']),
      liveDate: new Date(this._appVersionByIdData$[0]['liveDate']), // number
      productDesc: this._appVersionByIdData$[0]['productDesc'], // string
      bugFixed: this._appVersionByIdData$[0]['bugFixed'],
    });
    this._appVersionByIdData$[0]['packageUrl'];
    this.showFile = this.addAppversionForm.get('packageUrl').value;
    console.log('Sjow', this.showFile);
    this.addAppversionForm.disable();
  }

  filesize;

  getFileDetails(event) {
    var size = event.target.files[0].size;
    this.filesize = 'Size: ' + Math.round(size / 1024) + ' KB';
    this.addAppversionForm.get('packageSize').patchValue(this.filesize);
  }

  async onFileUpload(event) {
    console.log('loading', this.loading, event);
    const location = await event.Location;
    this.showFile = await event.Location;
    this.addAppversionForm.get('packageUrl').setValue(location);
    console.log('Add', location);
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
