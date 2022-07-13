import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MerchantManagecellActionButtonComponent } from './merchant-managecell-action-button.component';

describe('MerchantManagecellActionButtonComponent', () => {
  let component: MerchantManagecellActionButtonComponent;
  let fixture: ComponentFixture<MerchantManagecellActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantManagecellActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantManagecellActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
