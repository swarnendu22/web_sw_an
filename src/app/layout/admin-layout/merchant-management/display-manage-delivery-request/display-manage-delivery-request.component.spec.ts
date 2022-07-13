import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DisplayManageDeliveryRequestComponent } from './display-manage-delivery-request.component';

describe('DisplayManageDeliveryRequestComponent', () => {
  let component: DisplayManageDeliveryRequestComponent;
  let fixture: ComponentFixture<DisplayManageDeliveryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayManageDeliveryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayManageDeliveryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
