import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-de-users-component',
  templateUrl: './filter-de-users-component.component.html',
  styleUrls: ['./filter-de-users-component.component.css']
})
export class FilterDeUsersComponent implements OnInit {
  status = null
  state_name = null
  vehicle_type = null
  payLoadForSearch = {}
  constructor(public dialogRef: MatDialogRef<FilterDeUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.payLoadForSearch && this.data.payLoadForSearch.search) {
      this.status = this.data.payLoadForSearch.search
    }

    if (this.data.payLoadForSearch && this.data.payLoadForSearch.state_name) {
      this.state_name = this.data.payLoadForSearch.state_name
    }

    if (this.data.payLoadForSearch && this.data.payLoadForSearch.vehicle_type) {
      this.vehicle_type = this.data.payLoadForSearch.vehicle_type
    }
  }

  ngOnInit() {
  }

  process(processType) {
    if (processType === 'process') {
      this.payLoadForSearch['search'] = this.status
      this.payLoadForSearch['state_name'] = this.state_name
      this.payLoadForSearch['vehicle_type'] = this.vehicle_type
      if (this.payLoadForSearch) {
        this.dialogRef.close(this.payLoadForSearch);
      } else {
        this.dialogRef.close(null);
      }
    } else {
      this.dialogRef.close(null);
    }
  }

  clearfilter() {
    this.status = null;
    this.state_name = null;

  }

}
