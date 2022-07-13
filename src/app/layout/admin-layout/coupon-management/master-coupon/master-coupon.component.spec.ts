import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCouponComponent } from './master-coupon.component';

describe('MasterCouponComponent', () => {
  let component: MasterCouponComponent;
  let fixture: ComponentFixture<MasterCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
