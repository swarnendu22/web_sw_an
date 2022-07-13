import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddNewCommissionSettings } from 'src/app/actions/delivery-boy-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-add-de-commission-setting',
  templateUrl: './add-de-commission-setting.component.html',
  styleUrls: ['./add-de-commission-setting.component.css']
})
export class AddDeCommissionSettingComponent implements OnInit {

  commissionSettingsForm: FormGroup
  constructor(public _fb: FormBuilder, private store: Store<any>, public apiService: ApiMessageService, public router: Router) { }

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
  }

  goBackButton() {
    this.router.navigateByUrl('/delivery-boy/delivery-boy-commission-settings')
  }
  saveCommissionSettings() {
    console.log('Sav', this.commissionSettingsForm.value)
    this.markFormGroupTouched(this.commissionSettingsForm)
    if (this.commissionSettingsForm.valid) {
      this.store.dispatch(new AddNewCommissionSettings(this.commissionSettingsForm.value))
      this.apiService.currentApiStatus.subscribe((response) => {
        if (response.status && response.type == 'DELIVERY_BOY_ADD_NEW_COMMISSION_SETTINGS') {
          this.router.navigate(['delivery-boy/delivery-boy-commission-settings'])
        }
      })
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

}
