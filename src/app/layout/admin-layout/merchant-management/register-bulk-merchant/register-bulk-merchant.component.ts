import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { categoryState } from '../../../../reducers/storemanagement.reducers';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { UploadStoreBulkFile, ActionTypes } from '../../../../actions/merchant-management.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-bulk-merchant',
  templateUrl: './register-bulk-merchant.component.html',
  styleUrls: ['./register-bulk-merchant.component.css']
})
export class RegisterBulkMerchantComponent implements OnInit {
  imageUrl = null;
  constructor(private apiMessageService: ApiMessageService, private store: Store<categoryState>, private _routerNavigate: Router,) { }

  ngOnInit() {
  }

  downloadModalOpen() {
    event.preventDefault();
    event.stopPropagation();
    this.apiMessageService.downloadFile(`api/util/admin-api/download-bulk-store-file`,
      'application/vnd.ms-excel',
    )
      .subscribe(
        data => {

          saveAs(data, `Store_${moment(new Date()).format("DD-MM-YYYY LTS").replace(/[- ]/gm, "_")}.xlsx`);
        },
        error => console.error(error)
      );
  }


  onFileUpload(event) {

    console.log("event", event);
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

      image.name = event.Location.split('/').slice(3).join('/');
      image.location = event.Location;
      image.type = event.Location.split('.').pop();
      this.imageUrl = image;
    }

  }
  deleteImage(item) {
    this.imageUrl = null
  }
  checkForm() {

    if (this.imageUrl) {
      return true;
    }
    else {
      return false;
    }
  }

  uploadContentSheet() {
    this.store.dispatch(new UploadStoreBulkFile(
      {
        filename: this.imageUrl['location'],
      },
    ));

    this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ===  ActionTypes.uploadStoreBulkFile ) {
        this._routerNavigate.navigate['merchant/register-bulk-merchant-grid'];
      }
    });


  }




}
