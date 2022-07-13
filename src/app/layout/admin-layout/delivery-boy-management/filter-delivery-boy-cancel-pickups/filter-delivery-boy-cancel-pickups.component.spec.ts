import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FilterDeliveryBoyCancelPickupsComponent } from './filter-delivery-boy-cancel-pickups.component';

describe('FilterDeliveryBoyCancelPickupsComponent', () => {
  let component: FilterDeliveryBoyCancelPickupsComponent;
  let fixture: ComponentFixture<FilterDeliveryBoyCancelPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDeliveryBoyCancelPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDeliveryBoyCancelPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
