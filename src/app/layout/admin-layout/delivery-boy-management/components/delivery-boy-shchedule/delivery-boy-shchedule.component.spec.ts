import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyShcheduleComponent } from './delivery-boy-shchedule.component';

describe('DeliveryBoyShcheduleComponent', () => {
  let component: DeliveryBoyShcheduleComponent;
  let fixture: ComponentFixture<DeliveryBoyShcheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyShcheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyShcheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
