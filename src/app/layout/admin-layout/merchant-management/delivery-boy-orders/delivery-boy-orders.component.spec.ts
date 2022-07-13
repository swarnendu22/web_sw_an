import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyOrdersComponent } from './delivery-boy-orders.component';

describe('DeliveryBoyOrdersComponent', () => {
  let component: DeliveryBoyOrdersComponent;
  let fixture: ComponentFixture<DeliveryBoyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
