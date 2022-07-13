import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaymentCsvComponent } from './upload-payment-csv.component';

describe('UploadPaymentCsvComponent', () => {
  let component: UploadPaymentCsvComponent;
  let fixture: ComponentFixture<UploadPaymentCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPaymentCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPaymentCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
