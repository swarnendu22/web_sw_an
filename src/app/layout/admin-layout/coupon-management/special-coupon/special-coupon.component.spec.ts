import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCouponComponent } from './special-coupon.component';

describe('SpecialCouponComponent', () => {
  let component: SpecialCouponComponent;
  let fixture: ComponentFixture<SpecialCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
