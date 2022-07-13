import { GetAllIdentityVerificationList } from './../../../../actions/identity-verification.action';
import { Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellRendererIdentityVerificationComponent } from '../cell-renderer-identity-verification/cell-renderer-identity-verification.component';
import { Store } from '@ngrx/store';
import { ApproveRejectIdentityVerification, ActionTypes } from 'src/app/actions/identity-verification.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { FormControl, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
const moment = _moment;



export interface PayloadToSend {
  id: number;
  status: string;
}

@Component({
  selector: 'app-identity-verification-modal',
  templateUrl: './identity-verification-modal.component.html',
  styleUrls: ['./identity-verification-modal.component.css']
})
export class IdentityVerificationModalComponent implements OnInit {
  public form: FormGroup;
  pageNo = 0;
  payload: object = null;
  verificationDate: any = null;
  matchStatus: any = null;
  entryDate: any = null;

  dob: any = null;
  date: any = new Date();
  date2: any = new Date().setDate(this.date.getDate() - 3650);
  date3: any = new Date().setDate(this.date.getDate() - 36500);
  minFromDate = new Date(this.date3);
  maxToDate = new Date(this.date);


  constructor(
    public dialogRef: MatDialogRef<CellRendererIdentityVerificationComponent>,
    private store: Store<any>,
    private location: Location,
    private route: Router,
    private fb: FormBuilder,
    public apiMessageService: ApiMessageService,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.payload = this.data['payload'];
    this.dob = moment(this.payload['dob']).format('DD-MM-YYYY');
    this.entryDate = moment(this.payload['entryDate']).format('DD-MM-YYYY');
    this.verificationDate = moment(this.payload['verificationDate']).format('DD-MM-YYYY');
    this.matchStatus = this.payload['identityMatch'] && this.payload['identityMatch'] == 1 ? true : false;
    this.form = this.fb.group({
      entryDateForm: [''],
      verificationDateForm: [''],
      dobForm: ['', Validators.required],
      matchStatusForm: ['', Validators.required]
    });

    console.log("formated verificationDate", this.verificationDate);
    console.log("formated toISOString verificationDate", moment(this.verificationDate).toISOString());


    // this.form.controls.entryDateForm.setValue(moment(this.entryDate).toISOString());
    // this.form.controls.verificationDateForm.setValue(moment(this.verificationDate).toISOString());
    // this.form.controls.dobForm.setValue(moment(this.dob).toISOString());


    // this.form.controls.entryDateForm.setValue(moment(this.entryDate));
    // this.form.controls.verificationDateForm.setValue(moment(this.verificationDate));
    // this.form.controls.dobForm.setValue(moment(this.dob));

    this.form.controls.entryDateForm.setValue(this.payload['entryDate'] == null ? '' : new Date(this.payload['entryDate']));
    this.form.controls.verificationDateForm.setValue(this.payload['verificationDate'] == null ? '' : new Date(this.payload['verificationDate']));
    this.form.controls.dobForm.setValue(this.payload['dob'] == null ? '' : new Date(this.payload['dob']));

    this.form.controls.matchStatusForm.setValue(this.matchStatus);
  }

  Approve(event) {
    console.log("Dob After change in Approve::", this.form.controls.dobForm.value);
    console.log("matchStatusForm change in Approve::", this.form.controls.matchStatusForm.value);
    console.log("Validity of form", this.form.valid);
    const dobFinal = moment(this.form.controls.dobForm.value).format('YYYY-MM-DD');
    console.log("dobFinal::", dobFinal);
    let id = this.payload['id'];
    if (this.form.valid && this.form.controls.dobForm.value != "") {
      this.store.dispatch(new ApproveRejectIdentityVerification({
        id,
        dob: dobFinal,
        status: 'APPROVE',
        isIdentityMatched: this.form.controls.matchStatusForm.value == true ? 1 : 0
      }));
      this.apiMessageService.currentApiStatus.subscribe((response) => {
        console.log("RES inside Approve", response);
        if (response.status == true && ActionTypes.approveRejectIdentityVerification == response.type) {
          this.store.dispatch(new GetAllIdentityVerificationList({ pageNo: this.pageNo, requestBody: null }));
        }
      });
      this.dialogRef.close();
    }
  }
  Reject(event) {
    console.log('Reject Event', event);
    let id = this.payload['id']
    this.store.dispatch(new ApproveRejectIdentityVerification({ id, status: 'REJECT' }));
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      console.log("RES inside Reject", response);
      if (response.status == true && ActionTypes.approveRejectIdentityVerification == response.type) {
        this.store.dispatch(new GetAllIdentityVerificationList({ pageNo: this.pageNo, requestBody: null }));
      }
    });
    this.dialogRef.close();
  }
}
