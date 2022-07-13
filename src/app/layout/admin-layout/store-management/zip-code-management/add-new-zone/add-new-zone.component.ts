import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import {
  GetByIdStaticPageManagement,
  UpdateStaticPageManagement,
  PostNewStaticPageManagement,
  GetByIdZone,
  UpdateZone,
  PostNewZone,
  GetZipCode,
  PostNewZipCode,
  GetByIdZoneByZip,
  UpdateZipCode,
  GetUsersByZoneId,
  UpdateUsersByZoneId,
  GetZipZoneUser,
  GetUserGroup,
  PostZipZoneUser,
  FindDuplicateZipCode,
} from 'src/app/actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { UpdateAttributeSetCellRenderedBtnComponent } from '../../../components/update-attribute-set-cell-rendered-btn/update-attribute-set-cell-rendered-btn.component';
import { UpdateCellRendererButtonComponent } from '../../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { FileUploadAndPreviewComponent } from '../popup-components/file-upload-and-preview/file-upload-and-preview.component';
import { GetRegionsList } from 'src/app/actions/merchant-management.actions';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/utils/request/request.service';

@Component({
  selector: 'app-add-new-zone',
  templateUrl: './add-new-zone.component.html',
  styleUrls: ['./add-new-zone.component.css'],
})
export class AddNewZoneComponent implements OnInit {
  selected = 'n';
  addNewZoneForm: FormGroup;
  _id: number;
  isEdit = false;
  _zoneByIdData$: any[];
  zoneID: number;
  usersListByZoneId = []

  gridapi: any;
  isFirstTime = true;

  showMatHint = false;

  userByZoneIdForm: FormGroup;
  usersArray: FormArray;

  modifyToggle = false;
  saveToggle = true;
  userListNotLoaded = true
  duplicateZipCode = false

