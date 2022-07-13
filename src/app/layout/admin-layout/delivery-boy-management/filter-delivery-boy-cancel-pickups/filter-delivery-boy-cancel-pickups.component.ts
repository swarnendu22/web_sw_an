import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-delivery-boy-cancel-pickups',
  templateUrl: './filter-delivery-boy-cancel-pickups.component.html',
  styleUrls: ['./filter-delivery-boy-cancel-pickups.component.css']
})
export class FilterDeliveryBoyCancelPickupsComponent implements OnInit {

  status = null
  payLoadForSearch = {}
  constructor(public dialogRef: MatDialogRef<FilterDeliveryBoyCancelPickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.payLoadForSearch && this.data.payLoadForSearch.search) {
      this.status = this.data.payLoadForSearch.search
    }
  }

  ngOnInit() {
  }

  process(processType) {
    if (processType === 'process') {
      this.payLoadForSearch['search'] = this.status
      if (this.payLoadForSearch) {
        this.dialogRef.close(this.payLoadForSearch);
      } else {
        this.dialogRef.close(null);
      }
    }
    else {
      this.dialogRef.close(null);
    }
  }

  clearfilter() {
    this.status = null;

  }
}
