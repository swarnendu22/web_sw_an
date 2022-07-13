import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface PayLoadForSearch {
  contactNo:string;
  storeName:string;
  regionName:string;
  zipCode:number;
  isAccending:boolean;
}


@Component({
  selector: 'app-delivery-request-search',
  templateUrl: './delivery-request-search.component.html',
  styleUrls: ['./delivery-request-search.component.css']
})
export class DeliveryRequestSearchComponent implements OnInit {

  payLoadForSearch : PayLoadForSearch = {
   contactNo:null,
   storeName:null,
   regionName:null,
   zipCode:null,
   isAccending:false
  }
  
  regionList = [];


  constructor(
    public dialogRef: MatDialogRef<DeliveryRequestSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public toaster:ToastrService
  ) { 
    this.regionList = this.data.regionList;
    if(this.data.payLoadForSearchIn){
       this.payLoadForSearch = this.data.payLoadForSearchIn;
    }
  }

  ngOnInit() {
  }

  process(processType){
    if(processType === 'process'){
      if(this.payLoadForSearch){
        this.dialogRef.close(this.payLoadForSearch);
      }
    }
    else{
      this.dialogRef.close(null);
    }
  }

isEmpty(){
    let totalField = 0;
    let notValidField = 0;
    for(var prop in this.payLoadForSearch) {
      ++totalField;
      if(this.payLoadForSearch[prop] === null || this.payLoadForSearch[prop] === false){    
        ++notValidField;        
      }
    }

    if(totalField === notValidField){
      return true;
    }else{
      false;
    }
}

}