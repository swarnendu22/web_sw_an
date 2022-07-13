import { StoreRegionByCountryId } from './../../../../../actions/merchant-management.actions';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { storeManagementState } from '../../../../../reducers/storemanagement.reducers';
import {
  GetCountries,
  PostNewFulfillmentCenter,
  GetByIdFulfillmentCenter,
  UpdateFulfillmentCenter,
  PostNewZone,
  GetZone,
  GetZoneByFulfillmentCenterId,
  StoreZoneByFulfillmentCenterId,
  UpdateZoneFulfillmentCenterById,
  PostZoneFulfillmentCenter,
  StoreFulfillmentCenterById,
} from '../../../../../actions/storeManagement.action';
import {
  GetRegionsList,
  GetRegionByCountryId,
} from '../../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '@angular/router';
import { UpdateCellRendererButtonComponent } from '../../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-newfulfillment-center',
  templateUrl: './add-newfulfillment-center.component.html',
  styleUrls: ['./add-newfulfillment-center.component.css'],
})
export class AddNewfulfillmentCenterComponent implements OnInit, OnDestroy {
  // Initial
  addFulfillmentForm: FormGroup;
  addZoneForm: FormGroup;
  regions$: null;
  countries$: any[];
  zoneList$: any[];
  _id: number;
  fcId: number = null;
  isEdit = false;
  isFirstTime = true;
  _fulfillmentByIdData$: any[];
  openZone = false;
  showMatHint = false;
  gridapi: any;
  zoneByFulfillmentCenterId = [];
  clearSearchZone = false;
  public zoneControl: FormControl = new FormControl();
  public regionControl: FormControl = new FormControl();
  public countryControl: FormControl = new FormControl();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute,
    private apiMessageService: ApiMessageService,
    public dialog: MatDialog
  ) {
    this.initialForm();
    this._id = this._router.snapshot.params.id;
    this._store.dispatch(new GetCountries());
    this._store.dispatch(new StoreRegionByCountryId(null));
    this._store.dispatch(new GetZone());

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this.addZoneForm.get('fcId').patchValue(this._id);
      this._store.dispatch(new GetByIdFulfillmentCenter(this._id));
      this._store.dispatch(new GetZoneByFulfillmentCenterId(this._id));
    }
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions$ = res['regionByCountryId']
        ? res['regionByCountryId']['payload']
        : null;
    });
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries$ = res['countries'] ? res['countries']['payload'] : '';
    });

    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.zoneList$ = res['zone'] ? res['zone']['payload'] : '';
    });

    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._fulfillmentByIdData$ = res['fulfillmentcenterById'];
      if (res['zoneByFulfillmentCenterId']) {
        this.zoneByFulfillmentCenterId = res['zoneByFulfillmentCenterId'];

        this.rowData = Array.from(res['zoneByFulfillmentCenterId']);
        console.log('ZONE_DATa', this.zoneByFulfillmentCenterId);
      }
      // Set Values
      if (this._id && this._fulfillmentByIdData$) {
        console.log('ID', this.getFormDisableStats('addFulfillmentForm'));
        if (this._fulfillmentByIdData$[0]['countryId'] && !this.regions$) {
          this._store.dispatch(
            new GetRegionByCountryId({
              countryId: this._fulfillmentByIdData$[0]['countryId'],
            })
          );
        }
        if (this.isFirstTime) {
          this.fulfillmentCenterUpdateValue();
        }
      }
    });
  }
  ngOnDestroy() {
    this._store.dispatch(new StoreZoneByFulfillmentCenterId(null));
    this._store.dispatch(new StoreRegionByCountryId(null));
    this._store.dispatch(new StoreFulfillmentCenterById(null));
  }
  // Submit Fulfillment Form
  submitFulfillment(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this._id) {
      this.markFormGroupTouched(this.addFulfillmentForm)
      if (this.addFulfillmentForm.valid && this.addFulfillmentForm.dirty) {
        console.log('change', this.addFulfillmentForm.value);
        this._store.dispatch(
          new UpdateFulfillmentCenter(this.addFulfillmentForm.value, this._id)
        );
      }
    } else {
      this.markFormGroupTouched(this.addFulfillmentForm)
      if (this.addFulfillmentForm.valid) {
        this._store.dispatch(
          new PostNewFulfillmentCenter(this.addFulfillmentForm.value)
        );

        this.apiMessageService.currentApiStatus.subscribe(data => {
          console.log('Fulfillemnt', data);
          if (data.type === 'POST_NEW_FULFILLMENT_CENTER') {
            this._id = +data.payload['id'];
            this.openZone = true;
            this.addZoneForm.get('fcId').patchValue(this._id);
            console.log('ID', this._id);
            const div = document.getElementById('zone_div');
            console.log('DIV', div);
          }
          //  else if (data.type === 'postNewZoneResponse') {
          //   const rowData = Object.assign({},data.payload['data'],data.payload['api_response'])
          //   this.rowData.push(data.payload.data);
          //   // this.rowData.push()
          // }
        });
      }
    }
  }
  onCountrySelectionChange(event) {
    this._store.dispatch(new StoreRegionByCountryId(null));
    this._store.dispatch(new GetRegionByCountryId({ countryId: event.value }));
  }
  submitAddzone(event: Event) {
    this.isFirstTime = false;
    event.stopPropagation();
    this.zoneControl.reset();
    const payload = Object.assign({}, this.addZoneForm.value, {
      fcId: +this._id,
    });
    console.log('Submit Zone', payload);
    this._store.dispatch(new PostZoneFulfillmentCenter(payload));
    this.addZoneForm.reset();
    // this.clearSearchZone = true;
  }
  onZoneValueChange(event) {
    const value = event.value;
    this.addZoneForm.get('fcId').patchValue(this._id);
    this.addZoneForm.patchValue({ zoneId: value.id, tat: value.deliveryTat });
  }
  // Forms Logic
  initialForm() {
    this.addFulfillmentForm = this._fb.group({
      fcCode: [''],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      regionId: this._fb.group({
        id: [, Validators.required],
      }),
      vatId: [
        '',
        [
          Validators.pattern(
            /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/
          ),
        ],
      ],
      countryId: [, Validators.required], // number
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      alternativePhone: [
        ,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ], // number
      telephone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d{10}$/)],
      ], // string
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          ),
        ],
      ],
    });

    this.addZoneForm = this._fb.group({
      fcId: [, Validators.required],
      zoneId: [, Validators.required],
      tat: [, Validators.required],
    });
  }

  get formControl() {
    return this.addFulfillmentForm.controls;
  }

  fulfillmentCenterUpdateValue() {
    this.isFirstTime = false;
    this.addFulfillmentForm.patchValue({
      fcCode: this._fulfillmentByIdData$[0]['fcCode'],
      name: this._fulfillmentByIdData$[0]['name'],
      address1: this._fulfillmentByIdData$[0]['address1'],
      street: this._fulfillmentByIdData$[0]['street'],
      city: this._fulfillmentByIdData$[0]['city'],
      countryId: this._fulfillmentByIdData$[0]['countryId'], // number
      postcode: this._fulfillmentByIdData$[0]['postcode'],
      alternativePhone: this._fulfillmentByIdData$[0]['alternativePhone'], // number
      telephone: this._fulfillmentByIdData$[0]['telephone'], // string
      email: this._fulfillmentByIdData$[0]['email'],
      vatId: this._fulfillmentByIdData$[0]['vatId'],
    });
    this.addFulfillmentForm.get('regionId').patchValue({
      id: this._fulfillmentByIdData$[0]['regionId']['id'],
    });
    this.openZone = true;
    this.addFulfillmentForm.disable();
    this.addZoneForm.disable();
    console.log('Update FUlFIl', this.addFulfillmentForm.disabled);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  // Ag Grid Config
  columnDefs = [
    {
      headerName: 'Zone Name',
      field: 'zoneName',
      filter: 'agTextColumnFilter',
      editable: true,
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_FULLFILLMENT_ZONE',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'TAT (In Hours)',
      field: 'tat',
      filter: 'agNumberColumnFilter',
      editable: true,
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_FULLFILLMENT_ZONE',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'Action',
      colId: 'params',
      type: 'FULFILLMENT_ZONE_UPDATE',
      cellRendererFramework: UpdateCellRendererButtonComponent,
      cellRendererParams: {
        onClick: this.updateRow.bind(this),
        showCLick: this.updateAttribute.bind(this),
      },
      width: 150,
      // pinned: 'right',
      btnName: [{ name: 'Update', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
    },
    ,
  ];

  rowData = [];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.gridapi = event.api;
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }



  updateRow(e) {
    console.log('Update', e, this.gridapi);
    this.gridapi.updateRowData({ remove: [e.rowData], removeIndex: e.id });
  }
  updateAttribute(payload) {
    let dialogRef = this.dialog.open(UpdateFCPopup, {
      width: '800px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { payload },
    });

    dialogRef.afterClosed().subscribe(result => {
      this._store.dispatch(new GetZoneByFulfillmentCenterId(this._id));
    });
  }

  onGridSizeChanged(params) {
    var gridWidth = params.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }

  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.addZoneForm.enable();
      this.apiMessageService.changeApiStatus({
        type: 'TOGGLE_FULFILLMENT_CENTER',
        status: true,
      });
    } else {
      formStats.disable();
      this.addZoneForm.disable();
      this.apiMessageService.changeApiStatus({
        type: 'TOGGLE_FULFILLMENT_CENTER',
        status: false,
      });
    }
    // if (formName === 'addFulfillmentForm') {
    //   this.apiMessageService.changeApiStatus({
    //     type: 'TOGGLE_FULFILLMENT_CENTER',
    //     status: !this.getFormDisableStats(formName),
    //   });
    // }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  // zoneActionBtnClick(params) {
  //   if (params.type === 'UPDATE') {
  //     console.log(this.zoneByFulfillmentCenterId);
  //     const { zoneName, tat } = this.zoneByFulfillmentCenterId[0];
  //     console.log(zoneName, tat, this.zoneByFulfillmentCenterId);
  //     // if (zoneName === params.data['zoneName'] && tat === params.data['tat']) {
  //     //   alert('no updates');
  //     // } else {
  //     if (params.data['id']) {
  //       this._store.dispatch(
  //         new UpdateZoneFulfillmentCenterById(params.data, params.data['id'])
  //       );
  //     } else {
  //       alert('ID NOT FOUND');
  //     }
  //     // }
  //   }
  // }
}

