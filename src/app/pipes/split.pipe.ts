import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, delimitter: string): any {
    if (value) {
      return value.split(delimitter);
    } else {
      return value;
    }
  }

}
