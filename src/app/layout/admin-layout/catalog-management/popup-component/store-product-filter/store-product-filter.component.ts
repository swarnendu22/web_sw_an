import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { Store, select } from '../../../../../../../node_modules/@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material/dialog';
import { ProductFilterPopupComponent } from '../product-filter/product-filter-popup.component';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';
import { GetCategory } from '../../../../../actions/storeManagement.action';
import { GetActiveBrands } from '../../../../../actions/brand-management.actions';
import * as moment from 'moment';
import { GetAllCatalogList, GetStoreProductPendingList } from '../../../../../actions/catalog-management.action';
import { Options, LabelType } from 'ng5-slider';
@Component({
  selector: 'app-store-product-filter',
  templateUrl: './store-product-filter.component.html',
  styleUrls: ['./store-product-filter.component.css']
})
export class StoreProductFilterComponent implements OnInit {
  // dateRange = new DateRange();
  maxDate = new Date();
  date: Date;
  public brandFilterCtrl: FormControl = new FormControl();
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> ₹' + value;
        case LabelType.High:
          return '<b>Max price:</b> ₹' + value;
        default:
          return '₹' + value;
      }
    }
  };
  selectedItem: any = null;
  categories = null;
  public brands = [];
  items = [];
  // selected: {startDate: moment.Moment, endDate: moment.Moment};
  selected: { startDate: null, endDate: null };

  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Search Category...';
  public MaxDisplayed = 5;
  public createdAtMin = null;
  public createdAtMax = null;
  catalogFilterForm: FormGroup;
  isSelected = 1
  constructor(
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductFilterPopupComponent>,
    private toastr: ToastrService,
  ) {
    console.log(this.data)
    // this.store.dispatch(new GetCategory('false'));
    // this.store.dispatch(new GetActiveBrands('1'));
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

  daterangepickerOptions = {
    format: "DD.MM.YYYY"
  }
  rangeSelected(data) {
    this.createdAtMin = data.start.format('DD-MM-YYYY')
    this.createdAtMax = data.end.format('DD-MM-YYYY')
  }

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 31);
    this.initialForm();
    this.store.pipe(select('manageCategories')).subscribe(res => {
      if (!res.categories) {
        this.store.dispatch(new GetCategory('false'));
      }
      if (res.categories) {
        this.categories = res.categories;
        this.items = this.process(this.categories);
      }
    });

    this.store.pipe(select('brands')).subscribe(res => {
      if (res.activeBrands == null) {
        this.store.dispatch(new GetActiveBrands('1'));
      }
      if (res.activeBrands !== null) {
        this.brands = res.activeBrands;
      }
    });
  }

  initialForm() {
    console.log(this.data)

    let fromDate = null
    let toDate = null
    if (this.data.fromDate && this.data.toDate) {
      fromDate = new Date(moment(this.data.fromDate, 'DD/MM/YYYY').format("MM/DD/YYYY"));
      toDate = new Date(moment(this.data.toDate, 'DD/MM/YYYY').format("MM/DD/YYYY"));

    }

    let nameOrNupc = this.data.nameOrNupc ? this.data.nameOrNupc : this.data.barCode
    this.catalogFilterForm = this._formBuilder.group({
      nameOrNupc: [nameOrNupc],
      fromDate: [fromDate],
      toDate: [toDate],
      fromMrp: [this.data.fromMrp],
      toMrp: [this.data.toMrp],
      fromSellingPrice: [this.data.fromSellingPrice],
      toSellingPrice: [this.data.toSellingPrice],
      categoryId: [null],
      brandId: [this.data.brandId],
      searchType: [this.data.searchType],
      storeName: [this.data.storeName],
      status: [this.data.status],
    });
    // this.catalogFilterForm.get('nameOrNupc').setValue(this.data.nameOrNupc);
    // this.catalogFilterForm.get('fromMrp').setValue(this.data.fromMrp);
    // this.catalogFilterForm.get('toMrp').setValue(this.data.toMrp);
    // this.catalogFilterForm.get('fromSellingPrice').setValue(this.data.fromSellingPrice);
    // this.catalogFilterForm.get('toSellingPrice').setValue(this.data.toSellingPrice);
  }

  onSubmit() {
    if (this.catalogFilterForm.value['fromMrp'] !== null && this.catalogFilterForm.value['toMrp'] == null) {
      this.toastr.error(`Please provide Max MRP`);
      return false;
    } else if (this.catalogFilterForm.value['fromMrp'] == null && this.catalogFilterForm.value['toMrp'] !== null) {
      this.toastr.error(`Please provide Min MRP`);
      return false;
    } else if (
      this.catalogFilterForm.value['fromMrp'] > this.catalogFilterForm.value['toMrp']
    ) {
      this.toastr.error(`Min MRP can't be grater than Max MRP`);
      return false;
    } else if (this.catalogFilterForm.value['fromSellingPrice'] !== null && this.catalogFilterForm.value['toSellingPrice'] == null) {
      this.toastr.error(`Please provide Max Price`);
      return false;
    } else if (this.catalogFilterForm.value['fromSellingPrice'] == null && this.catalogFilterForm.value['toSellingPrice'] !== null) {
      this.toastr.error(`Please provide Min Price`);
      return false;
    } else if (this.catalogFilterForm.value['fromSellingPrice'] > this.catalogFilterForm.value['toSellingPrice']) {
      this.toastr.error(`Min Price can't be grater than Max Price`);
      return false;
    }

    if (this.catalogFilterForm.value['fromDate'] && this.catalogFilterForm.value['toDate']) {
      this.createdAtMin = moment(this.catalogFilterForm.value['fromDate']).format('DD/MM/YYYY')
      this.createdAtMax = moment(this.catalogFilterForm.value['toDate']).format('DD/MM/YYYY')
    }


    // if (this.catalogFilterForm.valid) {
    console.log(this.catalogFilterForm.value)

    if (this.catalogFilterForm.value['searchType'] == 'barcode') {
      this.data['barCode'] = this.catalogFilterForm.value['nameOrNupc']
      if (this.data['nameOrNupc'])
        this.data['nameOrNupc'] = null
    } else {
      this.data['nameOrNupc'] = this.catalogFilterForm.value['nameOrNupc']
      if (this.data['barCode'])
        this.data['barCode'] = null
    }

    this.data['fromDate'] = this.createdAtMin
    this.data['toDate'] = this.createdAtMax
    this.data['fromMrp'] = this.catalogFilterForm.value['fromMrp']
    this.data['toMrp'] = this.catalogFilterForm.value['toMrp']
    this.data['fromSellingPrice'] = this.catalogFilterForm.value['fromSellingPrice']
    this.data['toSellingPrice'] = this.catalogFilterForm.value['toSellingPrice']
    this.data['categoryId'] = this.selectedItem !== null ? this.selectedItem['id'] : null
    this.data['brandId'] = this.catalogFilterForm.value['brandId']
    this.data['searchType'] = this.catalogFilterForm.value['searchType']
    this.data['storeName'] = this.catalogFilterForm.value['storeName']
    // }
    this.store.dispatch(new GetStoreProductPendingList(this.data, 1));
    this.dialogRef.close('Close!');
  }

  clearFilter() {
    this.data['searchType'] = null
    this.data['nameOrNupc'] = null
    this.data['fromDate'] = null
    this.data['toDate'] = null
    this.data['fromMrp'] = null
    this.data['toMrp'] = null
    this.data['fromSellingPrice'] = null
    this.data['toSellingPrice'] = null
    this.data['categoryId'] = null
    this.data['brandId'] = null
    this.data['storeName'] = null
    this.store.dispatch(new GetStoreProductPendingList(this.data, 1));
    this.dialogRef.close('Close!');
  }
}
