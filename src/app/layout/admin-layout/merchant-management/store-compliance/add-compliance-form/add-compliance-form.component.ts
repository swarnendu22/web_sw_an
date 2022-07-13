import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { GetStoreComplianceDetails, UpdateStoreComplianceDetails, StoreStoreComplianceDetails } from '../../../../../actions/merchant-management.actions';
import { UploadImageToAws, StoreImgUploadToAws } from '../../../../../actions/img-upload-aws.action';
import { FormGroup, Validators, FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { select, Store } from '../../../../../../../node_modules/@ngrx/store';
import { getFileFromUrl } from '../../../../../utils/imgLib';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { Subscription } from '../../../../../../../node_modules/rxjs';
import { ImageCropperPopupComponent } from '../../image-cropper-popup/image-cropper-popup.component';


@Component({
  selector: 'app-add-compliance-form',
  templateUrl: './add-compliance-form.component.html',
  styleUrls: ['./add-compliance-form.component.css']
})
export class AddComplianceFormComponent implements OnInit, OnDestroy {
  formDetailsGST: FormGroup;
  formDetailsFSSAI: FormGroup;
  formDetailsPAN: FormGroup;
  formDetailsTradeLicense: FormGroup;
  gstComplianceDetails = null;
  fssaiComplianceDetails = null;
  panComplianceDetails = null;
  tradeComplianceDetails = null;
  storeInfoDetails = null;
  storeId = null
  fileUploadSubscription: Subscription;
  businessCategoryId = null;
  countryCode = null;
  complianceTypeDetails = null;
  complianceTypeSelected = null;
  complianceMandatory = null;
  categorySelected = null;
  category = null;
  gst = null;
  pan = null;
  fssai = null;
  tradelicense = null;
  id = null

  constructor(
    public dialogRef: MatDialogRef<ImageCropperPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar) {
    this.categorySelected = this.data.categorySelected;
    this.storeId = this.data.storeId;
    this.id = this.data.id
    console.log(this.data)
  }

  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeComplianceTypeDetails) {
        this.complianceTypeDetails = res.storeComplianceTypeDetails[0];
        console.log("!!!!!!!!", this.complianceTypeDetails)
      }
      if (res.storeInfoDetails) {
        this.storeInfoDetails = res.storeInfoDetails;
      }
      if (res.storeComplianceDetails && res.storeComplianceDetails.length > 0) {
        // this.id = res.storeComplianceDetails[0].id;
        if (res.storeComplianceDetails[0].complianceType == 'GST') {
          this.gstComplianceDetails = res.storeComplianceDetails
          this.setGstDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'PAN') {
          this.panComplianceDetails = res.storeComplianceDetails
          this.setPanDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'FSSAI') {
          this.fssaiComplianceDetails = res.storeComplianceDetails
          this.setFssaiDetails();
        }
        else if (res.storeComplianceDetails[0].complianceType == 'TRADELICENSE') {
          this.tradeComplianceDetails = res.storeComplianceDetails
          this.setTradeLicenseDetails();
        }
      }
    });


    this.formDetailsGST = this.fb.group({
      gstNum: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      // confirmGstNumber: ['', [Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)]],
      businessName: ['', Validators.required],
      taxStructureConfirm: [2, Validators.required],
      certificateUrl: ['', Validators.required]
    });
    this.formDetailsFSSAI = this.fb.group({
      liscense: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      stateName: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      ownerName: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      validUpto: ['', Validators.required],
      certificateUrl: ['', Validators.required],
      fileObj: [null]
    });
    this.formDetailsPAN = this.fb.group({
      panNumber: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      // confirmPanNum: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      businessName: ['', Validators.required],
      dobOfCorporation: ['', Validators.required],
      panType: ['individual', Validators.required],
      certificateUrl: ['', Validators.required],
      entityType: ['individual', Validators.required]
    });
    this.formDetailsTradeLicense = this.fb.group({
      certifyingAuthority: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      certificateType: [1, Validators.required],
      businessName: ['', Validators.required],
      entityType: ['', Validators.required],
      certificateValidity: ['', Validators.required],
      certificateUrl: ['', Validators.required]
    });
  }

  setGstDetails() {
    if (this.gstComplianceDetails) {
      this.gst = "Present";
      const data = JSON.parse(JSON.parse(this.gstComplianceDetails[0].data));
      console.log(data)
      this.formDetailsGST.get('gstNum').setValue(data.gstNum)
      // this.formDetailsGST.get('confirmGstNumber').setValue(data.gstNum)
      this.formDetailsGST.get('businessName').setValue(data.businessName)
      this.formDetailsGST.get('taxStructureConfirm').setValue(data.taxStructureConfirm == "yes" ? 2 : 1)
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsGST.get('certificateUrl').setValue(file)
        });
      }
    }

  }


  setFssaiDetails() {
    if (this.fssaiComplianceDetails) {
      this.fssai = "Present";
      const data = JSON.parse(JSON.parse(this.fssaiComplianceDetails[0].data));
      this.formDetailsFSSAI.get('liscense').setValue(data.liscense)
      this.formDetailsFSSAI.get('name').setValue(data.name)
      this.formDetailsFSSAI.get('address1').setValue(data.address1)
      this.formDetailsFSSAI.get('address2').setValue(data.address2)
      this.formDetailsFSSAI.get('city').setValue(data.city)
      this.formDetailsFSSAI.get('stateName').setValue(data.stateName)
      this.formDetailsFSSAI.get('pinCode').setValue(data.pinCode)
      this.formDetailsFSSAI.get('ownerName').setValue(data.ownerName)
      this.formDetailsFSSAI.get('ownerContactNumber').setValue(data.ownerContactNumber)
      this.formDetailsFSSAI.get('validUpto').setValue(new Date(data.validUpto))
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsFSSAI.get('certificateUrl').setValue(file)
        });
      }
    }
  }

  setPanDetails() {

    if (this.panComplianceDetails) {
      this.pan = "Present";
      const data = JSON.parse(JSON.parse(this.panComplianceDetails[0].data));
      this.formDetailsPAN.get('panNumber').setValue(data.panNumber)
      // this.formDetailsPAN.get('confirmPanNum').setValue(data.panNumber)
      this.formDetailsPAN.get('businessName').setValue(data.businessName)
      this.formDetailsPAN.get('dobOfCorporation').setValue(new Date(data.dobOfCorporation))
      this.formDetailsPAN.get('panType').setValue(data.panType)
      this.formDetailsPAN.get('entityType').setValue(data.entityType)
      if(data.certificateUrl != null) {
        getFileFromUrl(data.certificateUrl).then(file => {
          this.formDetailsPAN.get('certificateUrl').setValue(file)
        });
      }
    }

  }

  setTradeLicenseDetails() {
    if (this.tradeComplianceDetails) {
      this.tradelicense = "Present"
    }

  }
  openedExpansionPanel(formtype) {
    // if (this.storeInfoDetails.storeCompliance && this.storeInfoDetails.storeCompliance.length > 0) {
    //   this.storeInfoDetails.storeCompliance.forEach(element => {
    //     if (element.complianceType == formtype && element.complianceId) {
    if (this.id) {
      this.store.dispatch(new GetStoreComplianceDetails({
        complianceId: this.id
      }))
    }

    //     }
    //   });

    // }
  }

  onSubmit(formType, imageUrl = '') {
    switch (formType) {
      case 'formDetailsGST': {
        const formPayload = {
          gstNum: this.formDetailsGST.get('gstNum').value,
          businessName: this.formDetailsGST.get('businessName').value,
          taxStructureConfirm: this.formDetailsGST.get('taxStructureConfirm').value == 1 ? 'no' : 'yes',
          certificateUrl: imageUrl
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'GST',
          label: this.formDetailsGST.get('gstNum').value,
          data: JSON.stringify(formPayload),
          id: this.id
        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsPAN': {
        const formPayload = {
          panNumber: this.formDetailsPAN.get('panNumber').value,
          businessName: this.formDetailsPAN.get('businessName').value,
          dobOfCorporation: this.formDetailsPAN.get('dobOfCorporation').value,
          panType: this.formDetailsPAN.get('panType').value,
          certificateUrl: imageUrl,
          entityType: this.formDetailsPAN.get('panType').value == 'entity' ? 'entity' : 'individual'
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'PAN',
          label: this.formDetailsPAN.get('panNumber').value,
          data: JSON.stringify(formPayload),
          id: this.id

        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsFSSAI': {
        const formPayload = {
          liscense: this.formDetailsFSSAI.get('liscense').value,
          name: this.formDetailsFSSAI.get('name').value,
          address1: this.formDetailsFSSAI.get('address1').value,
          address2: this.formDetailsFSSAI.get('address2').value,
          city: this.formDetailsFSSAI.get('city').value,
          stateName: this.formDetailsFSSAI.get('stateName').value,
          pinCode: this.formDetailsFSSAI.get('pinCode').value,
          ownerName: this.formDetailsFSSAI.get('ownerName').value,
          ownerContactNumber: this.formDetailsFSSAI.get('ownerContactNumber').value,
          validUpto: this.formDetailsFSSAI.get('validUpto').value,
          certificateUrl: imageUrl,
          fileObj: [null]
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'FSSAI',
          label: this.formDetailsFSSAI.get('liscense').value,
          data: JSON.stringify(formPayload),
          id: this.id

        }
        console.log(payload)
        this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }
      case 'formDetailsTradeLicense': {
        const formPayload = {
          certifyingAuthority: this.formDetailsTradeLicense.get('certifyingAuthority').value,
          certificateNumber: this.formDetailsTradeLicense.get('certificateNumber').value,
          certificateType: this.formDetailsTradeLicense.get('certificateType').value == 2 ? 'entity' : 'individual',
          businessName: this.formDetailsTradeLicense.get('businessName').value,
          certificateUrl: imageUrl,
          certificateValidity: this.formDetailsTradeLicense.get('certificateValidity').value,
          entityType: this.formDetailsTradeLicense.get('certificateType').value == 2 ? 'entity' : 'individual'
        }
        const payload = {
          storeId: this.storeId, country: 'IND', complianceType: 'TRADELICENSE',
          label: this.formDetailsTradeLicense.get('certificateNumber').value,
          data: JSON.stringify(formPayload),
          id: this.id

        }
        console.log(payload)
        // this.store.dispatch(new UpdateStoreComplianceDetails(payload))
        break;
      }

      default: {
        return null;
      }
    }


  }

  onSelectFile(event, filefor) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      this.store.dispatch(new StoreImgUploadToAws(null));
      const filename = event.target.files[0]['name'];
      const filetype = event.target.files[0]['type'].split('/')[1];
      const applicationtype = event.target.files[0]['type'];
      let acceptedFileType = ['jpeg', 'jpg', 'png', 'gif', 'pdf'];;

      if (acceptedFileType.indexOf(filetype) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${acceptedFileType.join()}`, '', { duration: 5000 })
      } else {

        this[filefor].get('certificateUrl').setValue(event.target.files[0])

      }
    }
  }

  uploadFileToAws(fileObj, filename, filetype, applicationtype, uploadFor) {
    if(filetype!='' && filetype!=null) {
      const date = new Date();
      const extension = filetype.toLowerCase();
      let previousName = filename.replace(/ /g, "_");
      previousName = previousName.replace(extension, '');
      previousName = previousName.replace('.', '');
      const name = previousName + `_${date.getTime()}.` + extension;
      const file = new File([fileObj], name, { type: applicationtype })

      this.store.dispatch(new UploadImageToAws({ file, folderName: 'ndh-stores/stores_img' }));

      this.fileUploadSubscription = this.store.pipe(select<any, any>('components')).subscribe(res => {
        if (res['awsImgUpload']) {
          this.onSubmit(uploadFor, res['awsImgUpload'].Location);
        }
      });
      this.store.dispatch(new StoreImgUploadToAws(null));
    }
  }
  deleteFile(formName) {
    this[formName].get('certificateUrl').setValue('')
  }

  formSubmitForCompliance(formType) {
    if (this[formType].valid) {
      const file = this[formType].get('certificateUrl').value;
      const filename = file['name'];
      const filetype = file['type'].split('/')[1];
      const applicationtype = file['type'];
      this.uploadFileToAws(file, filename, filetype, applicationtype, formType)
    } else {
      this.markFormGroupTouched(this[formType])
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
  downloadFile(file) {
    saveAs(file)
  }
  ngOnDestroy() {
    if(this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe()
    }
    this.store.dispatch(new StoreImgUploadToAws(null));
    this.store.dispatch(new StoreStoreComplianceDetails({ obj: null }))
  }
}
