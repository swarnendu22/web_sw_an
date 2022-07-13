import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { bounce, zoomIn, fadeInDown, fadeInRight, fadeIn } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { storeManagementState } from 'src/app/reducers/storemanagement.reducers';
import { FindDuplicateZipCode, ResetDuplicateZipCode } from 'src/app/actions/storeManagement.action';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-file-upload-preview',
  templateUrl: './edit-file-upload-preview.component.html',
  styleUrls: ['./edit-file-upload-preview.component.css']
})
export class EditFileUploadPreviewComponent implements OnInit {

  loading = false
  errorFile = false
  fileUploaded: File;
  isFileUploaded = false
  fileFormat = null;
  storeData: any;
  worksheet: any;
  csvData: any;
  finalData: any = null;
  fileDataForm: FormGroup;
  columns: any;
  rows: any;
  duplicateZipCode = false

  duplicatedZipCodeArr = []
  allZipCode = []
  isDuplicateZipFound = false;

  constructor(public fb: FormBuilder,
    private toastr: ToastrService,
    // tslint:disable-next-line: variable-name
    private _store: Store<storeManagementState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditFileUploadPreviewComponent>
  ) {
    this.fileDataForm = this.fb.group({
      zipcode: this.fb.array([]),
    });
  }

  ngOnInit() {
    if (this.data) {
      this.allZipCode = this.data.zipcodes;
    }

    this._store.pipe(select<any, any>('general')).subscribe(res => {

      //  ================= DUPLICATE CHECKING SERVER SIDE ==================
      // if (res['duplicateZipCode']) {
      //   this.duplicatedZipCodeArr = res['duplicateZipCode']['payload'] == null ? null : res['duplicateZipCode']['payload'];

      //   if (this.duplicatedZipCodeArr == null) {
      //     console.log('duplicatedZipCodeArr', this.duplicatedZipCodeArr);

      //     this.isFileUploaded = true
      //     this.dialogRef.updateSize('750px', '1440px');
      //   } else if (this.duplicatedZipCodeArr.length > 0) {

      //     // this.finalData.forEach((data, j) => {
      //     this.duplicatedZipCodeArr.forEach((curr, i) => {
      //       const index = _.findIndex(this.finalData, (c) => c.zipCode == curr.zipCode);
      //       console.log('Find', index)
      //       if (index > -1) {
      //         this.finalData[index]['isDuplicate'] = true
      //       }
      //       // if (curr.zipCode == data.zipCode) {
      //       //   console.log('duplicate', curr.zipCode, data.zipCode);
      //       //   this.finalData[i]['isDuplicate'] = true
      //       //   // duplicateZipCode.push(data)
      //       // }
      //     })
      //     // })
      //     this.isFileUploaded = true
      //     this.dialogRef.updateSize('750px', '1440px');
      //     this.duplicateZipCode = true
      //     // this.finalData = duplicateZipCode;
      //     console.log('Final', this.finalData);
      //     // this.dialogRef.close(this.finalData);
      //   }

      // }
    });
  }

  get zipFormArray() {
    return this.fileDataForm.get('zipcode') as FormArray;
  }


  uploadedFile(event) {
    this.loading = true
    this.fileUploaded = event.target.files[0];
    this.fileFormat = event.target.files[0].name.split('.').pop();
    if ((this.fileFormat != 'xls') && (this.fileFormat != 'xlsx') && (this.fileFormat != 'csv')) {
      this.errorFile = true
      this.loading = false
    } else {
      // this.isFileUploaded = true
      this.errorFile = false
      this.loading = false
      console.log('Read Excel', event.target.files[0], this.fileFormat);

      if (this.fileFormat == 'xls' || this.fileFormat == 'xlsx') {
        console.log('Read Excel', this.fileFormat);
        this.readExcel()
      } else if (this.fileFormat == 'csv') {
        console.log('Read Excel', this.fileFormat);
        // this.readAsCSV()
        this.readExcel()

      }

    }
  }

