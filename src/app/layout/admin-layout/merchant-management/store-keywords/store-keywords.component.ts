import { UpdateStoreKeywords } from './../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetStoreKeywords } from 'src/app/actions/merchant-management.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-store-keywords',
  templateUrl: './store-keywords.component.html',
  styleUrls: ['./store-keywords.component.css']
})
export class StoreKeywordsComponent implements OnInit {
  value = `${environment.storeFrontBaseUrl}/store/`
  storeKeywordsForm: FormGroup;
  storeId = null;
  storeKeywordsDetails = null;
  storeKeywords = [];
  visible = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute) {

    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreKeywords(this.storeId))
  }

  ngOnInit() {
    this.storeKeywordsForm = this.fb.group({
      storeId: [''],
      storeUrl: ['',],
      seoKeyWords: ['',],
      seoTitle: ['', Validators.maxLength(250)],
      seoDescription: ['',],
      storeTagLine: ['',]
    })
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeKeywords && res.storeKeywords.length > 0) {
        this.storeKeywordsDetails = res.storeKeywords[0];
        this.storeKeywordsForm.get('storeId').setValue(this.storeId);
        this.storeKeywordsForm.get('storeUrl').setValue(this.storeKeywordsDetails.storeUrl);
        this.storeKeywordsForm.get('seoTitle').setValue(this.storeKeywordsDetails.seoTitle);
        // this.storeKeywordsForm.get('seoKeyWords').setValue(this.storeKeywordsDetails.seoKeyWords);
        this.storeKeywordsForm.get('seoDescription').setValue(this.storeKeywordsDetails.seoDescription);
        this.storeKeywordsForm.get('storeTagLine').setValue(this.storeKeywordsDetails.storeTagLine);
        this.storeKeywords = this.storeKeywordsDetails.seoKeyWords ? JSON.parse(this.storeKeywordsDetails.seoKeyWords) : [];
      }
    });
  }

  onSave() {
    this.storeKeywordsForm.get('seoKeyWords').setValue(this.storeKeywords);
    if (this.storeKeywordsForm.valid) {
      const payload = {
        id: this.storeKeywordsForm.get('storeId').value,
        seoDescription: this.storeKeywordsForm.get('seoDescription').value,
        seoKeyWords: this.storeKeywords,
        seoTitle: this.storeKeywordsForm.get('seoTitle').value,
        storeUrl: this.storeKeywordsForm.get('storeUrl').value,
        storeTagLine: this.storeKeywordsForm.get('storeTagLine').value
      }
      console.log(payload);
      this.store.dispatch(new UpdateStoreKeywords(payload));
    }
    else {
      this.markFormGroupTouched(this.storeKeywordsForm)
    }
  }


  add(event: MatChipInputEvent): void {
    console.log(event.input)
    console.log(event.value)
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.storeKeywords.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }



  remove(keyword) {
    const index = this.storeKeywords.indexOf(keyword);
    if (index >= 0) {
      this.storeKeywords.splice(index, 1);
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



}