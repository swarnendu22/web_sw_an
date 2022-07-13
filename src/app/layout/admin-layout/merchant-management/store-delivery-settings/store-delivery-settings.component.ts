import { GetStoreDeliveryPartner, GetStoreDeliverySettings, UpdateNewStoreDeliverySettings } from './../../../../actions/merchant-management.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { VersionUpdateService } from 'src/app/utils/swUpdate/version-update.service';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-store-delivery-settings',
  templateUrl: './store-delivery-settings.component.html',
  styleUrls: ['./store-delivery-settings.component.css']
})
export class StoreDeliverySettingsComponent implements OnInit {
  storeDeliverySettingsForm: FormGroup;
  // selected = "min";
  storeId = null;
  storeDeliverySettings = null;
  storeStorePickUp = null;
  storePickUp = null;
  storeStartTime = null;
  storeEndTime = null;
  sellerBearDelivery = false;
  sellerChargeShare = false;
  sellerBearDeliveryPost = null;
  sellerChargeSharePost = null;
  orderProcessingArr = null
  storePickUpTimes = [{
    slot_name: '',
    slot_remarks: '',
    slot_start_time: new Date().getTime(),
    slot_end_time: new Date().getTime(),
  }];
  deliveryPartnerLength: number = 0;
  deliveryPartnerList = [];
  allowMarketPlace_toogle: boolean = false;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private _router: VersionUpdateService) {

    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreDeliverySettings(this.storeId));

  }

  ngOnInit() {
    this.storeDeliverySettingsForm = this.fb.group({
      id: ['', Validators.required],
      order_processing_time: ['', Validators.required],
      order_processing_time_unit: [''],
      store_pickup: [''],
      store_pickup_time: [''],
      store_pickup_note: [''],
      store_pickup_payment_terms: [''],
      self_delivery: [''],
      sd_max_delivery_range: [''],
      sd_distance_unit: [''],
      sd_free_range: [''],
      sd_free_cart_value: [''],
      sd_fixed_delivery_charge: [''],
      sd_additional_cost_unit: [''],
      self_delivery_note: [''],
      self_delivery_payment_terms: [''],
      partner_delivery: [''],
      pd_seller_bear_delivery_charge: [''],
      pd_charge_sharing: [''],
      pd_seller_bear_max: [''],
      pd_charge_share_max: [''],
      pd_seller_bear_above_cart_value: [''],
      pd_seller_bear_max_cart_percentage: [''],
      partner_delivery_note: [''],
      partner_delivery_payment_terms: [''],
      isStoreOperationTimingChange: [''],
      allowMarketplace: [''],
      allowCartWithOthers: [''],
    })
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeDeliverySettings) {
        this.storeDeliverySettings = res.storeDeliverySettings[0]['deliveryAttributes'];
        this.orderProcessingArr = res.storeDeliverySettings[0]['orderProcessing'];
        this.storeDeliverySettingsForm.get('isStoreOperationTimingChange').setValue(res.storeDeliverySettings[0]['isStoreOperationTimingChange']);
        this.storeDeliverySettingsForm.get('allowCartWithOthers').setValue(res.storeDeliverySettings[0]['allowCartWithOthers']);
        this.storeDeliverySettingsForm.get('allowMarketplace').setValue(res.storeDeliverySettings[0]['allowMarketplace']);
        this.allowMarketPlace_toogle = res.storeDeliverySettings[0]['allowMarketplace'];
        this.storeDeliverySettingsForm.get('id').setValue(this.storeId);

        if (this.storeDeliverySettings) {
          if (this.storeDeliverySettings.order_fulfillment) {
            this.storeDeliverySettingsForm.get('order_processing_time').setValue(this.storeDeliverySettings.order_fulfillment.order_processing_time);
            this.storeDeliverySettingsForm.get('order_processing_time_unit').setValue(this.storeDeliverySettings.order_fulfillment.time_unit);
          }

          this.storeDeliverySettingsForm.get('store_pickup').setValue(this.storeDeliverySettings.store_pickup);

          if (this.storeDeliverySettings.store_pickup_params) {
            this.setPickUpNote(this.storeDeliverySettings.store_pickup_params.pickup_time);
            this.storeDeliverySettingsForm.get('store_pickup_note').setValue(this.storeDeliverySettings.store_pickup_params.note);
            this.storeDeliverySettingsForm.get('store_pickup_payment_terms').setValue(this.storeDeliverySettings.store_pickup_params.terms);
          }
          this.storeDeliverySettingsForm.get('self_delivery').setValue(this.storeDeliverySettings.self_delivery);

          if (this.storeDeliverySettings.self_delivery_params) {
            this.storeDeliverySettingsForm.get('sd_max_delivery_range').setValue(this.storeDeliverySettings.self_delivery_params.max_delivery_range);
            this.storeDeliverySettingsForm.get('sd_distance_unit').setValue(this.storeDeliverySettings.self_delivery_params.distance_unit);
            this.storeDeliverySettingsForm.get('sd_free_range').setValue(this.storeDeliverySettings.self_delivery_params.free_delivery_range);
            this.storeDeliverySettingsForm.get('sd_fixed_delivery_charge').setValue(this.storeDeliverySettings.self_delivery_params.fixed_delivery_charge);
            this.storeDeliverySettingsForm.get('sd_free_cart_value').setValue(this.storeDeliverySettings.self_delivery_params.free_delivery_cart_value);
            this.storeDeliverySettingsForm.get('sd_additional_cost_unit').setValue(this.storeDeliverySettings.self_delivery_params.additional_delivery_cost_per_unit);
            this.storeDeliverySettingsForm.get('self_delivery_note').setValue(this.storeDeliverySettings.self_delivery_params.note);
            this.storeDeliverySettingsForm.get('self_delivery_payment_terms').setValue(this.storeDeliverySettings.self_delivery_params.terms);

          }

          this.storeDeliverySettingsForm.get('partner_delivery').setValue(this.storeDeliverySettings.partner_delivery);

          if (this.storeDeliverySettings.partner_delivery_params) {
            this.sellerBearDelivery = this.storeDeliverySettings.partner_delivery_params.seller_bear_deliver_charge;
            this.sellerBearDelivery === true ? this.storeDeliverySettingsForm.get('pd_seller_bear_delivery_charge').setValue("YES") : this.storeDeliverySettingsForm.get('pd_seller_bear_delivery_charge').setValue("NO"),
              this.sellerChargeShare = this.storeDeliverySettings.partner_delivery_params.charge_sharing_with_customer;
            this.sellerChargeShare === true ? this.storeDeliverySettingsForm.get('pd_charge_sharing').setValue("YES") : this.storeDeliverySettingsForm.get('pd_charge_sharing').setValue("NO"),
              //   this.storeDeliverySettingsForm.get('pd_max_delivary_range_unit').setValue(this.storeDeliverySettings.partner_delivery_params.max_delivary_range_unit); //
              this.storeDeliverySettingsForm.get('pd_seller_bear_max').setValue(this.storeDeliverySettings.partner_delivery_params.seller_bear_max_value);
            if (this.storeDeliverySettings.partner_delivery_params.seller_bear_above_cart_value) {
              this.storeDeliverySettingsForm.get('pd_charge_share_max').setValue(this.storeDeliverySettings.partner_delivery_params.seller_bear_above_cart_value);
            }
            this.storeDeliverySettingsForm.get('partner_delivery_note').setValue(this.storeDeliverySettings.partner_delivery_params.note);
            this.storeDeliverySettingsForm.get('partner_delivery_payment_terms').setValue(this.storeDeliverySettings.partner_delivery_params.terms);
            this.storeDeliverySettingsForm.get('pd_seller_bear_max_cart_percentage').setValue(this.storeDeliverySettings.partner_delivery_params.seller_bear_max_cart_percentage);
          }
        }
      }
    });

    this.getStoreDeliveryPartnerList();
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeDeliveryPartnerList) {
        this.deliveryPartnerList = res.storeDeliveryPartnerList;
        this.deliveryPartnerLength = res.storeDeliveryPartnerList.length;
      }
    });

  }

  setPickUpNote(storePickUpArr) {
    let storePickUpTemp: String = "";
    if (storePickUpArr && storePickUpArr.length > 0) {
      storePickUpArr.forEach(element => {
        const start_time = this.formatAMPM(element.slot_start_time);
        const end_time = this.formatAMPM(element.slot_end_time);
        storePickUpTemp += `(${start_time} - ${end_time}) - ${element.slot_name} - ${element.slot_remarks} .\n`;

      });
      this.storePickUp = storePickUpTemp;
      console.log(this.storePickUp)
      this.storePickUpTimes = storePickUpArr
      this.storeDeliverySettingsForm.get('store_pickup_note').setValue(this.storePickUp);
    }
  }

  formatAMPM(dateobj) {
    const date = new Date(Number(dateobj))
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  getStoreDeliveryPartnerList(){
    this.store.dispatch(new GetStoreDeliveryPartner( { storeId: this.storeId} ));
  }

  submit() {
    if (this.storeDeliverySettingsForm.valid) {
      this.sellerBearDeliveryPost = this.storeDeliverySettingsForm.value['pd_seller_bear_delivery_charge'];
      this.sellerChargeSharePost = this.storeDeliverySettingsForm.value['pd_charge_sharing'];
      const processingTime = this.orderProcessingArr.find(e => e.order_processing_time == this.storeDeliverySettingsForm.value['order_processing_time'])

      const payload = {
        deliveryAttributes: {
          order_fulfillment: {
            order_processing_time: processingTime['order_processing_time'],
            time_unit: processingTime['time_unit'],
            caption: processingTime['caption']
          },

          partner_delivery: this.storeDeliverySettingsForm.value['partner_delivery'],
          partner_delivery_params: {
            charge_sharing_with_customer: this.sellerChargeSharePost == "YES" ? true : false,
            seller_bear_above_cart_value: this.storeDeliverySettingsForm.value['pd_charge_share_max'],
            note: this.storeDeliverySettingsForm.value['partner_delivery_note'],
            terms: this.storeDeliverySettingsForm.value['partner_delivery_payment_terms'],
            seller_bear_deliver_charge: this.sellerBearDeliveryPost == "YES" ? true : false,
            seller_bear_max_value: this.storeDeliverySettingsForm.value['pd_seller_bear_max'],
            seller_bear_max_cart_percentage: this.storeDeliverySettingsForm.value['pd_seller_bear_max_cart_percentage']
          },
          self_delivery: this.storeDeliverySettingsForm.value['self_delivery'],
          self_delivery_params: {
            additional_delivery_cost_per_unit: this.storeDeliverySettingsForm.value['sd_additional_cost_unit'],
            distance_unit: this.storeDeliverySettingsForm.value['sd_distance_unit'],
            free_delivery_cart_value: this.storeDeliverySettingsForm.value['sd_free_cart_value'],
            free_delivery_range: this.storeDeliverySettingsForm.value['sd_free_range'],
            fixed_delivery_charge: this.storeDeliverySettingsForm.value['sd_fixed_delivery_charge'],
            max_delivery_range: this.storeDeliverySettingsForm.value['sd_max_delivery_range'],
            note: this.storeDeliverySettingsForm.value['self_delivery_note'],
            terms: this.storeDeliverySettingsForm.value['self_delivery_payment_terms']
          },
          store_pickup: this.storeDeliverySettingsForm.value['store_pickup'],
          store_pickup_params: {
            note: this.storeDeliverySettingsForm.value['store_pickup_note'],
            terms: this.storeDeliverySettingsForm.value['store_pickup_payment_terms'],
            // pickup_time: this.storeDeliverySettings && this.storeDeliverySettings.store_pickup_params ? this.storeDeliverySettings.store_pickup_params.pickup_time : null
            pickup_time: this.storePickUpTimes
          }
        },
        id: this.storeId,
        isStoreOperationTimingChange: this.storeDeliverySettingsForm.get('isStoreOperationTimingChange').value,
        allowCartWithOthers: this.storeDeliverySettingsForm.get('allowCartWithOthers').value,
        allowMarketplace: this.storeDeliverySettingsForm.get('allowMarketplace').value
      }
      console.log('Submit', payload)
      this.store.dispatch(new UpdateNewStoreDeliverySettings(payload))
    } else {
      this.markFormGroupTouched(this.storeDeliverySettingsForm)
    }
  }

  toggle(formcontrolname) {
    if (this.storeDeliverySettingsForm.get(formcontrolname).value == true)
      this.storeDeliverySettingsForm.get(formcontrolname).setValue(false)
    else
      this.storeDeliverySettingsForm.get(formcontrolname).setValue(true)

    // if (formcontrolname == 'store_pickup') {
    //   this.storeDeliverySettingsForm.get('store_pickup_note').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('store_pickup_payment_terms').setValidators([Validators.required])
    // } else if (formcontrolname == 'self_delivery') {
    //   this.storeDeliverySettingsForm.get('sd_max_delivery_range').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_max_delivary_range_unit').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_store_delivery_radius').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_free_range').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_free_delivery_radius_unit').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_free_cart_value').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_additional_cost').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('sd_additional_cost_unit').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('self_delivery_note').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('self_delivery_payment_terms').setValidators([Validators.required])
    // } else if (formcontrolname == 'partner_delivery') {

    //   this.storeDeliverySettingsForm.get('pd_max_delivery_range').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('pd_max_delivary_range_unit').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('pd_seller_bear_delivery_charge').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('pd_charge_sharing').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('pd_seller_bear_min_cart').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('pd_charge_share_max').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('partner_delivery_note').setValidators([Validators.required])
    //   this.storeDeliverySettingsForm.get('partner_delivery_payment_terms').setValidators([Validators.required])

    // }
    // this.storeDeliverySettingsForm.updateValueAndValidity()
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  toggleCharge(toggleCharge) {
    if (this.storeDeliverySettingsForm.get(toggleCharge).value == 'NO') {
      this.storeDeliverySettingsForm.get(toggleCharge).setValue('YES');

    } else {
      this.storeDeliverySettingsForm.get(toggleCharge).setValue('NO');

    }
  }

  addSlot() {
    this.storePickUpTimes.push(
      {
        slot_name: '',
        slot_remarks: '',
        slot_start_time: new Date().getTime(),
        slot_end_time: new Date().getTime(),
      }
    )
  }




  getOpeningAndClosingTime(event, i, type) {
    const time = moment('2011-10-31 ' + event, 'YYYY-MM-DD h:mm a').format('x')
    this.storePickUpTimes[i][type] = Number(time)

  }

  deleteSlot(i) {
    this.storePickUpTimes.splice(i, 1);
  }

  assignDeliveryTab() {
    this._router.moveToDeliverSetting.next( 11 );
  }
}
