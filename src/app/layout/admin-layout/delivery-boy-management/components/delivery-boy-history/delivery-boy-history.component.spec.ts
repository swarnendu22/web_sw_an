import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyHistoryComponent } from './delivery-boy-history.component';

describe('DeliveryBoyHistoryComponent', () => {
  let component: DeliveryBoyHistoryComponent;
  let fixture: ComponentFixture<DeliveryBoyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
