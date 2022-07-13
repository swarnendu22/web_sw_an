import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateFormater',
})
export class DateFormaterPipe implements PipeTransform {
  transform(value: number, format: string, valueType: string): any {
    return moment(value,valueType).format(format)
  }
}
