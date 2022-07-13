import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/utils/request/request.model';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Store, select } from '@ngrx/store';
import {
  PostAttributeGroup,
  GetAttributeGroupName,
  CheckAttributeGroupName,
} from '../../../../../actions/storeManagement.action';
import { UpdateCellRendererButtonComponent } from '../../../components/update-cell-renderer-button/update-cell-renderer-button.component';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { RequestService } from 'src/app/utils/request/request.service';
import { CellRendererButtonComponent } from '../../../components/cell-renderer-button/cell-renderer-button.component';

@Component({
  selector: 'app-attribute-group',
  templateUrl: './attribute-group.component.html',
  styleUrls: ['./attribute-group.component.css'],
})
export class AttributeGroupComponent implements OnInit {
  disable = true;
  groupList = null;
  groupName: string;
  gridOptions: any;
  isExist = null;
  addGroupNameForm = this._formBuilder.group({
    groupName: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<any>,
    private _api: RequestService,
    private apiMessageService: ApiMessageService
  ) {
    this._store.pipe(select('productAttributes')).subscribe(response => {
      this.groupList = response['attributeGroupName'];
      console.log(this.groupList);
      this.rowData = this.groupList;
    });
  }

  ngOnInit() {
    this._store.dispatch(new GetAttributeGroupName());
  }

  columnDefs = [
    {
      headerName: 'Group Name',
      field: 'groupName',
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    {
      field: 'action',
      type: 'GROUPUPDATE',
      cellRendererFramework: CellRendererButtonComponent,
      btnName: [{ name: 'View', btnTxtColor: '#fff', btnColor: '#716aca' }],
      sortable: false,
      filter: false,
      floatingFiltersHeight: 0,
      resizable: false,
      maxWidth: 150,
      // cellStyle: function(params) {
      //   return { "padding-left": '300px' };
      // }
    }
    // {
    //   headerName: 'Action',
    //   colId: 'params',
    //   type: 'GROUPUPDATE',
    //   cellRendererFramework: UpdateCellRendererButtonComponent,
    //   width: 50,
    //   pinned: 'right',
    //   btnName: [{ name: 'Update', btnTxtColor: '#fff', btnColor: '#716aca' }],
    //   sortable: false,
    //   filter: false,
    //   floatingFiltersHeight: 0,
    // },
  ];

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

  async addGroupName() {
    console.log('groupname', this.addGroupNameForm.value);
    const status = await this.checkAvalibilityGroup(
      this.addGroupNameForm.get('groupName').value
    );
    status.subscribe(res => {
      if (res) {
        alert(
          'Group Name is already exist. Please try again with different name'
        );
      } else {
        console.log('not found');
        this._store.dispatch(
          new PostAttributeGroup(this.addGroupNameForm.value)
        );
        // this.addGroupNameForm.reset();
        this._store.pipe(select('productAttributes')).subscribe(response => {
          this.groupList = response['attributeGroupName'];
          console.log(this.groupList);
          this.rowData = this.groupList;
        });
      }
    });
  }

  onGridReady(event) {
    this.gridOptions = event.api;
    window.addEventListener("resize", function() {
      setTimeout(function() {
         event.api.sizeColumnsToFit();
      });
    });
  }

  handleDisabled(value) {
    if (value.length) {
      this.disable = !this.disable;
    } else {
      this.disable = !this.disable;
    }
  }

  checkAvalibilityGroup(name: string) {
    return this._api.request(
      {
        url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group/group/${name}`,
        method: 'get',
      },
      true
    );
  }
}
