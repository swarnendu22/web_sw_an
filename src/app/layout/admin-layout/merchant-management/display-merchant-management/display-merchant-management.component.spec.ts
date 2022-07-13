import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DisplayMerchantManagementComponent } from './display-merchant-management.component';

describe('DisplayMerchantManagementComponent', () => {
  let component: DisplayMerchantManagementComponent;
  let fixture: ComponentFixture<DisplayMerchantManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMerchantManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMerchantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
