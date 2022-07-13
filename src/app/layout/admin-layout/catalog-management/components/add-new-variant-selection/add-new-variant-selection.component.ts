import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '../../../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-new-variant-selection',
  templateUrl: './add-new-variant-selection.component.html',
  styleUrls: ['./add-new-variant-selection.component.css']
})
export class AddNewVariantSelectionComponent implements OnInit {
  public myVariantFilterCtrl: FormControl = new FormControl();
  public myProdVariantFilterCtrl: FormControl = new FormControl();
  public myprodvariantSubValueFilterCtrl: FormControl = new FormControl();
  @Input() tempProductVariant;
  @Input() variantBasedOnVariant;
  @Input() showSelected;
  @Input() newVariant;
  @Input() isEdit;
  @Output() onproductVariantSelectChange = new EventEmitter();
  @Output() onproductVariantValueChange = new EventEmitter();
  @Output() onremoveChosenVariantValue = new EventEmitter();
  variantInput = '';
  constructor() { }

  ngOnInit() {
    console.log('New Variant', this.newVariant);
  }
  productVariantSelectChange(event) {
    this.onproductVariantSelectChange.emit(event);
  }
  productVariantValueChange(event, variantId, prevValues) {
    console.log('PRODUCT VALUE', variantId, prevValues, event.value)
    let preVal = prevValues.split(',');
    if (event.value.length > preVal.length) {
      const modEvent = event.value.join(',');
      console.log('Event val', modEvent);
      this.onproductVariantValueChange.emit({ event: { value: modEvent }, variantId });
      preVal = event.value.length;
    } else {
      this.removeChosenVariantValue(event.value);
      preVal = event.value.length;
    }
  }
  productVariantForTypeInput(event, variantId, prevValues) {

  }
  removeChosenVariantValue(index) {
    console.log('REMOVE VALUE', index)
    this.onremoveChosenVariantValue.emit(index);
  }

  openChange(e) {
    return 'opened';
  }
  detectCommaPress(event, variantId, prevValues) {
    console.log(event);
    if (event.keyCode === 188) {
      const inputValue = this.variantInput.slice(0, -1);
      this.productVariantValueChange({ value: inputValue }, variantId, prevValues);
      this.variantInput = '';
      // event.preventDefault();
      return 0;
    }
    // const keyCode = event.keyCode
  }
  disableValue(currentVal, checkedState) {
    let finalVal: boolean;
    if (this.isEdit == null) {
      finalVal = false
    } else {
      let index = checkedState.findIndex(val => val === currentVal);
      if (index != -1) {
        finalVal = true
      } else {
        finalVal = false
      }
    }
    return finalVal;
  }
}
