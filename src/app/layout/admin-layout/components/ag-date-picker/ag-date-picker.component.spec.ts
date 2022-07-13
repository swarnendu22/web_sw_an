import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AgDatePickerComponent } from './ag-date-picker.component';

describe('AgDatePickerComponent', () => {
  let component: AgDatePickerComponent;
  let fixture: ComponentFixture<AgDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
