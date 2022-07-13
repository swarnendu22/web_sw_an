import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCouponComponent } from './custom-coupon.component';

describe('CustomCouponComponent', () => {
  let component: CustomCouponComponent;
  let fixture: ComponentFixture<CustomCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
