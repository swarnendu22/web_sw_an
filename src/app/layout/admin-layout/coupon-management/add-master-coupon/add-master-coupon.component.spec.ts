import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterCouponComponent } from './add-master-coupon.component';

describe('AddMasterCouponComponent', () => {
  let component: AddMasterCouponComponent;
  let fixture: ComponentFixture<AddMasterCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
