import { Directive, HostListener } from '@angular/core';
  
  @Directive({
    selector: '[appDoubleSubmit]'
  })
  export class DoubleSubmitDirective {
    constructor() { }
  
    @HostListener('click', ['$event'])
    clickEvent(event) {
      event.srcElement.parentElement.setAttribute('disabled', true);
      setTimeout(function(){
        event.srcElement.parentElement.removeAttribute('disabled');
      }, 500);
    }
  }