import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[pancardValidation]'
})
export class PancardValidationDirective {

    // tslint:disable-next-line: no-input-rename

    constructor(private control: NgControl) { }

    PANCARD_ALLOWED_CHARS_REGEXP = new RegExp('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
    @HostListener("keyup", ["$event"]) onKeyUp(e) {
        console.log('Test', e.target.value)
        if (this.isValidPanCard(e.target.value)) {
            e.target.value = e.target.value.toUpperCase()
        } else {
            console.log('FLASE')
            e.target.value.replace(e.target.value.length - 1, '')
            // e.preventDefault();
        }
    }

    isValidPanCard(str) {
        let result = false
        console.log('Str length', str.length)
        if (str.length >= 0 && str.length <= 5) {
            let regex = new RegExp('^[A-Z]+$')
            result = regex.test(str.toUpperCase())
        } else if (str.length > 5 && str.length <= 9) {
            let regex = /([A-Z]){5}([0-9])+$/
            result = regex.test(str.toUpperCase())
        } else if (str.length > 9 && str.length <= 10) {
            let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}/
            result = regex.test(str.toUpperCase())
        }
        // var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        // console.log("REG TEST:::::::::::::::;", str, regex.test(str.toUpperCase()))
        // return regex.test(str.toUpperCase())
        console.log('Match result::::::::::::::', result)
        return result
    }
}