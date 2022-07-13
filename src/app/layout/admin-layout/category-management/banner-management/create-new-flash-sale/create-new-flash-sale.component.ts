import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { Store } from '../../../../../../../node_modules/@ngrx/store';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { Router } from '../../../../../../../node_modules/@angular/router';
import * as moment from 'moment';
import { CreateFlashSale } from '../../../../../actions/banner-management.actions';


@Component({
  selector: 'app-create-new-flash-sale',
  templateUrl: './create-new-flash-sale.component.html',
  styleUrls: ['./create-new-flash-sale.component.css']
})
export class CreateNewFlashSaleComponent implements OnInit {
  flashSaleForm: FormGroup;
  formValues = [];
  start_timeText = new Date();
  end_timeText = new Date();
  schedule_atText = new Date();
  aceText = '';
  editorOptions = { showLineNumbers: true, tabSize: 1, printMargin: false };
  // start_timeText='';
  constructor(private fb: FormBuilder, private store: Store<categoryState>,
    private router: Router, private apiMessageService: ApiMessageService) { }

  ngOnInit() {
    this.flashSaleForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      schedule_at: [null, [Validators.required]],
      flash_sale_items_attributes: ['', [Validators.required]],

    });

  }
  get f() {
    return this.flashSaleForm.controls;
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.flashSaleForm.value);
    this.store.dispatch(new CreateFlashSale(this.flashSaleForm.value));

  }

  onDateSelect(event, formcontrol) {
    if (formcontrol == 'start_timeText') {
      let startdate = moment(this.start_timeText).format('DD-MM-YYYY HH:mm');

      this.flashSaleForm.get('start_time').setValue(startdate);
    }
    if (formcontrol == 'schedule_atText') {
      let schedule_at = moment(this.schedule_atText).format('DD-MM-YYYY HH:mm');

      this.flashSaleForm.get('schedule_at').setValue(schedule_at);
    }
    if (formcontrol == 'end_timeText') {
      let enddate = moment(this.end_timeText).format('DD-MM-YYYY HH:mm');

      this.flashSaleForm.get('end_time').setValue(enddate);
    }

    if (moment(this.flashSaleForm.get('start_time').value).isAfter(this.flashSaleForm.get('end_time').value, 'date')) {

      this.flashSaleForm.get('end_time').setErrors({
        cannotbegreater: 'Cannot be Greater'
      });
    }
    if (this.flashSaleForm.get('start_time').value > this.flashSaleForm.get('end_time').value) {
      this.flashSaleForm.get('end_time').setErrors({
        cannotbegreater: 'Cannot be Greater'
      });
    }
    if (moment(this.flashSaleForm.get('schedule_at').value).isAfter(this.flashSaleForm.get('start_time').value, 'date')) {

      this.flashSaleForm.get('schedule_at').setErrors({
        cannotbegreater: 'Cannot be Greater'
      });
    }
    if (this.flashSaleForm.get('schedule_at').value > this.flashSaleForm.get('start_time').value) {
      this.flashSaleForm.get('schedule_at').setErrors({
        cannotbegreater: 'Cannot be Greater'
      });
    }
  }

  delete(date) {
    this.flashSaleForm.get(date).setValue('');
  }

  get actionText() {
    // this.queryForm.patchValue({ query: this.query });
    // this.setFormFieldValue('conditions', JSON.parse(v));

    return JSON.stringify(this.flashSaleForm.get('flash_sale_items_attributes').value, null, 2);
  }
  set actionText(v) {
    try {
      // this.query = JSON.parse(v);
      this.flashSaleForm.get('flash_sale_items_attributes').setValue(JSON.parse(v));
    } catch (e) {
      console.log('error occured while you were typing JSON');
    }
  }

  editoChange(event) {
    if (event.length === 0) {
      this.flashSaleForm.get('flash_sale_items_attributes').setValue(event);
    }
  }




}
