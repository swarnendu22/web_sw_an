import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyDashboardComponent } from './delivery-boy-dashboard.component';

describe('DeliveryBoyDashboardComponent', () => {
  let component: DeliveryBoyDashboardComponent;
  let fixture: ComponentFixture<DeliveryBoyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
