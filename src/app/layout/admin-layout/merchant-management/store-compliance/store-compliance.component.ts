import { StoreComplianceTypeDetails, GetStoreComplianceList, UpdateDisplayLicenseNo } from './../../../../actions/merchant-management.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../../../node_modules/@angular/forms';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { CelRendererViewComplianceComponent } from '../../components/cel-renderer-view-compliance/cel-renderer-view-compliance.component';
import { AddComplianceFormComponent } from './add-compliance-form/add-compliance-form.component';

@Component({
  selector: 'app-store-compliance',
  templateUrl: './store-compliance.component.html',
  styleUrls: ['./store-compliance.component.css']
})
export class StoreComplianceComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  rowData = [
    {
      id: null,
      data: null,
      complianceType: 'GST',
      country: null,
      status: 'NOT FILLED',
      label: null
    },
    {
      id: null,
      data: null,
      complianceType: 'PAN',
      country: null,
      status: 'NOT FILLED',
      label: null
    },
    {
      id: null,
      data: null,
      complianceType: 'FSSAI',
      country: null,
      status: 'NOT FILLED',
      label: null
    },
    {
      id: null,
      data: null,
      complianceType: 'TRADE LICENSE',
      country: null,
      status: 'NOT FILLED',
      label: null
    },
  ];
  columnDefs;
  defaultColDef;

  formDetailsGST: FormGroup;
  formDetailsFSSAI: FormGroup;
  formDetailsPAN: FormGroup;
  formDetailsTradeLicense: FormGroup;
  gstComplianceDetails = null;
  fssaiComplianceDetails = null;
  panComplianceDetails = null;
  tradeComplianceDetails = null;
  storeInfoDetails = null;
  storeId = null
  fileUploadSubscription: Subscription;
  businessCategoryId = null;
  countryCode = null;
  complianceTypeDetails = null;
  complianceTypeSelected = null;
  complianceMandatory = null;
  categorySelected = null;
  category = null;
  gst = null;
  pan = null;
  fssai = null;
  tradelicense = null;
  displayLicenseType = null
  displayLicenseNumber = null
  id = null
  constructor(private fb: FormBuilder,
    private store: Store<any>, private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar, public dialog: MatDialog
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreComplianceList(this.storeId));

    this.columnDefs = [

      {
        headerName: 'Compliance Type',
        field: 'complianceType',
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'Status',
        field: 'status',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return data.data.status == 'FILLED' ? '<h6 class="mt-2"><span class="badge badge-pill badge-success">FILLED</span></h6>' : '<h6 class="mt-2"><span class="badge badge-pill badge-warning">NOT FILLED</span></h6>'
        }
      },
      {
        headerName: 'Country',
        field: 'country',
        resizable: true,
        sortable: true,
        cellRenderer: (data) => {
          return data.data.country == 'IND' ? 'INDIA' : data.data.country
        }
      },

      {
        headerName: 'License Number',
        field: 'label',
        resizable: true,
        sortable: true,
      },

      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        maxWidth: 100,
        cellRendererFramework: CelRendererViewComplianceComponent,
        cellRendererParams: {
          onActionBtnClick: this.requestFnctn.bind(this),
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      }
    ];
  }
  requestFnctn(params) {
    console.log(params)
    this.complianceSelected({ value: params.complianceType, id: params.id }, 'edit')
  }
  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeComplianceTypeDetails) {
        this.complianceTypeDetails = res.storeComplianceTypeDetails[0];
        console.log("!!!!!!!!", this.complianceTypeDetails)
      }
      if (res.storeInfoDetails) {
        this.storeInfoDetails = res.storeInfoDetails;
        this.businessCategoryId = res.storeInfoDetails.businessCategoryId;
        this.countryCode = res.storeInfoDetails.countryCode;
        this.displayLicenseNumber = res.storeInfoDetails.displayLicenseNumber;
        this.displayLicenseType = res.storeInfoDetails.displayLicenseType;
      }
    });
    this.formDetailsGST = this.fb.group({
      gstNum: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      confirmGstNumber: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      businessName: ['', Validators.required],
      taxStructureConfirm: [2, Validators.required],
      certificateUrl: ['', Validators.required]
    });
    this.formDetailsFSSAI = this.fb.group({
      liscense: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      stateName: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      ownerName: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      validUpto: ['', Validators.required],
      certificateUrl: ['', Validators.required],
      fileObj: [null]
    });
    this.formDetailsPAN = this.fb.group({
      panNumber: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      confirmPanNum: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      businessName: ['', Validators.required],
      dobOfCorporation: ['', Validators.required],
      panType: ['individual', Validators.required],
      certificateUrl: ['', Validators.required],
      entityType: ['individual', Validators.required]
    });
    this.formDetailsTradeLicense = this.fb.group({
      certifyingAuthority: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      certificateType: [1, Validators.required],
      businessName: ['', Validators.required],
      entityType: ['', Validators.required],
      certificateValidity: ['', Validators.required],
      certificateUrl: ['', Validators.required]
    });
  }
  complianceSelected(event, type = 'add') {
    this.categorySelected = event.value;
    const selectedCategory = this.rowData.find(e => e.complianceType == this.categorySelected);
    const dialogRef = this.dialog.open(AddComplianceFormComponent, {
      width: '900px',
      height: '500px',
      panelClass: 'image-crop-dialog',
      disableClose: true,
      data: {
        storeId: this.storeId,
        categorySelected: this.categorySelected,
        id: type == 'edit' ? event.id : selectedCategory ? selectedCategory.id : null,
      }
    });
  }
  onGridReady(event) {
    this.gridApi = event.api;
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.storeComplianceList) {
        console.log(res.storeComplianceList)
        this.assigndata(res.storeComplianceList)
        event.api.setRowData(this.rowData);
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }
  assigndata(data) {
    data.forEach(element => {
      const tempData = this.rowData.findIndex(e => e.complianceType == element.complianceType)
      if (tempData > -1) {
        console.log(tempData)
        this.rowData[tempData]['id'] = element.id
        this.rowData[tempData]['status'] = 'FILLED'
        this.rowData[tempData]['country'] = element.country
        this.rowData[tempData]['data'] = element.data
        const jsonData = JSON.parse(JSON.parse(element.data))
        if (element.complianceType == 'GST')
          this.rowData[tempData]['label'] = jsonData.gstNum;
        else if (element.complianceType == 'PAN')
          this.rowData[tempData]['label'] = jsonData.panNumber;
        else if (element.complianceType == 'FSSAI')
          this.rowData[tempData]['label'] = jsonData.liscense;

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
  displayLicense() {
    console.log("Licence type", this.displayLicenseType)
    console.log("Compliance type", this.rowData)
    switch (this.displayLicenseType) {
      case 'GST': {
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].complianceType == this.displayLicenseType) {
            this.displayLicenseNumber = JSON.parse(JSON.parse(this.rowData[i].data)).gstNum;
            //  this.displayLicenseType = 'GST';
            console.log("GST", this.displayLicenseNumber)
          }

        }
        break;
      }
      case 'FSSAI': {
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].complianceType == this.displayLicenseType) {
            this.displayLicenseNumber = JSON.parse(JSON.parse(this.rowData[i].data)).liscense;
            console.log("FSSAI", this.displayLicenseNumber)
          }
        }
        break;
      }
      case 'PAN': {
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].complianceType == this.displayLicenseType) {
            this.displayLicenseNumber = JSON.parse(JSON.parse(this.rowData[i].data)).panNumber;
            console.log("PAN", this.displayLicenseNumber)
          }
        }
        break;
      }
      case 'TRADELICENSE': {
        this.displayLicenseNumber = '';
        break;
      }
      case 'BLANK': {
        this.displayLicenseNumber = '';
        break;
      }
    }
  }

  updateDisplayLicense(licenseType, licenseNumber) {
    console.log(licenseType, " , ", licenseNumber);
    const payload = {
      id: this.storeId,
      displayLicenseNumber: this.displayLicenseNumber,
      displayLicenseType: this.displayLicenseType
    }
    this.store.dispatch(new UpdateDisplayLicenseNo(payload));
  }
  ngOnDestroy() {
    if(this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe()
    }
  }
}
