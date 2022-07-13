import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverEarningDetailsComponent } from './driver-earning-details.component';

describe('DriverEarningDetailsComponent', () => {
  let component: DriverEarningDetailsComponent;
  let fixture: ComponentFixture<DriverEarningDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverEarningDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverEarningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
