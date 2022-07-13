import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCouponStoreComponent } from './edit-coupon-store.component';

describe('EditCouponStoreComponent', () => {
  let component: EditCouponStoreComponent;
  let fixture: ComponentFixture<EditCouponStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCouponStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCouponStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
