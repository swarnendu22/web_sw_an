import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BlockedCustomerComponent } from './blocked-customer.component';

describe('BlockedCustomerComponent', () => {
  let component: BlockedCustomerComponent;
  let fixture: ComponentFixture<BlockedCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
