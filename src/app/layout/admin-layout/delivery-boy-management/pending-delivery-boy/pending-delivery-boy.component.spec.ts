import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingDeliveryBoyComponent } from './pending-delivery-boy.component';

describe('PendingDeliveryBoyComponent', () => {
  let component: PendingDeliveryBoyComponent;
  let fixture: ComponentFixture<PendingDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
