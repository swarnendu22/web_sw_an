import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantInfoTabComponent } from './merchant-info-tab.component';

describe('MerchantInfoTabComponent', () => {
  let component: MerchantInfoTabComponent;
  let fixture: ComponentFixture<MerchantInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
