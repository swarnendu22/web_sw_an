import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FulfillmentCenterComponent } from './fulfillment-center.component';

describe('FulfillmentCenterComponent', () => {
  let component: FulfillmentCenterComponent;
  let fixture: ComponentFixture<FulfillmentCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulfillmentCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfillmentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
