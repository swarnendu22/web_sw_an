import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {
  elemRef: ElementRef;
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  @Input() DecimalPlaces: string;
  @Input() minValue: string;
  @Input() maxValue: string;

  constructor(private el: ElementRef) {
    this.elemRef = el;
  }
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <any> event;
    console.log(event);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');

    if((e.keyCode == 65 && e.ctrlKey === true)) {}
    else if((e.keyCode == 88 && e.ctrlKey === true)) {}
    else if((e.keyCode == 67 && e.ctrlKey === true)) {}
    else if((e.keyCode == 86 && e.ctrlKey === true)) {
      this.restrict_decimal(event); 
    }
    else if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    this.restrict_decimal(event);
  }
  restrict_decimal(event) {
    let e = <any> event
    let valInFloat: number = parseFloat(e.target.value);
    console.log('e.target.value1',e.target.value);  
    if(this.minValue.length) {
      // (isNaN(valInFloat) && e.key === "0") - When user enters value for first time valInFloat will be NaN, e.key condition is 
      // because I didn't want user to enter anything below 1.
      // NOTE: You might want to remove it if you want to accept 0
      if( valInFloat < parseFloat(this.minValue) ) {
        e.preventDefault();
      }
    }

    if(this.maxValue.length) {
      if(valInFloat > parseFloat(this.maxValue)) {
        e.preventDefault();
      }
    }

    if (this.DecimalPlaces) {
      let currentCursorPos: number = -1;    
      if (typeof this.elemRef.nativeElement.selectionStart == "number") {
          currentCursorPos = this.elemRef.nativeElement.selectionStart;
      } else {
        // Probably an old IE browser 
        console.log("This browser doesn't support selectionStart");
      }

      let dotLength: number = e.target.value.replace(/[^\.]/g, '').length
      // If user has not entered a dot(.) e.target.value.split(".")[1] will be undefined
      let decimalLength = e.target.value.split(".")[1] ? e.target.value.split(".")[1].length : 0;

      // (this.DecimalPlaces - 1) because we don't get decimalLength including currently pressed character 
      // currentCursorPos > e.target.value.indexOf(".") because we must allow user's to enter value before dot(.)
      // Checking Backspace etc.. keys because firefox doesn't pressing them while chrome does by default
      if( dotLength > 1 || (dotLength === 1 && e.key === ".") || (decimalLength > (parseInt(this.DecimalPlaces) - 1) && 
        currentCursorPos > e.target.value.indexOf(".")) && ["Backspace", "ArrowLeft", "ArrowRight"].indexOf(e.key) === -1 ) {
        e.preventDefault();
      }
    }  
  }
}