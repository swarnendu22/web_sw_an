import { Component, OnInit } from '@angular/core';
import { CreateFlashSale, GetFlashSalesDetails } from '../../../../../actions/banner-management.actions';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { categoryState } from '../../../../../reducers/storemanagement.reducers';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { ApiMessageService } from '../../../../../utils/api/api-message.service';
import { Router, ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-show-flash-sale',
  templateUrl: './show-flash-sale.component.html',
  styleUrls: ['./show-flash-sale.component.css']
})
export class ShowFlashSaleComponent implements OnInit {
  flashSaleseDtail = null;
  flashSaleForm: FormGroup;
  formValues = [];
  start_timeText = new Date();
  end_timeText = new Date();
  schedule_atText = new Date();
  aceText = '';
  id = null;

  editorOptions = { showLineNumbers: true, tabSize: 1, printMargin: false };
  // start_timeText='';
  constructor(private fb: FormBuilder, private store: Store<categoryState>,
    private router: Router, private apiMessageService: ApiMessageService, private route: ActivatedRoute, ) {
    this.id = this.route.snapshot.params.id;
    this.store.dispatch(new GetFlashSalesDetails(this.id));
  }

  ngOnInit() {
    this.flashSaleForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      schedule_at: [null, [Validators.required]],
      flash_sale_items_attributes: ['', [Validators.required]],

    });

    this.store.pipe(select<any, any>('bannerManagement')).subscribe(res => {


      if (res['flashSalesDetail']) {
        console.log(res['flashSalesDetail']);
        this.flashSaleseDtail = res['flashSalesDetail'];

        this.flashSaleForm.get('title').setValue(this.flashSaleseDtail['title']);
        this.flashSaleForm.get('description').setValue(this.flashSaleseDtail['description']);
        this.flashSaleForm.get('start_time').setValue(moment(this.flashSaleseDtail['start_time'], "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm'));
        this.flashSaleForm.get('end_time').setValue(moment(this.flashSaleseDtail['end_time'], "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm'));
        this.flashSaleForm.get('schedule_at').setValue(moment(this.flashSaleseDtail['schedule_at'], "DD-MM-YYYY HH:mm").format('DD-MM-YYYY HH:mm'));

        let flash_sale_items = [];
        let tempItem = {
          product_store_item_id: null,
          special_price: null,
        }
        this.flashSaleseDtail['flash_sale_items'].forEach(element => {
          tempItem.product_store_item_id = element.product_store_item_id;
          tempItem.special_price = element.special_price;
          flash_sale_items.push(tempItem);
        });
        let sale_itemReq: any = flash_sale_items;
        this.flashSaleForm.get('flash_sale_items_attributes').setValue(JSON.stringify(sale_itemReq));
      }

    });

  }
  get f() {
    return this.flashSaleForm.controls;
  }

  onSubmit() {
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
  }

  delete(date) {
    this.flashSaleForm.get(date).setValue('');
  }

  get actionText() {
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
