import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-details-history-modal',
  templateUrl: './driver-details-history-modal.component.html',
  styleUrls: ['./driver-details-history-modal.component.css']
})
export class DriverDetailsHistoryModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DriverDetailsHistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  driverHistoryList = this.data;
  ngOnInit() {

    console.log('Inside History, data -> ', this.data);
  }

}
