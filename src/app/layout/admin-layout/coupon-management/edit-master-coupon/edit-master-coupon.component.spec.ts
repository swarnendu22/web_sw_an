import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterCouponComponent } from './edit-master-coupon.component';

describe('EditMasterCouponComponent', () => {
  let component: EditMasterCouponComponent;
  let fixture: ComponentFixture<EditMasterCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
