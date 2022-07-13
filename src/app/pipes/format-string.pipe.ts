import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString',
})
export class FormatStringPipe implements PipeTransform {
  transform(value: string): any {
    return value === null || value === undefined
      ? ''
      : value.replace(/[^a-z0-9]+/gi, '-');
  }
}
