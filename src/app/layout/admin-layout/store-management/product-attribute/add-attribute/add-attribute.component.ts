import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  Validator,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { RequestService } from '../../../../../utils/request/request.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import {
  GetByIdAttributeGroup,
  GetAttributeGroupName,
  GetAttributeSetAttributes,
  UpdateAttributeSet,
  PostAttributeSet,
  PostAttributeSetRel,
  GetByIdAttributeSet,
  UpdateProductAttributeOnPosition,
  GetByIdProductAttributeValue,
  UpdateAttributePositions,
  GetAttributesByGroupId,
} from '../../../../../actions/storeManagement.action';
import { UpdateAttributeSetCellRenderedBtnComponent } from '../../../components/update-attribute-set-cell-rendered-btn/update-attribute-set-cell-rendered-btn.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CellRendererProductAttributePopupComponent } from '../../../components/cell-renderer-product-attribute-popup/cell-renderer-product-attribute-popup.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomLoadingOverlayComponent } from '../../../components/custom-loading-overlay/custom-loading-overlay.component';
import { GridOptions } from 'ag-grid-community';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ViewAttributeComponent } from '../edit-product-attribute-set/edit-product-attribute-set.component';
import { CustomValidations } from 'src/app/utils/validations/custom.validations';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css'],
})
export class AddAttributeComponent implements OnInit {
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
  gridColumnApi: any;
  editType;
  editPayload: any = null;
  editingRowIndex;
  cellPayload;
  columnDefs = [];
  attributePayload: any;
  isEditSave = false;
  groupId: number;
  rowData: any[];
  loading = false

