import { Component, ViewChild, OnInit, forwardRef } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import {
  categoryState,
  productAttributeState,
} from '../../../../../reducers/storemanagement.reducers';
import {
  GetAttributeGroupName,
  PostProductAttribute,
  GetByIdProductAttribute,
  GetByIdProductAttributeValue,
  UpdateProductAttribute,
  DeleteProductAttributes,
} from '../../../../../actions/storeManagement.action';
import { RequestService } from 'src/app/utils/request/request.service';
import { ActivatedRoute } from '@angular/router';

import { GetByIdAttributeGroup } from '../../../../../actions/storeManagement.action';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-attribute',
  templateUrl: './add-product-attribute.component.html',
  styleUrls: ['./add-product-attribute.component.css'],
})
export class AddProductAttributeComponent implements OnInit {
  attributeForm: FormGroup;
  public groupControl: FormControl = new FormControl();

  // Variables
  _id: number;
  colorValue;
  type: string;
  groupNameList: any[] = [];
  editData = null;
  editAttributeValue = [];
  tempAttributeValue = [];
  isEditType = false;
  prevTypeValue = null;
  initialType = null;
  attributeName = null;
  validAttributeName = null;
  groupId: number;
  alreadyChecked = false;

  COLOR_EMITTER: Subscription;
  DEFAULTCHECKBOX_EMITTER: Subscription;

  attributesItem: {
    id: string;
    default1: boolean;
    attributeValue: string;
    swatchColorCode: string;
    position: number;
  }[];

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _store: Store<productAttributeState>,
    private _api: RequestService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {
    this.initialForm();
    this._store.dispatch(new GetAttributeGroupName());
  }

  ngOnInit() {
    this._store.pipe(select('productAttributes')).subscribe(response => {
      this.groupNameList = response['attributeGroupName'];
    });

    this.attributeForm.get('name').valueChanges.subscribe(value => {
      this.attributeName = value;
      this.attributeForm.get('name').markAsDirty();
    });

    this.attributeForm.get('groupId').valueChanges.subscribe(val => {
      this.groupId = val;
    });
  }

  initialForm() {
    this.attributeForm = this._fb.group({
      groupId: [, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      code: [null],
      type: ['', Validators.required],
      option: ['', Validators.required],
      position: [, [Validators.required, Validators.maxLength(6)]],
      filterable: [false],
      searchable: [false],
      isVisibleOnFront: [false],
      isVisibleOnList: [false],
      promoRules: [false],
      isVariant: [false],
      maxLength: ['', Validators.maxLength(10)],
      groupIdTemp: [null],
      attributesValues: this._fb.array([], this.minSelectedCheckboxes()),
    });
  }

  async saveProductAttribute(event) {
    event.preventDefault();
    event.stopPropagation();
    const check = await this.checkAvalibilityService();
    check.subscribe(res => {
      if (+res) {
        // this.toaster.error('Attribute Name is Already Exist');
        // this.attributeName = 'Attribute Name is Already Exist';
        this.validAttributeName = 'Attribute Name is Already Exist';
      } else {
        this.attributeForm.get('name').patchValue(this.attributeName);
        if (this.attributeForm.valid) {
          console.log(
            'Save',
            this.attributeForm.value,
            this.attributeArray.length,
            this.attributeArray.value
          );
          if (this.attributeArray.length) {
            console.log('Type', this.type);
            this.attributeArray.controls.forEach(control => {
              if (!control.get('default1').value) {
                control.get('default1').patchValue(false);
              }
            });
            if (this.attributeArray.length === 0) {
              this.attributeArray.controls[0].get('default1').patchValue(false);
            }
          }
          const groupid = +this.attributeForm.get('groupId').value;
          this.attributeForm.get('groupIdTemp').patchValue(`${groupid}`);
          console.log('Update', this.attributeForm.value);
          const attPayload = this.attributeForm.get('attributesValues').value;

          let groupId = null;
          if(this.attributeForm.get('groupId').value) {
            groupId = {
              id: this.attributeForm.get('groupId').value
            }
          }
          this.attributeForm.get('groupId').patchValue(groupId);
          
          const attrValuPayload = Object.assign(
            {},
            this.attributeForm.getRawValue()
          );
          delete attrValuPayload['attributesValues'];
          const data = {
            mca: attrValuPayload,
            mcav: attPayload,
          };
          this._store.dispatch(new PostProductAttribute(JSON.stringify(data)));
        }
      }
    });
  }

  get attributeArray() {
    return this.attributeForm.get('attributesValues') as FormArray;
  }

  dropTable(event: CdkDragDrop<[]>) {
    const prevIndex = this.attributeArray.controls.findIndex(d => {
      return d === event.item.data;
    });
    console.log('Current', event.currentIndex, event.previousIndex);
    this.attributeArray.controls[event.currentIndex]
      .get('position')
      .patchValue(event.currentIndex);
    moveItemInArray(
      this.attributeArray.controls,
      prevIndex,
      event.currentIndex
    );
    if (event.previousIndex !== event.currentIndex) {
      this.attributeForm.markAsDirty();
    }

    if (event.currentIndex < event.previousIndex) {
      // Plus loop
      for (let i = event.currentIndex; i < this.attributeArray.length; i++) {
        this.attributeArray.controls[i].get('position').patchValue(i);
      }
    } else {
      // Minus loop
      for (let i = event.currentIndex; i >= 0; i--) {
        this.attributeArray.controls[i].get('position').patchValue(i);
      }
    }
  }

  changeAttributeName(i) {
    console.log('Name', i);
    this.attributeArray.controls[i].get('position').patchValue(i + 1);
  }

  addAttributeItem() {
    console.log('Add', this.attributeForm);
    this.attributeArray.setValidators(Validators.required);
    this.attributeArray.setValidators(this.minSelectedCheckboxes());
    if (this.attributeArray.length === 0) {
      this.attributeArray.push(this.createAttributeItem(true));
    } else {
      this.attributeArray.push(this.createAttributeItem());
    }
    if (this.type === 'SELECT') {
      this.attributeArray.controls.forEach(control => {
        control.get('swatchColorCode').patchValue('');
        control.get('swatchColorCode').disable();
        control.get('attributeValue').setValidators(Validators.required);
      });
    } else if (this.type === 'SWATCH') {
      this.attributeArray.controls.forEach(control => {
        control.get('swatchColorCode').enable();
        control.get('attributeValue').setValidators(Validators.required);
        control.get('swatchColorCode').setValidators(Validators.required);
      });
    }
    this.attributeArray.updateValueAndValidity();
  }
  removeItem(i) {
    const deleteDialogRefAttrVal = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { payload: { name: 'Attribute Value' } },
    });

