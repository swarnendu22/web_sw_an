import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { RequestService } from 'src/app/utils/request/request.service';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import {
  GetAttributeGroupName,
  PostAttributeGroup,
  GetByIdAttributeGroup,
  PutAttributeGroup,
  GetByIdAttributeGroupNew,
} from 'src/app/actions/storeManagement.action';
import { CustomValidations } from '../../../../../utils/validations/custom.validations';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-group',
  templateUrl: './add-new-group.component.html',
  styleUrls: ['./add-new-group.component.css'],
})
export class AddNewGroupComponent implements OnInit {
  disable = true;
  groupById = null;
  groupName: string;
  gridOptions: any;
  isExist = null;
  isEdit = false;
  _id = null;
  checkAvail = false;
  keywordStatus = null;
  isValid = false
  submitted = false;


  addGroupNameForm = this._formBuilder.group({
    groupName: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<any>,
    private _api: RequestService,
    private _route: ActivatedRoute,
    private apiMessageService: ApiMessageService,
    private customValidator: CustomValidations
  ) {
    this._id = this._route.snapshot.params.id;
    console.log('Location', location.origin);
    if (this._id) {
      this.isEdit = true;
      this._store.dispatch(new GetByIdAttributeGroupNew(this._id));
    }
  }

  get f() { return this.addGroupNameForm.controls; }

  ngOnInit() {
    this.setAttrGrpForm();
  }
  setAttrGrpForm() {
    if (this._id) {
      this._store.pipe(select('productAttributes')).subscribe(response => {
        this.groupById = response['getByGroupName'];
        if (this.groupById != null) {
          this.addGroupNameForm
            .get('groupName')
            .setValue(this.groupById[0]['groupName']);
        }
      });
      this.addGroupNameForm.disable();
    }
  }

  async addGroupName(event) {
    console.log('groupname', this.addGroupNameForm.value);
    event.preventDefault();
    event.stopPropagation();
    this.submitted = true;
    this.handleDisabled()
    if (this.isValid) {
      const status = await this.checkAvalibilityGroup(
        this.addGroupNameForm.get('groupName').value.trim()
      );
      status.subscribe(res => {
        if (res) {

          this.keywordStatus =
            'Group Name already exists, please try again with different group name';
          // alert(
          //   'Group Name is already exist. Please try again with different name'
          // );
        } else {
          let groupPayload = { groupName: this.addGroupNameForm.value['groupName'].trim(), id:this._id  }
          console.log('groupPayload', groupPayload);
          if (this._id) {
            this._store.dispatch(
              new PutAttributeGroup(groupPayload, this._id)
            );
          } else {
            this._store.dispatch(
              new PostAttributeGroup(groupPayload)
            );
          }
          // this.addGroupNameForm.reset();
        }
      });
    } else {
      this.markFormGroupTouched(this.addGroupNameForm);
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


  handleDisabled() {
    if (this.addGroupNameForm.dirty && this.addGroupNameForm.status === 'VALID') {
      this.isValid = true
    } else if (!this.f.groupName.errors) {
      this.isValid = true
    } else {
      this.isValid = false
    }
    console.log('handle', this.addGroupNameForm.dirty, this.f.groupName.errors);

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

  toggleFormDisable(formName, toggleType) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
      this.disable = false;
    } else {
      formStats.disable();
      this.disable = true;
    }
    if(toggleType == 'cancel') {
      this.setAttrGrpForm();
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }

  async checkAvailibility() {
    this.handleDisabled()
    if (this.isValid) {
      const status = await this.checkAvalibilityGroup(
        this.addGroupNameForm.get('groupName').value.trim()
      );
      status.subscribe(res => {
        if (res) {
          this.keywordStatus =
            'Group Name already exists, please try again with different group name';
          setTimeout(() => {
            this.keywordStatus = '';
          }, 3000);
        } else {
          this.checkAvail = true;
          this.keywordStatus = 'Group Name is Valid';
          setTimeout(() => {
            this.keywordStatus = '';
          }, 3000);
        }
      });
    }
  }
}
