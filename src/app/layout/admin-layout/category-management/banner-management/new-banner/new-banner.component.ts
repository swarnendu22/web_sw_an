import {
  CreateNewUiTemplateComponent,
  ActionTypes as bannerActionTypes,
  GetFlashSalesList,
} from './../../../../../actions/banner-management.actions';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  GetElasticQuery,
  CreateElasticQuery,
  ActionTypes as queryActionTypes,
} from 'src/app/actions/query-management.actions';
import { Store, select } from '@ngrx/store';
import { QueryManagementState } from 'src/app/reducers/query-management.reducers';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { Router } from '@angular/router';
import { GetActiveCollections } from 'src/app/actions/collections.action';

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.css'],
})
export class NewBannerComponent implements OnInit {
  @ViewChild('editor') editor;
  // query = {
  //   condition: 'or',
  //   rules: [
  //     {field: 'age', operator: '<=', value: 'Bob'},
  //     {field: 'gender', operator: '>=', value: 'm'}
  //   ]
  // };
  // config: QueryBuilderConfig = {
  //   fields: {
  //     age: {name: 'Age', type: 'number'},
  //     gender: {
  //       name: 'Gender',
  //       type: 'category',
  //       options: [
  //         {name: 'Male', value: 'm'},
  //         {name: 'Female', value: 'f'}
  //       ]
  //     }
  //   }
  // }
  bannerForm: FormGroup;
  queryForm: FormGroup;
  querySearchInput = new FormControl();
  toggleValue = 'text';
  imageType = 'jpg';
  editorOptions = { showLineNumbers: true, tabSize: 1, printMargin: false };
  query: string;
  queryList = [];
  categories = null;
  openQueryBox = false;
  apiMessageResponse = null;
  collectionList = null;
  collectionFlterCtrl = new FormControl();
  initialsortingby = 3;
  allFlashSalesList = null;
  defaultSortingByArr = [
    {
      name: 'Price High To Low',
      value: { default_sorting_by: 'AGGS_PRICE', default_sorting_by_order: 'DESC' },
    },
    {
      name: 'Price Low To High',
      value: { default_sorting_by: 'AGGS_PRICE', default_sorting_by_order: 'ASC' },
    },
    {
      name: 'Popularity',
      value: {
        default_sorting_by: 'TOTAL_PRODUCT_VIEWS',
        default_sorting_by_order: 'DESC',
      },
    },
    {
      name: 'Relevance',
      value: {
        default_sorting_by: 'POSITION',
        default_sorting_by_order: 'ASC',
      },
    },
    {
      name: 'Newest First',
      value: {
        default_sorting_by: 'ID',
        default_sorting_by_order: 'DESC',
      },
    },
    {
      name: 'DISCOUNT',
      value: {
        default_sorting_by: 'PERCENT_OF_DISCOUNT',
        default_sorting_by_order: 'DESC',
      },
    },
  ];
  constructor(
    private fb: FormBuilder,
    private store: Store<QueryManagementState>,
    private apiMessageService: ApiMessageService,
    private router: Router
  ) {
    this.initialiseForm();
    this.store.pipe(select<any, any>('queryManagement')).subscribe(res => {
      console.log(res);
      this.queryList = res['allElasticQuery'];
    });
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      this.categories = res['allcategories'];
    });
    this.store
      .pipe(select<any, any>('collections'))
      .subscribe(res => (this.collectionList = res.getCollection));
    this.apiMessageService.currentApiStatus.subscribe(res => {
      if (res.type === queryActionTypes.createElasticQuery && res.status) {
        this.apiMessageResponse = res['payload'];
        // this.queryList.unshift(this.apiMessageResponse);
        this.bannerForm.patchValue({ linkable_id: res['payload']['id'] });
      } else if (
        res.type === bannerActionTypes.createNewUiTemplateComponent &&
        res.status
      ) {
        this.router.navigate(['category/banner/active-banner']);
      }
    });

    this.store.pipe(select<any, any>('bannerManagement')).subscribe(res => {
      this.allFlashSalesList = res['allFlashSalesList'];

    });

  }
  ngOnInit() {
    this.store.dispatch(new GetElasticQuery());
  }
  get queryText() {
    this.queryForm.patchValue({ query: this.query });
    return JSON.stringify(this.query, null, 2);
  }
  set queryText(v) {
    try {
      this.query = JSON.parse(v);
    } catch (e) {
      console.log('error occured while you were typing JSON');
    }
  }
  querySelection(event) {
    this.query = event.value;
  }
  getImageType() {
    if (this.imageType === 'jpg') {
      return `image/jpg, image/jpeg`;
    } else {
      return `image/${this.imageType}`;
    }
  }
  getImage() {
    return this.bannerForm.get(`${this.imageType}_image`).value;
  }
  setImage(event) {

    let url = event.Location;
    const fieldName = `${this.imageType}_image`;
    this.bannerForm.patchValue({ [fieldName]: url });

    var height;
    var width;
    var newImg = new Image();
    newImg.onload = function () {
      height = newImg.naturalHeight;
      width = newImg.naturalWidth;
      this.bannerForm.get('height').setValue(height);
      this.bannerForm.get('width').setValue(width);
    }.bind(this);
    newImg.src = url;



  }
  deleteImage() {
    this.setImage({ Location: '' });
  }
  onProductLinkChange({ value }) {
    this.bannerForm.patchValue({ linkable_id: '' });
    switch (value) {
      case 'Category':
        if (!this.categories) {
          this.store.dispatch(new GetAllCategory());
        }
        this.openQueryBox = false;
        break;
      case 'Collection':
        this.store.dispatch(new GetActiveCollections());
        this.openQueryBox = false;
        break;
      case 'ElasticQuery':
        this.apiMessageResponse = null;
        this.queryForm
          .get('name')
          .patchValue(this.bannerForm.get('title').value);
        this.openQueryBox = true;
        break;
      case 'Product':
        this.openQueryBox = false;
        break;
      case 'FlashSale':
        this.store.dispatch(new GetFlashSalesList());
        this.openQueryBox = false;
        break;
      case 'Static':
        this.bannerForm.patchValue({ linkable_id: null });
        break;

      default:
        break;
    }
  }

  getTextForSwitchDefaultCase() {
    if (this.bannerForm.get('linkable_type').value === 'ElasticQuery') {
      if (this.apiMessageResponse) {
        const refDiv = document.getElementById('product_img_div');
        refDiv.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        return `${this.apiMessageResponse.name}`;
      } else {
        return `Create A Query Below.`;
      }
    } else {
      return 'Select Product Link to continue.';
    }
  }
  defaultSortingChange(event) {

    // const index = this.defaultSortingByArr.findIndex(i => i.name == event.value);
    const data = this.defaultSortingByArr[event.value];
    // console.log(data);
    this.bannerForm.get('default_sorting_by').setValue(data.value.default_sorting_by);

    if (data.name !== 'Popularity') {
      this.bannerForm.get('default_sorting_by_order').setValue(data.value.default_sorting_by_order);
    }
  }
  categorySelectionValue(event) {
    const value = event[0].item.id;
    this.bannerForm.patchValue({ linkable_id: value });
    console.log(this.bannerForm.get('linkable_id').value);
  }
  editoChange(event) {
    if (event.length === 0) {
      this.query = '';
      this.queryForm.get('query').setValue(event);
    }
  }
  submitQueryForm() {
    const data = this.queryForm.value;
    this.store.dispatch(new CreateElasticQuery({ data }));
  }
  bannerFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.bannerForm.value);

    const data = this.bannerForm.value;
    data.linkable_type =
      data.linkable_type === 'Collection' ? 'Category' : data.linkable_type;
    this.store.dispatch(new CreateNewUiTemplateComponent({ data }));
  }
  initialiseForm() {

    this.bannerForm = this.fb.group({
      title: ['', Validators.required],
      applicable_to_widget_type: ['', Validators.required],
      png_image: [''],
      jpg_image: ['', Validators.required],
      webp_image: [''],
      height: ['', Validators.required],
      width: ['', Validators.required],
      linkable_type: ['Static', Validators.required],
      linkable_id: [''],
      default_sorting_by: ['POSITION', Validators.required],
      default_sorting_by_order: ['ASC', Validators.required],
    });
    this.queryForm = this.fb.group({
      name: ['', Validators.required],
      query: ['', Validators.required],
    });





  }
}
