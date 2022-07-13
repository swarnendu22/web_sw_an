import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { InactiveDeliveryBoyComponent } from './inactive-delivery-boy.component';

describe('InactiveDeliveryBoyComponent', () => {
  let component: InactiveDeliveryBoyComponent;
  let fixture: ComponentFixture<InactiveDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
