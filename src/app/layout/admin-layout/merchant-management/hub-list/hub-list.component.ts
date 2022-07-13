import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '../../../../../../node_modules/@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { DialogLatLongComponent } from '../store-info/dialog-lat-long/dialog-lat-long.component';
import { GetHubListByMerchantId, GetRegionsList, CreateStoreHub, ActionTypes, UpdateStoreHub, VerifyGstn } from './../../../../actions/merchant-management.actions';
import { GetCountries } from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { MerchantManagecellActionButtonComponent } from '../../components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  
  panelOpenState = false;
  merchantId = null;
  columnDefs;
  defaultColDef;
  rowData: any=[];

  isHubFormShow = true;
  panelHubList = true;
  hubListByMerchantId = [];

  hubForm: FormGroup;
  countries = null;
  regions = null;
  regionCode = null;
  map = { lat: 22.5392287, lng: 88.3595163 };
  subscriptionApi: Subscription;

  hubDetailsByID = null;
  isUpdateForm = true;

  gstnVerificationReference = null;
  gstn_verified = false;
  gstVerifiedBtn:boolean = false;
  gstNumberEdit: string = null;
  gstLegalNameEdit:string = null;
  gstLegalNameOrg:string = null;
  gstNumberOrg: string = null;

  constructor(
    private ag: AgGridOptions,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private http: HttpClient,
    private matSnackBar: MatSnackBar, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apiMessageService: ApiMessageService,
    private toastr: ToastrService,
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.id;
    this.columnDefs = [
      {
        headerName: 'Hub ID',
        field: 'id',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Address',
        field: 'shortAddress',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'City',
        field: 'city',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'GSTIN Number',
        field: 'gstn',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'GSTIN Legal Name',
        field: 'gstnLegalName',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        cellRendererFramework: MerchantManagecellActionButtonComponent,
        cellRendererParams: {
          onActionBtnClick: [this.requestFnctn.bind(this)]
        },
        sortable: false,
        filter: false,
        resizable: true,
      },
    ];
    this.store.dispatch(new GetHubListByMerchantId(this.merchantId));
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetRegionsList());
  }

  ngOnInit(): void {
    this.hubForm = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      countryCode: ['', Validators.required],
      landmark: ['', [Validators.required, Validators.maxLength(100)]],
      regionCode: [''],
      regionName: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/), Validators.maxLength(25)]],

      email: ['', [Validators.email, Validators.maxLength(100)]],
      contact_number: ['', [Validators.maxLength(10)]],

      gstn: [''],
      gstnLegalName: [''],
      gstnTradeName: [''],
      hasGstNonEnrollmentDec: [''],
    });

    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if( res.hubListByMerchantId) {
        this.hubListByMerchantId = res.hubListByMerchantId;
        if (this.hubListByMerchantId) {
          this.rowData = this.hubListByMerchantId['obj'];
        }
      }
      if(res.storeVerifyGstn) {
        this.hubForm.get('gstnLegalName').setValue(res.storeVerifyGstn.legalName);
        this.hubForm.get('gstnTradeName').setValue(res.storeVerifyGstn.tradeName);
        this.gstnVerificationReference = res.storeVerifyGstn.refNo;
        this.gstn_verified = res.storeVerifyGstn.isValid;
        this.gstVerifiedBtn = this.gstn_verified;
        this.gstNumberOrg = this.hubForm.get('gstn').value;
        this.gstLegalNameOrg = this.hubForm.get('gstnLegalName').value;
      }
    });
    this.store.pipe(select<any, any>('general')).subscribe(res => {
      this.countries = res['countries'] ? res['countries']['payload'] : '';
    });
    this.store.pipe(select<any, any>('merchantManagement')).subscribe(res => {
      this.regions = res['regionsList'] ? res['regionsList']['payload'] : '';
    });
  }
  requestFnctn(params) {
    console.log(params);
    this.isUpdateForm = true;

    this.hubDetailsByID = params.alldata;
    this.hubForm.get('address').setValue(this.hubDetailsByID.address);
    this.hubForm.get('city').setValue(this.hubDetailsByID.city);
    this.hubForm.get('countryCode').setValue(this.hubDetailsByID.countryCode);
    this.hubForm.get('landmark').setValue(this.hubDetailsByID.landmark);
    this.regionCode = this.hubDetailsByID.regionCode,
    this.hubForm.get('regionName').setValue(this.hubDetailsByID.regionName);
    this.hubForm.get('zipCode').setValue(this.hubDetailsByID.zipCode);
    this.map.lat = this.hubDetailsByID.geoLat;
    this.map.lng = this.hubDetailsByID.geoLong;

    this.hubForm.get('gstn').setValue(this.hubDetailsByID.gstn);
    this.hubForm.get('gstnLegalName').setValue(this.hubDetailsByID.gstnLegalName);
    this.hubForm.get('gstnTradeName').setValue(this.hubDetailsByID.gstnTradeName);
    this.hubForm.get('hasGstNonEnrollmentDec').setValue(this.hubDetailsByID.hasGstNonEnrollmentDec);
    this.hubForm.get('email').setValue(this.hubDetailsByID.email);
    this.hubForm.get('contact_number').setValue(this.hubDetailsByID.contactNo);
    this.hubForm.controls['contact_number'].disable();

    this.gstnVerificationReference = this.hubDetailsByID.gstnVerificationReference;
    this.gstn_verified = this.hubDetailsByID.gstn_verified;
    this.gstVerifiedBtn = this.gstn_verified;
    this.gstNumberOrg = this.hubForm.get('gstn').value;
    this.gstLegalNameOrg = this.hubForm.get('gstnLegalName').value;

    this.isHubFormShow = false;
  }
  resetForm() {
    this.hubForm.reset()
    this.regionCode = null,
    this.map.lat = 22.5392287;
    this.map.lng = 88.3595163;
    this.isUpdateForm = false;
  }
  openDialogLatLong() {
    const dialogRef = this.dialog.open(DialogLatLongComponent, {
      width: '600px',
      data: {
        lat: this.map.lat,
        lng: this.map.lng,
        address: this.hubForm.get('address').value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.map.lat = result.lat
        this.map.lng = result.lng
        this.hubForm.get('address').setValue(result.address);
        if (result.address_components) {
          this.hubForm.get('landmark').setValue(result.address_components.area);
          this.hubForm.get('city').setValue(result.address_components.city);
          this.hubForm.get('zipCode').setValue(result.address_components.zipCode);
          this.hubForm.get('regionName').setValue(result.address_components.state);
          this.hubForm.get('countryCode').setValue(result.address_components.country);
          this.regionCode = result.address_components.regionCode;
        }
      }
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      this.hubListByMerchantId = res.hubListByMerchantId;
      if (this.hubListByMerchantId) {
        this.rowData = this.hubListByMerchantId['obj'];
      }
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
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  openHubForm() {
    this.isHubFormShow = false;
    this.hubForm.controls['contact_number'].enable();
    this.resetForm();
  }
  hideHubForm() {
    this.isHubFormShow = true;
  }
  onSubmitHubAdd() {
    if (this.hubForm.valid) {
      let payload = {
        "address": this.hubForm.get('address').value,
        "city": this.hubForm.get('city').value,
        "countryCode": this.hubForm.get('countryCode').value,
        "geoLat": this.map.lat,
        "geoLong": this.map.lng,
        "landmark": this.hubForm.get('landmark').value,
        "merchantId": this.merchantId,
        "regionCode": this.regionCode,
        "regionName": this.hubForm.get('regionName').value,
        "zipCode": this.hubForm.get('zipCode').value,
        "gstn": this.hubForm.get('gstn').value,
        "gstnLegalName": this.hubForm.get('gstnLegalName').value,
        "gstnTradeName": this.hubForm.get('gstnTradeName').value,
        "hasGstNonEnrollmentDec": this.hubForm.get('hasGstNonEnrollmentDec').value,
        "email": this.hubForm.get('email').value, 
        "contactNo": this.hubForm.get('contact_number').value
      }
      this.store.dispatch(new CreateStoreHub(payload));
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
        if (data.status === true && data.type ==  ActionTypes.createStoreHub) {
          this.store.dispatch(new GetHubListByMerchantId(this.merchantId));
        }
      });
      this.resetForm();
      this.hideHubForm();
    } else {
      this.markFormGroupTouched(this.hubForm)
    } 
  }
  onSubmitHubUpdate() {
    if (this.hubForm.valid) {
      let payload = {
        "id": this.hubDetailsByID.id,
        "address": this.hubForm.get('address').value,
        "city": this.hubForm.get('city').value,
        "countryCode": this.hubForm.get('countryCode').value,
        "geoLat": this.map.lat,
        "geoLong": this.map.lng,
        "landmark": this.hubForm.get('landmark').value,
        "merchantId": this.merchantId,
        "regionCode": this.regionCode,
        "regionName": this.hubForm.get('regionName').value,
        "zipCode": this.hubForm.get('zipCode').value,
        "gstn": this.hubForm.get('gstn').value,
        "gstnLegalName": this.hubForm.get('gstnLegalName').value,
        "gstnTradeName": this.hubForm.get('gstnTradeName').value,
        "hasGstNonEnrollmentDec": this.hubForm.get('hasGstNonEnrollmentDec').value,
        "email": this.hubForm.get('email').value, 
        "contactNo": this.hubForm.get('contact_number').value
      }
      this.store.dispatch(new UpdateStoreHub(payload));
     
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
        if (data.status === true && data.type ==  ActionTypes.updateStoreHub) {
          this.resetForm();
          this.hideHubForm();
          this.store.dispatch(new GetHubListByMerchantId(this.merchantId));
        }
      });
    } else {
      this.markFormGroupTouched(this.hubForm)
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
  verifyLegalInformation() {
    let gstn = this.hubForm.get('gstn').value;
    if(gstn != null) {
      let payload = {
        hubId: this.hubDetailsByID.id,
        gstn: gstn,
      }
      this.store.dispatch(new VerifyGstn(payload));
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
        if (data.status === true && data.type ==  ActionTypes.verifyGstn) {
          this.store.dispatch(new GetHubListByMerchantId(this.merchantId));
        }
      });
    } else {
      this.toastr.error('Enter GSTIN Number.')
    }
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }

  gstUpdate(gstValue ){
    console.log( this.gstNumberOrg , this.gstNumberEdit , this.gstLegalNameOrg , this.gstLegalNameEdit )
    if( this.gstNumberOrg !== this.gstNumberEdit || this.gstLegalNameOrg !== this.gstLegalNameEdit ){
      this.gstVerifiedBtn = false;
    } else {
      this.gstVerifiedBtn = true;
    }
  }
}
