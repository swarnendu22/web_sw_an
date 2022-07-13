import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCouponComponent } from './platform-coupon.component';

describe('PlatformCouponComponent', () => {
  let component: PlatformCouponComponent;
  let fixture: ComponentFixture<PlatformCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
