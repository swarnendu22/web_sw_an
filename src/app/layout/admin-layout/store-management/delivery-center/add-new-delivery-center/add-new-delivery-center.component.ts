import {
  StoreZipcodeByDeliveryCenterId,
  UpdateZipcodeByDeliveryCenterId,
} from './../../../../../actions/storeManagement.action';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
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
  GetCountries,
  GetZipCode,
  PostNewZipCode,
  GetByIdDeliveryCenter,
  UpdateDeliveryCenter,
  PostNewDeliveryCenter,
  PostNewZipcodeByDeliveryCenterId,
  GetZipcodeByDeliveryCenterId,
  StoreDeliveryCenterById,
} from 'src/app/actions/storeManagement.action';
import {
  GetRegionsList,
  StoreRegionByCountryId,
  GetRegionByCountryId,
} from 'src/app/actions/merchant-management.actions';
import { UpdateCellRendererButtonComponent } from '../../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-delivery-center',
  templateUrl: './add-new-delivery-center.component.html',
  styleUrls: ['./add-new-delivery-center.component.css'],
})
export class AddNewDeliveryCenterComponent implements OnInit, OnDestroy {
  addDeliveryCenterForm: FormGroup;
  addZipcodeForm: FormGroup;
  regions$: null;
  countries$: any[];
  zipcode$: any[];
  _id: number;
  isEdit = false;
  _deliveryCenterByIdData$: any[];
  openZipcode = false;
  isFirstTime = true;
  showMatHint = false;
  gridapi: any;
  dcId: number;
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

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this.dcId = +this._id
      this.addZipcodeForm.get('dcId').patchValue(+this._id);
      this._store.dispatch(new GetByIdDeliveryCenter(this._id));
      this._store.dispatch(new GetZipcodeByDeliveryCenterId(this._id));
    }
    this.apiMessageService.currentApiStatus.subscribe(data => {
      console.log('Fulfillemnt', data);
      if (data.type === 'POST_NEW_DELIVERY_CENTER') {
        this._id = data.payload['id'];
        this.openZipcode = true;
        this.addZipcodeForm.get('dcId').patchValue(this._id);
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

  ngOnInit() {
    this._store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions$ = res['regionByCountryId']
        ? res['regionByCountryId']['payload']
        : null;
    });
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries$ = res['countries'] ? res['countries']['payload'] : '';
      this.zipcode$ = res['zipcode'] ? res['zipcode']['payload'] : '';
    });

    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      this._deliveryCenterByIdData$ = res['deliveryCenterById'];

      if (res['zipcodeBydeliveryCenterId']) {
        this.rowData = res['zipcodeBydeliveryCenterId']
        console.log('this.rowData', this.rowData)
      }
      // Set Values
      if (this._id && this._deliveryCenterByIdData$) {
        if (this._deliveryCenterByIdData$[0]['countryId'] && !this.regions$) {
          this._store.dispatch(
            new GetRegionByCountryId({
              countryId: this._deliveryCenterByIdData$[0]['countryId'],
            })
          );
        }
        if (this.isFirstTime) {
          this.deliveryCenterUpdateValue();
        }
      }
      this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
        console.log('zipcodeBydeliveryCenterId', res['zipcodeBydeliveryCenterId'])

      });
    });
  }
  ngOnDestroy() {
    this._store.dispatch(new StoreZipcodeByDeliveryCenterId(null));
    this._store.dispatch(new StoreRegionByCountryId(null));
    this._store.dispatch(new StoreDeliveryCenterById(null));
  }
  // Submit Delivery Form
  submitDelivery(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this._id) {
      this.markFormGroupTouched(this.addDeliveryCenterForm)

      if (this.addDeliveryCenterForm.valid && this.addDeliveryCenterForm.dirty) {
        console.log('change', this.addDeliveryCenterForm.value);
        this._store.dispatch(
          new UpdateDeliveryCenter(this.addDeliveryCenterForm.value, this._id)
        );
      }
    } else {
      this.markFormGroupTouched(this.addDeliveryCenterForm)

      if (this.addDeliveryCenterForm.valid) {
        this._store.dispatch(
          new PostNewDeliveryCenter(this.addDeliveryCenterForm.value)
        );
      }
    }
  }
  onCountrySelectionChange(event) {
    this._store.dispatch(new StoreRegionByCountryId(null));
    this._store.dispatch(new GetRegionByCountryId({ countryId: event.value }));
  }
  submitAddZipcode() {
    console.log('Submit Zipcode', this.addZipcodeForm.value, this._id);
    this.addZipcodeForm.get('dcId').patchValue(this.dcId);
    this._store.dispatch(
      new PostNewZipcodeByDeliveryCenterId(this.addZipcodeForm.value, this._id)
    );
    this.addZipcodeForm.reset();
    // this._store.pipe(select('storeManagement')).subscribe(res => {
    //   this.rowData = res['zipcodeBydeliveryCenterId'];
    // });
  }

  // Forms Logic
  initialForm() {
    this.addDeliveryCenterForm = this._fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      regionId: this._fb.group({
        id: [, Validators.required],
      }),
      countryId: [, Validators.required], // number
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      vatId: ['', [Validators.pattern(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/)]],
      alternativePhone: [
        ,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ], // number
      telephone: [, [Validators.required, Validators.pattern(/^[0-9]\d{10}$/)]], // string
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

    this.addZipcodeForm = this._fb.group({
      dcId: [,],
      zipCode: [, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      deliveryTat: [, Validators.required],
    });
  }

  get formControl() {
    return this.addDeliveryCenterForm.controls;
  }

  deliveryCenterUpdateValue() {
    this.isFirstTime = false;
    this.addDeliveryCenterForm.patchValue({
      dcCode: this._deliveryCenterByIdData$[0]['dcCode'],
      name: this._deliveryCenterByIdData$[0]['name'],
      address1: this._deliveryCenterByIdData$[0]['address1'],
      street: this._deliveryCenterByIdData$[0]['street'],
      city: this._deliveryCenterByIdData$[0]['city'],
      countryId: this._deliveryCenterByIdData$[0]['countryId'], // number
      postcode: this._deliveryCenterByIdData$[0]['postcode'],
      alternativePhone: this._deliveryCenterByIdData$[0]['alternativePhone'], // number
      telephone: this._deliveryCenterByIdData$[0]['telephone'], // string
      email: this._deliveryCenterByIdData$[0]['email'],
      vatId: this._deliveryCenterByIdData$[0]['vatId'],
    });
    this.addDeliveryCenterForm.get('regionId').patchValue({
      id: this._deliveryCenterByIdData$[0]['regionId']['id'],
    });
    this.addDeliveryCenterForm.disable();
    this.openZipcode = true;
    this.addZipcodeForm.disable();
    // if (!this.getFormDisableStats('addZipcodeForm')) {
    // }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  columnDefs = [
    {
      headerName: 'Pin Code',
      field: 'zipCode',
      filter: 'agTextColumnFilter',
      editable: true,
      resizable: true,
      onCellValueChanged: params => {
        console.log('cellvalue', params);
        this.apiMessageService.changeApiStatus({
          type: 'DELIVERY_CENTER_EDIT',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'Delivery TAT (In Hours)',
      field: 'deliveryTat',
      filter: 'agNumberColumnFilter',
      editable: true,
      resizable: true,
      onCellValueChanged: params => {
        console.log('cellvalue', params);
        this.apiMessageService.changeApiStatus({
          type: 'DELIVERY_CENTER_EDIT',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'Action',
      colId: 'params',
      type: 'DELIVERY_CENTER_UPDATE',
      cellRendererFramework: UpdateCellRendererButtonComponent,
      cellRendererParams: {
        onClick: this.updateRow.bind(this),
        updateClick: this.updateDC.bind(this),
      },
      width: 150,
      // pinned: 'right',
      btnName: [{ name: 'Update', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
    },
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
      this.addZipcodeForm.enable();
      this.apiMessageService.changeApiStatus({
        type: 'TOGGLE_FULFILLMENT_CENTER',
        status: true,
      });
    } else {
      formStats.disable();
      this.addZipcodeForm.disable();
      this.apiMessageService.changeApiStatus({
        type: 'TOGGLE_FULFILLMENT_CENTER',
        status: false,
      });
    }
    // if (formName === 'addDeliveryCenterForm') {
    //   this.apiMessageService.changeApiStatus({
    //     type: 'TOGGLE_DELIVERY_CENTER',
    //     status: !this.getFormDisableStats(formName),
    //   });
    // }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  zoneActionBtnClick(params) {
    if (params.type === 'UPDATE') {
      // console.log(this.zoneByFulfillmentCenterId);
      // const { zoneName, tat } = this.zoneByFulfillmentCenterId[0];
      // console.log(zoneName, tat, this.zoneByFulfillmentCenterId);
      // if (zoneName === params.data['zoneName'] && tat === params.data['tat']) {
      //   alert('no updates');
      // } else {
      // if(params.data['id']){
      // this._store.dispatch(
      //   new UpdateZoneFulfillmentCenterById(params.data, params.data['id'])
      // );
      // }else{
      //   alert('ID NOT FOUND')
      // }
      // }
    }
  }
  pincodeValidation(event) {
    console.log(event);
  }

  updateDC(payload) {
    let dialogRef = this.dialog.open(UpdateDCPopup, {
      width: '800px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { payload },
    });

    dialogRef.afterClosed().subscribe(result => {
      this._store.dispatch(new GetZipcodeByDeliveryCenterId(this._id));
    });
  }
}

@Component({
  selector: 'update-delivery-center',
  templateUrl: 'update-delivery-center.html',
})
export class UpdateDCPopup implements OnInit {
  updateDCForm: FormGroup;
  dcId;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _store: Store<any>
  ) {
    this.initialForm();
  }

  ngOnInit() {
    console.log('Ng', this.data);
    this.updateAttributeData(this.data);
  }

  initialForm() {
    this.updateDCForm = this._fb.group({
      dcId: [],
      deliveryTat: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  updateAttributeData(data) {
    this.updateDCForm.patchValue({
      dcId: data.payload.data['dcId'],
      deliveryTat: data.payload.data['deliveryTat'],
      zipCode: data.payload.data['zipCode'],
    });
  }

  submitUpdateDC() {
    console.log('Da', this.updateDCForm.value);
    const data = {
      dcId: this.data.payload.data['dcId'],
      deliveryTat: this.updateDCForm.value['deliveryTat'],
      zipCode: this.updateDCForm.value['zipCode'],
    };
    // const tempData = Object.assign({}, this.updateAttributeForm.value);
    // delete tempData['groupName'];
    console.log('Submit', this.data.payload.data['id'], data);
    this._store.dispatch(
      new UpdateZipcodeByDeliveryCenterId(data, this.data.payload.data['id'])
    );
  }
}
