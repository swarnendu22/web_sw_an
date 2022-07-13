import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverDetailsApproveRejectPopupComponent } from './driver-details-approve-reject-popup.component';

describe('DriverDetailsApproveRejectPopupComponent', () => {
  let component: DriverDetailsApproveRejectPopupComponent;
  let fixture: ComponentFixture<DriverDetailsApproveRejectPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailsApproveRejectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailsApproveRejectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
