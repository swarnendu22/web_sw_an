import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-store-url',
  templateUrl: './add-store-url.component.html',
  styleUrls: ['./add-store-url.component.css']
})
export class AddStoreUrlComponent implements OnInit {

  registerUrl: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddStoreUrlComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log( data );
    this.urlStatus = this.data.urlStatus;    
  }
  
  externalErr: boolean = false;
  urlStatus: string;
  // internalErr: boolean = false;

  ngOnInit(): void {
    this.registerUrl = this.fb.group({
      externalDomain: ['', [ Validators.required]],
      // internalDomain: ['', [Validators.required]],
      externalsubdomain: [''],
      // internalsubdomain: [''],
      // internalProtocol: ['https'],
      externalProtocol: ['https'],
      // internalPublicUrl: [''],
      externalPublicUrl: [''],
      themeTextColor: ['#ffffff'],
      themeColor: ['#2497fb']      
    });
    if( this.data.urlDetails != null){
      let externalProtocol = this.data.urlDetails.externalProtocol.split(':');
      let string = this.data.urlDetails.externalPublicUrl;
        if (string.charAt(0) == "/") string = string.substr(1);
        if (string.charAt(string.length - 1) == "/") string = string.substr(0, string.length - 1);
  
      this.registerUrl.get('externalDomain').setValue( this.data.urlDetails.externalDomain );
      this.registerUrl.get('externalProtocol').setValue( externalProtocol[0] );
      this.registerUrl.get('externalPublicUrl').setValue( string );
      this.registerUrl.get('externalsubdomain').setValue( this.data.urlDetails.externalSubDomain.slice(0, -1) );
      
      let themeColor = this.data.urlDetails.themeColor;
      let themeTextColor = this.data.urlDetails.themeTextColor;
      if( !this.data.urlDetails.themeColor ){
          themeColor = '#2497fb';
      }
      if( !this.data.urlDetails.themeTextColor ){
        themeTextColor = '#ffffff';
      }
      this.registerUrl.get('themeColor').setValue( themeColor );
      this.registerUrl.get('themeTextColor').setValue( themeTextColor );
      this.Themebackground = themeColor;
      this.TextbackgroundColor = themeTextColor;

    }   

  }

  testDomain( value ){
   let splitDomain = value.split(".");
   if( splitDomain[1] ){
     return true;
   } 
    return false;
  }

  saveUrl(){
    if(this.registerUrl.valid){

      if( this.testDomain( this.registerUrl.get('externalDomain').value) ){
        this.dialogRef.close( this.registerUrl.value );
      }
      else{
        if( !this.testDomain( this.registerUrl.get('externalDomain').value) ){
          this.externalErr = true;
        }
        else{
          this.externalErr = false;
        }
      }

    } else{
      this.externalErr = false;
      this.markFormGroupTouched(this.registerUrl);
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  Themebackground: string = "#2497fb";
  TextbackgroundColor: string = "#ffffff";
  color: string = "red"
  updateThemeColor(value: string) {
    this.Themebackground = value;
  }
  updateTextColor(value){
    console.log( value )
    this.TextbackgroundColor = value;
  }

}
