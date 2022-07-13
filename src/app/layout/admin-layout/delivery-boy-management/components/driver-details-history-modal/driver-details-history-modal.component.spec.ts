import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverDetailsHistoryModalComponent } from './driver-details-history-modal.component';

describe('DriverDetailsHistoryModalComponent', () => {
  let component: DriverDetailsHistoryModalComponent;
  let fixture: ComponentFixture<DriverDetailsHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailsHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailsHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
