import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RequestService } from 'src/app/utils/request/request.service';
import { ActivatedRoute } from '@angular/router';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Store, select } from '@ngrx/store';
import { categoryState } from 'src/app/reducers/storemanagement.reducers';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  GetAttributeGroupName,
  GetByIdAttributeGroup,
  GetAttributeSetAttributes,
  GetByIdAttributeSet,
  UpdateProductAttributeOnPosition,
  UpdateAttributeSet,
  PostAttributeSet,
  GetByIdProductAttributeValue,
  PostAttributeSetRel,
} from 'src/app/actions/storeManagement.action';
import { CellRendererProductAttributePopupComponent } from '../../../components/cell-renderer-product-attribute-popup/cell-renderer-product-attribute-popup.component';
import { UpdateAttributeSetCellRenderedBtnComponent } from '../../../components/update-attribute-set-cell-rendered-btn/update-attribute-set-cell-rendered-btn.component';

@Component({
  selector: 'app-edit-product-attribute-set',
  templateUrl: './edit-product-attribute-set.component.html',
  styleUrls: ['./edit-product-attribute-set.component.css'],
})
export class EditProductAttributeSetComponent implements OnInit {
  addAttributeForm: FormGroup;
  keyword;
  keywordStatus: string;
  _id: number;
  isEdit = false;
  groupList: any[] = [];
  attributeList: any[] = [];
  attributeID: number = null;
  editData = null;
  validKeyword: string = null;
  isNew = true;
  isSubmitAttribute = false;
  isGroupSelected = false;
  checkAvail = false;
  gridOptions: any;
  cellPayload;
  attributePayload: any;
  isEditSave = false;
  columnDefs = [];
  rowData: any[];

  public groupControl: FormControl = new FormControl();
  public attributeControl: FormControl = new FormControl();
  public groupResetControl: FormControl = new FormControl();
  public attributeResetControl: FormControl = new FormControl();

