import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverShiftDetailsComponent } from './driver-shift-details.component';

describe('DriverShiftDetailsComponent', () => {
  let component: DriverShiftDetailsComponent;
  let fixture: ComponentFixture<DriverShiftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverShiftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
