import { Component, OnInit } from '@angular/core';
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
import {
  GetZone,
  GetByIdZipCode,
  StoreZipCode,
  StoreByIdZipCode,
  UpdateZipCode,
  PostNewZipCode,
  GetByIdZipZoneUser,
  PostZipZoneUser,
  UpdateZipZoneUser,
  GetUserGroup,
} from 'src/app/actions/storeManagement.action';

@Component({
  selector: 'app-add-new-zip-zone-user',
  templateUrl: './add-new-zip-zone-user.component.html',
  styleUrls: ['./add-new-zip-zone-user.component.css'],
})
export class AddNewZipZoneUserComponent implements OnInit {
  addZipZoneUserForm: FormGroup;
  zoneList$: any[];
  userGroupList$: any[];
  _id: number;
  isEdit = false;
  _zipZoneUserByIdData$: any[];
  openZone = false;
  showMatHint = false;
  public zoneControl: FormControl = new FormControl(null, Validators.required);
  public userGroupControl: FormControl = new FormControl(
    null,
    Validators.required
  );

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
    this._store.dispatch(new GetUserGroup());

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdZipZoneUser(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.zoneList$ = res['zone'] ? res['zone']['payload'] : '';
      this.userGroupList$ = res['userGroup'] ? res['userGroup']['payload'] : '';
    });

    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this._zipZoneUserByIdData$ = res['zipZoneUserById']
        ? res['zipZoneUserById']['payload']
        : '';
      // Set Values
      if (this._id && this._zipZoneUserByIdData$) {
        this.zipcodeUpdateValue();
      }
    });
  }
  ngOnDestroy() {
    this._store.dispatch(new StoreZipCode(null));
    this._store.dispatch(new StoreByIdZipCode(null));
  }
  // Submit Fulfillment Form
  submitZipZoneUser(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this._id) {
      console.log('change', this.addZipZoneUserForm.value);
      this._store.dispatch(
        new UpdateZipZoneUser(this.addZipZoneUserForm.value, this._id)
      );
    } else {
      this._store.dispatch(new PostZipZoneUser(this.addZipZoneUserForm.value));

      this.apiMessageService.currentApiStatus.subscribe(data => {
        console.log('Fulfillemnt', data);
        if (data.type === 'POST_NEW_ZIPZONEUSER') {
          console.log('After Post Zip code', data.payload);

          // this._id = data.payload['id'];
          // this.openZone = true;
          // console.log('ID', this._id);
          // const div = document.getElementById('zone_div');
          // console.log('DIV', div);
        }
        //  else if (data.type === 'postNewZoneResponse') {
        //   const rowData = Object.assign({},data.payload['data'],data.payload['api_response'])
        //   this.rowData.push(data.payload.data);
        //   // this.rowData.push()
        // }
      });
      // this._route.navigate(['store/zip-code-management/zipcode']);
    }
  }

  // Forms Logic
  initialForm() {
    this.addZipZoneUserForm = this._fb.group({
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
      userGroupId: this._fb.group({
        id: [, Validators.required],
      }),
      zoneId: this._fb.group({
        id: [, Validators.required],
      }),
    });
  }

  get formControl() {
    return this.addZipZoneUserForm.controls;
  }

  zipcodeUpdateValue() {
    this.addZipZoneUserForm.patchValue({
      deliveryTat: this._zipZoneUserByIdData$
        ? this._zipZoneUserByIdData$[0]['deliveryTat']
        : '',
      isCodAvailable: this._zipZoneUserByIdData$
        ? this._zipZoneUserByIdData$[0]['isCodAvailable']
        : '',
      status: this._zipZoneUserByIdData$
        ? this._zipZoneUserByIdData$[0]['status']
        : '',
      additionalDelivery: this._zipZoneUserByIdData$
        ? this._zipZoneUserByIdData$[0]['additionalDelivery']
        : '',
    });
    this.addZipZoneUserForm.get('zoneId').patchValue({
      id: this._zipZoneUserByIdData$[0]['zoneId']['id'],
    });
    this.addZipZoneUserForm.get('userGroupId').patchValue({
      id: this._zipZoneUserByIdData$[0]['userGroupId']['id'],
    });
    this.addZipZoneUserForm.disable();
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
