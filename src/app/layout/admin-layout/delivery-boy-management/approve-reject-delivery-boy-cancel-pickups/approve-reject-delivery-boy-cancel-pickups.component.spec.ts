import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApproveRejectDeliveryBoyCancelPickupsComponent } from './approve-reject-delivery-boy-cancel-pickups.component';

describe('ApproveRejectDeliveryBoyCancelPickupsComponent', () => {
  let component: ApproveRejectDeliveryBoyCancelPickupsComponent;
  let fixture: ComponentFixture<ApproveRejectDeliveryBoyCancelPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRejectDeliveryBoyCancelPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectDeliveryBoyCancelPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
