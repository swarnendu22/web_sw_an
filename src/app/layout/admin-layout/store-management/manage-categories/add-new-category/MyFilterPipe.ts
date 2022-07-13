import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dropdownfilter',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any, key = 'name'): any {
        if (!items) return [];
        if (!filter) return items;

        filter = filter.toLowerCase();

        if (key.length !== 0) {
            return items.filter((it) => {
                if (it[key] != null) {

                    return it[key].toLowerCase().includes(filter);
                }

            });
        }
        else {
            return items.filter((it) => {
                return it.toLowerCase().includes(filter);
            });
        }



    }
}