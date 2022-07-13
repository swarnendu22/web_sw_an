import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverOrderDetailsComponent } from './driver-order-details.component';

describe('DriverOrderDetailsComponent', () => {
  let component: DriverOrderDetailsComponent;
  let fixture: ComponentFixture<DriverOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
