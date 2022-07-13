import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ActiveCustomerComponent } from './active-customer.component';

describe('ActiveCustomerComponent', () => {
  let component: ActiveCustomerComponent;
  let fixture: ComponentFixture<ActiveCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
