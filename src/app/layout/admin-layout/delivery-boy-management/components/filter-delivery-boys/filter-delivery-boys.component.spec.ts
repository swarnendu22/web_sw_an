import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FilterDeliveryBoysComponent } from './filter-delivery-boys.component';

describe('FilterDeliveryBoysComponent', () => {
  let component: FilterDeliveryBoysComponent;
  let fixture: ComponentFixture<FilterDeliveryBoysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDeliveryBoysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDeliveryBoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
