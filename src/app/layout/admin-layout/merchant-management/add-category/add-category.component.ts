import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '../../../../../../node_modules/@angular/forms';
import { ProductImageCropComponent } from '../../catalog-management/product-image-crop/product-image-crop.component';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { StoreImgUploadToAws, UploadImageToAws } from 'src/app/actions/img-upload-aws.action';
import { NgxUiLoaderService } from '../../../../../../node_modules/ngx-ui-loader';
import {
  AddProductImage,
  GetAttributesSetByCategory,
  GroupActionsBasedOnCategorySelection,
  DeleteProductImage
} from 'src/app/actions/catalog-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { CategoriesListSearchComponent } from '../../catalog-management/categories-list-search/categories-list-search.component';
import { GetCategoriesElasticGlobal } from '../../../../actions/storeManagement.action';
import { Observable, Subscriber } from 'rxjs/Rx';
import { DeleteCategory, EditCategoryDeatils, GetStoreCategory, GetStoreInfoDetails, StoreAddCategory, StoreCategoryList } from 'src/app/actions/merchant-management.actions';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ActionTypes } from '../../../../actions/merchant-management.actions';

export interface MasterProductData {
  base_image_url: string;
  category_name: string;
  position_name: number;
  action: string;
  delete: string;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnChanges {

  @Input() public storeId;
  categories: string[] = ["Bakery", "Resturant"];
  tabIndex = 0;
  editEnable: boolean = false;
  categoryListRefresh: boolean = false;
  max_position: number = 6;

  displayedColumns: string[] = ['base_image_url', 'category_name', 'position_name', 'action'];
  rowData: MatTableDataSource<any>;
  catalogForm2: FormGroup;
  catalogForm1: FormGroup;
  imageUploadSubscription: Subscription;
  fileUploadSubscription: Subscription;
  subscriptionApi: Subscription;
  productImages = [];
  editableProductDetails = null;
  imageUrl: string = '';
  categoryDetailsResult = null;
  businessCategoryId = null;
  businessCategoryCheck = null;
  categoryIds: null;
  privateCategoryLevel = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private toaster: ToastrService,
    private apiMessageService: ApiMessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreInfoDetails(this.storeId));
    this.apiMessageService.currentApiStatus.subscribe((data: any) => {
      if (data.status === true && data.type == ActionTypes.getStoreInfoDetails) {
        this.privateCategoryLevel = data.payload.privateCategoryLevel;
        this.GetStoreCategoryfunction(data.payload.businessCategoryId);
      }
    });
    // this.apiCallCategories();
  }

  GetStoreCategoryfunction(businessCategoryId) {
    this.businessCategoryCheck = businessCategoryId;
    this.store.dispatch(new GetStoreCategory({
      businessCategoryId: businessCategoryId
    }));

    this.apiMessageService.currentApiStatus.subscribe((data: any) => {
      if (data.status === true && data.type == ActionTypes.getStoreCategory) {
        this.categoryIds = data.payload;
        this.apiCallCategories(data.payload);
      }
    });
  }

  ngOnInit(): void {
    this.catalogForm2 = this.fb.group({
      categories_path: ['', [Validators.required]],
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_].+[a-zA-Z0-9]*')]], // categories name
      // positionName: ['', [Validators.required, Validators.max(this.max_position)]]
    });

    this.catalogForm1 = this.fb.group({
      categoryName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_].+[a-zA-Z0-9]*')]],
      categories_path: ['', [Validators.required]]
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.addedCategoryList) {
        this.max_position = res.addedCategoryList.totalRecords;
        this.rowData = new MatTableDataSource(res.addedCategoryList.payload);
      }
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.addedCategory) {
        // console.log(res.addedCategory);
        this.businessCategoryId = res.addCategoryDetailsSubmit.payload.businessCategoryId;
      }
    });
    // this.store.pipe(select('manageCategories')).subscribe(res => {
    //   if (res.categoriesElasticGlobal) {
    //     console.log(res.categoriesElasticGlobal)
    //   }
    // });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.deletedCategoryDetails) {
        if (this.categoryListRefresh) {
          this.category_lists();
          this.categoryListRefresh = false;
        }
        // console.log(res.deletedCategoryDetails);
      }
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.editedCategoryDetails) {
        if (this.categoryListRefresh) {
          this.category_lists();
          this.editEnable = false;
          this.categoryListRefresh = false;
        }
        // console.log(res.editedCategoryDetails);
      }
    });

  }
  ngOnChanges(changes: SimpleChanges) {
    this.category_lists();
  }

  category_list = [
    {
      base_image_url: "https://ndh.imgix.net/ndh-assets/categories-images/default.png",
      category_name: "Soft Drinks",
      position_name: 1
    }
  ];

  addImage: boolean = true;
  editItemDetails: any;
  editItemsId: any;

  deletePosition(id, deleteIndex) {
    let params = {
      storeId: this.storeId,
      itemId: id
    }
    this.store.dispatch(new DeleteCategory(params));
    this.categoryListRefresh = true;
    this.editEnable = false;
  }

  addCategoryDetailsSubmit() {
    if (this.catalogForm1.valid) {

      let params = {
        details: {
          "attributeSetId": null,
          "products": true,
          "level": 3,
          "displayMode": "LIST",
          "name": this.catalogForm1.get('categoryName').value,
          "alias": this.catalogForm1.get('categoryName').value,
          "attributeSetIds": null,
          "status": 1,
          "isActive": true,
          "isBanner": false,
          "cropListImage": false,
          "image": this.imageUrl
        },
        storeId: this.storeId
      }

      if( !(this.businessCategoryCheck == 1005) && !(this.businessCategoryCheck == 1006) ){
      let parentid = this.categoryDetailsResult.ancestry.split('.');

      // let params = {
      //   details: {
      //     "attributeSetId": null,
      //     "products": true,
      //     "level": 3,
      //     "path": this.catalogForm1.get('categories_path').value,
      //     "displayMode": "LIST",
      //     "parentId": parentid[ parentid.length -2 ],
      //     "name": this.catalogForm1.get('categoryName').value,
      //     "alias": this.catalogForm1.get('categoryName').value,
      //     "attributeSetIds": null,
      //     "status": 1,
      //     "isActive": true,
      //     "isBanner": false,
      //     "cropListImage": false,
      //     "ancestry": this.categoryDetailsResult.ancestry,
      //     "image": this.imageUrl
      //   },
      //   storeId: this.storeId
      // }

      params.details["parentId"] = parentid[ parentid.length -2 ];
      params.details["ancestry"] = this.categoryDetailsResult.ancestry;
      params.details["path"] = this.catalogForm1.get('categories_path').value;

    } else {
        params.details["parentId"] = '10';
        params.details["ancestry"] = '10';
        params.details["path"] = "Main Menu";
      }
      
      console.log( params )
      this.store.dispatch(new StoreAddCategory(params));
      this.categoryListRefresh = true;
    }
    else {
      this.markFormGroupTouched(this.catalogForm1);
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.reset(formGroup.value);
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  routeTab(event) {
    const tabindex = event.index;
    this.tabIndex = tabindex;
    if( tabindex == 1){
      this.cancel();

      if ((this.businessCategoryCheck == 1005) || (this.businessCategoryCheck == 1006)) {
        this.catalogForm1.get('categories_path').setValue('Main Menu');
        this.catalogForm2.get('categories_path').setValue('Main Menu');
      }

    }
    if (this.categoryListRefresh) {
      this.category_lists();
      this.categoryListRefresh = false;
    }
  }

  editCategoryDetailsSubmit() {
    if (this.catalogForm2.valid) {
      let parentid = this.editItemDetails.ancestry.split('.');
      let params = {
        details: {
          "id": this.editItemsId,
          "attributeSetId": null,
          "products": true,
          "level": 3,
          "path": this.catalogForm2.get('categories_path').value,
          "displayMode": "LIST",
          "parentId": parentid[ parentid.length -2 ],
          "name": this.catalogForm2.get('productName').value,
          "alias": this.catalogForm2.get('productName').value,
          "attributeSetIds": null,
          "status": 1,
          "isActive": true,
          "isBanner": false,
          "cropListImage": false,
          "ancestry": this.editItemDetails.ancestry,
          "image": this.imageUrl
        },
        storeId: this.storeId
      }
      if ((this.businessCategoryCheck == 1005) || (this.businessCategoryCheck == 1006)) {
        params.details["parentId"] = 10;
      }
      this.store.dispatch(new EditCategoryDeatils(params));
      this.categoryListRefresh = true;
      this.editEnable = false;
    }
    else {
      this.markFormGroupTouched(this.catalogForm2);
    }
  }

  openCatelist(value) {
    // console.log( this.businessCategoryCheck );
    if (!(this.businessCategoryCheck == 1005) && !(this.businessCategoryCheck == 1006)) {
      const dialog = this.dialog.open(CategoriesListSearchComponent, {
        panelClass: 'filter-modal'
      })
      dialog.afterClosed().subscribe(result => {
        this.dialog.closeAll();
        console.log(result);
        if (result) {
          console.log(result);
          this.categoryDetailsResult = result;
          this.editItemDetails = result
          this.catalogForm1.get('categories_path').setValue(result.path);
          this.catalogForm2.get('categories_path').setValue(result.path);
        }

      });
    }
  }

  editPosition(value, editIndex) {
    this.editItemDetails = value;
    this.editItemsId = value.id;
    console.log( this.editItemDetails )
    this.catalogForm2.get('categories_path').setValue(this.editItemDetails.path);
    this.catalogForm2.get('productName').setValue(this.editItemDetails.name);
    this.imageUrl = this.editItemDetails.image;
    this.editEnable = true;
    this.addImage = false;
  }

  cancel() {
    this.editEnable = false;
    this.catalogForm1.get('categories_path').setValue('');    
    this.catalogForm1.get('categoryName').setValue('');    

  }

  apiCallCategories(categoryIds) {
    let payloadCatSerach = {
      allowedCategoryIds: categoryIds,
      categoryName: '',
      depth: this.privateCategoryLevel,
      level: 1
    }
    this.store.dispatch(new GetCategoriesElasticGlobal(payloadCatSerach));
  }
  category_lists() {
    this.store.dispatch(new StoreCategoryList(this.storeId));
  }
 

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filetype = event.target.files[0]['type'].split('/')[1];
      const acceptedFileType = ['jpeg', 'jpg', 'png'];
      var reader = new FileReader();

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {

        if (this.imageUploadSubscription) {
          this.imageUploadSubscription.unsubscribe();
        }
        if (this.fileUploadSubscription) {
          this.fileUploadSubscription.unsubscribe();
        }
        this.openCropImage(event, filetype);

      }
    }
  }
  openCropImage(event, filetype) {
    const dialog = this.dialog.open(ProductImageCropComponent, {
      width: '600px',
      maxHeight: '600px',
      disableClose: true,
      data: { event: event },
    })
    this.imageUploadSubscription = dialog.afterClosed().subscribe(data => {
      // console.log(data);
      if (data.url != '') {
        this.uploadFileToAws(data.url, event.target.files[0]['name'], filetype, event.target.files[0]['type']);
      }
      event.target.value = null;
    });
  }

  uploadFileToAws(url, filename, filetype, applicationtype) {
    this.store.dispatch(new StoreImgUploadToAws(null));
    const date = new Date();
    const extension = filetype.toLowerCase();
    let previousName = filename.replace(/ /g, "_");
    previousName = previousName.replace(extension, '');
    previousName = previousName.replace('.', '');
    const name = previousName + `_${date.getTime()}.` + extension;
    const blob = this.dataURItoBlob(url);
    const file = new File([blob], name, { type: applicationtype })
    this.ngxService.start();
    this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

    this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
      if (res['awsImgUpload']) {
        this.ngxService.stop();
        if (res['awsImgUpload'].Location) {
          this.imageUrl = res['awsImgUpload'].Location;
          let imageIndex = this.productImages.length;
          if (imageIndex == 0) {
            this.productImages.push({
              id: null,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: true,
              cropListImage: true,
            })
          } else {
            this.productImages.push({
              id: null,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: false,
              cropListImage: false,
            })
          }

          this.fileUploadSubscription.unsubscribe();

          let catalogFormData = {
            product_id: this.editableProductDetails.id,
            imageUrl: res['awsImgUpload'].Location,
            isBaseImage: true,
            cropListImage: true,
          };
          if (imageIndex > 0) {
            catalogFormData = {
              product_id: this.editableProductDetails.id,
              imageUrl: res['awsImgUpload'].Location,
              isBaseImage: false,
              cropListImage: false,
            };
          }
          this.store.dispatch(new AddProductImage(catalogFormData));
          this.apiMessageService.currentApiStatus.subscribe((data: any) => {
            if (data.status === true) {
              if (this.productImages) {
                this.productImages.forEach((element, i) => {
                  if (element.imageUrl == data.payload.imageUrl) {
                    this.productImages[i].id = data.payload.id;
                  }
                });
              }
            }
          });
        }
      }
    })
  }
  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }

  // deleteImage(i, id = 0) {
  //   if (id > 0) {
  //     let payloadImageDelete = {
  //       id: id
  //     }
  //     this.store.dispatch(new DeleteProductImage(payloadImageDelete));
  //   }
  //   this.productImages.splice(i, 1);
  // }
  deleteImage() {
    this.imageUrl = "";
    this.addImage = true;
  }


}
