import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryRequestSearchComponent } from './delivery-request-search.component';

describe('DeliveryRequestSearchComponent', () => {
  let component: DeliveryRequestSearchComponent;
  let fixture: ComponentFixture<DeliveryRequestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRequestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
