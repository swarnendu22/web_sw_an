import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReconDataListComponent } from './payment-recon-data-list.component';

describe('PaymentReconDataListComponent', () => {
  let component: PaymentReconDataListComponent;
  let fixture: ComponentFixture<PaymentReconDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReconDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReconDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
