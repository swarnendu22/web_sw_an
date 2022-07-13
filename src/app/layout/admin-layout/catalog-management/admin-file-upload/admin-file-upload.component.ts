import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categoryState } from 'src/app/reducers/storemanagement.reducers';
import { Store, select } from '@ngrx/store';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { GetCategory, GetParentCategory, GetAttributeSet } from 'src/app/actions/storeManagement.action';
import { UploadContentSheet, GetAllActiveSellersForBulkUpload } from 'src/app/actions/seller-catalog-action';
import { Router } from '@angular/router';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
import { GetAttributeDataFromIds } from '../../../../actions/catalog-management.action';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.css']
})
export class AdminFileUploadComponent implements OnInit {
  DialogRef: MatDialogRef<AdminFileUploadComponent>;
  public sellerFilterCtrl: FormControl = new FormControl();
  public categoryFilterCtrl: FormControl = new FormControl();

  imageUrl = [];
  count = 0;
  categories = null;
  selectedItems: any;
  flag = 0;
  submitted = false;
  allActiveSellers = [];
  selectedSeller = null;
  categoryItems = []



  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Select Category...';
  public MaxDisplayed = 5;
  attributeSetsData = null;
  attributeSetId = null

  constructor(private store: Store<categoryState>, public dialog: MatDialog, private apiMessageService: ApiMessageService) {
    // if (!this.categories) {
    // this.store.dispatch(new GetCategory('false'));
    // this.store.dispatch(new GetParentCategory());


    // }
    this.store.dispatch(new GetAttributeSet());

    this.store.pipe(select<any, any>('productAttributes')).subscribe(res => {
      this.attributeSetsData = res['attributeSet'];
    });

    this.store.pipe(select<any, any>('parentCategories')).subscribe(res => {
      this.categories = res['parentCategories'];
      console.log('Reducer', res);
    });

    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      if (res['categories']) {
        this.categories = res['categories'];
        this.categoryItems = this.process(this.categories);
      }
    });

    this.store.pipe(select<any, any>('catalogMgmt')).subscribe(res => {
      console.log(res);
      if (res['attributeSetsData']) {
        this.attributeSetsData = res['attributeSetsData'];
      }
    });


    this.store.pipe(select<any, any>('sellerCatalogAdmin')).subscribe(res => {
      this.allActiveSellers = res['allActiveSellers'] ? res['allActiveSellers']['data'] : [];
      console.log('Select', this.allActiveSellers)
    })
  }


  private process(data): any {
    let result = [];
    result = data.map((item) => {
      return this.toTreeNode(item);
    });
    return result;
  }

  private toTreeNode(node, parent = null) {

    if (node && node.childList) {
      node.childList.map(item => {
        return this.toTreeNode(item, node);
      });
    }
    return node;
  }


  ngOnInit() {
    // this.store.dispatch(new GetAllActiveSellersForBulkUpload({ 'as': 'as' }));
  }

  categorySelectionValue(event) {
    if (this.selectedItems.attributeSetIds == null) {
      alert('Attribute Set Not Found for ' + this.selectedItems.name);
    }
    this.store.dispatch(new GetAttributeDataFromIds({
      attributeSetsID: JSON.parse(this.selectedItems.attributeSetIds)
    }))

    // // this.selectedItems = value[0].item;
    // this.selectedItems = event.value;
    // console.log(this.selectedItems);
  }
  sellerSelectionValue(event) {
    console.log(event);
    // this.selectedItems = value[0].item;
    this.selectedSeller = event.value;

  }
  onFileUpload(event) {
    // console.log('FIELS', files);
    // for (var i = 0; i < files.length; i++) {

    //   const event = files[i];
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

      if (this.imageUrl.length < 1) {


        image.id = this.count;

        image.name = event.Location.split('/').slice(3).join('/');
        image.location = event.Location;
        image.type = event.Location.split('.').pop();

        if (this.imageUrl.length > 0) {
          for (var i = 0; i < this.imageUrl.length; i++) {

            console.log(i);
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


            // alert('Duplicate File Not Allowed');

          }
        }
        else {
          this.imageUrl.push(image);
          console.log('pushed');

          this.count++;
        }


      }
      else {

        this.dialog.open(AdminFileUploadMessageDialog, {
          width: '250px',
          data: { message: 'Maximum 1 Images Can Be Uploaded' }
        });
        // alert('Maximum 3 Images Can Be Uploaded');

      }
    }

    console.log(this.imageUrl);


  }
  deleteImage(item) {
    let index = _.findIndex(this.imageUrl, e => e.id == item.id);
    if (index > -1) {
      this.imageUrl.splice(index, 1);
    }
    console.log(this.imageUrl);

  }
  checkForm() {
    if (this.attributeSetId != null) {
      if (this.imageUrl.length == 1) {
        return true;
      }
      else {
        return false;
      }
    }

  }

  upload(event) {
    event.preventDefault();
    event.stopPropagation();
    // this.submitted = true;
    var str = this.imageUrl.map(function (elem) {
      return elem.name;
    }).join(",");

    this.store.dispatch(new UploadContentSheet(
      {
        // categoryid: this.selectedItems.id,
        filename: this.imageUrl[0]['location'],
        attributeSetId: this.attributeSetId,
        storeId: null,
        type: "MASTERPRODUCT",
        // sellerId: ''
      },
      'admin'
    ));

    this.apiMessageService.currentApiStatus.subscribe((response) => {

      console.log("response.type", response, " this.submitted", this.submitted)
      if (response.type == 'uploadContentSheet') {

        let res: any = response.status;

        if (res) {
          this.dialog.closeAll();
        }
        // this.submitted = false;

      } else if (response.type == '500_SERVER_ERROR') {
        let res: any = response.status;
        if (res) {
          // this.submitted = false;
        }
      }
    });


  }

  //Url=/uploadExcel-I/sellerId/catId

  //body= plain string comma seperated,
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
