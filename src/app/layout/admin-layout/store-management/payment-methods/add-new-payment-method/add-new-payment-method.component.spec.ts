import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewPaymentMethodComponent } from './add-new-payment-method.component';

describe('AddNewPaymentMethodComponent', () => {
  let component: AddNewPaymentMethodComponent;
  let fixture: ComponentFixture<AddNewPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
