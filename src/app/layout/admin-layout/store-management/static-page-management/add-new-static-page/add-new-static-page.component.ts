import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import {
  GetByIdStaticPageManagement,
  UpdateStaticPageManagement,
  PostNewStaticPageManagement,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-static-page',
  templateUrl: './add-new-static-page.component.html',
  styleUrls: ['./add-new-static-page.component.css'],
})
export class AddNewStaticPageComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '5rem',
    placeholder: 'Enter Content',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  addStaticPageForm: FormGroup;
  private _id: number;
  isEdit = false;
  _staticPageByIdData$: any[];
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
      this._store.dispatch(new GetByIdStaticPageManagement(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._staticPageByIdData$ = res['staticPageManagementById'];
      // Set Values
      if (this._id && this._staticPageByIdData$) {
        this.staticPageUpdateValue();
      }
    });
  }

  // Submit Fulfillment Form
  submitStaticPage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addStaticPageForm)
    if (this._id) {

      if (this.addStaticPageForm.valid) {

        // const payload = Object.assign({}, this.addStaticPageForm.value, {pageCode: parseInt(this.addStaticPageForm.get('pageCode').value)})
        console.log('change', this.addStaticPageForm.value);
        this._store.dispatch(
          new UpdateStaticPageManagement(this.addStaticPageForm.value, this._id)
        );
      }
    } else {
      if (this.addStaticPageForm.valid && this.addStaticPageForm.dirty) {

        console.log('change', this.addStaticPageForm.value);
        this._store.dispatch(
          new PostNewStaticPageManagement(this.addStaticPageForm.value)
        );
      }
    }
  }

  // Forms Logic
  initialForm() {
    this.addStaticPageForm = this._fb.group({
      pageCode: [, Validators.required],
      staticPageName: ['', Validators.required],
      format: ['HTML', Validators.required],
      active: [false, Validators.required],
      data: ['', Validators.required],
    });
  }

  get formControl() {
    return this.addStaticPageForm.controls;
  }

  staticPageUpdateValue() {
    console.log(this._staticPageByIdData$[0]['active']);
    this.addStaticPageForm.patchValue({
      pageCode: parseInt(this._staticPageByIdData$[0]['pageCode']),
      staticPageName: this._staticPageByIdData$[0]['staticPageName'],
      format: this._staticPageByIdData$[0]['format'],
      active: this._staticPageByIdData$[0]['active'],
      data: this._staticPageByIdData$[0]['data'],
    });
    this.addStaticPageForm.disable();
    this.config['editable'] = false;
  }

  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.config['editable'] = true;
    } else {
      formStats.disable();
      this.config['editable'] = false;
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
