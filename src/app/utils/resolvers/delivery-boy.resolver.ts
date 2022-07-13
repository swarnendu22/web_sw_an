import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { select, Store } from '@ngrx/store';
import { GetAllCountry } from 'src/app/actions/delivery-boy-management.action';
import { RequestService } from '../request/request.service';
import { map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class DECountryResolver implements Resolve<any> {
    constructor(private store: Store<any>, private request: RequestService) {
    }

    resolve() {
        return this.request.request({
            url: `/api/geomaster/master-api/countries-all`,
            method: 'get',
        }, true, false
        ).pipe(
            map(response => response['payload'])
        ).catch(() => [])
    }
}