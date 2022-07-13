import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomShipmentOrdersComponent } from './ecom-shipment-orders.component';

describe('EcomShipmentOrdersComponent', () => {
  let component: EcomShipmentOrdersComponent;
  let fixture: ComponentFixture<EcomShipmentOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomShipmentOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomShipmentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
