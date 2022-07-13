import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  GetByIdZipCode,
  StoreZipCode,
  StoreByIdZipCode,
  UpdateZipCode,
  PostNewZipCode,
  GetZone,
} from 'src/app/actions/storeManagement.action';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { GetRegionByCountryId } from 'src/app/actions/merchant-management.actions';
@Component({
  selector: 'app-add-new-zip-code',
  templateUrl: './add-new-zip-code.component.html',
  styleUrls: ['./add-new-zip-code.component.css'],
})
export class AddNewZipCodeComponent implements OnInit {
  addZipcodeForm: FormGroup;
  zoneList$: any[];
  _id: number;
  isEdit = false;
  _zipcodeByIdData$: any[];
  openZone = false;
  showMatHint = false;
  public zoneControl: FormControl = new FormControl(null, Validators.required);

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute,
    private _route: Router,
    private apiMessageService: ApiMessageService
  ) {
    this.initialForm();
    this._id = this._router.snapshot.params.id;
    this._store.dispatch(new GetZone());

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdZipCode(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.zoneList$ = res['zone'] ? res['zone']['payload'] : '';
    });

    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this._zipcodeByIdData$ = res['zipcodeById'];
      // Set Values
      if (this._id && this._zipcodeByIdData$) {
        this.zipcodeUpdateValue();
      }
    });
  }
  ngOnDestroy() {
    this._store.dispatch(new StoreZipCode(null));
    this._store.dispatch(new StoreByIdZipCode(null));
  }
  // Submit Fulfillment Form
  submitZipcode(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this._id) {
      console.log('change', this.addZipcodeForm.value);
      this._store.dispatch(
        new UpdateZipCode(this.addZipcodeForm.value, this._id)
      );
      this.apiMessageService.currentApiStatus.subscribe(data => {
        if (data.type === 'UPDATE_ZIPCODE_ON_ZIPCODEMANAGEMENT') {
          this._route.navigate(['store/zip-code-management/zipcode']);
        }
      });
    } else {
      this._store.dispatch(new PostNewZipCode(this.addZipcodeForm.value));

      this.apiMessageService.currentApiStatus.subscribe(data => {
        console.log('Fulfillemnt', data);
        if (data.type === 'POST_NEW_ZIPCODE' && data.status) {
          console.log('After Post Zip code', data.payload);

          // this._id = data.payload['id'];
          // this.openZone = true;
          // console.log('ID', this._id);
          // const div = document.getElementById('zone_div');
          // console.log('DIV', div);
          this._route.navigate(['store/zip-code-management/zipcode']);
        }
        //  else if (data.type === 'postNewZoneResponse') {
        //   const rowData = Object.assign({},data.payload['data'],data.payload['api_response'])
        //   this.rowData.push(data.payload.data);
        //   // this.rowData.push()
        // }
      });
    }
  }

  // Forms Logic
  initialForm() {
    this.addZipcodeForm = this._fb.group({
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      deliveryTat: [
        ,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      isCodAvailable: [, Validators.required],
      status: [1, Validators.required],
      additionalDelivery: [
        ,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      zoneId: this._fb.group({
        id: [, Validators.required],
      }),
    });
  }

  get formControl() {
    return this.addZipcodeForm.controls;
  }

  zipcodeUpdateValue() {
    this.addZipcodeForm.patchValue({
      zipCode: this._zipcodeByIdData$
        ? this._zipcodeByIdData$[0]['zipCode']
        : '',
      deliveryTat: this._zipcodeByIdData$
        ? this._zipcodeByIdData$[0]['deliveryTat']
        : '',
      isCodAvailable: this._zipcodeByIdData$
        ? this._zipcodeByIdData$[0]['isCodAvailable']
        : '',
      status: this._zipcodeByIdData$ ? this._zipcodeByIdData$[0]['status'] : '',
      additionalDelivery: this._zipcodeByIdData$
        ? this._zipcodeByIdData$[0]['additionalDelivery']
        : '',
    });
    this.addZipcodeForm.get('zoneId').patchValue({
      id: this._zipcodeByIdData$[0]['zoneId']['id'],
    });
    this.addZipcodeForm.disable();
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

// @Component({
//   selector: 'add-zip',
//   templateUrl: 'add-zip.html',
// })
// export class addZip {}