@Component({
  selector: 'update-fullfillment-center',
  templateUrl: 'update-fullfillment-center.html',
})
export class UpdateFCPopup implements OnInit {
  updateFCForm: FormGroup;
  zoneList$: any[];
  fcId;
  public zoneControl: FormControl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _store: Store<any>
  ) {
    this.initialForm();
    this._store.dispatch(new GetZone());
  }

  ngOnInit() {
    console.log('Ng', this.data);
    this._store.pipe(select('general')).subscribe(res => {
      this.zoneList$ = res['zone'] ? res['zone']['payload'] : '';
    });
    this.updateAttributeData(this.data);
  }

  initialForm() {
    this.updateFCForm = this._fb.group({
      fcId: [],
      zoneId: [],
      tat: ['', Validators.required],
      zoneName: [{ value: '', disabled: true }],
    });
  }

  updateAttributeData(data) {
    this.updateFCForm.patchValue({
      fcId: data.payload.data['fcId'],
      zoneId: data.payload.data['zoneId'],
      tat: data.payload.data['tat'],
      zoneName: data.payload.data['zoneName'],
    });
  }

  submitUpdateAttribute() {
    console.log('Da', this.updateFCForm.value);
    const data = {
      fcId: this.data.payload.data['fcId'],
      zoneId: this.updateFCForm.value['zoneId'],
      tat: this.updateFCForm.value['tat'],
    };
    // const tempData = Object.assign({}, this.updateAttributeForm.value);
    // delete tempData['groupName'];
    console.log('Submit', this.data.payload.data['id'], data);
    this._store.dispatch(
      new UpdateZoneFulfillmentCenterById(data, this.data.payload.data['id'])
    );
  }

  onZoneValueChange(event) {
    const value = event.value;
    this.updateFCForm.get('fcId').patchValue(this.fcId);
    this.updateFCForm.patchValue({ zoneId: value.id, tat: value.deliveryTat });
  }
}
