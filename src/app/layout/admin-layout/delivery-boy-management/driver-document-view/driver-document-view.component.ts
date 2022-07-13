import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-document-view',
  templateUrl: './driver-document-view.component.html',
  styleUrls: ['./driver-document-view.component.css']
})
export class DriverDocumentViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DriverDocumentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('DATA DOCUMENT', this.data)
  }

  ngOnInit() {
  }

}
