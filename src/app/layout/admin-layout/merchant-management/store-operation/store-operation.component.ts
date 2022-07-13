import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreOperationDetails, PostStoreOperationDetails } from '../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-store-operation',
    templateUrl: './store-operation.component.html',
    styleUrls: ['./store-operation.component.css']
})
export class StoreOperationComponent implements OnInit {
    operation_timings = null;
    wo_order_when_closed = '';
    pl_order_when_closed = '';
    planned_close = '';
    planned_close_timing = [];
    storeId = null;
    storeOperationDetails = null
    date: Date = new Date();
    date2: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:a',
        defaultOpen: false
    }


    constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {
        this.storeId = this.activatedRoute.snapshot.params.storeId;

        this.store.dispatch(new GetStoreOperationDetails(this.storeId));

    }

    ngOnInit() {
        this.store.pipe(select('merchantManagement')).subscribe(res => {
            if (res.storeOperationDetails && res.storeOperationDetails.length > 0) {
                this.storeOperationDetails = res.storeOperationDetails[0]
                this.operation_timings = this.storeOperationDetails.weekly_open.operation_timings
                this.wo_order_when_closed = this.storeOperationDetails.weekly_open.order_when_closed
                this.planned_close = this.storeOperationDetails.planned_closed
                if (this.storeOperationDetails.planned_closed_params) {
                    this.pl_order_when_closed = this.storeOperationDetails.planned_closed_params.order_when_closed
                    this.planned_close_timing = this.storeOperationDetails.planned_closed_params.planned_closed_timing
                }
                console.log(this.storeOperationDetails)
                //   this.storeOperationDetails();

            }
        });
    }

    formatAMPM(dateobj) {
        const date = new Date(Number(dateobj))
        let hours = date.getHours();
        let minutes: any = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    formatDate(dateobj) {
        const date = new Date(dateobj)
        return date;
    }
    getOpeningAndClosingTime(event, i, type) {
        const time = moment('2011-10-31 ' + event, 'YYYY-MM-DD h:mm a').format('x');
        console.log('time', time);
        if (type == 'openTime') {
            this.operation_timings[i]['openTime'] = Number(time)
        } else {
            this.operation_timings[i]['closeTime'] = Number(time)
        }
    }
    addHoliday() {
        this.planned_close_timing.push({
            start_date: new Date().getTime(),
            end_date: new Date().getTime(),
            add_order_when_closed: 'RESTRICT',
        });

    }
    onDateSelect(event, i, type) {
        if (type == 'start_date') {
            this.planned_close_timing[i]['start_date'] =  event.target.value;

        } else {
            this.planned_close_timing[i]['end_date'] = event.target.value;
        }
    }
    onSubmit() {

        if (this.planned_close_timing) {
            this.planned_close_timing.forEach(element => {
                console.log(element)
                element.start_date = new Date(element.start_date).getTime()
                element.end_date = new Date(element.end_date).getTime()
            });
        }
        const payload = {
            "id": this.storeId,
            "storeOperation": {
                "weekly_open": {
                    "operation_timings": this.operation_timings,
                    "order_when_closed": this.wo_order_when_closed
                },
                "planned_closed": this.planned_close_timing ? "YES" : "NO",
                "planned_closed_params": {
                    // "order_when_closed": this.pl_order_when_closed,
                    "planned_closed_timing": this.planned_close_timing
                }
            }
        }
        console.log(payload)
        this.store.dispatch(new PostStoreOperationDetails(payload))
    }

    onDeletePlannedHoliday(i) {
        this.planned_close_timing.splice(i, 1);
    }
}
