import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyRegistrationComponent } from './delivery-boy-registration.component';

describe('DeliveryBoyRegistrationComponent', () => {
  let component: DeliveryBoyRegistrationComponent;
  let fixture: ComponentFixture<DeliveryBoyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
