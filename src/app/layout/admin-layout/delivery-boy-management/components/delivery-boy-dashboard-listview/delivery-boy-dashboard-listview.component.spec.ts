import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyDashboardListviewComponent } from './delivery-boy-dashboard-listview.component';

describe('DeliveryBoyDashboardListviewComponent', () => {
  let component: DeliveryBoyDashboardListviewComponent;
  let fixture: ComponentFixture<DeliveryBoyDashboardListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyDashboardListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyDashboardListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
