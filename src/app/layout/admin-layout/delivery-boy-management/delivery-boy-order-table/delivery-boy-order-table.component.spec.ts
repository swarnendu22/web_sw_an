import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyOrderTableComponent } from './delivery-boy-order-table.component';

describe('DeliveryBoyOrderTableComponent', () => {
  let component: DeliveryBoyOrderTableComponent;
  let fixture: ComponentFixture<DeliveryBoyOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