  regionLists = [];
  loading = false
  public regionControl: FormControl = new FormControl();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private apiMessageService: ApiMessageService
  ) {
    // this._store.dispatch(new GetZipCode());
    this.initialForm();
    this.userByZoneIdForm = this._fb.group({
      users: this._fb.array([])
    });
    this._id = this._router.snapshot.params.id;

    // Edit Block
    if (this._id) {
      this.isEdit = true;
      this.zoneID = this._id;
      this._store.dispatch(new GetByIdZone(this._id));
      this._store.dispatch(new GetByIdZoneByZip(this._id));
      this._store.dispatch(new GetUsersByZoneId(this._id));
    }
    this._store.dispatch(new GetUserGroup())
    this._store.dispatch(new GetRegionsList());

  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this._zoneByIdData$ = res['zoneById'];
      // Set Values
      if (this._id && this._zoneByIdData$) {
        if (this.isFirstTime) {
          this.zoneUpdateValue();
        }
      }
    });

    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'POST_NEW_ZONE') {
        console.log('Res', data);
        // this.router.navigate(['/store/zip-code-management/zone']);
      }
    });

    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {
      console.log('Store');
      if (res['zipByZone']) {
        // this.rowData = res['zipByZone'];
        const payload = res['zipByZone'];
        const data = payload.filter(d => d.zoneId.id == this.zoneID);
        console.log('Payload', data);
        this.rowData = data;
      }
      // this.usersListByZoneId = res.usersByZoneId ? res.usersByZoneId.payload : []
      // if (this.usersListByZoneId.length > 0 && this.userListNotLoaded) {
      //   this.userListNotLoaded = false
      //   this.usersListByZoneId.forEach(user => {
      //     this.userByZoneArray.push(this.createUser(user));
      //   });

      //   console.log('User', this.userByZoneIdForm)
      // }
    });
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      console.log('General');
      if (res['zipcode']) {
        this.rowData = res['zipcode']['payload'];
      }

      this.usersListByZoneId = res.userGroup ? res.userGroup.payload : []
      console.log('User', this.usersListByZoneId)
      if (this.usersListByZoneId.length > 0 && this.userListNotLoaded) {
        this.userListNotLoaded = false
        this.usersListByZoneId.forEach(user => {
          this.zipZoneUsersArray.push(this.createUser(user));
        });

        console.log('User', this.userByZoneIdForm)
      }
    });

    this._store.pipe(select<any, any>('merchantManagement')).subscribe(res => {

      if (res['regionsList']) {
        this.regionLists = res['regionsList']['payload']
      }
      console.log('User', this.regionLists);

    });
  }

  get userByZoneArray() {
    return this.userByZoneIdForm.get('users') as FormArray;
  }

  get zipZoneUsersArray() {
    return this.addNewZoneForm.get('zipZoneUsers') as FormArray;
  }

  get getZoneZips() {
    return this.addNewZoneForm.get('zips') as FormArray;
  }

  getZoneValidation() {
    const zoneName = parseInt(this.addNewZoneForm.get('zoneName').value)

    console.log(zoneName, typeof zoneName == "number")

    if (!isNaN(zoneName)) {
      this.addNewZoneForm.get('zoneName').setErrors({ alphanumeric: true });
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



  openZipDialog() {
    this.duplicateZipCode = false

    const dialogRef = this.dialog.open(addZip, {
      width: '400px',
      maxHeight: '500px',
      data: { zoneId: this.zoneID, zipcodes: this.rowData },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loading = true
      console.log('Result', result);
      if (result) {
        if (this.rowData.length == 0) {
          console.log('row', this.rowData, result);
          const updatedRow = this.rowData.concat(result);
          this.rowData = updatedRow;
        } else {
          console.log('this row', this.rowData);
          this.rowData.find(data => {
            if (data.zipCode == result.zipCode) {
              this.duplicateZipCode = true
              console.log('duplicate', result, data);
              this.toastr.error('Duplicate Zipcode Available')
              return true;
            }
          });
          console.log('this duplicate', this.duplicateZipCode);
          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            // result['id'] = null
            const updatedRow = this.rowData.concat(result);
            this.rowData = updatedRow;
            console.log('add row data', this.rowData)
          }
        }

      }
      // if (this.getZoneZips.length == result.length) {
      //   this.loading = false
      // }
    });


  }

  createUser({ deliveryTat = '', isCodAvailable = false, additionalDelivery = '', userGroupId, name, id }): FormGroup {
    console.log('Create', userGroupId, name, id)
    // let userGroupName;
    // if (!this.isEdit) {
    //   userGroupName = name
    // } else {
    //   userGroupName = userGroupId.name
    // }
    return this._fb.group({
      id: [id],
      userName: [{ value: name, disabled: true }],
      deliveryTat: [{ value: deliveryTat, disabled: false }, [Validators.required, Validators.maxLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      isCodAvailable: [{ value: isCodAvailable, disabled: false }, Validators.required],
      additionalDelivery: [{ value: additionalDelivery, disabled: false }, [Validators.required, Validators.maxLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      userGroupId: this._fb.group({
        id: { value: id, disabled: false }
      })
    });
  }

  createZips({ deliveryTat = '', isCodAvailable = false, additionalDelivery = '', zipCode, status = 1 }): FormGroup {
    console.log('Create', deliveryTat, isCodAvailable, additionalDelivery, zipCode, status)
    return this._fb.group({
      id: [null],
      zipCode: [{ value: zipCode, disabled: false }, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      deliveryTat: [{ value: deliveryTat, disabled: false }, [Validators.required, Validators.maxLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      isCodAvailable: [{ value: isCodAvailable, disabled: false }, Validators.required],
      additionalDelivery: [{ value: additionalDelivery, disabled: false }, [Validators.required, Validators.maxLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      status: [{ value: status, disabled: false }, Validators.required]
    });
  }

  removeZipCode(i) {
    this.getZoneZips.removeAt(i);
  }

  modifyUser(i) {
    console.log('Modify', i);
    this.userByZoneArray.controls[i].get('modifyToggle').setValue(true);
    this.userByZoneArray.controls[i].get('saveToggle').setValue(false);
    this.userByZoneArray.controls[i].get('deliveryTat').enable();
    this.userByZoneArray.controls[i].get('isCodAvailable').enable();
    this.userByZoneArray.controls[i].get('additionalDelivery').enable();
  }

  SaveUser(i) {
    const userObject = this.usersListByZoneId[i]
    this.userByZoneArray.controls[i].get('modifyToggle').setValue(false);
    this.userByZoneArray.controls[i].get('saveToggle').setValue(true);
    this.userByZoneArray.controls[i].get('deliveryTat').disable();
    this.userByZoneArray.controls[i].get('isCodAvailable').disable();
    this.userByZoneArray.controls[i].get('additionalDelivery').disable();
    let payload;
    if (this.isEdit) {
      payload = {
        deliveryTat: this.userByZoneArray.controls[i].get('deliveryTat').value,
        isCodAvailable: this.userByZoneArray.controls[i].get('isCodAvailable').value,
        status: userObject.status,
        additionalDelivery: this.userByZoneArray.controls[i].get('additionalDelivery').value,
        userGroupId: {
          id: userObject.userGroupId.id
        },
        zoneId: {
          id: userObject.zoneId.id
        }
      };
    } else {
      console.log('Save Else', this.userByZoneArray.controls[i].value, this.usersListByZoneId[i], this.zoneID);
      payload = {
        deliveryTat: this.userByZoneArray.controls[i].get('deliveryTat').value,
        isCodAvailable: this.userByZoneArray.controls[i].get('isCodAvailable').value,
        status: 1,
        additionalDelivery: this.userByZoneArray.controls[i].get('additionalDelivery').value,
        userGroupId: {
          id: userObject.id
        },
        zoneId: {
          id: this.zoneID
        }
      };
    }

    console.log('Save Paylaod', this.userByZoneArray.controls[i].value, payload);
    // this._store.dispatch(new UpdateUsersByZoneId(userObject.id, payload));
  }

  // Submit Fulfillment Form
  submitZone(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.addNewZoneForm);
    const tempPayload = Object.assign({}, this.addNewZoneForm.value)
    const userGroup = this.addNewZoneForm.value['zipZoneUsers']
    const zips = this.addNewZoneForm.value['zips']
    delete tempPayload['zipZoneUsers']
    delete tempPayload['zips']
    if (this.rowData.length == 0) {
      this.showMatHint = true
    }

    if (this.addNewZoneForm.valid && !this.showMatHint) {
      const payload = {
        zone: tempPayload,
        zipZoneUsers: userGroup,
        zips: this.rowData
      };
      console.log('Submit Zone Paylaod', payload)
      this._store.dispatch(new PostNewZone(payload)); // Fulfillment Effects
      // this.router.navigate(['/store/zip-code-management/zone']);

    }
    // if (this._id) {
    //   // const payload = Object.assign({}, this.addStaticPageForm.value, {pageCode: parseInt(this.addStaticPageForm.get('pageCode').value)})
    //   console.log('change', this.addNewZoneForm.value);
    //   this._store.dispatch(new UpdateZone(this.addNewZoneForm.value, this._id));
    // } else {
    //   console.log('change', this.addNewZoneForm.value);
    //   this._store.dispatch(new PostNewZone(this.addNewZoneForm.value));
    //   // this.addNewZoneForm.reset();
    //   // this.addNewZoneForm.disable();
    // }
  }

  // Forms Logic
  initialForm() {
    this.addNewZoneForm = this._fb.group({
      zoneName: [, [Validators.required, Validators.pattern(/(?!^\d+$)^.+$/)]],
      deliveryTat: [
        ,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      regionId: [null, Validators.required],
      isCodAvailable: [null, Validators.required],
      additionalDelivery: [
        ,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      status: [1, Validators.required],
      zipZoneUsers: this._fb.array([]),
      zips: this._fb.array([]),
    })
  }

  get formControl() {
    return this.addNewZoneForm.controls;
  }



  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.apiMessageService.changeApiStatus({
        type: 'EDIT_ZONE_TOGGLE',
        status: true,
      });
    } else {
      formStats.disable();
      this.apiMessageService.changeApiStatus({
        type: 'EDIT_ZONE_TOGGLE',
        status: false,
      });
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  zoneUpdateValue() {
    this.isFirstTime = true;
    // console.log(this._zoneByIdData$[0]['active']);
    this.addNewZoneForm.patchValue({
      zoneName: this._zoneByIdData$[0]['zoneName'],
      deliveryTat: this._zoneByIdData$[0]['deliveryTat'],
      isCodAvailable: this._zoneByIdData$[0]['isCodAvailable'],
      additionalDelivery: this._zoneByIdData$[0]['additionalDelivery'],
      status: this._zoneByIdData$[0]['status'],
      regionId: this._zoneByIdData$[0]['regionId']
    });
    this.addNewZoneForm.disable();
  }

  onGridReady(event) {
    this.gridapi = event.api;
    event.api.sizeColumnsToFit();
  }

  columnDefs = [
    // {
    //   headerName: 'id',
    //   field: 'id',
    //   hide: true,
    //   valueGetter: params => {
    //     if (
    //       params.data.id == ''
    //     ) {
    //       return null;
    //     }
    //   },
    // },
    {
      headerName: 'Zip Code',
      field: 'zipCode',
      filter: 'agTextColumnFilter',
      editable: true,
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_ZONE',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'Allow COD',
      field: 'isCodAvailable',
      filter: 'agTextColumnFilter',
      valueGetter: params => {
        if (
          params.data.isCodAvailable === 1 ||
          params.data.isCodAvailable === 'Yes'
        ) {
          return 'Yes';
        } else if (
          params.data.isCodAvailable === 0 ||
          params.data.isCodAvailable === 'No'
        ) {
          return 'No';
        } else {
          return '';
        }
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        cellHeight: 50,
        values: ['Yes', 'No'],
      },
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_ZONE',
          status: true,
          payload: params,
        });
      },
      editable: true,
    },
    {
      headerName: 'Add. Delivery Charge',
      field: 'additionalDelivery',
      filter: 'agNumberColumnFilter',
      editable: true,
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_ZONE',
          status: true,
          payload: params,
        });
      },
    },
    {
      headerName: 'Add. TAT (in Hrs)',
      field: 'deliveryTat',
      filter: 'agNumberColumnFilter',
      editable: true,
      onCellValueChanged: params => {
        this.apiMessageService.changeApiStatus({
          type: 'EDIT_ZONE',
          status: true,
          payload: params,
        });
      },
    },
    // {
    //   headerName: 'Status',
    //   field: 'status',
    //   valueGetter: params => {
    //     if (params.data.status === 1) {
    //       return 'Active';
    //     } else if (params.data.status === 0) {
    //       return 'In Active';
    //     } else {
    //       return '';
    //     }
    //   },
    //   onCellValueChanged: params => {
    //     this.apiMessageService.changeApiStatus({
    //       type: 'EDIT_ZONE',
    //       status: true,
    //       payload: params,
    //     });
    //   },
    // },
    {
      headerName: 'Action',
      field: 'action',
      type: 'ADD_ZONE_ZIPCODE',
      cellRendererFramework: UpdateCellRendererButtonComponent,
      cellRendererParams: {
        onDeleteClick: this.deleteRow.bind(this),
        onUpdateClick: this.updateZipcode.bind(this),
      },
      minWidth: 200,
      btnName: [{ name: 'Update', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
    },
  ];

  deleteRow(e) {
    console.log('Delete', e, this.gridapi);
    this.gridapi.updateRowData({ remove: [e.rowData], removeIndex: e.id });
    console.log('Delete', this.rowData);
    this.rowData.splice(e.id, 1)
    // this.rowData.splice(e.id, 1)
  }

  updateRow(e) {
    console.log('Update', e, this.gridapi);
    this.gridapi.updateRowData({ update: [e.rowData] });
  }

  rowData = [];
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
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


  updateZipcode(payload) {
    this.duplicateZipCode = false

    let dialogRef = this.dialog.open(updateZip, {
      width: '400px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { payload, zipcodes: this.rowData },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Rsult', result)
      if (result) {
        if (result.data.zipCode == result.params.data.zipCode) {
          this.rowData.splice(result.params.id, 1, result.data)
          this.gridapi.setRowData(this.rowData);
        } else {
          this.rowData.find(data => {
            console.log('find', data, 'result', result.data);
            if (data.zipCode == result.data.zipCode) {
              this.duplicateZipCode = true
              console.log('duplicate', result, data);
              this.toastr.error('Duplicate Zipcode Available')
              return true;
            }
          });
          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            this.rowData.splice(result.params.id, 1, result.data)
            this.gridapi.setRowData(this.rowData);
            console.log('rowdata', this.rowData);
          }
        }
      }
    });
  }

  uploadFilePopup() {
    this.duplicateZipCode = false

    let dialogRef = this.dialog.open(FileUploadAndPreviewComponent, {
      width: '400px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { zipcodes: this.rowData }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const prevRowDataLength = this.rowData.length;
        const currentRowLength = result.length;
        console.log('Close upload file', prevRowDataLength, 'current', currentRowLength, result);
        const payload = []
        // this.loading = true
        result.forEach(obj => {
          obj['id'] = null
          obj['status'] = 1
          payload.push(obj)
        });
        if (this.rowData.length == 0) {

          this.rowData.find(data => {
            let prevZipcode = ''

            return result.find(curr => {
              if (curr.zipCode == (data.zipCode || prevZipcode)) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')
                // this.loading = false
                console.log('Find', curr.zipCode, data.zipCode);
                return true;
              } else {
                prevZipcode = curr.zipCode
              }
            });
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            const updatedRow = this.rowData.concat(payload)
            this.rowData = updatedRow;
            // this.gridapi.setRowData(updatedRow)
            // this.addNewZoneForm.markAsDirty()

            // this.updatedArray = payload;
            // this.rowData.concat(result)
            // this.loading = false
            console.log('After Close ', updatedRow);
          }
        } else if (prevRowDataLength > currentRowLength) {
          console.log('prevRowDataLength > currentRowLength', prevRowDataLength, 'current', currentRowLength);
          this.rowData.find(data => {
            let prevZipcode = ''
            return result.find(curr => {
              if (curr.zipCode == (data.zipCode || prevZipcode)) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')
                // this.loading = false
                console.log('Find', curr.zipCode, data.zipCode);
                return true;
              } else {
                prevZipcode = curr.zipCode
              }
            });
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            const updatedRow = this.rowData.concat(payload)
            this.rowData = updatedRow;
            // this.gridapi.setRowData(updatedRow)
            // this.addNewZoneForm.markAsDirty()

            // this.updatedArray = payload;
            // this.rowData.concat(result)
            // this.loading = false
            console.log('After Close ', updatedRow);
          }
        } else if (currentRowLength > prevRowDataLength) {
          console.log('currentRowLength > prevRowDataLength', prevRowDataLength, 'current', currentRowLength);
          let prevZipcode = ''
          result.find(data => {
            return this.rowData.find(curr => {
              if (curr.zipCode == data.zipCode) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')
                // this.loading = false
                return true;
              } else {
                prevZipcode = curr.zipCode
              }

            });
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            const updatedRow = this.rowData.concat(payload)
            // this.gridapi.setRowData(updatedRow)
            this.rowData = updatedRow;

            this.addNewZoneForm.markAsDirty()
            // this.updatedArray = payload;
            // this.rowData.concat(result)
            this.loading = false
            console.log('After Close ', updatedRow);
          }
        } else if (currentRowLength == prevRowDataLength) {
          console.log('currentRowLength == prevRowDataLength', prevRowDataLength, 'current', currentRowLength);
          this.rowData.find(data => {
            let prevZipcode = ''
            return result.find(curr => {
              if (curr.zipCode == (data.zipCode || prevZipcode)) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')

                console.log('Find', curr.zipCode, data.zipCode);
                // this.loading = false;
                return true;
              } else {
                prevZipcode = curr.zipCode
              }
            })
          })

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            const updatedRow = this.rowData.concat(payload)
            // this.gridapi.setRowData(updatedRow)
            this.rowData = updatedRow;
            this.addNewZoneForm.markAsDirty()

            // this.updatedArray = payload;
            // this.rowData.concat(result)
            this.loading = false
            console.log('After Close ', updatedRow);
          }
        }
      }

    });
  }
}

@Component({
  selector: 'add-zip',
  templateUrl: 'add-zip.html',
})
export class addZip implements OnInit {
  addNewZipCodeForm: FormGroup;
  duplicatedZipCodeArr = [];
  payloadData = null
  alreadyLoaded = false
  allZipCodes = []
  constructor(
    public _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private apiMessageService: ApiMessageService,
    public dialogRef: MatDialogRef<addZip>,
    private toastr: ToastrService,
    private _api: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (this.data['zipcodes']) {
      this.allZipCodes = this.data['zipcodes'];
    }
    this.addNewZipCodeForm = this._fb.group({
      zipCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      deliveryTat: [
        ,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^[0-9]/),
        ],
      ],
      isCodAvailable: [null, Validators.required],
      additionalDelivery: [null
        ,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^[0-9]/),
        ],
      ],
      status: [1, Validators.required],
      // zoneId: this._fb.group({
      //   id: [, Validators.required],
      // }),
    });
  }

  ngOnInit() {

  }

  checkDuplicateZipCode() {
    const zipCode = this.addNewZipCodeForm.get('zipCode').value;
    this.allZipCodes.forEach((curr, i) => {
      const index = _.findIndex([{ zipCode }], (c) => c.zipCode == curr.zipCode);
      if (index > -1) {
        this.addNewZipCodeForm.get('zipCode').setErrors({
          duplicate: true
        });
      }
    });
  }

  async checkDuplicate(payload) {

    const data = await this._api.request(
      {
        url: `/api/geomaster/admin-api/zip/find-duplicate`,
        method: 'post',
        payload: payload
      },
      true
    );

    data.subscribe(res => {
      if (res['payload']) {
        this.toastr.error('Duplicate Zipcode Available')
        this.dialogRef.close();
        // return false
      } else {
        this.dialogRef.close(this.payloadData);
        // return true
      }
    })
  }

  async submitPincode() {
    this.checkDuplicateZipCode();

    if (this.addNewZipCodeForm.valid) {
      this.duplicatedZipCodeArr = []
      this.payloadData = this.addNewZipCodeForm.value
      this.dialogRef.close(this.addNewZipCodeForm.value);
    }

    // ================== CHECKING DUPLICATE ON WHOLE TABLE =================
    // console.log(this.addNewZipCodeForm.value);
    // const payload = {
    //   code: [this.addNewZipCodeForm.value['zipCode']]
    // };

    // this.checkDuplicate(payload);

    // if (this.checkDuplicate(payload)) {
    //   this.dialogRef.close({ data: this.payloadData });
    // } else {
    //   this.dialogRef.close();
    // }
    // status.subscribe(res => {
    //   if (res['payload'] == null) {
    //     this.dialogRef.close({ data: this.payloadData });
    //     console.log("res", res)
    //   } else {
    //     console.log("res", res)
    //     this.dialogRef.close(false);

    //   }
    // });
    // this._store.dispatch(new FindDuplicateZipCode(payload));

    // this.dialogRef.close(this.addNewZipCodeForm.value);

    // this.apiMessageService.currentApiStatus.subscribe(data => {
    //   if (data.type === 'DUPLICATE_ZIPCODE') {
    //     console.log('Res', data);

    //     if (data.payload == null) {
    //       this.dialogRef.close(this.addNewZipCodeForm.value);
    //     } else {
    //       this.dialogRef.close()
    //     }
    //     // this.router.navigate(['/store/zip-code-management/zone']);
    //   }
    // });
    // this._store.pipe(select('general')).subscribe(res => {
    //   if (res['duplicateZipCode'] && !this.alreadyLoaded) {
    //     this.duplicatedZipCodeArr = res['duplicateZipCode']['payload'] == null ? null : res['duplicateZipCode']['payload'];
    //     if (this.duplicatedZipCodeArr == null) {
    //       this.alreadyLoaded = true
    //       const payloaddata = {
    //         zipCode: this.addNewZipCodeForm.value['zipCode'],
    //         deliveryTat: this.addNewZipCodeForm.value['deliveryTat'],
    //         isCodAvailable: this.addNewZipCodeForm.value['isCodAvailable'],
    //         additionalDelivery: this.addNewZipCodeForm.value['additionalDelivery'],
    //         status: 1
    //       }
    //       console.log('NUll', payloaddata)
    //       this.dialogRef.close(payloaddata);
    //     } else {
    //       this.alreadyLoaded = true
    //       console.log('NUll Else', res['duplicateZipCode']['payload'])
    //       this.toastr.error('Duplicate Zipcode Available');
    //       this.dialogRef.close();
    //     }
    //   }

    //   console.log('Duplicate', res);
    // });

    // this.dialogRef.close(this.addNewZipCodeForm.value);
    // this._store.dispatch(
    //   new PostNewZipCode(this.addNewZipCodeForm.value, this.data.zoneId)
    // );
  }
}

