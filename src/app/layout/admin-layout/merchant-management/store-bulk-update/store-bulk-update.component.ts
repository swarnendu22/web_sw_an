import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import _ from 'lodash';
import { StoreBulkUpdate, ActionTypes } from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { categoryState } from 'src/app/reducers/storemanagement.reducers';

@Component({
  selector: 'app-store-bulk-update',
  templateUrl: './store-bulk-update.component.html',
  styleUrls: ['./store-bulk-update.component.css']
})
export class StoreBulkUpdateComponent implements OnInit {
  storeId = null;
  processingBy = null;
  submitted = false;
  imageUrl = [];
  count = 0;
  flag = 0;

  constructor(
    private store: Store<categoryState>,
    public dialog: MatDialog,
    private apiMessageService: ApiMessageService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.storeId = this.data.storeId;
    this.processingBy = this.data.processingBy;
  }
  ngOnInit(): void {
  }
  onFileUpload(event) {
    if ((event.Location.split('.').pop() != 'xls') && (event.Location.split('.').pop() != 'xlsx')) {
      alert('Only Excel files are Allowed');
    }
    else {
      var image = {
        type: '',
        location: '',
        id: null,
        name: ''
      }
      if (this.imageUrl.length < 1) {
        image.id = this.count;
        image.name = event.Location.split('/').slice(3).join('/');
        image.location = event.Location;
        image.type = event.Location.split('.').pop();

        if (this.imageUrl.length > 0) {
          for (var i = 0; i < this.imageUrl.length; i++) {
            if (this.imageUrl[i]['name'] != image.name) {
              this.flag = 1;
            }
            else {
              this.flag = 0;
              break;
            }
          }
          if (this.flag == 1) {
            this.imageUrl.push(image);
            console.log('pushed');
            this.count++;
          }
          else {
            this.dialog.open(AdminFileUploadMessageDialog, {
              width: '250px',
              data: { message: 'Duplicate File Not Allowed' }
            });
          }
        }
        else {
          this.imageUrl.push(image);
          this.count++;
        }
      } else {
        this.dialog.open(AdminFileUploadMessageDialog, {
          width: '250px',
          data: { message: 'Maximum 1 Images Can Be Uploaded' }
        });
      }
    }
  }
  deleteImage(item) {
    let index = _.findIndex(this.imageUrl, e => e.id == item.id);
    if (index > -1) {
      this.imageUrl.splice(index, 1);
    }
    console.log(this.imageUrl);

  }
  upload(event) {
    if (this.imageUrl.length == 1) {
      event.preventDefault();
      event.stopPropagation();
      this.store.dispatch(new StoreBulkUpdate({
        filename: this.imageUrl[0]['location'],
        processingBy: this.processingBy,
        storeId: this.storeId,
        type: "STORE_PRODUCT_UPDATE",
      }));
      this.apiMessageService.currentApiStatus.subscribe((response) => {
        if (response.type == ActionTypes.storeBulkUpdate) {
          let res: any = response.status;
          if (res) {
            this.dialog.closeAll();
          }
        }
      });
    } else {
      alert('Select file first.');
    }
  }
  download(event) {
    if(this.processingBy=='SKU') {
      window.open("https://ndh.imgix.net/ndh-admin/gstn/45998292059826.xlsx");
    } else if(this.processingBy=='BARCODE') {
      window.open("https://ndh.imgix.net/ndh-admin/gstn/45998292059826.xlsx");
    } else if(this.processingBy=='INVENTORY-ID') {
      window.open("https://ndh.imgix.net/ndh-admin/gstn/45998292059826.xlsx");
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Error</h1>
  <div mat-dialog-content>
    <p>{{message}}</p>

  </div>
  <div mat-dialog-actions>

    <button mat-button [mat-dialog-close]="true" cdkFocusInitial  >OK</button>
  </div>`,
})
export class AdminFileUploadMessageDialog {
  message = '';
  constructor(
    public dialogRef: MatDialogRef<AdminFileUploadMessageDialog>, private store: Store<categoryState>,
    private router: Router, private apiMessageService: ApiMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.message = data.message;
  }

}
