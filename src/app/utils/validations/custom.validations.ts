import { FormControl } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomValidations {
    constructor() { }
    isNumber(inputText) {
        if (isNaN(inputText)) return false;
        return true;
    }

    isAlphanumeric(inputText) {
        const regex = /^[a-zA-Z0-9 ]+$/gm;
        if (regex.test(inputText)) return true;
        return false;
    }


    replaceToAlphanumeric(inputText) {
        return inputText.replace(/[^a-zA-Z ]/g, "");
    }

    isNumberWithDecimal(inputText) {
        const regex = /[0-9][.][0-9]+$/gm;
        if (regex.test(inputText)) return true;
        return false;
    }

    isPresent() {
        console.log("=========================================   SENRYSA   ================================");
    }

    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

}