import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeKeyArray',
    pure: false
})
export class FilterDataPipe implements PipeTransform {
    transform(categories: any[], filter: Object): any {
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return categories.filter(category => category.products == true);
    }
}