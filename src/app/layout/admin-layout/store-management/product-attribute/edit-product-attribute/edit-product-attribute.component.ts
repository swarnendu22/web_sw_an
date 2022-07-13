import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { productAttributeState } from 'src/app/reducers/storemanagement.reducers';
import { Store, select } from '@ngrx/store';
import { GetByIdCollection } from 'src/app/actions/collections.action';
import {
  GetByIdProductAttribute,
  GetByIdProductAttributeValue,
  GetAttributeGroupName,
  UpdateProductAttribute,
  DeleteProductAttributes,
} from 'src/app/actions/storeManagement.action';
import { RequestService } from 'src/app/utils/request/request.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-product-attribute',
  templateUrl: './edit-product-attribute.component.html',
  styleUrls: ['./edit-product-attribute.component.css'],
})
export class EditProductAttributeComponent implements OnInit {
  attributeForm: FormGroup;
  public groupControl: FormControl = new FormControl();
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
  showDefaultError = false;
  tempUnsaveAddedRow = [];

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
    public dialog: MatDialog
  ) {
    this.initialForm();
    this._id = this._route.snapshot.params.id;
    this._store.dispatch(new GetAttributeGroupName());
    if (this._id) {
      this._store.dispatch(new GetByIdProductAttribute(this._id));
      this._store.dispatch(new GetByIdProductAttributeValue(this._id));
    }
    this.attributeForm.disable();
  }

  ngOnInit() {
    this.setupAttributeForm();
  }
  setupAttributeForm() {
    this._store.pipe(select('productAttributes')).subscribe(response => {
      this.groupNameList = response['attributeGroupName'];
    });
    const er = this.attributeForm.get('attributesValues').getError('default1');
    this.attributeForm.get('groupId').valueChanges.subscribe(val => {
      this.groupId = val;
    });
    if (this._id) {
      this._store.pipe(select('productAttributes')).subscribe(response => {
        this.editData = response['getByProductAttribute'];
        this.editAttributeValue = response['getByIdProductAttributeValue'];
        this.tempAttributeValue = response['getByIdProductAttributeValue'];
        console.log('Edit', this.editAttributeValue);

        if (this.editData != null) {
          console.log('res main', this.editData);
          this.initialType = this.editData[0]['type'];
          this.isEditType =
            this.editData[0]['type'] === 'SELECT' ||
              this.editData[0]['type'] === 'SWATCH'
              ? true
              : false;
          this.attributeForm.patchValue({
            groupId: this.editData[0]['groupId']['id'],
            groupIdTemp: this.editData[0]['groupId']['id'],
            name: this.editData[0]['name'],
            type: this.editData[0]['type'],
            position: this.editData[0]['position'],
            code: this.editData[0]['code'],
            option: this.editData[0]['option'],
            status: this.editData[0]['status'],
            filterable: this.editData[0]['filterable'],
            searchable:
              this.editData[0]['searchable'] === 'true' ? true : false,
            isVisibleOnFront: this.editData[0]['isVisibleOnFront'],
            isVisibleOnList: this.editData[0]['isVisibleOnList'],
            promoRules: this.editData[0]['promoRules'],
            isVariant: this.editData[0]['isVariant'],
            maxLength: this.editData[0]['maxLength'],
          });
        }
        if (this.editAttributeValue != null) {
          this.attributeArray.clear();
          this.editAttributeValue.sort((a, b) => {
            if (a.position > b.position) {
              return 0;
            } else {
              return -1;
            }
          });
          console.log('res', this.editAttributeValue);
          this.editAttributeValue.forEach(control => {
            console.log('Inner', control);
            const {
              id,
              default1,
              attributeValue,
              swatchColorCode,
              position,
            } = control;

            this.attributeArray.push(
              this.createAttributeItemWithParams(
                id,
                default1,
                attributeValue,
                swatchColorCode,
                position
              )
            );
          });

          if (this.initialType === 'SELECT') {
            this.attributeArray.controls.forEach(control => {
              control.get('swatchColorCode').patchValue('');
              control.get('swatchColorCode').disable();
              control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
            });
            this.attributeArray.updateValueAndValidity();
          } else if (this.initialType === 'SWATCH') {
            this.attributeArray.controls.forEach(control => {
              control.get('swatchColorCode').enable();
              control.get('swatchColorCode').setValidators(Validators.required);
              control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
              control.get('swatchColorCode').updateValueAndValidity();
              control.get('attributeValue').updateValueAndValidity();
            });
            this.attributeArray.updateValueAndValidity();
          }

          this.attributeForm.disable();
        }
      });
    }
  }

  initialForm() {
    this.attributeForm = this._fb.group({
      groupId: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      code: [null],
      type: ['', [Validators.required]],
      option: ['', [Validators.required]],
      position: [, [Validators.required, Validators.maxLength(6)]],
      status: [{ value: '', disable: true }],
      filterable: [false],
      searchable: [false],
      isVisibleOnFront: [false],
      isVisibleOnList: [false],
      promoRules: [false],
      isVariant: [false],
      maxLength: ['', [Validators.maxLength(10)]],
      groupIdTemp: [null],
      attributesValues: this._fb.array([], this.minSelectedCheckboxes()),
    });
  }

  async UpdateProductAttribute(event) {
    event.preventDefault();
    event.stopPropagation();
    this.markFormGroupTouched(this.attributeForm);

    let minError;
    if (this.attributeForm.get('attributesValues').value.length) {
      if (this.attributeForm.get('attributesValues').getError('notSelected')) {
        minError = true;
      } else {
        minError = false;
      }
    } else {
      minError = false;
    }
    if (minError) {
      this.showDefaultError = true;
    } else if (this.attributeForm.dirty) {
      if (this.attributeArray.length) {
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
      if (this.attributeForm.get('groupId').value) {
        groupId = {
          id: this.attributeForm.get('groupId').value
        }
      }
      this.attributeForm.get('groupId').patchValue(groupId);

      const attrValuPayload = Object.assign({}, this.attributeForm.value);
      delete attrValuPayload['attributesValues'];

      const data = {
        mca: attrValuPayload,
        mcav: attPayload,
      };
      this._store.dispatch(
        new UpdateProductAttribute(JSON.stringify(data), this._id)
      );
    }
  }
  get attributeArray() {
    return this.attributeForm.get('attributesValues') as FormArray;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
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
      for (let i = event.currentIndex; i < this.attributeArray.length; i++) {
        this.attributeArray.controls[i].get('position').patchValue(i);
      }
    } else {
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
    console.log('Add', this.type);
    this.attributeArray.setValidators(Validators.required);
    this.attributeArray.setValidators(this.minSelectedCheckboxes());
    this.attributeArray.push(this.createAttributeItem());
    if (this.type ? this.type === 'SELECT' : this.initialType === 'SELECT') {
      this.attributeArray.controls.forEach(control => {
        control.get('swatchColorCode').patchValue('');
        control.get('swatchColorCode').disable();
        control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
        control.get('attributeValue').updateValueAndValidity();
      });
      this.attributeArray.updateValueAndValidity();
    } else if (this.type ? this.type === 'SWATCH' : this.initialType === 'SWATCH') {
      this.attributeArray.controls.forEach(control => {
        control.get('swatchColorCode').enable();
        control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
        control.get('swatchColorCode').setValidators(Validators.required);
        control.get('swatchColorCode').updateValueAndValidity();
        control.get('attributeValue').updateValueAndValidity();
      });
      this.attributeArray.updateValueAndValidity();
    }
  }
  removeItem(i) {
    const deleteDialogRefAttrVal = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { payload: { name: 'Attribute Value' } },
    });
    deleteDialogRefAttrVal.afterClosed().subscribe(result => {
      if (result) {
        this.attributeForm.markAsDirty();
        const id = this.attributeArray.controls[i].get('id').value;
        this.attributeArray.removeAt(i);
        if (id) {
          this._store.dispatch(new DeleteProductAttributes(id));
          for (let index = i; index < this.attributeArray.length; index++) {
            this.attributeArray.controls[index]
              .get('position')
              .patchValue(index);
          }
        }
      }
    });
  }

  createAttributeItem() {
    if (this.attributeArray.length === 0) {
      return this._fb.group({
        id: [null],
        default1: [true],
        attributeValue: [''],
        swatchColorCode: [''],
        position: [],
      });
    } else {
      return this._fb.group({
        id: [null],
        default1: [false],
        attributeValue: [''],
        swatchColorCode: [''],
        position: [],
      });
    }
  }
  createAttributeItemWithParams(
    id,
    default1,
    attributeValue,
    swatchColorCode,
    position
  ) {
    return this._fb.group({
      id: [id],
      default1: [default1],
      attributeValue: [attributeValue],
      swatchColorCode: [swatchColorCode],
      position: [position],
    });
  }
  defaultAttributeValueCheck(event, i, attributeObj) {
    this.attributeForm.markAsDirty();
    this.attributeArray.controls.forEach(obj => {
      obj.patchValue({ default1: false });
    });
    attributeObj.get('default1').patchValue(event.source.checked);
    this.attributeArray.controls[i].valueChanges.subscribe(() => {
      this.attributeForm.updateValueAndValidity();
    });
    this.showDefaultError = false;
  }
  colorPicker(e: string, i: number) {
    this.attributeArray.controls[i].patchValue({ swatchColorCode: e });
    this.attributeArray.controls[i].valueChanges.subscribe(() => {
      this.attributeForm.markAsDirty();
    });
  }
  typeChangeTemp(type) {
    console.log('Tye', type, this.attributeArray);
    this.type = type;
    if (type === 'TEXT') {
      this.attributeForm.get('isVariant').patchValue(false);
      this.attributeForm.get('isVariant').disable();
      if (this.attributeForm.get('maxLength').disabled) {
        this.attributeForm.get('maxLength').patchValue('');
        this.attributeForm.get('maxLength').enable();
      }
      console.log('TEXT: Curr', type);
      this.isEditType = false;
      this.prevTypeValue = type;
      this.attributeArray.clear();
      this.attributeArray.clearValidators();
      this.attributeArray.updateValueAndValidity();
    } else if (type === 'SELECT') {
      this.attributeArray.setValidators(Validators.required);
      this.attributeArray.setValidators(this.minSelectedCheckboxes());
      this.attributeForm.get('maxLength').patchValue('');
      this.attributeForm.get('maxLength').disable();
      this.attributeForm.get('isVariant').patchValue(false);
      this.attributeForm.get('isVariant').enable();

      if (this.type === 'SELECT' && this.initialType === 'SWATCH') {
        this.attributeArray.clear()
        this.editAttributeValue.sort((a, b) => {
          if (a.position > b.position) {
            return 0;
          } else {
            return -1;
          }
        });
        this.editAttributeValue.forEach(control => {
          const {
            id,
            default1,
            attributeValue,
            swatchColorCode,
            position,
          } = control;
          this.attributeArray.push(
            this.createAttributeItemWithParams(
              id,
              default1,
              attributeValue,
              swatchColorCode,
              position
            )
          );
        });

        this.attributeArray.controls.forEach(control => {
          control.get('swatchColorCode').patchValue('');
          control.get('swatchColorCode').disable();
          control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
        });
        this.attributeArray.updateValueAndValidity();

      }
    } else if (type === 'SWATCH') {
      this.attributeArray.setValidators(Validators.required);
      this.attributeArray.setValidators(this.minSelectedCheckboxes());
      this.attributeForm.get('maxLength').patchValue('');
      this.attributeForm.get('maxLength').disable();
      this.attributeForm.get('isVariant').patchValue(false);
      this.attributeForm.get('isVariant').enable();


      if (this.type === 'SWATCH' && this.initialType === 'SWATCH') {

        this.attributeArray.clear()
        this.editAttributeValue.sort((a, b) => {
          if (a.position > b.position) {
            return 0;
          } else {
            return -1;
          }
        });
        this.editAttributeValue.forEach(control => {
          const {
            id,
            default1,
            attributeValue,
            swatchColorCode,
            position,
          } = control;
          this.attributeArray.push(
            this.createAttributeItemWithParams(
              id,
              default1,
              attributeValue,
              swatchColorCode,
              position
            )
          );
        });
        this.attributeArray.controls.forEach(control => {
          control.get('swatchColorCode').enable();
          control.get('swatchColorCode').setValidators(Validators.required);
          control.get('attributeValue').setValidators([Validators.required, Validators.maxLength(255)]);
          control.get('swatchColorCode').updateValueAndValidity();
          control.get('attributeValue').updateValueAndValidity();
        });
        this.attributeArray.updateValueAndValidity();
      }

      console.log('SWATCH Block', this.attributeArray.status)
    }
  }

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
  }

  typeEmitter(type) {
    return type === 'SELECT' || type === 'SWATCH' ? true : false;
  }

  toggleFormDisable(formName, toggleType) {
    const formStats = this[formName] as FormGroup;
    if (formStats.enabled) {
      formStats.disable();
      console.log('U', this.attributeForm);
      this.attributeForm.disable();
    } else {
      console.log('ELSE');
      formStats.enable();
      console.log('else', this.attributeForm);
      this.attributeForm.enable();
      this.attributeForm.get('status').disable();
      if (this.editData[0]['type'] === 'SELECT') {
        this.attributeForm.get('maxLength').disable()
        console.log('Hello', this.editData[0]['type']);
        this.attributeArray.controls.forEach(control => {
          control.get('swatchColorCode').disable();
        });
      } else if (this.editData[0]['type'] === 'SWATCH') {
        this.attributeForm.get('maxLength').disable()
      } else {
        console.log('else', this.editData[0]['type']);
      }
    }
    if (toggleType == 'cancel') {
      this.setupAttributeForm();
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
    } else if (
      (prevValue === 'SELECT' || prevValue === 'SWATCH') &&
      (currentValue === 'SELECT' || currentValue === 'SWATCH')
    ) {
      return false;
    } else {
      return true;
    }
  }

  async checkAvalibilityService() {
    const name = this.attributeForm.get('name').value;
    console.log(this.attributeForm.get('groupId').value);
    const groupId = this.attributeForm.get('groupId').value;
    this.attributeName = name;

    return this._api.request(
      {
        method: 'get',
        url: `/api/ndh-product/attribute/admin-api/attributes/name/${name}/group/${groupId}`,
      },
      true,
      false
    );
  }

  async checkAvail() {
    if (this.attributeForm.get('name').valid && this.attributeForm.get('groupId').valid) {
      const checkService = await this.checkAvalibilityService();
      checkService.subscribe(res => {
        if (+res) {
          // this.toaster.error('Attribute Name is Already Exist');
          // this.attributeName = 'Attribute Name is Already Exist';
          this.validAttributeName = 'Attribute Name already exists.';
        } else {
          // this.toaster.success('Attribute Name is Valid');
          this.validAttributeName = 'Attribute Name is Valid';
          this.alreadyChecked = true;
          this.attributeForm.get('name').patchValue(this.attributeName);
        }
      });
    }
  }

  groupChange() {
    this.groupId = this.attributeForm.get('groupId').value;
    this.attributeArray.clearValidators();
    this.attributeForm.markAsDirty();
    this.attributeForm.updateValueAndValidity();
    this.attributeArray.updateValueAndValidity();
  }

  ngOnDestory() {
    this.groupId = null;
  }

  onPaste(e) {
    return false
  }
}