    deleteDialogRefAttrVal.afterClosed().subscribe(result => {
      if (result) {
        this.attributeArray.removeAt(i);
        this.attributeForm.markAsDirty();
        for (let index = i; index < this.attributeArray.length; index++) {
          this.attributeArray.controls[index].get('position').patchValue(index);
        }
      }
    });
  }

  createAttributeItem(isDefault = false) {
    return this._fb.group({
      id: [null],
      default1: [isDefault],
      attributeValue: [''],
      swatchColorCode: [''],
      position: [],
    });
  }

  defaultAttributeValueCheck(event, i, attributeObj) {
    this.attributeArray.controls.forEach(obj => {
      obj.patchValue({ default1: false });
    });
    attributeObj.get('default1').patchValue(event.source.checked);
    this.attributeArray.controls[i].valueChanges.subscribe(() => {
      this.attributeForm.markAsDirty();
    });
    console.log(attributeObj);
  }

  async checkAvalibilityService() {
    return this._api.request(
      {
        method: 'get',
        url: `/api/ndh-product/attribute/admin-api/attributes/name/${this.attributeName}/group/${this.groupId}`,
      },
      true,
      false
    );
  }

  async checkAvail() {
    console.log('FF', this.attributeForm.get('name'))

    if (this.attributeForm.get('name').valid && this.attributeForm.get('groupId').valid) {
      const checkService = await this.checkAvalibilityService();
      checkService.subscribe(res => {
        if (+res) {
          // this.toaster.error('Attribute Name is Already Exist');
          // this.attributeName = 'Attribute Name is Already Exist';
          this.validAttributeName = 'Attribute Name is Already Exist';
        } else {
          // this.toaster.success('Attribute Name is Valid');
          this.validAttributeName = 'Attribute Name is Valid';
          this.alreadyChecked = true;
          this.attributeForm.get('name').patchValue(this.attributeName);
        }
      });
    } else {
      console.log('FF')
    }
  }

  colorPicker(e: string, i: number) {
    this.attributeArray.controls[i].patchValue({ swatchColorCode: e });
    this.attributeArray.controls[i].valueChanges.subscribe(() => {
      this.attributeForm.markAsDirty();
    });
  }

  // checkDisableState(){
  //   const groupId = this.groupId
  //   const name = this.attributeName
  //   const checked = this.alreadyChecked
  //   if(groupId && name) {
  //     return true
  //   } else if(checked){
  //     return
  //   }
  // }

  // typeChange(type) {
  //   console.log('Tye', type, this.attributeForm.contains('isVarient'));
  //   this.type = type;
  //   if (type === 'TEXT') {
  //     this.attributeForm.get('isVariant').patchValue(false);
  //     this.attributeForm.get('isVariant').disable();
  //     console.log('TEXT: Curr, Prev', type, this.prevTypeValue);
  //     if (this.getAlert(this.prevTypeValue, type)) {
  //       let ask = confirm(
  //         'Do you want to Change type of the attribute? If yes, then All the previous attributes are deleted!'
  //       );
  //       if (ask) {
  //         console.log('confirm if');
  //         this.prevTypeValue = type;
  //         this.attributeArray.clear();
  //         this.attributeArray.clearValidators();
  //         this.attributeArray.updateValueAndValidity();
  //       } else {
  //         console.log('confirm else');
  //         const preValue =
  //           this.prevTypeValue === 'SELECT' ? 'SWATCH' : 'SELECT';
  //         this.attributeForm.get('type').patchValue(preValue);
  //       }
  //     }
  //   } else if (type === 'IMAGE') {
  //     console.log('IMAGE: Curr, Prev', type, this.prevTypeValue);
  //     this.attributeForm.get('maxLength').patchValue('');
  //     this.attributeForm.get('maxLength').disable();
  //     if (this.getAlert(this.prevTypeValue, type)) {
  //       let ask = confirm(
  //         'Do you want to Change type of the attribute? If yes, then All the previous attributes are deleted!'
  //       );
  //       if (ask) {
  //         console.log('confirm if');
  //         this.prevTypeValue = type;
  //         this.attributeArray.clear();
  //         this.attributeArray.clearValidators();
  //         this.attributeArray.updateValueAndValidity();
  //       } else {
  //         console.log('confirm else');
  //         const preValue =
  //           this.prevTypeValue === 'SELECT' ? 'SWATCH' : 'SELECT';
  //         this.attributeForm.get('type').patchValue(preValue);
  //       }
  //     }
  //   } else if (type === 'SELECT' || type === 'SWATCH') {
  //     this.attributeArray.setValidators(Validators.required);
  //     this.attributeArray.setValidators(this.minSelectedCheckboxes());
  //     this.attributeForm.get('maxLength').patchValue('');
  //     this.attributeForm.get('maxLength').disable();
  //     this.attributeForm.get('isVariant').patchValue(false);
  //     this.attributeForm.get('isVariant').enable();
  //     if (type === 'SELECT') {
  //       console.log('SELECT: Curr, Prev', type, this.prevTypeValue);
  //       if (this.getAlert(this.prevTypeValue, type)) {
  //         let ask = confirm(
  //           'Do you want to Change type of the attribute? If yes, then All the previous attributes are deleted!'
  //         );
  //         if (ask) {
  //           console.log('confirm if');
  //           this.prevTypeValue = type;
  //           this.attributeArray.clear();
  //           this.attributeArray.clearValidators();
  //           this.attributeArray.updateValueAndValidity();
  //           this.addAttributeItem();
  //           this.attributeArray.controls.forEach(control => {
  //             control.get('swatchColorCode').patchValue('');
  //             control.get('swatchColorCode').disable();
  //             control.get('attributeValue').setValidators(Validators.required);
  //           });
  //         } else {
  //           console.log('confirm else');
  //           const preValue =
  //             this.prevTypeValue === 'SELECT' ? 'SWATCH' : 'SELECT';
  //           this.attributeForm.get('type').patchValue(preValue);
  //         }
  //       } else {
  //         if (
  //           (this.prevTypeValue === 'TEXT' || this.prevTypeValue === 'IMAGE') &&
  //           (type === 'SELECT' || type === 'SWATCH')
  //         ) {
  //           this.prevTypeValue = type;

  //           this.attributeArray.clear();
  //           this.attributeArray.clearValidators();
  //           this.attributeArray.updateValueAndValidity();
  //           this.addAttributeItem();
  //           this.attributeArray.controls.forEach(control => {
  //             control.get('swatchColorCode').patchValue('');
  //             control.get('swatchColorCode').disable();
  //             control.get('attributeValue').setValidators(Validators.required);
  //           });
  //         }
  //       }
  //       // this.prevTypeValue = type;
  //       // this.attributeArray.controls.forEach(control => {
  //       //   control.get('swatchColorCode').patchValue('');
  //       //   control.get('swatchColorCode').disable();
  //       //   control.get('attributeValue').setValidators(Validators.required);
  //       // });
  //     } else if (type === 'SWATCH') {
  //       console.log('SWATCH: Curr, Prev', type, this.prevTypeValue);

  //       if (this.getAlert(this.prevTypeValue, type)) {
  //         let ask = confirm(
  //           'Do you want to Change type of the attribute? If yes, then All the previous attributes are deleted!'
  //         );
  //         if (ask) {
  //           console.log('confirm if');
  //           this.prevTypeValue = type;
  //           this.attributeArray.clear();
  //           this.attributeArray.clearValidators();
  //           this.attributeArray.updateValueAndValidity();
  //           this.addAttributeItem();
  //           this.attributeArray.controls.forEach(control => {
  //             control.get('swatchColorCode').enable();
  //             control.get('swatchColorCode').setValidators(Validators.required);
  //             control.get('attributeValue').setValidators(Validators.required);
  //           });
  //         } else {
  //           console.log('confirm else');
  //           const preValue =
  //             this.prevTypeValue === 'SELECT' ? 'SWATCH' : 'SELECT';
  //           this.attributeForm.get('type').patchValue(preValue);
  //         }
  //       } else {
  //         if (
  //           (this.prevTypeValue === 'TEXT' || this.prevTypeValue === 'IMAGE') &&
  //           (type === 'SELECT' || type === 'SWATCH')
  //         ) {
  //           this.prevTypeValue = type;
  //           this.attributeArray.clear();
  //           this.attributeArray.clearValidators();
  //           this.attributeArray.updateValueAndValidity();
  //           this.addAttributeItem();
  //           this.attributeArray.controls.forEach(control => {
  //             control.get('swatchColorCode').enable();
  //             control.get('swatchColorCode').setValidators(Validators.required);
  //             control.get('attributeValue').setValidators(Validators.required);
  //           });
  //         }
  //       }
  //       // this.prevTypeValue = type;
  //       // this.attributeArray.controls.forEach(control => {
  //       //   control.get('swatchColorCode').enable();
  //       //   control.get('swatchColorCode').setValidators(Validators.required);
  //       //   control.get('attributeValue').setValidators(Validators.required);
  //       // });
  //     }
  //     this.attributeArray.updateValueAndValidity();
  //   }
  // }

  typeChangeTemp(type) {
    console.log('Tye', type, this.attributeForm.contains('isVarient'));
    this.type = type;
    if (type === 'TEXT') {
      this.attributeForm.get('isVariant').patchValue(false);
      this.attributeForm.get('isVariant').disable();
      if (this.attributeForm.get('maxLength').disabled) {
        this.attributeForm.get('maxLength').patchValue('');
        this.attributeForm.get('maxLength').enable();
      }
      console.log('TEXT: Curr', type);
      this.prevTypeValue = type;
      this.attributeArray.clear();
      this.attributeArray.clearValidators();
      this.attributeArray.updateValueAndValidity();
    } else if (type === 'IMAGE') {
      console.log('IMAGE: Curr, Prev', type, this.prevTypeValue);
      this.attributeForm.get('maxLength').patchValue('');
      this.attributeForm.get('maxLength').disable();
      this.prevTypeValue = type;
      this.attributeArray.clear();
      this.attributeArray.clearValidators();
      this.attributeArray.updateValueAndValidity();
    } else if (type === 'SELECT' || type === 'SWATCH') {
      this.attributeArray.setValidators(Validators.required);
      this.attributeArray.setValidators(this.minSelectedCheckboxes());
      this.attributeForm.get('maxLength').patchValue('');
      this.attributeForm.get('maxLength').disable();
      this.attributeForm.get('isVariant').patchValue(false);
      this.attributeForm.get('isVariant').enable();
      console.log('S', this.initialType);
      if (type === 'SELECT') {
        console.log('SELECT: Only', type, this.initialType);
        // this.prevTypeValue = type;
        this.attributeArray.clear();
        this.attributeArray.clearValidators();
        this.attributeArray.updateValueAndValidity();
        this.addAttributeItem();
        this.attributeArray.controls.forEach(control => {
          control.get('swatchColorCode').patchValue('');
          control.get('swatchColorCode').disable();
          control.get('attributeValue').setValidators(Validators.required);
          control.get('attributeValue').updateValueAndValidity();
        });
        // this.prevTypeValue = type;
        // this.attributeArray.controls.forEach(control => {
        //   control.get('swatchColorCode').patchValue('');
        //   control.get('swatchColorCode').disable();
        //   control.get('attributeValue').setValidators(Validators.required);
        // });
      } else if (type === 'SWATCH') {
        // this.prevTypeValue = type;
        console.log('SELECT: Only', type, this.initialType);
        this.attributeArray.clear();
        this.attributeArray.clearValidators();
        this.attributeArray.updateValueAndValidity();
        this.addAttributeItem();
        this.attributeArray.controls.forEach(control => {
          control.get('swatchColorCode').enable();
          control.get('swatchColorCode').setValidators(Validators.required);
          control.get('attributeValue').setValidators(Validators.required);
          control.get('attributeValue').updateValueAndValidity();
          control.get('swatchColorCode').updateValueAndValidity();

        });
        // this.prevTypeValue = type;
        // this.attributeArray.controls.forEach(control => {
        //   control.get('swatchColorCode').enable();
        //   control.get('swatchColorCode').setValidators(Validators.required);
        //   control.get('attributeValue').setValidators(Validators.required);
        // });
      }
      this.attributeArray.updateValueAndValidity();
    }
  }
  // Validatation
  minSelectedCheckboxes(): ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const selectedCount = formArray.controls
        .map(control => control.value['default1'])
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return selectedCount === 1 ? null : { notSelected: true };
    };
    return validator;
  }

  ngOnDestroy() {
    // this.COLOR_EMITTER.unsubscribe();
    // this.DEFAULTCHECKBOX_EMITTER.unsubscribe();
  }

  typeEmitter(type) {
    return type === 'SELECT' || type === 'SWATCH' ? true : false;
  }

  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.enabled) {
      formStats.disable();
      this.attributeForm.disable();
    } else {
      console.log('ELSE');

      formStats.enable();
      this.attributeForm.enable();
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }

  getAlert(prevValue, currentValue) {
    if (
      (prevValue === 'TEXT' || prevValue === 'IMAGE') &&
      (currentValue === 'SELECT' || currentValue === 'SWATCH')
    ) {
      console.log('If', prevValue, currentValue);
      return false;
    } else if (
      (prevValue === 'TEXT' || prevValue === 'IMAGE') &&
      (currentValue === 'TEXT' || currentValue === 'IMAGE')
    ) {
      return false;
    } else {
      return true;
    }
  }

  onPaste(e) {
    return false
  }

  // addProductAttributeForm: FormGroup;
  // attributesForm: FormGroup;
  // colorValue;
  // public defaultColDef;
  // public columnDefs;
  // public rowData;
  // groupNameList: any[] = [];
  // id = null;
  // disabledField = true;
  // valuesList = [];
  // type: string;
  // isEdit = false;

  // editData = null;
  // editAttributeValue = [];
  // hasAttributes = null;
  // typeSelectValue: string = null;
  // prevSelectValue: string = null;

  // public groupControl: FormControl = new FormControl();

  // dataSource = new BehaviorSubject<AbstractControl[]>([]);
  // displayedColumns: string[] = [
  //   'default',
  //   'value',
  //   'color',
  //   'position',
  //   'action',
  // ];
  // @ViewChild('table', { static: false }) table: MatTable<[]>;
  // disable: boolean;
  // createAttribute(): FormGroup {
  //   return this._formBuilder.group({
  //     attributeValue: ['', Validators.required],
  //     swatchColorCode: ['', Validators.required],
  //     default1: [true],
  //     position: [],
  //   });
  // }

  // // drop(event: CdkDragDrop<AbstractControl[]>) {
  // //   moveItemInArray(this.dataSource, event.currentIndex, event.previousIndex);
  // // }
  // constructor(
  //   private _formBuilder: FormBuilder,
  //   private _store: Store<categoryState>,
  //   private _route: ActivatedRoute,
  //   private _api: RequestService
  // ) {
  //   this.addProductAttributeForm = this._formBuilder.group({
  //     groupId: [null],
  //     name: ['', Validators.required],
  //     code: [null],
  //     type: ['', Validators.required],
  //     option: ['', Validators.required],
  //     position: [, Validators.required],
  //     filterable: [false],
  //     searchable: [false],
  //     isVisibleOnFront: [false],
  //     isVisibleOnList: [false],
  //     promoRules: [false],
  //     isVariant: [false],
  //     maxLength: [''],
  //     groupIdTemp: [, Validators.required],
  //   });
  //   this.attributesForm = this._formBuilder.group({
  //     attributes: this._formBuilder.array([]),
  //   });
  //   this.dataSource.next(this.attributeArray.controls);
  //   console.log('type', this.type);
  //   this.id = this._route.snapshot.params.id;
  //   if (this.id) {
  //     this.isEdit = true;
  //     this._store.dispatch(new GetByIdProductAttribute(this.id));
  //     this._store.dispatch(new GetByIdProductAttributeValue(this.id));
  //   }
  //   this._store.dispatch(new GetAttributeGroupName());
  //   this.columnDefs = [
  //     {
  //       headerName: 'Default',
  //       field: 'default1',
  //       resizable: true,
  //     },
  //     {
  //       headerName: 'Attribute Name',
  //       field: 'attributeValue',
  //       resizable: true,
  //     },
  //     { headerName: 'Swatch Color', field: 'swatchColorCode', width: 100 },
  //     { headerName: 'Position', field: 'position', width: 100 },
  //     { headerName: 'Status', field: 'status', width: 100 },
  //     {
  //       field: 'action',
  //       cellRendererFramework: CellRendererButtonComponent,
  //       width: 130,
  //       btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
  //       sortable: false,
  //       filter: false,
  //       floatingFiltersHeight: 0,
  //       resizable: true,
  //       pinned: 'right',
  //     },
  //   ];
  // }

  // ngOnInit() {
  //   // Getting Attribute Group name
  //   this._store.pipe(select('productAttributes')).subscribe(response => {
  //     this.groupNameList = response['attributeGroupName'];
  //   });

  //   // this.typeChanges();

  //   if (this.id) {
  //     this.addProductAttributeForm.get('groupIdTemp').disable();
  //     // this.addProductAttributeForm.get('code').disable();

  //     this.disabledField = true;
  //     this._store.pipe(select('productAttributes')).subscribe(response => {
  //       this.editData = response['getByProductAttribute'];
  //       this.editAttributeValue = response['getByIdProductAttributeValue'];
  //       console.log('Edit', this.editAttributeValue);

  //       if (this.editAttributeValue != null) {
  //         this.attributeArray.clear();
  //         this.editAttributeValue.forEach(attribute => {
  //           console.log('Attribute', attribute);
  //           const attributeNew = this._formBuilder.group({
  //             id: attribute['id'],
  //             attributeValue: [
  //               attribute['attributeValue'],
  //               Validators.required,
  //             ],
  //             swatchColorCode: [
  //               attribute['swatchColorCode'],
  //               Validators.required,
  //             ],
  //             default1: [attribute['default1']],
  //             position: [attribute['position']],
  //           });

  //           this.attributeArray.push(attributeNew);
  //           this.dataSource.next(this.attributeArray.controls);
  //         });
  //         // this.addProductAttributeForm.disable();
  //         // this.attributesForm.disable();
  //         if (this.type === 'SELECT') {
  //           this.attributeArray.controls.forEach(control => {
  //             control.get('swatchColorCode').disable();
  //           });
  //         }
  //       }
  //       this.hasAttributes = this.editAttributeValue
  //         ? this.editAttributeValue.length > 0
  //           ? true
  //           : false
  //         : false;
  //       console.log('Has Attributes', this.hasAttributes);
  //       if (this.editData != null) {
  //         console.log('res', this.editData[0]['groupId']['id']);
  //         this.addProductAttributeForm.setValue({
  //           groupId: this.editData[0]['groupId']['id'],
  //           groupIdTemp: this.editData[0]['groupId']['id'],
  //           name: this.editData[0]['name'],
  //           type: this.editData[0]['type'],
  //           position: this.editData[0]['position'],
  //           code: this.editData[0]['code'],
  //           option: this.editData[0]['option'],
  //           filterable: this.editData[0]['filterable'],
  //           searchable: this.editData[0]['searchable'],
  //           isVisibleOnFront: this.editData[0]['isVisibleOnFront'],
  //           isVisibleOnList: this.editData[0]['isVisibleOnList'],
  //           promoRules: this.editData[0]['promoRules'],
  //           isVariant: this.editData[0]['isVariant'],
  //           maxLength: this.editData[0]['maxLength'],
  //         });
  //         this.addProductAttributeForm.get('code').disable();
  //         this.prevSelectValue = this.addProductAttributeForm.get('type').value;

  //         this.type = this.editData[0]['type'];

  //         this.addProductAttributeForm.disable();
  //         this.attributesForm.disable();

  //         this._api
  //           .request(
  //             {
  //               method: 'get',
  //               url: `/api/ndh-product/attribute/admin-api/attributes/${this.id}/values`,
  //             },
  //             true
  //           )
  //           .subscribe(res => {
  //             this.valuesList = res['payload'];
  //             this.rowData = this.valuesList;
  //             // this.rowData = res['payload'];

  //             // console.log('Values List', this.valuesList, this.rowData);
  //           });
  //       }

  //       if (this.editAttributeValue) {
  //         this.rowData = this.editAttributeValue;
  //       }
  //     });
  //   }
  // }

  // get attributeArray(): FormArray {
  //   return <FormArray>this.attributesForm.get('attributes');
  // }

  // get validateControls() {
  //   return this.addProductAttributeForm.controls;
  // }

  // AddProductAttribute() {
  //   if (
  //     this.attributesForm.invalid &&
  //     (this.type === 'SELECT' || this.type === 'SWATCH')
  //   ) {
  //     return alert('Must add at least One attribute');
  //   }
  //   const groupid = +this.addProductAttributeForm.get('groupIdTemp').value;
  //   this.addProductAttributeForm.get('groupId').setValue({ id: groupid });
  //   this.addProductAttributeForm.get('groupIdTemp').setValue(`${groupid}`);
  //   const searchvalue = this.addProductAttributeForm.get('searchable').value;
  //   console.log('Search', searchvalue);
  //   if (searchvalue === true) {
  //     this.addProductAttributeForm.get('searchable').patchValue('1');
  //   } else {
  //     this.addProductAttributeForm.get('searchable').patchValue('0');
  //   }
  //   if (this.attributeArray.length == 1) {
  //     this.attributeArray.controls[0].patchValue({ default1: true });
  //   }

  //   let data = {
  //     mca: this.addProductAttributeForm.value,
  //     mcav: this.attributesForm.get('attributes').value,
  //   };
  //   // let data;
  //   // const attrValue = this.attributesForm.get('attributes').value;
  //   // if (attrValue) {
  //   //   data = {
  //   //     mca: this.addProductAttributeForm.value,
  //   //   };
  //   // } else {
  //   //   data = [
  //   //     {
  //   //       mca: this.addProductAttributeForm.value,
  //   //       mcav: this.attributesForm.get('attributes').value,
  //   //     },
  //   //   ];
  //   // }
  //   console.log('Vakye', JSON.stringify(data));
  //   this._store.dispatch(new PostProductAttribute(JSON.stringify(data)));
  // }

  // UpdateProductAttribute() {
  //   console.log('Product', this.addProductAttributeForm.value);
  //   console.log(
  //     'Attributes',
  //     this.attributesForm.value,
  //     this.attributeArray.value,
  //     this.attributeArray.length
  //   );
  //   // if (this.type === 'SELECT' || this.type === 'SWATCH') {
  //   if (
  //     this.editAttributeValue.length <= 0 &&
  //     this.attributeArray.length === 0
  //   ) {
  //     alert('You must add atleast one attribute');
  //   } else {
  //     // const groupid = +this.addProductAttributeForm.get('groupIdTemp').value;
  //     // this.addProductAttributeForm.get('groupId').setValue({ id: groupid });
  //     // this.addProductAttributeForm.get('groupIdTemp').setValue(`${groupid}`);
  //     const searchvalue = this.addProductAttributeForm.get('searchable').value;
  //     console.log('Search', searchvalue);
  //     if (searchvalue === true) {
  //       this.addProductAttributeForm.get('searchable').patchValue('1');
  //     } else {
  //       this.addProductAttributeForm.get('searchable').patchValue('0');
  //     }
  //     if (this.attributeArray.length == 1) {
  //       this.attributeArray.controls[0].patchValue({
  //         default1: true,
  //         position: 1,
  //       });
  //     }

  //     if (this.type === 'TEXT' || this.type === 'IMAGE') {
  //       this.attributeArray.clear();
  //     }

  //     // delete this.addProductAttributeForm.value['groupId'];
  //     // delete this.addProductAttributeForm.value['groupIdTemp'];
  //     // delete this.addProductAttributeForm.value['code'];

  //     const data = {
  //       mca: this.addProductAttributeForm.value,
  //       mcav: this.attributesForm.get('attributes').value,
  //     };

  //     console.log('Update/////', JSON.stringify(data));
  //     this._store.dispatch(
  //       new UpdateProductAttribute(JSON.stringify(data), this.id)
  //     );
  //     // console.log('SELECT/SWATCH', data);
  //     // this._store.dispatch(
  //     //   new UpdateProductAttribute(
  //     //     this.addProductAttributeForm.value,
  //     //     this.id
  //     //   )
  //     // );
  //   }
  //   //   } else {
  //   //     // const groupid = +this.addProductAttributeForm.get('groupIdTemp').value;
  //   //     // this.addProductAttributeForm.get('groupId').setValue({ id: groupid });
  //   //     // this.addProductAttributeForm.get('groupIdTemp').setValue(`${groupid}`);
  //   //     const searchvalue = this.addProductAttributeForm.get('searchable').value;
  //   //     console.log('Search', searchvalue);
  //   //     if (searchvalue === true) {
  //   //       this.addProductAttributeForm.get('searchable').patchValue('1');
  //   //     } else {
  //   //       this.addProductAttributeForm.get('searchable').patchValue('0');
  //   //     }
  //   //     // const data = {
  //   //     //   mca: this.addProductAttributeForm.value,
  //   //     // };
  //   //     delete this.addProductAttributeForm.value['groupId'];
  //   //     delete this.addProductAttributeForm.value['groupIdTemp'];
  //   //     delete this.addProductAttributeForm.value['code'];

  //   //     console.log('SELECT/SWATCH', this.addProductAttributeForm.value);

  //   //     this._store.dispatch(
  //   //       new UpdateProductAttribute(this.addProductAttributeForm.value, this.id)
  //   //     );
  //   //   }

  //   //   // console.log('Update', JSON.stringify(data));
  //   //   // this._store.dispatch(new PostProductAttribute(JSON.stringify(data)));
  // }

  // // Add new Attribute
  // addAttribute() {
  //   const attribute = this._formBuilder.group({
  //     id: null,
  //     attributeValue: ['', Validators.required],
  //     swatchColorCode: ['', Validators.required],
  //     default1: [true],
  //     position: [],
  //   });
  //   if (this.type === 'SELECT') {
  //     attribute.get('swatchColorCode').disable();
  //   } else {
  //     attribute.get('swatchColorCode').enable();
  //   }
  //   this.attributeArray.push(attribute);
  //   this.dataSource.next(this.attributeArray.controls);
  // }

  // // Remove Attribute
  // removeAttribute(index: number, element): void {
  //   console.log('remove', index, element);
  //   console.log('remove', this.attributeArray.controls[index].get('id'));
  //   const id = this.attributeArray.controls[index].get('id').value;
  //   if (this.attributeArray.length === 1) {
  //     alert('You need to add atleast one attribute!');
  //     return;
  //   }
  //   this.attributeArray.removeAt(index);
  //   this.dataSource.next(this.attributeArray.controls);
  //   this._store.dispatch(new DeleteProductAttributes(id));
  // }

  // // On change default selection
  // SelectDefault(i: number): void {
  //   this.attributeArray.controls.forEach(obj => {
  //     obj.patchValue({ default1: false });
  //   });
  //   this.attributeArray.controls[i].patchValue({ default1: true });
  // }

  // // Color Picker Function
  // colorPicker(e: string, i: number) {
  //   this.attributeArray.controls[i].patchValue({ swatchColorCode: e });
  //   this.attributeArray.controls[i].patchValue({ position: i });
  // }

  // // Selction Validation
  // // typeChanges() {
  // //   this.addProductAttributeForm.get('type').valueChanges.subscribe(type => {
  // //     console.log('Type', type);
  // //     if (type === 'TEXT') {
  // //       this.addProductAttributeForm.get('isVariant').disable();
  // //       this.addProductAttributeForm.get('maxLength').enable();
  // //     } else if (type === 'SELECT' || type === 'SWATCH') {
  // //       this.addProductAttributeForm.get('isVariant').enable();
  // //       this.addProductAttributeForm.get('maxLength').disable();
  // //     }
  // //   });
  // // }
  // dropTable(event: CdkDragDrop<[]>) {
  //   const prevIndex = this.attributeArray.controls.findIndex(d => {
  //     console.log(d);
  //     return d === event.item.data;
  //   });
  //   moveItemInArray(
  //     this.attributeArray.controls,
  //     prevIndex,
  //     event.currentIndex
  //   );
  //   this.table.renderRows();
  // }

  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  // }

  // onGridReady(event) {
  //   // this.store.pipe(select('productAttributes')).subscribe(res => {
  //   // this.rowData = res['productAttributes'];
  //   // this.rowData = this.valuesList;
  //   // });
  // }

  // typeChange(e: string) {
  //   this.type = e['value'];
  //   console.log('e', this.type);
  //   if (this.type === 'TEXT') {
  //     this.prevSelectValue = 'TEXT';
  //     this.addProductAttributeForm.get('isVariant').disable();
  //     this.addProductAttributeForm.get('maxLength').enable();

  //     this.attributeArray.clear();
  //   } else if (this.type === 'IMAGE') {
  //     this.prevSelectValue = 'IMAGE';

  //     this.addProductAttributeForm.get('isVariant').disable();
  //     this.addProductAttributeForm.get('maxLength').disable();

  //     this.attributeArray.clear();
  //   } else {
  //     if (this.id) {
  //       console.log('Edit mode');
  //       if (
  //         (this.prevSelectValue === 'TEXT' ||
  //           this.prevSelectValue === 'IMAGE') &&
  //         (this.type === 'SELECT' || this.type === 'SWATCH')
  //       ) {
  //         console.log('If', this.prevSelectValue, this.type);
  //         this.prevSelectValue = this.type;
  //         this.addProductAttributeForm.get('maxLength').disable();
  //         this.addAttribute();
  //       } else {
  //         console.log('Else', this.prevSelectValue, this.type);
  //         this.prevSelectValue = this.type;

  //         let ask = confirm(
  //           'Do you want to Change type of the attribute? If yes, then All the previous attributes are deleted!'
  //         );
  //         if (ask) {
  //           this.prevSelectValue = this.type;
  //           console.log('Ask', ask);
  //           this.attributeArray.clear();
  //           this.addAttribute();
  //         } else {
  //           console.log('else', this.prevSelectValue, this.type);
  //           const preValue =
  //             this.prevSelectValue === 'SELECT' ? 'SWATCH' : 'SELECT';
  //           this.addProductAttributeForm.get('type').patchValue(preValue);
  //           return;
  //         }
  //       }
  //     } else {
  //       // new product attribute
  //       if (this.type === 'SELECT') {
  //         this.attributeArray.clear();
  //         console.log('Seletc else block');
  //         this.addProductAttributeForm.get('isVariant').enable();
  //         this.addProductAttributeForm.get('maxLength').disable();
  //         this.addAttribute();
  //       } else {
  //         this.attributeArray.clear();
  //         this.addProductAttributeForm.get('isVariant').enable();
  //         this.addProductAttributeForm.get('maxLength').disable();
  //         this.addAttribute();
  //       }
  //     }
  //   }
  // }

  // delete() {
  //   const product_value = this.addProductAttributeForm.value;
  //   const attribute_value = this.attributesForm.value;
  //   console.log('DELETE', product_value, attribute_value);
  // }

  // isNumber(e) {
  //   const keyCode = e.keyCode;
  //   if (keyCode > 48 && keyCode < 57) {
  //     return true;
  //   }
  //   return false;
  // }

  // valid() {
  //   const product =
  //     this.addProductAttributeForm.valid && this.addProductAttributeForm.dirty;
  //   const dyna =
  //     this.type === 'SELECT' || this.type === 'SWATCH'
  //       ? this.attributesForm.valid && this.attributesForm.dirty
  //       : true;
  //   console.log('Valid', product, dyna, product && dyna);

  //   return product && dyna;
  //   // if (this.type === 'SELECT' || this.type === 'SWATCH') {
  //   //   return dyna;
  //   // } else {
  //   //   return product;
  //   // }
  // }

  // toggleFormDisable(formName) {
  //   const formStats = this[formName] as FormGroup;
  //   if (formStats.enabled) {
  //     console.log('IF');
  //     formStats.disable();
  //     this.attributesForm.disable();
  //   } else {
  //     console.log('ELSE');

  //     formStats.enable();
  //     if (this.type === 'SELECT') {
  //       console.log(
  //         'ty:::::::::',
  //         this.type,
  //         this.attributesForm.getRawValue()
  //       );
  //       this.attributesForm.enable();
  //       this.attributesForm.get('swatchColorCode').patchValue('');
  //       this.attributesForm.get('swatchColorCode').disable();
  //     }
  //     this.attributesForm.enable();
  //   }
  // }
  // getFormDisableStats(formName) {
  //   return this[formName].disabled;
  // }
}