@Component({
  selector: 'update-zip',
  templateUrl: 'update-zip.html',
})
export class updateZip implements OnInit {
  updateZipCodeForm: FormGroup;
  payloadData = null
  allZipCodes = []

  constructor(
    public _fb: FormBuilder,
    private _store: Store<any>,
    public dialogRef: MatDialogRef<updateZip>,
    private toastr: ToastrService,
    private _api: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data['zipcodes']) {
      this.allZipCodes = this.data['zipcodes'];
    }
    this.initialForm();
  }

  ngOnInit() {
    console.log('Ng Zone zip', this.data);
    this.updateData(this.data);
  }

  updateData(data) {
    this.updateZipCodeForm.patchValue({
      zipCode: data.payload.data['zipCode'],
      deliveryTat: data.payload.data['deliveryTat'].toString(),
      isCodAvailable: data.payload.data['isCodAvailable'],
      additionalDelivery: data.payload.data['additionalDelivery'].toString(),
      status: data.payload.data['status'],
    });
  }

  initialForm() {
    this.updateZipCodeForm = this._fb.group({
      zipCode: [, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      deliveryTat: [
        ,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^[0-9]/),
        ],
      ],
      isCodAvailable: [null, Validators.required],
      additionalDelivery: [
        ,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^[0-9]/),
        ],
      ],
      status: [, Validators.required],
    });
  }

  checkDuplicateZipCode() {
    const zipCode = this.updateZipCodeForm.get('zipCode').value;
    this.allZipCodes.forEach((curr, i) => {
      const index = _.findIndex([{ zipCode }], (c) => c.zipCode == curr.zipCode);
      if (index > -1) {
        this.updateZipCodeForm.get('zipCode').setErrors({
          duplicate: true
        });
      }
    });
  }

  async checkDuplicate(payload) {

    const data = await this._api.request(
      {
        url: `/api/geomaster/admin-api/zip/find-duplicate`,
        method: 'post',
        payload: payload
      },
      true
    );

    data.subscribe(res => {
      if (res['payload']) {
        this.toastr.error('Duplicate Zipcode Available')
        this.dialogRef.close();
        // return false
      } else {
        this.dialogRef.close({ data: this.payloadData, params: this.data.payload })
        // return true
      }
    })
  }

  updateZipcode() {
    console.log(this.updateZipCodeForm.value, this.data.payload.data);
    this.checkDuplicateZipCode();
    if (this.updateZipCodeForm.valid) {
      const data = {
        zipCode: this.updateZipCodeForm.value['zipCode'],
        deliveryTat: +this.updateZipCodeForm.value['deliveryTat'],
        isCodAvailable: this.updateZipCodeForm.value['isCodAvailable'],
        status: this.updateZipCodeForm.value['status'],
        additionalDelivery: +this.updateZipCodeForm.value['additionalDelivery'],
        // zoneId: {
        //   id: this.data.payload.data['zoneId']['id'],
        //   zoneName: this.data.payload.data['zoneId']['zoneName'],
        // },
      };
      this.dialogRef.close({ data: data, params: this.data.payload })
      // this._store.dispatch(new UpdateZipCode(data, this.data.payload.data['id']));
    }
  }
}
