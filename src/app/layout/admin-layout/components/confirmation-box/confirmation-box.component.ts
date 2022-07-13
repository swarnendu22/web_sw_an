import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {

  payLoad:any;
  remarks="";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public toaster:ToastrService) {
      this.payLoad = this.data;
    }
 
  ngOnInit() {
  }


process(processType,status){

  if(processType === 'process'){
    if(status === 'APPROVED'){
      this.dialogRef.close({processType:processType, remarks:this.remarks, payload:this.payLoad});
    }else{
      if(this.remarks.trim()===''){
          this.toaster.error("Please Prodive Remarks");
      }else{
        this.dialogRef.close({processType:processType, remarks:this.remarks, payload:this.payLoad});
      }
    }
   }else{
    this.dialogRef.close({processType:processType, remarks:this.remarks, payload:this.payLoad});
   }
    
  }

}
