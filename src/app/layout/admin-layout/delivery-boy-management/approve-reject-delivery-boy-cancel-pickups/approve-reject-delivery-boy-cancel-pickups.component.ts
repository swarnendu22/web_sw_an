import { Component, OnInit } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { GetDeliveryBoyCancelPickupReasons } from 'src/app/actions/delivery-boy-management.action';

@Component({
  selector: 'app-approve-reject-delivery-boy-cancel-pickups',
  templateUrl: './approve-reject-delivery-boy-cancel-pickups.component.html',
  styleUrls: ['./approve-reject-delivery-boy-cancel-pickups.component.css']
})
export class ApproveRejectDeliveryBoyCancelPickupsComponent implements OnInit {

  constructor(private ag: AgGridOptions,
    // tslint:disable-next-line: align
    private store: Store<any>, private dialog: MatDialog, private apiMsgService: ApiMessageService) { }

  ngOnInit() {
    this.store.dispatch(new GetDeliveryBoyCancelPickupReasons());
  }

}
