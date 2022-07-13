import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageDeliveryRequestActionComponent } from './manage-delivery-request-action.component';

describe('ManageDeliveryRequestActionComponent', () => {
  let component: ManageDeliveryRequestActionComponent;
  let fixture: ComponentFixture<ManageDeliveryRequestActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeliveryRequestActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeliveryRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
