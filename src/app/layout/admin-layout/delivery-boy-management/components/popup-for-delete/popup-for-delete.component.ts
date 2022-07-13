import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-popup-for-delete',
  templateUrl: './popup-for-delete.component.html',
  styleUrls: ['./popup-for-delete.component.css']
})
export class PopupForDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupForDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  onSave(value) {
    this.dialogRef.close({ close: value });
  }

}
