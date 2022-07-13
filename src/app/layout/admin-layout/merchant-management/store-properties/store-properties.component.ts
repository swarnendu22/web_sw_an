import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { GetManageStoreProperties, PostManageStoreProperties, AddStoreCreditNote, GetStorecategoryKeywords, ChangeStoreLiveStatus, SaveStoreRelatedKeywords, SaveStoreAccountTaxes, GetStoreCreditTransactionHistory, UpgradeStoreSubscription, GetStoreCreditRequiredForSubscription, ActionTypes } from 'src/app/actions/merchant-management.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-store-properties',
  templateUrl: './store-properties.component.html',
  styleUrls: ['./store-properties.component.css']
})
export class StorePropertiesComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  storeId = null;
  storeProperties = null
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  storePropertiesForm: FormGroup;
  taxesAndChargesForm: FormGroup;
  categoryKeywordsArray = []
  locationKeywordsArray = []
  storeKeywordsArray = []
  paymentMethodsArray = []
  creditAmount = null
  creditNarration = null
  customerId = null
  sectorId = null
  masterCategoryKeywords = null
  transactionHistory = null
  storeLevel = null
  isLive = null
  subscriptionType = null
  subscriptionMonth = null
  requiredCreditAmount = null
  listingRange = null
  subscriptionApi: Subscription;

  @ViewChild('storeCreditModal') storeCreditModal: TemplateRef<any>;
  @ViewChild('upgradeNowModal') upgradeNowModal: TemplateRef<any>;
  @ViewChild('transctionHistoryModal') transctionHistoryModal: TemplateRef<any>;
  // public dialogRef: MatDialogRef<storeCreditModal>

  constructor(private fb: FormBuilder,
    private store: Store<any>, private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private apiMessageService: ApiMessageService,
  ) {
    this.requiredCreditAmount = 0;
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetManageStoreProperties(this.storeId));

  }
  ngOnInit() {
    this.storePropertiesForm = this.fb.group({
      bankName: ['', [Validators.maxLength(100)]],
      accountNumber: ['', [Validators.maxLength(25)]],
      legalName: ['', [Validators.maxLength(200)]],
      ifscCode: ['', Validators.maxLength(25)],
      convenienceCharge: ['', [Validators.required, Validators.max(100)]],
      allowCod: [false,],
      acceptOnlinePayment: [false,],
      acceptPayment: [false,],
      bankAccountVerified: [false,], //** */
      paymentMilestone: ['RECEIPT',],
      paymentAfter: [null, [Validators.required, Validators.maxLength(2)]],
      bankAccountType: [null,],
    });

    this.taxesAndChargesForm = this.fb.group({
      id: [this.storeId,],
      additionalPackagingCharge: [null, Validators.required],
      packagingChargeApplicable: [null,],
      taxInclusive: [null,],
      taxPercentage: [null, [Validators.required, Validators.max(100)]],
    });

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeProperties) {
        this.storeProperties = res.storeProperties[0]
        this.storePropertiesForm.get('bankName').setValue(this.storeProperties.bankName)
        this.storePropertiesForm.get('accountNumber').setValue(this.storeProperties.accountNumber)
        this.storePropertiesForm.get('legalName').setValue(this.storeProperties.legalName)
        this.storePropertiesForm.get('ifscCode').setValue(this.storeProperties.ifscCode)
        this.storePropertiesForm.get('convenienceCharge').setValue(this.storeProperties.convenienceCharge),

        this.storePropertiesForm.get('allowCod').setValue(this.storeProperties.allowCod)
        this.storePropertiesForm.get('acceptOnlinePayment').setValue(this.storeProperties.allowOnlinePayment)
        this.storePropertiesForm.get('acceptPayment').setValue(this.storeProperties.allowPaymentLinkSharing)
        this.storePropertiesForm.get('bankAccountVerified').setValue(this.storeProperties.allowPaymentLinkSharing) //*** */
        this.storePropertiesForm.get('paymentMilestone').setValue(this.storeProperties.paymentRemittanceType)
        this.storePropertiesForm.get('paymentAfter').setValue(this.storeProperties.paymentRemittanceDays)
        this.storePropertiesForm.get('bankAccountType').setValue(this.storeProperties.bankAccountType)

        this.locationKeywordsArray = this.storeProperties.locationKeyword ? JSON.parse(this.storeProperties.locationKeyword[0]) : []
        this.categoryKeywordsArray = this.storeProperties.categoryKeyword ? JSON.parse(this.storeProperties.categoryKeyword[0]) : []
        if (this.storeProperties.storeKeywords) {
          this.storeKeywordsArray = []
          JSON.parse(this.storeProperties.storeKeywords).forEach(e => {
            this.storeKeywordsArray.push(e.keyword)
          })
        }

        this.customerId = this.storeProperties.customerId
        this.sectorId = this.storeProperties.sectorId

        this.storeLevel = this.storeProperties.storeLevel
        // this.subscriptionType = this.storeProperties.storeLevel
        this.isLive = this.storeProperties.isLive == true ? true : false

        this.taxesAndChargesForm.get('taxInclusive').setValue(this.storeProperties.taxInclusive)
        this.taxesAndChargesForm.get('taxPercentage').setValue(this.storeProperties.taxPercentage)
        this.taxesAndChargesForm.get('packagingChargeApplicable').setValue(this.storeProperties.packagingChargeApplicable)
        this.taxesAndChargesForm.get('additionalPackagingCharge').setValue(this.storeProperties.additionalPackagingCharge)


      }
      if (res.storeCategoryKeywords) {
        this.masterCategoryKeywords = res.storeCategoryKeywords.hits.hits
        console.log(res.storeCategoryKeywords)
      }
      if (res.transactionHistory) {
        this.transactionHistory = res.transactionHistory
        console.log(res.transactionHistory)
      }
      if (res.storeCreditRequired) {
        this.requiredCreditAmount = res.storeCreditRequired[0]['creditValue']
        this.listingRange = res.storeCreditRequired[0]['listingRange']
        console.log(res.transactionHistory)
      }
    })
  }


  addKeyword(event, arrName, type = 'text'): void {
    let input;
    let value;
    if (type == 'select') {
      input = event.input;
      value = event.option.viewValue;
    } else {
      input = event.input;
      value = event.value;
    }

    console.log(value)
    // Add our fruit
    if ((value || '').trim()) {
      this[arrName].push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword, arrName): void {
    const index = this[arrName].indexOf(keyword);
    console.log(this[arrName], index, keyword)
    if (index >= 0) {
      this[arrName].splice(index, 1);
    }
  }

  changeCategoryKeyword(event) {
    const value = event.target.value
    if (value && value.length > 2) {
      const payload = { sector: this.sectorId, categoryName: value, type: 'STORE_CATEGORY_KEYWORD' }
      this.store.dispatch(new GetStorecategoryKeywords(payload))
    }
  }

  onSubmit() {
    console.log("Checking", this.storePropertiesForm.value)
    const payload = {
      accountNumber: this.storePropertiesForm.get('accountNumber').value,
      bankName: this.storePropertiesForm.get('bankName').value,
      id: this.storeId,
      ifscCode: this.storePropertiesForm.get('ifscCode').value,
      legalName: this.storePropertiesForm.get('legalName').value,
      convenienceCharge: this.storePropertiesForm.get('convenienceCharge').value,
      acceptCod: this.storePropertiesForm.get('allowCod').value,
      acceptOnlinePayment: this.storePropertiesForm.get('acceptOnlinePayment').value,
      acceptPayment: this.storePropertiesForm.get('acceptPayment').value,
      bankAccountVerified: this.storePropertiesForm.get('bankAccountVerified').value, //** */
      paymentMilestone: this.storePropertiesForm.get('paymentMilestone').value,
      paymentAfter: this.storePropertiesForm.get('paymentAfter').value,
      bankAccountType: this.storePropertiesForm.get('bankAccountType').value,

    }
    console.log(payload)
    this.store.dispatch(new PostManageStoreProperties(payload))
  }

  changeStatus() {
    const status = this.storePropertiesForm.get('isLive').value;
    this.storePropertiesForm.get('isLive').setValue(!status)

  }

  openCreditModal() {
    let dialogRef = this.dialog.open(this.storeCreditModal, {
      height: '300px',
      width: '500px',
    });
  }

  openUpgradeModal() {

    let dialogRef = this.dialog.open(this.upgradeNowModal, {
      height: '435px',
      width: '500px',
    });
  }

  openTransctionModal() {
    this.store.dispatch(new GetStoreCreditTransactionHistory(this.storeId));
    let dialogRef = this.dialog.open(this.transctionHistoryModal, {
      height: '500px',
      width: '700px',
    });
  }

  onSaveCreditNote() {

    const payload = {
      amount: this.creditAmount,
      narration: this.creditNarration,
      storeId: this.storeId
    }
    this.store.dispatch(new AddStoreCreditNote(payload))

  }

  toggle(formcontrolname, formname = 'storePropertiesForm') {
    if (this[formname].get(formcontrolname).value == true)
      this[formname].get(formcontrolname).setValue(false)
    else
      this[formname].get(formcontrolname).setValue(true)
  }

  changeStoreLiveStatus() {
    if (this.isLive == true)
      this.isLive = false
    else
      this.isLive = true
    this.store.dispatch(new ChangeStoreLiveStatus({
      isLive: this.isLive,
      id: this.storeId
    }))
  }

  onKeywordsSave() {
    let keywordPayload = [];
    this.storeKeywordsArray.forEach(element => {
      keywordPayload.push(
        {
          "type": "default",
          "keyword": element,
          "expiry_date": null,
          "type_search": element,
          "keyword_search": element
        },
      )
    })

    this.store.dispatch(new SaveStoreRelatedKeywords({
      keywords: keywordPayload,
      categoryKeyword: this.categoryKeywordsArray,
      locationKeyword: this.locationKeywordsArray,
      id: this.storeId,
    }))
  }

  onTaxSave() {
    console.log(this.taxesAndChargesForm.value)
    if (this.taxesAndChargesForm.valid) {
      this.store.dispatch(new SaveStoreAccountTaxes(this.taxesAndChargesForm.value))
    } else {
      this.markFormGroupTouched(this.taxesAndChargesForm)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  upGradeStore() {
    console.log(this.listingRange)

    if (this.subscriptionType!='BASIC' && (!this.subscriptionMonth || !this.subscriptionType)) {
      this.toaster.error('Select Plan and Plan Duration')
    } else if (!this.subscriptionType) {
      this.toaster.error('Select Plan')
    } else {
      if (this.requiredCreditAmount <= this.storeProperties.credit) {
        const payload = {
          "storeId": this.storeId,
          "id": 3,
          "subscription": this.subscriptionType,
          "price_1m": null,
          "price_3m": null,
          "price_6m": null,
          "price_12m": null,
          "listing_range": this.listingRange
        }
        if (this.subscriptionMonth == 1) {
          payload.price_1m = this.requiredCreditAmount
        }
        else if (this.subscriptionMonth == 3) {
          payload.price_3m = this.requiredCreditAmount
        }
        else if (this.subscriptionMonth == 6) {
          payload.price_6m = this.requiredCreditAmount
        }
        else if (this.subscriptionMonth == 12) {
          payload.price_12m = this.requiredCreditAmount
        }
        this.store.dispatch(new UpgradeStoreSubscription(payload));
        this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ==  ActionTypes.upgradeStoreSubscription) {
            this.store.dispatch(new GetManageStoreProperties(this.storeId));
            if (this.subscriptionApi) {
              this.subscriptionApi.unsubscribe();
            }
          }
        });
        
      } else {
        this.toaster.error('Not Enough Credit Balance')
      }
    }
  }

  changeSubscriptonMonth(event) {
    if (this.subscriptionType && this.subscriptionMonth) {
      this.store.dispatch(new GetStoreCreditRequiredForSubscription({
        "subcriptionType": this.subscriptionType,
        "subscriptionMonth": this.subscriptionMonth
      }));
    } else if (this.subscriptionType == 'BASIC') {
      this.requiredCreditAmount = 0;
    }
  }
  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }
}
