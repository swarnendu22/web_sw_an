import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryPartnerComponent } from './edit-delivery-partner.component';

describe('EditDeliveryPartnerComponent', () => {
  let component: EditDeliveryPartnerComponent;
  let fixture: ComponentFixture<EditDeliveryPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
