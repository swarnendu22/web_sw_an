import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '../../../../../../../node_modules/@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '../../../../../../../node_modules/@ngrx/store';
import { UpdateDeMerchandiseInventory } from '../../../../../actions/delivery-boy-management.action';

@Component({
  selector: 'app-popup-de-merchandise',
  templateUrl: './popup-de-merchandise.component.html',
  styleUrls: ['./popup-de-merchandise.component.css']
})
export class PopupDeMerchandiseComponent implements OnInit {
  items: FormArray;
  deMerchandiseForm: FormGroup;
  id = null
  inventory_types = {
    'T-Shirt': ['S', 'M', 'L', 'XL', 'XXL'],
    'Winter Wear': ['S', 'M', 'L', 'XL', 'XXL'],
    'Raincoat': ['S', 'M', 'L', 'XL', 'XXL'],
    'Helmet': ['S', 'M', 'L', 'XL', 'XXL'],
    'Mobile Pouch': ['Standard'],
    'Bag': ['Standard'],
    'Arm Sleeves': ['Standard'],
    'Mask': ['Standard']
  }
  inventory_typeKeys = Object.keys(this.inventory_types)

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>, ) {
    this.id = this.data.id
  }

  createItem() {
    // if (this.items.length == 0) {
    return this.fb.group({
      'id': [null],
      'name': [null],
      'inventory_type': [null, [Validators.required]],
      'size': [null, [Validators.required]],
      'amount_paid': [null, [Validators.required]],
      "quantity": [null, [Validators.required]],
    });
    // }

  }

  addItem(): void {
    console.log('called')
    this.items = this.deMerchandiseForm.get('delivery_boy_inventories') as FormArray;
    this.items.push(this.createItem());

  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  get f() {
    return this.deMerchandiseForm.controls;
  }
  get formArr() {
    return this.deMerchandiseForm.get('delivery_boy_inventories') as FormArray;
  }

  formArrControls(i) {
    let control = this.deMerchandiseForm.get('delivery_boy_inventories') as FormArray;
    return control.at(i);
  }



  ngOnInit() {
    this.deMerchandiseForm = this.fb.group({
      delivery_boy_inventories: this.fb.array([this.createItem()]),
      security_deposit_amount: ['']
    })
  }

  submitDeMerchandise() {
    if (this.deMerchandiseForm.valid) {
      const payload = {
        delivery_boys: [{
          id: this.id,
          security_deposit_amount: this.deMerchandiseForm.get('security_deposit_amount').value,
          delivery_boy_inventories: this.deMerchandiseForm.get('delivery_boy_inventories').value
        }]
      }
      console.log(payload)
      this.store.dispatch(new UpdateDeMerchandiseInventory(payload))
    } else {
      this.markFormGroupTouched(this.deMerchandiseForm)
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
