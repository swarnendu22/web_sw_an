import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.css']
})
export class SubscriptionDialogComponent implements OnInit {

  // Date:any = '';
  subscriptionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log( this.data )
  }

  Submit(){
    if( this.subscriptionForm.valid){
      this.subscriptionForm.get('date').setValue( this.subscriptionForm.get('date').value.toISOString() );
      this.dialogRef.close( this.subscriptionForm.value );
    }    
  }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      subscriptionType: ['BASIC', [Validators.required]],
      maxStore: ['', [Validators.required]],
      date: ['', [Validators.required]],
      otp: ['', [Validators.required]]
    })
  }

}