  public frameworkComponents;
  public loadingOverlayComponent;
  public loadingCellRendererParams;

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
    public dialog: MatDialog,
    private ag: AgGridOptions,
    private customValidator: CustomValidations
  ) {
    this.columnDefs = [
      {
        headerName: 'Group',
        field: 'attribute.groupId.groupName',
        resizable: true,
      },
      {
        headerName: 'Label',
        field: 'name',
        filter: 'agTextColumnFilter',
        resizable: true,
        rowDrag: true,
        width: 350,
      },
      {
        headerName: 'Type ',
        field: 'type',
        resizable: true,
      },
      {
        width: 150,
        resizable: true,
        cellRendererFramework: CellRendererProductAttributePopupComponent,
      },
      {
        headerName: 'Mandatory',
        field: 'option',
        resizable: true,
        valueGetter: params => {
          if (params.data['option'] === 'M') {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        valueSetter: params => {
        },
        onCellValueChanged: params => {
          console.log('cellvalue', params);
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        cellEditor: 'select',
        cellEditorParams: params => {
          const { type } = params.data;
          if (type === 'TEXT' || type === 'IMAGE') {
            return {
              values: 'Non Editable',
            };
          } else {
            return {
              values: ['Yes', 'No'],
            };
          }
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Variant',
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
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Filterable',
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
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: ['Yes', 'No'],
        },
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Searchable',
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
          this.apiMessageService.changeApiStatus({
            type: 'CHANGE_VALUE',
            status: true,
            payload: params,
          });
        },
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
          startEditing: this.startEditing.bind(this),
          stopEditing: this.stopEditing.bind(this),
          parentId: this._id,
        },
        width: 250,
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
      },
    ];

    this._id = this._route.snapshot.params.id;
    if (this._id) {
      this.isNew = false;
      this._store.dispatch(new GetAttributeGroupName());
      this._store.dispatch(new GetAttributeSetAttributes(this._id));
      this._store.dispatch(new GetByIdAttributeSet(this._id));
    }

    this.initialForm();
    this.frameworkComponents = {
      customLoadingOverlay: CustomLoadingOverlayComponent,
    };
    this.loadingOverlayComponent = 'customLoadingOverlay';
    this.loadingCellRendererParams = {
      loadingMessage: 'Click Add Button to Continue',
    };
  }

  get f() { return this.addAttributeForm.controls; }

  ngOnInit() {
    this.setAttrSetForm();
  }
  setAttrSetForm() {
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
          this.rowData = attributes;
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
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributePayload = res['getByIdProductAttributeValue'];
      console.log('Attribute Value', this.attributePayload);
    });
  }

  updateRow(e) {
    console.log('Update', e, this.editPayload);
    this.gridOptions.updateRowData({ update: [e.rowData] });
  }

  onCellClicked($event) {
  }

  startEditing(e) {
    this.gridOptions.setFocusedCell(e.index, 'option');
    this.gridOptions.startEditingCell({
      rowIndex: e.index,
      colKey: 'option',
    });
  }

  stopEditing() {
    this.gridOptions.stopEditing();
  }

  onCellValueChanged(e) {
    if (e.newValue != e.oldValue) {
      console.log('Cell Changed', e);
      this.apiMessageService.changeApiStatus({
        type: 'CHANGE_VALUE',
        status: true,
        payload: e,
      });
    }
  }

  onRowDragEnd(e) {
    this.loadingCellRendererParams = { loadingMessage: 'Loading...' };
    const currPosition = (e.overIndex < 0) ? (this.rowData.length - 1) : e.overIndex;
    const id = e.node.data.id;
    const position = e.node.data.position;
    if (currPosition >= 0 && currPosition + 1 != position) {
      this.gridOptions.showLoadingOverlay();
      const data = {
        id: id,
        position: currPosition + 1,
      };
      this._store.dispatch(
        new UpdateAttributePositions(JSON.stringify(data), this._id)
      );
      this.gridOptions.hideOverlay();
    }
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

  onGridReady(event) {
    this.editType = 'fullRow';
    this.gridOptions = event.api;
    this.gridColumnApi = event.columnApi;
    this.apiMessageService.currentApiStatus.subscribe(data => {
      if (
        data.type === 'GET_ATTRIBUTES_ON_ATTRIBUTESET_LOADING' &&
        data.status
      ) {
      }
    });
    if (this._id) {
      console.log('ON GRID READY  SHOW LOADING')
    }

    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
  }

  initialForm() {
    this.addAttributeForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      label: ['', [Validators.required, Validators.maxLength(150)]],
      status: ['0'],
    });
  }

  submitAttributeSet(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.addAttributeForm.value);
    if (this._id) {
      this._store.dispatch(
        new UpdateAttributeSet(this.addAttributeForm.value, this._id)
      );
      this.isEdit = false
      this.gridOptions.showLoadingOverlay();
      console.log('ON SUBMIT ATTRI SET  SHOW LOADING')

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
    if (e) {
      this.keyword = e.value;
    }
  }

  checkAvailibility() {
    if (this.addAttributeForm.get('label').valid) {
      const labelValue = this.keyword.trim() ? this.keyword : null;
      console.log(labelValue)
      if (labelValue) {
        const keyword = labelValue.replace(/[^a-z0-9]+/gi, '-');
        return this._api
          .request(
            {
              method: 'get',
              url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set-name/${keyword}`,
            },
            true,
            false
          )
          .subscribe(res => {
            if (res) {
              this.keywordStatus = 'Keyword already exists, Please try again with different keyword.';
            } else {
              this.keywordStatus = 'Keyword is Valid';
              this.validKeyword = keyword;
              this.addAttributeForm.get('name').patchValue(keyword);
            }
          });
      }
    } else {
      console.log('InValid', this.addAttributeForm.status, this.addAttributeForm.value)
    }
  }

  getLabelValue(e) {
    this.keyword = e.value.trim()
    this.addAttributeForm.get('name').patchValue(this.keyword);
    if (!this.keyword) {
      this.keywordStatus = ''
    }
  }

  selectGroup(id: number) {
    console.log('Selct Group', id);
    this.groupId = id;
    this._store.dispatch(new GetAttributesByGroupId(id, this._id));
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeList = res['getAttributesByGroupId'];
    });
    this.isGroupSelected = true;
  }

  selectAttribute(id: number, payload) {
    console.log('Attribute id', id, payload);
    this.attributeID = id;
    this._store.dispatch(new GetByIdProductAttributeValue(id));
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributePayload = res['getByIdProductAttributeValue'];
      console.log('Attribute Value', this.attributePayload);
    });
  }

  submitFinalAttributeSetRel() {
    console.log('Submit id', this.attributeID, this._id);
    this._store.dispatch(new PostAttributeSetRel(this._id, this.attributeID, this.groupId));
    this.isSubmitFinal = true;
    this.attributeID = null;
    this._store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      if (res['getAttributeSetAttributes']) {
        const attributes = res['getAttributeSetAttributes'];
        this.rowData = attributes;
        console.log('After Sybmit', this.rowData);
      }
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
    this.checkAvail = true;
    this.addAttributeForm.enable();
    this.gridOptions.hideOverlay();
    console.log('ON EDIT ATTR  HIDE LOADING')
    this.apiMessageService.changeApiStatus({
      type: 'EDIT_ATTRIBUTE_SET',
      status: true,
      payload: { disable: this.isEdit, parentID: this._id },
    });
  }

  cancelEdit() {
    this.gridOptions.showLoadingOverlay();
    console.log('ON CANCEL EDIT  SHOW LOADING')
    this.isEdit = false;
    this.addAttributeForm.disable();
    this.apiMessageService.changeApiStatus({
      type: 'EDIT_ATTRIBUTE_SET',
      status: true,
      payload: { disable: this.isEdit, parentID: this._id },
    });
    this.setAttrSetForm();
  }
  ngOnDestroy() {
    this.groupId = null;
  }
}