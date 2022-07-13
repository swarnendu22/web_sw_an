import { Component, OnInit } from '@angular/core';
import { UploadPaymentReconcilationCsv } from '../../../../actions/identity-verification.action';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import * as moment from 'moment';
@Component({
  selector: 'app-upload-payment-csv',
  templateUrl: './upload-payment-csv.component.html',
  styleUrls: ['./upload-payment-csv.component.css']
})
export class UploadPaymentCsvComponent implements OnInit {
  justPayCsvUrl = null
  paymentGatewayCsvUrl = null
  start_date = null
  end_date = null

  constructor(private store: Store<any>, ) { }

  ngOnInit(): void {
  }

  onFileUpload(event, csvTtype) {
    let image = {
      type: '',
      location: '',
      id: null,
      name: ''
    }
    console.log("event", event);
    if ((event.Location.split('.').pop() != 'xls') && (event.Location.split('.').pop() != 'xlsx') && (event.Location.split('.').pop() != 'csv')) {

      alert('Only Excel files are Allowed');
    }
    else {

      image.id = Math.random();
      image.name = event.Location.split('/').slice(3).join('/');
      image.location = event.Location;
      image.type = event.Location.split('.').pop();
    }
    this[csvTtype] = image
    console.log(this[csvTtype]);


  }

  deleteImage(fileType) {

    this[fileType] = null

  }

  checkForm() {
    if (this.justPayCsvUrl == null ||
      this.paymentGatewayCsvUrl == null ||
      this.start_date == null ||
      this.end_date == null)
      return false;
    else
      return true;
  }

  upload() {
    const payload = {
      "start_date": moment(this.start_date).format('YYYY-MM-DD'),
      "end_date": moment(this.end_date).format('YYYY-MM-DD'),
      "jus_filename": this.justPayCsvUrl.location,
      "pg_filename": this.paymentGatewayCsvUrl.location
    }
    console.log(payload)
    this.store.dispatch(new UploadPaymentReconcilationCsv(payload))
  }
}
