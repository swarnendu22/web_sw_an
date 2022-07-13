import { Pipe, PipeTransform } from '../../../node_modules/@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'groupBy' })

export class GroupByPipe implements PipeTransform {

    transform(collection: Array<any>, property: string): Array<any> {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if (!collection) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current) => {
            console.log(moment(current[property], 'X').format('DD-MM-YYYY'));
            let propertyDate = moment(current[property], 'X').format('DD-MM-YYYY');
            // var property = moment(current[property], 'x').format('DD-MM-YYYY');

            if (!previous[propertyDate]) {
                previous[propertyDate] = [current];
            } else {
                previous[propertyDate].push(current);
            }
            console.log(previous);

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }


}