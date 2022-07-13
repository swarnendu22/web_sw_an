import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-store-user-rest-password',
  templateUrl: './store-user-rest-password.component.html',
  styleUrls: ['./store-user-rest-password.component.css']
})
export class StoreUserRestPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoreUserRestPasswordComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log( data );
   }

  ngOnInit(): void {
  }

  SubmitPassword( password ){
    this.dialogRef.close( password );
  }

}
