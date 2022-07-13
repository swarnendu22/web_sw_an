import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AgGridOptions } from '../../../../utils/agGridOption/ag-grid-option';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { GetMasterQuickLinks, TagStoreWithQuickLinks, ActionTypes } from '../../../../actions/merchant-management.actions';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';

@Component({
  selector: 'app-add-new-quicklink',
  templateUrl: './add-new-quicklink.component.html',
  styleUrls: ['./add-new-quicklink.component.css']
})
export class AddNewQuicklinkComponent implements OnInit {
  storeMasterQuickLinks = null
  quicklins = [];
  addedQuickLinks = null
  length = 0
  @ViewChild('selectionList') selectionList: MatSelectionList;


  constructor(
    private store: Store<any>,
    public dialogRef: MatDialogRef<AddNewQuicklinkComponent>,
    private apiMessageService: ApiMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.store.dispatch(new GetMasterQuickLinks(this.data.storeId));
  }



  ngOnInit() {
    this.store
      .pipe(select('merchantManagement'))
      .subscribe(res => {
        if (res.storeMasterQuickLinks) {
          this.storeMasterQuickLinks = res.storeMasterQuickLinks[0];
        }
        if (res.storeQuickLinks) {
          this.addedQuickLinks = res.storeQuickLinks[0];
          this.length = res.storeQuickLinks[0].length;
        }
      });

  }


  ngAfterViewInit() {
    this.selectionList.selectionChange.subscribe((value: MatSelectionListChange) => {
      if (value.option.disabled) {
        value.option.selected = !value.option.selected;
      }
    })
  }


  removeItem(index: number) {
    console.log("inside this remover")
    this.quicklins.splice(index, 1);
  }

  onSave() {
    console.log(this.quicklins)
    let payload = [];
    // for (let i = 0; i < this.quicklins.length; i++) {
    //   for (let j = 0; j < this.addedQuickLinks.length; j++) {
    //     if (this.quicklins[i]) {
    //       console.log(this.quicklins[i]['id'], '---', this.addedQuickLinks[j].quicklinkId)
    //       console.log(this.quicklins[i]['id'])
    //       if (this.quicklins[i]['id'] == this.addedQuickLinks[j].quicklinkId) {
    //         // const index = this.quicklins.indexOf(this.quicklins[i]);
    //         const index = this.quicklins.findIndex(q => q.id == this.quicklins[i]['id']);
    //         this.quicklins.splice(index, 1);

    //       }
    //     }
    //   }
    // }
    this.quicklins.forEach(element => {
      payload.push({
        "quicklinkId": element.id,
        "storeId": parseInt(this.data.storeId),
        "isActive": 1,
        "assignedDate": "2020-07-20",
        "assignedBy": "Admin",
        "appliedDate": "2020-07-20",
        "appliedBy": "abc",
        "expiryDate": null,
        "isFree": element.isFree,
        "amountPaid": null,
        "paymentMethod": null,
        "transactionReference": null,
        "transactionDate": null
      })
    });


    console.log(payload)
    this.store.dispatch(new TagStoreWithQuickLinks(payload))
    this.apiMessageService.currentApiStatus.subscribe((response) => {
      let res: any = response.status;
      if (res && response.type == ActionTypes.tagStoreWithQuickLinks) {
        this.dialogRef.close()
      }
    })
  }

  check(id) {
    const val = this.addedQuickLinks.find(item => item.quicklinkId === id)
    if (val) {
      return true
    } else {
      return false
    }
    console.log(val)
  }

  clickItem(item) {
    console.log(item)
    console.log(this.addedQuickLinks)
    const index = this.addedQuickLinks.findIndex(q => q.quicklinkId == item['id']);
    if (index < 0) {
      this.quicklins.push(item)
    } else {
      this.quicklins.splice(index, 1)
    }
  }
}
