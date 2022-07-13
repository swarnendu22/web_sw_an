import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitImageNamefromURL'
})
export class SplitImageNamefromURLPipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      let fileName = value.split('/delivery_boy_img/')[1]
      return fileName.split('?')[0];
    } else {
      return '';
    }
  }
}
