import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyAreaOperationsComponent } from './delivery-boy-area-operations.component';

describe('DeliveryBoyAreaOperationsComponent', () => {
  let component: DeliveryBoyAreaOperationsComponent;
  let fixture: ComponentFixture<DeliveryBoyAreaOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyAreaOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyAreaOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
