import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererDeliveryBoyCancelPickupReasonsComponent } from './cell-renderer-delivery-boy-cancel-pickup-reasons.component';

describe('CellRendererDeliveryBoyCancelPickupReasonsComponent', () => {
  let component: CellRendererDeliveryBoyCancelPickupReasonsComponent;
  let fixture: ComponentFixture<CellRendererDeliveryBoyCancelPickupReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererDeliveryBoyCancelPickupReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererDeliveryBoyCancelPickupReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
