import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverDetailsUpdateComponent } from './driver-details-update.component';

describe('DriverDetailsUpdateComponent', () => {
  let component: DriverDetailsUpdateComponent;
  let fixture: ComponentFixture<DriverDetailsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