  readExcel() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const storeData = reader.result;
      const workbook = XLSX.read(storeData, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      let payload = XLSX.utils.sheet_to_json(this.worksheet, { header: ["zipCode", "isCodAvailable", "deliveryTat", "additionalDelivery"], range: 1 })
      let finalPayload = JSON.stringify(payload);
      this.finalData = JSON.parse(finalPayload);
      if (this.dataValidation(this.worksheet)) {
        const addedZipCodes = [];
        this.allZipCode.forEach((curr, i) => {
          addedZipCodes.push(curr.zipCode)
        })

        this.finalData.forEach((curr, i) => {
          if (addedZipCodes.indexOf(JSON.stringify(curr.zipCode)) == -1) {
            this.finalData[i]['isDuplicate'] = false
            addedZipCodes.push(JSON.stringify(curr.zipCode));
          } else {
            this.finalData[i]['isDuplicate'] = true
          }
        });

        this.isFileUploaded = true
        this.dialogRef.updateSize('750px', '1440px');
      } else {
        this.dialogRef.close();
        this.isFileUploaded = false
        this.duplicatedZipCodeArr = []
      }
      // this.allZipCode.forEach((curr, i) => {
      //   const index = _.findIndex(this.finalData, (c) => c.zipCode == curr.zipCode);
      //   if (index > -1) {
      //     this.finalData[index]['isDuplicate'] = true
      //   }
      // });

      // var prevZipCode = '';
      // this.finalData.forEach((curr, i) => {
      //   const index = _.findIndex(this.finalData, (c) => c.zipCode == prevZipCode);
      //   if (index > -1) {
      //     this.finalData[i]['isDuplicate'] = true
      //   } else {
      //     prevZipCode = curr.zipCode;
      //   }
      // })




      // ======== DUPLCIATE CHECKING SERVER SIDE ==========
      // if (!this.isDuplicate(this.finalData)) {
      //   // this.checkDuplicateServerSide();
      //   console.log('This duplicate', this.duplicatedZipCodeArr);
      // } else {
      //   this.toastr.error('Duplicate ZipCode Available');
      //   this.dialogRef.close();
      //   this.isFileUploaded = false
      //   this.duplicatedZipCodeArr = []
      // }
      // } else {
      //   this.dialogRef.close();
      //   this.isFileUploaded = false
      //   this.duplicatedZipCodeArr = []
      // }
      // console.log('Is Ddplicate', this.isDuplicate(this.finalData))
      // if (this.finalData) {
      //   let prevZipcode = ''
      //   this.finalData.find(data => {
      //     if (data.zipCode == prevZipcode) {
      //       this.duplicateZipCode = true
      //       this.toastr.error('Duplicate Zipcode Available')
      //       return true
      //     } else {
      //       prevZipcode = data.zipCode
      //     }
      //   })
      //   if (!this.duplicateZipCode) {
      //     this.dialogRef.close(this.finalData);
      //   } else {
      //     this.dialogRef.close();
      //   }
      // }
    };
    reader.readAsBinaryString(this.fileUploaded);

    // this.dialogRef.updateSize('750px', '1440px');

