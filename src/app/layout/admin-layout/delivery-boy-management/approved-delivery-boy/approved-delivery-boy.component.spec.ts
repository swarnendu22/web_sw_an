import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApprovedDeliveryBoyComponent } from './approved-delivery-boy.component';

describe('ApprovedDeliveryBoyComponent', () => {
  let component: ApprovedDeliveryBoyComponent;
  let fixture: ComponentFixture<ApprovedDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
