import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyOrderEarningComponent } from './delivery-boy-order-earning.component';

describe('DeliveryBoyOrderEarningComponent', () => {
  let component: DeliveryBoyOrderEarningComponent;
  let fixture: ComponentFixture<DeliveryBoyOrderEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyOrderEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyOrderEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
