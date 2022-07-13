import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyLogComponent } from './delivery-boy-log.component';

describe('DeliveryBoyLogComponent', () => {
  let component: DeliveryBoyLogComponent;
  let fixture: ComponentFixture<DeliveryBoyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
