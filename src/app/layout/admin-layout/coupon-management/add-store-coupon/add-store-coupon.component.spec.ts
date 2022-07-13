import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreCouponComponent } from './add-store-coupon.component';

describe('AddStoreCouponComponent', () => {
  let component: AddStoreCouponComponent;
  let fixture: ComponentFixture<AddStoreCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
