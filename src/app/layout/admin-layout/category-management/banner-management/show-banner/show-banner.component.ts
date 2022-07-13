import {
  GetUiTemplateComponentById,
  EditUiTemplateComponent,
  ActionTypes as bannerActionTypes,
  GetFlashSalesList,
  StoreUiTemplateComponents,
  StoreUiTemplateComponentById,
} from './../../../../../actions/banner-management.actions';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
  ActionTypes as queryActionType,
  GetElasticQueryById,
  EditElasticQuery,
} from 'src/app/actions/query-management.actions';
import { Store, select } from '@ngrx/store';
import { QueryManagementState } from 'src/app/reducers/query-management.reducers';
import { GetAllCategory } from 'src/app/actions/storeManagement.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { ActivatedRoute } from '@angular/router';
import { GetActiveCollections } from 'src/app/actions/collections.action';

@Component({
  selector: 'app-show-banner',
  templateUrl: './show-banner.component.html',
  styleUrls: ['./show-banner.component.css'],
})
export class ShowBannerComponent implements OnInit, OnDestroy {
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
  apiMessageResponseForQuery = null;
  editableBannerId = null;
  selectedOption = [];
  querySelectionObject = null;
  collectionList = null;
  collectionFlterCtrl = new FormControl();
  allFlashSalesList = null;
  setBannerDetails = false;
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
    private activatedRoute: ActivatedRoute
  ) {
    this.editableBannerId = this.activatedRoute.snapshot.params.id;
    this.initialiseForm();
    this.store.pipe(select<any, any>('queryManagement')).subscribe(res => {
      this.queryList = res.allElasticQuery;
      if (res.elasticQueryDetailsById) {
        this.apiMessageResponseForQuery = res.elasticQueryDetailsById;
        this.querySelectionObject = res.elasticQueryDetailsById;
        // this.setDataIntoForm(res.elasticQueryDetailsById, 'queryForm');
      }
    });
    this.store.pipe(select<any, any>('manageCategories')).subscribe(res => {
      this.categories = res['allcategories'];
    });
    this.store.pipe(select<any, any>('bannerManagement')).subscribe(res => {
      if (res['bannerDetailsById']) {
        if (!this.setBannerDetails) {
          this.setBannerDetails = true;

          this.setDataIntoForm(res['bannerDetailsById'], 'bannerForm');
        }
      }
      if (res['allFlashSalesList']) {
        this.allFlashSalesList = res['allFlashSalesList'];
      }
    });
    this.store
      .pipe(select<any, any>('collections'))
      .subscribe(res => (this.collectionList = res['getCollection']));

    this.apiMessageService.currentApiStatus.subscribe(res => {
      if (res.type === queryActionType.createElasticQuery && res.status) {
        this.apiMessageResponseForQuery = res.payload;
        // this.queryList.unshift(this.apiMessageResponseForQuery);
        this.bannerForm.patchValue({ linkable_id: res.payload['id'] });
        this.toggleFormDisable('queryForm');
      } else if (
        res.type === bannerActionTypes.editUiTemplateComponent &&
        res.status
      ) {
        this.bannerForm.disable();
        this.queryForm.disable();
      }
    });
    this.bannerForm.disable();
    this.queryForm.disable();
  }
  ngOnInit() {
    if (this.editableBannerId) {
      this.store.dispatch(
        new GetUiTemplateComponentById({ id: this.editableBannerId })
      );
    }
    this.store.dispatch(new GetElasticQuery());

    this.store.pipe(select<any, any>('bannerManagement')).subscribe(res => {
      this.allFlashSalesList = res['allFlashSalesList'];

    });
  }
  setDataIntoForm(data, formName) {

    Object.keys(this[formName].value).forEach(fieldName => {
      this[formName].get(fieldName).setValue(data[fieldName]);
      if (fieldName === 'linkable_type') {
        if (data[fieldName] === 'ElasticQuery') {
          this.store.dispatch(
            new GetElasticQueryById({ id: data['linkable_id'] })
          );
        }
        // else if (data[fieldName] === 'Category') {
        //   this.selectedOption = [data['linkable_id']];
        //   this.store.dispatch(new GetAllCategory());
        // }
        else if (data[fieldName] === 'Category') {
          this.selectedOption = data['linkable_id'];
          this.store.dispatch(new GetActiveCollections());
        }
        else if (data[fieldName] === 'FlashSale') {
          this.store.dispatch(new GetFlashSalesList());

        }
      }
    });
    if (formName === 'queryForm') {
      this.onProductLinkChange({ value: 'ElasticQuery' });
    }


  }
  getCheckedValueForDefaultSorting(name) {
    const index = this.defaultSortingByArr.findIndex(
      i => i.value['default_sorting_by'] == name
    );
    return index;
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
    this.querySelectionObject = event.value;
    this.query = event.value.query;
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
    // if(url.length>0){
    //   url  = "https://nextdoorhub.imgix.net/" + url.split('/').slice(3).join('/');
    // }
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
  toggleFormDisable(formName) {
    const formStats = this[formName] as FormGroup;
    if (formStats.disabled) {
      formStats.enable();
    } else {
      formStats.disable();
    }
  }
  getFormDisableStats(formName) {
    return this[formName].disabled;
  }
  onProductLinkChange({ value }) {
    // this.bannerForm.patchValue({ linkable_id: '' });
    switch (value) {
      // case 'Category':
      //   // if (!this.categories) {
      //   this.store.dispatch(new GetAllCategory());
      //   // }
      //   this.selectedOption = Array.from(
      //     this.bannerForm.get('linkable_id').value
      //   );
      //   this.openQueryBox = false;
      //   break;
      case 'Category':
        this.store.dispatch(new GetActiveCollections());
        this.selectedOption = this.bannerForm.get('linkable_id').value;
        this.openQueryBox = false;
        break;
      case 'ElasticQuery':
        this.openQueryBox = false;
        // this.query = this.apiMessageResponseForQuery.query;
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
  getStatsForUpdateOfQuery() {
    if (this.apiMessageResponseForQuery) {
      if (this.apiMessageResponseForQuery.id !== this.querySelectionObject.id) {
        return false;
      } else {
        return true;
      }
    }
  }
  getTextForSwitchDefaultCase() {
    if (this.bannerForm.get('linkable_type').value === 'ElasticQuery') {
      if (this.apiMessageResponseForQuery) {
        // const refDiv = document.getElementById('product_img_div');
        // refDiv.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        return `${this.apiMessageResponseForQuery.name}`;
      } else {
        return `Create A Query Below.`;
      }
    } else {
      return 'Select Product Link to continue.';
    }
  }
  defaultSortingChange(event) {
    const data = this.defaultSortingByArr[event.value];
    this.bannerForm.patchValue({
      default_sorting_by: data.value.default_sorting_by,
    });
    if (data.name !== 'Popularity') {
      this.bannerForm.patchValue({
        default_sorting_by_order: data.value.default_sorting_by_order,
      });
    }
  }
  categorySelectionValue(event) {
    const value = event[0].item.id;
    this.bannerForm.patchValue({ linkable_id: value });
  }
  editoChange(event) {
    if (event.length === 0) {
      this.query = '';
      this.queryForm.get('query').setValue(event);
    }
  }
  submitQueryForm() {
    const data = this.queryForm.value;
    if (this.getStatsForUpdateOfQuery()) {
      this.store.dispatch(
        new EditElasticQuery({ id: this.apiMessageResponseForQuery.id, data })
      );
    } else {
      this.store.dispatch(new CreateElasticQuery({ data }));
    }
  }
  bannerFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const data = this.bannerForm.value;
    data.linkable_type =
      data.linkable_type === 'Collection' ? 'Category' : data.linkable_type;
    this.store.dispatch(
      new EditUiTemplateComponent({ id: this.editableBannerId, data })
    );
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
      linkable_type: ['', Validators.required],
      linkable_id: [''],
      default_sorting_by: ['', Validators.required],
      default_sorting_by_order: ['', Validators.required],
    });
    this.queryForm = this.fb.group({
      name: ['', Validators.required],
      query: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.setBannerDetails = false;
    this.store.dispatch(
      new StoreUiTemplateComponents(null)
    );
    this.store.dispatch(
      new StoreUiTemplateComponentById(null)
    );
    console.log(this.setBannerDetails);
  }
}
