import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplianceMerchantComponent } from './add-compliance-merchant.component';

describe('AddComplianceMerchantComponent', () => {
  let component: AddComplianceMerchantComponent;
  let fixture: ComponentFixture<AddComplianceMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplianceMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplianceMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
