import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyCancelPickupReasonsComponent } from './delivery-boy-cancel-pickup-reasons.component';

describe('DeliveryBoyCancelPickupReasonsComponent', () => {
  let component: DeliveryBoyCancelPickupReasonsComponent;
  let fixture: ComponentFixture<DeliveryBoyCancelPickupReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyCancelPickupReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyCancelPickupReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