  isSubmitFinal: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _api: RequestService,
    private _route: ActivatedRoute,
    private apiMessageService: ApiMessageService,
    private _store: Store<categoryState>,
    public dialog: MatDialog
  ) {
    this.columnDefs = [
      {
        headerName: 'Attribute Name',
        field: 'name',
        filter: 'agTextColumnFilter',
        resizable: true,
        minWidth: 50,
        rowDrag: true,
      },
      {
        headerName: 'Type ',
        field: 'type',
        width: 80,
        resizable: true,
      },
      {
        width: 50,
        resizable: true,
        cellRendererFramework: CellRendererProductAttributePopupComponent,
      },
      {
        headerName: 'Mandatory',
        width: 130,
        field: 'option',
        resizable: true,
        editable: true,
        valueGetter: params => {
          if (params.data['option'] === 'M') {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Variant',
        width: 100,
        field: 'isVariant',
        resizable: true,
        valueGetter: params => {
          if (params.data.isVariant === true || params.data.isVariant === 'Yes') {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        editable: params => {
          const { type } = params.data;
          console.log('Edit', params.data);
          if (type === 'TEXT' || type === 'IMAGE') {
            return false;
          } else {
            return true;
          }
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Group Name',
        field: 'attribute.groupId.groupName',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'Length',
        field: 'maxLength',
        filter: 'agTextColumnFilter',
        resizable: true,
        minWidth: 30,
        valueGetter: params => {
          if (params.data.maxLength) {
            return params.data.maxLength;
          } else {
            return '';
          }
        },
        editable: params => {
          const { type } = params.data;
          if (type === 'SELECT' || type === 'SWATCH') {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        headerName: 'Filterable',
        minWidth: 30,
        field: 'filterable',
        resizable: true,
        valueGetter: params => {
          if (
            params.data.filterable === true ||
            params.data.filterable === 'Yes'
          ) {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Searchable',
        minWidth: 30,
        field: 'searchable',
        resizable: true,
        valueGetter: params => {
          if (
            params.data.searchable === '1' ||
            params.data.searchable === 'Yes'
          ) {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Visible On Store',
        minWidth: 30,
        field: 'isVisibleOnFront',
        resizable: true,
        valueGetter: params => {
          if (
            params.data.isVisibleOnFront === true ||
            params.data.isVisibleOnFront === 'Yes'
          ) {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Visible On List',
        minWidth: 50,
        field: 'isVisibleOnList',
  
        valueGetter: params => {
          if (
            params.data.isVisibleOnList === true ||
            params.data.isVisibleOnList === 'Yes'
          ) {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        editable: true,
        resizable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Action',
        field: 'action',
        parentID: this._id,
        cellRendererFramework: UpdateAttributeSetCellRenderedBtnComponent,
        cellRendererParams: {
          onDeleteClick: this.deleteRow.bind(this),
          onUpdateClick: this.updateRow.bind(this),
        },
        minWidth: 150,
        // btnName: [
        //   { name: 'Update', btnTxtColor: '#fff', btnColor: '#716aca' },
        //   { name: 'Delete', btnTxtColor: '#fff', btnColor: '#F4516C' },
        // ],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
      },
    ];
    this._id = this._route.snapshot.params.id;
    if (this._id) {
      this.isNew = false;
      this._store.dispatch(new GetAttributeGroupName());
      // this._store.dispatch(new GetByIdAttributeGroup(this._id));
      this._store.dispatch(new GetAttributeSetAttributes(this._id));
      this._store.dispatch(new GetByIdAttributeSet(this._id));
    }

    this.initialForm();
  }

  ngOnInit() {
    if (this._id) {
      this.addAttributeForm.disable();
      this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
        this.editData = res['getAttributeSetById'];

        if (this.editData != null) {
          this.addAttributeForm.setValue({
            name: this.editData[0]['name'],
            description: this.editData[0]['description'],
            label: this.editData[0]['label'],
            status: this.editData[0]['status'],
          });
          this.keyword = this.editData[0]['name'];
          this.isSubmitAttribute = true;
          this.isSubmitFinal = true;
        }
      });

      this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
        this.groupList = res['attributeGroupName'];
        if (res['getAttributeSetAttributes']) {
          const attributes = res['getAttributeSetAttributes'];
          const activeAttributes = attributes.filter(val => {
            return val === 'ACTIVE';
          });
          activeAttributes.sort((a, b) => {
            if (a.position > b.position) {
              return 0;
            } else {
              return -1;
            }
          });
          this.rowData = attributes;
          console.log('After Sort', this.rowData);
        }
      });
    }
  }

  
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  valueChange(e) {
    console.log('Value', e);
  }

  deleteRow(e) {
    console.log('Delete', e, this.gridOptions);
    this.gridOptions.updateRowData({ remove: [e.rowData], removeIndex: e.id });
  }

  updateRow(e) {
    console.log('Update', e, this.gridOptions);
    this.gridOptions.updateRowData({ update: [e.rowData] });
  }

  onCellClicked(e) {
    this.cellPayload = Object.assign({}, e.data, { value: e.value });
  }

  onCellValueChanged(e) {
    console.log('Cell Changed', e);
    if (e.newValue != e.oldValue) {
      this.apiMessageService.changeApiStatus({
        type: 'CHANGE_VALUE',
        status: true,
        payload: e,
      });
    }
  }

  onRowDragEnd(e) {
    // console.log('Row Dragged', e);
    const currPosition = e.overIndex;
    const payload = e.node.data;
    const dataValue = Object.assign({}, payload, {
      position: currPosition + 1,
    });
    delete dataValue['id'];
    const data = {
      mca: dataValue,
      mcav: [],
    };
    console.log('Row Update', JSON.stringify(data));
    this._store.dispatch(
      new UpdateProductAttributeOnPosition(JSON.stringify(data), payload['id'])
    );
  }

  onGridReady(event) {
    this.gridOptions = event.api;
    window.addEventListener('resize', function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  initialForm() {
    this.addAttributeForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      label: ['', Validators.required],
      status: ['0'],
    });
  }

  updateProductAttributeSet() {
    console.log(this.addAttributeForm.value);
    if (this._id) {
      this._store.dispatch(
        new UpdateAttributeSet(this.addAttributeForm.value, this._id)
      );

      this.isEditSave = true;
      this.addAttributeForm.disable();
    } else {
      this._store.dispatch(new PostAttributeSet(this.addAttributeForm.value));
      this.apiMessageService.currentApiStatus.subscribe(data => {
        if (data.type === 'GET_NEW_ATTRIBUTE_SET_BY_ID') {
          this.isSubmitAttribute = true;
          this.isSubmitFinal = true;
          this.addAttributeForm.disable();
          this._id = +data.payload;
          this._store.dispatch(new GetAttributeGroupName());
        }
        this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
          this.groupList = res['attributeGroupName'];
        });
      });
    }
  }

  addAttribute() {
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.groupList = res['getAttributeSetAttributes'];
    });
  }

  getUniqueValue(e) {
    // console.log('e', e);
    this.keyword = e;
  }

  checkAvailibility() {
    const keyword = this.keyword.replace(/[^a-z0-9]+/gi, '-');
    return this._api
      .request(
        {
          method: 'get',
          url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set-name/${keyword}`,
        },
        true
      )
      .subscribe(res => {
        if (res) {
          this.keywordStatus = 'Keyword is Already Exist';
        } else {
          this.keywordStatus = 'Keyword is Valid';
          this.validKeyword = keyword;
          this.addAttributeForm.get('name').patchValue(keyword);
        }
      });
  }

  selectGroup(id: number) {
    console.log('Selct Group', id);
    this._store.dispatch(new GetByIdAttributeGroup(id, this._id));
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeList = res['getByAttributeGroupName'];
    });
    this.isGroupSelected = true;
  }

  selectAttribute(id: number, payload) {
    console.log('Attribute id', id, this._id);
    this.attributeID = id;
    this._store.dispatch(new GetByIdProductAttributeValue(id));
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributePayload = res['getByIdProductAttributeValue'];
      console.log('Attribute Value', this.attributePayload);
    });
    // this.attributePayload = payload;
  }

  submitFinalAttributeSetRel() {
    console.log('Submit id', this.attributeID, this._id);
    this._store.dispatch(new PostAttributeSetRel(this._id, this.attributeID));
    this.isSubmitFinal = true;
    console.log('Submit post', this.isSubmitFinal);
    this.attributeResetControl.reset();
    this.groupResetControl.reset();
    this.isGroupSelected = false;
    this.attributeID = null;
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.rowData = res['getAttributeSetAttributes']
        ? res['getAttributeSetAttributes']
        : '';
    });
  }

  viewAttributeDetails() {
    console.log('View', this.attributePayload);
    this.dialog.open(ViewAttributeComponent, {
      width: '800px',
      maxHeight: '500px',
      data: { attributePayload: this.attributePayload },
    });
  }

  editAttribute() {
    this.isEdit = true;
    // this.isNew = true;
    this.checkAvail = true;
    this.addAttributeForm.enable();
    this.apiMessageService.changeApiStatus({
      type: 'EDIT_ATTRIBUTE_SET',
      status: true,
      payload: { disable: this.isEdit, parentID: this._id },
    });
  }

  cancelEdit() {
    this.isEdit = false;
    this.addAttributeForm.disable();
    this.apiMessageService.changeApiStatus({
      type: 'EDIT_ATTRIBUTE_SET',
      status: true,
      payload: { disable: this.isEdit, parentID: this._id },
    });
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

@Component({
  selector: 'view-attribute',
  templateUrl: 'view-attribute-data.html',
})
export class ViewAttributeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Ng', this.data);
  }
}
