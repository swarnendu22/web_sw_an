import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AddNewCommissionSettings, GetByIdCommissionSettings, UpdateCommissionSettings } from 'src/app/actions/delivery-boy-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-edit-de-commission-setting',
  templateUrl: './edit-de-commission-setting.component.html',
  styleUrls: ['./edit-de-commission-setting.component.css']
})
export class EditDeCommissionSettingComponent implements OnInit {

  commissionSettingsForm: FormGroup
  commissionSettingsDetails = null;
  id = null;
  constructor(
    public _fb: FormBuilder,
    private store: Store<any>,
    public apiService: ApiMessageService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.commissionSettingsForm = this._fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      base_rate: ['', Validators.required],
      base_distance_km: ['', Validators.required],
      base_weight_kg: ['', Validators.required],
      base_dimention_inch: ['', Validators.required],
      additional_per_kg: ['', Validators.required],
      additional_per_km: ['', Validators.required],
      additional_per_inch: ['', Validators.required],
      max_distance_km: ['', Validators.required],
      max_weight_kg: ['', Validators.required],
      max_dimention_inch: ['', Validators.required],
      max_order_allowed: ['', Validators.required],
      max_first_mile: ['', Validators.required],
      max_last_mile: ['', Validators.required],
    })

    this.store.dispatch(new GetByIdCommissionSettings({ id: this.id }))
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.getByIdCommissionSettings) {
          console.log(res.getByIdCommissionSettings);
          this.commissionSettingsDetails = res.getByIdCommissionSettings;
          this.setCommissionSettingsDetails()
        }
      });
  }

  goBackButton() {
    this.router.navigateByUrl('/delivery-boy/delivery-boy-commission-settings')
  }

  updateCommissionSettings() {
    console.log('Update', this.commissionSettingsForm.value)
    this.markFormGroupTouched(this.commissionSettingsForm)

    if (this.commissionSettingsForm.valid) {
      const payload = {
        id: this.id,
        requestBody: this.commissionSettingsForm.value,
      }
      this.store.dispatch(new UpdateCommissionSettings(payload))
      this.apiService.currentApiStatus.subscribe((response) => {
        if (response.status && response.type == 'DELIVERY_BOY_UPDATE_COMMISSION_SETTINGS') {
          this.router.navigate(['delivery-boy/delivery-boy-commission-settings'])
        }
      })
    }
  }

  setCommissionSettingsDetails() {
    this.commissionSettingsForm.get('name').setValue(this.commissionSettingsDetails.name)
    this.commissionSettingsForm.get('code').setValue(this.commissionSettingsDetails.code)
    this.commissionSettingsForm.get('base_rate').setValue(this.commissionSettingsDetails.base_rate)
    this.commissionSettingsForm.get('base_distance_km').setValue(this.commissionSettingsDetails.base_distance_km)
    this.commissionSettingsForm.get('base_weight_kg').setValue(this.commissionSettingsDetails.base_weight_kg)
    this.commissionSettingsForm.get('base_dimention_inch').setValue(this.commissionSettingsDetails.base_dimention_inch)
    this.commissionSettingsForm.get('additional_per_kg').setValue(this.commissionSettingsDetails.additional_per_kg)
    this.commissionSettingsForm.get('additional_per_km').setValue(this.commissionSettingsDetails.additional_per_km)
    this.commissionSettingsForm.get('additional_per_inch').setValue(this.commissionSettingsDetails.additional_per_inch)
    this.commissionSettingsForm.get('max_distance_km').setValue(this.commissionSettingsDetails.max_distance_km)
    this.commissionSettingsForm.get('max_weight_kg').setValue(this.commissionSettingsDetails.max_weight_kg)
    this.commissionSettingsForm.get('max_dimention_inch').setValue(this.commissionSettingsDetails.max_dimention_inch)
    this.commissionSettingsForm.get('max_order_allowed').setValue(this.commissionSettingsDetails.max_order_allowed)
    this.commissionSettingsForm.get('max_first_mile').setValue(this.commissionSettingsDetails.max_first_mile)
    this.commissionSettingsForm.get('max_last_mile').setValue(this.commissionSettingsDetails.max_last_mile)
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
