import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';



export interface MerchentsStatus {
  statusKey: string;
  statusValue: string;
}

export interface TimeStatus {
  statusKey: string;
  statusValue: string;
}

export interface PayLoadForSearch {
  pinCode: string;
  stateCode: string;
  storeName: string;
  businessCategory: number;
  status: string;
  storeType: string;
  storeLevel: string;
  dateType: string;
  isAesc: boolean;
  contactNo: string;
  createdDateFrom: string;
  createdDateTo: string;
  businessCategoryName: string;
}

@Component({
  selector: 'app-store-filter-popup',
  templateUrl: './store-filter-popup.component.html',
  styleUrls: ['./store-filter-popup.component.css']
})
export class StoreFilterPopupComponent implements OnInit {

  merchantStatus: MerchentsStatus[] = [
    {
      statusKey: "APPROVED",
      statusValue: "APPROVED"
    },
    {
      statusKey: "APPROVED-NO-PRODUCT",
      statusValue: "APPROVED-NO-PRODUCT"
    },
    {
      statusKey: "REJECTED",
      statusValue: "REJECTED"
    },
    {
      statusKey: "DELETED",
      statusValue: "DELETED"
    },
    {
      statusKey: "PENDING",
      statusValue: "PENDING"
    }
  ]

  timeStatus: TimeStatus[] = [
    {
      statusKey: "TODAY",
      statusValue: "TODAY"
    },
    {
      statusKey: "YESTERDAY",
      statusValue: "YESTERDAY"
    },
    {
      statusKey: "THISWEEK",
      statusValue: "THISWEEK"
    },
    {
      statusKey: "LASTWEEK",
      statusValue: "LASTWEEK"
    },
    {
      statusKey: "THISMONTH",
      statusValue: "THISMONTH"
    },
    {
      statusKey: "LASTMONTH",
      statusValue: "LASTMONTH"
    },
    {
      statusKey: "CUSTOM",
      statusValue: "CUSTOM"
    }
  ]

  remarks = "";
  businessCategoryList = [];
  regionList = [];

  payLoadForSearch: PayLoadForSearch = {
    pinCode: null,
    stateCode: null,
    storeName: null,
    businessCategory: null,
    status: null,
    storeType: null,
    storeLevel: null,
    dateType: null,
    isAesc: false,
    contactNo: null,
    createdDateFrom: null,
    createdDateTo: null,
    businessCategoryName: null
  }

  customFromDate: any;
  customToDate: any;


  constructor(
    public dialogRef: MatDialogRef<StoreFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public toaster: ToastrService) {
    this.businessCategoryList = this.data.businessCategoryList;
    this.regionList = this.data.regionList;
    if (this.data.payLoadForSearchIn) {
      const payLoadForSearchIn = this.data.payLoadForSearchIn
      this.payLoadForSearch = payLoadForSearchIn;
      if (this.payLoadForSearch.createdDateFrom) {
        this.customFromDate = new Date(moment(this.payLoadForSearch.createdDateFrom, 'DD/MM/YYYY').format("MM/DD/YYYY"));
      }
      if (this.payLoadForSearch.createdDateTo) {
        this.customToDate = new Date(moment(this.payLoadForSearch.createdDateTo, 'DD/MM/YYYY').format("MM/DD/YYYY"));
      }
    }
  }

  ngOnInit() {
  }


  process(processType) {
    if (processType === 'process') {
      if (this.validation(this.payLoadForSearch)) {
        if (this.payLoadForSearch && this.payLoadForSearch.businessCategory) {
          let businessCategoryTemp = this.businessCategoryList.filter(businessCategoryObj =>
            businessCategoryObj.id === this.payLoadForSearch.businessCategory
          );
          if (businessCategoryTemp) {
            this.payLoadForSearch.businessCategoryName = businessCategoryTemp[0].businessCategoryName;
          }
        }
        this.dialogRef.close(this.payLoadForSearch);
      }
    }
    else {
      this.dialogRef.close();
    }
  }

  validation(payLoadForSearch) {
    if (payLoadForSearch.dateType === 'CUSTOM') {
      if (this.customFromDate) {
        let createdDateFrom = moment(this.customFromDate).format('DD/MM/YYYY');
        this.payLoadForSearch.createdDateFrom = createdDateFrom;
      } else {
        this.toaster.error("Please Select From Date");
        return false;
      }

      if (this.customToDate) {
        let createdDateTo = moment(this.customToDate).format('DD/MM/YYYY');
        this.payLoadForSearch.createdDateTo = createdDateTo;
      } else {
        this.toaster.error("Please Select To Date");
        return false;
      }
      return true;
    } else {
      return true
    }
  }

  dateTypeChange() {
    if (this.payLoadForSearch.dateType === 'CUSTOM') {
      this.payLoadForSearch.createdDateFrom = null;
      this.payLoadForSearch.createdDateTo = null;
    }
  }

}
