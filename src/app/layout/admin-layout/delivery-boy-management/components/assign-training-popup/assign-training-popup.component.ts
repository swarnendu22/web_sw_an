import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Store, select } from '@ngrx/store';
import { AssignTrainingToDeliveryBoy } from '../../../../../actions/delivery-boy-management.action';
@Component({
  selector: 'app-assign-training-popup',
  templateUrl: './assign-training-popup.component.html',
  styleUrls: ['./assign-training-popup.component.css']
})
export class AssignTrainingPopupComponent implements OnInit {
  ids = []
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  sehedule = null
  from_date = new Date()
  to_date = new Date()
  type = null

  constructor(public dialogRef: MatDialogRef<AssignTrainingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>) {
    this.ids = this.data.bulkOperationList
    this.type = this.data.type
    console.log(this.ids)
  }

  ngOnInit() {
  }

  submit() {
    console.log(moment(this.from_date).format('DD/MM/YYYY'))
    const payload = {
      sehedule: this.type,
      from_date: moment(this.from_date).format('DD/MM/YYYY'),
      to_date: moment(this.to_date).format('DD/MM/YYYY'),
      ids: this.ids,
    }
    console.log(payload)
    this.store.dispatch(new AssignTrainingToDeliveryBoy(payload))
  }
}
