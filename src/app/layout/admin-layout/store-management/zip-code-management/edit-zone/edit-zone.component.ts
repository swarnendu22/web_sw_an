import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { ActivatedRoute, Router } from '@angular/router';
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
  UpdateZipcodeByZone,
  StoreUserByZoneId,
} from 'src/app/actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { UpdateAttributeSetCellRenderedBtnComponent } from '../../../components/update-attribute-set-cell-rendered-btn/update-attribute-set-cell-rendered-btn.component';
import { UpdateCellRendererButtonComponent } from '../../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { updateZip } from '../add-new-zone/add-new-zone.component';
import { FileUploadAndPreviewComponent } from '../popup-components/file-upload-and-preview/file-upload-and-preview.component';
import { GetRegionsList } from 'src/app/actions/merchant-management.actions';
import { ToastrService } from 'ngx-toastr';
import { NewNadgeZoneZipcodeCellRendererComponent } from '../../../components/new-nadge-zone-zipcode-cell-renderer/new-nadge-zone-zipcode-cell-renderer.component';
import { EditFileUploadPreviewComponent } from '../popup-components/edit-file-upload-preview/edit-file-upload-preview.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.css']
})
export class EditZoneComponent implements OnInit, OnDestroy {

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
  loading = false
  updatedArray = []
  regionLists = [];
  duplicateZipCode = false
  fileUplodedBtn = false

  cancelShow = false


  zipZoneUserForm: FormGroup;
  public regionControl: FormControl = new FormControl();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private _router: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
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

