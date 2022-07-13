import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyDashboardMapviewComponent } from './delivery-boy-dashboard-mapview.component';

describe('DeliveryBoyDashboardMapviewComponent', () => {
  let component: DeliveryBoyDashboardMapviewComponent;
  let fixture: ComponentFixture<DeliveryBoyDashboardMapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyDashboardMapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyDashboardMapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
