import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentSettlementComponent } from './seller-payment-settlement.component';

describe('SellerPaymentSettlementComponent', () => {
  let component: SellerPaymentSettlementComponent;
  let fixture: ComponentFixture<SellerPaymentSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPaymentSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPaymentSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