    // if (!this.isEdit) {
    //   this._store.dispatch(new GetUserGroup())
    // }
    this._store.dispatch(new GetRegionsList());
    this.userByZoneArray.clear()
  }

  ngOnInit() {
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      this._zoneByIdData$ = res['zoneById'];
      // Set Values
      if (this._id && this._zoneByIdData$) {
        this.zoneUpdateValue();
      }
    });


    this._store.pipe(select<any, any>('storeManagement')).subscribe(res => {

      if (res['zipByZone']) {
        // this.rowData = res['zipByZone'];
        const payload = res['zipByZone'];
        const data = payload.filter(d => d.zoneId.id == this.zoneID);
        this.rowData = data;
      }

      if (res['usersByZoneId']) {
        this.usersListByZoneId = res.usersByZoneId.payload
        if (this.usersListByZoneId.length > 0 && this.userListNotLoaded) {
          this.userListNotLoaded = false
          this.usersListByZoneId.forEach(user => {
            this.userByZoneArray.push(this.createUser(user));
          });
        }
      }
    });
    this._store.pipe(select<any, any>('general')).subscribe(res => {
      console.log('General');
      if (res['zipcode']) {
        this.rowData = res['zipcode']['payload'];
      }
    });

    this._store.pipe(select<any, any>('merchantManagement')).subscribe(res => {

      if (res['regionsList']) {
        this.regionLists = res['regionsList']['payload']
      }

    });

    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.type === 'UPLOAD_NEW_ZONE') {
        console.log('Res', data);
        // this.router.navigate(['/store/zip-code-management/zone']);
      }
    });
  }

  get userByZoneArray() {
    return this.userByZoneIdForm.get('users') as FormArray;
  }

  get zipZoneUsersArray() {
    return this.addNewZoneForm.get('zipZoneUsers') as FormArray;
  }




  createUser({ deliveryTat = '', isCodAvailable = false, additionalDelivery = '', userGroupId, name, id }): FormGroup {
    // console.log('Create', deliveryTat, isCodAvailable, additionalDelivery, userGroupId, name)
    let userGroupName;
    if (!this.isEdit) {
      userGroupName = name
    } else {
      userGroupName = userGroupId.name
    }
    return this._fb.group({
      id: [id],
      userName: [{ value: userGroupName, disabled: true }],
      deliveryTat: [{ value: deliveryTat, disabled: true }, [Validators.required, Validators.maxLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      isCodAvailable: [{ value: isCodAvailable, disabled: true }, Validators.required],
      additionalDelivery: [{ value: additionalDelivery, disabled: true }, [Validators.required, Validators.maxLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      modifyToggle: [false],
      saveToggle: [true],
      userGroupId: this._fb.group({
        id: { value: userGroupId['id'], disabled: false }
      })
    });
  }

  modifyUser(i) {
    console.log('Modify', i);
    this.userByZoneArray.controls[i].get('modifyToggle').setValue(true);
    this.userByZoneArray.controls[i].get('saveToggle').setValue(false);
    this.userByZoneArray.controls[i].get('deliveryTat').enable();
    this.userByZoneArray.controls[i].get('isCodAvailable').enable();
    this.userByZoneArray.controls[i].get('additionalDelivery').enable();
  }

  cancelEdit(i) {
    this.userByZoneArray.controls[i].get('modifyToggle').setValue(false);
    this.userByZoneArray.controls[i].get('saveToggle').setValue(true);
    this.userByZoneArray.controls[i].get('deliveryTat').disable();
    this.userByZoneArray.controls[i].get('isCodAvailable').disable();
    this.userByZoneArray.controls[i].get('additionalDelivery').disable();
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
    this._store.dispatch(new UpdateUsersByZoneId(userObject.id, payload));
  }

  // Submit Fulfillment Form
  // submitZone() {
  // if (this._id) {
  //   // const payload = Object.assign({}, this.addStaticPageForm.value, {pageCode: parseInt(this.addStaticPageForm.get('pageCode').value)})
  //   console.log('change', this.addNewZoneForm.value);
  //   this._store.dispatch(new UpdateZone(this.addNewZoneForm.value, this._id));
  // } else {
  //   console.log('change', this.addNewZoneForm.value);
  //   this._store.dispatch(new PostNewZone(this.addNewZoneForm.value)); // Fulfillment Effects
  //   // this.addNewZoneForm.reset();
  //   // this.addNewZoneForm.disable();
  // }
  // }

  submitZone(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Submit Zone 1', this.addNewZoneForm.value, this.updatedArray)
    const updatedArray = []
    // console.log('Dirty', this.addNewZoneForm.get('zipZoneUsers').dirty)
    this.userByZoneArray.controls.forEach(control => {
      if (control.dirty) {
        updatedArray.push(control.value);
      }
    });
    console.log('Dirty', updatedArray)
    this.markFormGroupTouched(this.addNewZoneForm);
    const tempPayload = Object.assign({}, this.addNewZoneForm.value)
    // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
    const userGroup = []
    updatedArray.forEach(element => {
      delete element['modifyToggle']
      delete element['saveToggle']
      userGroup.push(element)
    });
    const zips = this.addNewZoneForm.value['zips']
    delete tempPayload['zipZoneUsers']
    delete tempPayload['zips']
    if (this.rowData.length == 0) {
      this.showMatHint = true
    }

    if (this.addNewZoneForm.valid && !this.showMatHint) {
      tempPayload['id'] = +this._id
      const payload = {
        zone: tempPayload,
        zipZoneUsers: userGroup.length > 0 ? userGroup : [],
        zips: this.updatedArray
      };
      console.log('Submit Zone Paylaod', payload)
      this._store.dispatch(new UpdateZone(tempPayload, this._id)); // Fulfillment Effects
      // this.router.navigate(['/store/zip-code-management/zone'])

    }
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
      additionalDelivery: [null
        ,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      status: [1, Validators.required],
      zipZoneUsers: this._fb.array([]),
    });
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

    // if (formName === 'addNewZoneForm') {
    //   this.apiMessageService.changeApiStatus({
    //     type: 'EDIT_ZONE_TOGGLE',
    //     status: !this.getFormDisableStats(formName),
    //   });
    // }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  zoneUpdateValue() {
    this.isFirstTime = true;
    console.log(this._zoneByIdData$[0]);
    this.addNewZoneForm.patchValue({
      zoneName: this._zoneByIdData$[0]['zoneName'],
      deliveryTat: this._zoneByIdData$[0]['deliveryTat'].toString(),
      isCodAvailable: this._zoneByIdData$[0]['isCodAvailable'],
      additionalDelivery: this._zoneByIdData$[0]['additionalDelivery'].toString(),
      status: this._zoneByIdData$[0]['status'],
      regionId: this._zoneByIdData$[0]['regionId']
    });

    this.addNewZoneForm.disable()
    // this.addNewZoneForm.get('zoneName').disable()
    // this.addNewZoneForm.get('deliveryTat').disable()
    // this.addNewZoneForm.get('isCodAvailable').disable()
    // this.addNewZoneForm.get('additionalDelivery').disable()
    // this.addNewZoneForm.get('status').disable()

    // this.zipZoneUsersArray.controls.forEach(control => {
    //   control.get('userName').disable()
    //   control.get('deliveryTat').disable()
    //   control.get('isCodAvailable').disable()
    //   control.get('additionalDelivery').disable()
    // })
  }

  onGridReady(event) {
    this.gridapi = event.api;
  }

  columnDefs = [
    {
      headerName: 'id',
      field: 'id',
      hide: true,
      valueGetter: params => {
        if (
          params.data.id == ''
        ) {
          return null;
        }
      },
    },
    {
      headerName: 'Zip Code',
      field: 'zipCode',
      filter: 'agTextColumnFilter',
      // editable: true,
      width: 150,
      cellRendererFramework: NewNadgeZoneZipcodeCellRendererComponent,

      // onCellValueChanged: params => {
      //   this.apiMessageService.changeApiStatus({
      //     type: 'EDIT_ZONE',
      //     status: true,
      //     payload: params,
      //   });
      // },
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
      // editable: true,
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
      // editable: true,
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
      type: 'ZONE_ZIPCODE_UPDATE',
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
    let dialogRef = this.dialog.open(editZipcode, {
      width: '400px',
      maxHeight: '500px',
      disableClose: true,
      autoFocus: false,
      data: { payload, zipcodes: this.rowData },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Result', result)
        this.rowData.find(data => {
          if (data.zipCode == result.zipCode) {
            console.log('Loop', result, data)
            this.duplicateZipCode = true
            this.toastr.error('Duplicate Zipcode Available')
            return true;
          }
        });
        if (!this.duplicateZipCode) {
          this.updatedArray.push(result.data)
          console.log('no duplicate', this.duplicateZipCode)
          console.log('Updated Array', this.updatedArray, result)
          // this.gridapi.updateRowData({ update: [result.params.rowData] });
          this._store.dispatch(new UpdateZipCode(result.data, result.zipId, this._id));
        }


      }
      // this._store.dispatch(new GetByIdZoneByZip(this._id));
      // this._store.dispatch(new GetZoneByFulfillmentCenterId(this._id));
    });
  }

  openZipDialog() {
    this.duplicateZipCode = false
    const dialogRef = this.dialog.open(addZipcode, {
      width: '400px',
      maxHeight: '500px',
      data: { zoneId: this.zoneID, zipcodes: this.rowData },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loading = true
      console.log('Close upload file', result, this.rowData);
      if (result) {

        this.rowData.find(data => {
          if (data.zipCode == result.zipCode) {
            this.duplicateZipCode = true
            console.log('duplicate', result, data);
            this.toastr.error('Duplicate Zipcode Available')
            return true;
          }
        });
        if (!this.duplicateZipCode) {
          // result['id'] = null/
          // this.updatedArray.push(result);
          const tempPayload = Object.assign({}, this.addNewZoneForm.value)
          // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
          delete tempPayload['zipZoneUsers']
          delete tempPayload['zips']

          tempPayload['id'] = +this._id
          const payload = {
            zone: tempPayload,
            zipZoneUsers: [],
            zips: [result]
          };
          console.log('Submit Zone Paylaod', payload)
          this._store.dispatch(new UpdateZipcodeByZone(payload, this._id)); // Fulfillment Effects
          // this.updatedArray.push(result.data)
          console.log('Updated Array', result)
          // this.gridapi.updateRowData({ update: [result.params.rowData] });
          // this._store.dispatch(
          //   new PostNewZipCode(result, this._id)
          // );
        }

      }
      // if (this.getZoneZips.length == result.length) {
      //   this.loading = false
      // }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  uploadFilePopup() {
    this.duplicateZipCode = false
    this.updatedArray = []
    let dialogRef = this.dialog.open(EditFileUploadPreviewComponent, {
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
        console.log('Close upload file', result);
        const payload = []
        // this.loading = true
        result.forEach(obj => {
          obj['id'] = null
          // obj['isNew'] = true
          payload.push(obj)
          this.updatedArray.push(obj);
        });

        if (this.rowData.length == 0) {
          let prevZipcode = ''
          result.find(curr => {
            if (curr.zipCode == prevZipcode) {
              this.duplicateZipCode = true
              this.toastr.error('Duplicate Zipcode Available')
              // this.loading = false
              return true;
            } else {
              prevZipcode = curr.zipCode
            }
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            // const updatedRow = this.rowData.concat(payload)
            // this.rowData = updatedRow;
            // this.fileUplodedBtn = true
            const tempPayload = Object.assign({}, this.addNewZoneForm.value)
            // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
            delete tempPayload['zipZoneUsers']
            delete tempPayload['zips']

            tempPayload['id'] = +this._id
            const payloadData = {
              zone: tempPayload,
              zipZoneUsers: [],
              zips: this.updatedArray
            };
            console.log('Submit Zone Paylaod', payloadData)
            this._store.dispatch(new UpdateZipcodeByZone(payloadData, this._id)); // Fulfillment Effects
            console.log('After Close ');
          }
        } else if (prevRowDataLength > currentRowLength) {

          this.rowData.find(data => {
            return result.find(curr => {
              if (curr.zipCode == data.zipCode) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')
                this.loading = false
                // console.log('Find', curr.zipCode, data.zipCode);
                return true;
              }
            });
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            const tempPayload = Object.assign({}, this.addNewZoneForm.value)
            // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
            delete tempPayload['zipZoneUsers']
            delete tempPayload['zips']

            tempPayload['id'] = +this._id
            const payloadData = {
              zone: tempPayload,
              zipZoneUsers: [],
              zips: this.updatedArray
            };
            console.log('Submit Zone Paylaod', payloadData)
            this._store.dispatch(new UpdateZipcodeByZone(payloadData, this._id)); // Fulfillment Effects
            console.log('After Close ');
            // const updatedRow = this.rowData.concat(payload)
            // this.rowData = updatedRow;
            // const updatedRow = this.rowData.concat(payload)
            // this.gridapi.setRowData(updatedRow)
            // this.addNewZoneForm.markAsDirty()
            // this.fileUplodedBtn = true

            // this.updatedArray = payload;
            // this.rowData.concat(result)
          }
        } else if (currentRowLength > prevRowDataLength) {
          result.find(data => {
            return this.rowData.find(curr => {
              if (curr.zipCode == data.zipCode) {
                this.duplicateZipCode = true

                this.toastr.error('Duplicate Zipcode Available')
                this.loading = false
                return true;
              }
            });
          });

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            // const updatedRow = this.rowData.concat(payload)
            // this.rowData = updatedRow;
            // this.addNewZoneForm.markAsDirty()
            // this.fileUplodedBtn = true
            // this.updatedArray = payload;
            // this.rowData.concat(result)
            const tempPayload = Object.assign({}, this.addNewZoneForm.value)
            // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
            delete tempPayload['zipZoneUsers']
            delete tempPayload['zips']

            tempPayload['id'] = +this._id
            const payloadData = {
              zone: tempPayload,
              zipZoneUsers: [],
              zips: this.updatedArray
            };
            console.log('Submit Zone Paylaod', payloadData)
            this._store.dispatch(new UpdateZipcodeByZone(payloadData, this._id)); // Fulfillment Effects
            console.log('After Close ');
          }
        } else if (currentRowLength == prevRowDataLength) {
          this.rowData.find(data => {
            return result.find(curr => {
              if (curr.zipCode == data.zipCode) {
                this.duplicateZipCode = true
                this.toastr.error('Duplicate Zipcode Available')
                this.loading = false;
                return true;
              }
            })
          })

          if (!this.duplicateZipCode) {
            this.duplicateZipCode = false
            // const updatedRow = this.rowData.concat(payload)
            // this.rowData = updatedRow;
            // this.addNewZoneForm.markAsDirty()
            // this.fileUplodedBtn = true

            // this.updatedArray = payload;
            // this.rowData.concat(result)
            const tempPayload = Object.assign({}, this.addNewZoneForm.value)
            // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
            delete tempPayload['zipZoneUsers']
            delete tempPayload['zips']

            tempPayload['id'] = +this._id
            const payloadData = {
              zone: tempPayload,
              zipZoneUsers: [],
              zips: this.updatedArray
            };
            console.log('Submit Zone Paylaod', payloadData)
            this._store.dispatch(new UpdateZipcodeByZone(payloadData, this._id)); // Fulfillment Effects
            console.log('After Close ');
          }
        } else {
          console.log('Not Condition Match')
        }
      } else {
        // this.toastr.error('Bulk uploaded data is not avaliable');
        console.log('Result not found')
      }
      // result.forEach(element => {
      //   this.rowData.push(element);
      // })
    });
  }

  saveUploadedZipcode() {
    console.log('File Uploaded')

    const tempPayload = Object.assign({}, this.addNewZoneForm.value)
    // const userGroup = this.addNewZoneForm.value['zipZoneUsers']
    delete tempPayload['zipZoneUsers']
    delete tempPayload['zips']

    tempPayload['id'] = +this._id
    const payload = {
      zone: tempPayload,
      zipZoneUsers: [],
      zips: this.updatedArray
    };
    console.log('Submit Zone Paylaod', payload)
    this._store.dispatch(new UpdateZipcodeByZone(payload, this._id)); // Fulfillment Effects
    this.fileUplodedBtn = false
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._store.dispatch(new StoreUserByZoneId(null))
    this.usersListByZoneId = []
    this.userByZoneArray.clear()

  }
}

@Component({
  selector: 'add-zipcode',
  templateUrl: 'add-zipcode.html',
})
export class addZipcode implements OnInit {
  addNewZipCodeForm: FormGroup;
  allZipCodes = []
  constructor(
    public _fb: FormBuilder,
    private _store: Store<storeManagementState>,
    private apiMessageService: ApiMessageService,
    public dialogRef: MatDialogRef<addZipcode>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data['zipcodes']) {
      this.allZipCodes = this.data['zipcodes'];
    }
    this.addNewZipCodeForm = this._fb.group({
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
      status: [1, Validators.required],
    });
  }

  ngOnInit() {
    // if (this.data.zoneId) {
    //   this.addNewZipCodeForm.get('zoneId').patchValue({
    //     id: this.data.zoneId,
    //   });
    // }
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

  submitPincode() {
    console.log(this.addNewZipCodeForm.value);
    this.checkDuplicateZipCode();
    if (this.addNewZipCodeForm.valid) {
      const data = {
        zipCode: this.addNewZipCodeForm.value['zipCode'],
        deliveryTat: this.addNewZipCodeForm.value['deliveryTat'],
        isCodAvailable: this.addNewZipCodeForm.value['isCodAvailable'],
        status: this.addNewZipCodeForm.value['status'],
        additionalDelivery: this.addNewZipCodeForm.value['additionalDelivery'],
        zoneId: { id: this.data.zoneId }
      };
      this.dialogRef.close(data);
    }
    // this._store.dispatch(
    //   new PostNewZipCode(this.addNewZipCodeForm.value, this.data.zoneId)
    // );
  }


}

@Component({
  selector: 'edit-zipcode',
  templateUrl: 'edit-zipcode.html',
})
export class editZipcode implements OnInit {
  updateZipCodeForm: FormGroup;
  allZipCodes = []
  constructor(
    public _fb: FormBuilder,
    private _store: Store<any>,
    public dialogRef: MatDialogRef<editZipcode>,
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
      id: [data.payload.data['id']],
      zipCode: data.payload.data['zipCode'],
      deliveryTat: data.payload.data['deliveryTat'].toString(),
      isCodAvailable: data.payload.data['isCodAvailable'],
      additionalDelivery: data.payload.data['additionalDelivery'].toString(),
      status: data.payload.data['status'] ? data.payload.data['status'] : 1,
    });
  }

  initialForm() {
    this.updateZipCodeForm = this._fb.group({
      id: [null],
      zipCode: [{ value: '', disabled: this.data.payload.data['id'] == null ? false : true }, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
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
      status: [1, Validators.required],
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

  updateZipcode() {
    console.log(this.updateZipCodeForm.value, this.data.payload.data);
    if (this.updateZipCodeForm.valid) {
      const payload = this.updateZipCodeForm.getRawValue();
      const data = {
        zipCode: payload['zipCode'],
        deliveryTat: payload['deliveryTat'],
        isCodAvailable: payload['isCodAvailable'],
        status: payload['status'],
        additionalDelivery: payload['additionalDelivery'],
        zoneId: this.data.payload.data.zoneId
      };

      if (this.data.payload.data.id) {

        delete data.zoneId.zoneName
      }

      console.log('Update', this.data.payload.data, data)
      this.dialogRef.close({ data: data, params: this.data.payload, zipId: payload['id'][0] })
    }

    // this._store.dispatch(new UpdateZipCode(data, this.data.payload.data['id']));
  }
}
