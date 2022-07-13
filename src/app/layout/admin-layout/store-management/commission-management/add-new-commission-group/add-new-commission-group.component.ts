import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store } from '../../../../../../../node_modules/@ngrx/store';
import { StorePostCommission, ActionTypes } from '../../../../../actions/storeManagement.action';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';

@Component({
  selector: 'app-add-new-commission-group',
  templateUrl: './add-new-commission-group.component.html',
  styleUrls: ['./add-new-commission-group.component.css'],
})
export class AddNewCommissionGroupComponent implements OnInit {
  private defaultColDef;
  private columnDefs;
  private rowData;
  private groupDefaultExpanded;
  private getDataPath;
  private autoGroupColumnDef;
  minDate = new Date();
  maxDate = new Date();

  newCommissionForm: FormGroup;
  submitted = false;
  selectedItems = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router,
    private ag: AgGridOptions,
    private apiMessageService: ApiMessageService
  ) {
    this.columnDefs = [
      { field: 'Code', resizable: true },
      { field: 'attributeSet', resizable: true },
      { field: 'startPrice', width: 100 },
      { field: 'endPrice', width: 100 },
      { field: 'value', width: 100 },
      { headerName: '%', field: 'percent', width: 100 },
      { field: 'action', width: 100 },
    ];
    // this.defaultColDef = { resizable: true };
    this.rowData = [
      {
        orgHierarchy: ['Men'],
        Code: '10001',
        attributeSet: '',
        startPrice: '',
        endPrice: '',
        Value: '',
        percent: '',
        action: '',
      },
      {
        orgHierarchy: ['Men', 'Topwear'],
      },
      {
        orgHierarchy: ['Men', 'Topwear', 'Shirt'],
      },
      {
        orgHierarchy: ['Men', 'Topwear', 'Blazzer'],
      },
    ];
    this.groupDefaultExpanded = -1;
    this.getDataPath = function (data) {
      return data.orgHierarchy;
    };
    this.autoGroupColumnDef = {
      headerName: 'Category Name',
      cellRendererParams: { suppressCount: true },
    };
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
  }

  changeStartDate() {

    this.maxDate = new Date();
    this.maxDate.setDate(this.newCommissionForm.get('affectFrom').value.getDate() + 1);

  }

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
  onGridReady(event) {
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });
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

      this.store.dispatch(
        new StorePostCommission(this.newCommissionForm.value)
      );
      this.apiMessageService.currentApiStatus.subscribe(response => {
        let res: any = response.payload;
        console.log(res.entityId);
        if (res.entityId && response.type == ActionTypes.storePostCommissions) {
          this.router.navigate([
            'store/commission-management/show/' + res.entityId,
          ]);
        }
      });
      this.newCommissionForm.reset();
    } else {
      console.log(this.newCommissionForm);
    }
  }

  categorySelectionValue(value) {
    this.selectedItems = value;
  }
}
