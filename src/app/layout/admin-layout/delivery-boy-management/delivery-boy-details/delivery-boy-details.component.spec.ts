import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyDetailsComponent } from './delivery-boy-details.component';

describe('DeliveryBoyDetailsComponent', () => {
  let component: DeliveryBoyDetailsComponent;
  let fixture: ComponentFixture<DeliveryBoyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
