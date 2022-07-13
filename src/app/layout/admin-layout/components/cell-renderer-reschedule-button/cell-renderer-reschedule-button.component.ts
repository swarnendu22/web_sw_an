import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '../../../../../../node_modules/ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { AssignTrainingPopupComponent } from '../../delivery-boy-management/components/assign-training-popup/assign-training-popup.component';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { ActionTypes, GetDeliveryBoyByStatus } from 'src/app/actions/delivery-boy-management.action';


@Component({
  selector: 'app-cell-renderer-reschedule-button',
  templateUrl: './cell-renderer-reschedule-button.component.html',
  styleUrls: ['./cell-renderer-reschedule-button.component.css']
})
export class CellRendererRescheduleButtonComponent implements ICellRendererAngularComp {

  public params: any;
  public cell: any;
  rescheduled_count = null
  status = null

  constructor(private dialog: MatDialog, private apiMsgService: ApiMessageService) { }

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: this.params.value, col: this.params.colDef.headerName }
    this.rescheduled_count = this.params.data.delivery_boy_traning ? this.params.data.delivery_boy_traning.re_schedule_count : null
    this.status = this.params.data.delivery_boy_traning ? this.params.data.delivery_boy_traning.status : null
    console.log(this.rescheduled_count)

  }



  public reschedule() {
    if (this.params.onReschedule instanceof Function) {
      const payload = {
        alldata: this.params.data
      }
      this.params.onReschedule(payload);
    }

    // const dialogRef = this.dialog.open(AssignTrainingPopupComponent, {
    //   minHeight: '500px',
    //   width: '600px',
    //   panelClass: 'training-modal',
    //   data: {
    //     bulkOperationList: [this.params.data.id],
    //     type: 'RE-SCHEDULE'
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {

    //   this.apiMsgService.currentApiStatus.subscribe((response) => {
    //     let res: any = response.status;
    //     if (res && response.type == ActionTypes.assignTrainingToDeliveryBoy) {
    //       this.store.dispatch(new GetDeliveryBoyByStatus({
    //         "pageNo": this.pageNo,
    //         "status": this.status,
    //         "requestBody": this.payLoadForSearch
    //       }));
    //     }
    //   })
    // console.log(`Dialog result: ${result}`);
    // });
  }

  refresh() {
    return false;
  }

}
