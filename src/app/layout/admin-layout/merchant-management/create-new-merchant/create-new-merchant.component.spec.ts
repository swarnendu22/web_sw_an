import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CreateNewMerchantComponent } from './create-new-merchant.component';

describe('CreateNewMerchantComponent', () => {
  let component: CreateNewMerchantComponent;
  let fixture: ComponentFixture<CreateNewMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