    // let dialogRef = this.dialog.open(FileUploadAndPreviewComponent, {
    //   width: '350px',
    //   maxHeight: '500px',
    //   disableClose: true,
    //   autoFocus: false,
    // });s
  }

  readAsCSV() {
    console.log('Read csv');
    const reader = new FileReader();
    reader.onload = (e) => {
      this.storeData = reader.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");

    };
    console.log('Read CSV', this.csvData);
  }

  dataValidation(workSheet) {
    let inValidCount = 0
    const range = XLSX.utils.decode_range(workSheet['!ref']); // get the range
    // console.log('range', range);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        /* find the cell object */
        // console.log('Row : ' + R);
        // console.log('C : ', + C);
        if (R != 0) {
          const cellref = XLSX.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
          if (!workSheet[cellref]) { continue; } // if cell doesn't exist, move on
          const cell = this.worksheet[cellref];
          console.log(cell.v, 'R', R, 'C', C);

          if (C == 0 && typeof cell.v == 'number' && (cell.v.toString().length == 6)) {
            // isValid = true
            // validForm['zipcode'] = true
            // console.log('c0', C == 0, typeof R, cell.v, (cell.v.toString().length == 6), isValid);
            continue;
          } else if (C == 0) {
            // isValid = false
            inValidCount += 1;
            console.log('ZIP Count', inValidCount);
            // validForm['zipcode'] = false
          }
          if (C == 1 && typeof cell.v == 'number' && (cell.v == 0 || cell.v == 1)) {
            // isValid = true
            // validForm['isCodAvailable'] = true
            // console.log('c1', C == 1, typeof cell.v == 'number', (cell.v == 0 || cell.v == 1), isValid);
            continue;
          } else if (C == 1) {
            // isValid = false
            inValidCount += 1;
            console.log('COD Count', inValidCount);
            // validForm['isCodAvailable'] = false
          }
          if (C == 2 && typeof cell.v == 'number' && (cell.v.toString().length <= 2)) {
            // isValid = true
            // validForm['deliveryTat'] = true

            // console.log('c2', C == 2, typeof cell.v == 'number', (cell.v.toString().length <= 2), isValid);
            continue;
          } else if (C == 2) {
            // isValid = false
            inValidCount += 1;
            console.log('TAT Count', inValidCount);
            // validForm['deliveryTat'] = false
          }
          if (C == 3 && typeof cell.v == 'number' && (cell.v.toString().length <= 5)) {
            // isValid = true
            // validForm['additionalDelivery'] = true

            // console.log('c3', C == 3, typeof cell.v == 'number', (cell.v.toString().length <= 5), isValid);
            continue;
          } else if (C == 3) {
            // isValid = false
            inValidCount += 1;
            console.log('ADD Count', inValidCount);
            // validForm['additionalDelivery'] = false

          }

        }
      }
    }
    if (inValidCount > 0) {
      console.log('Count', inValidCount)
      this.toastr.error('Invalid File Data');
      return false
    } else {
      return true
    }
  }

  isDuplicate(finalData) {
    console.log(JSON.stringify(finalData))
    var seenDuplicate = false,
      testObject = {};

    finalData.map(function (item) {
      var itemPropertyName = item['zipCode'];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      }
      else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    return seenDuplicate;

    // finalData.find(curr => {
    //   console.log('Prev', prevZipCode);
    //   if (curr.zipCode == prevZipCode) {
    //     isDuplicate = true
    //     console.log('Lop', curr.zipCode, prevZipCode, 'true/false', curr.zipCode == prevZipCode)
    //     return true;
    //   } else {
    //     prevZipCode = curr.zipCode;
    //     console.log('else', curr.zipCode, prevZipCode, 'true/false', curr.zipCode == prevZipCode)
    //   }
    // });

    // if (isDuplicate) {
    //   return false
    // }
    // return false
  }

  checkDuplicateServerSide() {
    console.log('Check')
    const zipCodeArr = [];
    this.finalData.forEach(data => {
      zipCodeArr.push(data.zipCode);
    });

    const payload = {
      code: zipCodeArr
    };
    this._store.dispatch(new FindDuplicateZipCode(payload));

    console.log('Check', this.duplicatedZipCodeArr)

    // if (this.duplicatedZipCodeArr.length > 0) {
    //   return this.duplicatedZipCodeArr
    // } else if (this.duplicatedZipCodeArr == null) {
    //   return this.duplicatedZipCodeArr
    // }
  }

  close() {
    this.dialogRef.close()
    this.isFileUploaded = false
    this.duplicatedZipCodeArr = []
    this._store.dispatch(new ResetDuplicateZipCode());
  }

  // ngOnDestroy() {
  //   this.isFileUploaded = false
  //   this.duplicatedZipCodeArr = []
  //   this._store.dispatch(new ResetDuplicateZipCode())
  // }

  saveZips(event) {
    event.preventDefault();
    event.stopPropagation();
    const finalPayload = []
    this.finalData.forEach(curr => {
      if (!curr.isDuplicate) {
        delete curr['isDuplicate']
        finalPayload.push(curr);
      }
    })
    this.dialogRef.close(finalPayload);
  }

}
