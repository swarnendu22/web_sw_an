import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyEarningBreakupComponent } from './delivery-boy-earning-breakup.component';

describe('DeliveryBoyEarningBreakupComponent', () => {
  let component: DeliveryBoyEarningBreakupComponent;
  let fixture: ComponentFixture<DeliveryBoyEarningBreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyEarningBreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyEarningBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
