import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UnassignDeliveryBoyComponent } from './unassign-delivery-boy.component';

describe('UnassignDeliveryBoyComponent', () => {
  let component: UnassignDeliveryBoyComponent;
  let fixture: ComponentFixture<UnassignDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
