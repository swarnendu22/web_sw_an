import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';

import {
  ActivatedRoute,
  Router,
} from '../../../../../../../node_modules/@angular/router';
import {
  GetViewSpecificCommissionGroupDetail,
  UpdateCommissionGroup,
  GetcategoryTreeData,
} from '../../../../../actions/commission-exception-management.action';
import { CellRendererCopyButtonComponent } from '../../../components/cell-renderer-copy-button/cell-renderer-copy-button.component';
import { AgDatePickerComponent } from '../../../components/ag-date-picker/ag-date-picker.component';
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from '../../../components/ag-date-picker/date.adapter';
import { CellEditorValidateComponent } from '../../../components/cell-editor-validate/cell-editor-validate.component';
import * as moment from 'moment';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-show-commission-management',
  templateUrl: './show-commission-management.component.html',
  styleUrls: ['./show-commission-management.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})
export class ShowCommissionManagementComponent implements OnInit {
  disable = true;
  private defaultColDef;
  columnDefs;
  rowData = [];
  private groupDefaultExpanded;
  private getDataPath;
  private autoGroupColumnDef;
  id = null;
  newCommissionForm: FormGroup;
  submitted = false;
  selectedItems = [];
  commissionGroupsDetail = null;
  categories = null;
  public gridapi;
  private components;
  minDate = new Date();
  maxDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    private ag: AgGridOptions
  ) {
    this.columnDefs = [
      {
        field: 'parent',
        width: 100,
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'sub_cat',
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'name',
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        field: 'affectFrom',
        resizable: true,
        filter: 'agDateColumnFilter',
        sortable: true,
        editable: true,
        singleClickEdit: true,
        cellEditorFramework: AgDatePickerComponent,
        cellRenderer: data => {
          return moment(data.value).format('DD/MM/YYYY');
        },
      },
      {
        field: 'expiryDate',
        resizable: true,
        filter: 'agDateColumnFilter',
        sortable: true,
        editable: true,
        singleClickEdit: true,
        cellEditorFramework: AgDatePickerComponent,
        cellRenderer: data => {
          return moment(data.value).format('DD/MM/YYYY');
        },
      },
      {
        field: 'sellingPriceFrom',
        editable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
        singleClickEdit: true,
        cellEditorFramework: CellEditorValidateComponent,
      },
      {
        field: 'sellingPriceTo',
        editable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
        singleClickEdit: true,
        cellEditorFramework: CellEditorValidateComponent,
      },
      {
        field: 'type',
        width: 100,
        editable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
        singleClickEdit: true,
        cellEditorParams: {
          values: ['Fixed', 'Percentage'],
        },
        cellEditor: 'agSelectCellEditor',
        valueGetter: function ValueGetter(params) {
          if (
            params.data.type != null &&
            (params.data.type == 'f' || params.data.type == 'Fixed')
          )
            return 'Fixed';
          else if (
            params.data.type != null &&
            (params.data.type == 'p' || params.data.type == 'Percentage')
          )
            return 'Percentage';
        },
        // cellRenderer: params => `<select ><option value="">Select</option><option value="f" ${this.checkSelected(params.data.type, 'f')}>Fixed</option><option value="p" ${this.checkSelected(params.data.type, 'p')}>Percentage</option></select>`,
      },
      {
        field: 'value',
        width: 100,
        editable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true,
        singleClickEdit: true,
        cellEditorFramework: CellEditorValidateComponent,
      },
      {
        headerName: 'Action',
        field: 'value',
        colId: 'params',
        // cellRendererFramework: CellRendererCopyButtonComponent,
        // cellRenderer: params =>
        //   params['data'] ? `<button>Add Row</button>` : '',

        cellRendererFramework: CellRendererCopyButtonComponent,
        cellRendererParams: {
          onClick: this.onAddRow.bind(this),
        },
        btnName: [
          { name: 'Copy', btnTxtColor: '#fff', btnColor: '#716aca' },
          { name: 'Save', btnTxtColor: '#fff', btnColor: '#F4516C' },
        ],
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        pinned: 'right'
      },
    ];

    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.store.dispatch(new GetViewSpecificCommissionGroupDetail(this.id));
    }
  }

  checkSelected(type, select_type) {
    if (type == select_type) return 'selected';
    else return '';
  }

  changeStartDate() {

    this.maxDate = new Date();
    this.maxDate.setDate(this.newCommissionForm.get('affectFrom').value.getDate() + 1);

  }

  onAddRow(e) {
    var copyvalue: any = {};
    copyvalue.sellingPriceFrom = '';
    copyvalue.sellingPriceTo = '';
    copyvalue.affectFrom = '';
    copyvalue.expiryDate = '';
    copyvalue.type = '';
    copyvalue.value = '';
    copyvalue.name = e.rowData.name;
    copyvalue.sub_cat = e.rowData.sub_cat;
    copyvalue.parent = e.rowData.parent;
    copyvalue.groupId = e.rowData.groupId;
    copyvalue.catId = e.rowData.catId;
    copyvalue.affectFrom = e.rowData.affectFrom;
    copyvalue.expiryDate = e.rowData.expiryDate;
    copyvalue.type = e.rowData.type;
    copyvalue.id = '';
    this.gridapi.updateRowData({
      add: [copyvalue],
      addIndex: parseInt(e.id) + 1,
    });
  }

  get f() {
    return this.newCommissionForm.controls;
  }

  ngOnInit() {
    this.newCommissionForm = this.formBuilder.group({
      groupName: ['', [Validators.required]],
      groupClass: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern(/^\d+\.\d{2}$/)]],
      type: ['', [Validators.required]],
      affectFrom: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      remarks: [''],
      addLogistic: [''],
      addPaymentHandling: [''],
      addClosingFee: [''],
      addFullfillmentFee: [''],
    });

    this.store.pipe(select('commissionGroups')).subscribe(res => {
      this.commissionGroupsDetail = res.commissionGroupsDetail;
      console.log('Detail', this.commissionGroupsDetail);
      if (this.commissionGroupsDetail) {
        this.newCommissionForm
          .get('groupName')
          .setValue(this.commissionGroupsDetail[0]['groupName']);
        this.newCommissionForm
          .get('groupClass')
          .setValue(this.commissionGroupsDetail[0]['groupClass']);
        this.newCommissionForm
          .get('value')
          .setValue(this.commissionGroupsDetail[0]['value'].toFixed(2));
        this.newCommissionForm
          .get('type')
          .setValue(this.commissionGroupsDetail[0]['type']);
        this.newCommissionForm
          .get('affectFrom')
          .setValue(new Date(this.commissionGroupsDetail[0]['affectFrom']));
        this.newCommissionForm
          .get('expiryDate')
          .setValue(new Date(this.commissionGroupsDetail[0]['expiryDate']));
        this.newCommissionForm
          .get('remarks')
          .setValue(this.commissionGroupsDetail[0]['remarks']);
        this.newCommissionForm
          .get('addLogistic')
          .setValue(this.commissionGroupsDetail[0]['addLogistic']);
        this.newCommissionForm
          .get('addPaymentHandling')
          .setValue(this.commissionGroupsDetail[0]['addPaymentHandling']);
        this.newCommissionForm
          .get('addClosingFee')
          .setValue(this.commissionGroupsDetail[0]['addClosingFee']);
        this.newCommissionForm
          .get('addFullfillmentFee')
          .setValue(this.commissionGroupsDetail[0]['addFullfillmentFee']);

        this.newCommissionForm.disable();
      }
      this.newCommissionForm.disable();
    });
    this.store.dispatch(new GetcategoryTreeData(this.id));
  }

  makeDecimal(event) {
    var controlname = event.target.getAttribute('formcontrolname');
    let val = +this.newCommissionForm.get(controlname).value;
    if (Number.isInteger(val)) {
      this.newCommissionForm.get(controlname).patchValue(val.toFixed(2));
    }
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.newCommissionForm.valid) {
      this.submitted = false;
      console.log(this.newCommissionForm.value);
      const fvalues = this.newCommissionForm.value;
      fvalues.id = this.id;
      this.store.dispatch(new UpdateCommissionGroup(fvalues));
      this.newCommissionForm.reset();
      this.router.navigate(['store/commission-management']);
    } else {
      console.log(this.newCommissionForm);
    }
  }

  categorySelectionValue(value) {
    this.selectedItems = value;
  }

  onFirstDataRendered(params) {
    //params.api.sizeColumnsToFit();
  }

  onGridReady(event) {
    this.gridapi = event.api;
    this.store.pipe(select('commissionGroups')).subscribe(res => {
      if (res.categoryTree) {
        this.categories = null;
        this.categories = res.categoryTree;
        if (this.categories != null) {

          this.rowData = [];
          this.serialize();
          event.api.setRowData(this.rowData);
        }

        // event.api.sizeColumnsToFit();
      }
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        //event.api.sizeColumnsToFit();
      });
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
    //params.api.sizeColumnsToFit();
  }

  serialize() {
    this.categories.map(excp => {

      this.serializeTree(excp, excp.marketplaceCommissionList);
    });
  }

  serializeTree(val, marketplaceCommissionList) {

    marketplaceCommissionList.map(excp => {
      this.rowData.push({
        parent: val.parent,
        sub_cat: val.sub_cat,
        name: val.name,
        catId: val.id,
        id: excp ? excp.id : null,
        groupId: excp ? excp.groupId : null,
        affectFrom: excp ? excp.affectFrom : null,
        expiryDate: excp ? excp.expiryDate : null,
        sellingPriceFrom: excp ? excp.sellingPriceFrom : '',
        sellingPriceTo: excp ? excp.sellingPriceTo : '',
        type: excp ? excp.type : '',
        value: excp ? excp.value : '',
      });
    });
  }

  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.disable = false;
    } else {
      formStats.disable();
      this.disable = true;
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
}
