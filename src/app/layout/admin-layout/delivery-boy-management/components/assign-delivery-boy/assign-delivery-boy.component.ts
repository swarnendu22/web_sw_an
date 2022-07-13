import { Component, OnInit, Inject } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { GetDeliveryBoyList, AssignDeliveryBoy } from 'src/app/actions/delivery-boy-management.action';

@Component({
  selector: 'app-assign-delivery-boy',
  templateUrl: './assign-delivery-boy.component.html',
  styleUrls: ['./assign-delivery-boy.component.css']
})
export class AssignDeliveryBoyComponent implements OnInit {
  defaultSelected = 0
  assignedDeliveryBoy = []
  loading = false
  deliveryBoy = null
  deliveryBoysList = [
    {
      id: 1,
      name: 'xyz',
      distance: '20km'
    },
    {
      id: 2,
      name: 'abc',
      distance: '30km'
    },
    {
      id: 3,
      name: 'xnpo',
      distance: '10km'
    },
    {
      id: 4,
      name: 'ijk',
      distance: '50km'
    },
    {
      id: 5,
      name: 'efg',
      distance: '25km'
    },
    {
      id: 6,
      name: 'dkjs',
      distance: '30km'
    },
  ]
  constructor(private ag: AgGridOptions,
    // tslint:disable-next-line: align
    private store: Store<any>,
    public dialogRef: MatDialogRef<AssignDeliveryBoyComponent>,
    private apiMsgService: ApiMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Data', this.data);
    this.store.dispatch(new GetDeliveryBoyList({
      seller_order_id: this.data.item.id, length: 1, width: 2,
      height: 1,
      weight: 1,
      radius: 10000000000000000
    }));
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.deliveryBoyList) {
          this.loading = false;
          console.log('ORDER LISTING', res.deliveryBoyList)

          this.assignedDeliveryBoy = res.deliveryBoyList;
        }
      });
  }

  showInfo(e) {
    console.log('E', e)
  }

  changeDeliveryBoy(value) {
    this.deliveryBoy = this.assignedDeliveryBoy[value];
    console.log('Delievry Boy', this.deliveryBoy, value);
  }

  assignDeliveryBoy() {
    console.log('assign Delievry Boy', this.deliveryBoy, this.data)
    this.store.dispatch(new AssignDeliveryBoy({
      id: this.deliveryBoy.id,
      seller_order_id: this.data.item.id,
      length: 1, width: 2,
      height: 1,
      weight: 1,
      delivery_time: 30
    }));
    this.apiMsgService.currentApiStatus.subscribe(data => {
      if (data.status && data.type === 'ASSIGN_DELIVERY_BOY') {
        this.dialogRef.close();
      }
    })
  }

}
