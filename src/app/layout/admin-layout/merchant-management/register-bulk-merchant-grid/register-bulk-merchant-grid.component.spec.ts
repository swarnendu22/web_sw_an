import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RegisterBulkMerchantGridComponent } from './register-bulk-merchant-grid.component';

describe('RegisterBulkMerchantGridComponent', () => {
  let component: RegisterBulkMerchantGridComponent;
  let fixture: ComponentFixture<RegisterBulkMerchantGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBulkMerchantGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBulkMerchantGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
