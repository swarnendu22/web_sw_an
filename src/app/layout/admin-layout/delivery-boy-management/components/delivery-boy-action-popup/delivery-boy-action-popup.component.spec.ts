import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyActionPopupComponent } from './delivery-boy-action-popup.component';

describe('DeliveryBoyActionPopupComponent', () => {
  let component: DeliveryBoyActionPopupComponent;
  let fixture: ComponentFixture<DeliveryBoyActionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyActionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
