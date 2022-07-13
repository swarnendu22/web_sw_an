import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockTypeInput]'
})
export class BlockTypeInputDirective {
  constructor() { }

  @HostListener('keydown', ['$event']) blockType(e: KeyboardEvent) {
    e.preventDefault();
  }
}