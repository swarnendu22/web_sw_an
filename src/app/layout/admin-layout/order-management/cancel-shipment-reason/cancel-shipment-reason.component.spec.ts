import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelShipmentReasonComponent } from './cancel-shipment-reason.component';

describe('CancelShipmentReasonComponent', () => {
  let component: CancelShipmentReasonComponent;
  let fixture: ComponentFixture<CancelShipmentReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelShipmentReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelShipmentReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
