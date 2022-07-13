import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyCancelPickupsComponent } from './delivery-boy-cancel-pickups.component';

describe('DeliveryBoyCancelPickupsComponent', () => {
  let component: DeliveryBoyCancelPickupsComponent;
  let fixture: ComponentFixture<DeliveryBoyCancelPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyCancelPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyCancelPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
