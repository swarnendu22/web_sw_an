import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignTrainingPopupComponent } from '../assign-training-popup/assign-training-popup.component';
import { Store } from '../../../../../../../node_modules/@ngrx/store';
import { ScheduleDeliveryBoy } from '../../../../../actions/delivery-boy-management.action';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-delivery-boy-shchedule',
  templateUrl: './delivery-boy-shchedule.component.html',
  styleUrls: ['./delivery-boy-shchedule.component.css']
})
export class DeliveryBoyShcheduleComponent implements OnInit {
  delivery_boy_traning_details = null
  delivery_boy_traning = null
  remarks = null
  id = null
  status = null
  re_schedule_count = null
  constructor(public dialogRef: MatDialogRef<AssignTrainingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>, private toasterService: ToastrService) {
    console.log(this.data.alldata)
    this.delivery_boy_traning_details = this.data.delivery_boy_traning.delivery_boy_traning_details
    this.delivery_boy_traning = this.data.delivery_boy_traning
    this.re_schedule_count = this.data.delivery_boy_traning.re_schedule_count
    this.id = this.data.id
    this.status = this.data.status
  }

  ngOnInit() {
  }

  updateSchedule() {
    console.log(this.delivery_boy_traning_details)
    const finalPayload = {
      "id": this.id,
      "traning_state": 'fail',
      "traning_status": 'FAIL',
      "total_score": 10,
      "status": this.status,
    }
    let payload = []
    let totalScore = 0
    this.delivery_boy_traning_details.forEach(element => {
      totalScore += +element.score
      payload.push({
        "id": element.id,
        "traning_type": element.traning_type,
        "attendance": element.attendance,
        "score": element.score
      })

    });

    finalPayload['total_score'] = totalScore / this.delivery_boy_traning_details.length
    if (finalPayload['total_score'] >= 80) {
      finalPayload['traning_state'] = 'pass'
      finalPayload['traning_status'] = 'PASS'
      finalPayload['status'] = 'CERTIFIED'
    }

    finalPayload['delivery_boy_traning_details'] = payload

    console.log(finalPayload)
    this.store.dispatch(new ScheduleDeliveryBoy({ delivery_boys: [finalPayload] }))


  }


}
