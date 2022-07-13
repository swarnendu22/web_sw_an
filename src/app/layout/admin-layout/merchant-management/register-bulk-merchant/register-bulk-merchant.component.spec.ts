import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RegisterBulkMerchantComponent } from './register-bulk-merchant.component';

describe('RegisterBulkMerchantComponent', () => {
  let component: RegisterBulkMerchantComponent;
  let fixture: ComponentFixture<RegisterBulkMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBulkMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBulkMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
